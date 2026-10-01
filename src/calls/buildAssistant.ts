import { buildSystemPrompt } from "@/lib/buildSystemPrompt";
import type { Customer } from "@/types/Customer";
import { assistantSettings } from "./assistantSettings";
import { buildLogOutcomeTool } from "./buildLogOutcomeTool";
import { buildSendPaymentLinkTool } from "./buildSendPaymentLinkTool";
import { buildWebhookUrl } from "./buildWebhookUrl";

export function buildAssistant(customer: Customer) {
  return {
    name: assistantSettings.name,
    firstMessage: `Hello, am I speaking with ${customer.name}?`,
    maxDurationSeconds: assistantSettings.maxDurationSeconds,
    model: {
      ...assistantSettings.model,
      messages: [{ role: "system", content: buildSystemPrompt(customer) }],
      tools: [
        buildSendPaymentLinkTool(customer.id),
        buildLogOutcomeTool(customer.id),
      ],
    },
    voice: assistantSettings.voice,
    transcriber: assistantSettings.transcriber,
    server: { url: buildWebhookUrl(customer.id) },
    serverMessages: assistantSettings.serverMessages,
  };
}
