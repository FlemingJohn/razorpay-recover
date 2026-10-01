import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getRequiredEnvironmentValue } from "./getRequiredEnvironmentValue";

let databaseClient: SupabaseClient | undefined;

export function getDatabaseClient(): SupabaseClient {
  if (!databaseClient) {
    databaseClient = createClient(
      getRequiredEnvironmentValue("SUPABASE_URL"),
      getRequiredEnvironmentValue("SUPABASE_SECRET_KEY"),
      { auth: { persistSession: false } },
    );
  }
  return databaseClient;
}
