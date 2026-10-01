"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/types/NavigationItem";
import { Icon } from "./Icon";

export function SidebarLink({ href, label, icon }: NavigationItem) {
  const isCurrent = usePathname() === href;
  return (
    <Link
      href={href}
      className="sidebar-link"
      aria-current={isCurrent ? "page" : undefined}
      title={label}
    >
      <Icon name={icon} />
      <span className="sidebar-label">{label}</span>
    </Link>
  );
}
