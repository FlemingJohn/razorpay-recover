"use client";

import type Vapi from "@vapi-ai/web";
import { useEffect, useRef, useState } from "react";
import { createVapiClient } from "@/lib/createVapiClient";
import { linkWebCall } from "@/lib/linkWebCall";
import { requestWebCall } from "@/lib/requestWebCall";
import type { BrowserCallState } from "@/types/BrowserCallState";
import type { SpokenLine } from "@/types/SpokenLine";
import type { Speaker } from "@/types/Speaker";

export function useBrowserCall(customerId: string, onChanged: () => void) {
  const [state, setState] = useState<BrowserCallState>("idle");
  const [lines, setLines] = useState<SpokenLine[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [speaker, setSpeaker] = useState<Speaker>("nobody");
  const [volume, setVolume] = useState(0);
  const vapiReference = useRef<Vapi | null>(null);

  function fail(message: string) {
    setErrorMessage(message);
    setState("failed");
    onChanged();
  }

  async function start() {
    setState("connecting");
    setLines([]);
    setErrorMessage(null);
    try {
      const started = await requestWebCall(customerId);
      vapiReference.current = createVapiClient({
        onStarted: () => setState("live"),
        onEnded: () => {
          setState("ended");
          setSpeaker("nobody");
          setVolume(0);
          onChanged();
        },
        onLine: (line) => setLines((current) => [...current, line]),
        onSpeaker: setSpeaker,
        onVolume: setVolume,
        onFailed: fail,
      });
      const call = await vapiReference.current.start(started.assistantId);
      if (call?.id) {
        await linkWebCall(started.callId, call.id);
      }
    } catch (error) {
      fail(error instanceof Error ? error.message : "The call could not start");
    }
  }

  function stop() {
    vapiReference.current?.stop();
  }

  useEffect(() => {
    return () => {
      vapiReference.current?.stop();
    };
  }, []);

  return { state, lines, errorMessage, speaker, volume, start, stop };
}
