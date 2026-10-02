import { formatTokens } from "@/lib/formatTokens";
import { getTotalTokens } from "@/lib/getTotalTokens";
import type { TokenUsage } from "@/types/TokenUsage";
import { SummaryItem } from "./SummaryItem";

export function TokenUsageGrid({ usage }: { usage: TokenUsage }) {
  const cachedPercent =
    usage.promptTokens === 0 ? 0 : Math.round((usage.cachedPromptTokens / usage.promptTokens) * 100);
  return (
    <div className="summary-grid">
      <SummaryItem label="Total tokens" icon="flag">{formatTokens(getTotalTokens(usage))}</SummaryItem>
      <SummaryItem label="Input tokens" icon="chat">{formatTokens(usage.promptTokens)}</SummaryItem>
      <SummaryItem label="Cached input" icon="check">
        {`${formatTokens(usage.cachedPromptTokens)} (${cachedPercent}%)`}
      </SummaryItem>
      <SummaryItem label="Output tokens" icon="wave">{formatTokens(usage.completionTokens)}</SummaryItem>
    </div>
  );
}
