import type { ReactNode } from "react";
import type { IconName } from "@/types/IconName";
import { Icon } from "./Icon";

export function SummaryItem(props: { label: string; icon?: IconName; children: ReactNode }) {
  return (
    <div className="summary-item">
      <span className="summary-label">
        {props.icon && <Icon name={props.icon} />}
        {props.label}
      </span>
      <span className="summary-value">{props.children}</span>
    </div>
  );
}
