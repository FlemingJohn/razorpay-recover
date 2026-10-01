import customers from "@/customers/customers.json";
import type { Customer } from "@/types/Customer";

export function getCustomers(): Customer[] {
  return customers as Customer[];
}

export function getCustomerById(id: string): Customer | undefined {
  return getCustomers().find((customer) => customer.id === id);
}
