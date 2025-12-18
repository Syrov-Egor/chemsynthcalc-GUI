<script lang="ts">
    import {
        DarkMode,
        Navbar,
        NavLi,
        NavUl,
        NavHamburger,
        P,
        Dropdown,
        DropdownItem,
    } from "flowbite-svelte";

    import {
        GithubSolid,
        ChevronDownOutline,
        ChevronRightOutline,
    } from "flowbite-svelte-icons";

    import { version } from "./../../package.json" assert { type: "json" };
    import { BrowserOpenURL, Quit } from "../../wailsjs/runtime/runtime";

    import {
        saveCurrentState,
        loadAndApplyState,
        exportFile,
    } from "./scripts/saveload.svelte";

    const wikiLink = "https://github.com/Syrov-Egor/chemsynthcalc-GUI/wiki";
    const githubLink = "https://github.com/Syrov-Egor/chemsynthcalc-web";
</script>

<Navbar fluid={true} class="p-0 sm:px-0">
    <NavHamburger />
    <NavUl>
        <NavLi class="cursor-pointer">
            <div class="flex items-center gap-x-1">
                <P>File</P><ChevronDownOutline />
            </div>
        </NavLi>
        <Dropdown>
            <DropdownItem
                onclick={() => {
                    saveCurrentState();
                }}><P>Save</P></DropdownItem
            >
            <DropdownItem
                onclick={() => {
                    loadAndApplyState();
                }}><P>Load</P></DropdownItem
            >
            <DropdownItem
                ><div class="flex items-center gap-x-1">
                    <P>Export to...</P><ChevronRightOutline />
                </div>
                <Dropdown placement="right"
                    ><DropdownItem
                        onclick={() => {
                            exportFile("txt");
                        }}><P>.txt</P></DropdownItem
                    >
                    <DropdownItem
                        onclick={() => {
                            exportFile("csv");
                        }}><P>.csv</P></DropdownItem
                    >
                    <DropdownItem
                        onclick={() => {
                            exportFile("xlsx");
                        }}><P>.xlsx</P></DropdownItem
                    ></Dropdown
                ></DropdownItem
            >
            <DropdownItem
                onclick={() => {
                    Quit();
                }}><P>Exit</P></DropdownItem
            >
        </Dropdown>
        <NavLi
            onclick={(e: Event) => {
                e.preventDefault();
                BrowserOpenURL(wikiLink);
            }}
            style="cursor: pointer;"><P>How to use</P></NavLi
        >
        <NavLi
            onclick={(e: Event) => {
                e.preventDefault();
                BrowserOpenURL(githubLink);
            }}
            style="cursor: pointer;"
            ><GithubSolid class="shrink-0 h-7 w-7" /></NavLi
        >
        <NavLi
            ><P class="text-emerald-700 dark:text-emerald-500"
                >chemsynthcalc {version}</P
            ></NavLi
        >
        <DarkMode />
    </NavUl>
</Navbar>
