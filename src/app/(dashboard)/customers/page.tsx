"use client";

import { useState } from "react";
import { BrowserCallCard } from "@/components/BrowserCallCard";
import { CustomersTable } from "@/components/CustomersTable";
import { LiveCallCard } from "@/components/LiveCallCard";
import { PageCard } from "@/components/PageCard";
import { StateMessage } from "@/components/StateMessage";
import { useCalls } from "@/hooks/useCalls";
import { useCustomers } from "@/hooks/useCustomers";
import { useStartCall } from "@/hooks/useStartCall";
import { combineRequestStatus } from "@/lib/combineRequestStatus";

const refreshMilliseconds = 4000;

export default function CustomersPage() {
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
  const talkingCustomer = customers.data!.find((customer) => customer.id === talkingCustomerId);
  return (
    <>
      <PageCard title="Failed autopay">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <CustomersTable
          customers={customers.data!}
          busyCustomerId={busyCustomerId}
          onCall={startCall}
          onTalk={setTalkingCustomerId}
        />
      </PageCard>
      {talkingCustomer && (
        <BrowserCallCard
          key={talkingCustomer.id}
          customer={talkingCustomer}
          onClose={() => setTalkingCustomerId(null)}
          onChanged={reloadAll}
        />
      )}
      <LiveCallCard call={calls.data![0] ?? null} onChanged={calls.reload} />
    </>
  );
}
