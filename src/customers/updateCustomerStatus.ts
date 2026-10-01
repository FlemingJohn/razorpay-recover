import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { throwIfDatabaseFailed } from "@/lib/throwIfDatabaseFailed";
import type { CustomerStatus } from "@/types/CustomerStatus";

export async function updateCustomerStatus(
  id: string,
  status: CustomerStatus,
): Promise<void> {
  const { error } = await getDatabaseClient()
    .from("customers")
    .update({ status })
    .eq("id", id);
  throwIfDatabaseFailed(error);
}
