import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { throwIfDatabaseFailed } from "@/lib/throwIfDatabaseFailed";
import type { CallRecord } from "@/types/CallRecord";
import { callChangesToRow } from "./callChangesToRow";

export async function updateCall(
  id: string,
  changes: Partial<CallRecord>,
): Promise<void> {
  const { error } = await getDatabaseClient()
    .from("calls")
    .update(callChangesToRow(changes))
    .eq("id", id);
  throwIfDatabaseFailed(error);
}
