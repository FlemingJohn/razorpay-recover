import type { IconName } from "@/types/IconName";
import type { PillTone } from "@/types/PillTone";
import { Icon } from "./Icon";

export function StatCard(props: {
  label: string;
  value: string;
  note: string;
  icon: IconName;
  tone: PillTone;
}) {
  return (
    <div className="card stat-card">
      <span className={`icon-chip chip-${props.tone}`}>
        <Icon name={props.icon} />
      </span>
      <span className="stat-label">{props.label}</span>
      <span className="stat-value">{props.value}</span>
      <span className="stat-note">{props.note}</span>
    </div>
  );
}
