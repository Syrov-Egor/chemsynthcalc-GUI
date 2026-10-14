// Desktop (Wails v3) platform adapter: wraps the generated bindings. Selected
// by the `$platform` Vite alias in desktop mode. This module must never be
// part of the web build graph — the alias guarantees that.
import { Browser } from "@wailsio/runtime";
import {
    CalcService,
    FileService,
} from "$bindings/github.com/Syrov-Egor/chemsynthcalc-GUI/desktop";
import type {
    AppState,
    CalcRequest,
    CalcResult,
    ExportFormat,
    Platform,
} from "./types";

export const platform: Platform = {
    capabilities: {
        fileIO: true,
        export: true,
        exportFormats: ["txt", "csv", "xlsx"],
        quit: true,
    },

    // Wails binds eagerly; there is no backend loading phase.
    isLoading: false,

    async calculate(req: CalcRequest): Promise<CalcResult> {
        // CalcRequest mirrors bridge.CalculationParams field-for-field, so the
        // binding can take it directly.
        const result = await CalcService.PerformCalculation(req);
        return result as unknown as CalcResult;
    },

    stop() {
        void CalcService.StopCalculation();
    },

    async saveState(state: AppState): Promise<void> {
        await FileService.SaveState(state);
    },

    async loadState(): Promise<AppState | null> {
        const state = await FileService.LoadState();
        // A cancelled dialog yields an empty AppState from Go.
        if (!state || (!state.equation && !state.mode)) {
            return null;
        }
        return state as unknown as AppState;
    },

    async exportResult(fmt: ExportFormat, state: AppState): Promise<void> {
        await FileService.Export(state, fmt);
    },

    async message(title: string, message: string): Promise<void> {
        await FileService.ShowMessageDialog(title, message);
    },

    quit() {
        void FileService.Quit();
    },

    openExternal(url: string) {
        void Browser.OpenURL(url);
    },
};
