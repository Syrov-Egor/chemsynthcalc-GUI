<script lang="ts">
    import { calculationManager } from "./scripts/buttonRun.svelte";
    import { globalState } from "./scripts/globalState";
    import ResultDetails from "./ResultDetails.svelte";
    import ResultTable from "./ResultTable.svelte";
    import { Heading, P, Spinner } from "flowbite-svelte";

    let { controlInput } = $props();
    let mode = $derived(controlInput.mode);

    // Subscribe to global state to get calculation results
    let global = $state({
        isCalculating: false,
        calculationError: null,
        parsedResult: null,
    });

    $effect(() => {
        const unsubscribe = globalState.subscribe((state) => {
            global.isCalculating = state.isCalculating;
            global.calculationError = state.calculationError;
            global.parsedResult = state.parsedResult;
        });
        return unsubscribe;
    });
</script>

<div id="results-section" class="py-2">
    <div id="regular-results-header">
        <Heading tag="h5">Results</Heading>
        <div>
            {#if global.isCalculating}
                <span id="status-text" class="calculating"
                    ><Spinner type="dots" color="emerald" /></span
                >
            {:else if global.calculationError}
                <P class="text-red-700 dark:text-red-500 py-2" size="lg"
                    ><span id="status-text" class="error"
                        >Error: {global.calculationError}</span
                    ></P
                >
            {:else if global.parsedResult}
                <div id="status-text">
                    <ResultDetails parsedResult={global.parsedResult} {mode} />
                    <ResultTable parsedResult={global.parsedResult} />
                </div>
            {:else}
                <P class="py-2"><span id="status-text">Ready</span></P>
            {/if}
        </div>
    </div>
</div>
