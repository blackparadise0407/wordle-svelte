<script lang="ts">
  import { gameStore } from "@/store/game";
</script>

<div class="score-container">
  <span>High score: </span>
  <span class="score">
    {$gameStore.score}
  </span>
</div>

<style>
  .score-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin-bottom: 1em;
  }

  span {
    vertical-align: middle;
    font-size: 2em;
    text-align: center;
  }

  span.score {
    font-size: 4em;
    font-weight: 700;
  }
</style>
