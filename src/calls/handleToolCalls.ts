import type { WebhookMessage } from "@/types/WebhookMessage";
import { parseToolArguments } from "./parseToolArguments";
import { runToolCall } from "./runToolCall";

export async function handleToolCalls(
  message: WebhookMessage,
  customerId: string,
) {
  const results = [];
  for (const item of message.toolCallList ?? []) {
    const toolCall = {
      id: item.id,
      name: item.function.name,
      arguments: parseToolArguments(item.function.arguments),
    };
    results.push(await runToolCall(customerId, toolCall));
  }
  return { results };
}
