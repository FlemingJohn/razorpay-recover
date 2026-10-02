import type { TimedLine } from "@/types/TimedLine";
import { TimedTranscriptLine } from "./TimedTranscriptLine";

export function TimedTranscript(props: {
  lines: TimedLine[];
  activeIndex: number;
  onSeek: (seconds: number) => void;
}) {
  return (
    <div className="timed-transcript">
      {props.lines.map((line, index) => (
        <TimedTranscriptLine
          key={index}
          line={line}
          isActive={index === props.activeIndex}
          onSeek={props.onSeek}
        />
      ))}
    </div>
  );
}
