"use client";

import { useState } from "react";
import { useCallMedia } from "@/hooks/useCallMedia";
import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import type { DetailTab } from "@/types/DetailTab";
import { CallDetailHeader } from "./CallDetailHeader";
import { CallOverviewTab } from "./CallOverviewTab";
import { ConversationTab } from "./ConversationTab";
import { DetailTabs } from "./DetailTabs";

export function CallDetailPanel(props: {
  call: CallRecord;
  customer: Customer | undefined;
  onChanged: () => void;
  customerCostUsd: number;
  customerTokens: number;
}) {
  const [tab, setTab] = useState<DetailTab>("overview");
  const media = useCallMedia(props.call.id);
  return (
    <section className="card detail-panel">
      <CallDetailHeader call={props.call} customer={props.customer} onChanged={props.onChanged} />
      <DetailTabs selected={tab} onSelect={setTab} />
      {tab === "overview" && (
        <CallOverviewTab
          call={props.call}
          customer={props.customer}
          media={media.data}
          customerCostUsd={props.customerCostUsd}
          customerTokens={props.customerTokens}
        />
      )}
      {tab === "conversation" && (
        <ConversationTab call={props.call} customer={props.customer} media={media.data} />
      )}
    </section>
  );
}
