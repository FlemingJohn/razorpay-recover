"use client";

import { SettingsForm } from "@/components/SettingsForm";
import { StateMessage } from "@/components/StateMessage";
import { useFetchedData } from "@/hooks/useFetchedData";
import type { AppSettings } from "@/types/AppSettings";

export default function SettingsPage() {
  const settings = useFetchedData<AppSettings>("/api/settings");
  if (settings.status !== "ready") {
    return <StateMessage status={settings.status} />;
  }
  return <SettingsForm initial={settings.data!} />;
}
