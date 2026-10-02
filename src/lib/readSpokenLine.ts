import type { SpokenLine } from "@/types/SpokenLine";

export function readSpokenLine(message: {
  type?: string;
  transcriptType?: string;
  role?: string;
  transcript?: string;
}): SpokenLine | null {
  const isFinalTranscript = message.type === "transcript" && message.transcriptType === "final";
  if (!isFinalTranscript || !message.transcript) {
    return null;
  }
  return { role: message.role === "assistant" ? "assistant" : "user", text: message.transcript };
}
