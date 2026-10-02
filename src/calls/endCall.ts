import { RequestError } from "@/lib/RequestError";
import { chooseTwilioStatus } from "./chooseTwilioStatus";
import { findCallById } from "./findCallById";
import { getVapiCall } from "./getVapiCall";
import { stopTwilioCall } from "./stopTwilioCall";

export async function endCall(callId: string): Promise<void> {
  const call = await findCallById(callId);
  if (!call?.vapiCallId) {
    throw new RequestError("Call not found", 404);
  }
  const vapiCall = await getVapiCall(call.vapiCallId);
  if (vapiCall.status === "ended") {
    throw new RequestError("The call has already ended", 409);
  }
  if (!vapiCall.phoneCallProviderId) {
    throw new RequestError("This call has no phone connection. End a browser call from the browser call panel", 409);
  }
  await stopTwilioCall(vapiCall.phoneCallProviderId, chooseTwilioStatus(vapiCall.status));
}
