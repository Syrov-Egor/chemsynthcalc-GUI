package main

import (
	"context"
	"encoding/json"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx           context.Context
	cancelFunc    context.CancelFunc
	cancelMutex   sync.RWMutex
	isCalculating bool
}

type AppState struct {
	Equation        string        `json:"equation"`
	Mode            string        `json:"mode"`
	Algorithm       string        `json:"algorithm"`
	RunMode         string        `json:"runMode"`
	TargetNum       int           `json:"targetNum"`
	TargetMass      float64       `json:"targetMass"`
	Intify          bool          `json:"intify"`
	OutputPrecision int           `json:"outputPrecision"`
	FloatTolerance  int           `json:"floatTolerance"`
	MaxComb         int           `json:"maxComb"`
	Results         string        `json:"results"`
	SpoilerOpen     bool          `json:"spoilerOpen"`
	Status          string        `json:"status"`
	StatusMessage   string        `json:"statusMessage"`
	Tabular         []TabularData `json:"tabular,omitempty"`
}

func (a *App) SaveState(state AppState) error {
	defaultFilename := "CSC_Untitled_" + time.Now().Format("20060102_150405") + ".json"
	if state.Equation != "" {
		sanitizedEq := sanitizeEquation(state.Equation)
		if sanitizedEq != "" {
			defaultFilename = "CSC_" + state.Mode + "_" + sanitizedEq + "_" + time.Now().Format("20060102_150405") + ".json"
		}
	}
	filePath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title: "Save State",
		Filters: []runtime.FileFilter{
			{DisplayName: "JSON Files", Pattern: "*.json"},
		},
		DefaultFilename:  defaultFilename,
		DefaultDirectory: ".",
	})
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
	}

	if filePath[len(filePath)-5:] != ".json" {
		filePath += ".json"
	}

	// Ensure all fields have default values
	if state.Mode == "" {
		state.Mode = "masses" // Default mode
	}
	if state.Algorithm == "" {
		state.Algorithm = "auto"
	}
	if state.RunMode == "" {
		state.RunMode = "balance"
	}
	if state.Results == "" {
		state.Results = "Ready"
	}
	if state.Status == "" {
		state.Status = "w-3 h-3 bg-gray-500 rounded-full"
		state.StatusMessage = "Ready"
	}

	data, err := json.MarshalIndent(state, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(filePath, data, 0644)
}

func sanitizeEquation(equation string) string {
	sanitized := strings.Map(func(r rune) rune {
		switch {
		case r >= 'a' && r <= 'z':
			return r
		case r >= 'A' && r <= 'Z':
			return r
		case r >= '0' && r <= '9':
			return r
		case r == '+', r == '=', r == '-', r == '_':
			return r
		default:
			return -1
		}
	}, equation)

	if len(sanitized) > 200 {
		sanitized = sanitized[:200]
	}

	if sanitized == "" {
		return "Equation"
	}

	return sanitized
}

func (a *App) LoadState() (AppState, error) {
	filePath, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Load State",
		Filters: []runtime.FileFilter{
			{DisplayName: "JSON Files", Pattern: "*.json"},
		},
		DefaultDirectory: ".",
	})
	if err != nil {
		return AppState{}, err
	}
	if filePath == "" {
		return AppState{}, nil // User cancelled
	}

	data, err := os.ReadFile(filePath)
	if err != nil {
		return AppState{}, err
	}

	var state AppState
	err = json.Unmarshal(data, &state)
	return state, err
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
	Success   bool          `json:"success"`
	Message   string        `json:"message"`
	Details   string        `json:"details"`
	Cancelled bool          `json:"cancelled"`
	Tabular   []TabularData `json:"tabular"`
}

type TabularData struct {
	Formula string  `json:"formula"`
	Molar   float64 `json:"molar"`
	Masses  float64 `json:"masses"`
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
