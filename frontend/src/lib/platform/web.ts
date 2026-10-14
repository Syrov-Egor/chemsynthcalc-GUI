// Web (browser) platform adapter: wraps the TinyGo WASM module running in a
// Web Worker. Selected by the `$platform` Vite alias in web mode.
import { wasmManager } from "../../scripts/wasm.svelte";
import type { CalcRequest, CalcResult, Platform } from "./types";

export const platform: Platform = {
    capabilities: { fileIO: false, export: false, exportFormats: [], quit: false },

    get isLoading() {
        return wasmManager.isLoading;
    },
    get loadingHint() {
        return "(Loading WASM...)";
    },

    async calculate(req: CalcRequest): Promise<CalcResult> {
        const raw = await wasmManager.calculate(req);
        return JSON.parse(raw) as CalcResult;
    },

    stop() {
        wasmManager.abort();
    },

    reset() {
        wasmManager.terminate();
    },

    openExternal(url: string) {
        window.open(url, "_blank");
    },
};
