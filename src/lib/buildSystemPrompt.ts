import type { Customer } from "@/types/Customer";
import { fillTemplate } from "./fillTemplate";
import { getPromptValues } from "./getPromptValues";
import { promptSections } from "./promptSections";
import { readPromptFile } from "./readPromptFile";

export function buildSystemPrompt(customer: Customer): string {
  const values = getPromptValues(customer);
  return promptSections
    .map((section) => makeSection(section.title, section.fileName, values))
    .join("\n\n");
}

function makeSection(
  title: string,
  fileName: string,
  values: Record<string, string>,
): string {
  const body = fillTemplate(readPromptFile(fileName), values);
  return `# ${title}\n${body}`;
}
