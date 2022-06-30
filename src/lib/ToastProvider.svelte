<script lang="ts">
  import { toastStore } from "@/store/toast";
  import Toast from "./Toast.svelte";
</script>

<template>
  {#if $toastStore.toasts.length > 0}
    <div class="toast-provider">
      {#each $toastStore.toasts as toast (toast.id)}
        <Toast data={toast} />
      {/each}
    </div>
  {/if}
</template>

<style>
  .toast-provider {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 200px;
    height: fit-content;
    transform: translate(-50%, -50%);
  }
</style>
