package main

import (
	"context"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/wailsapp/wails/v2/pkg/runtime"
	"github.com/xuri/excelize/v2"
)

const PERMISSION os.FileMode = 0644

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
	defaultFilename := generateFilename("json", state)
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

	return os.WriteFile(filePath, data, PERMISSION)
}

func generateFilename(extension string, state AppState) string {
	defaultFilename := "CSC_Untitled_" + time.Now().Format("20060102_150405") + "." + extension
	if state.Equation != "" {
		sanitizedEq := sanitizeEquation(state.Equation)
		if sanitizedEq != "" {
			defaultFilename = "CSC_" + state.Mode + "_" + sanitizedEq + "_" + time.Now().Format("20060102_150405") + "." + extension
		}
	}
	return defaultFilename
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

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) StopCalculation() {
	a.cancelMutex.Lock()
	defer a.cancelMutex.Unlock()

	if a.cancelFunc != nil {
		a.cancelFunc()
	}
}

func (a *App) IsCalculating() bool {
	a.cancelMutex.RLock()
	defer a.cancelMutex.RUnlock()
	return a.isCalculating
}

func (a *App) PerformCalculation(params CalculationParams) CalculationResult {
	a.cancelMutex.Lock()
	ctx, cancel := context.WithCancel(context.Background())
	a.cancelFunc = cancel
	a.isCalculating = true
	a.cancelMutex.Unlock()

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

func (a *App) Export(state AppState, format string) error {
	var err error
	switch format {
	case "txt":
		err = a.exportToTXT(state)
		if err != nil {
			return err
		}
	case "csv":
		err = a.exportToCSV(state)
		if err != nil {
			return err
		}
	case "xlsx":
		err = a.exportToXLSX(state)
		if err != nil {
			return err
		}
	default:
		return fmt.Errorf("wrong file format %s", format)
	}
	return nil
}

func (a *App) exportToTXT(state AppState) error {
	defaultFilename := generateFilename("txt", state)
	filePath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title: "Export to TXT",
		Filters: []runtime.FileFilter{
			{DisplayName: "Text files", Pattern: "*.txt"},
		},
		DefaultDirectory: ".",
		DefaultFilename:  defaultFilename,
	})
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
	}

	if !strings.HasSuffix(filePath, ".txt") {
		filePath += ".txt"
	}

	var res CalculationResult

	err = json.Unmarshal([]byte(state.Results), &res)
	if err != nil {
		return err
	}
	data := []byte(res.Details)
	return os.WriteFile(filePath, data, PERMISSION)
}

func (a *App) exportToCSV(state AppState) error {
	defaultFilename := generateFilename("csv", state)
	filePath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title: "Export to CSV",
		Filters: []runtime.FileFilter{
			{DisplayName: "Comma separated values files", Pattern: "*.csv"},
		},
		DefaultDirectory: ".",
		DefaultFilename:  defaultFilename,
	})
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
	}

	if !strings.HasSuffix(filePath, ".csv") {
		filePath += ".csv"
	}

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	header := []string{"Formula", "Molar Mass", "Mass"}
	if err := writer.Write(header); err != nil {
		return err
	}

	for _, row := range state.Tabular {
		record := []string{
			row.Formula,
			strconv.FormatFloat(row.Molar, 'f', -1, 64),
			strconv.FormatFloat(row.Masses, 'f', -1, 64),
		}
		if err := writer.Write(record); err != nil {
			return err
		}
	}

	return nil
}

func (a *App) exportToXLSX(state AppState) error {
	defaultFilename := generateFilename("xlsx", state)
	filePath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title: "Export to XLSX",
		Filters: []runtime.FileFilter{
			{DisplayName: "Excel files", Pattern: "*.xlsx"},
		},
		DefaultDirectory: ".",
		DefaultFilename:  defaultFilename,
	})
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil
	}

	if !strings.HasSuffix(filePath, ".xlsx") {
		filePath += ".xlsx"
	}

	f := excelize.NewFile()
	defer f.Close()

	sheetName := "Sheet1"

	headers := []string{"Formula", "Molar Mass", "Mass"}
	for i, header := range headers {
		cell := fmt.Sprintf("%s1", string(rune('A'+i)))
		if err := f.SetCellValue(sheetName, cell, header); err != nil {
			return err
		}
	}

	for i, row := range state.Tabular {
		rowNum := i + 2 // Start from row 2 (after headers)

		if err := f.SetCellValue(sheetName, fmt.Sprintf("A%d", rowNum), row.Formula); err != nil {
			return err
		}
		if err := f.SetCellValue(sheetName, fmt.Sprintf("B%d", rowNum), row.Molar); err != nil {
			return err
		}
		if err := f.SetCellValue(sheetName, fmt.Sprintf("C%d", rowNum), row.Masses); err != nil {
			return err
		}
	}

	if err := f.SaveAs(filePath); err != nil {
		return err
	}

	return nil
}

func (a *App) ShowMessageDialog(title, message, buttonText string) (string, error) {
	return runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Title:   title,
		Message: message,
		Buttons: []string{buttonText},
		Icon:    icon,
	})
}
