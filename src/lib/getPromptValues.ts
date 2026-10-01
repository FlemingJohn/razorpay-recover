import type { Customer } from "@/types/Customer";

export function getPromptValues(customer: Customer): Record<string, string> {
  return {
    name: customer.name,
    merchant: customer.merchant,
    plan: customer.plan,
    amount: String(customer.amountInRupees),
    failureReason: customer.failureReason,
    dueDate: customer.dueDate,
    today: new Date().toISOString().slice(0, 10),
  };
}
