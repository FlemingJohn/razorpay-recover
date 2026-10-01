import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { throwIfDatabaseFailed } from "@/lib/throwIfDatabaseFailed";
import type { Customer } from "@/types/Customer";
import { customerFromRow } from "./customerFromRow";

export async function findCustomerById(id: string): Promise<Customer | null> {
  const { data, error } = await getDatabaseClient()
    .from("customers")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  throwIfDatabaseFailed(error);
  return data ? customerFromRow(data) : null;
}
