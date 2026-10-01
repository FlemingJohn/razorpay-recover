"use client";

import type { PaymentLinkRow } from "@/types/PaymentLinkRow";
import { useFetchedData } from "./useFetchedData";

export function usePaymentLinks() {
  return useFetchedData<PaymentLinkRow[]>("/api/payment-links");
}
