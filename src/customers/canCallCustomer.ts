import type { Customer } from "@/types/Customer";

const statusesThatBlockCalls = ["paid", "opted_out", "calling"];

export function canCallCustomer(customer: Customer): boolean {
  return !statusesThatBlockCalls.includes(customer.status);
}
