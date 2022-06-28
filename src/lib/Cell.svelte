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
    width: var(--size);
    height: var(--size);
    border-radius: 8px;
    font-size: 2em;
    text-transform: uppercase;
    font-weight: 700;
    border: 2px solid #e6e5e5;
  }

  .cell--active {
    border: 2px solid #b9b9b9;
  }

  .cell--present {
    background-color: #dda844;
    border-color: #dda844;
  }

  .cell--absent {
    background-color: #ddd;
    border-color: #ddd;
  }

  .cell--correct {
    background-color: #1daa1d;
    border-color: #1daa1d;
  }
</style>
