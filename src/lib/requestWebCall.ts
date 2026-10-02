import type { StartedWebCall } from "@/types/StartedWebCall";

export async function requestWebCall(customerId: string): Promise<StartedWebCall> {
  const response = await fetch("/api/web-calls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customerId }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error ?? "The call could not be prepared");
  }
  return body;
}
