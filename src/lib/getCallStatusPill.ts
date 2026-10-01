import type { CallStatus } from "@/types/CallStatus";
import type { PillContent } from "@/types/PillContent";

const pillByStatus: Record<CallStatus, PillContent> = {
  queued: { label: "Ringing", tone: "warning" },
  in_progress: { label: "In progress", tone: "warning" },
  ended: { label: "Ended", tone: "neutral" },
};

export function getCallStatusPill(status: CallStatus): PillContent {
  return pillByStatus[status];
}
