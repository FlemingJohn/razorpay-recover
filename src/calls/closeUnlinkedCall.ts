import { releaseCustomerIfCalling } from "@/customers/releaseCustomerIfCalling";
import type { CallRecord } from "@/types/CallRecord";
import { noAnswerSummary } from "./noAnswerSummary";
import { updateCall } from "./updateCall";

const secondsToWaitForLink = 90;

export async function closeUnlinkedCall(call: CallRecord): Promise<void> {
  const ageInSeconds = (Date.now() - new Date(call.createdAt).getTime()) / 1000;
  if (ageInSeconds < secondsToWaitForLink) {
    return;
  }
  await updateCall(call.id, {
    status: "ended",
    endedReason: "web-call-never-started",
    summary: call.summary ?? noAnswerSummary,
  });
  await releaseCustomerIfCalling(call.customerId);
}
