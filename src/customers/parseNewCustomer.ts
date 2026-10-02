import { RequestError } from "@/lib/RequestError";
import type { NewCustomer } from "@/types/NewCustomer";
import { failureReasons } from "./failureReasons";
import { isValidEmail } from "./isValidEmail";
import { isValidPhone } from "./isValidPhone";
import { readAmount } from "./readAmount";
import { readRequiredText } from "./readRequiredText";

export function parseNewCustomer(input: Record<string, unknown>): NewCustomer {
  const phone = readRequiredText(input.phone, "Phone", 20);
  const email = readRequiredText(input.email, "Email", 80);
  const failureReason = readRequiredText(input.failureReason, "Failure reason", 40);
  if (!isValidPhone(phone)) {
    throw new RequestError("Phone must be in international form, like +917604831363", 400);
  }
  if (!isValidEmail(email)) {
    throw new RequestError("Email is not valid", 400);
  }
  if (!failureReasons.includes(failureReason)) {
    throw new RequestError("Choose one of the listed failure reasons", 400);
  }
  return {
    name: readRequiredText(input.name, "Name", 60),
    email,
    phone,
    merchant: readRequiredText(input.merchant, "Merchant", 40),
    plan: readRequiredText(input.plan, "Plan", 40),
    amountInRupees: readAmount(input.amount),
    failureReason,
  };
}
