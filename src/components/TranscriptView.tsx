import type { CallRecord } from "@/types/CallRecord";
import { TranscriptLine } from "./TranscriptLine";

export function TranscriptView({ call }: { call: CallRecord }) {
  if (!call.transcript) {
    return (
      <p className="state-message">
        The transcript appears here when the call ends.
      </p>
    );
  }
  return (
    <div className="transcript">
      {call.transcript
        .split("\n")
        .filter(Boolean)
        .map((line, index) => (
          <TranscriptLine key={index} line={line} />
        ))}
    </div>
  );
}
