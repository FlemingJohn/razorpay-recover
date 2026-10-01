import { getOutcomePill } from "@/lib/getOutcomePill";
import type { OutcomeCount } from "@/types/OutcomeCount";
import { PageCard } from "./PageCard";

export function OutcomeBars({ counts }: { counts: OutcomeCount[] }) {
  const total = Math.max(1, ...counts.map((item) => item.count));
  return (
    <PageCard title="Outcomes">
      <div className="bars">
        {counts.map(({ outcome, count }) => {
          const { label, tone } = getOutcomePill(outcome);
          return (
            <div key={outcome} className="bar-row">
              <span>{label}</span>
              <span className="bar-track">
                <span
                  className={`bar-fill fill-${tone}`}
                  style={{ width: `${(count / total) * 100}%` }}
                />
              </span>
              <strong>{count}</strong>
            </div>
          );
        })}
      </div>
    </PageCard>
  );
}
