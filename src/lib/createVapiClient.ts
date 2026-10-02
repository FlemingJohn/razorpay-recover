import Vapi from "@vapi-ai/web";
import type { VapiCallbacks } from "@/types/VapiCallbacks";
import { readSpokenLine } from "./readSpokenLine";

export function createVapiClient(callbacks: VapiCallbacks): Vapi {
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY ?? "");
  vapi.on("call-start", callbacks.onStarted);
  vapi.on("call-end", callbacks.onEnded);
  vapi.on("message", (message) => {
    const line = readSpokenLine(message);
    if (line) {
      callbacks.onLine(line);
    }
  });
  vapi.on("error", () => callbacks.onFailed("The call hit a problem. Check the microphone and try again."));
  return vapi;
}
