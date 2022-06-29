<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { checkWin, deepClone2DArray } from "@/helpers";
  import { wordList } from "@/helpers/wordList";
  import Cell from "@/lib/Cell.svelte";
  import { enqueue } from "@/store/toast";

  const testWord = "world";

  const ROW_LIMIT = 6;
  const WORD_LENGTH = testWord.length;

  let board: TBoard = Array(ROW_LIMIT).fill(
    Array<ICell>(WORD_LENGTH).fill({ letter: "", eval: undefined })
  );
  let gameEnd = false;
  const pattern = new RegExp(/[a-zA-Z]/);

  let currentRow = 0;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (gameEnd) return;
    const { key } = e;
    const clone = deepClone2DArray<TBoard>(board);
    // Press Enter key
    if (key === "Enter") {
      if (board[currentRow].some((c) => !c.letter)) {
        enqueue("Not enough letters");
      } else {
        // Check exist in common word list
        const word = board[currentRow]
          .map((cell) => cell.letter)
          .join("")
          .toLowerCase();

        if (!wordList.includes(word)) {
          enqueue("Not in word list!");
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
        if (currentRow === ROW_LIMIT - 1) {
          enqueue(testWord);
          gameEnd = true;
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
    --font-size: 2em;
  }

  .board {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(var(--word-len), var(--size));
    grid-template-rows: repeat(var(--row-limit), var(--size));
  }

  @media only screen and (max-width: 600px) {
    :root {
      --size: 50px;
      --font-size: 1.6em;
    }
  }
</style>
