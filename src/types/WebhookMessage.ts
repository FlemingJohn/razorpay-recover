import type { WebhookToolCall } from "./WebhookToolCall";

export interface WebhookMessage {
  type: string;
  status?: string;
  endedReason?: string;
  toolCallList?: WebhookToolCall[];
  call?: { id: string };
  artifact?: { transcript?: string };
}
