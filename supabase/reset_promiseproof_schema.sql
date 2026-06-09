-- PromiseProof reset script for a NEW/TEST Supabase project.
-- WARNING: This deletes all PromiseProof tables/data, policies, functions, and enum types.
-- Use this only when you are setting up the project and you do not need the existing data.

begin;

-- Drop app tables first because enum types are used by these tables.
drop table if exists public.messages cascade;
drop table if exists public.conversation_members cascade;
drop table if exists public.conversations cascade;
drop table if exists public.support_tickets cascade;
drop table if exists public.disputes cascade;
drop table if exists public.verification_requests cascade;
drop table if exists public.controlled_match_rooms cascade;
drop table if exists public.game_verifications cascade;
drop table if exists public.payouts cascade;
drop table if exists public.proof_events cascade;
drop table if exists public.challenge_entries cascade;
drop table if exists public.hidden_codes cascade;
drop table if exists public.challenges cascade;
drop table if exists public.payout_accounts cascade;
drop table if exists public.social_accounts cascade;
drop table if exists public.profiles cascade;

-- Drop helper functions.
drop function if exists public.is_admin_or_moderator() cascade;

-- Drop enum types so the main schema can be run again cleanly.
drop type if exists public.conversation_type cascade;
drop type if exists public.ticket_status cascade;
drop type if exists public.verification_request_status cascade;
drop type if exists public.proof_event_type cascade;
drop type if exists public.payout_status cascade;
drop type if exists public.verification_mode cascade;
drop type if exists public.challenge_type cascade;
drop type if exists public.challenge_status cascade;
drop type if exists public.payout_method_status cascade;
drop type if exists public.social_status cascade;
drop type if exists public.identity_status cascade;
drop type if exists public.user_role cascade;

commit;
