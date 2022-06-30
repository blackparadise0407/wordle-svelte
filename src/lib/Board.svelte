<script lang="ts">
  import { afterUpdate, onDestroy, onMount } from "svelte";

  import { checkWin, deepClone2DArray, generateBoard } from "@/helpers";
  import { wordList, congratsWordList } from "@/helpers/wordList";
  import Cell from "@/lib/Cell.svelte";
  import { enqueue } from "@/store/toast";
  import { gameStore } from "@/store/game";
  import Keyboard from "./Keyboard.svelte";

  export let target = "";
  export let onNextWord: () => void = () => {};

  const ROW_LIMIT = 6;
  const WORD_LENGTH = target.length;

  let board: TBoard = generateBoard(ROW_LIMIT, WORD_LENGTH);
  let gameEnd = false;
  let gameLost = false;

  const pattern = new RegExp(/[a-zA-Z]/);

  let currentRow = 0;

  const resetGame = () => {
    gameEnd = false;
    board = generateBoard(ROW_LIMIT, WORD_LENGTH);
    currentRow = 0;
    onNextWord();
    if (gameLost) {
      gameStore.update((s) => {
        s.score = 0;
        return s;
      });
      gameLost = false;
    }
  };

  const handleKeyDown: IKeyDown = (key, cb) => {
    if (gameEnd && key !== "Enter") return;

    const clone = deepClone2DArray<TBoard>(board);
    // Press Enter key
    if (key === "Enter") {
      if (gameEnd) {
        resetGame();
        return;
      }

      if (clone[currentRow].some((c) => !c.letter)) {
        enqueue("Not enough letters", { variant: "error" });
      } else {
        // Check exist in common word list
        const word = clone[currentRow]
          .map((cell) => cell.letter)
          .join("")
          .toLowerCase();

        if (!wordList.includes(word)) {
          enqueue("Not in word list!", { variant: "error" });
          return;
        }
        // Check win
        const res = checkWin(clone[currentRow], target);
        clone[currentRow].forEach((cell, cellIdx) => {
          clone[currentRow][cellIdx] = {
            ...cell,
            eval: res[cellIdx],
          };
        });
        cb(clone[currentRow]);
        board = clone;
        if (res.every((c) => c === "correct")) {
          const idx =
            Math.floor(Math.random() * 100) % (congratsWordList.length - 1);
          enqueue(congratsWordList[idx] + "!", { variant: "success" });
          gameEnd = true;
          gameStore.update((s) => {
            s.score += 1;
            return s;
          });
          return;
        }
        if (currentRow === ROW_LIMIT - 1) {
          enqueue(target);
          gameEnd = true;
          gameLost = true;

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
            letter: key.toUpperCase(),
          };
          board = clone;
          return;
        }
      }
    }
  };

  // Log the word in dev mode for easier debug
  afterUpdate(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(target);
    }
  });
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
  {#if gameEnd}
    <button class="primary" on:click={resetGame}
      >{gameLost ? "Restart" : "Next word?"}</button
    >
  {/if}

  <div class="keyboard-container">
    <Keyboard onKeyPress={handleKeyDown} />
  </div>
</template>

<style>
  .board {
    display: grid;
    margin: 0 auto;
    gap: 10px;
    grid-template-columns: repeat(var(--word-len), var(--size));
    grid-template-rows: repeat(var(--row-limit), var(--size));
  }

  button {
    margin-top: 20px;
  }

  .keyboard-container {
    margin-top: 80px;
  }

  @media only screen and (max-width: 600px) {
    :root {
      --size: 50px;
      --font-size: 1.6em;
    }
  }
</style>
