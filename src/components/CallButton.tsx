import { canCallCustomer } from "@/customers/canCallCustomer";
import type { Customer } from "@/types/Customer";
import { Icon } from "./Icon";

export function CallButton(props: {
  customer: Customer;
  isBusy: boolean;
  onCall: (customerId: string) => void;
}) {
  const isDisabled = props.isBusy || !canCallCustomer(props.customer);
  return (
    <button
      type="button"
      className="button"
      disabled={isDisabled}
      onClick={() => props.onCall(props.customer.id)}
    >
      <Icon name="phone" />
      {props.isBusy ? "Starting" : "Call now"}
    </button>
  );
}
