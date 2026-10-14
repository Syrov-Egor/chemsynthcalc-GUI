<script lang="ts">
	import { platform } from '$platform';
	import type { CalcRequest, ExportFormat } from '$lib/platform/types';
	import {
		saveCurrentState,
		loadAndApplyState,
		exportFile,
		saveBlockedReason,
		loadBlockedReason,
		type FrontendState,
	} from '../scripts/fileOps.svelte';

	interface Props {
		/** Snapshot of the current text input content (for save/export). */
		getText: () => string;
		/** Snapshot of the current control inputs (for save/export). */
		getControl: () => Partial<CalcRequest>;
		/** Called with the restored inputs after a state file is loaded. */
		onloaded: (state: FrontendState) => void;
		/** Called when the user picks Exit from the menu. */
		onexit: () => void;
	}

	let { getText, getControl, onloaded, onexit }: Props = $props();

	const caps = platform.capabilities;

	let open = $state(false);
	let exportOpen = $state(false);
	let ref: HTMLElement | undefined = $state();

	const saveBlocked = $derived(saveBlockedReason());
	const loadBlocked = $derived(loadBlockedReason());
	const exportFormats = $derived(caps.exportFormats);

	function currentState(): FrontendState {
		return { textInput: getText(), controlInput: getControl() };
	}

	function close() {
		open = false;
		exportOpen = false;
	}

	function handleClick(event: MouseEvent) {
		if (!open || !ref) return;
		if (!ref.contains(event.target as Node)) close();
	}

	function handleKey(event: KeyboardEvent) {
		if (event.key === 'Escape') close();
	}

	async function doSave() {
		close();
		await saveCurrentState(currentState());
	}

	async function doLoad() {
		close();
		const loaded = await loadAndApplyState();
		if (loaded) onloaded(loaded);
	}

	async function doExport(format: ExportFormat) {
		close();
		await exportFile(format, currentState());
	}

	function doExit() {
		close();
		onexit();
	}
</script>

<svelte:window onclick={handleClick} onkeydown={handleKey} />

{#if caps.fileIO}
	<div class="relative" bind:this={ref}>
		<button
			type="button"
			class="rounded-md px-2 py-1 hover:bg-muted"
			aria-haspopup="menu"
			aria-expanded={open}
			onclick={() => {
				open = !open;
				exportOpen = false;
			}}
		>
			File
		</button>

		{#if open}
			<div
				role="menu"
				class="absolute left-0 top-full z-50 mt-1 min-w-44 rounded-md border bg-popover p-1 text-sm shadow-md"
			>
				<button
					type="button"
					role="menuitem"
					class="block w-full rounded-sm px-2 py-1.5 text-left hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
					disabled={saveBlocked !== null}
					title={saveBlocked ?? ''}
					onclick={doSave}
				>
					Save
				</button>
				<button
					type="button"
					role="menuitem"
					class="block w-full rounded-sm px-2 py-1.5 text-left hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
					disabled={loadBlocked !== null}
					title={loadBlocked ?? ''}
					onclick={doLoad}
				>
					Load
				</button>

				{#if exportFormats.length > 0}
					<div class="relative">
						<button
							type="button"
							role="menuitem"
							aria-haspopup="menu"
							aria-expanded={exportOpen}
							class="block w-full rounded-sm px-2 py-1.5 text-left hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
							disabled={saveBlocked !== null}
							title={saveBlocked ?? ''}
							onclick={() => (exportOpen = !exportOpen)}
						>
							Export to…
						</button>
						{#if exportOpen}
							<div
								role="menu"
								class="absolute left-full top-0 z-50 ml-1 min-w-20 rounded-md border bg-popover p-1 text-sm shadow-md"
							>
								{#each exportFormats as format (format)}
									<button
										type="button"
										role="menuitem"
										class="block w-full rounded-sm px-2 py-1.5 text-left hover:bg-muted"
										onclick={() => doExport(format)}
									>
										.{format}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				{#if caps.quit}
					<hr class="my-1 border" />
					<button
						type="button"
						role="menuitem"
						class="block w-full rounded-sm px-2 py-1.5 text-left hover:bg-muted"
						onclick={doExit}
					>
						Exit
					</button>
				{/if}
			</div>
		{/if}
	</div>
{/if}
