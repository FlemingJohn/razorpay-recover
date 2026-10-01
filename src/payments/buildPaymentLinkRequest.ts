import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";
import type { Customer } from "@/types/Customer";

export function buildPaymentLinkRequest(customer: Customer) {
  return {
    amount: customer.amountInRupees * 100,
    currency: "INR",
    description: `${customer.plan} autopay recovery`,
    reference_id: `${customer.id}-${Date.now()}`,
    customer: {
      name: customer.name,
      contact: getRequiredEnvironmentValue("DEMO_PHONE_NUMBER"),
    },
    notify: { sms: true, email: false },
    reminder_enable: false,
  };
}
