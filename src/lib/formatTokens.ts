export function formatTokens(count: number): string {
  if (count >= 10000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toLocaleString("en-IN");
}
