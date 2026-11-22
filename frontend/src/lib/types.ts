export type Mode = "formula" | "balance" | "masses";

export interface ControlInput {
    mode: Mode;
    algorithm: string;
    runMode: string;
    targetNumber: number;
    targetMass: number;
    intify: boolean;
    outputPrecision: number;
    floatTolerance: number;
    maxCombinations: number;
}

// The complete payload sent to the native calculation service.
export type CalculationParams = ControlInput & { equation: string };

// One row of the masses-mode result table. These names mirror the JSON tags
// in app.go.
export interface TabularData {
    formula: string;
    molar: number;
    masses: number;
}

// The shape returned by the Go calculation and passed to the UI. `tabular` is
// normalized to an array by the calculation manager.
export interface CalculationResult {
    success: boolean;
    message: string;
    details: string;
    cancelled: boolean;
    tabular: TabularData[];
}
