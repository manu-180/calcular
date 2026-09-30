-- calcular.ar · resumen diario de la medición (s124). Depende de 20260930120000.
-- Re-ejecutable.
--
-- Por qué existe: contar visitantes distintos es O(vistas). Con ~1M vistas en 90 días, leer
-- el crudo en cada carga del panel son decenas de segundos en el plan free. Los días cerrados
-- se resumen una vez (ca_resumir, por cron) y el panel sólo lee crudo lo que falta (hoy).
-- El resumen y el crudo salen de la MISMA función (ca_resumen_calcular): no pueden divergir.
--
-- Semántica que cambia respecto de contar sobre el crudo:
--   · visitantes del período (KPI) = HyperLogLog con 1024 registros: exacto hasta ~2.500
--     visitantes (conteo lineal) y ±3 % arriba de eso.
--   · visitantes por página / fuente / dispositivo / país = suma de los visitantes distintos
--     de cada día (quien vuelve otro día a la misma página cuenta de nuevo).
--   · tiempo mediano de varios días = mediana de un histograma logarítmico (±10 %); el de un
--     solo día es exacto.

create table if not exists public.ca_resumen (
  dia date not null,
  dim text not null check (dim in ('total', 'pagina', 'fuente', 'dispositivo', 'pais', 'oferta', 'oferta_pagina')),
  clave text not null check (char_length(clave) <= 200),
  vistas integer not null default 0,
  visitantes integer not null default 0,
  usos integer not null default 0,
  sesiones integer not null default 0,
  tiempo_ms integer,
  hll smallint[],
  hist integer[],
  primary key (dia, dim, clave)
);

alter table public.ca_resumen enable row level security;
alter table public.ca_resumen force row level security;
revoke all on table public.ca_resumen from public, anon, authenticated;
grant select, insert, update, delete on table public.ca_resumen to service_role;

-- Mediana de un histograma de 64 cubos: el 0 es [0, 1 s) y el j es [1,2^(j-1) s, 1,2^j s).
create or replace function public.ca_hist_mediana(p_hist integer[])
returns integer
language sql
immutable
set search_path = ''
as $$
  with c as (
    select h.j - 1 as j, h.n, sum(h.n) over (order by h.j) as acum, sum(h.n) over () as total
    from unnest(p_hist) with ordinality as h(n, j)
  )
  select case
    when c.j = 0 then round(1000 * ((c.total / 2.0 - (c.acum - c.n)) / c.n))
    else round(1000 * power(1.2, c.j - 1) * power(1.2, (c.total / 2.0 - (c.acum - c.n)) / c.n))
  end::integer
  from c
  where c.n > 0 and c.acum >= c.total / 2.0
  order by c.j
  limit 1;
$$;

create or replace function public.ca_hll_estimar(p_registros smallint[])
returns integer
language sql
immutable
set search_path = ''
as $$
  with s as (
    select count(*) as m,
           sum(power(2::float8, -r.v)) as z,
           count(*) filter (where r.v = 0) as ceros
    from unnest(p_registros) as r(v)
  ),
  e as (select s.*, (0.7213 / (1 + 1.079 / s.m)) * s.m * s.m / s.z as crudo from s where s.m > 0)
  select coalesce((
    select round(case when e.crudo <= 2.5 * e.m and e.ceros > 0 then e.m * ln(e.m::float8 / e.ceros) else e.crudo end)::integer
    from e
  ), 0);
$$;

-- p_modo: 'completo' (todas las dimensiones), 'totales' (sólo la fila total, con hll e
-- histograma) o 'series' (total y usos por página, sin hll ni histograma: para cubos horarios).
create or replace function public.ca_resumen_calcular(
  p_desde timestamptz,
  p_hasta timestamptz,
  p_grano text,
  p_modo text
)
returns table (
  k timestamptz,
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
-- Los rangos de ts llegan como parámetro: con plan genérico el BRIN no se usa y cada llamada
-- barre la tabla entera. Mismo motivo en las demás funciones que filtran por rango.
set plan_cache_mode = force_custom_plan
set timezone = 'America/Argentina/Buenos_Aires'
as $$
  with
  b as materialized (
    select date_trunc(p_grano, v.ts) as k, v.ts, v.vid, v.sid, v.path, v.uso_calc as u, v.activo_ms as ms,
           v.ref_host, v.utm_source, v.utm_medium, v.dispositivo, v.pais
    from public.ca_vistas v
    where v.ts >= p_desde and v.ts < p_hasta
  ),
  por_vid as materialized (
    select b.k, b.vid, min(b.dispositivo) as d, min(b.pais) as p
    from b
    group by b.k, b.vid
  ),
  cubos as (select distinct b.k from b),
  tot as (
    select b.k, count(*)::integer as vistas, count(*) filter (where b.u)::integer as usos,
           round(percentile_cont(0.5) within group (order by b.ms) filter (where b.u))::integer as med
    from b
    group by b.k
  ),
  tot_vis as (select pv.k, count(*)::integer as n from por_vid pv group by pv.k),
  -- HyperLogLog: 10 bits del hash eligen el registro; el registro guarda el máximo de
  -- (ceros al final + 1) de los 54 bits restantes.
  hll_r as (
    select x.k, (x.h & 1023)::integer as i,
           max(case when x.w = 0 then 55 else round(ln((x.w & -x.w)::float8) / ln(2::float8))::integer + 1 end)::smallint as rho
    from (
      select pv.k, y.h, (y.h >> 10) & 18014398509481983 as w
      from por_vid pv
      cross join lateral (select pg_catalog.uuid_hash_extended(pv.vid, 0) as h) y
    ) x
    where p_modo <> 'series'
    group by 1, 2
  ),
  hll as (
    select c.k, array_agg(coalesce(r.rho, 0::smallint) order by g.i) as regs
    from cubos c
    cross join generate_series(0, 1023) as g(i)
    left join hll_r r on r.k = c.k and r.i = g.i
    where p_modo <> 'series'
    group by c.k
  ),
  hist_r as (
    select b.k,
           case when b.ms < 1000 then 0 else least(63, 1 + floor(ln(b.ms::float8 / 1000) / ln(1.2::float8))::integer) end as j,
           count(*)::integer as n
    from b
    where b.u and p_modo <> 'series'
    group by 1, 2
  ),
  hist as (
    select c.k, array_agg(coalesce(r.n, 0) order by g.j) as h
    from cubos c
    cross join generate_series(0, 63) as g(j)
    left join hist_r r on r.k = c.k and r.j = g.j
    where p_modo <> 'series'
    group by c.k
  ),
  pag as (
    select x.k, x.path, sum(x.n)::integer as vistas, count(*)::integer as visitantes, sum(x.nu)::integer as usos
    from (
      select b.k, b.path, b.vid, count(*) as n, count(*) filter (where b.u) as nu
      from b
      where p_modo = 'completo'
      group by 1, 2, 3
    ) x
    group by 1, 2
  ),
  pag_med as (
    select b.k, b.path, round(percentile_cont(0.5) within group (order by b.ms))::integer as med
    from b
    where b.u and p_modo = 'completo'
    group by 1, 2
  ),
  pag_serie as (
    select b.k, b.path, count(*)::integer as usos
    from b
    where b.u and p_modo = 'series'
    group by 1, 2
  ),
  -- ca_fuente no se puede inlinear y compila ~25 regex por llamada: materializada corre una
  -- vez por combinación distinta de ref/utm; sin materializar, el planner la posterga al
  -- agregado y la corre por vista (20 s con 50k vistas).
  refs as materialized (
    select x.r, x.s, x.m, public.ca_fuente(x.r, x.s, x.m) as f
    from (select distinct b.ref_host as r, b.utm_source as s, b.utm_medium as m from b where p_modo = 'completo') x
  ),
  -- La fuente es la de la primera vista de la sesión; la navegación interna y la vuelta de
  -- Mercado Pago (ca_fuente = null) no cuentan.
  ses as materialized (
    select b.k, b.sid, b.vid,
           coalesce((array_agg(rf.f order by b.ts) filter (where rf.f is not null))[1], 'Directo') as f,
           count(*) filter (where b.u) as usos
    from b
    join refs rf
      on coalesce(rf.r, '') = coalesce(b.ref_host, '')
     and coalesce(rf.s, '') = coalesce(b.utm_source, '')
     and coalesce(rf.m, '') = coalesce(b.utm_medium, '')
    where p_modo = 'completo'
    group by b.k, b.sid, b.vid
  ),
  fue as (
    select x.k, x.f, count(*)::integer as visitantes, sum(x.nses)::integer as sesiones, sum(x.usos)::integer as usos
    from (select s.k, s.f, s.vid, count(*) as nses, sum(s.usos) as usos from ses s group by 1, 2, 3) x
    group by 1, 2
  ),
  ofe as materialized (
    select date_trunc(p_grano, e.ts) as k, e.vid, e.path, e.producto
    from public.ca_eventos e
    where e.tipo = 'vista_oferta' and e.ts >= p_desde and e.ts < p_hasta
      and e.producto is not null and p_modo = 'completo'
  )

  select t.k, 'total', '', t.vistas, coalesce(tv.n, 0), t.usos, 0, t.med, h.regs, hi.h
  from tot t
  left join tot_vis tv on tv.k = t.k
  left join hll h on h.k = t.k
  left join hist hi on hi.k = t.k
  union all
  select p.k, 'pagina', p.path, p.vistas, p.visitantes, p.usos, 0, pm.med, null, null
  from pag p
  left join pag_med pm on pm.k = p.k and pm.path = p.path
  union all
  select ps.k, 'pagina', ps.path, 0, 0, ps.usos, 0, null, null, null
  from pag_serie ps
  union all
  select f.k, 'fuente', f.f, 0, f.visitantes, f.usos, f.sesiones, null, null, null
  from fue f
  union all
  select pv.k, 'dispositivo', coalesce(pv.d, 'desconocido'), 0, count(*)::integer, 0, 0, null, null, null
  from por_vid pv
  where p_modo = 'completo'
  group by 1, 3
  union all
  select pv.k, 'pais', coalesce(pv.p, 'desconocido'), 0, count(*)::integer, 0, 0, null, null, null
  from por_vid pv
  where p_modo = 'completo'
  group by 1, 3
  union all
  select o.k, 'oferta', o.producto, count(*)::integer, count(distinct o.vid)::integer, 0, 0, null, null, null
  from ofe o
  group by 1, 3
  union all
  select o.k, 'oferta_pagina', left(coalesce(o.path, '') || chr(31) || o.producto, 200), count(*)::integer, 0, 0, 0, null, null, null
  from ofe o
  group by 1, 3;
$$;

-- Días completos ya resumidos + crudo para lo demás (hoy, un día a medias, o un hueco si el
-- cron no corrió). Devuelve una fila por (día, dimensión, clave).
create or replace function public.ca_resumen_rango(p_desde timestamptz, p_hasta timestamptz, p_modo text)
returns table (
  dia date,
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
  select coalesce(array_agg(r.dia order by r.dia), '{}'::date[]) into v_resumidos
  from public.ca_resumen r
  where r.dim = 'total' and r.clave = ''
    and r.dia::timestamptz >= p_desde and (r.dia + 1)::timestamptz <= p_hasta and r.dia < now()::date;

  return query
    select r.dia, r.dim, r.clave, r.vistas, r.visitantes, r.usos, r.sesiones, r.tiempo_ms, r.hll, r.hist
    from public.ca_resumen r
    where r.dia = any (v_resumidos) and (p_modo = 'completo' or r.dim = 'total');

  -- Lo no resumido se lee del crudo en tramos contiguos: un primer día a medias no puede
  -- obligar a leer crudo todo el rango.
  for v_dia in
    select g.d::date from generate_series(p_desde::date::timestamp, (p_hasta - interval '1 microsecond')::date::timestamp, interval '1 day') as g(d)
  loop
    v_ini := greatest(p_desde, v_dia::timestamptz);
    v_fin := least(p_hasta, (v_dia + 1)::timestamptz);
    if v_dia = any (v_resumidos) or v_ini >= v_fin then
      if v_tramo_desde is not null then
        return query
          select c.k::date, c.dim, c.clave, c.vistas, c.visitantes, c.usos, c.sesiones, c.tiempo_ms, c.hll, c.hist
          from public.ca_resumen_calcular(v_tramo_desde, v_tramo_hasta, 'day', p_modo) c;
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
      select c.k::date, c.dim, c.clave, c.vistas, c.visitantes, c.usos, c.sesiones, c.tiempo_ms, c.hll, c.hist
      from public.ca_resumen_calcular(v_tramo_desde, v_tramo_hasta, 'day', p_modo) c;
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
  -- Dos corridas a la vez (cron + manual) se pisarían el delete/insert del mismo día.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('ca_resumir', 0));
  for v_dia in
    select g.d::date from generate_series(p_desde::timestamp, least(p_hasta, now()::date - 1)::timestamp, interval '1 day') as g(d)
  loop
    delete from public.ca_resumen r where r.dia = v_dia;
    insert into public.ca_resumen (dia, dim, clave, vistas, visitantes, usos, sesiones, tiempo_ms, hll, hist)
    select v_dia, c.dim, c.clave, c.vistas, c.visitantes, c.usos, c.sesiones, c.tiempo_ms, c.hll, c.hist
    from public.ca_resumen_calcular(v_dia::timestamptz, (v_dia + 1)::timestamptz, 'day', 'completo') c;
    -- La fila total en cero marca "día resumido" aunque no haya habido visitas.
    insert into public.ca_resumen (dia, dim, clave, tiempo_ms)
    values (v_dia, 'total', '', 0)
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

-- Pensada para correr cada hora (pg_cron o un cron de Vercel). Cada corrida re-resume los dos
-- últimos días cerrados (una vista abierta a las 23:59 se cierra después de medianoche y
-- cambia el día anterior) y rellena hasta p_tanda días faltantes, de los más nuevos a los más
-- viejos, para que ninguna corrida sea larga.
create or replace function public.ca_mantenimiento(p_dias_crudos integer default 400, p_tanda integer default 7)
returns jsonb
language plpgsql
set search_path = ''
set plan_cache_mode = force_custom_plan
set timezone = 'America/Argentina/Buenos_Aires'
as $$
declare
  v_hoy date := now()::date;
  v_corte timestamptz := now() - make_interval(days => greatest(coalesce(p_dias_crudos, 400), 30));
  v_dia date;
  v_resumidos integer := 0;
  v_limites integer;
  v_vistas integer;
  v_eventos integer;
begin
  delete from public.ca_limites where vence < now() - interval '1 minute';
  get diagnostics v_limites = row_count;
  -- En tandas: si el cron estuvo parado meses, un solo delete gigante bloquea y llena el WAL.
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
      from generate_series((v_hoy - greatest(coalesce(p_dias_crudos, 400), 30))::timestamp, (v_hoy - 3)::timestamp, interval '1 day') as g(d)
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

  return jsonb_build_object(
    'limites', v_limites, 'vistas', v_vistas, 'eventos', v_eventos,
    'dias_resumidos', v_resumidos, 'corte', v_corte
  );
end;
$$;

revoke execute on function
  public.ca_hist_mediana(integer[]),
  public.ca_hll_estimar(smallint[]),
  public.ca_resumen_calcular(timestamptz, timestamptz, text, text),
  public.ca_resumen_rango(timestamptz, timestamptz, text),
  public.ca_resumir(date, date),
  public.ca_mantenimiento(integer, integer)
from public, anon, authenticated;

grant execute on function
  public.ca_hist_mediana(integer[]),
  public.ca_hll_estimar(smallint[]),
  public.ca_resumen_calcular(timestamptz, timestamptz, text, text),
  public.ca_resumen_rango(timestamptz, timestamptz, text),
  public.ca_resumir(date, date),
  public.ca_mantenimiento(integer, integer)
to service_role;
