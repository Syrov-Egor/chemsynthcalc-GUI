<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";

    import { calculationManager } from "../scripts/buttonRun.svelte";
    import { wasmManager } from "../scripts/wasm.svelte";

    let { controlInput, textInput } = $props();

    function onClickButtonRun() {
        calculationManager.run(controlInput, textInput);
    }

    $effect(() => {
        return () => {
            if (calculationManager.isCalculating) {
                calculationManager.reset();
            }
        };
    });
</script>

<Button
    id="run-button"
    onclick={onClickButtonRun}
    variant={calculationManager.isCalculating ? "destructive" : "default"}
    class={calculationManager.isCalculating ? "calculating" : ""}
    disabled={wasmManager.isLoading}
>
    <span id="button-text">
        {calculationManager.isCalculating ? "Stop" : "Run"}
    </span>
    {#if wasmManager.isLoading}
        <span class="loading-indicator">(Loading WASM...)</span>
    {/if}
</Button>
