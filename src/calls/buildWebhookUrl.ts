import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";

export function buildWebhookUrl(customerId: string): string {
  const baseUrl = getRequiredEnvironmentValue("PUBLIC_BASE_URL");
  const secret = getRequiredEnvironmentValue("VAPI_WEBHOOK_SECRET");
  const query = new URLSearchParams({ customerId, secret });
  return `${baseUrl}/api/vapi/webhook?${query}`;
}
