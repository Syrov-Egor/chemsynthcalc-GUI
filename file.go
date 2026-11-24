package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/wailsapp/wails/v3/pkg/application"
	"github.com/xuri/excelize/v2"
)

const PERMISSION os.FileMode = 0644

// AppState is the serializable snapshot of the whole application. The JSON
// tags match the files written by earlier versions of the app, so old state
// files can still be opened.
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

// isDialogCancelled reports whether the platform returned its "user cancelled"
// error. Closing a file dialog is a normal outcome, not a failure to report.
func isDialogCancelled(err error) bool {
	if err == nil {
		return false
	}

	message := strings.ToLower(strings.TrimSpace(err.Error()))
	return message == "cancelled" ||
		message == "canceled" ||
		strings.Contains(message, "cancelled by user") ||
		strings.Contains(message, "canceled by user")
}

func openFileDialog(title string) (string, error) {
	app := application.Get()
	if app == nil {
		return "", fmt.Errorf("application is not running")
	}

	dialog := app.Dialog.OpenFile()
	dialog.SetTitle(title)
	dialog.SetDirectory(".")
	dialog.AddFilter("JSON Files", "*.json")

	filePath, err := dialog.PromptForSingleSelection()
	if isDialogCancelled(err) {
		return "", nil
	}
	return filePath, err
}

func saveFileDialog(title, defaultFilename, displayName, pattern string) (string, error) {
	app := application.Get()
	if app == nil {
		return "", fmt.Errorf("application is not running")
	}

	dialog := app.Dialog.SaveFileWithOptions(&application.SaveFileDialogOptions{
		Title:     title,
		Directory: ".",
		Filename:  defaultFilename,
		Filters: []application.FileFilter{
			{DisplayName: displayName, Pattern: pattern},
		},
	})

	filePath, err := dialog.PromptForSingleSelection()
	if isDialogCancelled(err) {
		return "", nil
	}
	return filePath, err
}

// SaveState asks for a destination and writes the state as indented JSON.
func (a *App) SaveState(state AppState) error {
	defaultFilename := generateFilename("json", state)
	filePath, err := saveFileDialog("Save State", defaultFilename, "JSON Files", "*.json")
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
	}

	if !strings.HasSuffix(strings.ToLower(filePath), ".json") {
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

// LoadState asks for a state file and returns its contents. A nil state and a
// nil error means the user cancelled the dialog.
func (a *App) LoadState() (*AppState, error) {
	filePath, err := openFileDialog("Load State")
	if err != nil {
		return nil, err
	}
	if filePath == "" {
		return nil, nil // User cancelled
	}

	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	var state AppState
	if err := json.Unmarshal(data, &state); err != nil {
		return nil, err
	}

	return &state, nil
}

// Export writes the calculated data in the requested format.
func (a *App) Export(state AppState, format string) error {
	switch format {
	case "txt":
		return a.exportToTXT(state)
	case "csv":
		return a.exportToCSV(state)
	case "xlsx":
		return a.exportToXLSX(state)
	default:
		return fmt.Errorf("wrong file format %s", format)
	}
}

func (a *App) exportToTXT(state AppState) error {
	defaultFilename := generateFilename("txt", state)
	filePath, err := saveFileDialog("Export to TXT", defaultFilename, "Text files", "*.txt")
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
	}

	if !strings.HasSuffix(strings.ToLower(filePath), ".txt") {
		filePath += ".txt"
	}

	var res CalculationResult
	if err := json.Unmarshal([]byte(state.Results), &res); err != nil {
		return err
	}

	return os.WriteFile(filePath, []byte(res.Details), PERMISSION)
}

func (a *App) exportToCSV(state AppState) error {
	defaultFilename := generateFilename("csv", state)
	filePath, err := saveFileDialog("Export to CSV", defaultFilename, "Comma separated values files", "*.csv")
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
	}

	if !strings.HasSuffix(strings.ToLower(filePath), ".csv") {
		filePath += ".csv"
	}

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	writer := csv.NewWriter(file)

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

	writer.Flush()
	return writer.Error()
}

func (a *App) exportToXLSX(state AppState) error {
	defaultFilename := generateFilename("xlsx", state)
	filePath, err := saveFileDialog("Export to XLSX", defaultFilename, "Excel files", "*.xlsx")
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
	}

	if !strings.HasSuffix(strings.ToLower(filePath), ".xlsx") {
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

	return f.SaveAs(filePath)
}

func (a *App) Quit() {
	if app := application.Get(); app != nil {
		app.Quit()
	}
}
