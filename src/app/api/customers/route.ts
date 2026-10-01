import { NextResponse } from "next/server";
import { listCustomers } from "@/customers/listCustomers";
import { makeErrorResponse } from "@/lib/makeErrorResponse";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await listCustomers());
  } catch (error) {
    return makeErrorResponse(error);
  }
}
