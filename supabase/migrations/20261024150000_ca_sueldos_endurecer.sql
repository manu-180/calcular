-- «Sueldos reales», segunda vuelta: cierra la diferenciación (comparar la celda antes y después de un
-- aporte) y el envenenamiento de la mediana. Aditiva y re-ejecutable sobre 20261024120000_ca_sueldos.
-- Historia y porqués: docs/decisiones/sueldos.md (sección «Endurecimiento»).
--
-- Flujo nuevo:
--   1. ca_sueldos_sumar (service role) guarda el aporte en ca_sueldos_pendientes con el día UTC, después
--      de los topes por huella de IP y por celda y día. No devuelve nada.
--   2. ca_sueldos_publicar, como mucho una vez por día UTC (pg_cron si existe; si no, la primera lectura
--      del día), pasa los pendientes de días ANTERIORES a ca_sueldos_aportes (sin fecha), suma cuántos
--      días distintos tuvo cada celda en cada mes, borra las huellas y rehace la foto ca_sueldos_publicados.
--   3. ca_sueldos_leer y ca_sueldos_paises (service role) leen solo la foto. Ni anon ni authenticated
--      ejecutan nada de esto: la lectura pública es el Route Handler cacheado.

do $$
begin
  if not exists (select 1 from pg_roles where rolname = current_user and (rolsuper or rolbypassrls)) then
    raise exception 'ca_sueldos: el rol % necesita BYPASSRLS para ser dueño de estas funciones', current_user;
  end if;
end $$;

-- ───────────── lo que reemplaza esta migración ─────────────

-- La lectura en vivo sobre la tabla cruda (concedida a anon) y la carga que devolvía la celda recién
-- recalculada eran las dos puertas de la diferenciación. Se borran: nada las reemplaza con la misma forma.
drop function if exists public.ca_sueldos_aportar(uuid, text, text, text, text, numeric, text);
drop function if exists public.ca_sueldos_agregados(text, text);

-- El tope por celda y mes pasa a ser por celda y día dentro de ca_sueldos_sumar. Como trigger sobre
-- ca_sueldos_aportes habría tirado abajo la publicación entera (que inserta en lote) si una celda se llenaba.
drop trigger if exists ca_sueldos_tope on public.ca_sueldos_aportes;
drop function if exists public.ca_sueldos_tope();

-- ───────────── tablas ─────────────

-- Aportes del día, hasta la publicación siguiente. Es la única tabla con el día: al publicarse, la fila
-- pasa a ca_sueldos_aportes con solo el mes, y esta se borra.
create table if not exists public.ca_sueldos_pendientes (
  id uuid primary key,
  mercado text not null check (mercado ~ '^[a-z]{2,3}$'),
  moneda text not null check (moneda ~ '^[A-Z]{3}$'),
  ocupacion text not null check (ocupacion ~ '^[a-z][a-z-]{1,39}$'),
  experiencia text not null check (experiencia in ('0-2', '3-5', '6-10', '11+')),
  bruto_mensual numeric not null check (
    bruto_mensual > 0
    and bruto_mensual < 1e15
    and bruto_mensual = round(bruto_mensual, 1 - floor(log(bruto_mensual))::int)
  ),
  mes text not null check (mes ~ '^[0-9]{4}-(0[1-9]|1[0-2])$'),
  dia date not null,
  check (mes = to_char(dia, 'YYYY-MM'))
);
create index if not exists ca_sueldos_pendientes_celda_idx on public.ca_sueldos_pendientes (mercado, ocupacion, dia);
create index if not exists ca_sueldos_pendientes_dia_idx on public.ca_sueldos_pendientes (dia);

-- Huella de la conexión: HMAC de la IP con una clave que deriva del secreto del servidor y del día (la
-- calcula el endpoint; la IP nunca llega a la base). Sirve solo para los topes del día y se borra al
-- cerrarlo (lo hacen ca_sueldos_publicar y ca_sueldos_sumar, lo primero que pase). Nunca se publica.
create table if not exists public.ca_sueldos_huellas (
  huella text not null check (huella ~ '^[A-Za-z0-9_-]{16,64}$'),
  dia date not null,
  mercado text not null,
  ocupacion text not null,
  primary key (huella, dia, mercado, ocupacion)
);
create index if not exists ca_sueldos_huellas_dia_idx on public.ca_sueldos_huellas (dia);

-- Cuántos días distintos recibió aportes cada celda en cada mes (experiencia '' = la ocupación entera).
-- Solo cuentas, ninguna fecha: alcanza para exigir que una celda junte aportes de varios días.
create table if not exists public.ca_sueldos_dias (
  mercado text not null,
  ocupacion text not null,
  experiencia text not null,
  mes text not null,
  dias integer not null check (dias > 0),
  primary key (mercado, ocupacion, experiencia, mes)
);

-- La foto pública, rehecha como mucho una vez por día. tramo: 'lejos' y 'cerca' = todavía no se
-- publica (sin cifras); '10-19', '20-49', '50+' = publicada. La cuenta exacta no sale de la base.
create table if not exists public.ca_sueldos_publicados (
  mercado text not null,
  ocupacion text not null,
  experiencia text not null,
  moneda text not null,
  tramo text not null check (tramo in ('lejos', 'cerca', '10-19', '20-49', '50+')),
  p25 numeric,
  p50 numeric,
  p75 numeric,
  desde text,
  hasta text,
  primary key (mercado, ocupacion, experiencia),
  check ((tramo in ('lejos', 'cerca')) = (p50 is null)),
  check ((p50 is null) = (p25 is null) and (p50 is null) = (p75 is null))
);

create table if not exists public.ca_sueldos_estado (
  id boolean primary key default true check (id),
  publicado_el date
);
insert into public.ca_sueldos_estado (id, publicado_el) values (true, null) on conflict (id) do nothing;

-- Mismo encierro que ca_sueldos_aportes: FORCE RLS sin policies y sin grants para anon ni
-- authenticated (Supabase les concede todo en cada tabla nueva por default privileges).
do $$
declare t text;
begin
  foreach t in array array['ca_sueldos_pendientes', 'ca_sueldos_huellas', 'ca_sueldos_dias', 'ca_sueldos_publicados', 'ca_sueldos_estado'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('alter table public.%I force row level security', t);
    execute format('revoke all on table public.%I from public, anon, authenticated, service_role', t);
    execute format('grant select on table public.%I to service_role', t);
  end loop;
end $$;

-- ───────────── cálculo ─────────────

-- Redondeo de lo publicado: al múltiplo más cercano del paso (el 5 % de la mediana, a una cifra
-- significativa) y después a dos cifras significativas. Un aporte mueve el percentil crudo menos que ese
-- paso, así que el número publicado casi nunca cambia por uno solo. El paso va a una cifra porque si no
-- la grilla misma se corre con cada movimiento chico de la mediana. Espejo: redondearPublicado
-- (src/motor/sueldos/estadistica.ts).
create or replace function public.ca_sueldos_redondear(x double precision, mediana double precision)
returns numeric
language sql
immutable
set search_path = ''
as $$
  select case when x is null or x <= 0 or mediana is null or mediana <= 0 then null
    else public.ca_sueldos_dos_cifras((greatest(round(x::numeric / s.paso), 1) * s.paso)::double precision) end
  from (
    select round(m.v, -floor(log(m.v))::int) as paso
    from (select mediana::numeric * 0.05 as v) m
  ) s;
$$;

-- Una fila por ocupación (experiencia '') y por ocupación y experiencia de un país, con lo que va a la
-- foto. Ventana: 12 meses hasta p_hoy. Una sola moneda (la del aporte más nuevo). Atípicos: vallas a
-- 3 × IQR, con el IQR nunca por debajo del 10 % de la mediana; sin ese piso, 30 aportes iguales dejan
-- IQR 0 y borran a todos los demás. Se publica con K = 10 (src/motor/sueldos/catalogo.ts) aportes que
-- sobreviven, de al menos 3 días y 2 meses distintos. Espejo: celdaDe (src/motor/sueldos/estadistica.ts).
create or replace function public.ca_sueldos_calcular(p_mercado text, p_hoy date)
returns table (
  ocupacion text,
  experiencia text,
  moneda text,
  tramo text,
  p25 numeric,
  p50 numeric,
  p75 numeric,
  desde text,
  hasta text
)
language sql
stable
set search_path = ''
as $$
  with ventana as (
    select a.ocupacion, a.experiencia, a.moneda, a.bruto_mensual::double precision as b, a.mes
    from public.ca_sueldos_aportes a
    where a.mercado = p_mercado
      and a.mes >= to_char(p_hoy - interval '11 months', 'YYYY-MM')
      and a.mes <= to_char(p_hoy, 'YYYY-MM')
  ),
  vigente as (
    select v.moneda from ventana v order by v.mes desc, v.moneda limit 1
  ),
  filas as (
    select v.ocupacion, ''::text as experiencia, v.b, v.mes from ventana v where v.moneda = (select x.moneda from vigente x)
    union all
    select v.ocupacion, v.experiencia, v.b, v.mes from ventana v where v.moneda = (select x.moneda from vigente x)
  ),
  vallas as (
    select f.ocupacion, f.experiencia, count(*) as crudos,
      percentile_cont(0.25) within group (order by f.b) as q1,
      percentile_cont(0.5) within group (order by f.b) as q2,
      percentile_cont(0.75) within group (order by f.b) as q3
    from filas f
    group by f.ocupacion, f.experiencia
  ),
  limpias as (
    select f.ocupacion, f.experiencia, f.b, f.mes
    from filas f
    join vallas q on q.ocupacion = f.ocupacion and q.experiencia = f.experiencia
    where q.crudos < 4
      or (f.b >= q.q1 - 3 * greatest(q.q3 - q.q1, 0.1 * q.q2) and f.b <= q.q3 + 3 * greatest(q.q3 - q.q1, 0.1 * q.q2))
  ),
  cifras as (
    select l.ocupacion, l.experiencia, count(*)::integer as n, count(distinct l.mes)::integer as meses,
      percentile_cont(0.25) within group (order by l.b) as p25,
      percentile_cont(0.5) within group (order by l.b) as p50,
      percentile_cont(0.75) within group (order by l.b) as p75,
      min(l.mes) as desde,
      max(l.mes) as hasta
    from limpias l
    group by l.ocupacion, l.experiencia
  ),
  dias as (
    select d.ocupacion, d.experiencia, sum(d.dias)::integer as dias
    from public.ca_sueldos_dias d
    where d.mercado = p_mercado
      and d.mes >= to_char(p_hoy - interval '11 months', 'YYYY-MM')
      and d.mes <= to_char(p_hoy, 'YYYY-MM')
    group by d.ocupacion, d.experiencia
  ),
  juicio as (
    -- 10 = K, 3 días, 2 meses: los mismos números que src/motor/sueldos/catalogo.ts.
    select c.*, (c.n >= 10 and coalesce(d.dias, 0) >= 3 and c.meses >= 2) as publica
    from cifras c
    left join dias d on d.ocupacion = c.ocupacion and d.experiencia = c.experiencia
  )
  select j.ocupacion, j.experiencia, (select x.moneda from vigente x),
    case
      when j.publica then case when j.n >= 50 then '50+' when j.n >= 20 then '20-49' else '10-19' end
      when j.n >= 7 then 'cerca'
      else 'lejos'
    end,
    case when j.publica then public.ca_sueldos_redondear(j.p25, j.p50) end,
    case when j.publica then public.ca_sueldos_redondear(j.p50, j.p50) end,
    case when j.publica then public.ca_sueldos_redondear(j.p75, j.p50) end,
    case when j.publica then j.desde end,
    case when j.publica then j.hasta end
  from juicio j
  order by j.ocupacion, j.experiencia;
$$;

-- ───────────── publicación diaria ─────────────

-- Devuelve true si publicó. Sin p_forzar, una vez por día UTC. El candado 'ca_sueldos:publicar' es
-- exclusivo acá y compartido en ca_sueldos_sumar: no se publica con un aporte a medio guardar, y el día
-- se lee con clock_timestamp() DESPUÉS de tomarlo (con now(), un aporte empezado a las 23:59:59 que
-- termina después de la publicación entraría con el día ya cerrado y ese día se contaría dos veces).
create or replace function public.ca_sueldos_publicar(p_forzar boolean default false)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_hoy date;
begin
  if not p_forzar and exists (
    select 1 from public.ca_sueldos_estado e where e.publicado_el >= (pg_catalog.clock_timestamp() at time zone 'utc')::date
  ) then
    return false;
  end if;
  if not pg_catalog.pg_try_advisory_xact_lock(pg_catalog.hashtextextended('ca_sueldos:publicar', 0)) then
    return false;
  end if;
  v_hoy := (pg_catalog.clock_timestamp() at time zone 'utc')::date;
  if not p_forzar and exists (select 1 from public.ca_sueldos_estado e where e.publicado_el >= v_hoy) then
    return false;
  end if;

  -- Cada día que se pasa se publica una sola vez (los de un lote son todos posteriores a la publicación
  -- anterior), así que sumar los días distintos del lote cuenta días distintos de verdad.
  insert into public.ca_sueldos_dias as d (mercado, ocupacion, experiencia, mes, dias)
  select p.mercado, p.ocupacion, x.experiencia, p.mes, count(distinct p.dia)::integer
  from public.ca_sueldos_pendientes p
  cross join lateral (values (p.experiencia), ('')) as x(experiencia)
  where p.dia < v_hoy
  group by p.mercado, p.ocupacion, x.experiencia, p.mes
  on conflict (mercado, ocupacion, experiencia, mes) do update set dias = d.dias + excluded.dias;

  insert into public.ca_sueldos_aportes (id, mercado, moneda, ocupacion, experiencia, bruto_mensual, mes)
  select p.id, p.mercado, p.moneda, p.ocupacion, p.experiencia, p.bruto_mensual, p.mes
  from public.ca_sueldos_pendientes p
  where p.dia < v_hoy
  on conflict (id) do nothing;

  delete from public.ca_sueldos_pendientes p where p.dia < v_hoy;
  delete from public.ca_sueldos_huellas h where h.dia < v_hoy;

  delete from public.ca_sueldos_publicados;
  insert into public.ca_sueldos_publicados (mercado, ocupacion, experiencia, moneda, tramo, p25, p50, p75, desde, hasta)
  select m.mercado, c.ocupacion, c.experiencia, c.moneda, c.tramo, c.p25, c.p50, c.p75, c.desde, c.hasta
  from (select distinct a.mercado from public.ca_sueldos_aportes a) m
  cross join lateral public.ca_sueldos_calcular(m.mercado, v_hoy) c
  where c.moneda is not null;

  update public.ca_sueldos_estado set publicado_el = v_hoy where id;
  return true;
end;
$$;

-- Publica si hace falta sin dejar caer la lectura: si la publicación falla, se sirve la foto anterior.
create or replace function public.ca_sueldos_al_dia()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.ca_sueldos_publicar(false);
exception when others then
  raise warning 'ca_sueldos_publicar: % %', sqlstate, sqlerrm;
end;
$$;

-- ───────────── carga ─────────────

-- Solo para el endpoint (service role). Un id repetido es un reintento: no suma ni choca con los topes.
-- Topes del día UTC: 3 aportes por huella, 1 por huella y celda (país, ocupación), 30 por celda. Todo
-- rechazo es P0001 y el endpoint lo devuelve igual que cualquier otro.
create or replace function public.ca_sueldos_sumar(
  p_id uuid,
  p_mercado text,
  p_moneda text,
  p_ocupacion text,
  p_experiencia text,
  p_bruto numeric,
  p_huella text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_dia date;
begin
  if p_huella is null or p_huella !~ '^[A-Za-z0-9_-]{16,64}$' then
    raise exception 'ca_sueldos_sumar: huella' using errcode = 'P0001';
  end if;
  perform pg_catalog.pg_advisory_xact_lock_shared(pg_catalog.hashtextextended('ca_sueldos:publicar', 0));
  v_dia := (pg_catalog.clock_timestamp() at time zone 'utc')::date;
  -- Primero la huella y después la celda, siempre en ese orden: dos envíos no se pueden trabar en cruz.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('ca_sueldos:h:' || p_huella || ':' || v_dia::text, 0));
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('ca_sueldos:c:' || p_mercado || ':' || p_ocupacion || ':' || v_dia::text, 0));

  if exists (select 1 from public.ca_sueldos_pendientes p where p.id = p_id)
    or exists (select 1 from public.ca_sueldos_aportes a where a.id = p_id) then
    return;
  end if;

  delete from public.ca_sueldos_huellas h where h.dia < v_dia;

  if (select count(*) from public.ca_sueldos_huellas h where h.huella = p_huella and h.dia = v_dia) >= 3 then
    raise exception 'ca_sueldos_sumar: tope de la huella' using errcode = 'P0001';
  end if;
  if exists (
    select 1 from public.ca_sueldos_huellas h
    where h.huella = p_huella and h.dia = v_dia and h.mercado = p_mercado and h.ocupacion = p_ocupacion
  ) then
    raise exception 'ca_sueldos_sumar: tope de la huella en la celda' using errcode = 'P0001';
  end if;
  if (
    select count(*) from public.ca_sueldos_pendientes p
    where p.mercado = p_mercado and p.ocupacion = p_ocupacion and p.dia = v_dia
  ) >= 30 then
    raise exception 'ca_sueldos_sumar: tope de la celda' using errcode = 'P0001';
  end if;

  insert into public.ca_sueldos_pendientes (id, mercado, moneda, ocupacion, experiencia, bruto_mensual, mes, dia)
  values (p_id, p_mercado, p_moneda, p_ocupacion, p_experiencia, p_bruto, to_char(v_dia, 'YYYY-MM'), v_dia);
  insert into public.ca_sueldos_huellas (huella, dia, mercado, ocupacion) values (p_huella, v_dia, p_mercado, p_ocupacion);
end;
$$;

-- ───────────── lectura (solo service role) ─────────────

-- Lo que ve la página de un país: la foto, con experiencia null para la fila de la ocupación.
create or replace function public.ca_sueldos_leer(p_mercado text)
returns table (
  ocupacion text,
  experiencia text,
  moneda text,
  tramo text,
  p25 numeric,
  p50 numeric,
  p75 numeric,
  desde text,
  hasta text
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.ca_sueldos_al_dia();
  return query
    select p.ocupacion, nullif(p.experiencia, ''), p.moneda, p.tramo, p.p25, p.p50, p.p75, p.desde, p.hasta
    from public.ca_sueldos_publicados p
    where p.mercado = p_mercado
    order by p.ocupacion, p.experiencia;
end;
$$;

-- Países con al menos una ocupación publicada: lo que entra al sitemap.
create or replace function public.ca_sueldos_paises()
returns table (mercado text)
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.ca_sueldos_al_dia();
  return query
    select distinct p.mercado from public.ca_sueldos_publicados p where p.p50 is not null order by p.mercado;
end;
$$;

-- Supabase concede EXECUTE a anon en cada función nueva: se revoca de todas y se concede solo lo que
-- usa el servidor.
revoke execute on function public.ca_sueldos_redondear(double precision, double precision) from public, anon, authenticated, service_role;
revoke execute on function public.ca_sueldos_calcular(text, date) from public, anon, authenticated, service_role;
revoke execute on function public.ca_sueldos_publicar(boolean) from public, anon, authenticated;
revoke execute on function public.ca_sueldos_al_dia() from public, anon, authenticated, service_role;
revoke execute on function public.ca_sueldos_sumar(uuid, text, text, text, text, numeric, text) from public, anon, authenticated;
revoke execute on function public.ca_sueldos_leer(text) from public, anon, authenticated;
revoke execute on function public.ca_sueldos_paises() from public, anon, authenticated;
grant execute on function public.ca_sueldos_publicar(boolean) to service_role;
grant execute on function public.ca_sueldos_sumar(uuid, text, text, text, text, numeric, text) to service_role;
grant execute on function public.ca_sueldos_leer(text) to service_role;
grant execute on function public.ca_sueldos_paises() to service_role;

-- Con pg_cron, la publicación corre sola a las 00:07 UTC (y la huella del día se borra a esa hora aunque
-- nadie lea). Sin pg_cron (o si falla), la primera lectura del día publica: no depende del cron.
do $$
begin
  if exists (select 1 from pg_catalog.pg_extension where extname = 'pg_cron') then
    perform cron.schedule('ca-sueldos-publicar', '7 0 * * *', 'select public.ca_sueldos_publicar(false)');
  end if;
exception when others then
  raise notice 'ca_sueldos: sin pg_cron (%), publica la primera lectura del día', sqlerrm;
end $$;
