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

## 9/11/2026: el plazo de 24 h pagaba 10.353 escrituras por día para reescribir lo mismo

Pedido del tablero de Kairo: `calcular-ar` gastó US$64,98 en 30 días contra un tope de US$17.

Lo primero fue separar lo ya resuelto de lo que seguía corriendo. **Dos tercios del número son dos
incidentes cerrados**, y la ventana de 30 días todavía los contiene:

| Rubro | US$ 30 d | Estado |
|---|---|---|
| Build CPU minutes | 35,68 | La máquina turbo del 24-29/10 (`turbo costó US$36 en 4 días`). Apagada; la prohíbe `.claude/rules/build-vercel.md` |
| Deployment storage | 6,54 | Retención 1 mes → 1 semana el 1/11. Verificado: US$0,69/día → US$0,07/día |
| ISR writes | 12,00 | **Vivo**: ~97 mil escrituras/día |
| Fast origin transfer | 4,25 | Mayormente de esas regeneraciones |
| Fluid CPU + ISR reads | 3,94 | Idem |

El ritmo real al 9/11 son **US$5,56 en 7 días (~US$24 por 30)**, y las escrituras ISR son la mitad.

### Lo que se midió

`scripts/medir_dia_a_dia.ts` resuelve cada calculadora publicable de los 143 mercados en dos fechas
y compara los valores que la página muestra. Sobre **8.594 páginas de calculadora**:

| Par de días | Cambian | % |
|---|---|---|
| 08→09/11 | 22 | 0,26 % |
| 09→10/11 | 31 | 0,36 % |
| 10→11/11 | 37 | 0,43 % |
| 14→15/11 | 8 | 0,09 % |
| 20→21/11 | 3 | 0,04 % |
| 29→30/11 | 5 | 0,06 % |
| 30/11→01/12 | 24 | 0,28 % |

Y siempre concentradas en unos pocos mercados (el 20/11, en uno solo). Es decir: el plazo de 24 h
regeneraba las 10.353 páginas todos los días, y en el 99,6 % de los casos para escribir el mismo
HTML. Cada regeneración se cobra aunque el resultado sea idéntico.

De paso, medido sobre el build: cada página prerenderizada deja **5 entradas de caché** (`.html`,
`.meta`, `.rsc` y los `.segment.rsc` del prefetch por segmento), ~310 KB en las páginas de (ar). El
prefetch por segmento no es configurable en Next 16 (ya no existe `experimental.clientSegmentCache`),
así que por ese lado no hay nada que apagar.

### Qué se cambió

- Árbol intl y embebido: `revalidate` 86400 → **259200** (3 días). Las hojas que imprimen el día
  (`i/calendario`, `i/horas`, `i/mundo`, `i/rankings`, `i/sueldos`) se quedan en 86400, que gana por
  ser el menor entre layout y página.
- `(ar)` queda en 86400: son ~170 páginas y su layout publica el meta `calcular-hoy` que leen las
  calculadoras del cliente.
- Cron nuevo **`/api/cron/dia-nuevo`** (`25 3 * * *`, 00:25 de Argentina): compara cada mercado en su
  propia fecha (`hoyEn`, igual que hreflang) y purga el subárbol de los que se movieron. Es la
  frescura real; el plazo de 3 días es sólo la red por si el cron falla.
- Se purga por **mercado**, no por página: la ruta pública de cada página pasa por los rewrites por
  host y por slug localizado, y armarla a mano es lo que se rompe en silencio. 6 mercados son ~420
  regeneraciones en el día contra 10.353, y no hay ningún slug que calcular mal.
- `scripts/check_costo_isr.ts` (lo corre `check-all`) fija los plazos archivo por archivo, que el
  layout no achique a las hojas, que el cron esté en `vercel.json`, y que el selector discrimine en
  las dos direcciones: un día contra sí mismo no cambia nada, y a un mes de distancia encuentra
  cambios. Probado rompiéndolo.

### Qué esperar

Las escrituras ISR deberían pasar de ~97 mil por día a ~14 mil (10.353/3 más lo que purgue el cron):
unos **US$10 menos por mes**, con el resto igual, deja el proyecto cerca de US$14 y por debajo del
tope de US$17. Hay que confirmarlo en la facturación, no acá: lo mira `vercel-ahorro.mjs --seco`.

### Lo que no se tocó y por qué

- El prerender de las 10k páginas: ver más arriba, generarlas a demanda sale más caro.
- La frescura de `(ar)`: 24 h ahí cuesta centavos.
- Los bots de IA del `robots.ts`: el crawl es lo que hace que las páginas se regeneren, pero la
  citabilidad en buscadores de IA es una decisión de producto, no un gasto a recortar.
