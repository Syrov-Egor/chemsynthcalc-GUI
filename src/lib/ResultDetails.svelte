<script lang="ts">
    import { prettyPrint } from "../scripts/pPrint.svelte";

    let { parsedResult, mode = $bindable() } = $props();

    let isOpen = $derived(mode === "formula" || mode === "balance");
</script>

{#if parsedResult?.details}
    <div class="font-semibold pb-4">
        <details open={isOpen}>
            <summary>Details</summary>
            <pre>{prettyPrint(parsedResult.details)}</pre>
        </details>
    </div>
{/if}

<style>
    details {
        margin-top: 1em;
    }

    summary {
        cursor: pointer;
        font-weight: bold;
    }
</style>
