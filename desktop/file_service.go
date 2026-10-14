package desktop

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

const filePermissions os.FileMode = 0644

// AppState is the persisted application state saved to / loaded from JSON
// files. The JSON tags are part of the on-disk file format — keep them stable
// so old saved states remain loadable. Mirrored by AppState in
// frontend/src/lib/platform/types.ts.
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

// TabularData mirrors bridge.TabularData for the persisted state.
type TabularData struct {
	Formula string  `json:"formula"`
	Molar   float64 `json:"molar"`
	Masses  float64 `json:"masses"`
}

// FileService provides native dialogs, state save/load and result export.
// It needs the application instance for dialogs, so it is constructed after
// the app and registered with app.RegisterService.
type FileService struct {
	app *application.App
}

// NewFileService creates the file service bound to the given app.
func NewFileService(app *application.App) *FileService {
	return &FileService{app: app}
}

// SaveState asks for a JSON file path and writes the state to it.
func (s *FileService) SaveState(state AppState) error {
	filePath, err := s.app.Dialog.SaveFileWithOptions(&application.SaveFileDialogOptions{
		Title:      "Save State",
		Filters:    []application.FileFilter{{DisplayName: "JSON Files", Pattern: "*.json"}},
		Filename:   generateFilename("json", state),
		Directory:  ".",
	}).PromptForSingleSelection()
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
	}
	if !strings.HasSuffix(filePath, ".json") {
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

	return os.WriteFile(filePath, data, filePermissions)
}

// LoadState asks for a JSON file path and reads the state from it. A cancelled
// dialog yields an empty AppState with no error.
func (s *FileService) LoadState() (AppState, error) {
	filePath, err := s.app.Dialog.OpenFileWithOptions(&application.OpenFileDialogOptions{
		Title:         "Load State",
		CanChooseFiles: true,
		Filters:       []application.FileFilter{{DisplayName: "JSON Files", Pattern: "*.json"}},
		Directory:     ".",
	}).PromptForSingleSelection()
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

// Export writes the calculation results in the requested format: "txt",
// "csv" or "xlsx".
func (s *FileService) Export(state AppState, format string) error {
	switch format {
	case "txt":
		return s.exportToTXT(state)
	case "csv":
		return s.exportToCSV(state)
	case "xlsx":
		return s.exportToXLSX(state)
	default:
		return fmt.Errorf("wrong file format %s", format)
	}
}

func (s *FileService) exportToTXT(state AppState) error {
	filePath, err := s.app.Dialog.SaveFileWithOptions(&application.SaveFileDialogOptions{
		Title:     "Export to TXT",
		Filters:   []application.FileFilter{{DisplayName: "Text files", Pattern: "*.txt"}},
		Directory: ".",
		Filename:  generateFilename("txt", state),
	}).PromptForSingleSelection()
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
	}
	if !strings.HasSuffix(filePath, ".txt") {
		filePath += ".txt"
	}

	var res CalculationResultDTO
	if err := json.Unmarshal([]byte(state.Results), &res); err != nil {
		return err
	}
	return os.WriteFile(filePath, []byte(res.Details), filePermissions)
}

func (s *FileService) exportToCSV(state AppState) error {
	filePath, err := s.app.Dialog.SaveFileWithOptions(&application.SaveFileDialogOptions{
		Title:     "Export to CSV",
		Filters:   []application.FileFilter{{DisplayName: "Comma separated values files", Pattern: "*.csv"}},
		Directory: ".",
		Filename:  generateFilename("csv", state),
	}).PromptForSingleSelection()
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

	if err := writer.Write([]string{"Formula", "Molar Mass", "Mass"}); err != nil {
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

func (s *FileService) exportToXLSX(state AppState) error {
	filePath, err := s.app.Dialog.SaveFileWithOptions(&application.SaveFileDialogOptions{
		Title:     "Export to XLSX",
		Filters:   []application.FileFilter{{DisplayName: "Excel files", Pattern: "*.xlsx"}},
		Directory: ".",
		Filename:  generateFilename("xlsx", state),
	}).PromptForSingleSelection()
	if err != nil {
		return err
	}
	if filePath == "" {
		return nil // User cancelled
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

	return f.SaveAs(filePath)
}

// ShowMessageDialog displays a native information dialog.
func (s *FileService) ShowMessageDialog(title, message string) {
	s.app.Dialog.Info().
		SetTitle(title).
		SetMessage(message).
		Show()
}

// Quit exits the application.
func (s *FileService) Quit() {
	s.app.Quit()
}

// CalculationResultDTO is only used to decode the JSON blob stored in
// AppState.Results when exporting to TXT.
type CalculationResultDTO struct {
	Details string `json:"details"`
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
