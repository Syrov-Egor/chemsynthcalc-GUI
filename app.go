package main

import (
	"context"
	"fmt"
	"math"
	"strings"
	"sync"

	g "github.com/Syrov-Egor/gosynthcalc"
)

// App struct
type App struct {
	ctx           context.Context
	cancelFunc    context.CancelFunc
	cancelMutex   sync.RWMutex
	isCalculating bool
}

// CalculationParams represents the parameters for a chemistry calculation
type CalculationParams struct {
	Equation        string  `json:"equation"`
	Mode            string  `json:"mode"`
	Algorithm       string  `json:"algorithm"`
	RunMode         string  `json:"runMode"`
	TargetNum       int     `json:"targetNum"`
	TargetMass      float64 `json:"targetMass"`
	Intify          bool    `json:"intify"`
	OutputPrecision int     `json:"outputPrecision"`
	FloatTolerance  int     `json:"floatTolerance"`
	MaxComb         int     `json:"maxComb"`
}

// CalculationResult represents the result of a chemistry calculation
type CalculationResult struct {
	Success   bool   `json:"success"`
	Message   string `json:"message"`
	Details   string `json:"details"`
	Cancelled bool   `json:"cancelled"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// StopCalculation cancels any running calculation
func (a *App) StopCalculation() {
	a.cancelMutex.Lock()
	defer a.cancelMutex.Unlock()

	if a.cancelFunc != nil {
		a.cancelFunc()
	}
}

// IsCalculating returns whether a calculation is currently running
func (a *App) IsCalculating() bool {
	a.cancelMutex.RLock()
	defer a.cancelMutex.RUnlock()
	return a.isCalculating
}

func (a *App) PerformCalculation(params CalculationParams) CalculationResult {
	// Set up cancellation context
	a.cancelMutex.Lock()
	ctx, cancel := context.WithCancel(context.Background())
	a.cancelFunc = cancel
	a.isCalculating = true
	a.cancelMutex.Unlock()

	// Cleanup when done
	defer func() {
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
		return CalculationResult{}
	}
}

func calcFormulaMode(ctx context.Context, params *CalculationParams) CalculationResult {
	// Check for cancellation
	select {
	case <-ctx.Done():
		return CalculationResult{Success: false, Message: "Calculation cancelled", Details: "", Cancelled: true}
	default:
	}

	form, err := g.NewChemicalFormula(params.Equation)
	if err != nil {
		return CalculationResult{Success: false, Message: err.Error(), Details: ""}
	}
	out := form.Output(uint(params.OutputPrecision)).String()
	return CalculationResult{Success: true, Message: "", Details: out}
}

func calcBalanceMode(ctx context.Context, params *CalculationParams) CalculationResult {
	// Check for cancellation at start
	select {
	case <-ctx.Done():
		return CalculationResult{Success: false, Message: "Calculation cancelled", Details: "", Cancelled: true}
	default:
	}

	reacOpts := g.ReactionOptions{
		Rmode:      g.Balance,
		Target:     params.TargetNum,
		TargerMass: params.TargetMass,
		Intify:     params.Intify,
		Precision:  8,
		Tolerance:  sciFloat(params.FloatTolerance),
	}

	reac, err := g.NewChemicalReaction(params.Equation, reacOpts)
	if err != nil {
		return CalculationResult{Success: false, Message: err.Error(), Details: ""}
	}

	bal, err := reac.Balancer()
	if err != nil {
		return CalculationResult{Success: false, Message: err.Error(), Details: ""}
	}

	var calcResult []float64
	var method string

	// Check for cancellation before starting computation
	select {
	case <-ctx.Done():
		return CalculationResult{Success: false, Message: "Calculation cancelled", Details: "", Cancelled: true}
	default:
	}

	switch params.Algorithm {
	case "auto":
		auto, err := bal.Auto()
		if err != nil {
			return CalculationResult{Success: false, Message: err.Error(), Details: ""}
		}
		calcResult = auto.Result
		method = auto.Method
	case "inv":
		calcResult, err = bal.Inv()
		if err != nil {
			return CalculationResult{Success: false, Message: err.Error(), Details: ""}
		}
		method = "Inv"
	case "gpinv":
		calcResult, err = bal.GPinv()
		if err != nil {
			return CalculationResult{Success: false, Message: err.Error(), Details: ""}
		}
		method = "GPinv"
	case "ppinv":
		calcResult, err = bal.PPinv()
		if err != nil {
			return CalculationResult{Success: false, Message: err.Error(), Details: ""}
		}
		method = "PPinv"
	case "comb":
		// For the long-running comb algorithm, we need to run it in a goroutine
		// and check for cancellation
		resultChan := make(chan []float64, 1)
		errorChan := make(chan error, 1)

		go func() {
			result, err := bal.Comb(uint(params.MaxComb))
			if err != nil {
				errorChan <- err
				return
			}
			resultChan <- result
		}()

		// Wait for either result or cancellation
		select {
		case <-ctx.Done():
			return CalculationResult{Success: false, Message: "Calculation cancelled", Details: "", Cancelled: true}
		case err := <-errorChan:
			return CalculationResult{Success: false, Message: err.Error(), Details: ""}
		case result := <-resultChan:
			calcResult = result
			method = "Comb"
		}
	}

	// Check for cancellation before final processing
	select {
	case <-ctx.Done():
		return CalculationResult{Success: false, Message: "Calculation cancelled", Details: "", Cancelled: true}
	default:
	}

	setErr := reac.SetCoefficients(calcResult)
	if setErr != nil {
		return CalculationResult{Success: false, Message: setErr.Error(), Details: ""}
	}

	finalReaction, fErr := reac.FinalReaction()
	if fErr != nil {
		return CalculationResult{Success: false, Message: fErr.Error(), Details: ""}
	}

	var output strings.Builder

	output.WriteString(fmt.Sprintf("Method: %s \n", method))
	output.WriteString(fmt.Sprintf("Coefficients: %v \n", calcResult))
	output.WriteString(fmt.Sprintf("Final reaction: %s \n", finalReaction))

	return CalculationResult{Success: true, Message: "", Details: output.String()}
}

func calcMassesMode(ctx context.Context, params *CalculationParams) CalculationResult {
	// Check for cancellation
	select {
	case <-ctx.Done():
		return CalculationResult{Success: false, Message: "Calculation cancelled", Details: "", Cancelled: true}
	default:
	}

	var rmode g.ReactionMode
	switch params.RunMode {
	case "balance":
		rmode = g.Balance
	case "check":
		rmode = g.Check
	case "force":
		rmode = g.Force
	}

	reacOpts := g.ReactionOptions{
		Rmode:      rmode,
		Target:     params.TargetNum,
		TargerMass: params.TargetMass,
		Intify:     params.Intify,
		Precision:  8,
		Tolerance:  sciFloat(params.FloatTolerance),
	}

	reac, rErr := g.NewChemicalReaction(params.Equation, reacOpts)

	if rErr != nil {
		return CalculationResult{Success: false, Message: rErr.Error(), Details: ""}
	}

	out, oErr := reac.Output(uint(params.OutputPrecision))
	if oErr != nil {
		return CalculationResult{Success: false, Message: oErr.Error(), Details: ""}
	}

	return CalculationResult{Success: true, Message: "", Details: out.String()}
}

func sciFloat(i int) float64 {
	if i == 0 {
		return 1.0
	}
	return math.Pow(10, float64(-i))
}
