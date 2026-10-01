import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { throwIfDatabaseFailed } from "@/lib/throwIfDatabaseFailed";
import type { CallRecord } from "@/types/CallRecord";
import { callFromRow } from "./callFromRow";

export async function listCalls(): Promise<CallRecord[]> {
  const { data, error } = await getDatabaseClient()
    .from("calls")
    .select("*")
    .order("created_at", { ascending: false });
  throwIfDatabaseFailed(error);
  return (data ?? []).map(callFromRow);
}
