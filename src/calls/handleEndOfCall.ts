import { releaseCustomerIfCalling } from "@/customers/releaseCustomerIfCalling";
import type { WebhookMessage } from "@/types/WebhookMessage";
import { findLatestCall } from "./findLatestCall";
import { noAnswerSummary } from "./noAnswerSummary";
import { updateCall } from "./updateCall";

export async function handleEndOfCall(
  message: WebhookMessage,
  customerId: string,
): Promise<object> {
  const call = await findLatestCall(customerId);
  if (!call) {
    return {};
  }
  await updateCall(call.id, {
    status: "ended",
    transcript: message.artifact?.transcript ?? null,
    endedReason: message.endedReason ?? null,
    summary: call.summary ?? noAnswerSummary,
  });
  await releaseCustomerIfCalling(customerId);
  return {};
}
