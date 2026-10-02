import type Vapi from "@vapi-ai/web";
import type { VapiCallbacks } from "@/types/VapiCallbacks";

export function registerSpeechEvents(vapi: Vapi, callbacks: VapiCallbacks): void {
  vapi.on("speech-start", () => callbacks.onSpeaker("agent"));
  vapi.on("speech-end", () => callbacks.onSpeaker("nobody"));
  vapi.on("volume-level", (level) => callbacks.onVolume(level));
  vapi.on("message", (message) => {
    if (message.type === "speech-update" && message.role === "user") {
      callbacks.onSpeaker(message.status === "started" ? "customer" : "nobody");
    }
  });
}
