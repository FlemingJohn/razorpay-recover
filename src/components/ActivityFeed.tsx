import { formatTime } from "@/lib/formatTime";
import { getOutcomePill } from "@/lib/getOutcomePill";
import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import { PageCard } from "./PageCard";
import { StatusPill } from "./StatusPill";

export function ActivityFeed(props: { calls: CallRecord[]; customers: Customer[] }) {
  const recentCalls = props.calls.slice(0, 6);
  return (
    <PageCard title="Recent activity">
      {recentCalls.length === 0 && <p className="state-message">No calls yet</p>}
      <ul className="feed">
        {recentCalls.map((call) => (
          <li key={call.id}>
            <time className="feed-time">{formatTime(call.createdAt)}</time>
            <span>{props.customers.find((item) => item.id === call.customerId)?.name}</span>
            {call.summary && <StatusPill {...getOutcomePill(call.summary.outcome)} />}
          </li>
        ))}
      </ul>
    </PageCard>
  );
}
