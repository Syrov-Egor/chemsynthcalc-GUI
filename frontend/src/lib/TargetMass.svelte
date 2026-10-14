<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let { mode, targetMass = $bindable() } = $props();
    let disabled = $derived(mode === "formula" || mode === "balance");
</script>

<div class="flex flex-col gap-1.5">
    <Label for="target-mass">Target Mass (g)</Label>
    <Input
        type="number"
        id="target-mass"
        bind:value={targetMass}
        min="0"
        step="1.000000"
        {disabled}
    />
</div>
