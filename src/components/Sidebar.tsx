import { navigationItems } from "@/lib/navigationItems";
import { SidebarBrand } from "./SidebarBrand";
import { SidebarLink } from "./SidebarLink";

export function Sidebar({ onToggle }: { onToggle: () => void }) {
  return (
    <aside className="sidebar">
      <SidebarBrand onToggle={onToggle} />
      <nav className="sidebar-navigation">
        {navigationItems.map((item) => (
          <SidebarLink key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}
