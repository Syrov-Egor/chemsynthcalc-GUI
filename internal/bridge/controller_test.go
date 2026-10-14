package bridge

import "testing"

func params(equation string) CalculationParams {
	return CalculationParams{
		Mode:            "masses",
		Algorithm:       "auto",
		RunMode:         "balance",
		TargetNum:       0,
		TargetMass:      1.0,
		Intify:          true,
		OutputPrecision: 4,
		FloatTolerance:  8,
		MaxComb:         15,
		Equation:        equation,
	}
}

func TestPerformCalculationBalancesAndSplitsMasses(t *testing.T) {
	c := NewController()

	result := c.PerformCalculation(params("H2 + O2 -> H2O"))
	if !result.Success {
		t.Fatalf("calculation failed: %s (%s)", result.Message, result.Details)
	}
	if len(result.Tabular) == 0 {
		t.Fatal("expected a masses table, got none")
	}
	if len(result.Details) == 0 {
		t.Fatal("expected a balanced equation in details")
	}
}

func TestPerformCalculationRejectsGarbage(t *testing.T) {
	c := NewController()

	result := c.PerformCalculation(params("not a formula"))
	if result.Success {
		t.Fatalf("expected failure, got success: %q", result.Details)
	}
	if result.Message == "" {
		t.Fatal("expected an error message")
	}
}

func TestCancelIsPossibleWhileIdle(t *testing.T) {
	c := NewController()
	c.StopCalculation()
	if c.IsCalculating() {
		t.Fatal("controller should be idle after StopCalculation with nothing running")
	}
}
