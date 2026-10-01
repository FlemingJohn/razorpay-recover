export interface PaymentLinkRow {
  callId: string;
  customerName: string;
  amountInRupees: number;
  shortUrl: string;
  isPaid: boolean;
  createdAt: string;
}
