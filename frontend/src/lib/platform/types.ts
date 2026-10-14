// Shared platform contract. Components import the active implementation via
// the `$platform` alias (see vite.config.ts) and never touch WASM or Wails
// code directly. The alias resolves to:
//
//   web.ts     in web/browser mode    (WASM in a worker)
//   wails.ts   in desktop mode        (Wails v3 bindings)
//
// JSON field names in CalcRequest/CalcResult/AppState mirror the Go structs
// (internal/bridge/types.go and desktop/file_service.go) — keep them in sync.

export interface CalcRequest {
    equation: string;
    mode: string;
    algorithm: string;
    runMode: string;
    targetNumber: number;
    targetMass: number;
    intify: boolean;
    outputPrecision: number;
    floatTolerance: number;
    maxCombinations: number;
}

export interface TabularData {
    formula: string;
    molar: number;
    masses: number;
}

export interface CalcResult {
    success: boolean;
    message: string;
    details: string;
    cancelled: boolean;
    tabular?: TabularData[];
}

export interface Capabilities {
    /** Native save/load of the application state to JSON files. */
    fileIO: boolean;
    /** Export of results to txt/csv/xlsx files. */
    export: boolean;
    /** Formats offered by the "Export to…" menu (empty when export is off). */
    exportFormats: ExportFormat[];
    /** Ability to quit the application from the UI. */
    quit: boolean;
}

/** Persisted application state (see AppState in desktop/file_service.go). */
export interface AppState {
    equation: string;
    mode: string;
    algorithm: string;
    runMode: string;
    targetNum: number;
    targetMass: number;
    intify: boolean;
    outputPrecision: number;
    floatTolerance: number;
    maxComb: number;
    results: string;
    spoilerOpen: boolean;
    status: string;
    statusMessage: string;
    tabular: TabularData[];
}

export type ExportFormat = "txt" | "csv" | "xlsx";

export interface Platform {
    calculate(req: CalcRequest): Promise<CalcResult>;
    /** Stop the calculation in progress (no-op if none is running). */
    stop(): void;
    /** Release backend resources (e.g. terminate the WASM worker). */
    reset?(): void;
    /** True while the calculation backend is still loading. */
    readonly isLoading: boolean;
    /** Shown next to the run button while isLoading is true. */
    readonly loadingHint?: string;
    readonly capabilities: Capabilities;
    saveState?(state: AppState): Promise<void>;
    /** Resolves to null when the user cancels the file dialog. */
    loadState?(): Promise<AppState | null>;
    exportResult?(fmt: ExportFormat, state: AppState): Promise<void>;
    message?(title: string, message: string): Promise<void>;
    quit?(): void;
    openExternal?(url: string): void;
}
