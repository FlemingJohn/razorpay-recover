import { findCustomerById } from "@/customers/findCustomerById";
import { RequestError } from "@/lib/RequestError";
import { findCallById } from "./findCallById";
import { getCallMedia } from "./getCallMedia";
import { makeCallFileName } from "./makeCallFileName";

export async function getRecordingDownload(callId: string): Promise<Response> {
  const call = await findCallById(callId);
  const media = await getCallMedia(callId);
  if (!call || !media.recordingUrl) {
    throw new RequestError("This call has no recording", 404);
  }
  const customer = await findCustomerById(call.customerId);
  const upstream = await fetch(media.recordingUrl);
  if (!upstream.ok || !upstream.body) {
    throw new RequestError("The recording could not be fetched", 502);
  }
  const fileName = makeCallFileName(customer?.name ?? "customer", call.createdAt, "wav");
  return new Response(upstream.body, {
    headers: {
      "Content-Type": "audio/wav",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
