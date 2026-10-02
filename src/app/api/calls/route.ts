import { NextResponse } from "next/server";
import { listCalls } from "@/calls/listCalls";
import { startCall } from "@/calls/startCall";
import { syncOpenCalls } from "@/calls/syncOpenCalls";
import { makeErrorResponse } from "@/lib/makeErrorResponse";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const calls = await listCalls();
    const hasChanged = await syncOpenCalls(calls);
    return NextResponse.json(hasChanged ? await listCalls() : calls);
  } catch (error) {
    return makeErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();
    return NextResponse.json(await startCall(customerId), { status: 201 });
  } catch (error) {
    return makeErrorResponse(error);
  }
}
