---
paths:
  - "src/app/**"
  - "vercel.json"
---

# Cada página regenerada es una escritura que Vercel cobra

Con 10.308 páginas prerenderizadas, `revalidate` manda el costo del sitio, no sólo la frescura:

- **`revalidate` nunca 3600.** El 1 h costaba más de un millón de escrituras ISR por día
  (31/10/2026: US$1,50 cada dos días y subiendo). Las únicas excepciones en 3600 son
  `sueldos-reales/page.tsx` y `src/app/sitemap.ts` (una página cada una).
- **(ar): 86400 (24 h).** Son ~170 páginas (centavos) y su layout publica el meta `calcular-hoy` que
  usan las calculadoras del cliente: bajar la frescura ahí sí se nota y no ahorra nada.
- **Árbol intl y embebido: 259200 (3 días), y la frescura la da `/api/cron/dia-nuevo`** (9/11/2026).
  Medido con `scripts/medir_dia_a_dia.ts` sobre las 8.594 páginas de calculadora: de un día al otro
  cambian entre 3 y 37 (0,04 %-0,43 %), siempre concentradas en unos pocos mercados. Con 24 h se
  pagaban las 10.353 todos los días para reescribir HTML idéntico. El cron compara cada mercado en
  su propia fecha (`src/motor/purga.ts`) y purga el subárbol de los que se movieron; el plazo de 3
  días es sólo la red por si el cron falla. Lo verifica `scripts/check_costo_isr.ts`.
- **Las páginas intl que imprimen el día se quedan en 86400**: `i/calendario` (días hasta el evento),
  `i/horas`, `i/mundo` (la grilla se rehace con el día del país), `i/rankings` y `i/sueldos` (la foto
  diaria). Next toma el **menor** entre layout y página, así que el 86400 de la hoja gana sobre el
  259200 del layout: por eso alcanza con marcar la hoja.
- **El cambio de mes no lo da el revalidate, lo da `/api/cron/mes-nuevo`** (`vercel.json`, el día 1
  a las 00:05 de Argentina): purga todo el árbol con `revalidatePath("/", "layout")` y cada página
  se rearma una vez en su próxima visita. Si una página necesita cambiar en una fecha fija, se
  suma un cron que la purgue, no se baja el plazo de todas.
- **Nada de `fetch` sin cache ni `dynamic = "force-dynamic"` en páginas públicas**: cada pedido
  sería una invocación más transferencia. Lo dinámico queda en cuenta, informes y planillas.
- **Un deploy de producción cuesta ~6 min de máquina y rearma las 10k páginas.** Los commits se
  juntan; no se pushea a `main` por cada ajuste. Docs, `.github` y `.claude` no construyen
  (`scripts/vercel-ignorar.sh`).
- **Los previews son opt-in**: una rama sólo construye si el mensaje del commit lleva `[preview]`.
  Para probar un cambio alcanza con `npm run build` local o el CI; el preview es para cuando hace
  falta una URL.

Historia y números: `docs/decisiones/costo-vercel.md`.
