import type { CallRecord } from "@/types/CallRecord";
import { formatTokens } from "./formatTokens";
import { formatUsd } from "./formatUsd";
import { getTotalTokens } from "./getTotalTokens";

export function formatCallUsage(call: CallRecord): string {
  const parts = [];
  if (call.costUsd != null && call.costUsd > 0) {
    parts.push(formatUsd(call.costUsd));
  }
  if (call.tokenUsage && getTotalTokens(call.tokenUsage) > 0) {
    parts.push(`${formatTokens(getTotalTokens(call.tokenUsage))} tokens`);
  }
  return parts.join(", ");
}
