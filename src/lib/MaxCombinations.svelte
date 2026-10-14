<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let { mode, maxCombinations = $bindable() } = $props();
    let disabled = $derived(mode === "formula" || mode === "masses");
</script>

<div class="flex flex-col gap-1.5">
    <Label for="max-comb">Max coefficient</Label>
    <Input
        type="number"
        id="max-comb"
        bind:value={maxCombinations}
        min="1"
        {disabled}
    />
</div>
