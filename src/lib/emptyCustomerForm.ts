import type { CustomerFormValues } from "@/types/CustomerFormValues";

export const emptyCustomerForm: CustomerFormValues = {
  name: "",
  phone: "",
  email: "",
  merchant: "",
  plan: "",
  amount: "",
  failureReason: "insufficient funds",
  hasPermission: false,
};
