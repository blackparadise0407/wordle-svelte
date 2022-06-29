import { request } from "./request";

export const getRandomWord = () =>
  request<string[]>("get", "/word", { length: 5 });
