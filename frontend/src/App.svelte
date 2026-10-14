<script lang="ts">
  import TopNavBar from "$lib/TopNavBar.svelte";
  import InputGroup from "$lib/InputGroup.svelte";
  import Results from "$lib/Results.svelte";
  import { platform } from "$platform";
  import type { FrontendState } from "./scripts/fileOps.svelte";

  let textInput = $state("");

  let controlInput = $state({
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

  // Restore inputs from a state file loaded via the File menu. Results are
  // rehydrated by fileOps itself (it owns calculationManager).
  function onLoaded(state: FrontendState) {
    textInput = state.textInput;
    controlInput = { ...controlInput, ...state.controlInput };
  }
</script>

<div class="p-4 min-h-screen mist">
  <TopNavBar
    getText={() => textInput}
    getControl={() => controlInput}
    onloaded={onLoaded}
    onexit={() => platform.quit?.()}
  />
  <InputGroup bind:textInput bind:controlInput />
  <Results {controlInput} />
</div>
