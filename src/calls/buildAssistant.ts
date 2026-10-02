import { buildSystemPrompt } from "@/lib/buildSystemPrompt";
import type { AppSettings } from "@/types/AppSettings";
import type { Customer } from "@/types/Customer";
import { assistantSettings } from "./assistantSettings";
import { buildIdleHooks } from "./buildIdleHooks";
import { buildLogOutcomeTool } from "./buildLogOutcomeTool";
import { buildSendPaymentLinkTool } from "./buildSendPaymentLinkTool";
import { buildTranscriber } from "./buildTranscriber";
import { buildWebhookUrl } from "./buildWebhookUrl";

export function buildAssistant(customer: Customer, settings: AppSettings) {
  return {
    name: assistantSettings.name,
    firstMessage: `Hello, am I speaking with ${customer.name}?`,
    maxDurationSeconds: settings.maxDurationSeconds,
    silenceTimeoutSeconds: settings.silenceTimeoutSeconds,
    hooks: buildIdleHooks(settings),
    analysisPlan: assistantSettings.analysisPlan,
    artifactPlan: { recordingEnabled: settings.recordCalls },
    model: {
      ...assistantSettings.model,
      messages: [{ role: "system", content: buildSystemPrompt(customer) }],
      tools: [
        buildSendPaymentLinkTool(customer.id),
        buildLogOutcomeTool(customer.id),
      ],
    },
    voice: assistantSettings.voice,
    transcriber: buildTranscriber(settings),
    server: { url: buildWebhookUrl(customer.id) },
    serverMessages: assistantSettings.serverMessages,
  };
}
