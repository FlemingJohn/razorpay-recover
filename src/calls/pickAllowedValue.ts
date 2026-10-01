export function pickAllowedValue<Value extends string>(
  value: unknown,
  allowedValues: readonly string[],
  fallback: Value,
): Value {
  return allowedValues.includes(value as string) ? (value as Value) : fallback;
}
