import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";

export function toBasicAuthHeader(): string {
  const keyId = getRequiredEnvironmentValue("RAZORPAY_KEY_ID");
  const keySecret = getRequiredEnvironmentValue("RAZORPAY_KEY_SECRET");
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}
