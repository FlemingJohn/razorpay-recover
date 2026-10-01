import type { Customer } from "@/types/Customer";
import { CustomerRow } from "./CustomerRow";

export function CustomersTable(props: {
  customers: Customer[];
  busyCustomerId: string | null;
  onCall: (customerId: string) => void;
}) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th className="number">Amount</th>
            <th>Reason</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              isBusy={props.busyCustomerId === customer.id}
              onCall={props.onCall}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
