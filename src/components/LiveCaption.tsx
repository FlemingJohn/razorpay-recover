import type { SpokenLine } from "@/types/SpokenLine";

export function LiveCaption({ line }: { line: SpokenLine | undefined }) {
  if (!line) {
    return <p className="live-caption live-caption-empty">Captions appear here as you talk.</p>;
  }
  return (
    <p className="live-caption">
      <strong>{line.role === "assistant" ? "Agent" : "You"}:</strong> {line.text}
    </p>
  );
}
