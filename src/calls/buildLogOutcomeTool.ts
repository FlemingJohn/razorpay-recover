import callOutcomeSchema from "@/schemas/callOutcomeSchema.json";
import { readPromptFile } from "@/lib/readPromptFile";
import { buildWebhookUrl } from "./buildWebhookUrl";

export function buildLogOutcomeTool(customerId: string) {
  return {
    type: "function",
    function: {
      name: "log_outcome",
      description: readPromptFile("toolLogOutcome.md"),
      parameters: callOutcomeSchema,
    },
    server: { url: buildWebhookUrl(customerId) },
  };
}
