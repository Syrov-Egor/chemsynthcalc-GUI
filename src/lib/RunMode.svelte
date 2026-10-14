<script lang="ts">
    import { Label } from "$lib/components/ui/label/index.js";
    import * as Select from "$lib/components/ui/select/index.js";

    let { mode, runMode = $bindable() } = $props();
    let disabled = $derived(mode === "formula" || mode === "balance");

    let runModes = [
        { value: "balance", label: "Balance" },
        { value: "check", label: "Check" },
        { value: "force", label: "Force" },
    ];
</script>

<Label class="flex w-full flex-col items-start gap-1.5">
    Run mode
    <Select.Root type="single" items={runModes} bind:value={runMode} {disabled}>
        <Select.Trigger class="w-full" {disabled}>
            <Select.Value placeholder="Balance" />
        </Select.Trigger>
        <Select.Content>
            {#each runModes as rm (rm.value)}
                <Select.Item value={rm.value} label={rm.label}>
                    {rm.label}
                </Select.Item>
            {/each}
        </Select.Content>
    </Select.Root>
</Label>
