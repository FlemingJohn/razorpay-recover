import { RequestError } from "@/lib/RequestError";

const largestAmountInRupees = 100000;

export function readAmount(value: unknown): number {
  const amount = Number(value);
  if (!Number.isInteger(amount) || amount < 1 || amount > largestAmountInRupees) {
    throw new RequestError("Amount must be a whole number of rupees from 1 to 100000", 400);
  }
  return amount;
}
