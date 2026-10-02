import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import type { DashboardStats } from "@/types/DashboardStats";
import { sumTokenUsage } from "./sumTokenUsage";

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
    totalCostUsd: sumCosts(calls),
    averageCostUsd: averageCost(calls),
    tokenUsage: sumTokenUsage(calls),
  };
}

function sumAmounts(customers: Customer[]): number {
  return customers.reduce((total, customer) => total + customer.amountInRupees, 0);
}

function getPercent(part: number, whole: number): number {
  return whole === 0 ? 0 : Math.round((part / whole) * 100);
}

function sumCosts(calls: CallRecord[]): number {
  return calls.reduce((total, call) => total + (call.costUsd ?? 0), 0);
}

function averageCost(calls: CallRecord[]): number {
  const paidCalls = calls.filter((call) => (call.costUsd ?? 0) > 0);
  return paidCalls.length === 0 ? 0 : sumCosts(paidCalls) / paidCalls.length;
}
