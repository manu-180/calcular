# calcularya.com igual a calcular.ar (plan de paridad)

Pedido de Manuel (8/10/2026): calcularya.com tiene que ser calcular.ar para el resto de los países.
Misma experiencia, verde, mismo logo, mismo menú, cuenta, planillas a la venta, las calculadoras más
usadas de AR adaptadas a cada ley, y el panel de admin con filtro por país.

Rama: `claude/calcularya-paridad`. Invariante de siempre: `scripts/check_rutas_ar.ts --start` idéntico.

## Decisiones

- Marca: CalcularYa con el logo de calcular.ar (mosaico esmeralda con «=»), texto `Calcular` + `Ya` en esmeralda.
- Tema: el de calcular.ar (blanco/zinc, acento esmeralda, Geist). Se retematiza `src/motor/ui/estilos.css`
  (tokens `--cy-*`) en vez de reescribir las páginas intl.
- Shell: header con menú por categorías, buscador, cuenta y drawer móvil, igual que `SiteHeader`. El menú
  de cada país sale del registro (categorías por concepto), no de `src/data/navegacion.ts`.
- Argentina aparece en el selector de país y lleva a calcular.ar.
- Cuentas: mismo Supabase, mismo usuario en los dos sitios, sesión separada por dominio (no se puede
  compartir cookie entre .ar y .com). `origenDelSitio()` y `destinoSeguro()` pasan a depender del host.
  Google OAuth necesita `https://calcularya.com/auth/google/vuelta` como redirect URI (lo carga Manuel).
- Cobro intl: capa de pago con proveedor intercambiable. PayPal ahora (cuenta Business + app REST de
  Manuel), Stripe después cambiando configuración. Precios en USD.
- Medición: `ca_vistas`, `ca_eventos`, `ca_checkouts`, `ca_compras`, `ca_opiniones`, `ca_perfiles`,
  `ca_calculos`, `ca_resumen` ganan columna `sitio` (`ar` por defecto) y `mercado`. `ca_panel` recibe
  `p_mercado`. La base de calcular no es accesible por MCP: el SQL lo corre Manuel.
- Panel: selector de país (Todos, Argentina, cada país) y comparativa por país.

## Fases

1. Selector con Argentina, tema verde, logo, header y footer iguales (sin backend). Deploy apenas pasa.
2. Medición intl (Rastreador + `/api/e` en el host intl) y migración `sitio`/`mercado`; panel con filtro.
3. Cuentas en calcularya (login, registro, Google, cuenta, opiniones, cálculos guardados).
4. Capa de pago + PayPal; catálogo intl en USD.
5. Planillas por país (primero sueldo y liquidación) y calculadoras faltantes respecto del top de AR
   (trabajo doméstico, régimen simplificado, inflación) donde haya fuente primaria.

## Fase 3 (cuentas), cómo quedó

- calcularya.com sirve `/login`, `/registro`, `/recuperar`, `/auth/*` y `/cuenta/*` con su shell, desde
  `src/app/(intl)/intl/[mercado]/(cuenta)` (sólo `global`; `/mx/login` es 404). Llegan por un rewrite de
  `src/motor/hosts.ts` que existe sólo con `NEXT_PUBLIC_CUENTAS_ACTIVAS=1`; apagadas, siguen yendo a calcular.ar.
  `/dashboard` sigue sólo en calcular.ar.
- Páginas y formularios son los mismos componentes de AR (`src/components/cuenta/paginas/*`), con los textos de
  `src/lib/cuenta/textos.ts` (AR idéntico a antes; CalcularYa en tú, «correo», «contraseña»).
- El sitio sale del Host (`src/lib/auth/sitio.ts`): origen de mails y de Google de una lista cerrada, destino
  después de entrar siempre un path propio. Gate: `scripts/check_cuentas_sitio.ts`.
- `sitio`/`mercado` se anotan desde el servidor en perfil (al nacer), cálculos, opiniones y eventos; antes de la
  migración de la fase 2 se guardan sin esas columnas.

## Pendientes de Manuel

- Correr el SQL de la fase 2 en Supabase.
- Redirect URI de Google para calcularya.com: en Google Cloud, el mismo cliente OAuth de calcular.ar, sumar
  `https://calcularya.com/auth/google/vuelta` en «URI de redireccionamiento autorizados» (y
  `https://calcularya.com` en orígenes). Después, `NEXT_PUBLIC_GOOGLE_INTL_ACTIVO=1` en Vercel: hasta entonces
  calcularya no muestra el botón de Google y el ingreso con correo anda igual.
- PayPal: cuenta Business y app REST (Client ID y Secret por envkit).

## Estado al 8/10 21:25 (pausa pedida por Manuel, se retoma 9/10 00:25)

Integrado en `claude/calcularya-paridad`: fase 1 (shell), fase 2 (medición y panel), fase 3 (cuentas),
fase 4 (pagos PayPal), planillas de las 16 países (USD 7) y calculadoras nuevas de UY PY BO EC CR PA DO
SV HN NI VE. `tsc` y `check_motor` verdes después del último merge.

Falta para cerrar:
1. Integrar `claude/paridad-calc-g1` (MX CO CL PE; el agente quedó pausado con WIP commiteado) y
   regenerar cargadores (`npx tsx scripts/check_motor.ts --generar-cargadores`).
2. Link a `/<m>/planillas` en header y footer intl cuando el país tiene producto (`src/motor/ui/menu.ts`,
   `src/components/shell/*`, `productosDeMercado`).
3. Gate completo: check-all, build, `check_rutas_ar` contra una foto regrabada desde `origin/main` actual
   (las 5 diferencias de plazo fijo son datos de datos-vivos, no código), `check_routing_hosts --start`
   con build `NEXT_PUBLIC_SITIO_INTL_URL=https://calcularya.com VERCEL_ENV=preview NEXT_PUBLIC_CUENTAS_ACTIVAS=1`.
4. Revisión final (code-reviewer + security-auditor), PR a main, merge y deploy (Manuel lo pidió).
5. Pasarle a Manuel: SQL fase 2 y SQL pagos, URI de Google + `NEXT_PUBLIC_GOOGLE_INTL_ACTIVO=1`, PayPal.

## Cierre (9/10/2026)

Pasos 1 a 4 hechos: calculadoras de MX CO CL PE integradas, Planillas en el menú y el pie, revisión de
seguridad y de código con 13 arreglos aplicados, gate verde (check-all 135/135, `check_rutas_ar` idéntico
contra una foto grabada desde main, `check_routing_hosts` 69 filas, `check_seo_intl` 524 páginas).

Pendiente de Manuel (no bloquea el deploy; todo degrada sin romper):
1. ~~SQL en Supabase~~ **Aplicado** (verificado 10/10; el de ofertas, `SQL-OFERTAS.md`, el 12/10). Hasta entonces el panel muestra solo Todos/Argentina y lo de
   calcularya no se guarda en las tablas de medición.
2. Google: URI `https://calcularya.com/auth/google/vuelta` (y origen `https://calcularya.com`) en el mismo
   cliente OAuth; después `NEXT_PUBLIC_GOOGLE_INTL_ACTIVO=1` en Vercel Production y redeploy.
3. ~~PayPal~~ **Hecho el 12/10/2026** con la app live de APEX (ver `ESTADO.md` § Tanda 2).

Mantenimiento a vigilar: `ni.ipc` y `do.ipc` sin detector automático (cargar el mes a mano con
`scripts/paises/do/actualizar_ipc.ts --escribir`; NI a mano desde el XLS del INIDE). Pedidos al motor
abiertos: requisito de serie con historial, `Http` con POST y binario, detectores de norma sobre series.
