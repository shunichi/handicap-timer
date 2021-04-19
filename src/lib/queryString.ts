export function parseQueryString(queryString :string): Record<string, string> {
  const entries = new URLSearchParams(queryString).entries();
  return [...entries].reduce((obj, e) => ({
    ...obj,
    [e[0]]: e[1]
  }), {} as Record<string,string>);
}
