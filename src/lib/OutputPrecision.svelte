<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let { mode, outputPrecision = $bindable() } = $props();
    let disabled = $derived(mode === "balance");
</script>

<div class="flex flex-col gap-1.5">
    <Label for="output-precision">Output Precision</Label>
    <Input
        type="number"
        id="output-precision"
        bind:value={outputPrecision}
        min="0"
        max="20"
        {disabled}
    />
</div>
