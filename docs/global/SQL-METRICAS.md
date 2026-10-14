# Métricas del mundo: SQL a correr

Migración: `supabase/migrations/20261014120000_ca_metricas_mundo.sql` (ADR 0002, D6).
La base no es accesible desde las herramientas de esta máquina: la corre Manuel. Es
re-ejecutable y no rompe nada si se corre dos veces.

## Antes

- Tienen que estar aplicadas las de antes, en orden. La última que exige es
  `20261009120000_ca_pagos_proveedor.sql`. Para ver si están:

  ```sql
  select column_name from information_schema.columns
  where table_schema = 'public' and table_name = 'ca_compras' and column_name in ('mercado', 'proveedor');
  ```

  Tienen que salir las dos filas. Si falta `mercado`, primero `20261008120000_ca_medicion_mercado.sql`;
  si falta `proveedor`, primero `20261009120000_ca_pagos_proveedor.sql`.

- Hasta que se corra, el panel sigue andando: los ingresos salen en pesos, la tabla de países no
  tiene embudo y no hay país de compra. Nada se rompe.

## Paso 1: la migración

En el SQL Editor de Supabase (proyecto de calcular.ar), pegar el archivo entero y correrlo. Tarda
unos segundos: las constraints nuevas van `NOT VALID` (no recorren las tablas) y las columnas
nuevas no tienen default.

Qué crea:

| Qué | Para qué |
|---|---|
| CHECK de `mercado` en las 7 tablas y en `ca_resumen` | acepta país (`mx`), edición (`ca-fr`) y `global` |
| `pais` en `ca_eventos`, `ca_checkouts`, `ca_compras` | país real del visitante (ISO-2 de la IP), aparte del mercado del contenido |
| `ca_compras.monto_usd` | la venta en dólares con la cotización del día |
| tabla `ca_tipo_cambio (moneda, dia, usd)` | dólares por unidad de cada moneda, del BCRA |
| tabla `ca_resumen_mercado (dia, mercado, visitantes, usaron, usos, ofertas, clics)` | embudo y ranking por país, resumido por día |
| trigger `ca_compras_completar` | completa `pais` (del checkout) y `monto_usd` al insertar o cambiar una compra |
| `ca_checkouts_atribuir` (reemplazo) | además de fuente y página, el país de la última vista del visitante |
| `ca_tipo_cambio_cargar`, `ca_usd_pendientes`, `ca_usd_de` | carga de cotizaciones y qué días faltan |
| `ca_resumen_mercado_calcular`, `_rango`, `ca_resumir_mercado` | el resumen por mercado (mismo patrón que `ca_resumen`) |
| `ca_mantenimiento` (reemplazo) | además resume por mercado, de a 28 días por corrida |
| `ca_panel` (reemplazo) | ingresos en USD, desglose por moneda, embudo intl, ranking de países |

Seguridad: las dos tablas nuevas tienen RLS `enable` y `force`, sin grants a `anon` ni
`authenticated`. Todas las funciones nuevas tienen `search_path = ''`, `revoke` de `public`, `anon`
y `authenticated`, y `execute` sólo para `service_role`. Ninguna es `security definer`.

## Paso 2: rellenar la historia (recomendado, en el mismo SQL Editor)

El cron rellena `ca_resumen_mercado` solo (28 días por hora), pero hasta que termina el panel de 30
o 90 días lee esos días del crudo y tarda más. Para dejarlo listo ya, en tandas de 90 días:

```sql
select public.ca_resumir_mercado(current_date - 90, current_date - 1);
select public.ca_resumir_mercado(current_date - 180, current_date - 91);
select public.ca_resumir_mercado(current_date - 270, current_date - 181);
select public.ca_resumir_mercado(current_date - 400, current_date - 271);
```

Cada una devuelve la cantidad de días resumidos. Si una tarda más de un minuto, partirla en dos.

## Paso 3: el tipo de cambio

Lo carga el cron horario (`/api/cron/panel-mantenimiento`) desde
`https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones`: la de hoy y la de los días con
ventas que todavía no tienen monto en dólares. No hace falta hacer nada; para no esperar al cron:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://calcular.ar/api/cron/panel-mantenimiento
```

La respuesta trae `tipoCambio.cargados` (los días cargados) y `tipoCambio.pendientes`.

Cómo se convierte: `usd = pesos por unidad de la moneda / pesos por dólar` (cotización A 3500 del
BCRA). Un día sin cotización (fin de semana, feriado) usa el día hábil anterior más cercano, hasta 7
días atrás. Si no hay ninguna, `monto_usd` queda `null` (no cero) y el panel lo muestra como venta
sin cotización. Las ventas en USD valen lo mismo en dólares, sin tabla.

## Verificar

```sql
-- 1. Constraints y columnas
select conname, convalidated from pg_constraint
where conname like 'ca\_%\_sitio\_mercado\_check' or conname like 'ca\_%\_pais\_check' order by 1;
-- 10 filas (7 de mercado y 3 de país), con convalidated = false: es a propósito (NOT VALID).

-- 2. RLS de las tablas nuevas
select relname, relrowsecurity, relforcerowsecurity from pg_class
where relname in ('ca_tipo_cambio', 'ca_resumen_mercado');
-- las dos en true, true

-- 3. Nadie más que service_role ejecuta lo nuevo
select p.proname, array_agg(distinct r.rolname order by r.rolname)
from pg_proc p
cross join lateral aclexplode(p.proacl) a
join pg_roles r on r.oid = a.grantee
where p.proname in ('ca_tipo_cambio_cargar', 'ca_usd_pendientes', 'ca_resumir_mercado', 'ca_resumen_mercado_rango', 'ca_panel')
group by 1;
-- sólo postgres y service_role

-- 4. Tipo de cambio (después del cron)
select moneda, dia, usd from public.ca_tipo_cambio where moneda in ('ARS', 'EUR', 'BRL') order by dia desc limit 6;
select count(*) filter (where monto_usd is null) as sin_usd, count(*) from public.ca_compras;

-- 5. El panel nuevo
select jsonb_pretty(public.ca_panel(now() - interval '7 days', now()) -> 'ingresos');
select jsonb_array_length(public.ca_panel(now() - interval '7 days', now()) -> 'mercados');

-- 6. Tiempos (tiene que ser bastante menos que 20 s)
explain analyze select public.ca_panel(date_trunc('day', now()) - interval '89 days', now());
```

Y en el panel (`/dashboard`): la tarjeta «Compraron» muestra «US$ … cobrados», la sección «Por
país» tiene buscador, orden por columna y el embudo del país elegido.

## Volver atrás

No hace falta para que el sitio ande: el código degrada solo. Si igual se quiere sacar, alcanza con
volver a correr `20261008120000_ca_medicion_mercado.sql` (recrea el `ca_panel` anterior) y
`20260930120100_ca_resumen.sql` (el `ca_mantenimiento` anterior). Las columnas y tablas nuevas
pueden quedar: no molestan.

## Medido

`scripts/check_panel_sql.ts` corre la migración sobre Postgres en WASM (PGlite) con datos de
prueba: contrato del JSON, RLS, grants, idempotencia, resumen igual al crudo, degradación del panel
sin la migración y el embudo de calcularya de punta a punta. Con `CA_PANEL_MUNDO=1` mide 190
mercados con 90 días resumidos: `ca_panel` de 90 días tarda unos 2,5 s con todos los países y 0,15 s
con uno (en PGlite, que es más lento que Postgres de verdad). La versión con HyperLogLog por país
tardaba 100 s: por eso el ranking cuenta personas por día.
