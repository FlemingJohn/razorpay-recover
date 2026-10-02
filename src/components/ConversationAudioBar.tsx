import type { RefObject } from "react";
import { formatDuration } from "@/lib/formatDuration";
import type { CallMedia } from "@/types/CallMedia";
import { DownloadButton } from "./DownloadButton";

export function ConversationAudioBar(props: {
  callId: string;
  media: CallMedia;
  audioReference: RefObject<HTMLAudioElement | null>;
  onTimeChange: () => void;
}) {
  const length = props.media.durationSeconds != null ? `, ${formatDuration(props.media.durationSeconds)}` : "";
  return (
    <div className="audio-bar">
      <audio
        ref={props.audioReference}
        className="audio-player"
        controls
        preload="metadata"
        src={props.media.recordingUrl ?? undefined}
        onTimeUpdate={props.onTimeChange}
        onSeeked={props.onTimeChange}
      />
      <DownloadButton
        href={`/api/calls/${props.callId}/download`}
        label="Download recording"
        detail={`WAV audio${length}`}
      />
    </div>
  );
}
