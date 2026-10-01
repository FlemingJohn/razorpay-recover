import { NextResponse } from "next/server";
import { getCustomerIdFromRequest } from "@/calls/getCustomerIdFromRequest";
import { handleWebhookMessage } from "@/calls/handleWebhookMessage";
import { isWebhookAuthorised } from "@/calls/isWebhookAuthorised";
import { makeErrorResponse } from "@/lib/makeErrorResponse";

export async function POST(request: Request) {
  if (!isWebhookAuthorised(request)) {
    return new Response("Unauthorised", { status: 401 });
  }
  try {
    const { message } = await request.json();
    const customerId = getCustomerIdFromRequest(request);
    return NextResponse.json(await handleWebhookMessage(message, customerId));
  } catch (error) {
    return makeErrorResponse(error);
  }
}
