import type { TokenUsage } from "@/types/TokenUsage";

export function getCachedPercent(usage: TokenUsage): number {
  if (usage.promptTokens === 0) {
    return 0;
  }
  return Math.round((usage.cachedPromptTokens / usage.promptTokens) * 100);
}
