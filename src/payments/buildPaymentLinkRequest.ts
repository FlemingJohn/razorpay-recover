import type { Customer } from "@/types/Customer";

export function buildPaymentLinkRequest(customer: Customer) {
  return {
    amount: customer.amountInRupees * 100,
    currency: "INR",
    description: `${customer.plan} autopay recovery`,
    reference_id: `${customer.id}-${Date.now()}`,
    customer: {
      name: customer.name,
      email: customer.email,
      contact: customer.phone,
    },
    notify: { sms: true, email: true },
    reminder_enable: false,
  };
}
