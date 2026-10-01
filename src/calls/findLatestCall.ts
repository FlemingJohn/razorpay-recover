import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { throwIfDatabaseFailed } from "@/lib/throwIfDatabaseFailed";
import type { CallRecord } from "@/types/CallRecord";
import { callFromRow } from "./callFromRow";

export async function findLatestCall(
  customerId: string,
): Promise<CallRecord | null> {
  const { data, error } = await getDatabaseClient()
    .from("calls")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  throwIfDatabaseFailed(error);
  return data ? callFromRow(data) : null;
}
