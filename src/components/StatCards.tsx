import { formatRupees } from "@/lib/formatRupees";
import type { DashboardStats } from "@/types/DashboardStats";
import { StatCard } from "./StatCard";

export function StatCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="stat-grid">
      <StatCard
        label="Failed autopay"
        value={formatRupees(stats.failedAmountInRupees)}
        note={`${stats.failedCustomerCount} accounts`}
        icon="alert"
        tone="warning"
      />
      <StatCard
        label="Calls made"
        value={String(stats.callCount)}
        note="all time"
        icon="phone"
        tone="info"
      />
      <StatCard
        label="Recovered"
        value={formatRupees(stats.recoveredAmountInRupees)}
        note={`${stats.recoveredCustomerCount} paid through a link`}
        icon="rupee"
        tone="good"
      />
      <StatCard
        label="Recovery rate"
        value={`${stats.recoveryRatePercent}%`}
        note="by accounts"
        icon="percent"
        tone="info"
      />
    </div>
  );
}
