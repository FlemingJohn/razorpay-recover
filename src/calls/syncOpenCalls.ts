import type { CallRecord } from "@/types/CallRecord";
import { syncCallWithVapi } from "./syncCallWithVapi";

const secondsBeforeChecking = 20;

export async function syncOpenCalls(calls: CallRecord[]): Promise<boolean> {
  const openCalls = calls.filter((call) => isOldOpenCall(call));
  await Promise.allSettled(openCalls.map(syncCallWithVapi));
  return openCalls.length > 0;
}

function isOldOpenCall(call: CallRecord): boolean {
  const ageInSeconds = (Date.now() - new Date(call.createdAt).getTime()) / 1000;
  return call.status !== "ended" && ageInSeconds > secondsBeforeChecking;
}
