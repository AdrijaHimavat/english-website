-- Grow Me Studio access from Gumroad purchases.
-- Gumroad "Ping" posts each sale to /api/gumroad/ping?key=..., which calls public.gumroad_ping.
-- The key is stored in Supabase Vault under the name 'gumroad_webhook' (created separately, never in git).

create table if not exists public.gumroad_sales (
  sale_id text primary key,
  email text not null,
  user_id uuid references auth.users(id) on delete set null,
  product_id text,
  product_permalink text,
  subscription_id text,
  recurrence text,
  price_cents integer,
  is_recurring boolean not null default false,
  days integer not null,
  applied_at timestamptz,
  refunded_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.gumroad_sales enable row level security;
-- No policies: only the security-definer functions below read or write this table.
create index if not exists gumroad_sales_pending_email on public.gumroad_sales (lower(email)) where applied_at is null;

-- Days of Studio access one charge buys (period + 3 days' grace for late renewals); $0 sales (free trial) give 7 days.
create or replace function public.gumroad_days(p_recurrence text, p_price_cents integer)
returns integer language sql immutable set search_path = '' as $$
  select case when coalesce(p_price_cents, 0) <= 0 then 7
    else 3 + case lower(coalesce(p_recurrence, ''))
      when 'monthly' then 31 when 'quarterly' then 92 when 'biannually' then 183
      when 'yearly' then 366 when 'every_two_years' then 731 else 31 end
  end;
$$;

-- Access runs until at least (from + days). Renewals don't stack grace days, and existing longer access is kept.
create or replace function public.gumroad_grant(p_user uuid, p_from timestamptz, p_days integer, p_plan text)
returns timestamptz language plpgsql security definer set search_path = '' as $$
declare v_new timestamptz := greatest(p_from, now()) + make_interval(days => p_days);
begin
  insert into public.studio_subscriptions (user_id, plan, expires_at, last_code, updated_at)
    values (p_user, p_plan, v_new, null, now())
    on conflict (user_id) do update
      set expires_at = greatest(public.studio_subscriptions.expires_at, excluded.expires_at),
          plan = excluded.plan, updated_at = now();
  return v_new;
end $$;

create or replace function public.gumroad_ping(
  p_key text, p_sale_id text, p_email text, p_user_hint uuid,
  p_product_id text, p_product_permalink text, p_subscription_id text,
  p_recurrence text, p_price_cents integer, p_is_recurring boolean, p_refunded boolean
) returns text language plpgsql security definer set search_path = '' as $$
declare
  v_secret text;
  v_email text := lower(trim(coalesce(p_email, '')));
  v_sale public.gumroad_sales%rowtype;
  v_user uuid;
  v_days integer := public.gumroad_days(p_recurrence, p_price_cents);
  v_plan text := 'Gumroad' || coalesce(' · ' || nullif(lower(p_recurrence), ''), '');
begin
  select decrypted_secret into v_secret from vault.decrypted_secrets where name = 'gumroad_webhook' limit 1;
  if v_secret is null or p_key is null or p_key <> v_secret then raise exception 'not allowed' using errcode = '42501'; end if;
  if coalesce(p_sale_id, '') = '' or length(p_sale_id) > 200 or v_email !~ '^[^ @]+@[^ @]+$' then raise exception 'bad payload'; end if;

  select * into v_sale from public.gumroad_sales where sale_id = p_sale_id for update;
  if found then
    if coalesce(p_refunded, false) and v_sale.refunded_at is null then
      update public.gumroad_sales set refunded_at = now() where sale_id = p_sale_id;
      if v_sale.applied_at is not null and v_sale.user_id is not null then
        update public.studio_subscriptions
          set expires_at = greatest(now(), expires_at - make_interval(days => v_sale.days)), updated_at = now()
          where user_id = v_sale.user_id;
      end if;
      return 'refunded';
    end if;
    return 'duplicate';
  end if;

  if p_user_hint is not null then select u.id into v_user from auth.users u where u.id = p_user_hint; end if;
  if v_user is null then
    select u.id into v_user from auth.users u
      where lower(u.email) = v_email and u.email_confirmed_at is not null
      order by u.created_at limit 1;
  end if;

  insert into public.gumroad_sales (sale_id, email, user_id, product_id, product_permalink, subscription_id,
      recurrence, price_cents, is_recurring, days, applied_at, refunded_at)
    values (p_sale_id, v_email, v_user, left(p_product_id, 200), left(p_product_permalink, 200), left(p_subscription_id, 200),
      left(lower(p_recurrence), 40), p_price_cents, coalesce(p_is_recurring, false), v_days,
      case when v_user is not null and not coalesce(p_refunded, false) then now() end,
      case when coalesce(p_refunded, false) then now() end);

  if coalesce(p_refunded, false) then return 'refunded'; end if;
  if v_user is null then return 'pending'; end if;
  perform public.gumroad_grant(v_user, now(), v_days, v_plan);
  return 'granted';
end $$;

-- When someone confirms an account whose email bought on Gumroad earlier, give them what they paid for.
create or replace function public.gumroad_claim_on_confirm()
returns trigger language plpgsql security definer set search_path = '' as $$
declare r record;
begin
  if new.email_confirmed_at is null or new.email is null then return new; end if;
  if tg_op = 'UPDATE' and old.email_confirmed_at is not null and old.email is not distinct from new.email then return new; end if;
  begin
    for r in select s.sale_id, s.days, s.created_at, s.recurrence from public.gumroad_sales s
        where s.applied_at is null and s.refunded_at is null and lower(s.email) = lower(new.email)
        order by s.created_at for update loop
      perform public.gumroad_grant(new.id, r.created_at, r.days, 'Gumroad' || coalesce(' · ' || nullif(r.recurrence, ''), ''));
      update public.gumroad_sales set user_id = new.id, applied_at = now() where sale_id = r.sale_id;
    end loop;
  exception when others then
    raise warning 'gumroad claim failed for %: %', new.id, sqlerrm; -- never block sign-up
  end;
  return new;
end $$;

drop trigger if exists gumroad_claim on auth.users;
create trigger gumroad_claim after insert or update of email_confirmed_at, email on auth.users
  for each row execute function public.gumroad_claim_on_confirm();

-- Admin view of Gumroad sales (for "I paid but have no access" support).
create or replace function public.admin_gumroad_sales()
returns table(sale_id text, email text, user_email text, recurrence text, price_cents integer, is_recurring boolean,
  applied_at timestamptz, refunded_at timestamptz, created_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.studio_is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return query select s.sale_id, s.email, u.email::text, s.recurrence, s.price_cents, s.is_recurring,
      s.applied_at, s.refunded_at, s.created_at
    from public.gumroad_sales s left join auth.users u on u.id = s.user_id
    order by s.created_at desc limit 500;
end $$;

revoke all on function public.gumroad_grant(uuid, timestamptz, integer, text) from public, anon, authenticated;
revoke all on function public.gumroad_claim_on_confirm() from public, anon, authenticated;
revoke all on function public.gumroad_days(text, integer) from public, anon, authenticated;
revoke all on function public.gumroad_ping(text, text, text, uuid, text, text, text, text, integer, boolean, boolean) from public, authenticated;
grant execute on function public.gumroad_ping(text, text, text, uuid, text, text, text, text, integer, boolean, boolean) to anon;
revoke all on function public.admin_gumroad_sales() from public, anon;
grant execute on function public.admin_gumroad_sales() to authenticated;
