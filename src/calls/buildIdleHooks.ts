import type { AppSettings } from "@/types/AppSettings";

export function buildIdleHooks(settings: AppSettings) {
  return [
    {
      on: "customer.speech.timeout",
      options: {
        timeoutSeconds: settings.idleTimeoutSeconds,
        triggerMaxCount: settings.idleMaxCount,
        triggerResetMode: "onUserSpeech",
      },
      do: [{ type: "say", exact: settings.idleMessage }],
    },
  ];
}
