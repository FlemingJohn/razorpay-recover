import type { PaymentLinkRow } from "@/types/PaymentLinkRow";
import { PaymentLinkRowView } from "./PaymentLinkRowView";

export function PaymentLinksTable({ rows }: { rows: PaymentLinkRow[] }) {
  if (rows.length === 0) {
    return <p className="state-message">No payment links yet</p>;
  }
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Customer</th>
            <th className="number">Amount</th>
            <th>Link</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <PaymentLinkRowView key={row.callId} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
