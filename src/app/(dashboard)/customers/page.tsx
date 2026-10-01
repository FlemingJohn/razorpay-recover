"use client";

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
  const { busyCustomerId, errorMessage, startCall } = useStartCall(() => {
    customers.reload();
    calls.reload();
  });
  const status = combineRequestStatus(customers.status, calls.status);
  if (status !== "ready") {
    return <StateMessage status={status} />;
  }
  return (
    <>
      <PageCard title="Failed autopay">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <CustomersTable
          customers={customers.data!}
          busyCustomerId={busyCustomerId}
          onCall={startCall}
        />
      </PageCard>
      <LiveCallCard call={calls.data![0] ?? null} />
    </>
  );
}
