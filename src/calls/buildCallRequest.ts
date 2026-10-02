import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";
import type { AppSettings } from "@/types/AppSettings";
import type { Customer } from "@/types/Customer";
import { buildAssistant } from "./buildAssistant";

export function buildCallRequest(customer: Customer, settings: AppSettings) {
  return {
    phoneNumberId: getRequiredEnvironmentValue("VAPI_PHONE_NUMBER_ID"),
    customer: { number: customer.phone, name: customer.name },
    assistant: buildAssistant(customer, settings),
  };
}
