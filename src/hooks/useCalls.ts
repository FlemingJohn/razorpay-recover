"use client";

import type { CallRecord } from "@/types/CallRecord";
import { useFetchedData } from "./useFetchedData";

export function useCalls(refreshMilliseconds?: number) {
  return useFetchedData<CallRecord[]>("/api/calls", refreshMilliseconds);
}
