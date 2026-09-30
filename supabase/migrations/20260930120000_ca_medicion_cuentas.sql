-- calcular.ar · medición propia, cuentas y compras (s124).
-- Re-ejecutable: if not exists / create or replace / drop ... if exists. Las constraints viven
-- dentro de create table, así que cambiarlas más adelante va en una migración nueva.

do $$
begin
  -- Las funciones security definer leen tablas con FORCE RLS: si el dueño no bypassea RLS,
  -- ca_vincular_compras no ve ninguna fila y falla en silencio. Mejor cortar acá.
  if not exists (select 1 from pg_roles where rolname = current_user and (rolsuper or rolbypassrls)) then
    raise exception 'ca_medicion_cuentas: el rol % necesita BYPASSRLS para ser dueño de estas funciones', current_user;
  end if;
end $$;

create table if not exists public.ca_vistas (
  id uuid primary key,
  ts timestamptz not null default now(),
  vid uuid not null,
  sid uuid not null,
  path text not null check (char_length(path) between 1 and 120 and left(path, 1) = '/' and path !~ '[?#]'),
  ref_host text check (char_length(ref_host) <= 255),
  utm_source text check (char_length(utm_source) <= 100),
  utm_medium text check (char_length(utm_medium) <= 100),
  utm_campaign text check (char_length(utm_campaign) <= 150),
  dispositivo text check (dispositivo in ('movil', 'tablet', 'escritorio')),
  pais text check (pais ~ '^[A-Z]{2}$'),
  activo_ms integer not null default 0 check (activo_ms between 0 and 14400000),
  interacciones integer not null default 0 check (interacciones >= 0),
  scroll_pct smallint not null default 0 check (scroll_pct between 0 and 100),
  uso_calc boolean not null default false,
  user_id uuid references auth.users (id) on delete set null,
  cerrada_at timestamptz
);
-- Cada vista se actualiza al cerrarse: el hueco del fillfactor deja que esas updates sean HOT
-- (misma página), lo que mantiene el orden físico por ts del que depende el índice BRIN.
alter table public.ca_vistas set (fillfactor = 85);
create index if not exists ca_vistas_ts_brin on public.ca_vistas using brin (ts) with (pages_per_range = 32);
create index if not exists ca_vistas_user_idx on public.ca_vistas (user_id) where user_id is not null;

create table if not exists public.ca_eventos (
  id bigint generated always as identity primary key,
  ts timestamptz not null default now(),
  vid uuid,
  sid uuid,
  vista_id uuid,
  tipo text not null constraint ca_eventos_tipo_check check (tipo in (
    'vista_oferta', 'cta_compra', 'dialogo_compra', 'checkout', 'compartir', 'copiar_resultado',
    'guardar_calculo', 'imprimir', 'suscripcion', 'busqueda', 'registro', 'login', 'descarga', 'error'
  )),
  path text check (char_length(path) <= 120),
  producto text check (char_length(producto) <= 60),
  valor numeric(14, 2),
  props jsonb check (props is null or (jsonb_typeof(props) = 'object' and octet_length(props::text) <= 2048)),
  user_id uuid references auth.users (id) on delete set null
);
create index if not exists ca_eventos_tipo_ts_idx on public.ca_eventos (tipo, ts);
create index if not exists ca_eventos_ts_brin on public.ca_eventos using brin (ts) with (pages_per_range = 32);
create index if not exists ca_eventos_user_idx on public.ca_eventos (user_id) where user_id is not null;

create table if not exists public.ca_checkouts (
  id uuid primary key,
  ts timestamptz not null default now(),
  producto text not null check (char_length(producto) between 1 and 60),
  email text check (char_length(email) <= 254),
  vid uuid,
  user_id uuid references auth.users (id) on delete set null,
  desde text check (char_length(desde) <= 120),
  pagina text check (char_length(pagina) <= 120),
  estado text not null default 'iniciado' check (estado in ('iniciado', 'pendiente', 'pagado', 'rechazado', 'reembolsado')),
  mp_payment_id text check (char_length(mp_payment_id) <= 40),
  monto numeric(12, 2) check (monto >= 0),
  fuente text check (char_length(fuente) <= 40),
  updated_at timestamptz not null default now()
);
alter table public.ca_checkouts add column if not exists fuente text check (char_length(fuente) <= 40);
alter table public.ca_checkouts add column if not exists pagina text check (char_length(pagina) <= 120);
create index if not exists ca_checkouts_ts_idx on public.ca_checkouts (ts);
create index if not exists ca_checkouts_vid_idx on public.ca_checkouts (vid) where vid is not null;
create index if not exists ca_checkouts_user_idx on public.ca_checkouts (user_id) where user_id is not null;

-- Sin FK a ca_checkouts a propósito: un pago de una preferencia creada antes de esta tabla
-- tiene que poder asentarse igual (perder una venta es peor que un checkout_id huérfano).
create table if not exists public.ca_compras (
  id bigint generated always as identity primary key,
  mp_payment_id text not null unique check (char_length(mp_payment_id) between 1 and 40),
  producto text not null check (char_length(producto) between 1 and 60),
  email text check (char_length(email) <= 254),
  user_id uuid references auth.users (id) on delete set null,
  monto numeric(12, 2) not null check (monto >= 0),
  moneda text not null default 'ARS' check (moneda ~ '^[A-Z]{3}$'),
  estado text not null default 'aprobado' check (estado in ('aprobado', 'reembolsado', 'contracargo')),
  legado boolean not null default false,
  checkout_id uuid,
  pagado_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists ca_compras_pagado_idx on public.ca_compras (pagado_at);
create index if not exists ca_compras_user_idx on public.ca_compras (user_id) where user_id is not null;
create index if not exists ca_compras_email_sin_cuenta_idx on public.ca_compras (email) where user_id is null;
create index if not exists ca_compras_checkout_idx on public.ca_compras (checkout_id) where checkout_id is not null;

create table if not exists public.ca_perfiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null check (char_length(email) between 3 and 254),
  nombre text check (char_length(nombre) <= 80),
  perfil text check (perfil in ('empleado', 'empleador', 'contador', 'monotributista', 'estudio', 'otro')),
  novedades boolean not null default false,
  verificado_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- Un buzón probado = una cuenta: así una compra nunca puede vincularse a dos personas.
create unique index if not exists ca_perfiles_email_verificado_uq on public.ca_perfiles (email) where verificado_at is not null;

create table if not exists public.ca_calculos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  path text not null check (char_length(path) between 1 and 120 and left(path, 1) = '/'),
  titulo text not null check (char_length(titulo) between 1 and 80),
  campos jsonb not null check (jsonb_typeof(campos) = 'object' and octet_length(campos::text) <= 8192),
  resumen text check (char_length(resumen) <= 200),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists ca_calculos_user_idx on public.ca_calculos (user_id, created_at desc);

create table if not exists public.ca_limites (
  clave text not null check (char_length(clave) <= 200),
  ventana timestamptz not null,
  vence timestamptz not null,
  n integer not null default 1,
  primary key (clave, ventana)
);

-- Una ruta que empieza con // o /\ el navegador la toma como otro sitio, y el panel usa estas
-- rutas como enlaces: no pueden entrar.
alter table public.ca_vistas drop constraint if exists ca_vistas_path_segura;
alter table public.ca_vistas add constraint ca_vistas_path_segura check (path ~ '^/' and path !~ '^/[/\\]');
alter table public.ca_eventos drop constraint if exists ca_eventos_path_segura;
alter table public.ca_eventos add constraint ca_eventos_path_segura check (path is null or (path ~ '^/' and path !~ '^/[/\\]'));
alter table public.ca_calculos drop constraint if exists ca_calculos_path_segura;
alter table public.ca_calculos add constraint ca_calculos_path_segura check (path ~ '^/' and path !~ '^/[/\\]');
alter table public.ca_checkouts drop constraint if exists ca_checkouts_desde_segura;
alter table public.ca_checkouts add constraint ca_checkouts_desde_segura check (desde is null or (desde ~ '^/' and desde !~ '^/[/\\]'));
alter table public.ca_checkouts drop constraint if exists ca_checkouts_pagina_segura;
alter table public.ca_checkouts add constraint ca_checkouts_pagina_segura check (pagina is null or (pagina ~ '^/' and pagina !~ '^/[/\\]'));

alter table public.ca_vistas enable row level security;
alter table public.ca_vistas force row level security;
alter table public.ca_eventos enable row level security;
alter table public.ca_eventos force row level security;
alter table public.ca_checkouts enable row level security;
alter table public.ca_checkouts force row level security;
alter table public.ca_compras enable row level security;
alter table public.ca_compras force row level security;
alter table public.ca_perfiles enable row level security;
alter table public.ca_perfiles force row level security;
alter table public.ca_calculos enable row level security;
alter table public.ca_calculos force row level security;
alter table public.ca_limites enable row level security;
alter table public.ca_limites force row level security;

-- Supabase deja de dar grants por defecto en public desde el 30/10/2026: todo explícito.
revoke all on table
  public.ca_vistas, public.ca_eventos, public.ca_checkouts, public.ca_compras,
  public.ca_perfiles, public.ca_calculos, public.ca_limites
from public, anon, authenticated;
grant select, insert, update, delete on table
  public.ca_vistas, public.ca_eventos, public.ca_checkouts, public.ca_compras,
  public.ca_perfiles, public.ca_calculos, public.ca_limites
to service_role;
revoke all on sequence public.ca_eventos_id_seq, public.ca_compras_id_seq from public, anon, authenticated;
grant usage, select on sequence public.ca_eventos_id_seq, public.ca_compras_id_seq to service_role;

grant select on table public.ca_compras to authenticated;
grant select on table public.ca_perfiles to authenticated;
grant update (nombre, perfil, novedades) on table public.ca_perfiles to authenticated;
grant select, delete on table public.ca_calculos to authenticated;
grant insert (id, user_id, path, titulo, campos, resumen) on table public.ca_calculos to authenticated;
grant update (path, titulo, campos, resumen) on table public.ca_calculos to authenticated;

drop policy if exists ca_compras_select_propio on public.ca_compras;
create policy ca_compras_select_propio on public.ca_compras
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists ca_perfiles_select_propio on public.ca_perfiles;
create policy ca_perfiles_select_propio on public.ca_perfiles
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists ca_perfiles_update_propio on public.ca_perfiles;
create policy ca_perfiles_update_propio on public.ca_perfiles
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists ca_calculos_select_propio on public.ca_calculos;
create policy ca_calculos_select_propio on public.ca_calculos
  for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists ca_calculos_insert_propio on public.ca_calculos;
create policy ca_calculos_insert_propio on public.ca_calculos
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists ca_calculos_update_propio on public.ca_calculos;
create policy ca_calculos_update_propio on public.ca_calculos
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists ca_calculos_delete_propio on public.ca_calculos;
create policy ca_calculos_delete_propio on public.ca_calculos
  for delete to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.ca_tocar_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists ca_checkouts_updated_at on public.ca_checkouts;
create trigger ca_checkouts_updated_at before update on public.ca_checkouts
  for each row execute function public.ca_tocar_updated_at();
drop trigger if exists ca_compras_updated_at on public.ca_compras;
create trigger ca_compras_updated_at before update on public.ca_compras
  for each row execute function public.ca_tocar_updated_at();
drop trigger if exists ca_calculos_updated_at on public.ca_calculos;
create trigger ca_calculos_updated_at before update on public.ca_calculos
  for each row execute function public.ca_tocar_updated_at();

create or replace function public.ca_perfiles_normalizar()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.email := lower(btrim(new.email));
  new.updated_at := now();
  -- verificado_at prueba UN buzón: si el mail cambia sin re-verificar, la prueba ya no vale.
  if tg_op = 'UPDATE' and new.email is distinct from old.email
     and new.verificado_at is not distinct from old.verificado_at then
    new.verificado_at := null;
  end if;
  return new;
end;
$$;

drop trigger if exists ca_perfiles_normalizar on public.ca_perfiles;
create trigger ca_perfiles_normalizar before insert or update on public.ca_perfiles
  for each row execute function public.ca_perfiles_normalizar();

create or replace function public.ca_compras_asignar_usuario()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.email := nullif(lower(btrim(new.email)), '');
  if new.user_id is null and new.email is not null then
    select p.user_id into new.user_id
    from public.ca_perfiles p
    where p.email = new.email and p.verificado_at is not null;
  end if;
  return new;
end;
$$;

drop trigger if exists ca_compras_asignar_usuario on public.ca_compras;
create trigger ca_compras_asignar_usuario before insert or update of email on public.ca_compras
  for each row execute function public.ca_compras_asignar_usuario();

create or replace function public.ca_calculos_tope()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  -- Serializa por usuario: sin el lock, dos inserts simultáneos pasan los dos el conteo 199.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('ca_calculos:' || new.user_id::text, 0));
  if (select count(*) from public.ca_calculos c where c.user_id = new.user_id) >= 200 then
    raise exception 'ca_calculos_tope: ya hay 200 cálculos guardados en esta cuenta'
      using errcode = 'P0001', hint = 'Borrá alguno para guardar uno nuevo.';
  end if;
  return new;
end;
$$;

drop trigger if exists ca_calculos_tope on public.ca_calculos;
create trigger ca_calculos_tope before insert on public.ca_calculos
  for each row execute function public.ca_calculos_tope();

create or replace function public.ca_cerrar_vista(
  p_id uuid,
  p_activo_ms integer,
  p_interacciones integer,
  p_scroll integer,
  p_uso boolean
)
returns boolean
language plpgsql
set search_path = ''
as $$
begin
  update public.ca_vistas v set
    activo_ms = greatest(v.activo_ms, least(greatest(coalesce(p_activo_ms, 0), 0), 14400000)),
    interacciones = greatest(v.interacciones, least(greatest(coalesce(p_interacciones, 0), 0), 1000000)),
    scroll_pct = greatest(v.scroll_pct, least(greatest(coalesce(p_scroll, 0), 0), 100)::smallint),
    uso_calc = v.uso_calc or coalesce(p_uso, false),
    cerrada_at = now()
  where v.id = p_id
    and v.ts > now() - interval '1 day';
  return found;
end;
$$;

create or replace function public.ca_limite(p_clave text, p_max integer, p_ventana_seg integer)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  v_ventana timestamptz;
  v_n integer;
begin
  if p_clave is null or p_max is null or p_max < 0 or p_ventana_seg is null or p_ventana_seg < 1 then
    raise exception 'ca_limite: parámetros inválidos' using errcode = '22023';
  end if;
  v_ventana := to_timestamp(floor(extract(epoch from now()) / p_ventana_seg) * p_ventana_seg);
  -- Pasado el tope no se escribe más: bajo un ataque, cada pedido extra no genera otra versión de la fila.
  insert into public.ca_limites as l (clave, ventana, vence, n)
  values (left(p_clave, 200), v_ventana, v_ventana + make_interval(secs => p_ventana_seg), 1)
  on conflict (clave, ventana) do update set n = l.n + 1 where l.n <= p_max
  returning l.n into v_n;
  return v_n is not null and v_n <= p_max;
end;
$$;

create or replace function public.ca_vincular_compras()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_email text;
  v_n integer;
begin
  if v_uid is null then
    return 0;
  end if;
  -- El mail sale del perfil verificado (el buzón probado), nunca del JWT ni de auth.users.
  select p.email into v_email
  from public.ca_perfiles p
  where p.user_id = v_uid and p.verificado_at is not null;
  if v_email is null then
    return 0;
  end if;
  update public.ca_compras c set user_id = v_uid
  where c.email = lower(v_email) and c.user_id is null;
  get diagnostics v_n = row_count;
  return v_n;
end;
$$;

-- Para /auth/confirmar y backfills con service role, donde no hay auth.uid().
create or replace function public.ca_vincular_compras_de(p_user_id uuid)
returns integer
language plpgsql
set search_path = ''
as $$
declare
  v_email text;
  v_n integer;
begin
  select p.email into v_email
  from public.ca_perfiles p
  where p.user_id = p_user_id and p.verificado_at is not null;
  if v_email is null then
    return 0;
  end if;
  update public.ca_compras c set user_id = p_user_id
  where c.email = lower(v_email) and c.user_id is null;
  get diagnostics v_n = row_count;
  return v_n;
end;
$$;

create or replace function public.ca_fuente(p_ref_host text, p_utm_source text, p_utm_medium text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when e.m in ('email', 'e-mail', 'correo', 'newsletter') or e.s in ('recordatorio', 'newsletter', 'email', 'mail') then 'Email'
    when e.m in ('cpc', 'ppc', 'paid', 'paid_social', 'display') then 'Anuncios'
    when e.s ~ '^(whatsapp|wa)$' then 'WhatsApp'
    when e.m = 'share' then 'Compartido'
    when e.s is null and e.h is null then 'Directo'
    -- Navegar dentro del sitio o volver de pagar en Mercado Pago no es una fuente: null deja
    -- que decida otra vista de la sesión.
    when e.s is null and (
      e.h ~ '(^|\.)calcular\.ar$' or e.h ~ '\.vercel\.app$' or e.h in ('localhost', '127.0.0.1', 'mpago.la', 'mpago.li')
      or e.h ~ '(^|\.)(mercadopago|mercadolibre|mercadolivre)\.com(\.[a-z]{2})?$'
    ) then null
    when e.t ~ '(^|\.)(whatsapp(\.[a-z.]+)?|wa\.me|wl\.co|wa)$' then 'WhatsApp'
    when e.t ~ '^(mail\.google\.com|outlook\.(live|office)\.com|mail\.yahoo\.com)$' then 'Email'
    when e.t ~ '^(gemini|bard)(\.google\.com)?$' then 'Gemini'
    when e.t ~ '(^|\.)(chatgpt|openai)(\.|$)' then 'ChatGPT'
    when e.t ~ '(^|\.)perplexity(\.|$)' then 'Perplexity'
    when e.t ~ '(^|\.)claude(\.ai)?$' then 'Claude'
    when e.t ~ '^copilot(\.microsoft\.com)?$' then 'Copilot'
    when e.t ~ '(^|\.)google(\.[a-z.]+)?$' or e.t ~ '^com\.google\.android' then 'Google'
    when e.t ~ '(^|\.)bing(\.com)?$' then 'Bing'
    when e.t ~ '(^|\.)(duckduckgo|yahoo|ecosia|yandex)(\.[a-z.]+)?$' or e.t = 'search.brave.com' then 'Otros buscadores'
    when e.t ~ '(^|\.)(facebook|fb|messenger)(\.[a-z.]+)?$' then 'Facebook'
    when e.t ~ '(^|\.)(instagram|ig)(\.com)?$' then 'Instagram'
    when e.t ~ '^(t\.co|x\.com|x|twitter(\.com)?)$' then 'X'
    when e.t ~ '(^|\.)(linkedin(\.com)?|lnkd\.in)$' then 'LinkedIn'
    when e.t ~ '(^|\.)(youtube(\.com)?|youtu\.be)$' then 'YouTube'
    when e.t ~ '(^|\.)tiktok(\.com)?$' then 'TikTok'
    when e.t ~ '(^|\.)reddit(\.com)?$' then 'Reddit'
    when e.t ~ '^(t\.me|telegram(\.org)?|web\.telegram\.org)$' then 'Telegram'
    else 'Otros sitios'
  end
  from (
    select x.h, x.s, x.m, coalesce(x.s, x.h) as t
    from (
      select
        nullif(regexp_replace(lower(btrim(coalesce(p_ref_host, ''))), '^(www|m|l|lm)\.', ''), '') as h,
        nullif(lower(btrim(coalesce(p_utm_source, ''))), '') as s,
        nullif(lower(btrim(coalesce(p_utm_medium, ''))), '') as m
    ) x
  ) e;
$$;

-- Qué página vendió: la última donde el visitante vio la oferta o tocó un botón de compra
-- antes de pagar; si no hay, la ruta donde abrió la compra. ca_resumir la recalcula al cerrar
-- el día, por si algún evento llegó después que el checkout.
create or replace function public.ca_pagina_de_checkout(p_vid uuid, p_ts timestamptz, p_desde text)
returns text
language sql
stable
set search_path = ''
set plan_cache_mode = force_custom_plan
as $$
  select coalesce((
    select e.path
    from public.ca_eventos e
    where p_vid is not null and e.vid = p_vid
      and e.tipo in ('cta_compra', 'vista_oferta') and e.path is not null
      and e.ts >= p_ts - interval '24 hours' and e.ts <= p_ts + interval '1 minute'
    order by e.ts desc
    limit 1
  ), p_desde);
$$;

-- La fuente se fija al crear el checkout, con la sesión del visitante en ese momento: después
-- las vistas se resumen por día y ya no se puede saber de dónde vino cada uno.
create or replace function public.ca_checkouts_atribuir()
returns trigger
language plpgsql
set search_path = ''
set plan_cache_mode = force_custom_plan
as $$
declare
  v_sid uuid;
  v_desde text;
begin
  -- Tolera el formato viejo de la referencia de MP ("convenios/comercio", "calcular.ar/x"); una
  -- ruta que apunte a otro sitio se descarta en vez de romper el insert.
  v_desde := nullif(regexp_replace(regexp_replace(btrim(coalesce(new.desde, '')), '^(https?://)?((www\.)?calcular\.ar(?=/|$))?', ''), '[?#].*$', ''), '');
  if v_desde is not null and left(v_desde, 1) <> '/' then
    v_desde := '/' || v_desde;
  end if;
  if v_desde ~ '^/[/\\]' or char_length(v_desde) > 120 then
    v_desde := null;
  end if;
  new.desde := v_desde;
  new.pagina := coalesce(new.pagina, public.ca_pagina_de_checkout(new.vid, new.ts, new.desde));

  if new.vid is null or new.fuente is not null then
    return new;
  end if;
  select v.sid into v_sid
  from public.ca_vistas v
  where v.ts >= new.ts - interval '3 hours' and v.ts <= new.ts + interval '1 minute' and v.vid = new.vid
  order by v.ts desc
  limit 1;
  if v_sid is null then
    return new;
  end if;
  select coalesce((array_agg(x.f order by x.ts) filter (where x.f is not null))[1], 'Directo') into new.fuente
  from (
    select v.ts, public.ca_fuente(v.ref_host, v.utm_source, v.utm_medium) as f
    from public.ca_vistas v
    where v.ts >= new.ts - interval '3 hours' and v.ts <= new.ts + interval '1 minute' and v.sid = v_sid
  ) x;
  return new;
end;
$$;

drop trigger if exists ca_checkouts_atribuir on public.ca_checkouts;
create trigger ca_checkouts_atribuir before insert on public.ca_checkouts
  for each row execute function public.ca_checkouts_atribuir();

revoke execute on function
  public.ca_tocar_updated_at(),
  public.ca_perfiles_normalizar(),
  public.ca_compras_asignar_usuario(),
  public.ca_calculos_tope(),
  public.ca_checkouts_atribuir(),
  public.ca_pagina_de_checkout(uuid, timestamptz, text),
  public.ca_cerrar_vista(uuid, integer, integer, integer, boolean),
  public.ca_limite(text, integer, integer),
  public.ca_vincular_compras(),
  public.ca_vincular_compras_de(uuid),
  public.ca_fuente(text, text, text)
from public, anon, authenticated;

grant execute on function
  public.ca_cerrar_vista(uuid, integer, integer, integer, boolean),
  public.ca_limite(text, integer, integer),
  public.ca_vincular_compras_de(uuid),
  public.ca_pagina_de_checkout(uuid, timestamptz, text),
  public.ca_fuente(text, text, text)
to service_role;

grant execute on function public.ca_vincular_compras() to authenticated;
