import type { CallOutcome } from "@/types/CallOutcome";
import type { PillContent } from "@/types/PillContent";

const pillByOutcome: Record<CallOutcome, PillContent> = {
  paid_now: { label: "Paid now", tone: "good" },
  promise_to_pay: { label: "Promise to pay", tone: "info" },
  dispute: { label: "Dispute", tone: "warning" },
  wants_to_cancel: { label: "Wants to cancel", tone: "bad" },
  opt_out: { label: "Opted out", tone: "bad" },
  no_answer: { label: "No answer", tone: "neutral" },
};

export function getOutcomePill(outcome: CallOutcome): PillContent {
  return pillByOutcome[outcome];
}
