-- PromiseProof MVP schema for Supabase Postgres
-- Run this in Supabase SQL editor after creating a new project.
-- This version adds account-first onboarding, socials, payout methods, human verification, admin queues, support tickets, and messaging.

create extension if not exists pgcrypto;

create type user_role as enum ('user', 'creator', 'moderator', 'admin');
create type identity_status as enum ('unverified', 'pending', 'verified', 'rejected', 'suspended');
create type social_status as enum ('unverified', 'pending', 'oauth_verified', 'admin_verified', 'rejected');
create type payout_method_status as enum ('pending', 'active', 'needs_review', 'rejected', 'disabled');
create type challenge_status as enum ('draft', 'funded', 'live', 'closed', 'winner_verified', 'paid', 'failed', 'disputed', 'refunded');
create type challenge_type as enum ('hidden_code', 'game_result', 'leaderboard_crown_rush', 'digital_reward', 'physical_action', 'random_draw');
create type verification_mode as enum ('api_verified', 'controlled_match_room', 'moderator_verified', 'manual_proof', 'community_dispute');
create type payout_status as enum ('not_required', 'pending', 'processing', 'paid', 'failed', 'refunded');
create type proof_event_type as enum ('funded', 'rules_locked', 'entry_submitted', 'winner_verified', 'payout_completed', 'proof_uploaded', 'dispute_opened', 'dispute_resolved', 'promise_failed', 'identity_verified');
create type verification_request_status as enum ('pending', 'scheduled', 'approved', 'rejected', 'needs_more_info');
create type ticket_status as enum ('open', 'waiting_on_user', 'waiting_on_admin', 'solved', 'closed');
create type conversation_type as enum ('direct', 'admin_verification', 'support_ticket', 'dispute');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text unique not null check (handle ~ '^[a-zA-Z0-9_\.]{3,32}$'),
  display_name text not null,
  email text,
  avatar_url text,
  bio text,
  role user_role not null default 'user',
  identity_status identity_status not null default 'unverified',
  identity_verified_at timestamptz,
  identity_verified_by uuid references public.profiles(id) on delete set null,
  promise_score int not null default 60 check (promise_score between 0 and 100),
  promises_total int not null default 0,
  promises_completed int not null default 0,
  disputes_total int not null default 0,
  payout_cents_total int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.social_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  platform text not null,
  handle text,
  profile_url text,
  oauth_provider_id text,
  status social_status not null default 'unverified',
  verification_note text,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, platform, handle)
);

create table public.payout_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null check (provider in ('stripe', 'paypal', 'manual')),
  label text not null,
  payout_email text,
  provider_account_id text,
  country text,
  status payout_method_status not null default 'pending',
  is_default boolean not null default false,
  encrypted_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.challenges (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  slug text unique not null,
  title text not null,
  description text,
  rules text not null,
  type challenge_type not null,
  status challenge_status not null default 'draft',
  verification_mode verification_mode not null default 'manual_proof',
  reward_label text not null,
  reward_cents int not null default 0 check (reward_cents >= 0),
  currency text not null default 'usd',
  funded_at timestamptz,
  rules_locked_at timestamptz,
  starts_at timestamptz,
  ends_at timestamptz,
  winner_entry_id uuid,
  public_result text,
  proof_url text,
  source_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.hidden_codes (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  code_hash text not null,
  hint text,
  winner_entry_id uuid,
  created_at timestamptz not null default now()
);

create table public.challenge_entries (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  entrant_name text,
  entrant_contact text,
  submitted_value text,
  proof_url text,
  is_winner boolean not null default false,
  is_valid boolean,
  judge_note text,
  created_at timestamptz not null default now()
);

alter table public.challenges
  add constraint challenges_winner_entry_id_fkey
  foreign key (winner_entry_id) references public.challenge_entries(id) on delete set null;

alter table public.hidden_codes
  add constraint hidden_codes_winner_entry_id_fkey
  foreign key (winner_entry_id) references public.challenge_entries(id) on delete set null;

create table public.proof_events (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  actor_id uuid references public.profiles(id) on delete set null,
  event_type proof_event_type not null,
  title text not null,
  detail text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  entry_id uuid references public.challenge_entries(id) on delete set null,
  recipient_user_id uuid references public.profiles(id) on delete set null,
  payout_account_id uuid references public.payout_accounts(id) on delete set null,
  amount_cents int not null check (amount_cents >= 0),
  currency text not null default 'usd',
  provider text not null default 'manual',
  provider_reference text,
  status payout_status not null default 'pending',
  public_receipt_url text,
  private_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table public.game_verifications (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  platform text not null,
  creator_username text,
  challenger_username text,
  match_id text,
  api_result jsonb,
  result_status text not null default 'pending',
  winner_username text,
  verified_by uuid references public.profiles(id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.controlled_match_rooms (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  room_code text,
  platform text,
  stream_url text,
  scheduled_at timestamptz,
  moderator_id uuid references public.profiles(id) on delete set null,
  result_summary text,
  evidence_url text,
  created_at timestamptz not null default now()
);

create table public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  requested_status identity_status not null default 'verified',
  status verification_request_status not null default 'pending',
  meeting_method text,
  meeting_url text,
  requested_time text,
  admin_note text,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.disputes (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  opened_by uuid references public.profiles(id) on delete set null,
  reason text not null,
  status text not null default 'open',
  moderator_note text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  challenge_id uuid references public.challenges(id) on delete set null,
  subject text not null,
  issue_type text not null,
  message text not null,
  status ticket_status not null default 'open',
  priority text not null default 'normal',
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  type conversation_type not null default 'direct',
  title text,
  challenge_id uuid references public.challenges(id) on delete set null,
  support_ticket_id uuid references public.support_tickets(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.conversation_members (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete set null,
  body text not null,
  attachment_url text,
  created_at timestamptz not null default now()
);

create index profiles_handle_idx on public.profiles(handle);
create index social_accounts_user_idx on public.social_accounts(user_id);
create index payout_accounts_user_idx on public.payout_accounts(user_id);
create index challenges_creator_idx on public.challenges(creator_id);
create index challenges_status_idx on public.challenges(status);
create index entries_challenge_idx on public.challenge_entries(challenge_id);
create index proof_events_challenge_idx on public.proof_events(challenge_id);
create index payouts_challenge_idx on public.payouts(challenge_id);
create index messages_conversation_idx on public.messages(conversation_id);
create index support_tickets_user_idx on public.support_tickets(user_id);

alter table public.profiles enable row level security;
alter table public.social_accounts enable row level security;
alter table public.payout_accounts enable row level security;
alter table public.challenges enable row level security;
alter table public.hidden_codes enable row level security;
alter table public.challenge_entries enable row level security;
alter table public.proof_events enable row level security;
alter table public.payouts enable row level security;
alter table public.game_verifications enable row level security;
alter table public.controlled_match_rooms enable row level security;
alter table public.verification_requests enable row level security;
alter table public.disputes enable row level security;
alter table public.support_tickets enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_members enable row level security;
alter table public.messages enable row level security;

create or replace function public.is_admin_or_moderator()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role in ('admin', 'moderator')
  );
$$;

-- Public read policies for public proof pages.
create policy "profiles are public" on public.profiles for select using (true);
create policy "live challenges are public" on public.challenges for select using (status <> 'draft');
create policy "proof events are public" on public.proof_events for select using (true);
create policy "public entries visible" on public.challenge_entries for select using (true);
create policy "public game verifications visible" on public.game_verifications for select using (true);

-- Users manage their own profile basics; admins/moderators manage verification.
create policy "users insert own profile" on public.profiles for insert with check (auth.uid() = id);
-- Do not let normal users update role/identity_status directly from the browser.
-- In production, update basic profile fields through a safe RPC/Edge Function or column-level grants.
create policy "admins update profiles" on public.profiles for update using (public.is_admin_or_moderator()) with check (public.is_admin_or_moderator());

-- Social and payout accounts are private to owner and admins.
create policy "users read own socials" on public.social_accounts for select using (auth.uid() = user_id or public.is_admin_or_moderator());
create policy "users insert own socials" on public.social_accounts for insert with check (auth.uid() = user_id);
create policy "users update own socials" on public.social_accounts for update using (auth.uid() = user_id or public.is_admin_or_moderator()) with check (auth.uid() = user_id or public.is_admin_or_moderator());

create policy "users read own payout accounts" on public.payout_accounts for select using (auth.uid() = user_id or public.is_admin_or_moderator());
create policy "users insert own payout accounts" on public.payout_accounts for insert with check (auth.uid() = user_id);
create policy "users update own payout accounts" on public.payout_accounts for update using (auth.uid() = user_id or public.is_admin_or_moderator()) with check (auth.uid() = user_id or public.is_admin_or_moderator());

-- Creators can manage their own challenges; admins/moderators can manage all.
create policy "creators insert challenges" on public.challenges for insert with check (auth.uid() = creator_id);
create policy "creators update own challenges" on public.challenges for update using (auth.uid() = creator_id or public.is_admin_or_moderator()) with check (auth.uid() = creator_id or public.is_admin_or_moderator());

-- Authenticated users can submit entries.
create policy "authenticated users submit entries" on public.challenge_entries for insert with check (auth.role() = 'authenticated');
create policy "users update own entries before judging" on public.challenge_entries for update using (auth.uid() = user_id or public.is_admin_or_moderator()) with check (auth.uid() = user_id or public.is_admin_or_moderator());

-- Hidden code hashes are never public before resolution.
create policy "creator or admin reads hidden code hashes" on public.hidden_codes for select using (
  public.is_admin_or_moderator() or exists (select 1 from public.challenges c where c.id = hidden_codes.challenge_id and c.creator_id = auth.uid())
);
create policy "creator writes hidden code hashes" on public.hidden_codes for insert with check (
  exists (select 1 from public.challenges c where c.id = hidden_codes.challenge_id and c.creator_id = auth.uid()) or public.is_admin_or_moderator()
);

-- Payout rows are readable by challenge owner, recipient, or admins.
create policy "payout owner recipient admin reads" on public.payouts for select using (
  auth.uid() = recipient_user_id or public.is_admin_or_moderator() or exists (select 1 from public.challenges c where c.id = payouts.challenge_id and c.creator_id = auth.uid())
);

-- Verification requests.
create policy "users create own verification requests" on public.verification_requests for insert with check (auth.uid() = user_id);
create policy "users read own verification requests" on public.verification_requests for select using (auth.uid() = user_id or public.is_admin_or_moderator());
create policy "admins update verification requests" on public.verification_requests for update using (public.is_admin_or_moderator()) with check (public.is_admin_or_moderator());

-- Support and disputes.
create policy "authenticated users open disputes" on public.disputes for insert with check (auth.role() = 'authenticated');
create policy "disputes are public" on public.disputes for select using (true);
create policy "admins update disputes" on public.disputes for update using (public.is_admin_or_moderator()) with check (public.is_admin_or_moderator());

create policy "users create support tickets" on public.support_tickets for insert with check (auth.uid() = user_id);
create policy "users read own support tickets" on public.support_tickets for select using (auth.uid() = user_id or public.is_admin_or_moderator());
create policy "admins update support tickets" on public.support_tickets for update using (public.is_admin_or_moderator()) with check (public.is_admin_or_moderator());

-- Messaging: members read/send inside their own conversations; admins can see verification/support/dispute rooms.
create policy "members read conversations" on public.conversations for select using (
  public.is_admin_or_moderator() or exists (select 1 from public.conversation_members cm where cm.conversation_id = conversations.id and cm.user_id = auth.uid())
);
create policy "authenticated users create conversations" on public.conversations for insert with check (auth.role() = 'authenticated');

create policy "members read membership" on public.conversation_members for select using (auth.uid() = user_id or public.is_admin_or_moderator());
create policy "users join created conversation" on public.conversation_members for insert with check (auth.uid() = user_id or public.is_admin_or_moderator());

create policy "members read messages" on public.messages for select using (
  public.is_admin_or_moderator() or exists (select 1 from public.conversation_members cm where cm.conversation_id = messages.conversation_id and cm.user_id = auth.uid())
);
create policy "members send messages" on public.messages for insert with check (
  auth.uid() = sender_id and exists (select 1 from public.conversation_members cm where cm.conversation_id = messages.conversation_id and cm.user_id = auth.uid())
);
