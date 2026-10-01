import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { throwIfDatabaseFailed } from "@/lib/throwIfDatabaseFailed";
import type { Customer } from "@/types/Customer";
import { customerFromRow } from "./customerFromRow";

export async function listCustomers(): Promise<Customer[]> {
  const { data, error } = await getDatabaseClient()
    .from("customers")
    .select("*")
    .order("id");
  throwIfDatabaseFailed(error);
  return (data ?? []).map(customerFromRow);
}
