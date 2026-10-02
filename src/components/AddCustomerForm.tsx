"use client";

import { failureReasons } from "@/customers/failureReasons";
import { useAddCustomerForm } from "@/hooks/useAddCustomerForm";
import { CasePresetSelect } from "./CasePresetSelect";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { PageCard } from "./PageCard";
import { SelectField } from "./SelectField";
import { TestCasesHint } from "./TestCasesHint";
import { TextField } from "./TextField";

export function AddCustomerForm({ onAdded }: { onAdded: () => void }) {
  const form = useAddCustomerForm(onAdded);
  const { values, setField } = form;
  return (
    <PageCard title="Add a test customer">
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          form.submit();
        }}
      >
        <CasePresetSelect onPick={form.applyPreset} />
        <TextField id="name" label="Name" value={values.name} onChange={(value) => setField("name", value)} />
        <TextField id="phone" label="Phone" placeholder="+917604831363" value={values.phone} onChange={(value) => setField("phone", value)} />
        <TextField id="email" label="Email" type="email" value={values.email} onChange={(value) => setField("email", value)} />
        <TextField id="merchant" label="Merchant" value={values.merchant} onChange={(value) => setField("merchant", value)} />
        <TextField id="plan" label="Plan" value={values.plan} onChange={(value) => setField("plan", value)} />
        <TextField id="amount" label="Amount in rupees" type="number" value={values.amount} onChange={(value) => setField("amount", value)} />
        <SelectField
          id="failureReason"
          label="Why the autopay failed"
          value={values.failureReason}
          options={failureReasons.map((reason) => ({ value: reason, label: reason }))}
          onChange={(value) => setField("failureReason", value)}
        />
        <ConsentCheckbox checked={values.hasPermission} onChange={(checked) => setField("hasPermission", checked)} />
        <button type="submit" className="button" disabled={form.isSaving || !values.hasPermission}>
          {form.isSaving ? "Saving" : "Save customer"}
        </button>
        {form.message && <p className="form-message">{form.message}</p>}
      </form>
      <TestCasesHint />
    </PageCard>
  );
}
