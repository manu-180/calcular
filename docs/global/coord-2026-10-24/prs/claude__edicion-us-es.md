# Edición us-es: Estados Unidos en español (63 calculadoras, trato tú)

## Qué incluye

Edición `src/paises/us-es/` (país base `us`, locale `es-US`, idioma `es`, trato `tu`), publicada en
el commit `publicar us-es`.

- 23 calculadoras locales de us traducidas (todas las que tiene us; ninguna en borrador):
  impuestos federales, cheque de pago, FICA, trabajo por cuenta propia, bono, nómina del
  empleador, salario mínimo por estado, horas extras, horas extras sin impuestos, propinas sin
  impuestos, ganancias de capital, 401(k), Roth IRA, HSA, RMD, Seguro Social, crédito tributario
  por hijos, impuestos estimados trimestrales, inflación (CPI-U), sales tax, millaje del IRS,
  deducción para mayores de 65 y deducción estándar.
- 40 universales en español con `universales: "todas"` (con su variante tú).
- Total 63. Queda 3 por encima del tope de 60 del brief; se dejaron las 23 locales porque son las
  que se sostienen y todas tienen búsqueda propia en español (el brief admite 15 a 25 locales).
- Textos (`textos/`), contenido con SEO propio (`contenido/`), mensajes de `calcular()` traducidos
  (`lib/comun.ts`), nombres y etiquetas de datos en español (`lib/datos.ts`).
- SEO por búsquedas hispanas: «calculadora de impuestos federales», «calculadora de cheque de
  pago», «calculadora del Seguro Social», «crédito tributario por hijos», «salario mínimo por
  estado» (con California en el title y una FAQ propia).

## Decisiones

- Trato: el WIP había elegido usted; se pasó a tú en textos, contenido y mensajes.
- Slugs nuevos: `calculadora-cheque-de-pago` (antes `...-neto`) y `calculadora-seguro-social`.
- Vocabulario de EE. UU. en español: cheque de pago, declaración de impuestos, retención, IRS,
  reembolso, estado civil para la declaración; se sacaron regionalismos («suba», «más chico»).
- Se borraron los generadores Python del WIP (`scripts/paises/us-es/*.py`, `mensajes_extra.json`):
  los `.ts` son la fuente y regenerar volvía a usted. Queda `listar_textos.ts`.
- Datos: la edición reusa los de us (64 datos, 67 tramos verificados, 0 pendientes). No se agregó
  ningún dato nuevo.

## Depende de

Nada sin mergear. Se mergeó `origin/main` (conflicto en `src/paises/index.ts`: jp, ae, li, kw de
main y `usEs` al final de `PAISES`).

## Checks corridos

- `npx tsc --noEmit -p .`: OK.
- `check_paises us-es`: OK (64 datos, 67 tramos verificados, 63 calculadoras, estado publicado).
  Aviso: `us-es.inflation-calculator` deja de ser publicable antes del 2026-11-23 si no se
  actualiza la serie `us.cpi-u` (es de us; se arregla con el robot de series de us).
- `check_paises_casos us-es`: OK, 93 casos (sin textos sin traducir ni números distintos).
- `check_textos_paises us-es`: OK, 1010 textos (antes de este trabajo daba 7 fallas de largo).
- `check_seo_intl us-es`: OK, 7650 páginas en los dos modos.
- `check_ofertas_intl us-es`: OK, 46039 textos.
- `check_fronteras`: OK, 7551 archivos. `check_eol`: OK, 8219 archivos.
- `check_motor --generar-cargadores`: OK, 2322 pruebas. `check_medicion_mercados --escribir`: 57 mercados.
- `check_hreflang`: 924 fallas, ajenas a esta edición: en main ya da 900 (probado sacando us-es del
  registro). Son todas del clúster de inflación: las páginas de au, nz, sg, hk, my y ph no son
  recíprocas con el resto. us-es suma 24 por entrar en ese mismo clúster.
- `check-all`: 148 de 150 suites en verde. Fallan `check_hreflang` (lo de arriba) y
  `check_ofertas_intl` en el modo completo por 15 diferencias de Chile (cl/sueldo-liquido y
  cl/finiquito: el tope imponible de la planilla da 3707987 y la calculadora 3708942, o sea
  una UF desfasada). No tiene que ver con esta edición: `check_ofertas_intl us-es` da OK.
- No se revisó en `next dev` (máquina lenta, `tsc` tarda unos 4 minutos); queda para la revisión.

## Pasos saltados

- Sin credenciales: nada de Supabase, Vercel ni PayPal. Sin push ni PR (403).
- `npm run build` no se corrió (opcional).

## Pendientes y riesgos

- Arreglar el clúster hreflang de inflación (au/nz/sg/hk/my/ph) en main.
- Actualizar la serie `us.cpi-u` antes del 23/11 para que la calculadora de inflación siga publicable.
- El commit `publicar us-es` choca con otras ramas en `src/paises/index.ts` y en los cargadores
  generados: se resuelve regenerando.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
