import callOutcomeSchema from "@/schemas/callOutcomeSchema.json";
import type { CallOutcome } from "@/types/CallOutcome";
import type { CallSummary } from "@/types/CallSummary";
import type { CancelReason } from "@/types/CancelReason";
import type { Sentiment } from "@/types/Sentiment";
import type { SubscriptionIntent } from "@/types/SubscriptionIntent";
import { pickAllowedValue } from "./pickAllowedValue";

const properties = callOutcomeSchema.properties;

export function parseCallSummary(input: Record<string, unknown>): CallSummary {
  return {
    outcome: pickAllowedValue<CallOutcome>(input.outcome, properties.outcome.enum, "no_answer"),
    willContinueSubscription: pickAllowedValue<SubscriptionIntent>(
      input.willContinueSubscription,
      properties.willContinueSubscription.enum,
      "undecided",
    ),
    cancelReason: pickAllowedValue<CancelReason>(input.cancelReason, properties.cancelReason.enum, "none"),
    confirmedFailureReason: String(input.confirmedFailureReason ?? ""),
    paymentMethodChange: input.paymentMethodChange === true,
    promiseDate: typeof input.promiseDate === "string" ? input.promiseDate : null,
    needsHumanFollowup: input.needsHumanFollowup === true,
    sentiment: pickAllowedValue<Sentiment>(input.sentiment, properties.sentiment.enum, "neutral"),
  };
}
