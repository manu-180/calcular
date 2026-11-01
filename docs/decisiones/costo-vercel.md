# Costo de calcular en Vercel

## 31/10/2026: el revalidate de 1 h costaba más que el hosting

Cuenta personal de Manuel (`manu-180`), ciclo 29/9 → 29/10/2026, calcular-ar: US$43 de US$78 de
toda la cuenta. Desglose:

| Rubro | Cantidad | US$ |
|---|---|---|
| Build CPU minutes | 10.278 min (casi todo la máquina turbo del 24-27/10, ya apagada) | 29,57 |
| ISR writes | 1,39 M | 5,45 |
| Deployment storage | 1.031 GB·día (10 deploys guardados × 10k páginas × 30 días) | 3,10 |
| Fast origin transfer | 32 GB (regeneraciones) | 1,79 |
| Fluid CPU + memoria, ISR reads, invocaciones | | ~2,0 |

En los dos primeros días del ciclo siguiente ya había **1.013.660 escrituras ISR** (US$1,50): con
`revalidate = 3600` en los layouts de `(ar)` e `(intl)`, cada una de las 10.308 páginas se
regeneraba en la primera visita de cada hora, y Vercel cobra cada regeneración en unidades de 8 KB.
Era la línea que más crecía, y la que menos se veía: ninguna página estaba mal.

### Qué se cambió

- `revalidate` 3600 → 86400 en los dos layouts y en todas las páginas que lo repetían (30 archivos).
  Quedan en 3600 `sueldos-reales` y el `sitemap`, que son una página cada uno y dependen de la foto
  diaria de sueldos.
- Cron nuevo `/api/cron/mes-nuevo` (`5 3 1 * *`, 00:05 de Argentina del día 1): `revalidatePath("/",
  "layout")`. Cubre el único motivo real del plazo corto, que el día 1 cambie el mes vigente.
- `ignoreCommand` compara contra `VERCEL_GIT_PREVIOUS_SHA` (antes `HEAD^`, que con un push de varios
  commits miraba sólo el último) y además saltea `.github` y `.claude`.
- En la cuenta: retención de deploys de producción 1 mes → 1 semana (siempre quedan los últimos 10),
  en los 46 proyectos. Lo mantiene `~/.claude/scripts/vercel-ahorro.mjs`.

### Qué no se tocó y por qué

- El prerender de las 10k páginas en el build. Generarlas a demanda ahorraría minutos de build pero
  cada visita nueva después de cada deploy sería una escritura ISR: con 40 deploys por semana sale
  más caro que los 3 minutos de build.
- `unstable_cache` de sueldos (1 h): es Data Cache, no ISR, y es una lectura.

### Cómo se mira

`envkit run -g -- node ~/.claude/scripts/vercel-ahorro.mjs --seco` imprime el gasto de 7 días por
proyecto y las escrituras ISR; la API: `GET /v1/billing/charges?from&to&teamId` (NDJSON, el
proyecto viene en `Tags.ProjectName`).
