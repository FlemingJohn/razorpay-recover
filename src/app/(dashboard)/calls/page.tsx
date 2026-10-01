"use client";

import { useState } from "react";
import { CallsTable } from "@/components/CallsTable";
import { LiveCallCard } from "@/components/LiveCallCard";
import { PageCard } from "@/components/PageCard";
import { StateMessage } from "@/components/StateMessage";
import { useCalls } from "@/hooks/useCalls";
import { useCustomers } from "@/hooks/useCustomers";
import { combineRequestStatus } from "@/lib/combineRequestStatus";

export default function CallsPage() {
  const customers = useCustomers();
  const calls = useCalls(4000);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const status = combineRequestStatus(customers.status, calls.status);
  if (status !== "ready") {
    return <StateMessage status={status} />;
  }
  const selectedCall = calls.data!.find((call) => call.id === selectedCallId) ?? null;
  return (
    <>
      <PageCard title="Calls">
        <CallsTable
          calls={calls.data!}
          customers={customers.data!}
          selectedCallId={selectedCallId}
          onSelect={setSelectedCallId}
        />
      </PageCard>
      <LiveCallCard call={selectedCall} />
    </>
  );
}
