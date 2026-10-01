import type { CallStatus } from "@/types/CallStatus";
import type { WebhookMessage } from "@/types/WebhookMessage";
import { findLatestCall } from "./findLatestCall";
import { updateCall } from "./updateCall";

const statusByVapiStatus: Record<string, CallStatus> = {
  queued: "queued",
  ringing: "queued",
  "in-progress": "in_progress",
  ended: "ended",
};

export async function handleStatusUpdate(
  message: WebhookMessage,
  customerId: string,
): Promise<object> {
  const status = statusByVapiStatus[message.status ?? ""];
  const call = await findLatestCall(customerId);
  if (status && call) {
    await updateCall(call.id, { status });
  }
  return {};
}
