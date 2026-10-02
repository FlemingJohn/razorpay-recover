import type { BrowserCallState } from "@/types/BrowserCallState";
import type { Speaker } from "@/types/Speaker";

export function getVoiceLabel(state: BrowserCallState, speaker: Speaker): string {
  if (state === "connecting") {
    return "Connecting";
  }
  if (state !== "live") {
    return state === "ended" ? "Call ended" : "Ready";
  }
  if (speaker === "agent") {
    return "Agent is speaking";
  }
  return speaker === "customer" ? "You are speaking" : "Listening to you";
}
