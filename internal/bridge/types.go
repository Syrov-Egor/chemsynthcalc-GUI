package bridge

// CalculationParams is the request contract between the frontend and the
// calculator core. The JSON tags here are the single source of truth shared by
// the WASM and Wails targets — mirrored by CalcRequest in
// frontend/src/lib/platform/types.ts.
type CalculationParams struct {
	Mode            string  `json:"mode"`
	Algorithm       string  `json:"algorithm"`
	RunMode         string  `json:"runMode"`
	TargetNum       int     `json:"targetNumber"`
	TargetMass      float64 `json:"targetMass"`
	Intify          bool    `json:"intify"`
	OutputPrecision int     `json:"outputPrecision"`
	FloatTolerance  int     `json:"floatTolerance"`
	MaxComb         int     `json:"maxCombinations"`
	Equation        string  `json:"equation"`
}

// CalculationResult is the response contract. Mirrored by CalcResult in
// frontend/src/lib/platform/types.ts.
type CalculationResult struct {
	Success   bool          `json:"success"`
	Message   string        `json:"message"`
	Details   string        `json:"details"`
	Cancelled bool          `json:"cancelled"`
	Tabular   []TabularData `json:"tabular"`
}

// TabularData holds one row of the masses-mode result table.
type TabularData struct {
	Formula string  `json:"formula"`
	Molar   float64 `json:"molar"`
	Masses  float64 `json:"masses"`
}
