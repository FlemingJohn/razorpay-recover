"use client";

import { useState } from "react";
import { BrowserCallDrawer } from "@/components/BrowserCallDrawer";
import { CustomersTable } from "@/components/CustomersTable";
import { PageCard } from "@/components/PageCard";
import { StateMessage } from "@/components/StateMessage";
import { useCustomers } from "@/hooks/useCustomers";
import { useStartCall } from "@/hooks/useStartCall";

const refreshMilliseconds = 4000;

export default function CustomersPage() {
  const customers = useCustomers(refreshMilliseconds);
  const [talkingCustomerId, setTalkingCustomerId] = useState<string | null>(null);
  const { busyCustomerId, errorMessage, startCall } = useStartCall(customers.reload);
  if (customers.status !== "ready") {
    return <StateMessage status={customers.status} />;
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
