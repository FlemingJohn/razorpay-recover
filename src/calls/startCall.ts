import { canCallCustomer } from "@/customers/canCallCustomer";
import { findCustomerById } from "@/customers/findCustomerById";
import { updateCustomerStatus } from "@/customers/updateCustomerStatus";
import { RequestError } from "@/lib/RequestError";
import { getSettings } from "@/settings/getSettings";
import type { CallRecord } from "@/types/CallRecord";
import { buildCallRequest } from "./buildCallRequest";
import { createVapiCall } from "./createVapiCall";
import { insertCall } from "./insertCall";

export async function startCall(customerId: string): Promise<CallRecord> {
  const customer = await findCustomerById(customerId);
  if (!customer) {
    throw new RequestError("Customer not found", 404);
  }
  if (!canCallCustomer(customer)) {
    throw new RequestError(`Cannot call a customer who is ${customer.status}`, 409);
  }
  const vapiCall = await createVapiCall(buildCallRequest(customer, await getSettings()));
  await updateCustomerStatus(customer.id, "calling");
  return insertCall(customer.id, vapiCall.id);
}
