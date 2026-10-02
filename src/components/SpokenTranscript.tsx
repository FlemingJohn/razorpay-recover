import type { SpokenLine } from "@/types/SpokenLine";

export function SpokenTranscript({ lines }: { lines: SpokenLine[] }) {
  if (lines.length === 0) {
    return <p className="state-message">What you and the agent say appears here.</p>;
  }
  return (
    <div className="transcript">
      {lines.map((line, index) => (
        <p
          key={index}
          className={line.role === "assistant" ? "message message-agent" : "message message-customer"}
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}
