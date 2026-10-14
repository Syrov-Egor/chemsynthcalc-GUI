// Package desktop contains the Wails-only glue: services that expose the
// shared calculation bridge plus native dialogs, file IO and export. Nothing
// in this package may be imported by the WASM target — it pulls in Wails and
// excelize, which TinyGo cannot build.
package desktop

import "github.com/Syrov-Egor/chemsynthcalc-GUI/internal/bridge"

// CalcService exposes the shared calculation bridge to the frontend through
// Wails bindings.
type CalcService struct {
	controller *bridge.Controller
}

// NewCalcService creates the calculation service.
func NewCalcService() *CalcService {
	return &CalcService{controller: bridge.NewController()}
}

// PerformCalculation runs the requested calculation mode.
func (s *CalcService) PerformCalculation(params bridge.CalculationParams) bridge.CalculationResult {
	return s.controller.PerformCalculation(params)
}

// StopCalculation cancels the calculation currently in progress, if any.
func (s *CalcService) StopCalculation() {
	s.controller.StopCalculation()
}

// IsCalculating reports whether a calculation is currently in progress.
func (s *CalcService) IsCalculating() bool {
	return s.controller.IsCalculating()
}
