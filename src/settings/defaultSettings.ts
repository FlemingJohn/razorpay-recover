import type { AppSettings } from "@/types/AppSettings";

export const defaultSettings: AppSettings = {
  maxDurationSeconds: 180,
  silenceTimeoutSeconds: 30,
  idleMessage: "Are you still there?",
  idleTimeoutSeconds: 8,
  idleMaxCount: 2,
  sendSms: true,
  sendEmail: true,
  recordCalls: true,
};
