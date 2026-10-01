import { NextResponse } from "next/server";
import { RequestError } from "./RequestError";

export function makeErrorResponse(error: unknown): NextResponse {
  if (error instanceof RequestError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}
