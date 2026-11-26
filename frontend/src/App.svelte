<script lang="ts">
  import "./app.css";
  import { Browser, System } from "@wailsio/runtime";
  import { ModeWatcher } from "mode-watcher";
  import type { ControlInput } from "$lib/types";

  import Navbar from "$lib/Navbar.svelte";
  import InputGroup from "$lib/InputGroup.svelte";
  import Results from "$lib/Results.svelte";

  let textInput = $state("");

  let controlInput = $state<ControlInput>({
    mode: "masses",
    algorithm: "auto",
    runMode: "balance",
    targetNumber: 0,
    targetMass: 1.0,
    intify: true,
    outputPrecision: 4,
    floatTolerance: 8,
    maxCombinations: 15,
  });

  // Keep the app on its own page: send external links to the user's default
  // browser instead of navigating the Wails webview. Intercepting at the window
  // level covers every external <a href> in the app, not just the navbar.
  function openExternalLinks(event: MouseEvent) {
    if (event.button !== 0) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const href = target.closest<HTMLAnchorElement>("a[href]")?.getAttribute("href");
    if (!href) return;

    let url: URL;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    if (!["http:", "https:", "mailto:"].includes(url.protocol)) return;
    if (url.origin === window.location.origin) return;

    event.preventDefault();

    // Wails V3 opens URLs through the runtime. Fall back to a new browser tab
    // when the frontend is previewed outside the desktop app (e.g. `vite dev`).
    if (System.IsDesktop()) {
      Browser.OpenURL(url.toString()).catch((error) => {
        console.error(`Failed to open ${url} in the default browser`, error);
      });
      return;
    }

    window.open(url.toString(), "_blank", "noopener,noreferrer");
  }
</script>

<svelte:window onclickcapture={openExternalLinks} />

<div>
  <ModeWatcher />
  <Navbar bind:textInput bind:controlInput />
  <InputGroup bind:textInput bind:controlInput />
  <Results {controlInput} />
</div>
