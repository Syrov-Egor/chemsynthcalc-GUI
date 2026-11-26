package main

import (
	"context"
	"errors"
	"fmt"
	"math"
	"strings"
	"sync"
)

// App is the Wails service that exposes the calculation logic to the
// frontend. All calculation work runs natively in the application process.
type App struct {
	cancelFunc    context.CancelFunc
	cancelMutex   sync.RWMutex
	isCalculating bool
}

// CalculationParams describes a single calculation request. The JSON tags
// match the object sent by the frontend.
type CalculationParams struct {
	Mode            string  `json:"mode"`
	Algorithm       string  `json:"algorithm"`
	RunMode         string  `json:"runMode"`
	TargetNum       int     `json:"targetNumber"`
	TargetMass      float64 `json:"targetMass"`
	Intify          bool    `json:"intify"`
	OutputPrecision int     `json:"outputPrecision"`
	FloatTolerance  int     `json:"floatTolerance"`
	MaxComb         int     `json:"maxCombinations"`
	Equation        string  `json:"equation"`
}

// CalculationResult is returned by PerformCalculation.
type CalculationResult struct {
	Success   bool          `json:"success"`
	Message   string        `json:"message"`
	Details   string        `json:"details"`
	Cancelled bool          `json:"cancelled"`
	Tabular   []TabularData `json:"tabular"`
}

// TabularData is one row of the masses-mode result table.
type TabularData struct {
	Formula string  `json:"formula"`
	Molar   float64 `json:"molar"`
	Masses  float64 `json:"masses"`
}

// Limits mirror src/lib/scripts/validation.ts. They are enforced again here
// because bound Wails methods can be reached without going through the Svelte
// UI. This keeps a negative precision from wrapping to uint and prevents an
// unbounded brute-force search.
const (
	minOutputPrecision = 0
	maxOutputPrecision = 15

	minFloatTolerance = 0
	maxFloatTolerance = 15

	minMaxCombinations = 1
	maxMaxCombinations = 1000

	minTargetNumber = -100
	maxTargetNumber = 100
)

// NewApp creates a new calculation service.
func NewApp() *App {
	return &App{}
}

func validateParams(p CalculationParams) error {
	if strings.TrimSpace(p.Equation) == "" {
		return errors.New("enter a formula or equation")
	}

	switch p.Mode {
	case "formula":
		// Algorithm, run mode and max coefficient are not used in this mode.
	case "balance":
		switch p.Algorithm {
		case "auto", "inv", "gpinv", "ppinv":
		case "comb":
			if p.MaxComb < minMaxCombinations || p.MaxComb > maxMaxCombinations {
				return fmt.Errorf("max coefficient must be between %d and %d", minMaxCombinations, maxMaxCombinations)
			}
		default:
			return fmt.Errorf("invalid balancing algorithm %q", p.Algorithm)
		}
	case "masses":
		switch p.RunMode {
		case "balance", "check", "force":
		default:
			return fmt.Errorf("invalid run mode %q", p.RunMode)
		}
	default:
		return fmt.Errorf("invalid calculation mode %q", p.Mode)
	}

	if p.OutputPrecision < minOutputPrecision || p.OutputPrecision > maxOutputPrecision {
		return fmt.Errorf("output precision must be between %d and %d", minOutputPrecision, maxOutputPrecision)
	}

	if p.FloatTolerance < minFloatTolerance || p.FloatTolerance > maxFloatTolerance {
		return fmt.Errorf("float tolerance must be between %d and %d", minFloatTolerance, maxFloatTolerance)
	}

	if p.TargetNum < minTargetNumber || p.TargetNum > maxTargetNumber {
		return fmt.Errorf("target number must be between %d and %d", minTargetNumber, maxTargetNumber)
	}

	if math.IsNaN(p.TargetMass) || math.IsInf(p.TargetMass, 0) || p.TargetMass < 0 {
		return errors.New("target mass must be a non-negative finite number")
	}

	return nil
}

// StopCalculation requests cancellation of the calculation currently running,
// if any. It is safe to call when no calculation is in progress.
func (a *App) StopCalculation() {
	a.cancelMutex.Lock()
	defer a.cancelMutex.Unlock()

	if a.cancelFunc != nil {
		a.cancelFunc()
	}
}

// IsCalculating reports whether a calculation is currently running.
func (a *App) IsCalculating() bool {
	a.cancelMutex.RLock()
	defer a.cancelMutex.RUnlock()
	return a.isCalculating
}

// PerformCalculation validates the request and runs the selected calculation.
// Wails injects ctx into the bound method, so cancelling the frontend call (or
// calling StopCalculation) stops cooperative calculations such as Comb.
func (a *App) PerformCalculation(ctx context.Context, params CalculationParams) (result CalculationResult) {
	// A panic in a calculation must not escape into the Wails runtime. Turn it
	// into a normal failure result so the UI can report it.
	defer func() {
		if r := recover(); r != nil {
			result = errorousCalculation(fmt.Sprintf("Calculation panicked: %v", r))
		}
	}()

	if err := validateParams(params); err != nil {
		return errorousCalculation(err.Error())
	}

	a.cancelMutex.Lock()

	// Only one calculation may run at a time.
	if a.isCalculating {
		a.cancelMutex.Unlock()
		return CalculationResult{
			Success: false,
			Message: "Another calculation is already in progress",
			Details: "",
			Tabular: []TabularData{},
		}
	}

	ctx, cancel := context.WithCancel(ctx)
	a.cancelFunc = cancel
	a.isCalculating = true
	a.cancelMutex.Unlock()

	defer func() {
		cancel()

		a.cancelMutex.Lock()
		a.cancelFunc = nil
		a.isCalculating = false
		a.cancelMutex.Unlock()
	}()

	switch params.Mode {
	case "formula":
		return calcFormulaMode(ctx, &params)
	case "balance":
		return calcBalanceMode(ctx, &params)
	case "masses":
		return calcMassesMode(ctx, &params)
	default:
		return errorousCalculation(fmt.Sprintf("invalid calculation mode %q", params.Mode))
	}
}
