import { canCallCustomer } from "@/customers/canCallCustomer";
import { findCustomerById } from "@/customers/findCustomerById";
import { updateCustomerStatus } from "@/customers/updateCustomerStatus";
import { RequestError } from "@/lib/RequestError";
import type { StartedWebCall } from "@/types/StartedWebCall";
import { buildAssistant } from "./buildAssistant";
import { createVapiAssistant } from "./createVapiAssistant";
import { insertCall } from "./insertCall";

export async function startWebCall(customerId: string): Promise<StartedWebCall> {
  const customer = await findCustomerById(customerId);
  if (!customer) {
    throw new RequestError("Customer not found", 404);
  }
  if (!canCallCustomer(customer)) {
    throw new RequestError(`Cannot talk to a customer who is ${customer.status}`, 409);
  }
  const assistantId = await createVapiAssistant(buildAssistant(customer));
  const call = await insertCall(customer.id, null);
  await updateCustomerStatus(customer.id, "calling");
  return { callId: call.id, assistantId };
}
