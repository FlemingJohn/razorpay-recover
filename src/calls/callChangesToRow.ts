import type { CallRecord } from "@/types/CallRecord";

const columnByField: Record<string, string> = {
  vapiCallId: "vapi_call_id",
  status: "status",
  summary: "summary",
  paymentLink: "payment_link",
  paymentLinkId: "payment_link_id",
  transcript: "transcript",
  endedReason: "ended_reason",
};

export function callChangesToRow(
  changes: Partial<CallRecord>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(changes)
      .filter(([field]) => field in columnByField)
      .map(([field, value]) => [columnByField[field], value]),
  );
}
