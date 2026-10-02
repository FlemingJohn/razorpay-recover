import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import { CallListItem } from "./CallListItem";

export function CallList(props: {
  calls: CallRecord[];
  customers: Customer[];
  selectedCallId: string;
  onSelect: (callId: string) => void;
}) {
  return (
    <section className="card call-list" aria-label="Calls">
      <h2 className="card-title">Calls ({props.calls.length})</h2>
      <div className="call-list-items">
        {props.calls.map((call) => (
          <CallListItem
            key={call.id}
            call={call}
            customer={props.customers.find((customer) => customer.id === call.customerId)}
            isSelected={call.id === props.selectedCallId}
            onSelect={props.onSelect}
          />
        ))}
      </div>
    </section>
  );
}
