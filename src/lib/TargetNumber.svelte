<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    let { mode, targetNumber = $bindable() } = $props();
    let disabled = $derived(mode === "formula" || mode === "balance");
</script>

<div class="flex flex-col gap-1.5">
    <Label for="target-num">Target #</Label>
    <Input type="number" id="target-num" bind:value={targetNumber} {disabled} />
</div>
