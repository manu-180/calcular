# Motor indonesio (id): núcleo, venta y las 41 universales

Rama `claude/mundo-motor-id`, basada en `origin/main` (f228b37c). No depende de ninguna rama sin mergear.

## Qué incluye

- `IDIOMAS` suma `id`. Textos y errores del motor, calculadora, unidades sin plural (3 hari, 1,5 tahun), `GRAMATICA.id` (sin artículos: «Kalkulator Indonesia», «di Indonesia», «untuk Indonesia»).
- Sitio, inicio y legales (`src/motor/i18n/id.ts`, `inicio/id.ts`, `legales/id.ts`), compartir, embed y «Tu sueldo en el mundo» con la ruta nueva `/[mercado]/gaji-di-dunia` (page y og).
- Venta completa: `src/lib/pagos/textos/id.ts`, con las 27 familias (`informe-calculo` incluida), informes, planillas, catálogo y mails. `id` está en `IDIOMAS_VENTA`.
- Las 41 universales con `textos/id.ts` y `contenido/id.ts`, cableadas con `gen_idiomas_universales`. Los slugs son lo que se busca en Indonesia: `kalkulator-kpr`, `kalkulator-pinjaman`, `kalkulator-ppn`, `kalkulator-hpl`, `kalkulator-masa-subur`, `kalkulator-patungan`, `kalkulator-bep`, entre otros. Todos los ejemplos se calculan.
- Edición interna `zz-id` (Zetaland, `id-001`, trato usted), registrada en `PAISES`.
- Reglas de texto para id en `scripts/reglas_idioma.ts`: atrapan kamu, aku, gue y lo, la jerga de chat, «anda» en minúscula y los posesivos con -mu.
- Mercados de prueba en `check_universales`: id-ID con IDR (escala 16000) y «Saint Vincent dan Grenadine».
- Casos de id-ID en `check_motor`: parseo, miles ambiguos, unidades y zz-id en las ediciones.
- Documentación: ADR 0002 D11 y una sección en `docs/global/ESTADO.md`.

## Decisiones

- Hay un solo registro: «Anda» con mayúscula, como en BCA, Mandiri, OJK y DJP Online. Sin «kamu» ni jerga. Los mercados van con `trato: "usted"`, como ja/ko/zh, y los diccionarios escriben solo `base`.
- La entrada del ADR es D11, no D10. D9 es de `claude/mundo-motor-eu` y D10 de `claude/mundo-motor-ar`, las dos sin mergear. Así no chocan los números al mergear.
- La rupia sale sin decimales, que es como la formatea Intl en id-ID. `parsearNumero` no cambió, porque id-ID usa punto de miles y coma decimal, igual que es-CO.
- En las universales se usa el vocabulario de Indonesia (PPN, KPR, HPP, BEP, HPHT/HPL). No hay cifras legales tipeadas ni organismos. La tasa de `iva` sale del dato del país.

## Checks

| Check | Resultado |
|---|---|
| `npx tsc --noEmit -p .` | 0 errores |
| check_i18n | TODO OK, 19614 textos en 11 idiomas × 3 tratos |
| check_motor | TODO OK, 2325 pruebas (cargadores regenerados) |
| check_universales | 41 universales, 4330 casos ✓ |
| check_ofertas_intl | 46048 textos revisados sin fallas de id. Da 15 FALLAS, todas de cl/sueldo-liquido y cl/finiquito: la planilla con datos de Chile difiere de la calculadora en el tope de UF (3707987 contra 3708942). Es ajeno a este frente |
| check_textos_paises zz-id | TODO OK, 35 textos, 0 avisos |
| gen_idiomas_universales --check | index al día |
| check_fronteras | TODO OK, 7590 archivos |
| check_eol | TODO OK |
| check_mundo | TODO OK, 43 países |
| check_paises | TODO OK, 59 países (98 avisos, de za y otros mercados) |
| check_seo_intl | TODO OK, 7562 páginas |
| check_hreflang | 900 FALLAS, todas del clúster de inflación de otros mercados (inflation-calculator, inflacion, inflationsrechner...: «el clúster no lista las mismas páginas» entre za, ve, kw, au, sg...). Ninguna toca id, zz-id ni gaji-di-dunia; es ajeno a este frente (series de inflación de otros países) |

## Puesta al día con main 7d190a68

Merge de `origin/main` (7d190a68) sin conflictos en 4e7f0d9b; textos en c2186ba6. Diccionarios completados en indonesio:
calendario laboral y fiscal (`kalender-gaji`, con .ics y OG), «¿Cuántas horas de trabajo cuesta?» (`berapa-jam-kerja`,
«Berapa jam kerja untuk membelinya?», y `conArticulo` de los cuatro productos), rankings (`peringkat-negara`:
`gaji-paling-bernilai`, `hari-bebas-pajak`, `sisa-kenaikan-gaji`), «Sueldos reales» (`gaji-sebenarnya`, 35 ocupaciones)
y afiliados (Wise, Deel). Rutas por idioma en `src/app/(intl)/intl/[mercado]/` como las de tr. ADR 0002 D11 y ESTADO
actualizados.

| Check | Resultado |
|---|---|
| tsc | 0 errores |
| check_i18n | TODO OK, 30375 textos en 11 idiomas × 3 tratos |
| check_motor | TODO OK, 2325 pruebas |
| check_universales | 41 universales, 4330 casos ✓ |
| check_ofertas_intl | 15 FALLAS, todas de cl (tope UF), ajenas |
| check_textos_paises zz-id | TODO OK, 35 textos, 0 avisos |
| gen_idiomas_universales --check | index al día |
| check_fronteras | TODO OK, 7658 archivos |
| check_eol | TODO OK |
| check_calendario | TODO OK, 91 fechas en 20 ediciones, .ics válidos |
| check_horas | OK, 32 países, 1 aviso (AR vence el 31/10) |
| check_rankings | TODO OK, 3 rankings, 344 filas, 43 países, 116 ediciones |
| check_sueldos | 15436 pasadas, 0 fallas |
| check_mundo | TODO OK |
| check_embed | TODO OK, 59 mercados |
| check-all | corrido sobre `claude/pais-id` con este motor mergeado (ver su PR) |

## Saltado

- Push y PR: no hay permiso de escritura en esta cuenta.
- Build (`npm run build`): opcional según el brief, no lo corrí.

## Pendientes y riesgos

- Falta el país Indonesia, con PPh 21 TER, BPJS, UMP/UMK, PPN, THR y pesangon verificados en fuentes oficiales.
- Hace falta que un hablante nativo revise una muestra de páginas antes de publicar.
- Al mergear junto con motor-eu y motor-ar va a haber conflictos en `IDIOMAS` y en los Record de diccionarios: son de una línea cada uno.
- También en `src/paises/index.ts`, en los cargadores, en los index de las universales y en `check_motor` (listas de hermanas y ediciones de zz). Se resuelven sumando las dos listas y regenerando con `gen_idiomas_universales` y `check_motor --generar-cargadores`.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
