-- Paid course access + free access codes for Grow Me.
-- Run once in Supabase: Dashboard → SQL Editor → paste this file → Run.
-- Safe to run again.

-- Who can watch the full course. Students can read only their own row.
-- Rows are written by the server (Stripe payments) or by redeem_access_code().
create table if not exists public.course_access (
  user_id     uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  source      text not null check (source in ('stripe', 'paypal', 'code', 'manual')),
  reference   text,            -- Stripe session id, PayPal order id, or the access code used
  granted_at  timestamptz not null default now(),
  primary key (user_id, course_slug)
);
alter table public.course_access enable row level security;
drop policy if exists "Students read own course access" on public.course_access;
create policy "Students read own course access" on public.course_access
  for select to authenticated using (auth.uid() = user_id);

-- Free access codes. No policies: invisible to visitors, managed in the Supabase dashboard.
create table if not exists public.access_codes (
  code        text primary key check (code = upper(code)),
  course_slug text not null default 'instagram-growth',
  max_uses    integer check (max_uses is null or max_uses > 0),  -- null = unlimited
  used_count  integer not null default 0,
  expires_at  timestamptz,                                         -- null = never expires
  active      boolean not null default true,
  note        text,                                                -- e.g. who you gave it to
  created_at  timestamptz not null default now()
);
alter table public.access_codes enable row level security;

create table if not exists public.access_code_redemptions (
  code        text not null references public.access_codes(code) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  primary key (code, user_id)
);
alter table public.access_code_redemptions enable row level security;

-- Called by a signed-in student. Returns: ok | already | invalid | expired | used_up | not_signed_in
create or replace function public.redeem_access_code(p_code text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_code text := upper(btrim(coalesce(p_code, '')));
  v_row  public.access_codes%rowtype;
begin
  if v_user is null then
    return 'not_signed_in';
  end if;

  select * into v_row from public.access_codes where code = v_code for update;
  if not found or not v_row.active then
    return 'invalid';
  end if;
  if v_row.expires_at is not null and v_row.expires_at < now() then
    return 'expired';
  end if;
  if exists (select 1 from public.course_access
             where user_id = v_user and course_slug = v_row.course_slug) then
    return 'already';
  end if;
  if v_row.max_uses is not null and v_row.used_count >= v_row.max_uses then
    return 'used_up';
  end if;

  insert into public.access_code_redemptions (code, user_id) values (v_code, v_user)
    on conflict do nothing;
  update public.access_codes set used_count = used_count + 1 where code = v_code;
  insert into public.course_access (user_id, course_slug, source, reference)
    values (v_user, v_row.course_slug, 'code', v_code)
    on conflict do nothing;
  return 'ok';
end;
$$;

revoke all on function public.redeem_access_code(text) from public, anon;
grant execute on function public.redeem_access_code(text) to authenticated;

-- Free code: anyone who enters SADHGURU unlocks the full course (no use limit, no expiry).
insert into public.access_codes (code, max_uses, note)
values ('SADHGURU', null, 'Free access for content creators and fan-page admins')
on conflict (code) do nothing;

-- More examples (edit or delete before running):
-- insert into public.access_codes (code, max_uses, note) values
--   ('GROWTEAM2026', 50, 'Content creators and fan-page admins'),
--   ('FANPAGE-FRIENDS', 20, 'Fan page group');
