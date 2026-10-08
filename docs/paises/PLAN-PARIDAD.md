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
