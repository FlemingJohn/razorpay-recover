import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { throwIfDatabaseFailed } from "@/lib/throwIfDatabaseFailed";
import type { CallRecord } from "@/types/CallRecord";
import { callFromRow } from "./callFromRow";

export async function insertCall(
  customerId: string,
  vapiCallId: string | null,
): Promise<CallRecord> {
  const { data, error } = await getDatabaseClient()
    .from("calls")
    .insert({ customer_id: customerId, vapi_call_id: vapiCallId })
    .select("*")
    .single();
  throwIfDatabaseFailed(error);
  return callFromRow(data!);
}
