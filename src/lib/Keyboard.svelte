<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  import { keyRows } from "@/constant/keyboard";

  export let onKeyPress: IKeyDown = () => {};

  let pressedKeys: { [key: string]: TCellEvaluation } = {};

  const handleKeyDown = (e: KeyboardEvent) => {
    onKeyPress(e.key, (row, isGameEnd) => {
      if (isGameEnd) {
        pressedKeys = {};
        return;
      }
      row.forEach(({ letter, eval: cEval }) => {
        if (!pressedKeys[letter]) {
          pressedKeys[letter] = cEval;
        }
      });
    });
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });
</script>

<template>
  <div class="keyboard">
    {#each keyRows as row}
      <div class="keyboard__row">
        {#each row as key}
          <div
            class="keyboard__key"
            class:keyboard__key--present={pressedKeys?.[key] === "present"}
            class:keyboard__key--absent={pressedKeys?.[key] === "absent"}
            class:keyboard__key--correct={pressedKeys?.[key] === "correct"}
            on:click={() => onKeyPress(key)}
          >
            {#if key === "Backspace"}
              ⌫
            {:else}
              {key}
            {/if}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</template>

<style>
  .keyboard {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
  }

  .keyboard__row {
    display: flex;
    gap: 10px;
  }

  .keyboard__key {
    padding: 10px 15px;
    min-width: 30px;
    border-radius: 4px;
    color: #fff;
    background-color: #4b4242;
    text-align: center;
    font-weight: 500;
    user-select: none;
    transition: opacity 0.2s ease, background-color 0.2s ease,
      transform 0.2s ease;
    cursor: pointer;
  }

  .keyboard__key--absent {
    background-color: var(--absent);
  }

  .keyboard__key--present {
    background-color: var(--present);
  }

  .keyboard__key--correct {
    background-color: var(--correct);
  }

  .keyboard__key:hover {
    opacity: 0.95;
  }

  .keyboard__key:active {
    transform: scale(0.95);
  }

  @media only screen and (max-width: 600px) {
    .keyboard {
      row-gap: 2px;
    }

    .keyboard__row {
      gap: 2px;
    }
    .keyboard__key {
      padding: 6px 10px;
    }
  }
</style>
