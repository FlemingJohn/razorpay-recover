"use client";

import { useState } from "react";

export function useStartCall(onStarted: () => void) {
  const [busyCustomerId, setBusyCustomerId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function startCall(customerId: string) {
    setBusyCustomerId(customerId);
    setErrorMessage(null);
    const response = await fetch("/api/calls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setErrorMessage(body.error ?? "The call could not be started");
    }
    setBusyCustomerId(null);
    onStarted();
  }

  return { busyCustomerId, errorMessage, startCall };
}
