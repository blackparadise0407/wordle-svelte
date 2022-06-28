<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import Cell from "@/lib/Cell.svelte";
  import { checkWin, deepClone2DArray } from "@/helpers";
  import { wordList } from "@/helpers/wordList";

  const testWord = "world";

  let errorRef: HTMLDivElement;

  const ROW_LIMIT = 6;
  const WORD_LENGTH = testWord.length;

  let board: TBoard = Array(ROW_LIMIT).fill(
    Array<ICell>(WORD_LENGTH).fill({ letter: "", eval: undefined })
  );
  let error: string = "";
  const pattern = new RegExp(/[a-zA-Z]/);

  let currentRow = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    const clone = deepClone2DArray<TBoard>(board);
    // Press Enter key
    if (key === "Enter") {
      if (board[currentRow].some((c) => !c.letter)) {
        console.log("Not enough letter");
      } else {
        // Check exist in common word list
        const word = board[currentRow]
          .map((cell) => cell.letter)
          .join("")
          .toLowerCase();

        if (!wordList.includes(word)) {
          error = "Not in word list!";
          setTimeout(() => {
            error = "";
          }, 3000);
          return;
        }
        // Check win
        const res = checkWin(board[currentRow], testWord);
        clone[currentRow].forEach((cell, cellIdx) => {
          clone[currentRow][cellIdx] = {
            ...cell,
            eval: res[cellIdx],
          };
        });
        board = clone;
        if (res.every((c) => c === "correct")) {
          // WIN CMNR
          console.log("WIN CMNR, CHOI GI NUA");
          return;
        }
        currentRow++;
      }
      return;
    }

    // Press Backspace key
    if (key === "Backspace") {
      for (
        let currCell = clone[currentRow].length - 1;
        currCell >= 0;
        currCell--
      ) {
        if (clone[currentRow][currCell].letter) {
          clone[currentRow][currCell] = {
            ...clone[currentRow][currCell],
            letter: "",
          };
          board = clone;
          return;
        }
      }
    }

    // Match a letter only
    if (pattern.test(key) && key.length === 1) {
      for (let currCell = 0; currCell < clone[currentRow].length; currCell++) {
        if (!clone[currentRow][currCell].letter) {
          clone[currentRow][currCell] = {
            ...clone[currentRow][currCell],
            letter: key,
          };
          board = clone;
          console.log(board);
          return;
        }
      }
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });
</script>

<template>
  {#if !!error}
    <div bind:this={errorRef} class="error">{error}</div>
  {/if}
  <div
    class="board"
    style={`--row-limit: ${ROW_LIMIT}; --word-len: ${WORD_LENGTH}`}
  >
    {#each board as rows}
      {#each rows as cell}
        <Cell data={cell} />
      {/each}
    {/each}
  </div>
</template>

<style>
  :root {
    --size: 70px;
  }

  .board {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(var(--word-len), var(--size));
    grid-template-rows: repeat(var(--row-limit), var(--size));
  }

  .error {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 500;
    background-color: #fff;
    box-shadow: 0 0 10px -5px #000;
    transform: translate(-50%, -50%);
    animation: appear 0.4s linear;
  }

  @keyframes appear {
    from {
      opacity: 0;
      transform: translate(-50%, -100px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
</style>
