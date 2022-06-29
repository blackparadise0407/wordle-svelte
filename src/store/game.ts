import { writable } from "svelte/store";

export const gameStore = writable<IGameState>({ score: 0 });
