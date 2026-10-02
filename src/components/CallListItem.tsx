import { formatDateTime } from "@/lib/formatDateTime";
import { getCallStatusPill } from "@/lib/getCallStatusPill";
import { getOutcomePill } from "@/lib/getOutcomePill";
import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import { CustomerAvatar } from "./CustomerAvatar";
import { StatusPill } from "./StatusPill";

export function CallListItem(props: {
  call: CallRecord;
  customer: Customer | undefined;
  isSelected: boolean;
  onSelect: (callId: string) => void;
}) {
  const { call } = props;
  const pill = call.summary ? getOutcomePill(call.summary.outcome) : getCallStatusPill(call.status);
  return (
    <button
      type="button"
      className={props.isSelected ? "call-item call-item-selected" : "call-item"}
      onClick={() => props.onSelect(call.id)}
    >
      <CustomerAvatar name={props.customer?.name ?? "?"} />
      <span className="call-item-body">
        <span className="call-item-name">{props.customer?.name ?? "Unknown customer"}</span>
        <span className="call-item-meta">
          {props.customer ? `${props.customer.merchant}, ${props.customer.plan}` : ""}
        </span>
        <span className="call-item-time">{formatDateTime(call.createdAt)}</span>
      </span>
      <StatusPill {...pill} />
    </button>
  );
}
