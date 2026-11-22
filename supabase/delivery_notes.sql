-- Packing slips / delivery notes (إذن تسليم)
-- Run once in the Supabase SQL editor for project hibr-press BEFORE using the new screen.
-- Links: job order (job_order_id) and invoice (invoice_id) on the same customer.

create table if not exists public.delivery_notes (
  id           uuid primary key default gen_random_uuid(),
  number       text unique,
  date         date not null default current_date,
  due_date     date,
  status       text not null default 'draft',
  customer_id  uuid references public.customers(id),
  job_order_id uuid references public.job_orders(id),
  invoice_id   uuid references public.invoices(id),
  subject      text,
  subtotal     numeric(12,3) not null default 0,
  discount     numeric(12,3) not null default 0,
  total        numeric(12,3) not null default 0,
  notes        text,
  created_at   timestamptz not null default now()
);

create table if not exists public.delivery_note_items (
  id               uuid primary key default gen_random_uuid(),
  delivery_note_id uuid not null references public.delivery_notes(id) on delete cascade,
  sort             int not null default 0,
  description      text,
  specs            text,
  qty              numeric(12,3) not null default 0,
  unit_price       numeric(12,3) not null default 0,
  total            numeric(12,3) not null default 0
);

create index if not exists delivery_notes_customer_idx on public.delivery_notes(customer_id);
create index if not exists delivery_notes_job_idx on public.delivery_notes(job_order_id);
create index if not exists delivery_notes_invoice_idx on public.delivery_notes(invoice_id);
create index if not exists delivery_note_items_parent_idx on public.delivery_note_items(delivery_note_id);

-- TODO before first use: rpc next_number() must accept kind 'delivery_note'
-- (add it to the same sequence table that already serves 'invoice', 'receipt', 'job_order').
-- TODO: apply the same row-level security policy used by the other document tables.
