import { formatTokens } from "@/lib/formatTokens";
import { formatUsd } from "@/lib/formatUsd";
import { getCachedPercent } from "@/lib/getCachedPercent";
import { getTotalTokens } from "@/lib/getTotalTokens";
import type { DashboardStats } from "@/types/DashboardStats";
import { StatCard } from "./StatCard";

export function UsageStatCards({ stats }: { stats: DashboardStats }) {
  const usage = stats.tokenUsage;
  return (
    <section className="usage-section">
      <h2 className="section-title">Call usage</h2>
      <div className="stat-grid">
        <StatCard
          label="Call spend"
          value={formatUsd(stats.totalCostUsd)}
          note={`${formatUsd(stats.averageCostUsd)} per connected call`}
          icon="flag"
          tone="neutral"
        />
        <StatCard
          label="Tokens used"
          value={formatTokens(getTotalTokens(usage))}
          note={`${formatTokens(usage.promptTokens)} in, ${formatTokens(usage.completionTokens)} out`}
          icon="chat"
          tone="info"
        />
        <StatCard
          label="Prompt caching"
          value={`${getCachedPercent(usage)}%`}
          note={`${formatTokens(usage.cachedPromptTokens)} of ${formatTokens(usage.promptTokens)} input tokens reused`}
          icon="check"
          tone="good"
        />
      </div>
    </section>
  );
}
