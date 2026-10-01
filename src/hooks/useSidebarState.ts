"use client";

import { useState } from "react";

export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggle = () => setIsCollapsed((current) => !current);
  return { isCollapsed, toggle };
}
