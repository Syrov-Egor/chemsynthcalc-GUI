// Save / load / export helpers, used by the File menu that only exists on
// platforms with the matching capabilities (desktop). All native IO goes
// through the `$platform` adapter.
import { platform } from "$platform";
import type {
    AppState,
    CalcRequest,
    CalcResult,
    ExportFormat,
} from "$lib/platform/types";
import { calculationManager } from "./buttonRun.svelte";

export interface FrontendState {
    textInput: string;
    controlInput: Partial<CalcRequest>;
}

function toAppState({ textInput, controlInput }: FrontendState): AppState {
    const parsedResult = calculationManager.parsedResult;
    return {
        equation: textInput || "",
        mode: controlInput?.mode || "masses",
        algorithm: controlInput?.algorithm || "auto",
        runMode: controlInput?.runMode || "balance",
        targetNum: controlInput?.targetNumber || 0,
        targetMass: controlInput?.targetMass || 1.0,
        intify: controlInput?.intify ?? true,
        outputPrecision: controlInput?.outputPrecision || 4,
        floatTolerance: controlInput?.floatTolerance || 8,
        maxComb: controlInput?.maxCombinations || 15,
        results: parsedResult ? JSON.stringify(parsedResult) : "Ready",
        spoilerOpen: false,
        status: calculationManager.isCalculating
            ? "w-3 h-3 bg-blue-500 rounded-full"
            : "w-3 h-3 bg-gray-500 rounded-full",
        statusMessage: calculationManager.isCalculating
            ? "Calculating..."
            : calculationManager.calculationError
              ? `Error: ${calculationManager.calculationError}`
              : "Ready",
        tabular: parsedResult?.tabular || [],
    };
}

export function fromAppState(state: AppState): FrontendState {
    return {
        textInput: state.equation ?? "",
        controlInput: {
            mode: state.mode || "masses",
            algorithm: state.algorithm || "auto",
            runMode: state.runMode || "balance",
            targetNumber: state.targetNum || 0,
            targetMass: state.targetMass || 1.0,
            intify: state.intify ?? true,
            outputPrecision: state.outputPrecision || 4,
            floatTolerance: state.floatTolerance || 8,
            maxCombinations: state.maxComb || 15,
        },
    };
}

// Returns an error message when the operation is not possible right now.
function blockedReason(action: string): string | null {
    if (calculationManager.isCalculating) {
        return `Cannot ${action} while calculation is in progress. Please wait for the calculation to complete.`;
    }
    if (!calculationManager.parsedResult) {
        return `Cannot ${action}: no calculation results available. Please run a calculation first.`;
    }
    return null;
}

export async function saveCurrentState(state: FrontendState): Promise<void> {
    const reason = blockedReason("save state");
    if (reason) {
        await platform.message?.("Save State Error", reason);
        return;
    }
    await platform.saveState?.(toAppState(state));
}

export async function loadAndApplyState(): Promise<FrontendState | null> {
    const loaded = await platform.loadState?.();
    // A cancelled dialog yields null; keep the current state then.
    if (!loaded) {
        return null;
    }
    restoreResults(loaded);
    return fromAppState(loaded);
}

// Rehydrate the results panel from the `results` field of a saved state.
function restoreResults(state: AppState) {
    const raw = state.results;
    calculationManager.calculationError = null;
    if (!raw || raw === "Ready") {
        calculationManager.parsedResult = null;
        return;
    }
    try {
        const parsed = JSON.parse(raw) as CalcResult;
        calculationManager.parsedResult = parsed.success ? parsed : null;
        if (!parsed.success) {
            calculationManager.calculationError =
                parsed.message || "Calculation failed";
        }
    } catch {
        calculationManager.parsedResult = null;
    }
}

/** Why Save/Export are unavailable right now, or null when they are allowed. */
export function saveBlockedReason(): string | null {
    return blockedReason("save state");
}

/** Why Load is unavailable right now, or null when it is allowed. */
export function loadBlockedReason(): string | null {
    if (calculationManager.isCalculating) {
        return "Cannot load state while calculation is in progress. Please wait for the calculation to complete.";
    }
    return null;
}

export async function exportFile(
    fmt: ExportFormat,
    state: FrontendState,
): Promise<void> {
    const reason = blockedReason("export file");
    if (reason) {
        await platform.message?.("Export File Error", reason);
        return;
    }

    if (state.controlInput?.mode !== "masses" && fmt !== "txt") {
        await platform.message?.(
            "Export File Error",
            "The .csv and .xlsx exports are for masses mode only",
        );
        return;
    }

    await platform.exportResult?.(fmt, toAppState(state));
}
