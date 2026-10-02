import { NextResponse } from "next/server";
import { startWebCall } from "@/calls/startWebCall";
import { makeErrorResponse } from "@/lib/makeErrorResponse";

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();
    return NextResponse.json(await startWebCall(customerId), { status: 201 });
  } catch (error) {
    return makeErrorResponse(error);
  }
}
