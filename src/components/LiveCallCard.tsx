import { describeEndedReason } from "@/lib/describeEndedReason";
import { getCallStatusPill } from "@/lib/getCallStatusPill";
import type { CallRecord } from "@/types/CallRecord";
import { EndCallButton } from "./EndCallButton";
import { PageCard } from "./PageCard";
import { StatusPill } from "./StatusPill";
import { TranscriptView } from "./TranscriptView";

export function LiveCallCard(props: { call: CallRecord | null; onChanged: () => void }) {
  const { call } = props;
  if (!call) {
    return null;
  }
  return (
    <PageCard title="Latest call">
      <div className="call-heading">
        <StatusPill {...getCallStatusPill(call.status)} />
        {call.status !== "ended" && <EndCallButton callId={call.id} onEnded={props.onChanged} />}
      </div>
      {call.endedReason && <p className="state-message">{describeEndedReason(call.endedReason)}</p>}
      <TranscriptView call={call} />
      {call.paymentLink && (
        <a className="link" href={call.paymentLink} target="_blank" rel="noreferrer">
          {call.paymentLink}
        </a>
      )}
    </PageCard>
  );
}
