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

## Cómo agendar el refresco

GitHub Actions está frenado por billing. Hoy: correr a mano o por el Horno
`npx tsx scripts/horas/actualizar_precios.ts`, revisar `npx tsx scripts/check_horas.ts` y commitear
`src/lib/horas/precios.json`. Cuando vuelva Actions, este workflow (`.github/workflows/horas-precios.yml`)
lo hace cada 30 días, muy por debajo de los 120 de vencimiento:

```yaml
name: horas-precios
on:
  schedule: [{ cron: "17 6 1 * *" }]
  workflow_dispatch: {}
permissions: { contents: write }
jobs:
  precios:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npx tsx scripts/horas/actualizar_precios.ts
      - run: npx tsx scripts/check_horas.ts
      - run: |
          git config user.name "manu-180"
          git config user.email "157671390+manu-180@users.noreply.github.com"
          git add src/lib/horas/precios.json
          git diff --cached --quiet || git commit -m "datos(horas): precios oficiales del $(date -u +%F)" && git push
```

Si el workflow no corre nunca, el vencimiento garantiza que no se muestre un precio viejo: los productos
se apagan a los 120 días y la página muestra solo lo vigente (check_horas lo vigila).
