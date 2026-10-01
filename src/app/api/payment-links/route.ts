import { NextResponse } from "next/server";
import { makeErrorResponse } from "@/lib/makeErrorResponse";
import { listPaymentLinks } from "@/payments/listPaymentLinks";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await listPaymentLinks());
  } catch (error) {
    return makeErrorResponse(error);
  }
}
