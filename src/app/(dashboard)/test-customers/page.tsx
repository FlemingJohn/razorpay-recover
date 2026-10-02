"use client";

import { useState } from "react";
import { AddCustomerForm } from "@/components/AddCustomerForm";
import { BrowserCallDrawer } from "@/components/BrowserCallDrawer";
import { CustomersTable } from "@/components/CustomersTable";
import { PageCard } from "@/components/PageCard";
import { StateMessage } from "@/components/StateMessage";
import { isTestCustomerId } from "@/customers/isTestCustomerId";
import { useCustomers } from "@/hooks/useCustomers";
import { useStartCall } from "@/hooks/useStartCall";

const refreshMilliseconds = 4000;

export default function TestCustomersPage() {
  const customers = useCustomers(refreshMilliseconds);
  const [talkingCustomerId, setTalkingCustomerId] = useState<string | null>(null);
  const { busyCustomerId, errorMessage, startCall } = useStartCall(customers.reload);
  if (customers.status !== "ready") {
    return <StateMessage status={customers.status} />;
  }
  const testCustomers = customers.data!.filter((customer) => isTestCustomerId(customer.id));
  const talkingCustomer = customers.data!.find((customer) => customer.id === talkingCustomerId);
  return (
    <>
      <AddCustomerForm onAdded={customers.reload} />
      <PageCard title="Your test customers">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {testCustomers.length === 0 ? (
          <p className="state-message">No test customers yet. Add one above.</p>
        ) : (
          <CustomersTable
            customers={testCustomers}
            busyCustomerId={busyCustomerId}
            onCall={startCall}
            onTalk={setTalkingCustomerId}
          />
        )}
      </PageCard>
      {talkingCustomer && (
        <BrowserCallDrawer
          key={talkingCustomer.id}
          customer={talkingCustomer}
          onClose={() => setTalkingCustomerId(null)}
          onChanged={customers.reload}
        />
      )}
    </>
  );
}
