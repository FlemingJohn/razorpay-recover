import { NextResponse } from "next/server";
import { getCallMedia } from "@/calls/getCallMedia";
import { makeErrorResponse } from "@/lib/makeErrorResponse";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ callId: string }> },
) {
  try {
    const { callId } = await params;
    return NextResponse.json(await getCallMedia(callId));
  } catch (error) {
    return makeErrorResponse(error);
  }
}
