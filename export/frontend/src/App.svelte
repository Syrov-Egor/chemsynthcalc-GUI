<script lang="ts">
  import TopNavBar from "$lib/TopNavBar.svelte";
  import InputGroup from "$lib/InputGroup.svelte";
  import Results from "$lib/Results.svelte";

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
</script>

<div class="p-4 min-h-screen mist">
  <TopNavBar />
  <InputGroup bind:textInput bind:controlInput />
  <Results {controlInput} />
</div>
