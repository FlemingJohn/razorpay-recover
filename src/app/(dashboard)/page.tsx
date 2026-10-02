"use client";

import { ActivityFeed } from "@/components/ActivityFeed";
import { OutcomeBars } from "@/components/OutcomeBars";
import { StateMessage } from "@/components/StateMessage";
import { StatCards } from "@/components/StatCards";
import { UsageStatCards } from "@/components/UsageStatCards";
import { useCalls } from "@/hooks/useCalls";
import { useCustomers } from "@/hooks/useCustomers";
import { combineRequestStatus } from "@/lib/combineRequestStatus";
import { countOutcomes } from "@/lib/countOutcomes";
import { getDashboardStats } from "@/lib/getDashboardStats";

export default function OverviewPage() {
  const customers = useCustomers();
  const calls = useCalls();
  const status = combineRequestStatus(customers.status, calls.status);
  if (status !== "ready") {
    return <StateMessage status={status} />;
  }
  const stats = getDashboardStats(customers.data!, calls.data!);
  return (
    <>
      <StatCards stats={stats} />
      <UsageStatCards stats={stats} />
      <div className="two-columns">
        <OutcomeBars counts={countOutcomes(calls.data!)} />
        <ActivityFeed calls={calls.data!} customers={customers.data!} />
      </div>
    </>
  );
}
