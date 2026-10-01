import type { CallOutcome } from "@/types/CallOutcome";
import type { CustomerStatus } from "@/types/CustomerStatus";

const statusByOutcome: Record<CallOutcome, CustomerStatus> = {
  paid_now: "link_sent",
  promise_to_pay: "promised",
  dispute: "disputed",
  wants_to_cancel: "wants_to_cancel",
  opt_out: "opted_out",
  no_answer: "pending",
};

export function statusFromOutcome(outcome: CallOutcome): CustomerStatus {
  return statusByOutcome[outcome];
}
