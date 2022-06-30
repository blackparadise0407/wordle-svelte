<script lang="ts">
  import clsx from "clsx";
  export let data: ICell;
</script>

<div
  class={clsx(
    "cell",
    data.letter && "cell--active",
    data.eval && `cell--${data.eval}`
  )}
>
  {data.letter}
</div>

<style>
  .cell {
    display: grid;
    place-content: center;
    border-radius: 8px;
    font-size: var(--font-size);
    text-transform: uppercase;
    font-weight: 700;
    border: 2px solid #e6e5e5;
  }

  .cell--active {
    border: 2px solid #b9b9b9;
  }

  .cell--present {
    color: #fff;
    background-color: var(--present);
    border-color: var(--present);
  }

  .cell--absent {
    color: #fff;
    background-color: var(--absent);
    border-color: var(--absent);
  }

  .cell--correct {
    color: #fff;
    background-color: var(--correct);
    border-color: var(--correct);
  }
</style>
