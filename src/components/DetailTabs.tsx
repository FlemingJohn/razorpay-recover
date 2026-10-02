import { detailTabs } from "@/lib/detailTabs";
import type { DetailTab } from "@/types/DetailTab";
import { Icon } from "./Icon";

export function DetailTabs(props: { selected: DetailTab; onSelect: (tab: DetailTab) => void }) {
  return (
    <div className="tabs" role="tablist">
      {detailTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={props.selected === tab.id}
          className={props.selected === tab.id ? "tab tab-selected" : "tab"}
          onClick={() => props.onSelect(tab.id)}
        >
          <Icon name={tab.icon} />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
