import type { BrowserCallState } from "@/types/BrowserCallState";
import type { PillContent } from "@/types/PillContent";

const pillByState: Record<BrowserCallState, PillContent> = {
  idle: { label: "Ready", tone: "neutral" },
  connecting: { label: "Connecting", tone: "warning" },
  live: { label: "Live", tone: "good" },
  ended: { label: "Ended", tone: "neutral" },
  failed: { label: "Failed", tone: "bad" },
};

export function getBrowserCallPill(state: BrowserCallState): PillContent {
  return pillByState[state];
}
