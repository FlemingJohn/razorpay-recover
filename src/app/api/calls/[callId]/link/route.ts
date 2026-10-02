import { NextResponse } from "next/server";
import { linkVapiCall } from "@/calls/linkVapiCall";
import { makeErrorResponse } from "@/lib/makeErrorResponse";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ callId: string }> },
) {
  try {
    const { callId } = await params;
    const { vapiCallId } = await request.json();
    await linkVapiCall(callId, vapiCallId);
    return NextResponse.json({ linked: true });
  } catch (error) {
    return makeErrorResponse(error);
  }
}
