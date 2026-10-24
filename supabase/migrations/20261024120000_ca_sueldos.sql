-- «Sueldos reales» (calcularya.com y calcular.ar): sueldos que la gente aporta de forma anónima y
-- opcional, publicados solo como mediana y cuartiles de celdas con 10 aportes o más (k-anonimato).
-- Aditiva y re-ejecutable: una tabla, dos funciones de lectura, una de carga y un tope. No toca nada.
-- Historia y porqués: docs/decisiones/sueldos.md.

do $$
begin
  -- ca_sueldos_agregados es security definer y lee una tabla con FORCE RLS sin policies: si el dueño
  -- no bypassea RLS, no ve ninguna fila y la página dice «0 aportes» para siempre. Mejor cortar acá.
  if not exists (select 1 from pg_roles where rolname = current_user and (rolsuper or rolbypassrls)) then
    raise exception 'ca_sueldos: el rol % necesita BYPASSRLS para ser dueño de estas funciones', current_user;
  end if;
end $$;

-- Sin IP, sin user agent, sin vid, sin texto libre y sin fecha exacta: solo el mes. El id es la clave
-- de idempotencia que manda el navegador (un uuid al azar por envío que se descarta al guardarse), así
-- que no hay identity ni created_at que cuenten el orden de llegada. El monto llega redondeado a dos
-- cifras significativas y el check lo vuelve a exigir.
create table if not exists public.ca_sueldos_aportes (
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
  mes text not null check (mes ~ '^[0-9]{4}-(0[1-9]|1[0-2])$')
);
create index if not exists ca_sueldos_aportes_celda_idx on public.ca_sueldos_aportes (mercado, ocupacion, mes);

alter table public.ca_sueldos_aportes enable row level security;
alter table public.ca_sueldos_aportes force row level security;

-- Nadie fuera del servidor lee ni escribe la tabla cruda. Sin policies: anon y authenticated no tienen
-- ni el grant; service_role (el endpoint) bypassea RLS.
revoke all on table public.ca_sueldos_aportes from public, anon, authenticated;
grant select, insert, delete on table public.ca_sueldos_aportes to service_role;

-- Tope por celda y mes: una inundación de aportes plausibles desde muchas IP (lo que el límite por IP
-- no frena) no puede pasar de esto. Generoso a propósito; se sube con una migración si hace falta.
create or replace function public.ca_sueldos_tope()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  -- Serializa la celda: sin el lock, dos envíos simultáneos pasan los dos el conteo.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('ca_sueldos:' || new.mercado || ':' || new.ocupacion || ':' || new.mes, 0));
  if (
    select count(*) from public.ca_sueldos_aportes a
    where a.mercado = new.mercado and a.ocupacion = new.ocupacion and a.mes = new.mes
  ) >= 5000 then
    raise exception 'ca_sueldos_tope: la celda % % % está llena', new.mercado, new.ocupacion, new.mes
      using errcode = 'P0001';
  end if;
  return new;
end;
$$;

drop trigger if exists ca_sueldos_tope on public.ca_sueldos_aportes;
create trigger ca_sueldos_tope before insert on public.ca_sueldos_aportes
  for each row execute function public.ca_sueldos_tope();

revoke execute on function public.ca_sueldos_tope() from public, anon, authenticated;

-- Mismo redondeo que dosCifras (src/motor/sueldos/reglas.ts): lo publicado tampoco es exacto.
create or replace function public.ca_sueldos_dos_cifras(x double precision)
returns numeric
language sql
immutable
set search_path = ''
as $$
  select case when x is null or x <= 0 then null
    else round(x::numeric, 1 - floor(log(x::numeric))::int) end;
$$;

revoke execute on function public.ca_sueldos_dos_cifras(double precision) from public;
grant execute on function public.ca_sueldos_dos_cifras(double precision) to anon, authenticated, service_role;

-- La única lectura pública. Una fila por ocupación (experiencia null) y por ocupación y experiencia,
-- con la cuenta de aportes siempre (para decir «somos 6 de 10») y mediana, p25 y p75 solo si la celda
-- llega a 10 aportes DESPUÉS de sacar los atípicos (vallas de Tukey a 3 × IQR, calculadas sobre la
-- celda). Ventana: los últimos 12 meses. Una sola moneda por país (la del aporte más nuevo): si un país
-- cambia de moneda, los aportes viejos no se mezclan con los nuevos. Espejo en TypeScript:
-- cifrasDe (src/motor/sueldos/estadistica.ts); check_sueldos exige que publiquen lo mismo.
create or replace function public.ca_sueldos_agregados(p_mercado text, p_ocupacion text default null)
returns table (
  ocupacion text,
  experiencia text,
  moneda text,
  total integer,
  n integer,
  p25 numeric,
  p50 numeric,
  p75 numeric,
  desde text,
  hasta text
)
language sql
stable
security definer
set search_path = ''
as $$
  with ventana as (
    select a.ocupacion, a.experiencia, a.moneda, a.bruto_mensual::double precision as b, a.mes
    from public.ca_sueldos_aportes a
    where a.mercado = p_mercado
      and (p_ocupacion is null or a.ocupacion = p_ocupacion)
      and a.mes >= to_char((now() at time zone 'utc') - interval '11 months', 'YYYY-MM')
  ),
  vigente as (
    select v.moneda from ventana v order by v.mes desc, v.moneda limit 1
  ),
  filas as (
    select v.ocupacion, null::text as experiencia, v.b, v.mes from ventana v where v.moneda = (select moneda from vigente)
    union all
    select v.ocupacion, v.experiencia, v.b, v.mes from ventana v where v.moneda = (select moneda from vigente)
  ),
  vallas as (
    select f.ocupacion, f.experiencia, count(*) as crudos,
      percentile_cont(0.25) within group (order by f.b) as q1,
      percentile_cont(0.75) within group (order by f.b) as q3
    from filas f
    group by f.ocupacion, f.experiencia
  ),
  limpias as (
    select f.ocupacion, f.experiencia, f.b, f.mes
    from filas f
    join vallas q on q.ocupacion = f.ocupacion and q.experiencia is not distinct from f.experiencia
    where q.crudos < 4 or (f.b >= q.q1 - 3 * (q.q3 - q.q1) and f.b <= q.q3 + 3 * (q.q3 - q.q1))
  ),
  cifras as (
    select l.ocupacion, l.experiencia, count(*)::integer as n,
      percentile_cont(0.25) within group (order by l.b) as p25,
      percentile_cont(0.5) within group (order by l.b) as p50,
      percentile_cont(0.75) within group (order by l.b) as p75,
      min(l.mes) as desde,
      max(l.mes) as hasta
    from limpias l
    group by l.ocupacion, l.experiencia
  )
  -- 10 = K de src/motor/sueldos/catalogo.ts.
  select c.ocupacion, c.experiencia, (select moneda from vigente), c.n,
    case when c.n >= 10 then c.n end,
    case when c.n >= 10 then public.ca_sueldos_dos_cifras(c.p25) end,
    case when c.n >= 10 then public.ca_sueldos_dos_cifras(c.p50) end,
    case when c.n >= 10 then public.ca_sueldos_dos_cifras(c.p75) end,
    case when c.n >= 10 then c.desde end,
    case when c.n >= 10 then c.hasta end
  from cifras c
  order by c.ocupacion, c.experiencia nulls first;
$$;

revoke execute on function public.ca_sueldos_agregados(text, text) from public;
grant execute on function public.ca_sueldos_agregados(text, text) to anon, authenticated, service_role;

-- La carga, solo para el endpoint (service role): guarda el aporte (un id repetido es un reintento y
-- no suma otro) y devuelve la ocupación recién agregada, así quien aporta ve su celda al instante sin
-- esperar la caché de la página. Devuelve lo mismo que la lectura pública: nada que no se publique.
create or replace function public.ca_sueldos_aportar(
  p_id uuid,
  p_mercado text,
  p_moneda text,
  p_ocupacion text,
  p_experiencia text,
  p_bruto numeric,
  p_mes text
)
returns table (
  ocupacion text,
  experiencia text,
  moneda text,
  total integer,
  n integer,
  p25 numeric,
  p50 numeric,
  p75 numeric,
  desde text,
  hasta text
)
language plpgsql
security invoker
set search_path = ''
as $$
begin
  insert into public.ca_sueldos_aportes (id, mercado, moneda, ocupacion, experiencia, bruto_mensual, mes)
  values (p_id, p_mercado, p_moneda, p_ocupacion, p_experiencia, p_bruto, p_mes)
  on conflict (id) do nothing;
  return query select * from public.ca_sueldos_agregados(p_mercado, p_ocupacion);
end;
$$;

revoke execute on function public.ca_sueldos_aportar(uuid, text, text, text, text, numeric, text) from public, anon, authenticated;
grant execute on function public.ca_sueldos_aportar(uuid, text, text, text, text, numeric, text) to service_role;
