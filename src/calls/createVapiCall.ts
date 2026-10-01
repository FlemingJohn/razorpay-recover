import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";
import { RequestError } from "@/lib/RequestError";

export async function createVapiCall(
  callRequest: object,
): Promise<{ id: string }> {
  const response = await fetch("https://api.vapi.ai/call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getRequiredEnvironmentValue("VAPI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(callRequest),
  });
  if (!response.ok) {
    throw new RequestError("Vapi could not start the call", 502);
  }
  return response.json();
}
