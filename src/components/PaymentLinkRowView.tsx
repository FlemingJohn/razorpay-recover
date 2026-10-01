import { formatRupees } from "@/lib/formatRupees";
import { formatTime } from "@/lib/formatTime";
import type { PaymentLinkRow } from "@/types/PaymentLinkRow";
import { StatusPill } from "./StatusPill";

export function PaymentLinkRowView({ row }: { row: PaymentLinkRow }) {
  return (
    <tr>
      <td className="mono">{formatTime(row.createdAt)}</td>
      <td>{row.customerName}</td>
      <td className="number">{formatRupees(row.amountInRupees)}</td>
      <td>
        <a className="link" href={row.shortUrl} target="_blank" rel="noreferrer">
          {row.shortUrl}
        </a>
      </td>
      <td>
        <StatusPill
          label={row.isPaid ? "Paid" : "Pending"}
          tone={row.isPaid ? "good" : "warning"}
        />
      </td>
    </tr>
  );
}
