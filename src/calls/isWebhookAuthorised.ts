import { timingSafeEqual } from "node:crypto";
import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";

export function isWebhookAuthorised(request: Request): boolean {
  const received = new URL(request.url).searchParams.get("secret") ?? "";
  const expected = getRequiredEnvironmentValue("VAPI_WEBHOOK_SECRET");
  return (
    received.length === expected.length &&
    timingSafeEqual(Buffer.from(received), Buffer.from(expected))
  );
}
