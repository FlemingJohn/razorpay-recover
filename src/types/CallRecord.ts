import type { CallStatus } from "./CallStatus";
import type { CallSummary } from "./CallSummary";

export interface CallRecord {
  id: string;
  customerId: string;
  vapiCallId: string | null;
  status: CallStatus;
  summary: CallSummary | null;
  paymentLink: string | null;
  paymentLinkId: string | null;
  transcript: string | null;
  endedReason: string | null;
  createdAt: string;
}
