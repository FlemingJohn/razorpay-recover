export function makeCustomerId(): string {
  return `TEST-${Date.now().toString(36).toUpperCase()}`;
}
