package main

import (
	"context"
	"fmt"
	"math"
	"strings"

	g "github.com/Syrov-Egor/gosynthcalc"
)

// App struct
type App struct {
	ctx context.Context
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
}

// CalculationResult represents the result of a chemistry calculation
type CalculationResult struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Details string `json:"details"`
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

func (a *App) PerformCalculation(params CalculationParams) CalculationResult {
	switch params.Mode {
	case "formula":
		return calcFormulaMode(&params)
	case "balance":
		return calcBalanceMode(&params)
	case "masses":
		return calcMassesMode(&params)
	default:
		return CalculationResult{}
	}
}

func calcFormulaMode(params *CalculationParams) CalculationResult {
	form, err := g.NewChemicalFormula(params.Equation)
	if err != nil {
		return CalculationResult{Success: false, Message: err.Error(), Details: ""}
	}
	out := form.Output(uint(params.OutputPrecision)).String()
	return CalculationResult{Success: true, Message: "", Details: out}
}

func calcBalanceMode(params *CalculationParams) CalculationResult {
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
		calcResult, err = bal.Comb(15)
		if err != nil {
			return CalculationResult{Success: false, Message: err.Error(), Details: ""}
		}
		method = "Comb"
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

func calcMassesMode(params *CalculationParams) CalculationResult {
	return CalculationResult{Success: false, Message: "", Details: ""}
}

func sciFloat(i int) float64 {
	if i == 0 {
		return 1.0
	}
	return math.Pow(10, float64(-i))
}
