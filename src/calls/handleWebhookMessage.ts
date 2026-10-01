import type { WebhookMessage } from "@/types/WebhookMessage";
import { handleEndOfCall } from "./handleEndOfCall";
import { handleStatusUpdate } from "./handleStatusUpdate";
import { handleToolCalls } from "./handleToolCalls";

export async function handleWebhookMessage(
  message: WebhookMessage,
  customerId: string,
): Promise<object> {
  if (message.type === "tool-calls") {
    return handleToolCalls(message, customerId);
  }
  if (message.type === "status-update") {
    return handleStatusUpdate(message, customerId);
  }
  if (message.type === "end-of-call-report") {
    return handleEndOfCall(message, customerId);
  }
  return {};
}
