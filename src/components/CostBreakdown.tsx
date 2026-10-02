import { formatUsd } from "@/lib/formatUsd";
import type { CostDetails } from "@/types/CostDetails";
import { SummaryItem } from "./SummaryItem";

export function CostBreakdown({ cost }: { cost: CostDetails }) {
  return (
    <div className="summary-grid">
      <SummaryItem label="Total cost" icon="rupee">{formatUsd(cost.totalUsd)}</SummaryItem>
      <SummaryItem label="Platform" icon="calls">{formatUsd(cost.platformUsd)}</SummaryItem>
      <SummaryItem label="Voice" icon="wave">{formatUsd(cost.voiceUsd)}</SummaryItem>
      <SummaryItem label="Speech recognition" icon="mic">{formatUsd(cost.speechUsd)}</SummaryItem>
      <SummaryItem label="AI model" icon="chat">{formatUsd(cost.modelUsd)}</SummaryItem>
    </div>
  );
}
