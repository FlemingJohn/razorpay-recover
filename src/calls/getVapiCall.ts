import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";
import { RequestError } from "@/lib/RequestError";
import type { VapiCall } from "@/types/VapiCall";

export async function getVapiCall(vapiCallId: string): Promise<VapiCall> {
  const response = await fetch(`https://api.vapi.ai/call/${vapiCallId}`, {
    headers: { Authorization: `Bearer ${getRequiredEnvironmentValue("VAPI_API_KEY")}` },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new RequestError("Vapi could not find the call", 502);
  }
  return response.json();
}
