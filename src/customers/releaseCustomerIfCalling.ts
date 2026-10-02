import { findCustomerById } from "./findCustomerById";
import { updateCustomerStatus } from "./updateCustomerStatus";

export async function releaseCustomerIfCalling(customerId: string): Promise<void> {
  const customer = await findCustomerById(customerId);
  if (customer?.status === "calling") {
    await updateCustomerStatus(customerId, "pending");
  }
}
