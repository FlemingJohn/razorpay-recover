export interface CostDetails {
  totalUsd: number;
  platformUsd: number;
  voiceUsd: number;
  speechUsd: number;
  modelUsd: number;
  promptTokens: number;
  cachedPromptTokens: number;
  completionTokens: number;
}
