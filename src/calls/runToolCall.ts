import type { ToolCall } from "@/types/ToolCall";
import type { ToolResult } from "@/types/ToolResult";
import { runLogOutcome } from "./runLogOutcome";
import { runSendPaymentLink } from "./runSendPaymentLink";

export async function runToolCall(
  customerId: string,
  toolCall: ToolCall,
): Promise<ToolResult> {
  try {
    return { toolCallId: toolCall.id, result: await getToolResult(customerId, toolCall) };
  } catch (error) {
    return { toolCallId: toolCall.id, error: getErrorMessage(error) };
  }
}

async function getToolResult(customerId: string, toolCall: ToolCall): Promise<string> {
  if (toolCall.name === "send_payment_link") {
    return runSendPaymentLink(customerId);
  }
  if (toolCall.name === "log_outcome") {
    return runLogOutcome(customerId, toolCall.arguments);
  }
  throw new Error(`Unknown tool ${toolCall.name}`);
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "The tool failed";
}
