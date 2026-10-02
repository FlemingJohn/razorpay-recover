import type { TimedLine } from "@/types/TimedLine";
import type { VapiCall } from "@/types/VapiCall";

export function readTimedLines(vapiCall: VapiCall): TimedLine[] {
  const messages = vapiCall.artifact?.messages ?? [];
  return messages.flatMap((message) => {
    const role = message.role === "bot" ? "assistant" : message.role === "user" ? "user" : null;
    if (!role || !message.message) {
      return [];
    }
    return [{ role, text: message.message, startSeconds: message.secondsFromStart ?? 0 }];
  });
}
