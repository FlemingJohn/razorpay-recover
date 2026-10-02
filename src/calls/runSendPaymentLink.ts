import { findCustomerById } from "@/customers/findCustomerById";
import { updateCustomerStatus } from "@/customers/updateCustomerStatus";
import { RequestError } from "@/lib/RequestError";
import { createPaymentLink } from "@/payments/createPaymentLink";
import { getSettings } from "@/settings/getSettings";
import { findLatestCall } from "./findLatestCall";
import { updateCall } from "./updateCall";

export async function runSendPaymentLink(customerId: string): Promise<string> {
  const customer = await findCustomerById(customerId);
  const call = await findLatestCall(customerId);
  if (!customer || !call) {
    throw new RequestError("Customer or call not found", 404);
  }
  const link = await createPaymentLink(customer, await getSettings());
  await updateCall(call.id, { paymentLink: link.shortUrl, paymentLinkId: link.id });
  await updateCustomerStatus(customer.id, "link_sent");
  return "The payment link has been sent by message";
}
