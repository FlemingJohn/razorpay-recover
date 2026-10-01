import { statusFromOutcome } from "@/customers/statusFromOutcome";
import { updateCustomerStatus } from "@/customers/updateCustomerStatus";
import { RequestError } from "@/lib/RequestError";
import { findLatestCall } from "./findLatestCall";
import { parseCallSummary } from "./parseCallSummary";
import { updateCall } from "./updateCall";

export async function runLogOutcome(
  customerId: string,
  toolArguments: Record<string, unknown>,
): Promise<string> {
  const call = await findLatestCall(customerId);
  if (!call) {
    throw new RequestError("Call not found", 404);
  }
  const summary = parseCallSummary(toolArguments);
  await updateCall(call.id, { summary });
  await updateCustomerStatus(customerId, statusFromOutcome(summary.outcome));
  return "The outcome has been saved";
}
