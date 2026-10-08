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

## Pendientes de Manuel

- Correr el SQL de la fase 2 en Supabase.
- Redirect URI de Google para calcularya.com.
- PayPal: cuenta Business y app REST (Client ID y Secret por envkit).
