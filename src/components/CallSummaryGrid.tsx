import { formatLabel } from "@/lib/formatLabel";
import { getOutcomePill } from "@/lib/getOutcomePill";
import type { CallSummary } from "@/types/CallSummary";
import { StatusPill } from "./StatusPill";
import { SummaryItem } from "./SummaryItem";

export function CallSummaryGrid({ summary }: { summary: CallSummary }) {
  return (
    <div className="summary-grid">
      <SummaryItem label="Outcome" icon="flag">
        <StatusPill {...getOutcomePill(summary.outcome)} />
      </SummaryItem>
      <SummaryItem label="Will continue" icon="check">{summary.willContinueSubscription}</SummaryItem>
      <SummaryItem label="Cancel reason" icon="ban">{formatLabel(summary.cancelReason)}</SummaryItem>
      <SummaryItem label="Failure reason given" icon="alert">
        {summary.confirmedFailureReason || "None"}
      </SummaryItem>
      <SummaryItem label="Wants a new payment method" icon="links">
        {summary.paymentMethodChange ? "Yes" : "No"}
      </SummaryItem>
      <SummaryItem label="Promised to pay by" icon="clock">{summary.promiseDate ?? "None"}</SummaryItem>
      <SummaryItem label="Needs a person to follow up" icon="user">
        {summary.needsHumanFollowup ? "Yes" : "No"}
      </SummaryItem>
      <SummaryItem label="Sentiment" icon="chat">{summary.sentiment}</SummaryItem>
    </div>
  );
}
