import { formatTime } from "@/lib/formatTime";
import { getCallStatusPill } from "@/lib/getCallStatusPill";
import { getOutcomePill } from "@/lib/getOutcomePill";
import type { CallRecord } from "@/types/CallRecord";
import { StatusPill } from "./StatusPill";

export function CallRow(props: {
  call: CallRecord;
  customerName: string;
  isSelected: boolean;
  onSelect: (callId: string) => void;
}) {
  const { call } = props;
  return (
    <tr
      className={props.isSelected ? "row-selected" : "row-clickable"}
      onClick={() => props.onSelect(call.id)}
    >
      <td className="mono">{formatTime(call.createdAt)}</td>
      <td>{props.customerName}</td>
      <td>
        <StatusPill {...getCallStatusPill(call.status)} />
      </td>
      <td>{call.summary && <StatusPill {...getOutcomePill(call.summary.outcome)} />}</td>
      <td>{call.summary?.willContinueSubscription ?? ""}</td>
      <td>{call.summary?.cancelReason.replace("_", " ") ?? ""}</td>
      <td>{call.summary?.needsHumanFollowup ? "Yes" : ""}</td>
    </tr>
  );
}
