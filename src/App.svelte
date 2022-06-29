<script lang="ts">
  import { onMount } from "svelte";

  import { wordList } from "@/helpers/wordList";
  import { randomNoRepeats } from "./helpers";
  import Board from "./lib/Board.svelte";
  import ToastProvider from "./lib/ToastProvider.svelte";
  import Score from "./lib/Score.svelte";

  import "./index.css";

  const randomWord = randomNoRepeats(wordList);
  let word = "";

  const handleRandomNextWord = () => {
    word = randomWord();
  };

  onMount(async () => {
    handleRandomNextWord();
  });
</script>

<main>
  <Score />
  {#if !!word}
    <Board target={word} onNextWord={handleRandomNextWord} />
  {/if}
  <ToastProvider />
</main>

<style>
  main {
    display: grid;
    place-content: center;
    height: 100vh;
  }
</style>
