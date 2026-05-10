-- Profile Architect Database Schema
-- Run this in your Supabase SQL editor

-- Enable RLS
alter database postgres set "app.jwt_secret" to 'your-jwt-secret';

-- ─── User Profiles ──────────────────────────────────────────────────────────
create table if not exists public.user_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  onboarding_completed boolean default false,
  onboarding_data jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_profiles enable row level security;

create policy "Users can view own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

-- ─── Profile Analyses ───────────────────────────────────────────────────────
create table if not exists public.profile_analyses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  profile_text text,
  scores jsonb not null,
  feedback jsonb not null default '[]',
  archetype text,
  estimated_match_quality text,
  estimated_response_rate text,
  demographic_appeal text,
  top_improvement text,
  created_at timestamptz default now()
);

alter table public.profile_analyses enable row level security;

create policy "Users can view own analyses"
  on public.profile_analyses for select
  using (auth.uid() = user_id);

create policy "Users can insert own analyses"
  on public.profile_analyses for insert
  with check (auth.uid() = user_id);

-- ─── Profile Prompts ─────────────────────────────────────────────────────────
create table if not exists public.profile_prompts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null check (platform in ('hinge', 'bumble', 'tinder')),
  question text not null,
  answer text not null,
  score integer,
  tone text,
  strengths jsonb default '[]',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profile_prompts enable row level security;

create policy "Users can manage own prompts"
  on public.profile_prompts for all
  using (auth.uid() = user_id);

-- ─── Generated Photos ────────────────────────────────────────────────────────
create table if not exists public.generated_photos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  url text,
  category text not null,
  predicted_score integer,
  psychological_reason text,
  slot_recommendation text,
  rank_in_sequence integer,
  platform text default 'all',
  created_at timestamptz default now()
);

alter table public.generated_photos enable row level security;

create policy "Users can manage own photos"
  on public.generated_photos for all
  using (auth.uid() = user_id);

-- ─── Storage bucket for photo uploads ────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('profile-photos', 'profile-photos', false)
on conflict do nothing;

create policy "Users can upload own photos"
  on storage.objects for insert
  with check (bucket_id = 'profile-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view own photos"
  on storage.objects for select
  using (bucket_id = 'profile-photos' and auth.uid()::text = (storage.foldername(name))[1]);

-- ─── Auto-create user profile on signup ─────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Updated_at trigger ──────────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_updated_at
  before update on public.user_profiles
  for each row execute procedure public.handle_updated_at();
