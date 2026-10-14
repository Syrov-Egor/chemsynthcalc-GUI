<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { inputPlaceholder } from "../scripts/inputPlaceholder.svelte";

    let { textInput = $bindable() } = $props();
    let placeholder = inputPlaceholder();
</script>

<Input
    type="text"
    id="equation-input"
    class="h-10 md:text-base placeholder:text-muted-foreground placeholder:opacity-50"
    {placeholder}
    bind:value={textInput}
/>
