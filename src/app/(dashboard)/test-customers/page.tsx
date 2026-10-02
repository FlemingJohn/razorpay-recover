"use client";

import { useState } from "react";
import { BrowserCallCard } from "@/components/BrowserCallCard";
import { AddCustomerForm } from "@/components/AddCustomerForm";
import { CustomersTable } from "@/components/CustomersTable";
import { LiveCallCard } from "@/components/LiveCallCard";
import { PageCard } from "@/components/PageCard";
import { StateMessage } from "@/components/StateMessage";
import { isTestCustomerId } from "@/customers/isTestCustomerId";
import { useCalls } from "@/hooks/useCalls";
import { useCustomers } from "@/hooks/useCustomers";
import { useStartCall } from "@/hooks/useStartCall";
import { combineRequestStatus } from "@/lib/combineRequestStatus";

const refreshMilliseconds = 4000;

export default function TestCustomersPage() {
  const customers = useCustomers(refreshMilliseconds);
  const calls = useCalls(refreshMilliseconds);
  const [talkingCustomerId, setTalkingCustomerId] = useState<string | null>(null);
  const reloadAll = () => {
    customers.reload();
    calls.reload();
  };
  const { busyCustomerId, errorMessage, startCall } = useStartCall(reloadAll);
  const status = combineRequestStatus(customers.status, calls.status);
  if (status !== "ready") {
    return <StateMessage status={status} />;
  }
  const testCustomers = customers.data!.filter((customer) => isTestCustomerId(customer.id));
  const latestTestCall = calls.data!.find((call) => isTestCustomerId(call.customerId)) ?? null;
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
        <BrowserCallCard
          key={talkingCustomer.id}
          customer={talkingCustomer}
          onClose={() => setTalkingCustomerId(null)}
          onChanged={reloadAll}
        />
      )}
      <LiveCallCard call={latestTestCall} onChanged={calls.reload} />
    </>
  );
}
