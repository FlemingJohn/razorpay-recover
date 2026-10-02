import { releaseCustomerIfCalling } from "@/customers/releaseCustomerIfCalling";
import type { CallRecord } from "@/types/CallRecord";
import { closeUnlinkedCall } from "./closeUnlinkedCall";
import { getVapiCall } from "./getVapiCall";
import { noAnswerSummary } from "./noAnswerSummary";
import { updateCall } from "./updateCall";

export async function syncCallWithVapi(call: CallRecord): Promise<void> {
  if (!call.vapiCallId) {
    return closeUnlinkedCall(call);
  }
  const vapiCall = await getVapiCall(call.vapiCallId);
  if (vapiCall.status !== "ended") {
    return;
  }
  await updateCall(call.id, {
    status: "ended",
    endedReason: vapiCall.endedReason,
    summary: call.summary ?? noAnswerSummary,
  });
  await releaseCustomerIfCalling(call.customerId);
}
