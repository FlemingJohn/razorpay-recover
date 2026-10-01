import { getCallStatusPill } from "@/lib/getCallStatusPill";
import type { CallRecord } from "@/types/CallRecord";
import { PageCard } from "./PageCard";
import { StatusPill } from "./StatusPill";
import { TranscriptView } from "./TranscriptView";

export function LiveCallCard({ call }: { call: CallRecord | null }) {
  if (!call) {
    return null;
  }
  return (
    <PageCard title="Latest call">
      <StatusPill {...getCallStatusPill(call.status)} />
      <TranscriptView call={call} />
      {call.paymentLink && (
        <a className="link" href={call.paymentLink} target="_blank" rel="noreferrer">
          {call.paymentLink}
        </a>
      )}
    </PageCard>
  );
}
