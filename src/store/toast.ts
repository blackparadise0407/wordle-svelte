import { v4 } from "uuid";
import { writable } from "svelte/store";

export const toastStore = writable<IToastState>({ toasts: [] });

export const enqueue = (message: string) =>
  toastStore.update((state) => {
    const toast: IToast = {
      id: v4(),
      message,
    };
    state.toasts.push(toast);
    return state;
  });

export const dequeue = (id: string) =>
  toastStore.update((state) => {
    const foundIdx = state.toasts.findIndex((x) => x.id === id);
    if (foundIdx > -1) {
      state.toasts.splice(foundIdx, 1);
    }
    return state;
  });
