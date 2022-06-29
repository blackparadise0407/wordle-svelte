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
    background-color: #ffbc00;
    border-color: #ffbc00;
  }

  .cell--absent {
    color: #fff;
    background-color: #ddd;
    border-color: #ddd;
  }

  .cell--correct {
    color: #fff;
    background-color: #2dbd2d;
    border-color: #2dbd2d;
  }
</style>
