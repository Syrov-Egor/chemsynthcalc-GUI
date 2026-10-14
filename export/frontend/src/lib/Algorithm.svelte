<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Select from "$lib/components/ui/select/index.js";

    let { mode, algorithm = $bindable() } = $props();
    let disabled = $derived(mode === "formula" || mode === "masses");

    let algos = [
        { value: "auto", label: "Auto" },
        { value: "inv", label: "Inv" },
        { value: "gpinv", label: "GPinv" },
        { value: "ppinv", label: "PPinv" },
        { value: "comb", label: "Comb" },
    ];
</script>

<Label class="flex w-full flex-col items-start gap-1.5">
    Algorithm
    <Select.Root type="single" items={algos} bind:value={algorithm} {disabled}>
        <Select.Trigger class="w-full" {disabled}>
            <Select.Value placeholder="Auto" />
        </Select.Trigger>
        <Select.Content>
            {#each algos as algo (algo.value)}
                <Select.Item value={algo.value} label={algo.label}>
                    {algo.label}
                </Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
</Label>
