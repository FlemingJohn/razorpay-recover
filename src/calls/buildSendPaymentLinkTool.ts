import { readPromptFile } from "@/lib/readPromptFile";
import { buildWebhookUrl } from "./buildWebhookUrl";

export function buildSendPaymentLinkTool(customerId: string) {
  return {
    type: "function",
    function: {
      name: "send_payment_link",
      description: readPromptFile("toolSendPaymentLink.md"),
      parameters: { type: "object", properties: {} },
    },
    server: { url: buildWebhookUrl(customerId) },
  };
}
