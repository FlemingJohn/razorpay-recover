create table customers (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  merchant text not null,
  plan text not null,
  amount_in_rupees integer not null,
  failure_reason text not null,
  due_date date not null,
  status text not null default 'pending'
);

create table calls (
  id uuid primary key default gen_random_uuid(),
  customer_id text not null references customers (id),
  vapi_call_id text unique,
  status text not null default 'queued',
  summary jsonb,
  payment_link text,
  payment_link_id text,
  transcript text,
  ended_reason text,
  created_at timestamptz not null default now()
);

alter table customers enable row level security;
alter table calls enable row level security;

insert into customers (id, name, email, phone, merchant, plan, amount_in_rupees, failure_reason, due_date)
values
  ('CUST001', 'Fleming John', 'flemjohn08@gmail.com', '+917604831363', 'JioHotstar', 'Super Plan', 299, 'insufficient funds', '2026-09-20'),
  ('CUST002', 'Fleming John', 'flemjohn08@gmail.com', '+917604831363', 'Amazon Prime', 'Annual Membership', 1499, 'card expired', '2026-09-21'),
  ('CUST003', 'Rohan Gupta', 'rohan.gupta@example.com', '+910000000001', 'Netflix', 'Standard Plan', 499, 'bank declined', '2026-09-22'),
  ('CUST004', 'Sneha Iyer', 'sneha.iyer@example.com', '+910000000002', 'Airtel', 'Postpaid Plan', 599, 'insufficient funds', '2026-09-23'),
  ('CUST005', 'Vikram Singh', 'vikram.singh@example.com', '+910000000003', 'HDFC Bank', 'Loan EMI', 4200, 'mandate limit exceeded', '2026-09-24'),
  ('CUST006', 'Ananya Das', 'ananya.das@example.com', '+910000000004', 'Spotify', 'Premium Individual', 119, 'card expired', '2026-09-25'),
  ('CUST007', 'Karan Malhotra', 'karan.malhotra@example.com', '+910000000005', 'JioFiber', 'Fiber Plan', 999, 'insufficient funds', '2026-09-26'),
  ('CUST008', 'Meera Joshi', 'meera.joshi@example.com', '+910000000006', 'Cult.fit', 'Monthly Membership', 1500, 'bank declined', '2026-09-27'),
  ('CUST009', 'Arjun Reddy', 'arjun.reddy@example.com', '+910000000007', 'ZEE5', 'Premium Plan', 99, 'insufficient funds', '2026-09-28'),
  ('CUST010', 'Divya Pillai', 'divya.pillai@example.com', '+910000000008', 'Tata Power', 'Electricity Bill', 1760, 'mandate limit exceeded', '2026-09-29');
