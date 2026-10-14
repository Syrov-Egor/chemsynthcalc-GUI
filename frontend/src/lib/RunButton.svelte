<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";

    import { calculationManager } from "../scripts/buttonRun.svelte";
    import { platform } from "$platform";

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
    disabled={platform.isLoading}
>
    <span id="button-text">
        {calculationManager.isCalculating ? "Stop" : "Run"}
    </span>
    {#if platform.isLoading && platform.loadingHint}
        <span class="loading-indicator">{platform.loadingHint}</span>
    {/if}
</Button>
