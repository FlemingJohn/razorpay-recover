import type { CustomerStatus } from "./CustomerStatus";

export interface Customer {
  id: string;
  name: string;
  merchant: string;
  plan: string;
  amountInRupees: number;
  failureReason: string;
  dueDate: string;
  status: CustomerStatus;
}
