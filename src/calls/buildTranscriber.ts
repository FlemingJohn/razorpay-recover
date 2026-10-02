import { redactionLevels } from "@/settings/redactionLevels";
import type { AppSettings } from "@/types/AppSettings";
import { assistantSettings } from "./assistantSettings";

export function buildTranscriber(settings: AppSettings) {
  const level = redactionLevels.find((item) => item.value === settings.redaction);
  return { ...assistantSettings.transcriber, redaction: level?.categories ?? [] };
}
