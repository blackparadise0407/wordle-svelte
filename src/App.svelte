<script lang="ts">
  import { afterUpdate, onMount } from "svelte";

  import { ROW_LIMIT, WORD_LENGTH } from "@/constant/game";
  import {
    checkWin,
    deepClone2DArray,
    generateBoard,
    randomNoRepeats,
  } from "@/helpers";
  import { congratsWordList, wordList } from "@/helpers/wordList";
  import Board from "@/lib/Board.svelte";
  import Footer from "@/lib/Footer.svelte";
  import Keyboard from "@/lib/Keyboard.svelte";
  import Score from "@/lib/Score.svelte";
  import ToastProvider from "@/lib/ToastProvider.svelte";
  import { gameStore } from "@/store/game";
  import { enqueue } from "@/store/toast";

  import "./index.css";

  // Generate non repeat word function
  const randomWord = randomNoRepeats(wordList);

  let target = "";
  let board: TBoard = generateBoard(ROW_LIMIT, WORD_LENGTH);
  let currentRow = 0;
  let gameEnd = false;
  let gameLost = false;
  const pattern = new RegExp(/[a-zA-Z]/);

  const resetGame = () => {
    gameEnd = false;
    board = generateBoard(ROW_LIMIT, WORD_LENGTH);
    currentRow = 0;
    handleRandomNextWord();
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
        cb(undefined, true);
        resetGame();
        return;
      }

      if (clone[currentRow].some((c) => !c.letter)) {
        enqueue("Not enough letters", { variant: "error" });
      } else {
        // Check exist in common word list
        const answer = clone[currentRow]
          .map((cell) => cell.letter)
          .join("")
          .toLowerCase();

        if (!wordList.includes(answer)) {
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
        board = clone;
        cb(clone[currentRow]);
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

  const handleRandomNextWord = () => {
    target = randomWord();
  };

  onMount(async () => {
    handleRandomNextWord();
  });

  // Log the word in dev mode for easier debug
  afterUpdate(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(target);
    }
  });
</script>

<main>
  <div class="game-container">
    <h1>Wordle Svelte</h1>
    <Score />
    {#if !!target}
      <Board {board} />
      <div class="flex-grow" />
      <Keyboard onKeyPress={handleKeyDown} />
    {/if}
  </div>
  <ToastProvider />
  <Footer />
</main>

<style>
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90vh;
  }

  main {
    display: grid;
    place-content: center;
    height: 100vh;
  }

  @media only screen and (max-width: 600px) {
    :root {
      --size: 40px;
      --font-size: 1.6em;
    }
  }
</style>
