import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { RequestError } from "@/lib/RequestError";
import type { AppSettings } from "@/types/AppSettings";

export async function saveSettings(settings: AppSettings): Promise<void> {
  const { error } = await getDatabaseClient()
    .from("app_settings")
    .upsert({ key: "agent", value: settings, updated_at: new Date().toISOString() });
  if (error) {
    throw new RequestError(
      "Settings could not be saved. Run the app_settings SQL file in Supabase first.",
      500,
    );
  }
}
