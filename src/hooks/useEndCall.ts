"use client";

import { useState } from "react";

export function useEndCall(onEnded: () => void) {
  const [isEnding, setIsEnding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function endCall(callId: string) {
    setIsEnding(true);
    setErrorMessage(null);
    const response = await fetch(`/api/calls/${callId}/end`, { method: "POST" });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setErrorMessage(body.error ?? "The call could not be ended");
    }
    setIsEnding(false);
    onEnded();
  }

  return { isEnding, errorMessage, endCall };
}
