<script lang="ts">
    import { Button } from "flowbite-svelte";

    import { calculationManager } from "./scripts/buttonRun.svelte";
    import { wailsService } from "./scripts/wailsService";

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
    color={calculationManager.isCalculating ? "red" : "green"}
    class={calculationManager.isCalculating ? "calculating" : ""}
    disabled={wailsService.isLoading}
>
    <span id="button-text">
        {calculationManager.isCalculating ? "Stop" : "Run"}
    </span>
</Button>
