<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { fly } from "svelte/transition";

  import { dequeue } from "@/store/toast";

  export let data: IToast;
  let timeout: NodeJS.Timeout = undefined;

  onMount(() => {
    timeout = setTimeout(() => {
      dequeue(data.id);
    }, 3000);
  });

  onDestroy(() => {
    timeout && clearTimeout(timeout);
  });
</script>

<template>
  {#if !!data}
    <div
      in:fly={{ y: 50, opacity: 0 }}
      out:fly={{ y: -50, opacity: 0 }}
      class="toast"
    >
      {data.message}
    </div>
  {/if}
</template>

<style>
  .toast {
    padding: 10px 20px;
    border-radius: 4px;
    text-align: center;
    font-weight: 500;
    background-color: #fff;
    box-shadow: 0 0 10px -5px #2e2e2e;
  }

  .toast:not(:first-child) {
    margin-top: 10px;
  }
</style>
