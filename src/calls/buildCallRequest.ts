import { getRequiredEnvironmentValue } from "@/lib/getRequiredEnvironmentValue";
import type { Customer } from "@/types/Customer";
import { buildAssistant } from "./buildAssistant";

export function buildCallRequest(customer: Customer) {
  return {
    phoneNumberId: getRequiredEnvironmentValue("VAPI_PHONE_NUMBER_ID"),
    customer: {
      number: getRequiredEnvironmentValue("DEMO_PHONE_NUMBER"),
      name: customer.name,
    },
    assistant: buildAssistant(customer),
  };
}
