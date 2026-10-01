import type { Customer } from "@/types/Customer";
import type { CustomerStatus } from "@/types/CustomerStatus";

export function customerFromRow(row: Record<string, unknown>): Customer {
  return {
    id: row.id as string,
    name: row.name as string,
    merchant: row.merchant as string,
    plan: row.plan as string,
    amountInRupees: row.amount_in_rupees as number,
    failureReason: row.failure_reason as string,
    dueDate: row.due_date as string,
    status: row.status as CustomerStatus,
  };
}
