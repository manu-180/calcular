-- calcular.ar · ca_panel: todo el panel /dashboard en una sola llamada (s124).
-- Depende de 20260930120000 y 20260930120100 (resumen diario). Re-ejecutable.
--
-- Contrato con src/lib/panel/datos.ts: claves en camelCase; lo que sale de TS (títulos, precio,
-- tasaUso, lecturas, rango, generado) no viene acá.

create or replace function public.ca_panel(p_desde timestamptz, p_hasta timestamptz)
returns jsonb
language plpgsql
stable
set search_path = ''
set plan_cache_mode = force_custom_plan
-- date_trunc y generate_series cortan los días a la medianoche argentina y los timestamps
-- salen en el JSON con -03:00; el TimeZone de la sesión de PostgREST (UTC) no importa.
set timezone = 'America/Argentina/Buenos_Aires'
as $$
declare
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

  v_gran := case when p_hasta - p_desde <= interval '1 day' then 'hour' else 'day' end;
  v_paso := case v_gran when 'hour' then interval '1 hour' else interval '1 day' end;
  -- El período anterior se corre días enteros: "hoy hasta las 15" se compara con "ayer hasta
  -- las 15", no con las 15 horas previas (que caerían de noche y darían siempre una suba falsa).
  v_corrimiento := make_interval(days => ceil(extract(epoch from (p_hasta - p_desde)) / 86400.0)::integer);
  v_ant_desde := p_desde - v_corrimiento;
  v_ant_hasta := p_hasta - v_corrimiento;

  with
  cubos as (
    select g.k
    from generate_series(date_trunc(v_gran, p_desde), p_hasta - interval '1 microsecond', v_paso) as g(k)
  ),
  r as materialized (select * from public.ca_resumen_rango(p_desde, p_hasta, 'completo')),
  ra as materialized (select * from public.ca_resumen_rango(v_ant_desde, v_ant_hasta, 'totales') x where x.dim = 'total'),
  -- Por hora no hay resumen: el rango es de un día como mucho y se lee del crudo.
  sh as materialized (
    select c.k, c.dim, c.clave, c.visitantes, c.usos, c.tiempo_ms
    from public.ca_resumen_calcular(p_desde, p_hasta, 'hour', 'series') c
    where v_gran = 'hour'
  ),
  ev as materialized (
    select e.ts, date_trunc(v_gran, e.ts) as k, e.vid, e.tipo, e.path, e.producto, e.props
    from public.ca_eventos e
    where e.tipo in ('cta_compra', 'dialogo_compra', 'compartir', 'busqueda')
      and e.ts >= p_desde and e.ts < p_hasta
  ),
  ck as materialized (
    select c.id, date_trunc(v_gran, c.ts) as k, c.producto, coalesce(c.pagina, c.desde) as desde
    from public.ca_checkouts c
    where c.ts >= p_desde and c.ts < p_hasta
  ),
  cp as materialized (
    select c.id, date_trunc(v_gran, c.pagado_at) as k, c.producto, c.monto, c.checkout_id
    from public.ca_compras c
    where c.estado = 'aprobado' and c.pagado_at >= p_desde and c.pagado_at < p_hasta
  ),
  cp_ck as (
    select cp.id, k.fuente, coalesce(k.pagina, k.desde) as desde
    from cp
    join public.ca_checkouts k on k.id = cp.checkout_id
  ),

  -- Un solo día: los números del día son exactos. Varios: HyperLogLog e histograma.
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
         group by e.vid) x) as inte,
      (select count(*) from public.ca_checkouts c where c.ts >= v_ant_desde and c.ts < v_ant_hasta) as cks,
      (select count(*) from public.ca_compras c
        where c.estado = 'aprobado' and c.pagado_at >= v_ant_desde and c.pagado_at < v_ant_hasta) as ven,
      (select coalesce(sum(c.monto), 0) from public.ca_compras c
        where c.estado = 'aprobado' and c.pagado_at >= v_ant_desde and c.pagado_at < v_ant_hasta) as ing
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
  cp_k as (select cp.k, count(*) as n, sum(cp.monto) as m from cp group by cp.k),
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
      jsonb_build_object('clave', 'ingresos', 'valor', (select coalesce(sum(cp.monto), 0) from cp), 'anterior', o.ing,
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
  -- Mediana de las medianas diarias, pesada por usos: con un solo día es la exacta.
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
  -- "Abrió la compra" es sólo el diálogo: cta_compra también marca links que apenas llevan a la
  -- landing, y contarlos inflaría el paso y la caída hacia Mercado Pago.
  emb_abrio as (
    select ev.producto, count(distinct ev.vid) as n
    from ev
    where ev.tipo = 'dialogo_compra' and ev.producto is not null
    group by ev.producto
  ),
  emb_ck as (select ck.producto, count(*) as n from ck group by ck.producto),
  emb_cp as (select cp.producto, count(*) as n, sum(cp.monto) as m from cp group by cp.producto),
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

  -- Los números largos se tapan: alguien que pega su CUIL en el buscador no tiene por qué
  -- quedar escrito en el panel.
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

  -- El email completo nunca sale de la base: se enmascara acá.
  compras as (
    select coalesce(jsonb_agg(jsonb_build_object(
      'id', c.mp_payment_id,
      'fecha', c.pagado_at,
      'producto', c.producto,
      'monto', c.monto,
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
      order by c.pagado_at desc, c.id desc
      limit 50
    ) c
    left join public.ca_checkouts k on k.id = c.checkout_id
  ),

  cuentas as (
    select jsonb_build_object(
      'total', (select count(*) from public.ca_perfiles),
      'nuevas', (select count(*) from public.ca_perfiles p where p.created_at >= p_desde and p.created_at < p_hasta),
      'verificadas', (select count(*) from public.ca_perfiles p where p.verificado_at is not null),
      'conCompras', (select count(distinct c.user_id) from public.ca_compras c where c.estado = 'aprobado' and c.user_id is not null),
      'perfiles', (
        select coalesce(jsonb_agg(jsonb_build_object('clave', x.clave, 'n', x.n) order by x.n desc, x.clave), '[]'::jsonb)
        from (select coalesce(p.perfil, 'sin_perfil') as clave, count(*) as n from public.ca_perfiles p group by 1) x
      )
    ) as j
  ),

  -- "En vivo" no depende del rango. Una vista abierta sin cerrar hace más de 30 min es una
  -- pestaña que se cerró sin avisar, no alguien leyendo.
  viv as materialized (
    select v.vid, v.path
    from public.ca_vistas v
    where v.ts >= now() - interval '4 hours'
      and (coalesce(v.cerrada_at, v.ts) >= now() - interval '5 minutes'
           or (v.cerrada_at is null and v.ts >= now() - interval '30 minutes'))
  ),
  vivo as (
    select jsonb_build_object(
      'ahora', (select count(distinct viv.vid) from viv),
      'paginas', (
        select coalesce(jsonb_agg(jsonb_build_object('clave', x.path, 'n', x.n) order by x.n desc, x.path), '[]'::jsonb)
        from (select viv.path, count(distinct viv.vid) as n from viv group by viv.path order by n desc, viv.path limit 10) x
      )
    ) as j
  )

  select jsonb_build_object(
    'granularidad', case v_gran when 'hour' then 'hora' else 'dia' end,
    'desde', p_desde,
    'hasta', p_hasta,
    'anteriorDesde', v_ant_desde,
    'anteriorHasta', v_ant_hasta,
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
    'vivo', (select j from vivo)
  )
  into v_out;

  return v_out;
end;
$$;

revoke execute on function public.ca_panel(timestamptz, timestamptz) from public, anon, authenticated;
grant execute on function public.ca_panel(timestamptz, timestamptz) to service_role;
