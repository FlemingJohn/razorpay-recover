import { Icon } from "./Icon";
import { SidebarToggle } from "./SidebarToggle";

export function SidebarBrand({ onToggle }: { onToggle: () => void }) {
  return (
    <div className="sidebar-brand">
      <span className="brand-mark">
        <Icon name="calls" />
      </span>
      <span className="sidebar-label brand-name">Razorpay Recover</span>
      <SidebarToggle onToggle={onToggle} />
    </div>
  );
}
