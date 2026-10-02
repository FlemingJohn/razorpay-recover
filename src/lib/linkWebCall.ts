export async function linkWebCall(callId: string, vapiCallId: string): Promise<void> {
  await fetch(`/api/calls/${callId}/link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vapiCallId }),
  });
}
