# SQL de la paridad de medición (calcularya.com en el panel)

1. Supabase de calcular.ar, SQL Editor, New query: pegá todo el bloque de abajo y tocá Run. Mejor en un horario tranquilo: tarda unos segundos y frena las escrituras de medición mientras corre.
2. Tiene que terminar sin errores. Si dice «canceling statement due to lock timeout», corrélo de nuevo: es re-ejecutable y no duplica nada.
3. Abrí /dashboard: aparece el selector con cada país de CalcularYa y la tabla «Por país». Antes de correrlo el panel anda igual, con Todos y Argentina.

Es el mismo contenido que `supabase/migrations/20261008120000_ca_medicion_mercado.sql`. Todo lo medido hasta hoy queda como Argentina.

```sql
-- calcular.ar + calcularya.com · medición por sitio y mercado (plan de paridad, fase 2).
-- Depende de las migraciones 20260930* y 20261007120000. Re-ejecutable y segura sobre datos
-- existentes: todo lo medido hasta acá es de calcular.ar, así que las columnas nuevas nacen en 'ar'.

set lock_timeout = '5s';

-- Las constraints van NOT VALID a propósito: las filas viejas ya cumplen por el default ('ar') y
-- validarlas barrería ca_vistas entera con la tabla bloqueada. Las filas nuevas sí se chequean.
do $$
declare
  t text;
begin
  foreach t in array array['ca_vistas', 'ca_eventos', 'ca_checkouts', 'ca_compras', 'ca_opiniones', 'ca_perfiles', 'ca_calculos'] loop
    execute format('alter table public.%I add column if not exists sitio text not null default %L', t, 'ar');
    execute format('alter table public.%I add column if not exists mercado text not null default %L', t, 'ar');
    if not exists (select 1 from pg_constraint where conrelid = format('public.%I', t)::regclass and conname = t || '_sitio_mercado_check') then
      execute format(
        'alter table public.%I add constraint %I check (sitio in (''ar'', ''intl'') and mercado ~ ''^[a-z]{2,6}$'' and (sitio = ''ar'') = (mercado = ''ar'')) not valid',
        t, t || '_sitio_mercado_check'
      );
    end if;
  end loop;
end $$;

-- Parciales por sitio intl: calcular.ar es casi todo el volumen y ya se lee por el BRIN de ts.
create index if not exists ca_vistas_intl_idx on public.ca_vistas (mercado, ts) where sitio = 'intl';
create index if not exists ca_eventos_intl_idx on public.ca_eventos (mercado, ts) where sitio = 'intl';
create index if not exists ca_checkouts_mercado_idx on public.ca_checkouts (mercado, ts);
create index if not exists ca_compras_mercado_idx on public.ca_compras (mercado, pagado_at);
create index if not exists ca_opiniones_mercado_idx on public.ca_opiniones (mercado, created_at desc);

-- ca_resumen: mercado '*' = todos los sitios (lo que había hasta hoy) y una fila por mercado con
-- actividad. Lo histórico es todo de calcular.ar: se copia a 'ar' una sola vez, al crear la
-- columna; repetirlo después mezclaría páginas intl en Argentina.
do $$
declare
  v_pk text;
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'ca_resumen' and column_name = 'mercado'
  ) then
    alter table public.ca_resumen add column mercado text not null default '*';
    alter table public.ca_resumen add constraint ca_resumen_mercado_check check (mercado = '*' or mercado ~ '^[a-z]{2,6}$');
    select c.conname into v_pk from pg_constraint c where c.conrelid = 'public.ca_resumen'::regclass and c.contype = 'p';
    if v_pk is not null then
      execute format('alter table public.ca_resumen drop constraint %I', v_pk);
    end if;
    alter table public.ca_resumen add constraint ca_resumen_pkey primary key (dia, mercado, dim, clave);
    insert into public.ca_resumen (dia, mercado, dim, clave, vistas, visitantes, usos, sesiones, tiempo_ms, hll, hist)
    select r.dia, 'ar', r.dim, r.clave, r.vistas, r.visitantes, r.usos, r.sesiones, r.tiempo_ms, r.hll, r.hist
    from public.ca_resumen r
    where r.mercado = '*'
      and not (r.dim = 'total' and r.clave = '' and r.hll is null and r.vistas = 0);
  end if;
end $$;

drop function if exists public.ca_panel(timestamptz, timestamptz);
drop function if exists public.ca_resumen_rango(timestamptz, timestamptz, text);
drop function if exists public.ca_resumen_calcular(timestamptz, timestamptz, text, text);

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
    when e.s is null and (
      e.h ~ '(^|\.)calcular\.ar$' or e.h ~ '(^|\.)calcularya\.com$' or e.h ~ '\.vercel\.app$'
      or e.h in ('localhost', '127.0.0.1', 'mpago.la', 'mpago.li')
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

-- p_mercado: '*' = todos juntos, un código = sólo ese mercado, '+' = una fila por mercado.
create or replace function public.ca_resumen_calcular(
  p_desde timestamptz,
  p_hasta timestamptz,
  p_grano text,
  p_modo text,
  p_mercado text
)
returns table (
  k timestamptz,
  mercado text,
  dim text,
  clave text,
  vistas integer,
  visitantes integer,
  usos integer,
  sesiones integer,
  tiempo_ms integer,
  hll smallint[],
  hist integer[]
)
language sql
stable
set search_path = ''
set plan_cache_mode = force_custom_plan
set timezone = 'America/Argentina/Buenos_Aires'
as $$
  with
  b as materialized (
    select date_trunc(p_grano, v.ts) as k, case when p_mercado = '+' then v.mercado else p_mercado end as m,
           v.ts, v.vid, v.sid, v.path, v.uso_calc as u, v.activo_ms as ms,
           v.ref_host, v.utm_source, v.utm_medium, v.dispositivo, v.pais
    from public.ca_vistas v
    where v.ts >= p_desde and v.ts < p_hasta
      and (p_mercado in ('*', '+') or v.mercado = p_mercado)
  ),
  por_vid as materialized (
    select b.k, b.m, b.vid, min(b.dispositivo) as d, min(b.pais) as p
    from b
    group by b.k, b.m, b.vid
  ),
  cubos as (select distinct b.k, b.m from b),
  tot as (
    select b.k, b.m, count(*)::integer as vistas, count(*) filter (where b.u)::integer as usos,
           round(percentile_cont(0.5) within group (order by b.ms) filter (where b.u))::integer as med
    from b
    group by b.k, b.m
  ),
  tot_vis as (select pv.k, pv.m, count(*)::integer as n from por_vid pv group by pv.k, pv.m),
  hll_r as (
    select x.k, x.m, (x.h & 1023)::integer as i,
           max(case when x.w = 0 then 55 else round(ln((x.w & -x.w)::float8) / ln(2::float8))::integer + 1 end)::smallint as rho
    from (
      select pv.k, pv.m, y.h, (y.h >> 10) & 18014398509481983 as w
      from por_vid pv
      cross join lateral (select pg_catalog.uuid_hash_extended(pv.vid, 0) as h) y
    ) x
    where p_modo <> 'series'
    group by x.k, x.m, 3
  ),
  hll as (
    select c.k, c.m, array_agg(coalesce(r.rho, 0::smallint) order by g.i) as regs
    from cubos c
    cross join generate_series(0, 1023) as g(i)
    left join hll_r r on r.k = c.k and r.m = c.m and r.i = g.i
    where p_modo <> 'series'
    group by c.k, c.m
  ),
  hist_r as (
    select b.k, b.m,
           case when b.ms < 1000 then 0 else least(63, 1 + floor(ln(b.ms::float8 / 1000) / ln(1.2::float8))::integer) end as j,
           count(*)::integer as n
    from b
    where b.u and p_modo <> 'series'
    group by b.k, b.m, 3
  ),
  hist as (
    select c.k, c.m, array_agg(coalesce(r.n, 0) order by g.j) as h
    from cubos c
    cross join generate_series(0, 63) as g(j)
    left join hist_r r on r.k = c.k and r.m = c.m and r.j = g.j
    where p_modo <> 'series'
    group by c.k, c.m
  ),
  pag as (
    select x.k, x.m, x.path, sum(x.n)::integer as vistas, count(*)::integer as visitantes, sum(x.nu)::integer as usos
    from (
      select b.k, b.m, b.path, b.vid, count(*) as n, count(*) filter (where b.u) as nu
      from b
      where p_modo = 'completo'
      group by b.k, b.m, b.path, b.vid
    ) x
    group by x.k, x.m, x.path
  ),
  pag_med as (
    select b.k, b.m, b.path, round(percentile_cont(0.5) within group (order by b.ms))::integer as med
    from b
    where b.u and p_modo = 'completo'
    group by b.k, b.m, b.path
  ),
  pag_serie as (
    select b.k, b.m, b.path, count(*)::integer as usos
    from b
    where b.u and p_modo = 'series'
    group by b.k, b.m, b.path
  ),
  refs as materialized (
    select x.r, x.s, x.m, public.ca_fuente(x.r, x.s, x.m) as f
    from (select distinct b.ref_host as r, b.utm_source as s, b.utm_medium as m from b where p_modo = 'completo') x
  ),
  ses as materialized (
    select b.k, b.m, b.sid, b.vid,
           coalesce((array_agg(rf.f order by b.ts) filter (where rf.f is not null))[1], 'Directo') as f,
           count(*) filter (where b.u) as usos
    from b
    join refs rf
      on coalesce(rf.r, '') = coalesce(b.ref_host, '')
     and coalesce(rf.s, '') = coalesce(b.utm_source, '')
     and coalesce(rf.m, '') = coalesce(b.utm_medium, '')
    where p_modo = 'completo'
    group by b.k, b.m, b.sid, b.vid
  ),
  fue as (
    select x.k, x.m, x.f, count(*)::integer as visitantes, sum(x.nses)::integer as sesiones, sum(x.usos)::integer as usos
    from (select s.k, s.m, s.f, s.vid, count(*) as nses, sum(s.usos) as usos from ses s group by s.k, s.m, s.f, s.vid) x
    group by x.k, x.m, x.f
  ),
  ofe as materialized (
    select date_trunc(p_grano, e.ts) as k, case when p_mercado = '+' then e.mercado else p_mercado end as m,
           e.vid, e.path, e.producto
    from public.ca_eventos e
    where e.tipo = 'vista_oferta' and e.ts >= p_desde and e.ts < p_hasta
      and e.producto is not null and p_modo = 'completo'
      and (p_mercado in ('*', '+') or e.mercado = p_mercado)
  )

  select t.k, t.m, 'total', '', t.vistas, coalesce(tv.n, 0), t.usos, 0, t.med, h.regs, hi.h
  from tot t
  left join tot_vis tv on tv.k = t.k and tv.m = t.m
  left join hll h on h.k = t.k and h.m = t.m
  left join hist hi on hi.k = t.k and hi.m = t.m
  union all
  select p.k, p.m, 'pagina', p.path, p.vistas, p.visitantes, p.usos, 0, pm.med, null, null
  from pag p
  left join pag_med pm on pm.k = p.k and pm.m = p.m and pm.path = p.path
  union all
  select ps.k, ps.m, 'pagina', ps.path, 0, 0, ps.usos, 0, null, null, null
  from pag_serie ps
  union all
  select f.k, f.m, 'fuente', f.f, 0, f.visitantes, f.usos, f.sesiones, null, null, null
  from fue f
  union all
  select pv.k, pv.m, 'dispositivo', coalesce(pv.d, 'desconocido'), 0, count(*)::integer, 0, 0, null, null, null
  from por_vid pv
  where p_modo = 'completo'
  group by pv.k, pv.m, coalesce(pv.d, 'desconocido')
  union all
  select pv.k, pv.m, 'pais', coalesce(pv.p, 'desconocido'), 0, count(*)::integer, 0, 0, null, null, null
  from por_vid pv
  where p_modo = 'completo'
  group by pv.k, pv.m, coalesce(pv.p, 'desconocido')
  union all
  select o.k, o.m, 'oferta', o.producto, count(*)::integer, count(distinct o.vid)::integer, 0, 0, null, null, null
  from ofe o
  group by o.k, o.m, o.producto
  union all
  select o.k, o.m, 'oferta_pagina', left(coalesce(o.path, '') || chr(31) || o.producto, 200), count(*)::integer, 0, 0, 0, null, null, null
  from ofe o
  group by o.k, o.m, left(coalesce(o.path, '') || chr(31) || o.producto, 200);
$$;

create or replace function public.ca_resumen_rango(p_desde timestamptz, p_hasta timestamptz, p_modo text, p_mercado text)
returns table (
  dia date,
  mercado text,
  dim text,
  clave text,
  vistas integer,
  visitantes integer,
  usos integer,
  sesiones integer,
  tiempo_ms integer,
  hll smallint[],
  hist integer[]
)
language plpgsql
stable
set search_path = ''
set plan_cache_mode = force_custom_plan
set timezone = 'America/Argentina/Buenos_Aires'
as $$
declare
  v_resumidos date[];
  v_dia date;
  v_ini timestamptz;
  v_fin timestamptz;
  v_tramo_desde timestamptz;
  v_tramo_hasta timestamptz;
begin
  -- La fila total de '*' marca el día resumido para todos los mercados: un mercado sin filas ese
  -- día es un mercado sin actividad.
  select coalesce(array_agg(r.dia order by r.dia), '{}'::date[]) into v_resumidos
  from public.ca_resumen r
  where r.mercado = '*' and r.dim = 'total' and r.clave = ''
    and r.dia::timestamptz >= p_desde and (r.dia + 1)::timestamptz <= p_hasta and r.dia < now()::date;

  return query
    select r.dia, r.mercado, r.dim, r.clave, r.vistas, r.visitantes, r.usos, r.sesiones, r.tiempo_ms, r.hll, r.hist
    from public.ca_resumen r
    where r.dia = any (v_resumidos)
      and (case when p_mercado = '+' then r.mercado <> '*' else r.mercado = p_mercado end)
      and (p_modo = 'completo' or r.dim = 'total');

  for v_dia in
    select g.d::date from generate_series(p_desde::date::timestamp, (p_hasta - interval '1 microsecond')::date::timestamp, interval '1 day') as g(d)
  loop
    v_ini := greatest(p_desde, v_dia::timestamptz);
    v_fin := least(p_hasta, (v_dia + 1)::timestamptz);
    if v_dia = any (v_resumidos) or v_ini >= v_fin then
      if v_tramo_desde is not null then
        return query
          select c.k::date, c.mercado, c.dim, c.clave, c.vistas, c.visitantes, c.usos, c.sesiones, c.tiempo_ms, c.hll, c.hist
          from public.ca_resumen_calcular(v_tramo_desde, v_tramo_hasta, 'day', p_modo, p_mercado) c;
        v_tramo_desde := null;
      end if;
    elsif v_tramo_desde is null then
      v_tramo_desde := v_ini;
      v_tramo_hasta := v_fin;
    else
      v_tramo_hasta := v_fin;
    end if;
  end loop;
  if v_tramo_desde is not null then
    return query
      select c.k::date, c.mercado, c.dim, c.clave, c.vistas, c.visitantes, c.usos, c.sesiones, c.tiempo_ms, c.hll, c.hist
      from public.ca_resumen_calcular(v_tramo_desde, v_tramo_hasta, 'day', p_modo, p_mercado) c;
  end if;
end;
$$;

create or replace function public.ca_resumir(p_desde date, p_hasta date)
returns integer
language plpgsql
set search_path = ''
set plan_cache_mode = force_custom_plan
set timezone = 'America/Argentina/Buenos_Aires'
as $$
declare
  v_dia date;
  v_n integer := 0;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('ca_resumir', 0));
  for v_dia in
    select g.d::date from generate_series(p_desde::timestamp, least(p_hasta, now()::date - 1)::timestamp, interval '1 day') as g(d)
  loop
    delete from public.ca_resumen r where r.dia = v_dia;
    insert into public.ca_resumen (dia, mercado, dim, clave, vistas, visitantes, usos, sesiones, tiempo_ms, hll, hist)
    select v_dia, c.mercado, c.dim, c.clave, c.vistas, c.visitantes, c.usos, c.sesiones, c.tiempo_ms, c.hll, c.hist
    from public.ca_resumen_calcular(v_dia::timestamptz, (v_dia + 1)::timestamptz, 'day', 'completo', '*') c
    union all
    select v_dia, c.mercado, c.dim, c.clave, c.vistas, c.visitantes, c.usos, c.sesiones, c.tiempo_ms, c.hll, c.hist
    from public.ca_resumen_calcular(v_dia::timestamptz, (v_dia + 1)::timestamptz, 'day', 'completo', '+') c;
    insert into public.ca_resumen (dia, mercado, dim, clave, tiempo_ms)
    values (v_dia, '*', 'total', '', 0)
    on conflict do nothing;
    update public.ca_checkouts k set pagina = x.pagina
    from (
      select c.id, public.ca_pagina_de_checkout(c.vid, c.ts, c.desde) as pagina
      from public.ca_checkouts c
      where c.ts >= v_dia::timestamptz and c.ts < (v_dia + 1)::timestamptz and c.vid is not null
    ) x
    where k.id = x.id and k.pagina is distinct from x.pagina;
    v_n := v_n + 1;
  end loop;
  return v_n;
end;
$$;

-- p_mercado null = todos los sitios. Los ingresos de los KPI y de los embudos son en pesos (el
-- catálogo de calcular.ar); las demás monedas se ven por mercado en «mercados».
create or replace function public.ca_panel(p_desde timestamptz, p_hasta timestamptz, p_mercado text default null)
returns jsonb
language plpgsql
stable
set search_path = ''
set plan_cache_mode = force_custom_plan
set timezone = 'America/Argentina/Buenos_Aires'
as $$
declare
  v_m text := coalesce(p_mercado, '*');
  v_gran text;
  v_paso interval;
  v_corrimiento interval;
  v_ant_desde timestamptz;
  v_ant_hasta timestamptz;
  v_out jsonb;
begin
  if p_desde is null or p_hasta is null or p_hasta <= p_desde then
    raise exception 'ca_panel: rango inválido (% → %)', p_desde, p_hasta using errcode = '22023';
  end if;
  if p_hasta - p_desde > interval '400 days' then
    raise exception 'ca_panel: el rango máximo es de 400 días' using errcode = '22023';
  end if;
  if p_mercado is not null and p_mercado !~ '^[a-z]{2,6}$' then
    raise exception 'ca_panel: mercado inválido (%)', p_mercado using errcode = '22023';
  end if;

  v_gran := case when p_hasta - p_desde <= interval '1 day' then 'hour' else 'day' end;
  v_paso := case v_gran when 'hour' then interval '1 hour' else interval '1 day' end;
  v_corrimiento := make_interval(days => ceil(extract(epoch from (p_hasta - p_desde)) / 86400.0)::integer);
  v_ant_desde := p_desde - v_corrimiento;
  v_ant_hasta := p_hasta - v_corrimiento;

  with
  cubos as (
    select g.k
    from generate_series(date_trunc(v_gran, p_desde), p_hasta - interval '1 microsecond', v_paso) as g(k)
  ),
  r as materialized (select * from public.ca_resumen_rango(p_desde, p_hasta, 'completo', v_m)),
  ra as materialized (select * from public.ca_resumen_rango(v_ant_desde, v_ant_hasta, 'totales', v_m) x where x.dim = 'total'),
  sh as materialized (
    select c.k, c.dim, c.clave, c.visitantes, c.usos, c.tiempo_ms
    from public.ca_resumen_calcular(p_desde, p_hasta, 'hour', 'series', v_m) c
    where v_gran = 'hour'
  ),
  ev as materialized (
    select e.ts, date_trunc(v_gran, e.ts) as k, e.vid, e.tipo, e.path, e.producto, e.props
    from public.ca_eventos e
    where e.tipo in ('cta_compra', 'dialogo_compra', 'compartir', 'busqueda')
      and e.ts >= p_desde and e.ts < p_hasta
      and (v_m = '*' or e.mercado = v_m)
  ),
  ck as materialized (
    select c.id, date_trunc(v_gran, c.ts) as k, c.producto, coalesce(c.pagina, c.desde) as desde
    from public.ca_checkouts c
    where c.ts >= p_desde and c.ts < p_hasta
      and (v_m = '*' or c.mercado = v_m)
  ),
  cp as materialized (
    select c.id, date_trunc(v_gran, c.pagado_at) as k, c.producto, c.monto, c.moneda, c.checkout_id
    from public.ca_compras c
    where c.estado = 'aprobado' and c.pagado_at >= p_desde and c.pagado_at < p_hasta
      and (v_m = '*' or c.mercado = v_m)
  ),
  cp_ck as (
    select cp.id, k.fuente, coalesce(k.pagina, k.desde) as desde
    from cp
    join public.ca_checkouts k on k.id = cp.checkout_id
  ),

  tot as (
    select count(*) as filas, coalesce(sum(r.vistas), 0) as vistas, coalesce(sum(r.usos), 0) as usos,
           coalesce(sum(r.visitantes), 0) as vis_suma, coalesce(max(r.tiempo_ms), 0) as tiempo_uno
    from r
    where r.dim = 'total'
  ),
  regs as (
    select array_agg(u.v order by u.o) as a
    from (select x.o, max(x.v) as v from r, unnest(r.hll) with ordinality as x(v, o) where r.dim = 'total' group by x.o) u
  ),
  hsum as (
    select array_agg(u.n order by u.o) as a
    from (select x.o, sum(x.n)::integer as n from r, unnest(r.hist) with ordinality as x(n, o) where r.dim = 'total' group by x.o) u
  ),
  kv as (
    select t.vistas, t.usos,
           case when t.filas <= 1 then t.vis_suma else public.ca_hll_estimar((select a from regs)) end as visitantes,
           case when t.filas <= 1 then t.tiempo_uno else coalesce(public.ca_hist_mediana((select a from hsum)), 0) end as tiempo
    from tot t
  ),
  tot_a as (
    select count(*) as filas, coalesce(sum(ra.usos), 0) as usos,
           coalesce(sum(ra.visitantes), 0) as vis_suma, coalesce(max(ra.tiempo_ms), 0) as tiempo_uno
    from ra
  ),
  regs_a as (
    select array_agg(u.v order by u.o) as a
    from (select x.o, max(x.v) as v from ra, unnest(ra.hll) with ordinality as x(v, o) group by x.o) u
  ),
  hsum_a as (
    select array_agg(u.n order by u.o) as a
    from (select x.o, sum(x.n)::integer as n from ra, unnest(ra.hist) with ordinality as x(n, o) group by x.o) u
  ),
  kv_a as (
    select t.usos,
           case when t.filas <= 1 then t.vis_suma else public.ca_hll_estimar((select a from regs_a)) end as visitantes,
           case when t.filas <= 1 then t.tiempo_uno else coalesce(public.ca_hist_mediana((select a from hsum_a)), 0) end as tiempo
    from tot_a t
  ),
  ant_otros as (
    select
      (select count(*) from (
         select e.vid from public.ca_eventos e
         where e.tipo in ('cta_compra', 'dialogo_compra') and e.ts >= v_ant_desde and e.ts < v_ant_hasta and e.vid is not null
           and (v_m = '*' or e.mercado = v_m)
         group by e.vid) x) as inte,
      (select count(*) from public.ca_checkouts c
        where c.ts >= v_ant_desde and c.ts < v_ant_hasta and (v_m = '*' or c.mercado = v_m)) as cks,
      (select count(*) from public.ca_compras c
        where c.estado = 'aprobado' and c.pagado_at >= v_ant_desde and c.pagado_at < v_ant_hasta
          and (v_m = '*' or c.mercado = v_m)) as ven,
      (select coalesce(sum(c.monto), 0) from public.ca_compras c
        where c.estado = 'aprobado' and c.pagado_at >= v_ant_desde and c.pagado_at < v_ant_hasta
          and c.moneda = 'ARS' and (v_m = '*' or c.mercado = v_m)) as ing
  ),

  s_tot as (
    select r.dia::timestamptz as k, r.visitantes, r.usos, r.tiempo_ms from r where r.dim = 'total' and v_gran = 'day'
    union all
    select sh.k, sh.visitantes, sh.usos, sh.tiempo_ms from sh where sh.dim = 'total'
  ),
  int_k as (
    select x.k, count(*) as n
    from (select ev.k, ev.vid from ev where ev.tipo in ('cta_compra', 'dialogo_compra') and ev.vid is not null group by ev.k, ev.vid) x
    group by x.k
  ),
  ck_k as (select ck.k, count(*) as n from ck group by ck.k),
  cp_k as (select cp.k, count(*) as n, coalesce(sum(cp.monto) filter (where cp.moneda = 'ARS'), 0) as m from cp group by cp.k),
  serie as (
    select c.k,
           coalesce(st.visitantes, 0) as vis,
           coalesce(st.usos, 0) as usos,
           coalesce(st.tiempo_ms, 0) as med,
           coalesce(ik.n, 0) as inte,
           coalesce(kk.n, 0) as cks,
           coalesce(pk.n, 0) as ven,
           coalesce(pk.m, 0) as ing
    from cubos c
    left join s_tot st on st.k = c.k
    left join int_k ik on ik.k = c.k
    left join ck_k kk on kk.k = c.k
    left join cp_k pk on pk.k = c.k
  ),
  kpis as (
    select jsonb_build_array(
      jsonb_build_object('clave', 'visitantes', 'valor', v.visitantes, 'anterior', a.visitantes,
        'serie', (select jsonb_agg(jsonb_build_object('t', s.k, 'v', s.vis) order by s.k) from serie s)),
      jsonb_build_object('clave', 'usos', 'valor', v.usos, 'anterior', a.usos,
        'serie', (select jsonb_agg(jsonb_build_object('t', s.k, 'v', s.usos) order by s.k) from serie s)),
      jsonb_build_object('clave', 'tiempo', 'valor', v.tiempo, 'anterior', a.tiempo,
        'serie', (select jsonb_agg(jsonb_build_object('t', s.k, 'v', s.med) order by s.k) from serie s)),
      jsonb_build_object('clave', 'interes',
        'valor', (select count(*) from (select ev.vid from ev where ev.tipo in ('cta_compra', 'dialogo_compra') and ev.vid is not null group by ev.vid) x),
        'anterior', o.inte,
        'serie', (select jsonb_agg(jsonb_build_object('t', s.k, 'v', s.inte) order by s.k) from serie s)),
      jsonb_build_object('clave', 'checkouts', 'valor', (select count(*) from ck), 'anterior', o.cks,
        'serie', (select jsonb_agg(jsonb_build_object('t', s.k, 'v', s.cks) order by s.k) from serie s)),
      jsonb_build_object('clave', 'ventas', 'valor', (select count(*) from cp), 'anterior', o.ven,
        'serie', (select jsonb_agg(jsonb_build_object('t', s.k, 'v', s.ven) order by s.k) from serie s)),
      jsonb_build_object('clave', 'ingresos', 'valor', (select coalesce(sum(cp.monto), 0) from cp where cp.moneda = 'ARS'), 'anterior', o.ing,
        'serie', (select jsonb_agg(jsonb_build_object('t', s.k, 'v', s.ing) order by s.k) from serie s))
    ) as j
    from kv v, kv_a a, ant_otros o
  ),

  pag as (
    select r.clave as path, sum(r.vistas)::bigint as vistas, sum(r.visitantes)::bigint as visitantes, sum(r.usos)::bigint as usos
    from r
    where r.dim = 'pagina'
    group by r.clave
    order by 2 desc, 1
    limit 100
  ),
  pag_med as (
    select x.path, min(x.tiempo_ms) filter (where x.acum >= x.total / 2.0) as med
    from (
      select r.clave as path, r.tiempo_ms,
             sum(r.usos) over (partition by r.clave order by r.tiempo_ms rows between unbounded preceding and current row) as acum,
             sum(r.usos) over (partition by r.clave) as total
      from r
      join pag on pag.path = r.clave
      where r.dim = 'pagina' and r.usos > 0 and r.tiempo_ms is not null
    ) x
    group by x.path
  ),
  pag_serie as (
    select pag.path, jsonb_agg(coalesce(x.n, 0) order by c.k) as serie
    from pag
    cross join cubos c
    left join (
      select r.clave as path, r.dia::timestamptz as k, r.usos as n from r where r.dim = 'pagina' and v_gran = 'day'
      union all
      select sh.clave, sh.k, sh.usos from sh where sh.dim = 'pagina'
    ) x on x.path = pag.path and x.k = c.k
    group by pag.path
  ),
  pag_ev as (
    select ev.path,
           count(*) filter (where ev.tipo = 'compartir') as compartidos,
           count(distinct ev.vid) filter (where ev.tipo in ('cta_compra', 'dialogo_compra')) as interes
    from ev
    where ev.path is not null
    group by ev.path
  ),
  pag_prod as (
    select distinct on (x.path) x.path, x.producto
    from (
      select split_part(r.clave, chr(31), 1) as path, split_part(r.clave, chr(31), 2) as producto, sum(r.vistas) as n
      from r
      where r.dim = 'oferta_pagina'
      group by 1, 2
    ) x
    order by x.path, x.n desc, x.producto
  ),
  pag_ck as (select ck.desde as path, count(*) as n from ck where ck.desde is not null group by ck.desde),
  pag_cp as (select cp_ck.desde as path, count(*) as n from cp_ck where cp_ck.desde is not null group by cp_ck.desde),
  paginas as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'path', pag.path,
      'vistas', pag.vistas,
      'visitantes', pag.visitantes,
      'usos', pag.usos,
      'tiempoMedianoMs', coalesce(pm.med, 0),
      'compartidos', coalesce(pe.compartidos, 0),
      'interesCompra', coalesce(pe.interes, 0),
      'checkouts', coalesce(pk.n, 0),
      'ventas', coalesce(pc.n, 0),
      'producto', pp.producto,
      'serieUsos', ps.serie
    ) order by pag.vistas desc, pag.path), '[]'::jsonb) as j
    from pag
    left join pag_med pm on pm.path = pag.path
    left join pag_serie ps on ps.path = pag.path
    left join pag_ev pe on pe.path = pag.path
    left join pag_prod pp on pp.path = pag.path
    left join pag_ck pk on pk.path = pag.path
    left join pag_cp pc on pc.path = pag.path
  ),

  emb_vio as (select r.clave as producto, sum(r.visitantes)::bigint as n from r where r.dim = 'oferta' group by r.clave),
  emb_abrio as (
    select ev.producto, count(distinct ev.vid) as n
    from ev
    where ev.tipo = 'dialogo_compra' and ev.producto is not null
    group by ev.producto
  ),
  emb_ck as (select ck.producto, count(*) as n from ck group by ck.producto),
  emb_cp as (
    select cp.producto, count(*) as n, coalesce(sum(cp.monto) filter (where cp.moneda = 'ARS'), 0) as m
    from cp
    group by cp.producto
  ),
  embudos as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'producto', pr.producto,
      'pasos', jsonb_build_array(
        jsonb_build_object('paso', 'vio_oferta', 'n', coalesce(ev_.n, 0)),
        jsonb_build_object('paso', 'abrio_compra', 'n', coalesce(ea.n, 0)),
        jsonb_build_object('paso', 'fue_a_pagar', 'n', coalesce(ek.n, 0)),
        jsonb_build_object('paso', 'pago', 'n', coalesce(ep.n, 0))
      ),
      'ingresos', coalesce(ep.m, 0)
    ) order by pr.producto), '[]'::jsonb) as j
    from (
      select producto from emb_vio
      union select producto from emb_abrio
      union select producto from emb_ck
      union select producto from emb_cp
    ) pr
    left join emb_vio ev_ on ev_.producto = pr.producto
    left join emb_abrio ea on ea.producto = pr.producto
    left join emb_ck ek on ek.producto = pr.producto
    left join emb_cp ep on ep.producto = pr.producto
  ),

  fue_v as (
    select r.clave as f, sum(r.visitantes)::bigint as visitantes, sum(r.usos)::bigint as usos
    from r
    where r.dim = 'fuente'
    group by r.clave
  ),
  fue_cp as (select cc.fuente as f, count(*) as n from cp_ck cc where cc.fuente is not null group by cc.fuente),
  fuentes as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'fuente', fv.f, 'visitantes', fv.visitantes, 'usos', fv.usos, 'ventas', coalesce(fc.n, 0)
    ) order by fv.visitantes desc, fv.f collate "C"), '[]'::jsonb) as j
    from fue_v fv
    left join fue_cp fc on fc.f = fv.f
  ),

  dispositivos as (
    select coalesce(jsonb_agg(jsonb_build_object('clave', x.clave, 'n', x.n) order by x.n desc, x.clave collate "C"), '[]'::jsonb) as j
    from (select r.clave, sum(r.visitantes)::bigint as n from r where r.dim = 'dispositivo' group by r.clave) x
  ),
  paises as (
    select coalesce(jsonb_agg(jsonb_build_object('clave', x.clave, 'n', x.n) order by x.n desc, x.clave collate "C"), '[]'::jsonb) as j
    from (
      select r.clave, sum(r.visitantes)::bigint as n
      from r
      where r.dim = 'pais'
      group by r.clave
      order by sum(r.visitantes) desc, r.clave collate "C"
      limit 20
    ) x
  ),

  busquedas as (
    select coalesce(jsonb_agg(jsonb_build_object('q', x.q, 'n', x.n, 'sinResultados', x.sin) order by x.n desc, x.q), '[]'::jsonb) as j
    from (
      select y.q, count(*) as n, (array_agg(y.res order by y.ts desc))[1] = '0' as sin
      from (
        select ev.ts,
               left(regexp_replace(regexp_replace(lower(btrim(ev.props ->> 'q')), '\s+', ' ', 'g'), '\d{5,}', '…', 'g'), 80) as q,
               ev.props ->> 'resultados' as res
        from ev
        where ev.tipo = 'busqueda'
      ) y
      where char_length(y.q) >= 2
      group by y.q
      order by n desc, y.q
      limit 30
    ) x
  ),

  compras as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'id', c.mp_payment_id,
      'fecha', c.pagado_at,
      'producto', c.producto,
      'monto', c.monto,
      'moneda', c.moneda,
      'emailEnmascarado', case
        when c.email is null or position('@' in c.email) < 2 then 'sin mail'
        else left(split_part(c.email, '@', 1), case when char_length(split_part(c.email, '@', 1)) > 3 then 2 else 1 end)
             || '***@' || split_part(c.email, '@', 2)
      end,
      'conCuenta', c.user_id is not null,
      'desde', coalesce(k.pagina, k.desde),
      'estado', c.estado
    ) order by c.pagado_at desc, c.id desc), '[]'::jsonb) as j
    from (
      select * from public.ca_compras c
      where c.pagado_at >= p_desde and c.pagado_at < p_hasta
        and (v_m = '*' or c.mercado = v_m)
      order by c.pagado_at desc, c.id desc
      limit 50
    ) c
    left join public.ca_checkouts k on k.id = c.checkout_id
  ),

  cuentas as (
    select jsonb_build_object(
      'total', (select count(*) from public.ca_perfiles p where v_m = '*' or p.mercado = v_m),
      'nuevas', (select count(*) from public.ca_perfiles p
                 where p.created_at >= p_desde and p.created_at < p_hasta and (v_m = '*' or p.mercado = v_m)),
      'verificadas', (select count(*) from public.ca_perfiles p where p.verificado_at is not null and (v_m = '*' or p.mercado = v_m)),
      'conCompras', (select count(distinct c.user_id) from public.ca_compras c
                     where c.estado = 'aprobado' and c.user_id is not null and (v_m = '*' or c.mercado = v_m)),
      'perfiles', (
        select coalesce(jsonb_agg(jsonb_build_object('clave', x.clave, 'n', x.n) order by x.n desc, x.clave), '[]'::jsonb)
        from (
          select coalesce(p.perfil, 'sin_perfil') as clave, count(*) as n
          from public.ca_perfiles p
          where v_m = '*' or p.mercado = v_m
          group by 1
        ) x
      )
    ) as j
  ),

  viv as materialized (
    select v.vid, v.path
    from public.ca_vistas v
    where v.ts >= now() - interval '4 hours'
      and (coalesce(v.cerrada_at, v.ts) >= now() - interval '5 minutes'
           or (v.cerrada_at is null and v.ts >= now() - interval '30 minutes'))
      and (v_m = '*' or v.mercado = v_m)
  ),
  vivo as (
    select jsonb_build_object(
      'ahora', (select count(distinct viv.vid) from viv),
      'paginas', (
        select coalesce(jsonb_agg(jsonb_build_object('clave', x.path, 'n', x.n) order by x.n desc, x.path), '[]'::jsonb)
        from (select viv.path, count(distinct viv.vid) as n from viv group by viv.path order by n desc, viv.path limit 10) x
      )
    ) as j
  ),

  -- La comparativa por mercado no depende del filtro: siempre son todos.
  rm as materialized (select * from public.ca_resumen_rango(p_desde, p_hasta, 'totales', '+') x where x.dim = 'total'),
  m_tot as (
    select rm.mercado, count(*) as filas, coalesce(sum(rm.usos), 0) as usos, coalesce(sum(rm.visitantes), 0) as vis_suma
    from rm
    group by rm.mercado
  ),
  m_regs as (
    select u.mercado, array_agg(u.v order by u.o) as a
    from (select rm.mercado, x.o, max(x.v) as v from rm, unnest(rm.hll) with ordinality as x(v, o) group by rm.mercado, x.o) u
    group by u.mercado
  ),
  m_cp as (
    select c.mercado, c.moneda, count(*) as n, sum(c.monto) as monto
    from public.ca_compras c
    where c.estado = 'aprobado' and c.pagado_at >= p_desde and c.pagado_at < p_hasta
    group by c.mercado, c.moneda
  ),
  m_ven as (
    select m_cp.mercado, sum(m_cp.n) as n,
           jsonb_agg(jsonb_build_object('moneda', m_cp.moneda, 'monto', m_cp.monto) order by m_cp.moneda) as ingresos
    from m_cp
    group by m_cp.mercado
  ),
  mercados as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'mercado', y.mercado, 'visitantes', y.visitantes, 'usos', y.usos, 'ventas', y.ventas, 'ingresos', y.ingresos
    ) order by y.visitantes desc, y.mercado), '[]'::jsonb) as j
    from (
      select x.mercado,
             case when coalesce(t.filas, 0) <= 1 then coalesce(t.vis_suma, 0) else public.ca_hll_estimar(rg.a) end as visitantes,
             coalesce(t.usos, 0) as usos,
             coalesce(mv.n, 0) as ventas,
             coalesce(mv.ingresos, '[]'::jsonb) as ingresos
      from (select m_tot.mercado from m_tot union select m_ven.mercado from m_ven) x
      left join m_tot t on t.mercado = x.mercado
      left join m_regs rg on rg.mercado = x.mercado
      left join m_ven mv on mv.mercado = x.mercado
    ) y
  )

  select jsonb_build_object(
    'granularidad', case v_gran when 'hour' then 'hora' else 'dia' end,
    'desde', p_desde,
    'hasta', p_hasta,
    'anteriorDesde', v_ant_desde,
    'anteriorHasta', v_ant_hasta,
    'mercado', p_mercado,
    'cubos', (select jsonb_agg(c.k order by c.k) from cubos c),
    'hayVistas', (select vistas from tot) > 0,
    'kpis', (select j from kpis),
    'paginas', (select j from paginas),
    'embudos', (select j from embudos),
    'fuentes', (select j from fuentes),
    'dispositivos', (select j from dispositivos),
    'paises', (select j from paises),
    'busquedas', (select j from busquedas),
    'compras', (select j from compras),
    'cuentas', (select j from cuentas),
    'vivo', (select j from vivo),
    'mercados', (select j from mercados)
  )
  into v_out;

  return v_out;
end;
$$;

revoke execute on function
  public.ca_fuente(text, text, text),
  public.ca_resumen_calcular(timestamptz, timestamptz, text, text, text),
  public.ca_resumen_rango(timestamptz, timestamptz, text, text),
  public.ca_resumir(date, date),
  public.ca_panel(timestamptz, timestamptz, text)
from public, anon, authenticated;

grant execute on function
  public.ca_fuente(text, text, text),
  public.ca_resumen_calcular(timestamptz, timestamptz, text, text, text),
  public.ca_resumen_rango(timestamptz, timestamptz, text, text),
  public.ca_resumir(date, date),
  public.ca_panel(timestamptz, timestamptz, text)
to service_role;

-- PostgREST tiene que ver la firma nueva de ca_panel enseguida: sin esto el panel cae a «solo AR» hasta que recargue.
notify pgrst, 'reload schema';
```
