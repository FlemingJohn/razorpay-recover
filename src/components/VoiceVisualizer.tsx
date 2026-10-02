import type { CSSProperties } from "react";
import { getVoiceLabel } from "@/lib/getVoiceLabel";
import type { BrowserCallState } from "@/types/BrowserCallState";
import type { Speaker } from "@/types/Speaker";

const barCount = 5;

export function VoiceVisualizer(props: {
  state: BrowserCallState;
  speaker: Speaker;
  volume: number;
}) {
  const style = { "--level": Math.min(props.volume, 1) } as CSSProperties;
  return (
    <div className={`voice voice-${props.state} voice-${props.speaker}`} aria-live="polite">
      <div className="voice-orb" style={style}>
        {Array.from({ length: barCount }, (_, index) => (
          <span key={index} className="voice-bar" />
        ))}
      </div>
      <span className="voice-label">{getVoiceLabel(props.state, props.speaker)}</span>
    </div>
  );
}
