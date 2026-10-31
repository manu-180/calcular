---
paths:
  - "src/app/**"
  - "vercel.json"
---

# Cada página regenerada es una escritura que Vercel cobra

Con 10.308 páginas prerenderizadas, `revalidate` manda el costo del sitio, no sólo la frescura:

- **`revalidate` de página o layout: 86400 (24 h), nunca 3600.** El 1 h costaba más de un millón
  de escrituras ISR por día (31/10/2026: US$1,50 cada dos días y subiendo). Las únicas excepciones
  en 3600 son `sueldos-reales/page.tsx` y `src/app/sitemap.ts` (una página cada una).
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
