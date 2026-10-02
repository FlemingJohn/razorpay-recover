const descriptions: Record<string, string> = {
  "customer-did-not-answer": "The customer did not answer.",
  "customer-ended-call": "The customer hung up.",
  "assistant-ended-call": "The agent ended the call.",
  "exceeded-max-duration": "The call reached its three minute limit.",
  "web-call-never-started": "The browser call was prepared but never started.",
  "call.in-progress.twilio-completed-call": "The call was ended from Twilio.",
  "call.start.error-get-transport":
    "The phone provider could not start the call. While Twilio is on a trial, the number must be verified in Twilio.",
};

export function describeEndedReason(reason: string): string {
  return descriptions[reason] ?? `The call ended: ${reason}`;
}
