import type { WebhookToolCall } from "@/types/WebhookToolCall";

export function parseToolArguments(
  rawArguments: WebhookToolCall["function"]["arguments"],
): Record<string, unknown> {
  if (typeof rawArguments === "string") {
    return rawArguments ? JSON.parse(rawArguments) : {};
  }
  return rawArguments ?? {};
}
