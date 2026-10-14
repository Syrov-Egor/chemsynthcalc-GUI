<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let { mode, floatTolerance = $bindable() } = $props();
    let disabled = $derived(mode === "formula");
</script>

<div class="flex flex-col gap-1.5">
    <Label for="float-tolerance">Float Tolerance (1e-x)</Label>
    <Input
        type="number"
        id="float-tolerance"
        bind:value={floatTolerance}
        min="1"
        max="15"
        {disabled}
    />
</div>
