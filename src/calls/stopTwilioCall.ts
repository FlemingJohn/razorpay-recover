import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";
import { RequestError } from "@/lib/RequestError";

export async function stopTwilioCall(
  twilioCallId: string,
  status: "canceled" | "completed",
): Promise<void> {
  const accountSid = getRequiredEnvironmentValue("TWILIO_ACCOUNT_SID");
  const authToken = getRequiredEnvironmentValue("TWILIO_AUTH_TOKEN");
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls/${twilioCallId}.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ Status: status }),
    },
  );
  if (!response.ok) {
    throw new RequestError("Twilio could not end the call", 502);
  }
}
