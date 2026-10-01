export type CallOutcome =
  | "paid_now"
  | "promise_to_pay"
  | "dispute"
  | "wants_to_cancel"
  | "opt_out"
  | "no_answer";
