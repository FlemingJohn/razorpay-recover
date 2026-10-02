import { RequestError } from "@/lib/RequestError";
import type { RedactionLevel } from "@/types/RedactionLevel";
import { redactionLevels } from "./redactionLevels";

export function readRedactionLevel(value: unknown): RedactionLevel {
  const level = redactionLevels.find((item) => item.value === value);
  if (!level) {
    throw new RequestError("Choose one of the listed redaction levels", 400);
  }
  return level.value;
}
