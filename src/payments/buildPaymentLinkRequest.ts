import type { AppSettings } from "@/types/AppSettings";
import type { Customer } from "@/types/Customer";

export function buildPaymentLinkRequest(customer: Customer, settings: AppSettings) {
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
    notify: { sms: settings.sendSms, email: settings.sendEmail },
    reminder_enable: false,
  };
}
