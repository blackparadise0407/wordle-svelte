import { config } from "@/config";
import qs from "query-string";

type TMethod = "get" | "post" | "patch" | "delete";

type TError = string | null;

export const request = async <TResponse = any>(
  method: TMethod,
  url: string,
  data?: unknown
) => {
  const baseUrl = config.BASE_API;
  const requestInit: RequestInit = {
    method,
    mode: "no-cors",
  };
  let _url = baseUrl + url;
  if (method === "get" && data) {
    const queries = qs.stringify(data);
    _url += `?${queries}`;
  } else {
    requestInit.body = JSON.stringify(data);
  }
  const result: unknown[] = [];
  try {
    const response = await fetch(_url, requestInit);
    const res = (await response.json()) as TResponse;
    result.push(null, res);
  } catch (e) {
    result.push(e?.message, null);
  }
  return result as [TError, TResponse];
};
