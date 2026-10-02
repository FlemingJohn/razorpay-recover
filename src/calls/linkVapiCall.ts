import { RequestError } from "@/lib/RequestError";
import { findCallById } from "./findCallById";
import { updateCall } from "./updateCall";

export async function linkVapiCall(callId: string, vapiCallId: string): Promise<void> {
  const call = await findCallById(callId);
  if (!call) {
    throw new RequestError("Call not found", 404);
  }
  if (call.vapiCallId) {
    throw new RequestError("The call is already linked", 409);
  }
  await updateCall(callId, { vapiCallId, status: "in_progress" });
}
