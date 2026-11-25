<script lang="ts">
    import QuestionIcon from "@lucide/svelte/icons/circle-question-mark";
    import DownloadIcon from "@lucide/svelte/icons/download";
    import FileIcon from "@lucide/svelte/icons/file";
    import FileSpreadsheetIcon from "@lucide/svelte/icons/file-spreadsheet";
    import FileTextIcon from "@lucide/svelte/icons/file-text";
    import FolderOpenIcon from "@lucide/svelte/icons/folder-open";
    import GithubIcon from "@lucide/svelte/icons/git-compare";
    import LogOutIcon from "@lucide/svelte/icons/log-out";
    import MenuIcon from "@lucide/svelte/icons/menu";
    import SaveIcon from "@lucide/svelte/icons/save";
    import SunIcon from "@lucide/svelte/icons/sun";
    import TableIcon from "@lucide/svelte/icons/table";
    import MoonIcon from "@lucide/svelte/icons/moon";
    import { toggleMode } from "mode-watcher";
    import { onMount } from "svelte";
    import { System } from "@wailsio/runtime";
    import { App } from "../../bindings/chemsynthcalc";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Sheet from "$lib/components/ui/sheet/index.js";
    import { calculationManager } from "./scripts/buttonRun.svelte";
    import { fromAppState, toAppState } from "./scripts/appState";
    import type { ControlInput } from "./types";
    import { version } from "./../../package.json" with { type: "json" };

    interface NavbarProps {
        textInput?: string;
        controlInput: ControlInput;
    }

    let {
        textInput = $bindable(""),
        controlInput = $bindable(),
    }: NavbarProps = $props();

    const links = [
        {
            href: "https://github.com/Syrov-Egor/chemsynthcalc-GUI/wiki/How-to-use",
            label: "How to use",
            icon: QuestionIcon,
        },
        {
            href: "https://github.com/Syrov-Egor/chemsynthcalc-GUI/releases",
            label: "Download app",
            icon: DownloadIcon,
        },
        {
            href: "https://github.com/Syrov-Egor/chemsynthcalc-GUI",
            label: "Source code",
            icon: GithubIcon,
        },
    ];

    let open = $state(false);
    let hash = $state(window.location.hash || "#home");

    // File dialogs are only implemented on desktop. Start with the synchronous
    // helper, then refresh from the backend: Windows injects
    // window._wails.environment after the page loads, so the sync helper is
    // false there when this component is created.
    let showFileMenu = $state(System.IsDesktop());

    onMount(() => {
        let cancelled = false;

        System.Environment()
            .then((environment) => {
                if (cancelled) return;
                showFileMenu = ["windows", "linux", "darwin"].includes(
                    environment.OS,
                );
            })
            .catch(() => {
                // No Go backend (e.g. browser preview): no file dialogs.
                showFileMenu = false;
            });

        return () => {
            cancelled = true;
        };
    });

    const isActive = (href: string) => hash === href;

    function isDialogCancellation(error: unknown): boolean {
        const message = (
            error instanceof Error ? error.message : String(error)
        )
            .trim()
            .toLowerCase();
        return (
            message === "cancelled" ||
            message === "canceled" ||
            message.includes("cancelled by user") ||
            message.includes("canceled by user")
        );
    }

    function reportFileError(action: string, error: unknown) {
        // Closing a file dialog is a normal outcome, not an error to report.
        if (isDialogCancellation(error)) return;

        const message = error instanceof Error ? error.message : String(error);
        console.error(`Failed to ${action}:`, error);
        window.alert(`Failed to ${action}: ${message}`);
    }

    async function openState() {
        try {
            const state = await App.LoadState();
            if (!state) return; // User cancelled the dialog

            const loaded = fromAppState(state);

            // Stop any running calculation before replacing the whole state.
            calculationManager.reset();
            textInput = loaded.textInput;
            controlInput = loaded.controlInput;
            calculationManager.parsedResult = loaded.parsedResult;
            calculationManager.calculationError = loaded.calculationError;
        } catch (error) {
            reportFileError("open the saved state", error);
        }
    }

    async function saveState() {
        const state = toAppState(
            textInput,
            controlInput,
            calculationManager.parsedResult,
            calculationManager.calculationError,
            calculationManager.isCalculating,
        );

        try {
            await App.SaveState(state);
        } catch (error) {
            reportFileError("save the state", error);
        }
    }

    async function exportData(format: "txt" | "csv" | "xlsx") {
        const state = toAppState(
            textInput,
            controlInput,
            calculationManager.parsedResult,
            calculationManager.calculationError,
            calculationManager.isCalculating,
        );

        try {
            await App.Export(state, format);
        } catch (error) {
            reportFileError(`export to ${format}`, error);
        }
    }

    function exitApp() {
        App.Quit().catch((error: unknown) => {
            reportFileError("quit the application", error);
        });
    }
</script>

{#snippet versionLabel()}
    <span
        class="flex h-8 items-center px-2.5 text-sm font-medium text-sidebar-primary"
    >
        chemsynthcalc v{version}
    </span>
{/snippet}

{#snippet fileMenu(mobile = false)}
    <DropdownMenu.Root>
        <DropdownMenu.Trigger>
            {#snippet child({ props })}
                <Button
                    {...props}
                    variant="ghost"
                    size={mobile ? "default" : "sm"}
                    class={mobile ? "w-full justify-start" : undefined}
                >
                    <FileIcon class="size-4" />
                    File
                </Button>
            {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start" class="w-48">
            <DropdownMenu.Item onclick={openState}>
                <FolderOpenIcon class="size-4" />
                Open...
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={saveState}>
                <SaveIcon class="size-4" />
                Save...
            </DropdownMenu.Item>
            <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>
                    <DownloadIcon class="size-4" />
                    Export as
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                    <DropdownMenu.Item onclick={() => exportData("txt")}>
                        <FileTextIcon class="size-4" />
                        .txt
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onclick={() => exportData("csv")}>
                        <TableIcon class="size-4" />
                        .csv
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onclick={() => exportData("xlsx")}>
                        <FileSpreadsheetIcon class="size-4" />
                        .xlsx
                    </DropdownMenu.Item>
                </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
            <DropdownMenu.Separator />
            <DropdownMenu.Item onclick={exitApp}>
                <LogOutIcon class="size-4" />
                Exit
            </DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
{/snippet}

{#snippet navLink(link: (typeof links)[number], mobile = false)}
    <Button
        href={link.href}
        variant={isActive(link.href) ? "secondary" : "ghost"}
        size={mobile ? "default" : "sm"}
        class={mobile ? "w-full justify-start" : undefined}
        aria-current={isActive(link.href) ? "page" : undefined}
        onclick={mobile ? () => (open = false) : undefined}
    >
        <link.icon class="size-4" />
        {link.label}
    </Button>
{/snippet}

{#snippet themeButton(mobile = false)}
    <Button
        onclick={toggleMode}
        variant="ghost"
        size={mobile ? "default" : "sm"}
        class={mobile ? "w-full justify-start" : undefined}
        aria-label="Theme"
    >
        <span class="relative flex size-4 items-center justify-center">
            <MoonIcon
                class="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            />
            <SunIcon
                class="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            />
        </span>
        Theme
    </Button>
{/snippet}

<svelte:window onhashchange={() => (hash = window.location.hash || "#home")} />

<header class="border-b">
    <nav
        class="flex h-14 items-center justify-start gap-1 px-4"
        aria-label="Main"
    >
        <!-- Mobile: hamburger + sheet -->
        <div class="md:hidden">
            <Sheet.Root bind:open>
                <Sheet.Trigger>
                    {#snippet child({ props })}
                        <Button
                            {...props}
                            variant="ghost"
                            size="icon"
                            aria-label="Open menu"
                        >
                            <MenuIcon class="size-5" />
                        </Button>
                    {/snippet}
                </Sheet.Trigger>
                <Sheet.Content side="left" class="w-64">
                    <Sheet.Header>
                        <Sheet.Title>Menu</Sheet.Title>
                    </Sheet.Header>
                    <ul class="flex flex-col gap-1 px-4">
                        <li>{@render versionLabel()}</li>
                        {#if showFileMenu}
                            <li>{@render fileMenu(true)}</li>
                        {/if}
                        {#each links as link (link.href)}
                            <li>{@render navLink(link, true)}</li>
                        {/each}
                        <li>{@render themeButton(true)}</li>
                    </ul>
                </Sheet.Content>
            </Sheet.Root>
        </div>

        <!-- Desktop: inline links -->
        <ul class="hidden items-center gap-1 md:flex">
            <li>{@render versionLabel()}</li>
            {#if showFileMenu}
                <li>{@render fileMenu()}</li>
            {/if}
            {#each links as link (link.href)}
                <li>{@render navLink(link)}</li>
            {/each}
            <li>{@render themeButton()}</li>
        </ul>
    </nav>
</header>
