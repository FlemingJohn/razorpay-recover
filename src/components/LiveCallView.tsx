"use client";

import { useState } from "react";
import type { BrowserCallState } from "@/types/BrowserCallState";
import type { SpokenLine } from "@/types/SpokenLine";
import type { Speaker } from "@/types/Speaker";
import { LiveCaption } from "./LiveCaption";
import { SpokenTranscript } from "./SpokenTranscript";
import { VoiceVisualizer } from "./VoiceVisualizer";

export function LiveCallView(props: {
  state: BrowserCallState;
  speaker: Speaker;
  volume: number;
  lines: SpokenLine[];
}) {
  const [showTranscript, setShowTranscript] = useState(false);
  return (
    <div className="live-view">
      <VoiceVisualizer state={props.state} speaker={props.speaker} volume={props.volume} />
      <LiveCaption line={props.lines[props.lines.length - 1]} />
      <button
        type="button"
        className="button button-quiet"
        onClick={() => setShowTranscript((current) => !current)}
      >
        {showTranscript ? "Hide full transcript" : "Show full transcript"}
      </button>
      {showTranscript && <SpokenTranscript lines={props.lines} />}
    </div>
  );
}
