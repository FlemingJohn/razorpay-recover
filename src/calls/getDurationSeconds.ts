import type { VapiCall } from "@/types/VapiCall";

export function getDurationSeconds(vapiCall: VapiCall): number | null {
  if (!vapiCall.startedAt || !vapiCall.endedAt) {
    return null;
  }
  const milliseconds = new Date(vapiCall.endedAt).getTime() - new Date(vapiCall.startedAt).getTime();
  return Math.round(milliseconds / 1000);
}
