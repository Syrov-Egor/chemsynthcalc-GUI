package main

import (
	"context"
	"sync"
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
