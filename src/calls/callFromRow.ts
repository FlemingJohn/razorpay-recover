import type { CallRecord } from "@/types/CallRecord";
import type { CallStatus } from "@/types/CallStatus";
import type { CallSummary } from "@/types/CallSummary";

export function callFromRow(row: Record<string, unknown>): CallRecord {
  return {
    id: row.id as string,
    customerId: row.customer_id as string,
    vapiCallId: row.vapi_call_id as string | null,
    status: row.status as CallStatus,
    summary: row.summary as CallSummary | null,
    paymentLink: row.payment_link as string | null,
    paymentLinkId: row.payment_link_id as string | null,
    transcript: row.transcript as string | null,
    endedReason: row.ended_reason as string | null,
    createdAt: row.created_at as string,
    costUsd: null,
    tokenUsage: null,
  };
}
