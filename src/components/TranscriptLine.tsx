export function TranscriptLine({ line }: { line: string }) {
  const isAgent = line.startsWith("AI:");
  const text = line.replace(/^(AI|User):\s*/, "");
  return <p className={isAgent ? "message message-agent" : "message message-customer"}>{text}</p>;
}
