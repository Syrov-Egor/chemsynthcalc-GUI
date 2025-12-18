import { writable } from 'svelte/store';

// Global state store for the application
export const globalState = writable({
    textInput: "",
    controlInput: {
        mode: "masses",
        algorithm: "auto",
        runMode: "balance",
        targetNumber: 0,
        targetMass: 1.0,
        intify: true,
        outputPrecision: 4,
        floatTolerance: 8,
        maxCombinations: 15,
    },
    parsedResult: null,
    calculationError: null,
    isCalculating: false
});

// Function to update the global state
export function updateGlobalState(updates: Partial<any>) {
    globalState.update(current => ({ ...current, ...updates }));
}
