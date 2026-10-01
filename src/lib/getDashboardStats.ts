import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import type { DashboardStats } from "@/types/DashboardStats";

export function getDashboardStats(
  customers: Customer[],
  calls: CallRecord[],
): DashboardStats {
  const failed = customers.filter((customer) => customer.status !== "paid");
  const recovered = customers.filter((customer) => customer.status === "paid");
  return {
    failedAmountInRupees: sumAmounts(failed),
    failedCustomerCount: failed.length,
    callCount: calls.length,
    recoveredAmountInRupees: sumAmounts(recovered),
    recoveredCustomerCount: recovered.length,
    recoveryRatePercent: getPercent(recovered.length, customers.length),
  };
}

function sumAmounts(customers: Customer[]): number {
  return customers.reduce((total, customer) => total + customer.amountInRupees, 0);
}

function getPercent(part: number, whole: number): number {
  return whole === 0 ? 0 : Math.round((part / whole) * 100);
}
