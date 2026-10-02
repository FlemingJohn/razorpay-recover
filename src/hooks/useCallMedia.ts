"use client";

import type { CallMedia } from "@/types/CallMedia";
import { useFetchedData } from "./useFetchedData";

const refreshBeforeLinkExpiresMilliseconds = 15 * 60 * 1000;

export function useCallMedia(callId: string) {
  return useFetchedData<CallMedia>(
    `/api/calls/${callId}/media`,
    refreshBeforeLinkExpiresMilliseconds,
  );
}
