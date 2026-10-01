import type { CallSummary } from "@/types/CallSummary";

export const noAnswerSummary: CallSummary = {
  outcome: "no_answer",
  willContinueSubscription: "undecided",
  cancelReason: "none",
  confirmedFailureReason: "",
  paymentMethodChange: false,
  promiseDate: null,
  needsHumanFollowup: false,
  sentiment: "neutral",
};
