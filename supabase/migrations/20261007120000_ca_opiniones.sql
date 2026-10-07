-- Opiniones de las personas con cuenta: ideas, errores y lo que quieran contarnos.
-- Aditiva: una tabla nueva, su función de tope y sus policies. No toca nada existente.

create table if not exists public.ca_opiniones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  tipo text not null check (tipo in ('idea', 'error', 'otra')),
  mensaje text not null check (char_length(btrim(mensaje)) between 5 and 2000),
  desde text check (desde is null or (char_length(desde) between 1 and 120 and desde ~ '^/' and desde !~ '^/[/\\]')),
  estado text not null default 'nueva' check (estado in ('nueva', 'leida', 'resuelta')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists ca_opiniones_user_idx on public.ca_opiniones (user_id, created_at desc);
create index if not exists ca_opiniones_estado_idx on public.ca_opiniones (estado, created_at desc);

alter table public.ca_opiniones enable row level security;
alter table public.ca_opiniones force row level security;

-- La persona escribe sólo tipo, mensaje y desde: user_id sale de auth.uid() y el estado lo maneja
-- el panel con service role. Sin update ni delete para authenticated.
revoke all on table public.ca_opiniones from public, anon, authenticated;
grant select, insert, update, delete on table public.ca_opiniones to service_role;
grant select on table public.ca_opiniones to authenticated;
grant insert (tipo, mensaje, desde) on table public.ca_opiniones to authenticated;

drop policy if exists ca_opiniones_select_propio on public.ca_opiniones;
create policy ca_opiniones_select_propio on public.ca_opiniones
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists ca_opiniones_insert_propio on public.ca_opiniones;
create policy ca_opiniones_insert_propio on public.ca_opiniones
  for insert to authenticated
  with check ((select auth.uid()) = user_id and estado = 'nueva');

drop trigger if exists ca_opiniones_updated_at on public.ca_opiniones;
create trigger ca_opiniones_updated_at before update on public.ca_opiniones
  for each row execute function public.ca_tocar_updated_at();

create or replace function public.ca_opiniones_tope()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  -- Serializa por usuario: sin el lock, dos envíos simultáneos pasan los dos el conteo 9.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('ca_opiniones:' || new.user_id::text, 0));
  if (
    select count(*) from public.ca_opiniones o
    where o.user_id = new.user_id and o.created_at > now() - interval '1 day'
  ) >= 10 then
    raise exception 'ca_opiniones_tope: ya hay 10 opiniones de esta cuenta en las últimas 24 horas'
      using errcode = 'P0001', hint = 'Probá de nuevo mañana.';
  end if;
  new.mensaje := btrim(new.mensaje);
  return new;
end;
$$;

drop trigger if exists ca_opiniones_tope on public.ca_opiniones;
create trigger ca_opiniones_tope before insert on public.ca_opiniones
  for each row execute function public.ca_opiniones_tope();

revoke execute on function public.ca_opiniones_tope() from public, anon, authenticated;
