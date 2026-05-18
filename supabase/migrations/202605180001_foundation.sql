create extension if not exists "pgcrypto";

create type public.lead_status as enum ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost');
create type public.interaction_channel as enum ('gmail', 'whatsapp', 'manual');
create type public.interaction_direction as enum ('inbound', 'outbound');
create type public.follow_up_status as enum ('queued', 'sent', 'failed', 'skipped');
create type public.integration_provider as enum ('gmail', 'whatsapp');
create type public.integration_health as enum ('healthy', 'degraded', 'disconnected');

create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan text not null default 'starter',
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  email text not null,
  role text not null check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  owner_id uuid not null references public.profiles(id),
  name text not null,
  company text not null,
  email text,
  phone text,
  status public.lead_status not null default 'new',
  urgency_score integer not null default 0 check (urgency_score between 0 and 100),
  last_interaction_at timestamptz,
  next_follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.interactions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  channel public.interaction_channel not null,
  direction public.interaction_direction not null,
  subject text,
  body text not null,
  external_id text,
  occurred_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table public.follow_ups (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  channel public.integration_provider not null,
  status public.follow_up_status not null default 'queued',
  scheduled_for timestamptz not null,
  reason text not null,
  generated_body text,
  external_id text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create table public.integration_connections (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  provider public.integration_provider not null,
  external_account_id text not null,
  health public.integration_health not null default 'healthy',
  cursor text,
  connected_at timestamptz not null default now(),
  unique (tenant_id, provider, external_account_id)
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index leads_tenant_status_idx on public.leads (tenant_id, status);
create index leads_follow_up_idx on public.leads (tenant_id, next_follow_up_at) where next_follow_up_at is not null;
create index interactions_lead_time_idx on public.interactions (tenant_id, lead_id, occurred_at desc);
create index follow_ups_due_idx on public.follow_ups (tenant_id, status, scheduled_for);

alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.interactions enable row level security;
alter table public.follow_ups enable row level security;
alter table public.integration_connections enable row level security;
alter table public.audit_logs enable row level security;

create or replace function public.current_tenant_id()
returns uuid
language sql
stable
as $$
  select tenant_id from public.profiles where id = auth.uid()
$$;

create policy "tenant members can read tenant" on public.tenants
  for select using (id = public.current_tenant_id());

create policy "tenant members can read profiles" on public.profiles
  for select using (tenant_id = public.current_tenant_id());

create policy "tenant members manage leads" on public.leads
  for all using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());

create policy "tenant members manage interactions" on public.interactions
  for all using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());

create policy "tenant members manage follow ups" on public.follow_ups
  for all using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());

create policy "tenant admins manage integrations" on public.integration_connections
  for all using (tenant_id = public.current_tenant_id()) with check (tenant_id = public.current_tenant_id());

create policy "tenant members read audit logs" on public.audit_logs
  for select using (tenant_id = public.current_tenant_id());
