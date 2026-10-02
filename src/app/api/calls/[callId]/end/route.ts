import { NextResponse } from "next/server";
import { endCall } from "@/calls/endCall";
import { makeErrorResponse } from "@/lib/makeErrorResponse";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ callId: string }> },
) {
  try {
    const { callId } = await params;
    await endCall(callId);
    return NextResponse.json({ ended: true });
  } catch (error) {
    return makeErrorResponse(error);
  }
}
