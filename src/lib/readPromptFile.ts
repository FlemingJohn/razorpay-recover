import { readFileSync } from "node:fs";
import { join } from "node:path";

export function readPromptFile(fileName: string): string {
  return readFileSync(join(process.cwd(), "src", "prompts", fileName), "utf8").trim();
}
