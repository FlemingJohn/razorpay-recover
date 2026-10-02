import type { TokenUsage } from "./TokenUsage";

export interface DashboardStats {
  failedAmountInRupees: number;
  failedCustomerCount: number;
  callCount: number;
  recoveredAmountInRupees: number;
  recoveredCustomerCount: number;
  recoveryRatePercent: number;
  totalCostUsd: number;
  averageCostUsd: number;
  tokenUsage: TokenUsage;
}
