import type { TimedLine } from "@/types/TimedLine";
import { formatDuration } from "./formatDuration";

export function buildTranscriptText(lines: TimedLine[]): string {
  return lines
    .map((line) => {
      const speaker = line.role === "assistant" ? "Agent" : "Customer";
      return `[${formatDuration(Math.floor(line.startSeconds))}] ${speaker}: ${line.text}`;
    })
    .join("\n");
}
