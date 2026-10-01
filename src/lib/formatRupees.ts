export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
