import type { CallRecord } from "@/types/CallRecord";

export function sumCustomerCost(calls: CallRecord[], customerId: string): number {
  return calls
    .filter((call) => call.customerId === customerId)
    .reduce((total, call) => total + (call.costUsd ?? 0), 0);
}
