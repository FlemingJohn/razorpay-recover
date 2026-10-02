export function formatUsd(amount: number): string {
  return `$${amount.toFixed(amount < 1 ? 3 : 2)}`;
}
