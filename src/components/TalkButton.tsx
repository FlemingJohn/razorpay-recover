import { canCallCustomer } from "@/customers/canCallCustomer";
import type { Customer } from "@/types/Customer";
import { Icon } from "./Icon";

export function TalkButton(props: { customer: Customer; onTalk: (customerId: string) => void }) {
  return (
    <button
      type="button"
      className="button button-quiet"
      disabled={!canCallCustomer(props.customer)}
      onClick={() => props.onTalk(props.customer.id)}
    >
      <Icon name="wave" />
      Talk in browser
    </button>
  );
}
