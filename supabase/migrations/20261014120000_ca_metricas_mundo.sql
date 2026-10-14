-- calcular.ar + calcularya.com · métricas del mundo (ADR 0002, D6). Depende de 20261009120000.
-- Re-ejecutable. Qué suma: mercados con forma de país o edición (ca-fr), país real del visitante en
-- eventos, checkouts y compras, ingresos en USD con el tipo de cambio del día de la venta, embudo por
-- mercado resumido por día y el ca_panel que lo lee. Cómo aplicarlo y verificarlo: docs/global/SQL-METRICAS.md.

set lock_timeout = '5s';

-- Las constraints van NOT VALID igual que en 20261008120000: las filas viejas ya cumplen (2 letras o
-- 'global') y validarlas barrería ca_vistas entera con la tabla bloqueada. Sólo se recrean si todavía
-- son las de antes (sin 'global' en la definición), así re-ejecutar no vuelve a tomar el lock.
do $$
declare
  t text;
  v_def text;
begin
  foreach t in array array['ca_vistas', 'ca_eventos', 'ca_checkouts', 'ca_compras', 'ca_opiniones', 'ca_perfiles', 'ca_calculos'] loop
    select pg_get_constraintdef(c.oid) into v_def
    from pg_constraint c
    where c.conrelid = format('public.%I', t)::regclass and c.conname = t || '_sitio_mercado_check';
    if v_def is null or v_def not like '%global%' then
      execute format('alter table public.%I drop constraint if exists %I', t, t || '_sitio_mercado_check');
      execute format(
        'alter table public.%I add constraint %I check (sitio in (''ar'', ''intl'') and mercado ~ ''^([a-z]{2}(-[a-z]{2,3})?|global)$'' and (sitio = ''ar'') = (mercado = ''ar'')) not valid',
        t, t || '_sitio_mercado_check'
      );
    end if;
  end loop;

  select pg_get_constraintdef(c.oid) into v_def
  from pg_constraint c
  where c.conrelid = 'public.ca_resumen'::regclass and c.conname = 'ca_resumen_mercado_check';
  if v_def is null or v_def not like '%global%' then
    alter table public.ca_resumen drop constraint if exists ca_resumen_mercado_check;
    alter table public.ca_resumen add constraint ca_resumen_mercado_check
      check (mercado = '*' or mercado ~ '^([a-z]{2}(-[a-z]{2,3})?|global)$') not valid;
  end if;

  foreach t in array array['ca_eventos', 'ca_checkouts', 'ca_compras'] loop
    execute format('alter table public.%I add column if not exists pais text', t);
    if not exists (select 1 from pg_constraint where conrelid = format('public.%I', t)::regclass and conname = t || '_pais_check') then
      execute format('alter table public.%I add constraint %I check (pais is null or pais ~ ''^[A-Z]{2}$'') not valid', t, t || '_pais_check');
    end if;
  end loop;
end $$;

alter table public.ca_compras add column if not exists monto_usd numeric(14, 2);

-- usd = cuántos dólares vale una unidad de la moneda ese día. La carga el cron con las cotizaciones
-- del BCRA (src/lib/panel/tipo-cambio.ts); un día sin dato usa el último hábil de la semana anterior.
create table if not exists public.ca_tipo_cambio (
  moneda text not null check (moneda ~ '^[A-Z]{3}$'),
  dia date not null,
  usd numeric(20, 10) not null check (usd > 0),
  fuente text not null default 'bcra' check (char_length(fuente) between 1 and 40),
  created_at timestamptz not null default now(),
  primary key (moneda, dia)
);

-- Una fila por día y mercado con actividad, más la fila '*' que marca el día como resumido. Cada
-- persona cuenta una vez por día: así los pasos del embudo se pueden sumar entre días y entre países
-- sin que un paso supere al anterior.
create table if not exists public.ca_resumen_mercado (
  dia date not null,
  mercado text not null check (mercado = '*' or mercado ~ '^([a-z]{2}(-[a-z]{2,3})?|global)$'),
  visitantes integer not null default 0,
  usaron integer not null default 0,
  usos integer not null default 0,
  ofertas integer not null default 0,
  clics integer not null default 0,
  primary key (dia, mercado)
);

create index if not exists ca_compras_usd_pendiente_idx on public.ca_compras (pagado_at) where monto_usd is null and moneda <> 'USD';

alter table public.ca_tipo_cambio enable row level security;
alter table public.ca_tipo_cambio force row level security;
alter table public.ca_resumen_mercado enable row level security;
alter table public.ca_resumen_mercado force row level security;
revoke all on table public.ca_tipo_cambio, public.ca_resumen_mercado from public, anon, authenticated;
grant select, insert, update, delete on table public.ca_tipo_cambio, public.ca_resumen_mercado to service_role;

create or replace function public.ca_usd_de(p_moneda text, p_dia date)
returns numeric
language sql
stable
set search_path = ''
as $$
  select case when p_moneda = 'USD' then 1::numeric else (
    select t.usd
    from public.ca_tipo_cambio t
    where t.moneda = p_moneda and t.dia <= p_dia and t.dia >= p_dia - 7
    order by t.dia desc
    limit 1
  ) end;
$$;

-- El webhook de PayPal no conoce el país de quien paga (el pedido lo hace PayPal): sale del checkout,
-- que lo tomó del navegador. monto_usd queda null si no hay cotización: el panel lo muestra aparte en
-- vez de sumar cero.
create or replace function public.ca_compras_completar()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.pais is null and new.checkout_id is not null then
    new.pais := (select k.pais from public.ca_checkouts k where k.id = new.checkout_id);
  end if;
  new.monto_usd := round(new.monto * public.ca_usd_de(new.moneda, (new.pagado_at at time zone 'America/Argentina/Buenos_Aires')::date), 2);
  return new;
end;
$$;

drop trigger if exists ca_compras_completar on public.ca_compras;
create trigger ca_compras_completar before insert or update of monto, moneda, pagado_at, checkout_id on public.ca_compras
  for each row execute function public.ca_compras_completar();

update public.ca_compras set monto_usd = monto where moneda = 'USD' and monto_usd is distinct from monto;

-- p_tasas: {"ARS": 0.000661, "EUR": 1.1195, ...} en dólares por unidad. Recalcula las compras de esa
-- semana: una venta de un sábado toma la cotización del viernes, y si después llega una más cercana,
-- la usa.
create or replace function public.ca_tipo_cambio_cargar(p_dia date, p_tasas jsonb, p_fuente text default 'bcra')
returns integer
language plpgsql
set search_path = ''
set timezone = 'America/Argentina/Buenos_Aires'
as $$
declare
  v_n integer;
begin
  if p_dia is null or p_dia > now()::date + 1 or p_tasas is null or jsonb_typeof(p_tasas) <> 'object' then
    raise exception 'ca_tipo_cambio_cargar: datos inválidos' using errcode = '22023';
  end if;
  insert into public.ca_tipo_cambio (moneda, dia, usd, fuente)
  select upper(x.key), p_dia, x.value::numeric, left(coalesce(nullif(btrim(p_fuente), ''), 'bcra'), 40)
  from jsonb_each_text(p_tasas) x
  where x.key ~ '^[A-Za-z]{3}$' and upper(x.key) <> 'USD'
    and x.value ~ '^[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?$' and x.value::numeric > 0 and x.value::numeric < 1000000
  on conflict (moneda, dia) do update set usd = excluded.usd, fuente = excluded.fuente;
  get diagnostics v_n = row_count;

  update public.ca_compras c
  set monto_usd = x.usd
  from (
    select c2.id, round(c2.monto * public.ca_usd_de(c2.moneda, c2.pagado_at::date), 2) as usd
    from public.ca_compras c2
    where c2.moneda <> 'USD' and c2.pagado_at >= p_dia::timestamptz and c2.pagado_at < (p_dia + 8)::timestamptz
  ) x
  where c.id = x.id and x.usd is not null and c.monto_usd is distinct from x.usd;
  return v_n;
end;
$$;

-- Días (hora argentina) con ventas en otra moneda que todavía no tienen monto en USD: el cron le pide
-- al BCRA la cotización de esos días.
create or replace function public.ca_usd_pendientes(p_max integer default 3)
returns table (dia date, moneda text)
language sql
stable
set search_path = ''
set timezone = 'America/Argentina/Buenos_Aires'
as $$
  select x.d, x.m
  from (
    select distinct c.pagado_at::date as d, c.moneda as m
    from public.ca_compras c
    where c.monto_usd is null and c.moneda <> 'USD' and c.pagado_at >= now() - interval '400 days'
  ) x
  order by x.d desc, x.m
  limit greatest(coalesce(p_max, 3), 0);
$$;

-- La misma lógica de 20260930120000 más el país: el de la última vista del visitante cuando el
-- checkout no lo trae (los de calcular.ar los crea el webhook de MP, que no ve el navegador).
create or replace function public.ca_checkouts_atribuir()
returns trigger
language plpgsql
set search_path = ''
set plan_cache_mode = force_custom_plan
as $$
declare
  v_sid uuid;
  v_pais text;
  v_desde text;
begin
  v_desde := nullif(regexp_replace(regexp_replace(btrim(coalesce(new.desde, '')), '^(https?://)?((www\.)?calcular\.ar(?=/|$))?', ''), '[?#].*$', ''), '');
  if v_desde is not null and left(v_desde, 1) <> '/' then
    v_desde := '/' || v_desde;
  end if;
  if v_desde ~ '^/[/\\]' or char_length(v_desde) > 120 then
    v_desde := null;
  end if;
  new.desde := v_desde;
  new.pagina := coalesce(new.pagina, public.ca_pagina_de_checkout(new.vid, new.ts, new.desde));

  if new.vid is null or (new.fuente is not null and new.pais is not null) then
    return new;
  end if;
  select v.sid, v.pais into v_sid, v_pais
  from public.ca_vistas v
  where v.ts >= new.ts - interval '3 hours' and v.ts <= new.ts + interval '1 minute' and v.vid = new.vid
  order by v.ts desc
  limit 1;
  if v_sid is null then
    return new;
  end if;
  new.pais := coalesce(new.pais, v_pais);
  if new.fuente is null then
    select coalesce((array_agg(x.f order by x.ts) filter (where x.f is not null))[1], 'Directo') into new.fuente
    from (
      select v.ts, public.ca_fuente(v.ref_host, v.utm_source, v.utm_medium) as f
      from public.ca_vistas v
      where v.ts >= new.ts - interval '3 hours' and v.ts <= new.ts + interval '1 minute' and v.sid = v_sid
    ) x;
  end if;
  return new;
end;
$$;

create or replace function public.ca_resumen_mercado_calcular(p_desde timestamptz, p_hasta timestamptz)
returns table (dia date, mercado text, visitantes integer, usaron integer, usos integer, ofertas integer, clics integer)
language sql
stable
set search_path = ''
set plan_cache_mode = force_custom_plan
set timezone = 'America/Argentina/Buenos_Aires'
as $$
  with
  vis as (
    select v.ts::date as d, v.mercado as m,
           count(distinct v.vid)::integer as nv,
           count(distinct v.vid) filter (where v.uso_calc)::integer as nu,
           count(*) filter (where v.uso_calc)::integer as nus
    from public.ca_vistas v
    where v.ts >= p_desde and v.ts < p_hasta
    group by 1, 2
  ),
  ev as (
    select e.ts::date as d, e.mercado as m,
           count(distinct e.vid) filter (where e.tipo = 'vista_oferta')::integer as nof,
           count(distinct e.vid) filter (where e.tipo in ('cta_compra', 'dialogo_compra'))::integer as nc
    from public.ca_eventos e
    where e.tipo in ('vista_oferta', 'cta_compra', 'dialogo_compra') and e.ts >= p_desde and e.ts < p_hasta and e.vid is not null
    group by 1, 2
  )
  select coalesce(vis.d, ev.d), coalesce(vis.m, ev.m), coalesce(vis.nv, 0), coalesce(vis.nu, 0), coalesce(vis.nus, 0), coalesce(ev.nof, 0), coalesce(ev.nc, 0)
  from vis
  full join ev on ev.d = vis.d and ev.m = vis.m;
$$;

create or replace function public.ca_resumen_mercado_rango(p_desde timestamptz, p_hasta timestamptz)
returns table (dia date, mercado text, visitantes integer, usaron integer, usos integer, ofertas integer, clics integer)
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
  select coalesce(array_agg(r.dia order by r.dia), '{}'::date[]) into v_resumidos
  from public.ca_resumen_mercado r
  where r.mercado = '*'
    and r.dia::timestamptz >= p_desde and (r.dia + 1)::timestamptz <= p_hasta and r.dia < now()::date;

  return query
    select r.dia, r.mercado, r.visitantes, r.usaron, r.usos, r.ofertas, r.clics
    from public.ca_resumen_mercado r
    where r.dia = any (v_resumidos) and r.mercado <> '*';

  for v_dia in
    select g.d::date from generate_series(p_desde::date::timestamp, (p_hasta - interval '1 microsecond')::date::timestamp, interval '1 day') as g(d)
  loop
    v_ini := greatest(p_desde, v_dia::timestamptz);
    v_fin := least(p_hasta, (v_dia + 1)::timestamptz);
    if v_dia = any (v_resumidos) or v_ini >= v_fin then
      if v_tramo_desde is not null then
        return query select c.* from public.ca_resumen_mercado_calcular(v_tramo_desde, v_tramo_hasta) c;
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
    return query select c.* from public.ca_resumen_mercado_calcular(v_tramo_desde, v_tramo_hasta) c;
  end if;
end;
$$;

create or replace function public.ca_resumir_mercado(p_desde date, p_hasta date)
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
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('ca_resumir_mercado', 0));
  for v_dia in
    select g.d::date from generate_series(p_desde::timestamp, least(p_hasta, now()::date - 1)::timestamp, interval '1 day') as g(d)
  loop
    delete from public.ca_resumen_mercado r where r.dia = v_dia;
    insert into public.ca_resumen_mercado (dia, mercado, visitantes, usaron, usos, ofertas, clics)
    select v_dia, c.mercado, c.visitantes, c.usaron, c.usos, c.ofertas, c.clics
    from public.ca_resumen_mercado_calcular(v_dia::timestamptz, (v_dia + 1)::timestamptz) c;
    insert into public.ca_resumen_mercado (dia, mercado) values (v_dia, '*') on conflict do nothing;
    v_n := v_n + 1;
  end loop;
  return v_n;
end;
$$;

-- La de 20260930120100 más el resumen por mercado. Ese se rellena en tandas más grandes (un día de
-- ca_resumen_mercado cuesta mucho menos que uno de ca_resumen) para que la historia quede lista en
-- unas horas después de correr la migración.
create or replace function public.ca_mantenimiento(p_dias_crudos integer default 400, p_tanda integer default 7)
returns jsonb
language plpgsql
set search_path = ''
set plan_cache_mode = force_custom_plan
set timezone = 'America/Argentina/Buenos_Aires'
as $$
declare
  v_hoy date := now()::date;
  v_dias integer := greatest(coalesce(p_dias_crudos, 400), 30);
  v_corte timestamptz := now() - make_interval(days => greatest(coalesce(p_dias_crudos, 400), 30));
  v_dia date;
  v_resumidos integer := 0;
  v_mercado integer := 0;
  v_limites integer;
  v_vistas integer;
  v_eventos integer;
begin
  delete from public.ca_limites where vence < now() - interval '1 minute';
  get diagnostics v_limites = row_count;
  delete from public.ca_vistas where id in (
    select id from public.ca_vistas where ts < v_corte limit 50000
  );
  get diagnostics v_vistas = row_count;
  delete from public.ca_eventos where id in (
    select id from public.ca_eventos where ts < v_corte limit 50000
  );
  get diagnostics v_eventos = row_count;

  for v_dia in
    select d from (
      select g.d::date as d
      from generate_series((v_hoy - v_dias)::timestamp, (v_hoy - 3)::timestamp, interval '1 day') as g(d)
      where not exists (select 1 from public.ca_resumen r where r.dia = g.d::date and r.dim = 'total' and r.clave = '')
      order by 1 desc
      limit greatest(coalesce(p_tanda, 7), 0)
    ) faltantes
    union
    select v_hoy - 2
    union
    select v_hoy - 1
    order by 1 desc
  loop
    v_resumidos := v_resumidos + public.ca_resumir(v_dia, v_dia);
  end loop;

  for v_dia in
    select d from (
      select g.d::date as d
      from generate_series((v_hoy - v_dias)::timestamp, (v_hoy - 3)::timestamp, interval '1 day') as g(d)
      where not exists (select 1 from public.ca_resumen_mercado r where r.dia = g.d::date and r.mercado = '*')
      order by 1 desc
      limit greatest(coalesce(p_tanda, 7), 0) * 4
    ) faltantes
    union
    select v_hoy - 2
    union
    select v_hoy - 1
    order by 1 desc
  loop
    v_mercado := v_mercado + public.ca_resumir_mercado(v_dia, v_dia);
  end loop;

  return jsonb_build_object(
    'limites', v_limites, 'vistas', v_vistas, 'eventos', v_eventos,
    'dias_resumidos', v_resumidos, 'dias_mercado', v_mercado, 'corte', v_corte
  );
end;
$$;

-- p_mercado null = todos los sitios. Los ingresos de los KPI y de la serie son en dólares (monto_usd);
-- cada moneda se ve aparte en «ingresos.porMoneda» y lo que no tiene cotización, en «sinCotizacion».
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
  if p_mercado is not null and p_mercado !~ '^([a-z]{2}(-[a-z]{2,3})?|global)$' then
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
    select e.ts, date_trunc(v_gran, e.ts) as k, e.vid, e.tipo, e.path, e.producto, e.props, e.sitio
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
    select c.id, date_trunc(v_gran, c.pagado_at) as k, c.producto, c.monto, c.moneda, c.monto_usd, c.checkout_id, c.pais
    from public.ca_compras c
    where c.estado = 'aprobado' and c.pagado_at >= p_desde and c.pagado_at < p_hasta
      and (v_m = '*' or c.mercado = v_m)
  ),
  cp_ck as (
    select cp.id, cp.monto_usd, k.fuente, coalesce(k.pagina, k.desde) as desde
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
      (select coalesce(sum(c.monto_usd), 0) from public.ca_compras c
        where c.estado = 'aprobado' and c.pagado_at >= v_ant_desde and c.pagado_at < v_ant_hasta
          and (v_m = '*' or c.mercado = v_m)) as ing
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
  cp_k as (select cp.k, count(*) as n, coalesce(sum(cp.monto_usd), 0) as m from cp group by cp.k),
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
      jsonb_build_object('clave', 'ingresos', 'valor', (select coalesce(sum(cp.monto_usd), 0) from cp), 'anterior', o.ing,
        'serie', (select jsonb_agg(jsonb_build_object('t', s.k, 'v', s.ing) order by s.k) from serie s))
    ) as j
    from kv v, kv_a a, ant_otros o
  ),
  ingresos as (
    select jsonb_build_object(
      'moneda', 'USD',
      'porMoneda', (
        select coalesce(jsonb_agg(jsonb_build_object('moneda', x.moneda, 'monto', x.monto, 'montoUsd', x.usd, 'ventas', x.n) order by x.usd desc nulls last, x.moneda), '[]'::jsonb)
        from (select cp.moneda, sum(cp.monto) as monto, sum(cp.monto_usd) as usd, count(*) as n from cp group by cp.moneda) x
      ),
      'sinCotizacion', (select count(*) from cp where cp.monto_usd is null)
    ) as j
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
  ofe_pag as materialized (
    select split_part(r.clave, chr(31), 1) as path, split_part(r.clave, chr(31), 2) as producto, sum(r.vistas) as n
    from r
    where r.dim = 'oferta_pagina'
    group by 1, 2
  ),
  pag_prod as (
    select distinct on (x.path) x.path, x.producto
    from ofe_pag x
    order by x.path, x.n desc, x.producto
  ),
  pag_ofe as (select x.path, sum(x.n) as n from ofe_pag x group by x.path),
  pag_ck as (select ck.desde as path, count(*) as n from ck where ck.desde is not null group by ck.desde),
  pag_cp as (
    select cp_ck.desde as path, count(*) as n, coalesce(sum(cp_ck.monto_usd), 0) as usd
    from cp_ck
    where cp_ck.desde is not null
    group by cp_ck.desde
  ),
  paginas as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'path', pag.path,
      'vistas', pag.vistas,
      'visitantes', pag.visitantes,
      'usos', pag.usos,
      'tiempoMedianoMs', coalesce(pm.med, 0),
      'compartidos', coalesce(pe.compartidos, 0),
      'ofertas', coalesce(po.n, 0),
      'interesCompra', coalesce(pe.interes, 0),
      'checkouts', coalesce(pk.n, 0),
      'ventas', coalesce(pc.n, 0),
      'ingresosUsd', coalesce(pc.usd, 0),
      'producto', pp.producto,
      'serieUsos', ps.serie
    ) order by pag.vistas desc, pag.path), '[]'::jsonb) as j
    from pag
    left join pag_med pm on pm.path = pag.path
    left join pag_serie ps on ps.path = pag.path
    left join pag_ev pe on pe.path = pag.path
    left join pag_prod pp on pp.path = pag.path
    left join pag_ofe po on po.path = pag.path
    left join pag_ck pk on pk.path = pag.path
    left join pag_cp pc on pc.path = pag.path
  ),

  -- calcularya no abre un diálogo: su paso «abrió la compra» es el clic en la oferta (cta_compra).
  emb_vio as (select r.clave as producto, sum(r.visitantes)::bigint as n from r where r.dim = 'oferta' group by r.clave),
  emb_abrio as (
    select ev.producto, count(distinct ev.vid) as n
    from ev
    where (ev.tipo = 'dialogo_compra' or (ev.tipo = 'cta_compra' and ev.sitio = 'intl')) and ev.producto is not null
    group by ev.producto
  ),
  emb_ck as (select ck.producto, count(*) as n from ck group by ck.producto),
  emb_cp as (
    select cp.producto, count(*) as n, coalesce(sum(cp.monto), 0) as m, min(cp.moneda) as moneda, coalesce(sum(cp.monto_usd), 0) as usd
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
      'ingresos', coalesce(ep.m, 0),
      'moneda', ep.moneda,
      'ingresosUsd', coalesce(ep.usd, 0)
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
  paises_compra as (
    select coalesce(jsonb_agg(jsonb_build_object('clave', x.clave, 'n', x.n) order by x.n desc, x.clave collate "C"), '[]'::jsonb) as j
    from (
      select coalesce(cp.pais, 'desconocido') as clave, count(*) as n
      from cp
      group by 1
      order by count(*) desc, coalesce(cp.pais, 'desconocido') collate "C"
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
      'montoUsd', c.monto_usd,
      'pais', c.pais,
      'mercado', c.mercado,
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

  -- La comparativa por mercado no depende del filtro: siempre son todos. Sale de ca_resumen_mercado,
  -- con una persona por día: unir el HyperLogLog de 190 países por 90 días son 17 millones de
  -- registros y no entra en el timeout (medido en scripts/check_panel_sql.ts, CA_PANEL_MUNDO=1).
  m_emb as (
    select x.mercado, sum(x.visitantes) as visitantes, sum(x.usaron) as usaron, sum(x.usos) as usos,
           sum(x.ofertas) as ofertas, sum(x.clics) as clics
    from public.ca_resumen_mercado_rango(p_desde, p_hasta) x
    group by x.mercado
  ),
  m_ck as (
    select c.mercado, count(*) as n
    from public.ca_checkouts c
    where c.ts >= p_desde and c.ts < p_hasta
    group by c.mercado
  ),
  m_cp as (
    select c.mercado, c.moneda, count(*) as n, sum(c.monto) as monto, sum(c.monto_usd) as usd
    from public.ca_compras c
    where c.estado = 'aprobado' and c.pagado_at >= p_desde and c.pagado_at < p_hasta
    group by c.mercado, c.moneda
  ),
  m_ven as (
    select m_cp.mercado, sum(m_cp.n) as n, coalesce(sum(m_cp.usd), 0) as usd,
           jsonb_agg(jsonb_build_object('moneda', m_cp.moneda, 'monto', m_cp.monto) order by m_cp.moneda) as ingresos
    from m_cp
    group by m_cp.mercado
  ),
  mercados as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'mercado', y.mercado, 'visitantes', y.visitantes, 'usos', y.usos, 'ventas', y.ventas, 'ingresos', y.ingresos,
      'ingresosUsd', y.usd, 'usaron', y.usaron, 'ofertas', y.ofertas, 'clics', y.clics, 'checkouts', y.checkouts
    ) order by y.visitantes desc, y.mercado), '[]'::jsonb) as j
    from (
      select x.mercado,
             coalesce(me.visitantes, 0) as visitantes,
             coalesce(me.usos, 0) as usos,
             coalesce(mv.n, 0) as ventas,
             coalesce(mv.ingresos, '[]'::jsonb) as ingresos,
             coalesce(mv.usd, 0) as usd,
             coalesce(me.usaron, 0) as usaron,
             coalesce(me.ofertas, 0) as ofertas,
             coalesce(me.clics, 0) as clics,
             coalesce(mk.n, 0) as checkouts
      from (
        select m_emb.mercado from m_emb
        union select m_ven.mercado from m_ven
        union select m_ck.mercado from m_ck
      ) x
      left join m_emb me on me.mercado = x.mercado
      left join m_ven mv on mv.mercado = x.mercado
      left join m_ck mk on mk.mercado = x.mercado
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
    'ingresos', (select j from ingresos),
    'paginas', (select j from paginas),
    'embudos', (select j from embudos),
    'fuentes', (select j from fuentes),
    'dispositivos', (select j from dispositivos),
    'paises', (select j from paises),
    'paisesCompra', (select j from paises_compra),
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
  public.ca_usd_de(text, date),
  public.ca_compras_completar(),
  public.ca_tipo_cambio_cargar(date, jsonb, text),
  public.ca_usd_pendientes(integer),
  public.ca_checkouts_atribuir(),
  public.ca_resumen_mercado_calcular(timestamptz, timestamptz),
  public.ca_resumen_mercado_rango(timestamptz, timestamptz),
  public.ca_resumir_mercado(date, date),
  public.ca_mantenimiento(integer, integer),
  public.ca_panel(timestamptz, timestamptz, text)
from public, anon, authenticated;

grant execute on function
  public.ca_usd_de(text, date),
  public.ca_tipo_cambio_cargar(date, jsonb, text),
  public.ca_usd_pendientes(integer),
  public.ca_resumen_mercado_calcular(timestamptz, timestamptz),
  public.ca_resumen_mercado_rango(timestamptz, timestamptz),
  public.ca_resumir_mercado(date, date),
  public.ca_mantenimiento(integer, integer),
  public.ca_panel(timestamptz, timestamptz, text)
to service_role;

notify pgrst, 'reload schema';
