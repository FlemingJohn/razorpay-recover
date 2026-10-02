"use client";

import { useSettingsForm } from "@/hooks/useSettingsForm";
import type { AppSettings } from "@/types/AppSettings";
import { NumberField } from "./NumberField";
import { redactionLevels } from "@/settings/redactionLevels";
import { PageCard } from "./PageCard";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";
import { ToggleField } from "./ToggleField";

export function SettingsForm({ initial }: { initial: AppSettings }) {
  const form = useSettingsForm(initial);
  const { values, setField } = form;
  return (
    <form
      className="settings-grid"
      onSubmit={(event) => {
        event.preventDefault();
        form.save();
      }}
    >
      <PageCard title="Call limits">
        <NumberField id="maxDuration" label="Longest call (seconds)" hint="The call ends after this long." value={values.maxDurationSeconds} min={30} max={900} onChange={(value) => setField("maxDurationSeconds", value)} />
        <NumberField id="silenceTimeout" label="Hang up after silence (seconds)" hint="The call ends if nobody speaks for this long." value={values.silenceTimeoutSeconds} min={10} max={120} onChange={(value) => setField("silenceTimeoutSeconds", value)} />
      </PageCard>
      <PageCard title="When the customer goes quiet">
        <TextField id="idleMessage" label="What the agent says" value={values.idleMessage} onChange={(value) => setField("idleMessage", value)} />
        <NumberField id="idleTimeout" label="Wait before asking (seconds)" hint="Silence before the agent checks in." value={values.idleTimeoutSeconds} min={3} max={30} onChange={(value) => setField("idleTimeoutSeconds", value)} />
        <NumberField id="idleMaxCount" label="Times to ask" hint="Resets whenever the customer speaks." value={values.idleMaxCount} min={1} max={5} onChange={(value) => setField("idleMaxCount", value)} />
      </PageCard>
      <PageCard title="Payment link messages">
        <ToggleField id="sendSms" label="Send by SMS" hint="Razorpay texts the link to the customer's phone." checked={values.sendSms} onChange={(checked) => setField("sendSms", checked)} />
        <ToggleField id="sendEmail" label="Send by email" hint="Razorpay emails the link to the customer's address." checked={values.sendEmail} onChange={(checked) => setField("sendEmail", checked)} />
      </PageCard>
      <PageCard title="Privacy">
        <ToggleField id="recordCalls" label="Record call audio" hint="Turn off to stop saving recordings of new calls. Transcripts are still saved." checked={values.recordCalls} onChange={(checked) => setField("recordCalls", checked)} />
        <SelectField
          id="redaction"
          label="Hide sensitive details in transcripts"
          value={values.redaction}
          options={redactionLevels.map((level) => ({ value: level.value, label: level.label }))}
          onChange={(value) => setField("redaction", value as AppSettings["redaction"])}
        />
        <p className="field-hint">Replaces card numbers, or names and places, with labels before the agent hears them. Audio recordings are not changed. Turning on personal details may hide the customer name from the agent.</p>
      </PageCard>
      <div className="settings-actions">
        <button type="submit" className="button" disabled={form.isSaving}>
          {form.isSaving ? "Saving" : "Save settings"}
        </button>
        {form.message && <span className="form-message">{form.message}</span>}
      </div>
    </form>
  );
}
