"use client";

import { useState } from "react";
import { emptyCustomerForm } from "@/lib/emptyCustomerForm";
import type { CasePreset } from "@/types/CasePreset";
import type { CustomerFormValues } from "@/types/CustomerFormValues";

export function useAddCustomerForm(onAdded: () => void) {
  const [values, setValues] = useState<CustomerFormValues>(emptyCustomerForm);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function setField<Field extends keyof CustomerFormValues>(
    field: Field,
    value: CustomerFormValues[Field],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function applyPreset(preset: CasePreset) {
    setValues((current) => ({ ...current, ...preset }));
  }

  async function submit() {
    setIsSaving(true);
    setMessage(null);
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const body = await response.json().catch(() => ({}));
    setIsSaving(false);
    if (!response.ok) {
      setMessage(body.error ?? "The customer could not be saved");
      return;
    }
    setMessage(`Saved ${body.name} as ${body.id}`);
    setValues(emptyCustomerForm);
    onAdded();
  }

  return { values, message, isSaving, setField, applyPreset, submit };
}
