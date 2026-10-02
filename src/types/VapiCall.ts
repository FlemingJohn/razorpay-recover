export interface VapiCall {
  status: string;
  type: string;
  endedReason: string | null;
  phoneCallProviderId: string | null;
  startedAt: string | null;
  endedAt: string | null;
  cost?: number;
  costBreakdown?: {
    transport?: number;
    stt?: number;
    llm?: number;
    tts?: number;
    vapi?: number;
    llmPromptTokens?: number;
    llmCompletionTokens?: number;
    llmCachedPromptTokens?: number;
  };
  artifact?: {
    presignedMonoUrl?: string;
    presignedStereoUrl?: string;
    messages?: { role: string; message?: string; secondsFromStart?: number }[];
  };
}
