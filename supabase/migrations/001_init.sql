-- Off-chain schema. Antecedentes NUNCA tienen eas_uid.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  wallet_address text unique not null,
  handle text unique not null,
  legal_name text not null,
  legal_name_locked boolean not null default false,
  display_headline text not null default '',
  bio text not null default '',
  avatar_url text not null default '',
  kyc_status text not null default 'none',
  sbt_token_id text,
  integrity_link_enabled boolean not null default false,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  company text not null,
  start_date date,
  end_date date,
  description text not null default '',
  is_public boolean not null default true,
  trust_level text not null default 'declared',
  eas_uid text,
  locked boolean not null default false
);

create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  school text not null,
  degree text not null,
  field text not null,
  year text not null,
  is_public boolean not null default true,
  trust_level text not null default 'declared',
  eas_uid text,
  locked boolean not null default false
);

create table if not exists declared_skills (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  is_public boolean not null default true
);

create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  label text not null,
  url text not null,
  is_public boolean not null default true
);

create table if not exists issuers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind text not null,
  wallet text not null,
  verified boolean not null default false
);

create table if not exists issuer_members (
  profile_id uuid not null references profiles(id) on delete cascade,
  issuer_id uuid not null references issuers(id) on delete cascade,
  primary key (profile_id, issuer_id)
);

create table if not exists credentials (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  issuer_name text not null,
  issuer_id uuid references issuers(id),
  credential_type text not null,
  document_hash text,
  eas_uid text,
  trust_level text not null default 'declared',
  issued_at timestamptz not null default now(),
  is_public boolean not null default true,
  revoked_at timestamptz,
  external_id text,
  provider text
);

create table if not exists kyc_uniqueness (
  uniqueness_hash text primary key,
  profile_id uuid not null references profiles(id)
);

create table if not exists integrity_vault (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique not null references profiles(id) on delete cascade,
  status text not null,
  official_source text not null,
  summary text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
  -- sin eas_uid a propósito
);

create table if not exists integrity_access_grants (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  token text unique not null,
  label text not null,
  expires_at timestamptz not null,
  single_use boolean not null default true,
  used_at timestamptz,
  created_by uuid not null references profiles(id)
);

create table if not exists integrity_access_logs (
  id uuid primary key default gen_random_uuid(),
  grant_id uuid not null references integrity_access_grants(id) on delete cascade,
  viewer_label text not null,
  viewed_at timestamptz not null default now()
);

create table if not exists web2_verifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  provider text not null,
  external_id text not null,
  title text not null,
  verified_at timestamptz not null default now(),
  sandbox boolean not null default true
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  organizer_profile_id uuid not null references profiles(id),
  name text not null,
  slug text unique not null,
  date date,
  location text
);

create table if not exists event_checkins (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events(id) on delete cascade,
  profile_id uuid not null references profiles(id),
  handle text not null,
  checked_in_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table experience enable row level security;
alter table education enable row level security;
alter table declared_skills enable row level security;
alter table social_links enable row level security;
alter table credentials enable row level security;
alter table integrity_vault enable row level security;
alter table integrity_access_grants enable row level security;
alter table integrity_access_logs enable row level security;

create policy "public_profiles_read" on profiles for select using (true);
create policy "owner_update_profile" on profiles for update using (true);

create policy "public_cv_bits" on experience for select using (is_public = true);
create policy "public_edu" on education for select using (is_public = true);
create policy "public_skills" on declared_skills for select using (is_public = true);
create policy "public_links" on social_links for select using (is_public = true);
create policy "public_creds" on credentials for select using (is_public = true and revoked_at is null);

-- El vault no es legible de forma anónima.
create policy "no_anon_vault" on integrity_vault for select using (false);
