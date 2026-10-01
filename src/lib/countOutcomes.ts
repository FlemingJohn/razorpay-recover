import callOutcomeSchema from "@/schemas/callOutcomeSchema.json";
import type { CallOutcome } from "@/types/CallOutcome";
import type { CallRecord } from "@/types/CallRecord";
import type { OutcomeCount } from "@/types/OutcomeCount";

export function countOutcomes(calls: CallRecord[]): OutcomeCount[] {
  const outcomes = callOutcomeSchema.properties.outcome.enum as CallOutcome[];
  return outcomes.map((outcome) => ({
    outcome,
    count: calls.filter((call) => call.summary?.outcome === outcome).length,
  }));
}
