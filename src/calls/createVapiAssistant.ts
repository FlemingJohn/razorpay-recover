import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";
import { RequestError } from "@/lib/RequestError";

export async function createVapiAssistant(assistant: object): Promise<string> {
  const response = await fetch("https://api.vapi.ai/assistant", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getRequiredEnvironmentValue("VAPI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assistant),
  });
  if (!response.ok) {
    throw new RequestError("Vapi could not prepare the agent", 502);
  }
  const created = await response.json();
  return created.id;
}
