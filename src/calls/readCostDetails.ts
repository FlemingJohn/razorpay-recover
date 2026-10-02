import type { CostDetails } from "@/types/CostDetails";
import type { VapiCall } from "@/types/VapiCall";

export function readCostDetails(vapiCall: VapiCall): CostDetails | null {
  const breakdown = vapiCall.costBreakdown;
  if (!breakdown || vapiCall.cost == null) {
    return null;
  }
  return {
    totalUsd: vapiCall.cost,
    platformUsd: (breakdown.vapi ?? 0) + (breakdown.transport ?? 0),
    voiceUsd: breakdown.tts ?? 0,
    speechUsd: breakdown.stt ?? 0,
    modelUsd: breakdown.llm ?? 0,
    promptTokens: breakdown.llmPromptTokens ?? 0,
    cachedPromptTokens: breakdown.llmCachedPromptTokens ?? 0,
    completionTokens: breakdown.llmCompletionTokens ?? 0,
  };
}
