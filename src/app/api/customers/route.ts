import { NextResponse } from "next/server";
import { insertCustomer } from "@/customers/insertCustomer";
import { listCustomers } from "@/customers/listCustomers";
import { parseNewCustomer } from "@/customers/parseNewCustomer";
import { makeErrorResponse } from "@/lib/makeErrorResponse";
import { RequestError } from "@/lib/RequestError";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await listCustomers());
  } catch (error) {
    return makeErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.hasPermission !== true) {
      throw new RequestError("Confirm you have permission to call this number", 400);
    }
    return NextResponse.json(await insertCustomer(parseNewCustomer(body)), { status: 201 });
  } catch (error) {
    return makeErrorResponse(error);
  }
}
