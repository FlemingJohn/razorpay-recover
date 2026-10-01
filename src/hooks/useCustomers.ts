"use client";

import type { Customer } from "@/types/Customer";
import { useFetchedData } from "./useFetchedData";

export function useCustomers(refreshMilliseconds?: number) {
  return useFetchedData<Customer[]>("/api/customers", refreshMilliseconds);
}
