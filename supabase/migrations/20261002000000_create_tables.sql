create table customers (
  id text primary key,
  name text not null,
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

insert into customers (id, name, merchant, plan, amount_in_rupees, failure_reason, due_date)
values
  ('CUST001', 'Aarav Mehta', 'Streamly', 'Streaming Plus', 499, 'insufficient funds', '2026-09-20'),
  ('CUST002', 'Priya Nair', 'FitZone Gym', 'Monthly Membership', 1500, 'card expired', '2026-09-21');
