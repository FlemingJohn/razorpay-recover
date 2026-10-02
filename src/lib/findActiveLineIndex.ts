import type { TimedLine } from "@/types/TimedLine";

const earlySeconds = 0.25;

export function findActiveLineIndex(lines: TimedLine[], currentSeconds: number): number {
  let activeIndex = -1;
  lines.forEach((line, index) => {
    if (line.startSeconds <= currentSeconds + earlySeconds) {
      activeIndex = index;
    }
  });
  return activeIndex;
}
