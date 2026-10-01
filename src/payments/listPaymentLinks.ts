import { listCalls } from "@/calls/listCalls";
import { listCustomers } from "@/customers/listCustomers";
import { updateCustomerStatus } from "@/customers/updateCustomerStatus";
import type { CallRecord } from "@/types/CallRecord";
import type { Customer } from "@/types/Customer";
import type { PaymentLinkRow } from "@/types/PaymentLinkRow";
import { isPaymentLinkPaid } from "./isPaymentLinkPaid";

export async function listPaymentLinks(): Promise<PaymentLinkRow[]> {
  const customers = await listCustomers();
  const calls = (await listCalls()).filter((call) => call.paymentLink);
  return Promise.all(calls.map((call) => makeRow(call, customers)));
}

async function makeRow(call: CallRecord, customers: Customer[]): Promise<PaymentLinkRow> {
  const customer = customers.find((item) => item.id === call.customerId)!;
  const isPaid = await checkPaid(call, customer);
  return {
    callId: call.id,
    customerName: customer.name,
    amountInRupees: customer.amountInRupees,
    shortUrl: call.paymentLink!,
    isPaid,
    createdAt: call.createdAt,
  };
}

async function checkPaid(call: CallRecord, customer: Customer): Promise<boolean> {
  if (customer.status === "paid") {
    return true;
  }
  const isPaid = call.paymentLinkId ? await isPaymentLinkPaid(call.paymentLinkId) : false;
  if (isPaid) {
    await updateCustomerStatus(customer.id, "paid");
  }
  return isPaid;
}
