<script lang="ts">
    import { calculationManager } from "../scripts/buttonRun.svelte";
    import ResultDetails from "./ResultDetails.svelte";
    import ResultTable from "./ResultTable.svelte";
    import { Spinner } from "$lib/components/ui/spinner/index.js";

    let { controlInput } = $props();
    let mode = $derived(controlInput.mode);
</script>

<div id="results-section" class="py-2">
    <div id="regular-results-header">
        <h5 class="font-semibold tracking-tight text-lg">Results</h5>
        <div>
            {#if calculationManager.isCalculating}
                <span id="status-text" class="calculating"
                    ><Spinner class="text-primary size-5" /></span
                >
            {:else if calculationManager.calculationError}
                <p class="text-destructive py-2 text-base"
                    ><span id="status-text" class="error"
                        >Error: {calculationManager.calculationError}</span
                    ></p
                >
            {:else if calculationManager.parsedResult}
                <div id="status-text">
                    <ResultDetails
                        parsedResult={calculationManager.parsedResult}
                        {mode}
                    />
                    <ResultTable
                        parsedResult={calculationManager.parsedResult}
                    />
                </div>
            {:else}
                <p class="py-2"><span id="status-text">Ready</span></p>
            {/if}
        </div>
    </div>
</div>
