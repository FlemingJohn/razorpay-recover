"use client";

import { useState } from "react";
import { CallDetailPanel } from "@/components/CallDetailPanel";
import { CallList } from "@/components/CallList";
import { EmptyCallState } from "@/components/EmptyCallState";
import { StateMessage } from "@/components/StateMessage";
import { useCalls } from "@/hooks/useCalls";
import { useCustomers } from "@/hooks/useCustomers";
import { combineRequestStatus } from "@/lib/combineRequestStatus";
import { getTotalTokens } from "@/lib/getTotalTokens";
import { sumCustomerCost } from "@/lib/sumCustomerCost";
import { sumTokenUsage } from "@/lib/sumTokenUsage";

export default function CallsPage() {
  const customers = useCustomers();
  const calls = useCalls(4000);
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const status = combineRequestStatus(customers.status, calls.status);
  if (status !== "ready") {
    return <StateMessage status={status} />;
  }
  if (calls.data!.length === 0) {
    return <EmptyCallState />;
  }
  const selectedCall = calls.data!.find((call) => call.id === selectedCallId) ?? calls.data![0];
  return (
    <div className="calls-layout">
      <CallList
        calls={calls.data!}
        customers={customers.data!}
        selectedCallId={selectedCall.id}
        onSelect={setSelectedCallId}
      />
      <CallDetailPanel
        key={selectedCall.id}
        call={selectedCall}
        customer={customers.data!.find((customer) => customer.id === selectedCall.customerId)}
        customerCostUsd={sumCustomerCost(calls.data!, selectedCall.customerId)}
        customerTokens={getTotalTokens(
          sumTokenUsage(calls.data!.filter((call) => call.customerId === selectedCall.customerId)),
        )}
        onChanged={calls.reload}
      />
    </div>
  );
}
