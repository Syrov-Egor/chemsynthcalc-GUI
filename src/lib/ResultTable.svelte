<script lang="ts">
    let { parsedResult } = $props();
    import * as Table from "$lib/components/ui/table/index.js";
</script>

{#if parsedResult?.tabular && parsedResult.tabular.length > 0}
    <Table.Root
        class="relative overflow-x-auto bg-muted/30 shadow-xs rounded-lg border"
    >
        <Table.Header>
            <Table.Head><span class="font-semibold">Formula</span></Table.Head>
            <Table.Head
                ><span class="font-semibold">Molar mass (g/mol)</span></Table.Head
            >
            <Table.Head><span class="font-semibold">Mass (g)</span></Table.Head>
        </Table.Header>
        <Table.Body>
            {#each parsedResult.tabular as row, i (i)}
                <Table.Row>
                    {#each Object.values(row) as value, j (j)}
                        <Table.Cell
                            ><span class="font-semibold">{value}</span></Table.Cell
                        >
                    {/each}
                </Table.Row>
            {/each}
        </Table.Body>
    </Table.Root>
{/if}
