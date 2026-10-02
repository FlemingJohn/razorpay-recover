import { getDatabaseClient } from "@/lib/getDatabaseClient";
import { throwIfDatabaseFailed } from "@/lib/throwIfDatabaseFailed";
import type { Customer } from "@/types/Customer";
import type { NewCustomer } from "@/types/NewCustomer";
import { customerFromRow } from "./customerFromRow";
import { makeCustomerId } from "./makeCustomerId";

export async function insertCustomer(newCustomer: NewCustomer): Promise<Customer> {
  const { data, error } = await getDatabaseClient()
    .from("customers")
    .insert({
      id: makeCustomerId(),
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      merchant: newCustomer.merchant,
      plan: newCustomer.plan,
      amount_in_rupees: newCustomer.amountInRupees,
      failure_reason: newCustomer.failureReason,
      due_date: new Date().toISOString().slice(0, 10),
    })
    .select("*")
    .single();
  throwIfDatabaseFailed(error);
  return customerFromRow(data!);
}
