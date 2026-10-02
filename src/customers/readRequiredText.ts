import { RequestError } from "@/lib/RequestError";

export function readRequiredText(value: unknown, label: string, maxLength: number): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    throw new RequestError(`${label} is required`, 400);
  }
  if (text.length > maxLength) {
    throw new RequestError(`${label} is too long`, 400);
  }
  return text;
}
