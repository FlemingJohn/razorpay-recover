import { RequestError } from "@/lib/RequestError";
import type { Customer } from "@/types/Customer";
import type { PaymentLink } from "@/types/PaymentLink";
import { buildPaymentLinkRequest } from "./buildPaymentLinkRequest";
import { toBasicAuthHeader } from "./toBasicAuthHeader";

export async function createPaymentLink(customer: Customer): Promise<PaymentLink> {
  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: toBasicAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildPaymentLinkRequest(customer)),
  });
  if (!response.ok) {
    throw new RequestError("Razorpay could not create the payment link", 502);
  }
  const link = await response.json();
  return { id: link.id, shortUrl: link.short_url };
}
