# «¿Cuántas horas de trabajo cuesta?»: cómo se arma el índice

2026-10-24. Rama `claude/fase2-horas`.

## Qué es

Para cada país del registro (más Argentina), cuántas horas de salario mínimo cuesta un producto con
precio oficial idéntico en todo el mundo. Horas = precio oficial ÷ salario mínimo por hora. Página
`/<m>/<slug>` (índice), `/<m>/<slug>/<producto>` (indexable) y `/<m>/<slug>/<producto>/<iso>` (tarjeta
para compartir, noindex, canonical al producto). OG en `/<m>/<slug>/og?p=&pais=&formato=historia`.

## Piezas

| Archivo | Qué hace |
|---|---|
| `src/motor/horas/productos.ts` | productos, URL de la tienda por país, rango razonable en PPA |
| `src/motor/horas/leer.ts` | lectura del HTML (JSON-LD de Apple, `__NEXT_DATA__` de Spotify), robots.txt |
| `src/motor/horas/minimos.ts` | qué dato del registro es el mínimo y con qué jornada pasarlo a horas |
| `src/motor/horas/calculo.ts` | conversión a hora, vencimiento (120 días), formatos de duración |
| `src/lib/horas/indice.ts` | arma el índice con registro + Argentina + precios.json; excluidos con motivo |
| `src/lib/horas/ar.ts` | Argentina: SMVM por hora del jornalizado (Res. 4/2026) |
| `src/lib/horas/precios.json` | precios leídos (generado) |
| `scripts/horas/actualizar_precios.ts` | refresco de precios |
| `scripts/check_horas.ts`, `scripts/horas/casos.ts` | tabla de incluidos/excluidos y casos |

## Productos (2026-10-23)

iPhone 17 (el base de la última generación: el iPhone 18 base todavía no salió), iPhone 18 Pro, MacBook
Air (Apple Store de cada país, `lowPrice` del JSON-LD del Product con ese nombre exacto, en la moneda que
declara la tienda) y Spotify Premium Individual (precio de lista mensual, el de «después» si hay oferta
de entrada). Descartados: Netflix (robots.txt prohíbe todo a bots que no sean buscadores o asistentes),
PlayStation 5 (cada país vende en una tienda distinta, sin formato común), Nintendo (sin tienda oficial
en la mayoría de los países). Un precio cuya conversión a dólares internacionales cae fuera del rango
del producto se descarta como mal leído.

## Salario por hora

- Si la ley fija un valor por hora, ese (US federal, CA federal, BR, GB 21+, FR, DE, NL 21+, IE, AU,
  NZ, ZA, HK, MY, PY, PA, HN, KE, TZ, AR jornalizado).
- Divisor de la norma: UY (÷ 200), LU (÷ 173).
- Mensual × 12 ÷ 52 ÷ horas semanales: CL y CO (jornada del registro), EC 40, PE 48, GT 48, DO 44,
  SV 44, BE 38, PT 40 (con 14 pagas, como Eurostat). ES: anual del real decreto ÷ 52 ÷ 40.
- Diario: CR jornada ÷ 8 (los dos del decreto); MX diario × 7 días pagados (LFT art. 69) ÷ 48 h.
- Categoría: con varias por sector o región, la de comercio de la zona principal (se muestra el nombre
  oficial del dato en las fuentes de la página).

Jornadas leídas a mano el 2026-10-23 en la fuente oficial (URL en minimos.ts). Excluidos por no poder
leerla en fuente oficial: NI, BO, PK, GH, PH. NG: la ley no fija jornada semanal. VE: el mínimo legal
(130 Bs desde 2022) no refleja el ingreso mínimo (casi todo es bono). Sin mínimo en el registro: IT, AT,
CH, SG, IN, SN, MA (borrador).

## Tipo de cambio

Si la tienda cobra en dólares en un país con moneda propia (Spotify en UY, CR, GT, DO, PY, HN...), el
precio se pasa con la serie oficial del registro cuyo id o nombre dice dólar o tipo de cambio (la de
venta si hay dos). La resolución del registro exige que esté al día; si no, el producto queda sin dato.

## Vencimiento y robustez

- Precio con más de 120 días: no se publica. Un pedido que falla por red conserva el precio anterior con
  su fecha vieja, así que si el refresco deja de correr los precios se apagan solos a los 120 días.
- Salario y jornada: vigentes hoy en la zona horaria del país (`informeHoras()` se rehace en la próxima
  medianoche de alguna zona). México sale solo el 2027-01-01 hasta cargar la jornada de 46 h.
- Todo país y celda corren en try/catch; check_horas falla con menos de 10 países o algo vencido.

## Publicación (2026-10-24, rama `claude/fase2-fix-datos`)

Una sola regla, `publicacionDe()` en `src/motor/horas/publicacion.ts`, para la página (404), la OG, el
sitemap, el hreflang, llms.txt y el selector de productos: un producto se publica con 2 países o más; el
índice, con al menos `MINIMO_PAISES` (10) y algún producto. Antes la página daba 404 cuando vencían los
precios pero el sitemap y llms.txt la seguían listando. `src/motor/mapa.ts` no puede leer los precios
(viven en `src/lib`, server-only), así que recibe la publicación por parámetro (`opciones.horas`); sin
ella no lista ninguna página de horas, nunca una de más.

**Índice contra producto inicial:** `/<m>/<slug>` y `/<m>/<slug>/<inicial>` mostraban lo mismo. Gana el
índice (es el que se enlaza y el que busca la gente sin nombrar producto): la página del producto inicial
lleva canonical al índice, sin hreflang propio, y no va al sitemap; el selector, al volver a ese producto,
deja la URL del índice. El inicial es `PRODUCTO_INICIAL` si se publica; si no, el primero publicado.

OG de horas: `s-maxage=86400` (un día): muestra horas que cambian con cada refresco.

## check_horas y el paso del tiempo

Que venzan los precios no es falla (las páginas se apagan solas): es un aviso ⚠️ desde 30 días antes
de cada vencimiento. Falla por datos: algo vencido publicado, horas que no cierran, o que con los precios
al día de su última lectura (`construirInformeHoras(ahora, { preciosAl })`) queden menos de 10 países o un
producto en menos de 2. También falla si el sitemap lista una página que no se publica u omite una que sí.
`CALCULAR_HOY=2027-02-21 npx tsx scripts/check_horas.ts`: 0 países, 5 avisos, exit 0, sitemap sin horas.

## Refresco automático (ronda mensual)

`scripts/cron/mensual.ts` corre `scripts/horas/actualizar_precios.ts` (solo si `precios.json` no es del
mes, o con `--forzar`) y `scripts/rankings/foto_mensual.ts` (idempotente), valida con check_horas y
check_rankings y, si cambió algo, commitea solo `src/lib/horas/precios.json` y
`src/motor/rankings/historial/` con autor manu-180 y pushea a main (rebase sobre origin/main, 3 intentos),
igual que datos-vivos: main no está protegida y el push es el deploy. `--dry` muestra qué haría
(`CALCULARYA_CRON_MES=2026-11` simula el mes).

- **PC (hoy):** tarea programada de Windows `CalcularYa-Mensual`, día 1 a las 06:17, «ejecutar lo antes
  posible si se perdió». La registra `scripts/cron/registrar-tarea.ps1` (copia `mensual.ps1` a
  `%LOCALAPPDATA%\calcularya-cron\`). `mensual.ps1` deja el worktree propio
  `C:\MisProyectos\Armagedon\calcular-cron-mensual` en origin/main limpio, hace `npm ci` si cambió el
  lock y corre `mensual.ts`. Logs en `%LOCALAPPDATA%\calcularya-cron\logs\`.
- **Actions (cuando vuelva el billing):** `.github/workflows/mensual.yml`, día 1 15:17 UTC (6 h después
  que la PC). Un job sin permisos de escritura corre `mensual.ts --sin-publicar` y sube los datos; otro
  con `contents: write` y sin npm ci los commitea.
- **Sin doble commit:** idempotencia por contenido. El segundo corredor ve los precios ya leídos en el
  mes y la foto hecha, no cambia nada y no commitea; si igual difiere, el rebase choca y se queda con lo
  que ya está en main.

Si la ronda no corre nunca, el vencimiento de 120 días garantiza que no se muestre un precio viejo:
la página, el sitemap y llms.txt sacan horas el mismo día.

## Argentina: el aviso de vencimiento mensual (2026-10-24, rama `claude/fase3-pendientes`)

`minimoAr` pone `vigenteHasta` al último día del mes porque el SMVM cambia todos los meses; check_horas
avisaba «vence el 2026-10-31; sin el tramo nuevo el país sale» cada mes aunque la Res. 4/2026 (B.O.
2/9/2026, leída de nuevo el 2026-10-24 en boletinoficial.gob.ar/detalleAviso/primera/346775/20260902:
noviembre 2026 = $398.800, $1.994 por hora) ya fija la escala hasta abril de 2027. Ahora el aviso solo sale
si el país no está en el índice armado al día siguiente del vencimiento (con los precios congelados): un
tramo siguiente ya cargado no es aviso, en ningún país. El aviso real de AR llega en abril de 2027 (escala
hasta 2027-04-30); ahí hay que cargar la resolución nueva en `src/data/desempleo.ts`. Casos en
`scripts/horas/casos.ts`.
