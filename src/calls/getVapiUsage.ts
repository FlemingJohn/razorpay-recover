import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";
import type { TokenUsage } from "@/types/TokenUsage";

export interface VapiUsage {
  costUsd: number;
  tokenUsage: TokenUsage;
}

export async function getVapiUsage(): Promise<Map<string, VapiUsage>> {
  const response = await fetch("https://api.vapi.ai/call?limit=100", {
    headers: { Authorization: `Bearer ${getRequiredEnvironmentValue("VAPI_API_KEY")}` },
    cache: "no-store",
  });
  if (!response.ok) {
    return new Map();
  }
  const calls: VapiListedCall[] = await response.json();
  return new Map(calls.map((call) => [call.id, readUsage(call)]));
}

interface VapiListedCall {
  id: string;
  cost?: number;
  costBreakdown?: {
    llmPromptTokens?: number;
    llmCachedPromptTokens?: number;
    llmCompletionTokens?: number;
  };
}

function readUsage(call: VapiListedCall): VapiUsage {
  return {
    costUsd: call.cost ?? 0,
    tokenUsage: {
      promptTokens: call.costBreakdown?.llmPromptTokens ?? 0,
      cachedPromptTokens: call.costBreakdown?.llmCachedPromptTokens ?? 0,
      completionTokens: call.costBreakdown?.llmCompletionTokens ?? 0,
    },
  };
}
