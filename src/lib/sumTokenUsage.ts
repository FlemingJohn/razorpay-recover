import type { CallRecord } from "@/types/CallRecord";
import type { TokenUsage } from "@/types/TokenUsage";

export function sumTokenUsage(calls: CallRecord[]): TokenUsage {
  return calls.reduce<TokenUsage>(
    (total, call) => ({
      promptTokens: total.promptTokens + (call.tokenUsage?.promptTokens ?? 0),
      cachedPromptTokens: total.cachedPromptTokens + (call.tokenUsage?.cachedPromptTokens ?? 0),
      completionTokens: total.completionTokens + (call.tokenUsage?.completionTokens ?? 0),
    }),
    { promptTokens: 0, cachedPromptTokens: 0, completionTokens: 0 },
  );
}
