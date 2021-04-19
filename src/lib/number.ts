export function toNumberOrDefault<T>(value: number | string | undefined, defaultValue: T): number | T {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      return defaultValue;
    } else {
      return parsed;
    }
  } else {
    return defaultValue;
  }
}

export const toNumberOrUndefined = (value: number | string | undefined) => toNumberOrDefault(value, undefined);

export const clampValue = (value: number, min?: number, max?: number): number => {
  if (min != null && max != null) {
    return Math.min(Math.max(value, min), max);
  }  else if (min != null) {
    return Math.max(value, min);
  } else if (max != null) {
    return Math.min(value, max);
  } else {
    return value;
  }
};
