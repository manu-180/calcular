-- calcular.ar + calcularya.com · dónde se pierde la gente. Depende de 20261014120000. Re-ejecutable.
-- Suma a cada vista: si llegó a un resultado y en cuánto, el último campo que tocó, clics de rabia,
-- los Web Vitals de la carga y la variante de cada experimento que vio. ca_fugas arma lo que lee el
-- informe semanal (scripts/medicion/informe.ts). Diseño y uso: docs/decisiones/medicion-fugas.md.

set lock_timeout = '5s';

alter table public.ca_vistas
  add column if not exists resultado_ms integer check (resultado_ms between 0 and 14400000),
  add column if not exists campo_ult text check (char_length(campo_ult) <= 40),
  add column if not exists rabia smallint check (rabia between 0 and 1000),
  add column if not exists rabia_el text check (char_length(rabia_el) <= 80),
  add column if not exists lcp_ms integer check (lcp_ms between 0 and 120000),
  add column if not exists inp_ms integer check (inp_ms between 0 and 120000),
  add column if not exists cls_milli integer check (cls_milli between 0 and 100000),
  add column if not exists ttfb_ms integer check (ttfb_ms between 0 and 120000),
  add column if not exists lcp_el text check (char_length(lcp_el) <= 80),
  add column if not exists inp_el text check (char_length(inp_el) <= 80),
  add column if not exists exp jsonb check (exp is null or (jsonb_typeof(exp) = 'object' and octet_length(exp::text) <= 200));

create or replace function public.ca_acotar(p_x integer, p_max integer)
returns integer
language sql
immutable
set search_path = ''
as $$
  select case when p_x is null then null else least(greatest(p_x, 0), p_max) end;
$$;

-- Todo es opcional: un lote puede traer sólo los vitals de una vista que ya cerró, o sólo su cierre.
-- greatest/coalesce ignoran los null, así que un dato que no vino nunca pisa al que ya estaba.
create or replace function public.ca_cerrar_vista2(
  p_id uuid,
  p_activo_ms integer default null,
  p_interacciones integer default null,
  p_scroll integer default null,
  p_uso boolean default null,
  p_resultado_ms integer default null,
  p_campo_ult text default null,
  p_rabia integer default null,
  p_rabia_el text default null,
  p_lcp_ms integer default null,
  p_inp_ms integer default null,
  p_cls_milli integer default null,
  p_ttfb_ms integer default null,
  p_lcp_el text default null,
  p_inp_el text default null
)
returns boolean
language plpgsql
set search_path = ''
as $$
begin
  update public.ca_vistas v set
    activo_ms = greatest(v.activo_ms, public.ca_acotar(p_activo_ms, 14400000)),
    interacciones = greatest(v.interacciones, public.ca_acotar(p_interacciones, 1000000)),
    scroll_pct = greatest(v.scroll_pct, public.ca_acotar(p_scroll, 100)::smallint),
    uso_calc = v.uso_calc or coalesce(p_uso, false),
    resultado_ms = coalesce(v.resultado_ms, public.ca_acotar(p_resultado_ms, 14400000)),
    campo_ult = coalesce(left(p_campo_ult, 40), v.campo_ult),
    rabia = greatest(v.rabia, public.ca_acotar(p_rabia, 1000)::smallint),
    rabia_el = coalesce(v.rabia_el, left(p_rabia_el, 80)),
    -- LCP se reporta más de una vez mientras carga: vale el último. INP y CLS sólo crecen.
    lcp_ms = coalesce(public.ca_acotar(p_lcp_ms, 120000), v.lcp_ms),
    lcp_el = case when p_lcp_ms is not null then coalesce(left(p_lcp_el, 80), v.lcp_el) else v.lcp_el end,
    inp_el = case when p_inp_ms is not null and p_inp_ms >= coalesce(v.inp_ms, 0) then coalesce(left(p_inp_el, 80), v.inp_el) else v.inp_el end,
    inp_ms = greatest(v.inp_ms, public.ca_acotar(p_inp_ms, 120000)),
    cls_milli = greatest(v.cls_milli, public.ca_acotar(p_cls_milli, 100000)),
    ttfb_ms = coalesce(v.ttfb_ms, public.ca_acotar(p_ttfb_ms, 120000)),
    cerrada_at = case when p_activo_ms is not null then now() else v.cerrada_at end
  where v.id = p_id
    and v.ts > now() - interval '1 day';
  return found;
end;
$$;

-- Una vista es una página abierta; una sesión, la visita entera (sid). Acción = algo que deja valor:
-- compartir, copiar, guardar, imprimir, descargar, ir a comprar o cruzar el puente a otra calculadora.
create or replace function public.ca_fugas(p_desde timestamptz, p_hasta timestamptz, p_min_vistas integer default 5)
returns jsonb
language sql
stable
set search_path = ''
set plan_cache_mode = force_custom_plan
set timezone = 'America/Argentina/Buenos_Aires'
as $$
  with
  v as materialized (
    select x.*,
           row_number() over (partition by x.sid order by x.ts) = 1 as entrada,
           row_number() over (partition by x.sid order by x.ts desc) = 1 as salida,
           count(*) over (partition by x.sid) as n_sesion
    from public.ca_vistas x
    where x.ts >= p_desde and x.ts < p_hasta
  ),
  -- Errores que no son nuestros: extensiones (billeteras cripto), navegadores in-app que inyectan
  -- scripts (xbrowser, swbrowser) y puentes de webviews Android. Contarlos inventa fugas.
  ruido as (
    select '(xbrowser|swbrowser|metamask|ethereum|java object is gone|__load is not defined|webkit\.messagehandlers|_autofillcallbackhandler|gmo is not defined|instantsearchsdkjsbridge)' as re
  ),
  ev as materialized (
    select e.vista_id, e.tipo, e.props
    from public.ca_eventos e, ruido
    where e.ts >= p_desde and e.ts < p_hasta + interval '1 day' and e.vista_id is not null
      and not (e.tipo = 'error' and coalesce(e.props ->> 'm', '') ~* ruido.re)
  ),
  acc as (
    select ev.vista_id, bool_or(ev.tipo in ('compartir', 'copiar_resultado', 'guardar_calculo', 'imprimir', 'descarga', 'cta_compra', 'puente_clic', 'suscripcion', 'checkout')) as accion,
           bool_or(ev.tipo in ('cta_compra', 'dialogo_compra', 'checkout')) as compra,
           count(*) filter (where ev.tipo = 'error') as errores
    from ev
    group by ev.vista_id
  ),
  vv as materialized (
    select v.*, coalesce(acc.accion, false) as accion, coalesce(acc.compra, false) as compra, coalesce(acc.errores, 0) as errores
    from v left join acc on acc.vista_id = v.id
  ),
  paginas as (
    select vv.sitio, vv.mercado, vv.path,
           count(*) as vistas,
           count(distinct vv.vid) as visitantes,
           count(*) filter (where vv.entrada) as entradas,
           count(*) filter (where vv.entrada and vv.n_sesion = 1 and not vv.uso_calc and not vv.accion and vv.activo_ms < 10000) as rebotes,
           count(*) filter (where vv.uso_calc) as usos,
           -- Antes de esta migración nadie medía resultados: el paso uso→resultado se mide sobre los usos
           -- que ya traen campo_ult (todo uso medido desde entonces lo trae).
           count(*) filter (where vv.uso_calc and vv.campo_ult is not null) as usos_medidos,
           count(*) filter (where vv.resultado_ms is not null) as resultados,
           count(*) filter (where vv.accion) as acciones,
           count(*) filter (where vv.compra) as compras,
           count(*) filter (where vv.salida) as salidas,
           count(*) filter (where vv.rabia > 0) as con_rabia,
           count(*) filter (where vv.errores > 0) as con_error,
           count(*) filter (where vv.dispositivo = 'movil') as movil,
           round(percentile_cont(0.5) within group (order by vv.scroll_pct))::integer as scroll_p50,
           round(percentile_cont(0.5) within group (order by vv.activo_ms) filter (where vv.uso_calc))::integer as activo_p50,
           round(percentile_cont(0.5) within group (order by vv.resultado_ms) filter (where vv.resultado_ms is not null))::integer as resultado_p50,
           round(percentile_cont(0.75) within group (order by vv.lcp_ms) filter (where vv.dispositivo = 'movil'))::integer as lcp_p75_movil,
           round(percentile_cont(0.75) within group (order by vv.lcp_ms) filter (where vv.dispositivo <> 'movil'))::integer as lcp_p75_escritorio,
           round(percentile_cont(0.75) within group (order by vv.inp_ms))::integer as inp_p75,
           round(percentile_cont(0.75) within group (order by vv.cls_milli))::integer as cls_p75_milli,
           round(percentile_cont(0.75) within group (order by vv.ttfb_ms))::integer as ttfb_p75,
           count(vv.lcp_ms) as con_vitals
    from vv
    group by vv.sitio, vv.mercado, vv.path
  ),
  campos as (
    select vv.sitio, vv.mercado, vv.path, vv.campo_ult as campo, count(*) as n
    from vv
    where vv.uso_calc and vv.resultado_ms is null and vv.campo_ult is not null
    group by 1, 2, 3, 4
  ),
  rabia as (
    select vv.sitio, vv.mercado, vv.path, vv.rabia_el as el, count(*) as n
    from vv where vv.rabia > 0 and vv.rabia_el is not null
    group by 1, 2, 3, 4
  ),
  lentos as (
    select vv.sitio, vv.mercado, vv.path, coalesce(vv.lcp_el, '?') as el, count(*) as n
    from vv where vv.lcp_ms > 2500
    group by 1, 2, 3, 4
  ),
  trabados as (
    select vv.sitio, vv.mercado, vv.path, coalesce(vv.inp_el, '?') as el, count(*) as n
    from vv where vv.inp_ms > 200
    group by 1, 2, 3, 4
  ),
  errores as (
    select x.sitio, x.mercado, x.path, left(x.props ->> 'm', 120) as m, count(*) as n
    from public.ca_eventos x, ruido
    where x.ts >= p_desde and x.ts < p_hasta and x.tipo = 'error' and coalesce(x.props ->> 'm', '') !~* ruido.re
    group by 1, 2, 3, 4
  ),
  exp as (
    select vv.sitio, e.key as exp, e.value as variante,
           count(*) as vistas, count(distinct vv.vid) as visitantes,
           count(*) filter (where vv.uso_calc) as usos,
           count(*) filter (where vv.resultado_ms is not null) as resultados,
           count(*) filter (where vv.accion) as acciones,
           count(*) filter (where vv.compra) as compras,
           count(*) filter (where vv.entrada and vv.n_sesion = 1 and not vv.uso_calc and not vv.accion and vv.activo_ms < 10000) as rebotes,
           count(*) filter (where vv.entrada) as entradas
    from vv, jsonb_each_text(vv.exp) e
    where vv.exp is not null
    group by 1, 2, 3
  ),
  mercados as (
    select vv.sitio, vv.mercado,
           count(distinct vv.sid) as sesiones,
           count(distinct vv.vid) as visitantes,
           count(*) as vistas,
           count(*) filter (where vv.entrada and vv.n_sesion = 1 and not vv.uso_calc and not vv.accion and vv.activo_ms < 10000) as rebotes,
           count(*) filter (where vv.uso_calc) as usos,
           count(*) filter (where vv.uso_calc and vv.campo_ult is not null) as usos_medidos,
           count(*) filter (where vv.resultado_ms is not null) as resultados,
           count(*) filter (where vv.accion) as acciones,
           count(*) filter (where vv.compra) as compras,
           count(*) filter (where vv.dispositivo = 'movil') as movil
    from vv
    group by 1, 2
  )
  select jsonb_build_object(
    'desde', p_desde,
    'hasta', p_hasta,
    'mercados', coalesce((select jsonb_agg(to_jsonb(m) order by m.sesiones desc) from mercados m), '[]'::jsonb),
    'paginas', coalesce((select jsonb_agg(to_jsonb(p) order by p.vistas desc) from paginas p where p.vistas >= p_min_vistas), '[]'::jsonb),
    'campos', coalesce((select jsonb_agg(to_jsonb(c) order by c.n desc) from (select * from campos order by n desc limit 300) c), '[]'::jsonb),
    'rabia', coalesce((select jsonb_agg(to_jsonb(r) order by r.n desc) from (select * from rabia order by n desc limit 100) r), '[]'::jsonb),
    'lentos', coalesce((select jsonb_agg(to_jsonb(l) order by l.n desc) from (select * from lentos order by n desc limit 100) l), '[]'::jsonb),
    'trabados', coalesce((select jsonb_agg(to_jsonb(t) order by t.n desc) from (select * from trabados order by n desc limit 100) t), '[]'::jsonb),
    'errores', coalesce((select jsonb_agg(to_jsonb(e) order by e.n desc) from (select * from errores order by n desc limit 60) e), '[]'::jsonb),
    'experimentos', coalesce((select jsonb_agg(to_jsonb(x)) from exp x), '[]'::jsonb)
  );
$$;

revoke execute on function
  public.ca_acotar(integer, integer),
  public.ca_cerrar_vista2(uuid, integer, integer, integer, boolean, integer, text, integer, text, integer, integer, integer, integer, text, text),
  public.ca_fugas(timestamptz, timestamptz, integer)
from public, anon, authenticated;

grant execute on function
  public.ca_acotar(integer, integer),
  public.ca_cerrar_vista2(uuid, integer, integer, integer, boolean, integer, text, integer, text, integer, integer, integer, integer, text, text),
  public.ca_fugas(timestamptz, timestamptz, integer)
to service_role;
