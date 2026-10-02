import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { throwIfDatabaseFailed } from "@/lib/throwIfDatabaseFailed";
import type { CallRecord } from "@/types/CallRecord";
import { callFromRow } from "./callFromRow";

export async function findCallById(id: string): Promise<CallRecord | null> {
  const { data, error } = await getDatabaseClient()
    .from("calls")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  throwIfDatabaseFailed(error);
  return data ? callFromRow(data) : null;
}
