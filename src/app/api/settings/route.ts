import { NextResponse } from "next/server";
import { makeErrorResponse } from "@/lib/makeErrorResponse";
import { getSettings } from "@/settings/getSettings";
import { parseSettings } from "@/settings/parseSettings";
import { saveSettings } from "@/settings/saveSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getSettings());
  } catch (error) {
    return makeErrorResponse(error);
  }
}

export async function PUT(request: Request) {
  try {
    const settings = parseSettings(await request.json());
    await saveSettings(settings);
    return NextResponse.json(settings);
  } catch (error) {
    return makeErrorResponse(error);
  }
}
