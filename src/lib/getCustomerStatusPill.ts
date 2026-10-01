import type { CustomerStatus } from "@/types/CustomerStatus";
import type { PillContent } from "@/types/PillContent";

const pillByStatus: Record<CustomerStatus, PillContent> = {
  pending: { label: "Pending", tone: "neutral" },
  calling: { label: "Calling", tone: "warning" },
  link_sent: { label: "Link sent", tone: "info" },
  paid: { label: "Paid", tone: "good" },
  promised: { label: "Promised", tone: "info" },
  disputed: { label: "Disputed", tone: "warning" },
  wants_to_cancel: { label: "Wants to cancel", tone: "bad" },
  opted_out: { label: "Opted out", tone: "bad" },
};

export function getCustomerStatusPill(status: CustomerStatus): PillContent {
  return pillByStatus[status];
}
