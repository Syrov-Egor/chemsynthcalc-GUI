<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";

    let { mode, intify = $bindable() } = $props();
    let disabled = $derived(mode === "formula");
</script>

<div class="flex flex-col gap-1.5">
    <Label for="intify-toggle">Coefs to integers</Label>
    <Switch id="intify-toggle" bind:checked={intify} {disabled} />
</div>
