"use client";

import { usePathname } from "next/navigation";
import { pageTitles } from "@/lib/pageTitles";

export function TopBar() {
  const title = pageTitles[usePathname()] ?? "Razorpay Recover";
  return (
    <header className="top-bar">
      <h1 className="top-bar-title">{title}</h1>
    </header>
  );
}
