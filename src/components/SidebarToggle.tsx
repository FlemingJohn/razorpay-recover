import { Icon } from "./Icon";

export function SidebarToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      type="button"
      className="icon-button"
      aria-label="Collapse side panel"
      onClick={onToggle}
    >
      <Icon name="collapse" />
    </button>
  );
}
