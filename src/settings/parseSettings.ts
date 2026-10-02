import { readRequiredText } from "@/customers/readRequiredText";
import type { AppSettings } from "@/types/AppSettings";
import { readNumberInRange } from "./readNumberInRange";

export function parseSettings(input: Record<string, unknown>): AppSettings {
  return {
    maxDurationSeconds: readNumberInRange(input.maxDurationSeconds, "Longest call", 30, 900),
    silenceTimeoutSeconds: readNumberInRange(input.silenceTimeoutSeconds, "Hang up after silence", 10, 120),
    idleMessage: readRequiredText(input.idleMessage, "Idle message", 120),
    idleTimeoutSeconds: readNumberInRange(input.idleTimeoutSeconds, "Wait before asking", 3, 30),
    idleMaxCount: readNumberInRange(input.idleMaxCount, "Times to ask", 1, 5),
    sendSms: input.sendSms === true,
    sendEmail: input.sendEmail === true,
    recordCalls: input.recordCalls === true,
  };
}
