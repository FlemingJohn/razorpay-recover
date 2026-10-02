import { describeEndedReason } from "@/lib/describeEndedReason";
import { getCallStatusPill } from "@/lib/getCallStatusPill";
import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import { CustomerAvatar } from "./CustomerAvatar";
import { EndCallButton } from "./EndCallButton";
import { StatusPill } from "./StatusPill";

export function CallDetailHeader(props: {
  call: CallRecord;
  customer: Customer | undefined;
  onChanged: () => void;
}) {
  const { call, customer } = props;
  return (
    <header className="detail-header">
      <CustomerAvatar name={customer?.name ?? "?"} />
      <div className="detail-heading">
        <h2 className="detail-title">{customer?.name ?? "Unknown customer"}</h2>
        <span className="detail-subtitle">
          {customer ? `${customer.merchant}, ${customer.plan}` : ""}
        </span>
        {call.endedReason && <span className="detail-subtitle">{describeEndedReason(call.endedReason)}</span>}
      </div>
      <StatusPill {...getCallStatusPill(call.status)} />
      {call.status !== "ended" && <EndCallButton callId={call.id} onEnded={props.onChanged} />}
    </header>
  );
}
