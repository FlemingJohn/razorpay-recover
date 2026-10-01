import { toBasicAuthHeader } from "./toBasicAuthHeader";

export async function isPaymentLinkPaid(linkId: string): Promise<boolean> {
  const response = await fetch(
    `https://api.razorpay.com/v1/payment_links/${linkId}`,
    { headers: { Authorization: toBasicAuthHeader() }, cache: "no-store" },
  );
  if (!response.ok) {
    return false;
  }
  const link = await response.json();
  return link.status === "paid";
}
