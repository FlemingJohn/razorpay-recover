import { RequestError } from "@/lib/RequestError";

export function getCustomerIdFromRequest(request: Request): string {
  const customerId = new URL(request.url).searchParams.get("customerId");
  if (!customerId) {
    throw new RequestError("Missing customer", 400);
  }
  return customerId;
}
