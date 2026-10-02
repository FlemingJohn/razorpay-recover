import type { CallMedia } from "@/types/CallMedia";
import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import { CallFacts } from "./CallFacts";
import { CallSummaryGrid } from "./CallSummaryGrid";
import { Icon } from "./Icon";

export function CallOverviewTab(props: {
  call: CallRecord;
  customer: Customer | undefined;
  media: CallMedia | null;
}) {
  const { call } = props;
  return (
    <div className="tab-content">
      <CallFacts customer={props.customer} media={props.media} />
      {call.summary ? (
        <CallSummaryGrid summary={call.summary} />
      ) : (
        <p className="state-message">The summary appears when the call ends.</p>
      )}
      {call.paymentLink && (
        <a className="link link-with-icon" href={call.paymentLink} target="_blank" rel="noreferrer">
          <Icon name="links" />
          Payment link: {call.paymentLink}
        </a>
      )}
    </div>
  );
}
