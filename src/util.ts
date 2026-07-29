export function notNull<T>(value?: T | null): value is T {
  return (value ?? null) !== null;
}

export function uniq<T>(values: T[]) {
  return values.filter((a, ia) => !values.some((b, ib) => ib < ia && a === b));
}
