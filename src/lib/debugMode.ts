import { parseQueryString } from "./queryString";

export function isDebugMode(): boolean {
  const params = parseQueryString(window.location.search);
  return params['debug'] != null;
}
