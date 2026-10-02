import type { CallRecord } from "@/types/CallRecord";
import { getVapiUsage, type VapiUsage } from "./getVapiUsage";

export async function attachUsage(calls: CallRecord[]): Promise<CallRecord[]> {
  const usage = await getVapiUsage().catch(() => new Map<string, VapiUsage>());
  return calls.map((call) => {
    const found = call.vapiCallId ? usage.get(call.vapiCallId) : undefined;
    return { ...call, costUsd: found?.costUsd ?? null, tokenUsage: found?.tokenUsage ?? null };
  });
}
