-- calcular.ar + calcularya.com · «Boca en boca» del panel. Depende de 20261014120000 (ca_panel por
-- mercado), 20261023130000 y 20261023170000 (eventos del boca en boca). Re-ejecutable, sólo agrega
-- una función de lectura: no toca tablas.
--
-- Todo sale agregado: el panel nunca trae filas crudas. Un compartido y la llegada que trajo se cruzan
-- por el código `ref` (uno al azar por compartido, src/motor/compartir/ref.ts). Una llegada con el
-- mismo vid que el compartido es quien abrió su propio link: se cuenta aparte y no suma al boca en boca.
-- Las secciones de sueldos se leen sólo si la base ya tiene 20261024150000; si no, vienen en null.

set lock_timeout = '5s';

create or replace function public.ca_panel_boca(p_desde timestamptz, p_hasta timestamptz, p_mercado text default null)
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
  v_sueldos jsonb := null;
begin
  if p_desde is null or p_hasta is null or p_hasta <= p_desde then
    raise exception 'ca_panel_boca: rango inválido (% → %)', p_desde, p_hasta using errcode = '22023';
  end if;
  if p_hasta - p_desde > interval '400 days' then
    raise exception 'ca_panel_boca: el rango máximo es de 400 días' using errcode = '22023';
  end if;
  if p_mercado is not null and p_mercado !~ '^([a-z]{2}(-[a-z]{2,3})?|global)$' then
    raise exception 'ca_panel_boca: mercado inválido (%)', p_mercado using errcode = '22023';
  end if;

  -- Misma granularidad y mismo período anterior que ca_panel: las dos series se leen juntas.
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
  comp as materialized (
    select e.ts, date_trunc(v_gran, e.ts) as k, e.vid, e.vista_id, e.path, e.sitio, e.mercado,
           coalesce(e.props ->> 'canal', 'otro') as canal,
           coalesce(e.props ->> 'origen', 'otro') as origen
    from public.ca_eventos e
    where e.tipo = 'compartir' and e.ts >= p_desde and e.ts < p_hasta
      and (v_m = '*' or e.mercado = v_m)
  ),
  lleg_cruda as materialized (
    select e.ts, date_trunc(v_gran, e.ts) as k, e.vid, e.sid, e.vista_id, e.path, e.sitio, e.mercado,
           e.props ->> 'ref' as ref,
           e.props ->> 'origen' as o,
           coalesce(e.props ->> 'nuevo' = 'true', false) as nuevo
    from public.ca_eventos e
    where e.tipo = 'llegada' and e.ts >= p_desde and e.ts < p_hasta
      and (v_m = '*' or e.mercado = v_m)
  ),
  -- El compartido de cada llegada, de cuando sea (un link de hace un mes también trae gente hoy) y
  -- de cualquier sitio. Si un código se repitiera, vale el primero.
  origen_ref as materialized (
    select distinct on (e.props ->> 'ref')
           e.props ->> 'ref' as ref, e.ts, e.vid, e.path, e.sitio, e.mercado,
           coalesce(e.props ->> 'canal', 'otro') as canal,
           coalesce(e.props ->> 'origen', 'otro') as origen
    from public.ca_eventos e
    where e.tipo = 'compartir' and e.ts < p_hasta
      and e.props ->> 'ref' in (select l.ref from lleg_cruda l where l.ref is not null)
    order by e.props ->> 'ref', e.ts
  ),
  -- Usó una calculadora en la visita a la que llegó por el link (cualquier página de esa sesión).
  uso_sesion as materialized (
    select v.sid, bool_or(v.uso_calc) as uso
    from public.ca_vistas v
    where v.ts >= p_desde - interval '1 hour' and v.ts < p_hasta + interval '1 day'
      and v.sid in (select l.sid from lleg_cruda l where l.sid is not null)
    group by v.sid
  ),
  uso_vista as materialized (
    select v.id, v.uso_calc as uso
    from public.ca_vistas v
    where v.ts >= p_desde - interval '1 hour' and v.ts < p_hasta + interval '1 day'
      and v.id in (select l.vista_id from lleg_cruda l where l.vista_id is not null)
  ),
  lleg as materialized (
    select l.k, l.ref, l.nuevo,
           o.ref is not null as medido,
           coalesce(o.vid = l.vid, false) as propia,
           coalesce(o.path, l.path) as c_path,
           coalesce(o.sitio, l.sitio) as c_sitio,
           coalesce(o.mercado, l.mercado) as c_mercado,
           coalesce(o.canal, 'otro') as canal,
           coalesce(o.origen, case l.o
             when 'c' then 'calculadora' when 'm' then 'mundo' when 'd' then 'duelo' when 'r' then 'ranking'
             when 'h' then 'horas' when 's' then 'sueldos' when 'k' then 'calendario' else 'otro' end) as origen,
           o.ts as c_ts,
           coalesce(us.uso, false) or coalesce(uv.uso, false) as uso
    from lleg_cruda l
    left join origen_ref o on o.ref = l.ref
    left join uso_sesion us on us.sid = l.sid
    left join uso_vista uv on uv.id = l.vista_id
  ),
  ajenas as materialized (select * from lleg where not propia),

  resumen as (
    select jsonb_build_object(
      'compartidos', (select count(*) from comp),
      'personas', (select count(distinct c.vid) from comp c),
      'llegadas', (select count(*) from ajenas),
      'nuevas', (select count(*) from ajenas a where a.nuevo),
      'usaron', (select count(*) from ajenas a where a.uso),
      'nuevasUsaron', (select count(*) from ajenas a where a.nuevo and a.uso),
      'propias', (select count(*) from lleg l where l.propia),
      'sinCompartido', (select count(*) from ajenas a where not a.medido),
      'compartidosAntes', (select count(*) from public.ca_eventos e
        where e.tipo = 'compartir' and e.ts >= v_ant_desde and e.ts < v_ant_hasta and (v_m = '*' or e.mercado = v_m))
    ) as j
  ),
  serie as (
    select coalesce(jsonb_agg(jsonb_build_object(
             't', c.k,
             'compartidos', (select count(*) from comp x where x.k = c.k),
             'llegadas', (select count(*) from ajenas a where a.k = c.k),
             'nuevas', (select count(*) from ajenas a where a.k = c.k and a.nuevo)
           ) order by c.k), '[]'::jsonb) as j
    from cubos c
  ),
  canales as (
    select coalesce(jsonb_agg(jsonb_build_object(
             'clave', coalesce(x.clave, y.clave), 'compartidos', coalesce(x.n, 0), 'personas', coalesce(x.p, 0),
             'llegadas', coalesce(y.n, 0), 'nuevas', coalesce(y.nuevas, 0), 'usaron', coalesce(y.usaron, 0)
           ) order by coalesce(x.n, 0) desc, coalesce(y.n, 0) desc), '[]'::jsonb) as j
    from (select c.canal as clave, count(*) as n, count(distinct c.vid) as p from comp c group by 1) x
    full join (select a.canal as clave, count(*) as n, count(*) filter (where a.nuevo) as nuevas, count(*) filter (where a.uso) as usaron
               from ajenas a group by 1) y on y.clave = x.clave
  ),
  origenes as (
    select coalesce(jsonb_agg(jsonb_build_object(
             'clave', coalesce(x.clave, y.clave), 'compartidos', coalesce(x.n, 0), 'personas', coalesce(x.p, 0),
             'llegadas', coalesce(y.n, 0), 'nuevas', coalesce(y.nuevas, 0), 'usaron', coalesce(y.usaron, 0)
           ) order by coalesce(x.n, 0) desc, coalesce(y.n, 0) desc), '[]'::jsonb) as j
    from (select c.origen as clave, count(*) as n, count(distinct c.vid) as p from comp c group by 1) x
    full join (select a.origen as clave, count(*) as n, count(*) filter (where a.nuevo) as nuevas, count(*) filter (where a.uso) as usaron
               from ajenas a group by 1) y on y.clave = x.clave
  ),
  -- La llegada se anota en la página que se compartió (la del compartido; sin compartido medido, la
  -- página a la que llegó, que es la misma URL).
  paginas as (
    select coalesce(jsonb_agg(to_jsonb(p) order by p.llegadas desc, p.compartidos desc), '[]'::jsonb) as j
    from (
      select coalesce(x.path, y.path) as path, coalesce(x.sitio, y.sitio) as sitio, coalesce(x.mercado, y.mercado) as mercado,
             coalesce(x.n, 0) as compartidos, coalesce(x.p, 0) as personas,
             coalesce(y.n, 0) as llegadas, coalesce(y.nuevas, 0) as nuevas, coalesce(y.usaron, 0) as usaron
      from (select c.path, c.sitio, c.mercado, count(*) as n, count(distinct c.vid) as p
            from comp c where c.path is not null group by 1, 2, 3) x
      full join (select a.c_path as path, a.c_sitio as sitio, a.c_mercado as mercado, count(*) as n,
                        count(*) filter (where a.nuevo) as nuevas, count(*) filter (where a.uso) as usaron
                 from ajenas a where a.c_path is not null group by 1, 2, 3) y
        on y.path = x.path and y.sitio = x.sitio and y.mercado = x.mercado
      order by coalesce(y.n, 0) desc, coalesce(x.n, 0) desc
      limit 200
    ) p
  ),
  mercados as (
    select coalesce(jsonb_agg(to_jsonb(m) order by m.compartidos desc, m.llegadas desc), '[]'::jsonb) as j
    from (
      select coalesce(x.mercado, y.mercado) as mercado, coalesce(x.sitio, y.sitio) as sitio,
             coalesce(x.n, 0) as compartidos, coalesce(x.p, 0) as personas,
             coalesce(y.n, 0) as llegadas, coalesce(y.nuevas, 0) as nuevas
      from (select c.mercado, c.sitio, count(*) as n, count(distinct c.vid) as p from comp c group by 1, 2) x
      full join (select a.c_mercado as mercado, a.c_sitio as sitio, count(*) as n, count(*) filter (where a.nuevo) as nuevas
                 from ajenas a group by 1, 2) y on y.mercado = x.mercado and y.sitio = x.sitio
    ) m
  ),
  top as (
    select coalesce(jsonb_agg(to_jsonb(t) order by t.llegadas desc, t.nuevas desc, t.fecha desc), '[]'::jsonb) as j
    from (
      select a.ref, min(a.c_path) as path, min(a.c_sitio) as sitio, min(a.c_mercado) as mercado,
             min(a.canal) as canal, min(a.origen) as origen, min(a.c_ts) as fecha,
             count(*) as llegadas, count(*) filter (where a.nuevo) as nuevas, count(*) filter (where a.uso) as usaron
      from ajenas a
      where a.medido
      group by a.ref
      order by count(*) desc, count(*) filter (where a.nuevo) desc, min(a.c_ts) desc
      limit 12
    ) t
  ),

  -- A/B de la línea-puente. Exposición = una vista de sueldo neto con resultado y la variante asignada.
  -- «Siguieron» = en esa misma visita abrieron después otra página y usaron una calculadora.
  pv as materialized (
    select distinct on (coalesce(e.vista_id::text, e.id::text))
           coalesce(e.vista_id::text, e.id::text) as clave, e.vista_id, e.vid, e.sid, e.ts, e.props ->> 'v' as v
    from public.ca_eventos e
    where e.tipo = 'puente_visto' and e.ts >= p_desde and e.ts < p_hasta
      and (v_m = '*' or e.mercado = v_m)
      and e.props ->> 'v' in ('con', 'sin')
    order by coalesce(e.vista_id::text, e.id::text), e.ts
  ),
  pv_clic as materialized (
    select distinct e.vista_id
    from public.ca_eventos e
    where e.tipo = 'puente_clic' and e.ts >= p_desde and e.ts < p_hasta + interval '1 day'
      and e.vista_id in (select pv.vista_id from pv)
  ),
  pv_comp as materialized (
    select distinct e.vista_id
    from public.ca_eventos e
    where e.tipo = 'compartir' and e.ts >= p_desde and e.ts < p_hasta + interval '1 day'
      and e.vista_id in (select pv.vista_id from pv)
  ),
  pv_despues as materialized (
    select w.sid, w.ts, w.id
    from public.ca_vistas w
    where w.ts >= p_desde and w.ts < p_hasta + interval '1 day' and w.uso_calc
      and w.sid in (select pv.sid from pv where pv.sid is not null)
  ),
  puente as (
    select coalesce(jsonb_agg(to_jsonb(b) order by b.v), '[]'::jsonb) as j
    from (
      select pv.v,
             count(*) as exposiciones,
             count(distinct pv.vid) as personas,
             count(*) filter (where pv.vista_id in (select c.vista_id from pv_clic c)) as clics,
             count(*) filter (where pv.vista_id in (select c.vista_id from pv_comp c)) as compartieron,
             count(*) filter (where exists (
               select 1 from pv_despues d
               where d.sid = pv.sid and d.ts > pv.ts and d.id is distinct from pv.vista_id)) as siguieron
      from pv
      group by pv.v
    ) b
  ),

  emb as materialized (
    select v.vid, v.path, v.ref_host, v.uso_calc, v.mercado
    from public.ca_vistas v
    where v.ts >= p_desde and v.ts < p_hasta
      and (v_m = '*' or v.mercado = v_m)
      and v.path ~ '^/[a-z0-9-]+/(embed|embebido)/'
  ),
  embebidos as (
    select jsonb_build_object(
      'vistas', (select count(*) from emb),
      'visitantes', (select count(distinct e.vid) from emb e),
      'usos', (select count(*) from emb e where e.uso_calc),
      'sitios', coalesce((select jsonb_agg(to_jsonb(s) order by s.vistas desc) from (
        select coalesce(e.ref_host, '') as host, count(*) as vistas, count(distinct e.vid) as visitantes,
               count(*) filter (where e.uso_calc) as usos
        from emb e group by 1 order by 2 desc limit 30) s), '[]'::jsonb),
      'calculadoras', coalesce((select jsonb_agg(to_jsonb(c) order by c.vistas desc) from (
        select e.path, e.mercado, count(*) as vistas, count(distinct e.ref_host) as sitios,
               count(*) filter (where e.uso_calc) as usos
        from emb e group by 1, 2 order by 3 desc limit 30) c), '[]'::jsonb)
    ) as j
  ),

  afiliados as (
    select coalesce(jsonb_agg(to_jsonb(a) order by a.clics desc), '[]'::jsonb) as j
    from (
      select e.props ->> 'socio' as socio, coalesce(e.props ->> 'pais', '') as pais, e.mercado,
             count(*) as clics, count(distinct e.vid) as personas
      from public.ca_eventos e
      where e.tipo = 'afiliado_clic' and e.ts >= p_desde and e.ts < p_hasta
        and (v_m = '*' or e.mercado = v_m)
      group by 1, 2, 3
    ) a
  ),

  -- Llegadas desde redes y mensajería que no trajeron código: el boca en boca que no pasa por el botón.
  -- Es la página de entrada: la navegación interna tiene un ref_host propio y ca_fuente la descarta.
  soc as materialized (
    select public.ca_fuente(v.ref_host, v.utm_source, v.utm_medium) as fuente, v.sid, v.vid, v.uso_calc
    from public.ca_vistas v
    where v.ts >= p_desde and v.ts < p_hasta
      and (v_m = '*' or v.mercado = v_m)
      and (v.ref_host is not null or v.utm_source is not null)
  ),
  sociales as (
    select coalesce(jsonb_agg(to_jsonb(s) order by s.sesiones desc), '[]'::jsonb) as j
    from (
      select s.fuente, count(distinct s.sid) as sesiones, count(distinct s.vid) as personas,
             count(distinct s.sid) filter (where s.uso_calc) as usaron
      from soc s
      where s.fuente in ('WhatsApp', 'Facebook', 'Instagram', 'X', 'LinkedIn', 'Telegram', 'Reddit', 'TikTok', 'Email', 'Compartido')
        and s.sid not in (select l.sid from lleg_cruda l where l.sid is not null)
      group by s.fuente
    ) s
  )
  select jsonb_build_object(
    'granularidad', case v_gran when 'hour' then 'hora' else 'dia' end,
    'mercado', p_mercado,
    'resumen', (select j from resumen),
    'serie', (select j from serie),
    'canales', (select j from canales),
    'origenes', (select j from origenes),
    'paginas', (select j from paginas),
    'mercados', (select j from mercados),
    'top', (select j from top),
    'puente', (select j from puente),
    'embebidos', (select j from embebidos),
    'afiliados', (select j from afiliados),
    'sociales', (select j from sociales)
  )
  into v_out;

  -- Sólo cuentas, nunca montos. Los aportes publicados no tienen fecha, sólo el mes: se cuentan los de
  -- los meses que toca el período. Los pendientes (todavía sin publicar) sí tienen día.
  if to_regclass('public.ca_sueldos_publicados') is not null and to_regclass('public.ca_sueldos_pendientes') is not null then
    select jsonb_build_object(
      'aportes', coalesce((select jsonb_agg(to_jsonb(a) order by a.aportes + a.pendientes desc, a.mercado) from (
        select coalesce(x.mercado, y.mercado) as mercado, coalesce(x.n, 0) as aportes, coalesce(y.n, 0) as pendientes
        from (select s.mercado, count(*) as n from public.ca_sueldos_aportes s
              where s.mes >= to_char(p_desde, 'YYYY-MM') and s.mes <= to_char(p_hasta - interval '1 microsecond', 'YYYY-MM')
                and (v_m = '*' or s.mercado = v_m)
              group by 1) x
        full join (select s.mercado, count(*) as n from public.ca_sueldos_pendientes s
                   where s.dia >= (p_desde at time zone 'utc')::date and s.dia <= ((p_hasta - interval '1 microsecond') at time zone 'utc')::date
                     and (v_m = '*' or s.mercado = v_m)
                   group by 1) y on y.mercado = x.mercado
      ) a), '[]'::jsonb),
      'celdas', coalesce((select jsonb_agg(to_jsonb(c) order by c.publicadas desc, c.cerca desc, c.mercado) from (
        select s.mercado,
               count(*) filter (where s.tramo in ('10-19', '20-49', '50+')) as publicadas,
               count(*) filter (where s.tramo = 'cerca') as cerca,
               count(distinct s.ocupacion) filter (where s.tramo in ('10-19', '20-49', '50+')) as ocupaciones
        from public.ca_sueldos_publicados s
        where (v_m = '*' or s.mercado = v_m)
        group by 1
      ) c), '[]'::jsonb),
      'publicadoEl', (select e.publicado_el from public.ca_sueldos_estado e limit 1)
    ) into v_sueldos;
  end if;

  return v_out || jsonb_build_object('sueldos', v_sueldos);
end;
$$;

revoke execute on function public.ca_panel_boca(timestamptz, timestamptz, text) from public, anon, authenticated;
grant execute on function public.ca_panel_boca(timestamptz, timestamptz, text) to service_role;

notify pgrst, 'reload schema';
