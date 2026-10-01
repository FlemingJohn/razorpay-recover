"use client";

import type { ReactNode } from "react";
import { useSidebarState } from "@/hooks/useSidebarState";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  const { isCollapsed, toggle } = useSidebarState();
  return (
    <div className={isCollapsed ? "app app-collapsed" : "app"}>
      <Sidebar onToggle={toggle} />
      <div className="main">
        <TopBar />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
