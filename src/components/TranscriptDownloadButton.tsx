"use client";

import { buildTranscriptText } from "@/lib/buildTranscriptText";
import { downloadTextFile } from "@/lib/downloadTextFile";
import type { TimedLine } from "@/types/TimedLine";
import { Icon } from "./Icon";

export function TranscriptDownloadButton(props: { lines: TimedLine[]; fileName: string }) {
  return (
    <button
      type="button"
      className="download-button"
      onClick={() => downloadTextFile(props.fileName, buildTranscriptText(props.lines))}
    >
      <span className="download-icon">
        <Icon name="chat" />
      </span>
      <span className="download-text">
        <span className="download-label">Download transcript</span>
        <span className="download-detail">Text file with times</span>
      </span>
    </button>
  );
}
