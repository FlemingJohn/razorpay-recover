import type { RedactionLevel } from "./RedactionLevel";

export interface AppSettings {
  maxDurationSeconds: number;
  silenceTimeoutSeconds: number;
  idleMessage: string;
  idleTimeoutSeconds: number;
  idleMaxCount: number;
  sendSms: boolean;
  sendEmail: boolean;
  recordCalls: boolean;
  redaction: RedactionLevel;
}
