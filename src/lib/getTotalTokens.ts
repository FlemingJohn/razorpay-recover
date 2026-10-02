import type { TokenUsage } from "@/types/TokenUsage";

export function getTotalTokens(usage: TokenUsage): number {
  return usage.promptTokens + usage.completionTokens;
}
