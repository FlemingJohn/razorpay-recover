import { getRecordingDownload } from "@/calls/getRecordingDownload";
import { makeErrorResponse } from "@/lib/makeErrorResponse";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ callId: string }> },
) {
  try {
    const { callId } = await params;
    return await getRecordingDownload(callId);
  } catch (error) {
    return makeErrorResponse(error);
  }
}
