"use client";

import { useState } from "react";
import type { AppSettings } from "@/types/AppSettings";

export function useSettingsForm(initial: AppSettings) {
  const [values, setValues] = useState(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function setField<Field extends keyof AppSettings>(field: Field, value: AppSettings[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function save() {
    setIsSaving(true);
    setMessage(null);
    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const body = await response.json().catch(() => ({}));
    setIsSaving(false);
    setMessage(response.ok ? "Saved. New calls use these settings." : body.error ?? "Could not save");
  }

  return { values, message, isSaving, setField, save };
}
