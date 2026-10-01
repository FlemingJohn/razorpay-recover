import { formatRupees } from "@/lib/formatRupees";
import { getCustomerStatusPill } from "@/lib/getCustomerStatusPill";
import type { Customer } from "@/types/Customer";
import { CallButton } from "./CallButton";
import { StatusPill } from "./StatusPill";

export function CustomerRow(props: {
  customer: Customer;
  isBusy: boolean;
  onCall: (customerId: string) => void;
}) {
  const { customer } = props;
  return (
    <tr>
      <td className="mono">{customer.id}</td>
      <td>{customer.name}</td>
      <td>{customer.plan}</td>
      <td className="number">{formatRupees(customer.amountInRupees)}</td>
      <td>{customer.failureReason}</td>
      <td>
        <StatusPill {...getCustomerStatusPill(customer.status)} />
      </td>
      <td>
        <CallButton customer={customer} isBusy={props.isBusy} onCall={props.onCall} />
      </td>
    </tr>
  );
}
