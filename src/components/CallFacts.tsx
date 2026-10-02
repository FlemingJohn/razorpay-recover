import { formatDuration } from "@/lib/formatDuration";
import { formatRupees } from "@/lib/formatRupees";
import type { CallMedia } from "@/types/CallMedia";
import type { Customer } from "@/types/Customer";
import { SummaryItem } from "./SummaryItem";

export function CallFacts(props: { customer: Customer | undefined; media: CallMedia | null }) {
  const { customer, media } = props;
  const isBrowser = media?.channel === "browser";
  return (
    <div className="summary-grid">
      <SummaryItem label="Phone" icon="phone">{customer?.phone ?? ""}</SummaryItem>
      <SummaryItem label="Amount due" icon="rupee">
        {customer ? formatRupees(customer.amountInRupees) : ""}
      </SummaryItem>
      <SummaryItem label="Channel" icon={isBrowser ? "globe" : "calls"}>
        {isBrowser ? "Browser" : "Phone"}
      </SummaryItem>
      <SummaryItem label="Duration" icon="clock">
        {media?.durationSeconds != null ? formatDuration(media.durationSeconds) : "Not connected"}
      </SummaryItem>
    </div>
  );
}
