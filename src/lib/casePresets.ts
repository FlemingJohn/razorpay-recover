import type { CasePreset } from "@/types/CasePreset";

export const casePresets: CasePreset[] = [
  { label: "Low balance, JioHotstar, 299", merchant: "JioHotstar", plan: "Super Plan", amount: "299", failureReason: "insufficient funds" },
  { label: "Expired card, Amazon Prime, 1499", merchant: "Amazon Prime", plan: "Annual Membership", amount: "1499", failureReason: "card expired" },
  { label: "Bank declined, Netflix, 499", merchant: "Netflix", plan: "Standard Plan", amount: "499", failureReason: "bank declined" },
  { label: "Mandate limit, HDFC Bank EMI, 4200", merchant: "HDFC Bank", plan: "Loan EMI", amount: "4200", failureReason: "mandate limit exceeded" },
];
