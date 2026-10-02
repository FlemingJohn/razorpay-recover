import { RequestError } from "@/lib/RequestError";

export function readNumberInRange(
  value: unknown,
  label: string,
  smallest: number,
  largest: number,
): number {
  const number = Number(value);
  if (!Number.isInteger(number) || number < smallest || number > largest) {
    throw new RequestError(`${label} must be a whole number from ${smallest} to ${largest}`, 400);
  }
  return number;
}
