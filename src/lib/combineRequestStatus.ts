import type { RequestStatus } from "@/types/RequestStatus";

export function combineRequestStatus(...statuses: RequestStatus[]): RequestStatus {
  if (statuses.includes("failed")) {
    return "failed";
  }
  return statuses.includes("loading") ? "loading" : "ready";
}
