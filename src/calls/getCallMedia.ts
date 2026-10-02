import { RequestError } from "@/lib/RequestError";
import type { CallMedia } from "@/types/CallMedia";
import { findCallById } from "./findCallById";
import { getDurationSeconds } from "./getDurationSeconds";
import { getVapiCall } from "./getVapiCall";
import { readTimedLines } from "./readTimedLines";

const emptyMedia: CallMedia = {
  recordingUrl: null,
  durationSeconds: null,
  startedAt: null,
  channel: "phone",
  lines: [],
};

export async function getCallMedia(callId: string): Promise<CallMedia> {
  const call = await findCallById(callId);
  if (!call) {
    throw new RequestError("Call not found", 404);
  }
  if (!call.vapiCallId) {
    return emptyMedia;
  }
  const vapiCall = await getVapiCall(call.vapiCallId);
  return {
    recordingUrl:
      vapiCall.artifact?.presignedMonoUrl ?? vapiCall.artifact?.presignedStereoUrl ?? null,
    durationSeconds: getDurationSeconds(vapiCall),
    startedAt: vapiCall.startedAt,
    channel: vapiCall.type === "webCall" ? "browser" : "phone",
    lines: readTimedLines(vapiCall),
  };
}
