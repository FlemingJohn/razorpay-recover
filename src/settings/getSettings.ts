import { getDatabaseClient } from "@/lib/getDatabaseClient";
import type { AppSettings } from "@/types/AppSettings";
import { defaultSettings } from "./defaultSettings";

export async function getSettings(): Promise<AppSettings> {
  const { data, error } = await getDatabaseClient()
    .from("app_settings")
    .select("value")
    .eq("key", "agent")
    .maybeSingle();
  if (error || !data) {
    return defaultSettings;
  }
  return { ...defaultSettings, ...data.value };
}
