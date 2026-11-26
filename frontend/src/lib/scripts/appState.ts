import type { AppState, TabularData } from "../../../bindings/chemsynthcalc";
import type { CalculationResult, ControlInput } from "$lib/types";
import { ALGORITHMS, MODES, RUN_MODES } from "./validation";

const READY = "Ready";

export interface LoadedAppState {
    textInput: string;
    controlInput: ControlInput;
    parsedResult: CalculationResult | null;
    calculationError: string | null;
}

function isOneOf<T extends string>(
    value: unknown,
    allowed: readonly T[],
): value is T {
    return (
        typeof value === "string" &&
        (allowed as readonly string[]).includes(value)
    );
}

function finiteNumber(value: unknown, fallback: number): number {
    return typeof value === "number" && Number.isFinite(value)
        ? value
        : fallback;
}

function integer(value: unknown, fallback: number): number {
    return typeof value === "number" && Number.isInteger(value)
        ? value
        : fallback;
}

function tabularRows(value: unknown): TabularData[] {
    if (!Array.isArray(value)) return [];

    return value
        .filter(
            (row): row is TabularData =>
                typeof row === "object" &&
                row !== null &&
                typeof (row as TabularData).formula === "string" &&
                Number.isFinite((row as TabularData).molar) &&
                Number.isFinite((row as TabularData).masses),
        )
        .map((row) => ({
            formula: row.formula,
            molar: row.molar,
            masses: row.masses,
        }));
}

function parseResult(
    results: unknown,
    fallbackTabular: TabularData[],
): CalculationResult | null {
    if (typeof results !== "string" || results === "" || results === READY) {
        return null;
    }

    try {
        const parsed: unknown = JSON.parse(results);
        if (typeof parsed !== "object" || parsed === null) return null;

        const result = parsed as Partial<CalculationResult>;
        return {
            success: Boolean(result.success),
            message: typeof result.message === "string" ? result.message : "",
            details: typeof result.details === "string" ? result.details : "",
            cancelled: Boolean(result.cancelled),
            tabular: Array.isArray(result.tabular)
                ? tabularRows(result.tabular)
                : fallbackTabular,
        };
    } catch {
        return null;
    }
}

// Convert the live frontend state into the JSON shape written by the Go
// SaveState method. The field names intentionally match older state files.
export function toAppState(
    textInput: string,
    controlInput: ControlInput,
    parsedResult: CalculationResult | null,
    calculationError: string | null,
    isCalculating: boolean,
): AppState {
    return {
        equation: textInput ?? "",
        mode: controlInput.mode,
        algorithm: controlInput.algorithm,
        runMode: controlInput.runMode,
        targetNum: controlInput.targetNumber,
        targetMass: controlInput.targetMass,
        intify: controlInput.intify,
        outputPrecision: controlInput.outputPrecision,
        floatTolerance: controlInput.floatTolerance,
        maxComb: controlInput.maxCombinations,
        results: parsedResult ? JSON.stringify(parsedResult) : READY,
        spoilerOpen: false,
        status: isCalculating
            ? "w-3 h-3 bg-blue-500 rounded-full"
            : "w-3 h-3 bg-gray-500 rounded-full",
        statusMessage: isCalculating
            ? "Calculating..."
            : calculationError
              ? `Error: ${calculationError}`
              : READY,
        tabular: parsedResult?.tabular ?? [],
    };
}

// Convert a loaded JSON state into values the Svelte components can bind to.
// Unknown or malformed values fall back to the same defaults the app starts
// with, so a hand-edited file cannot break the controls.
export function fromAppState(state: AppState): LoadedAppState {
    const tabular = tabularRows(state.tabular);
    const parsedResult = parseResult(state.results, tabular);

    const controlInput: ControlInput = {
        mode: isOneOf(state.mode, MODES) ? state.mode : "masses",
        algorithm: isOneOf(state.algorithm, ALGORITHMS)
            ? state.algorithm
            : "auto",
        runMode: isOneOf(state.runMode, RUN_MODES) ? state.runMode : "balance",
        targetNumber: integer(state.targetNum, 0),
        targetMass: finiteNumber(state.targetMass, 1.0),
        intify: typeof state.intify === "boolean" ? state.intify : true,
        outputPrecision: integer(state.outputPrecision, 4),
        floatTolerance: integer(state.floatTolerance, 8),
        maxCombinations: integer(state.maxComb, 15),
    };

    const calculationError =
        typeof state.statusMessage === "string" &&
        state.statusMessage.startsWith("Error: ")
            ? state.statusMessage.slice("Error: ".length)
            : null;

    return {
        textInput: typeof state.equation === "string" ? state.equation : "",
        controlInput,
        parsedResult:
            parsedResult && parsedResult.cancelled ? null : parsedResult,
        calculationError,
    };
}

