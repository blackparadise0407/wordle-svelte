<script lang="ts">
  import Cell from "@/lib/Cell.svelte";
  import { ROW_LIMIT, WORD_LENGTH } from "@/constant/game";

  export let board: TBoard;
</script>

<template>
  <div
    class="board"
    style={`--row-limit: ${ROW_LIMIT}; --word-len: ${WORD_LENGTH}`}
  >
    {#each board as rows}
      {#each rows as cell, idx (idx)}
        <Cell data={cell} />
      {/each}
    {/each}
  </div>

  <div class="keyboard-container" />
</template>

<style>
  .board {
    display: grid;
    margin: 0 auto;
    gap: 10px;
    grid-template-columns: repeat(var(--word-len), var(--size));
    grid-template-rows: repeat(var(--row-limit), var(--size));
  }

  .keyboard-container {
    margin-top: 80px;
  }
</style>
