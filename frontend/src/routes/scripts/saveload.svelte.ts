import { SaveState, LoadState, Export, ShowMessageDialog } from '../../../wailsjs/go/main/App';
import * as models from '../../../wailsjs/go/models';
import { globalState, updateGlobalState } from './globalState';

interface FrontendState {
    textInput: string;
    controlInput: {
        mode: string;
        algorithm: string;
        runMode: string;
        targetNumber: number;
        targetMass: number;
        intify: boolean;
        outputPrecision: number;
        floatTolerance: number;
        maxCombinations: number;
    };
    parsedResult?: any;
    calculationError?: string | null;
    isCalculating?: boolean;
}

function mapFrontendToAppState(frontendState: FrontendState): models.main.AppState {
    const stateData = {
        equation: frontendState.textInput || "",
        mode: frontendState.controlInput?.mode || "masses",
        algorithm: frontendState.controlInput?.algorithm || "auto",
        runMode: frontendState.controlInput?.runMode || "balance",
        targetNum: frontendState.controlInput?.targetNumber || 0,
        targetMass: frontendState.controlInput?.targetMass || 1.0,
        intify: frontendState.controlInput?.intify ?? true,
        outputPrecision: frontendState.controlInput?.outputPrecision || 4,
        floatTolerance: frontendState.controlInput?.floatTolerance || 8,
        maxComb: frontendState.controlInput?.maxCombinations || 15,
        results: frontendState.parsedResult ? JSON.stringify(frontendState.parsedResult) : "Ready",
        spoilerOpen: false,
        status: frontendState.isCalculating ? "w-3 h-3 bg-blue-500 rounded-full" : "w-3 h-3 bg-gray-500 rounded-full",
        statusMessage: frontendState.isCalculating ? "Calculating..." : (frontendState.calculationError ? `Error: ${frontendState.calculationError}` : "Ready"),
        tabular: frontendState.parsedResult?.tabular || []
    };

    return models.main.AppState.createFrom(stateData);
}

function mapAppStateToFrontend(appState: models.main.AppState): Partial<FrontendState> {
    return {
        textInput: appState.equation,
        controlInput: {
            mode: appState.mode || "masses",
            algorithm: appState.algorithm || "auto",
            runMode: appState.runMode || "balance",
            targetNumber: appState.targetNum || 0,
            targetMass: appState.targetMass || 1.0,
            intify: appState.intify ?? true,
            outputPrecision: appState.outputPrecision || 4,
            floatTolerance: appState.floatTolerance || 8,
            maxCombinations: appState.maxComb || 15,
        },
        parsedResult: appState.results && appState.results !== "Ready" ? JSON.parse(appState.results) : null,
        calculationError: appState.statusMessage?.startsWith("Error:") ? appState.statusMessage.substring(6) : null,
        isCalculating: appState.status?.includes("blue")
    };
}

export async function saveState(frontendState: FrontendState): Promise<void> {
    try {
        const appState = mapFrontendToAppState(frontendState);
        await SaveState(appState);
        console.log("State saved successfully");
    } catch (error) {
        console.error("Failed to save state:", error);
        throw new Error(`Failed to save state: ${error instanceof Error ? error.message : String(error)}`);
    }
}

export async function loadState(): Promise<Partial<FrontendState>> {
    try {
        const appState = await LoadState();
        if (!appState) {
            // User cancelled the file dialog
            return {};
        }

        const frontendState = mapAppStateToFrontend(appState);
        console.log("State loaded successfully");
        return frontendState;
    } catch (error) {
        console.error("Failed to load state:", error);
        throw new Error(`Failed to load state: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// Wrapper functions that use global state
export async function saveCurrentState(): Promise<void> {
    const currentState = await new Promise<FrontendState>((resolve) => {
        globalState.subscribe((state) => resolve(state as FrontendState))();
    });

    // Check if calculation is done
    const appState = mapFrontendToAppState(currentState);
    const isCalculating = currentState.isCalculating;
    const hasResults = appState.results && appState.results !== "Ready";

    if (isCalculating || !hasResults) {
        const errorMessage = isCalculating
            ? "Cannot save state while calculation is in progress. Please wait for the calculation to complete."
            : "Cannot save state: no calculation results available. Please run a calculation first.";

        await ShowMessageDialog(
            "Save State Error",
            errorMessage,
            "OK"
        );
        return;
    }

    return saveState(currentState);
}

export async function loadAndApplyState(): Promise<void> {
    const loadedState = await loadState();
    if (Object.keys(loadedState).length > 0) {
        updateGlobalState(loadedState);
    }
}

export async function exportFile(extension: string): Promise<void> {
    const currentState = await new Promise<FrontendState>((resolve) => {
        globalState.subscribe((state) => resolve(state as FrontendState))();
    });

    // Check if calculation is done
    const appState = mapFrontendToAppState(currentState);
    const isCalculating = currentState.isCalculating;
    const hasResults = appState.results && appState.results !== "Ready";

    if (isCalculating || !hasResults) {
        const errorMessage = isCalculating
            ? "Cannot export file while calculation is in progress. Please wait for the calculation to complete."
            : "Cannot export file: no calculation results available. Please run a calculation first.";

        await ShowMessageDialog(
            "Export File Error",
            errorMessage,
            "OK"
        );
        return;
    }

    if (appState.mode !== "masses" && extension !== "txt") {
        const errorMessage = "The .csv and .xlsx exports are for masses mode only";

        await ShowMessageDialog(
            "Export File Error",
            errorMessage,
            "OK"
        );
        return;
    }

    await Export(appState, extension);
}
