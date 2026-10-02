import type { TimedLine } from "./TimedLine";

export interface CallMedia {
  recordingUrl: string | null;
  durationSeconds: number | null;
  startedAt: string | null;
  channel: "phone" | "browser";
  lines: TimedLine[];
}
