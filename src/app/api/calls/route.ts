import { NextResponse } from "next/server";
import { listCalls } from "@/calls/listCalls";
import { startCall } from "@/calls/startCall";
import { makeErrorResponse } from "@/lib/makeErrorResponse";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await listCalls());
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
