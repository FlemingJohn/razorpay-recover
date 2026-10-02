"use client";

import { useAudioSync } from "@/hooks/useAudioSync";
import { makeCallFileName } from "@/calls/makeCallFileName";
import type { CallMedia } from "@/types/CallMedia";
import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import { ConversationAudioBar } from "./ConversationAudioBar";
import { TimedTranscript } from "./TimedTranscript";
import { TranscriptDownloadButton } from "./TranscriptDownloadButton";
import { TranscriptView } from "./TranscriptView";

export function ConversationTab(props: {
  call: CallRecord;
  customer: Customer | undefined;
  media: CallMedia | null;
}) {
  const lines = props.media?.lines ?? [];
  const sync = useAudioSync(lines);
  if (!props.media) {
    return <p className="state-message">Loading</p>;
  }
  if (lines.length === 0) {
    return <TranscriptView call={props.call} />;
  }
  const fileName = makeCallFileName(props.customer?.name ?? "customer", props.call.createdAt, "txt");
  return (
    <div className="tab-content">
      {props.media.recordingUrl ? (
        <ConversationAudioBar
          callId={props.call.id}
          media={props.media}
          audioReference={sync.audioReference}
          onTimeChange={sync.trackTime}
        />
      ) : (
        <p className="state-message">No recording for this call.</p>
      )}
      <p className="state-message">Click any line to jump to that moment in the recording.</p>
      <TimedTranscript lines={lines} activeIndex={sync.activeIndex} onSeek={sync.seekTo} />
      <TranscriptDownloadButton lines={lines} fileName={fileName} />
    </div>
  );
}
