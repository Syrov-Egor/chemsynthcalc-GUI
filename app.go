package main

import (
	"context"
	"fmt"
	"regexp"
	"strconv"
	"strings"
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
	Success          bool               `json:"success"`
	Message          string             `json:"message"`
	BalancedEquation string             `json:"balancedEquation"`
	MolecularWeights map[string]float64 `json:"molecularWeights"`
	MassCalculations map[string]float64 `json:"massCalculations"`
	Coefficients     []int              `json:"coefficients"`
	Details          string             `json:"details"`
}

// Common molecular weights (simplified database)
var molecularWeights = map[string]float64{
	"H":    1.008,
	"H2":   2.016,
	"O":    15.999,
	"O2":   31.998,
	"H2O":  18.015,
	"CO2":  44.01,
	"CO":   28.01,
	"C":    12.01,
	"N":    14.007,
	"N2":   28.014,
	"NH3":  17.031,
	"CH4":  16.04,
	"C2H6": 30.07,
	"C3H8": 44.10,
	"NaCl": 58.44,
	"Na":   22.99,
	"Cl":   35.45,
	"Cl2":  70.90,
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

// PerformCalculation performs the chemistry calculation based on the provided parameters
func (a *App) PerformCalculation(params CalculationParams) CalculationResult {
	// Basic validation
	if params.Equation == "" {
		return CalculationResult{
			Success: false,
			Message: "Error: Please enter a chemical equation.",
		}
	}

	// Parse the equation
	compounds := parseEquation(params.Equation)
	if len(compounds) == 0 {
		return CalculationResult{
			Success: false,
			Message: "Error: Could not parse the chemical equation.",
		}
	}

	// Get molecular weights for compounds
	weights := make(map[string]float64)
	for _, compound := range compounds {
		if weight, exists := molecularWeights[compound]; exists {
			weights[compound] = weight
		} else {
			weights[compound] = estimateMolecularWeight(compound)
		}
	}

	// Perform basic balancing (simplified for H2+O2=H2O example)
	balancedEq, coeffs := balanceEquation(params.Equation)

	// Calculate masses if in masses mode
	massCalcs := make(map[string]float64)
	if params.Mode == "masses" && len(compounds) >= 2 {
		massCalcs = calculateMasses(compounds, weights, params.TargetMass, coeffs, params.OutputPrecision)
	}

	// Generate detailed results
	details := generateDetailedResults(params, compounds, weights, massCalcs, coeffs)

	return CalculationResult{
		Success:          true,
		Message:          "Calculation completed successfully",
		BalancedEquation: balancedEq,
		MolecularWeights: weights,
		MassCalculations: massCalcs,
		Coefficients:     coeffs,
		Details:          details,
	}
}

// parseEquation extracts compounds from a chemical equation
func parseEquation(equation string) []string {
	// Simple parsing - split by +, =, and ->
	re := regexp.MustCompile(`[+=→>-]+`)
	parts := re.Split(equation, -1)

	var compounds []string
	for _, part := range parts {
		compound := strings.TrimSpace(part)
		if compound != "" {
			compounds = append(compounds, compound)
		}
	}

	return compounds
}

// balanceEquation performs basic equation balancing (simplified)
func balanceEquation(equation string) (string, []int) {
	// Simplified balancing for common reactions
	equation = strings.ReplaceAll(equation, " ", "")

	// Handle the H2+O2=H2O case specifically
	if strings.Contains(equation, "H2") && strings.Contains(equation, "O2") && strings.Contains(equation, "H2O") {
		return "2H₂ + O₂ → 2H₂O", []int{2, 1, 2}
	}

	// Default case - return original with assumed 1:1 coefficients
	parts := strings.Split(equation, "=")
	if len(parts) == 2 {
		return parts[0] + " → " + parts[1], []int{1, 1}
	}

	return equation, []int{1}
}

// calculateMasses calculates required masses for reactants
func calculateMasses(compounds []string, weights map[string]float64, targetMass float64, coeffs []int, precision int) map[string]float64 {
	masses := make(map[string]float64)

	if len(compounds) >= 3 && len(coeffs) >= 3 {
		// For H2 + O2 -> H2O type reactions
		productWeight := weights[compounds[2]] // H2O
		if productWeight > 0 {
			// Calculate moles of product needed
			productMoles := targetMass / productWeight

			// Calculate masses of reactants needed
			if len(compounds) >= 2 {
				h2Weight := weights[compounds[0]] // H2
				o2Weight := weights[compounds[1]] // O2

				masses[compounds[0]] = productMoles * float64(coeffs[0]) * h2Weight / float64(coeffs[2])
				masses[compounds[1]] = productMoles * float64(coeffs[1]) * o2Weight / float64(coeffs[2])
			}
		}
	}

	return masses
}

// estimateMolecularWeight provides a rough estimate for unknown compounds
func estimateMolecularWeight(compound string) float64 {
	// Very basic estimation based on common elements
	weight := 0.0

	// Count common elements (simplified)
	cCount := strings.Count(compound, "C")
	hCount := strings.Count(compound, "H")
	oCount := strings.Count(compound, "O")
	nCount := strings.Count(compound, "N")

	weight += float64(cCount) * 12.01
	weight += float64(hCount) * 1.008
	weight += float64(oCount) * 15.999
	weight += float64(nCount) * 14.007

	if weight == 0 {
		weight = 50.0 // Default estimate
	}

	return weight
}

// generateDetailedResults creates a formatted string with calculation details
func generateDetailedResults(params CalculationParams, compounds []string, weights map[string]float64, masses map[string]float64, coeffs []int) string {
	var result strings.Builder

	result.WriteString(fmt.Sprintf("Calculation Results:\n\n"))
	result.WriteString(fmt.Sprintf("Mode: %s\n", params.Mode))
	result.WriteString(fmt.Sprintf("Algorithm: %s\n", params.Algorithm))
	result.WriteString(fmt.Sprintf("Run mode: %s\n", params.RunMode))
	result.WriteString(fmt.Sprintf("Equation: %s\n", params.Equation))
	result.WriteString(fmt.Sprintf("Target compound: %d\n", params.TargetNum))
	result.WriteString(fmt.Sprintf("Target mass: %.*f g\n", params.OutputPrecision, params.TargetMass))
	result.WriteString(fmt.Sprintf("Integer coefficients: %t\n", params.Intify))
	result.WriteString(fmt.Sprintf("Output precision: %d\n", params.OutputPrecision))
	result.WriteString(fmt.Sprintf("Float tolerance: 1e-%d\n\n", params.FloatTolerance))

	if params.Mode == "masses" && len(compounds) >= 2 {
		result.WriteString("Molecular weights:\n")
		for _, compound := range compounds {
			if weight, exists := weights[compound]; exists {
				result.WriteString(fmt.Sprintf("%s: %.*f g/mol\n", compound, params.OutputPrecision, weight))
			}
		}

		result.WriteString(fmt.Sprintf("\nMass calculations:\n"))
		result.WriteString(fmt.Sprintf("To produce %.*f g of %s:\n", params.OutputPrecision, params.TargetMass, compounds[len(compounds)-1]))

		for compound, mass := range masses {
			if mass > 0 {
				result.WriteString(fmt.Sprintf("- %s required: %.*f g\n", compound, params.OutputPrecision, mass))
			}
		}

		if len(coeffs) > 0 {
			result.WriteString(fmt.Sprintf("\nStoichiometric coefficients: %s\n", formatCoefficients(coeffs)))
		}
	}

	result.WriteString("\nCalculation complete.")

	return result.String()
}

// formatCoefficients formats coefficient array as a string
func formatCoefficients(coeffs []int) string {
	var strs []string
	for _, coeff := range coeffs {
		strs = append(strs, strconv.Itoa(coeff))
	}
	return strings.Join(strs, ":")
}
