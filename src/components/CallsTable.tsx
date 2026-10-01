import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import { CallRow } from "./CallRow";

export function CallsTable(props: {
  calls: CallRecord[];
  customers: Customer[];
  selectedCallId: string | null;
  onSelect: (callId: string) => void;
}) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Customer</th>
            <th>Call</th>
            <th>Outcome</th>
            <th>Will continue</th>
            <th>Cancel reason</th>
            <th>Follow up</th>
          </tr>
        </thead>
        <tbody>
          {props.calls.map((call) => (
            <CallRow
              key={call.id}
              call={call}
              customerName={props.customers.find((item) => item.id === call.customerId)?.name ?? ""}
              isSelected={props.selectedCallId === call.id}
              onSelect={props.onSelect}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
