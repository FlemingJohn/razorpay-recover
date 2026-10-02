"use client";

import { useEffect, useRef } from "react";
import { formatDuration } from "@/lib/formatDuration";
import type { TimedLine } from "@/types/TimedLine";

export function TimedTranscriptLine(props: {
  line: TimedLine;
  isActive: boolean;
  onSeek: (seconds: number) => void;
}) {
  const reference = useRef<HTMLButtonElement>(null);
  const { line } = props;

  useEffect(() => {
    if (props.isActive) {
      reference.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [props.isActive]);

  const sideClass = line.role === "assistant" ? "timed-line-agent" : "timed-line-customer";
  return (
    <button
      ref={reference}
      type="button"
      className={`timed-line ${sideClass}${props.isActive ? " timed-line-active" : ""}`}
      onClick={() => props.onSeek(line.startSeconds)}
    >
      <span className="timed-line-time">{formatDuration(Math.floor(line.startSeconds))}</span>
      <span className="timed-line-text">{line.text}</span>
    </button>
  );
}
