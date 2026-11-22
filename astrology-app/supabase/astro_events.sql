-- Akhtarnameh visitor log for the Grow Me Supabase project.
-- Visitors (anon or signed in) can only INSERT their own consented events; nobody can read them
-- through the API except admins, via admin_astro_events() (checked with public.studio_is_admin()).

create table if not exists public.astro_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor uuid not null,
  kind text not null check (kind in ('visit','consent','natal','partner','horary','chat','ask','view','trade','elect','world','lang','money')),
  lang text check (lang is null or char_length(lang) <= 8),
  data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object' and pg_column_size(data) <= 16000)
);
create index if not exists astro_events_created_idx on public.astro_events (created_at desc);
create index if not exists astro_events_visitor_idx on public.astro_events (visitor);

alter table public.astro_events enable row level security;
drop policy if exists "astrology app can add events" on public.astro_events;
create policy "astrology app can add events" on public.astro_events
  for insert to anon, authenticated with check (true);
revoke select, update, delete on public.astro_events from anon, authenticated;

create or replace function public.admin_astro_events(p_limit integer default 5000)
returns setof public.astro_events
language plpgsql stable security definer set search_path to ''
as $$
begin
  if not public.studio_is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return query select * from public.astro_events e order by e.created_at desc limit least(greatest(p_limit, 1), 20000);
end $$;

create or replace function public.admin_astro_delete_visitor(p_visitor uuid)
returns integer
language plpgsql security definer set search_path to ''
as $$
declare n integer;
begin
  if not public.studio_is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  delete from public.astro_events where visitor = p_visitor;
  get diagnostics n = row_count;
  return n;
end $$;

revoke all on function public.admin_astro_events(integer) from public, anon;
revoke all on function public.admin_astro_delete_visitor(uuid) from public, anon;
grant execute on function public.admin_astro_events(integer) to authenticated;
grant execute on function public.admin_astro_delete_visitor(uuid) to authenticated;
