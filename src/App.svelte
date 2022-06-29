<script lang="ts">
  import { onMount } from "svelte";
  import { randomNoRepeats } from "./helpers";

  import "./index.css";
  import Board from "./lib/Board.svelte";
  import ToastProvider from "./lib/ToastProvider.svelte";
  import { getRandomWord } from "./services/words";
  import { wordList } from "@/helpers/wordList";

  onMount(async () => {
    // const res = await getRandomWord();
    const randomWord = randomNoRepeats(wordList);
    console.log(randomWord());
  });
</script>

<main>
  <Board />
  <ToastProvider />
</main>

<style>
  main {
    display: grid;
    place-content: center;
    height: 100vh;
  }
</style>
