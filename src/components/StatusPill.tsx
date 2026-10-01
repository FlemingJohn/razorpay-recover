import type { PillContent } from "@/types/PillContent";

export function StatusPill({ label, tone }: PillContent) {
  return <span className={`pill pill-${tone}`}>{label}</span>;
}
