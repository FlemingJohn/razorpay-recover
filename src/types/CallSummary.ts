import type { CallOutcome } from "./CallOutcome";
import type { CancelReason } from "./CancelReason";
import type { Sentiment } from "./Sentiment";
import type { SubscriptionIntent } from "./SubscriptionIntent";

export interface CallSummary {
  outcome: CallOutcome;
  willContinueSubscription: SubscriptionIntent;
  cancelReason: CancelReason;
  confirmedFailureReason: string;
  paymentMethodChange: boolean;
  promiseDate: string | null;
  needsHumanFollowup: boolean;
  sentiment: Sentiment;
}
