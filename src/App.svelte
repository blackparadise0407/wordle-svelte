<script lang="ts">
  import "./index.css";
  import Board from "./lib/Board.svelte";
</script>

<main>
  <Board />
</main>

<style>
  main {
    display: grid;
    place-content: center;
    height: 100vh;
  }
</style>
