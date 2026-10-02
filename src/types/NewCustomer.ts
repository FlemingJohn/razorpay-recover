export interface NewCustomer {
  name: string;
  email: string;
  phone: string;
  merchant: string;
  plan: string;
  amountInRupees: number;
  failureReason: string;
}
