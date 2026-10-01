"use client";

import { PageCard } from "@/components/PageCard";
import { PaymentLinksTable } from "@/components/PaymentLinksTable";
import { StateMessage } from "@/components/StateMessage";
import { usePaymentLinks } from "@/hooks/usePaymentLinks";

export default function PaymentLinksPage() {
  const links = usePaymentLinks();
  if (links.status !== "ready") {
    return <StateMessage status={links.status} />;
  }
  return (
    <PageCard title="Payment links">
      <PaymentLinksTable rows={links.data!} />
    </PageCard>
  );
}
