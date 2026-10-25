# Motor turco (tr): núcleo, venta y las 41 universales

Rama `claude/mundo-motor-tr`, basada en `origin/main` (f228b37c). No depende de ninguna rama sin mergear.

## Qué incluye

- `IDIOMAS` suma `tr`. Textos y errores del motor, calculadora, unidades sin plural (3 gün, 1,5 yıl).
- `GRAMATICA.tr`: sufijos de caso detrás del nombre del país, con apóstrofo y armonía vocálica. Locativo «Türkiye'de», «Almanya'da», «Kuveyt'te», «Fas'ta»; genitivo «Türkiye'nin», «Almanya'nın», «Peru'nun»; siglas por sus letras («ABD'de», «BAE'nin»); n pronominal en compuestos con posesivo («Dominik Cumhuriyeti'nde»); l palatal («Senegal'de»); `para` = «X için».
- Mayúsculas con el locale (la i con y sin punto): `mayusculaInicial` y `minusculaInicial` en `src/motor/formato.ts`, usadas en el menú (`nombreCorto`), la oferta secundaria (`Oferta.tsx`), las planillas (`planillas/_textos.ts`) y la carta del informe (`toLocaleLowerCase`). «iş» da «İş», no «Iş».
- Los buscadores (sitio en `src/components/buscador`, país, mundo y embed) pasan la ı a i, que NFD no descompone. `inferir.ts` reconoce «aylık» y «yıllık».
- El informe muestra los campos de porcentaje con `formatearPorcentaje` (en tr-TR, «%20» delante del número; en los demás idiomas, el formato de Intl de cada locale).
- Sitio, inicio y legales (`src/motor/i18n/tr.ts`, `inicio/tr.ts`, `legales/tr.ts`), compartir, embed y «Tu sueldo en el mundo» con la ruta nueva `/[mercado]/ulkelere-gore-maas` (page y og).
- Venta completa: `src/lib/pagos/textos/tr.ts`, todas las familias (`informe-calculo` incluida), informes, planillas, catálogo y mails. `tr` está en `IDIOMAS_VENTA`.
- Las 41 universales con `textos/tr.ts` y `contenido/tr.ts`, cableadas con `gen_idiomas_universales`. Slugs en turco ASCII con la búsqueda real: `kredi-hesaplama`, `konut-kredisi-hesaplama`, `kdv-hesaplama`, `bilesik-faiz-hesaplama`, `basit-faiz-hesaplama`, `yuzde-hesaplama`, `vucut-kitle-indeksi-hesaplama`, `tahmini-dogum-tarihi-hesaplama`, entre otros (lista completa en ADR 0002, D12). Los ejemplos se calculan.
- Edición interna `zz-tr` (Zetaland, `tr-001`, trato usted), registrada en `PAISES`.
- Reglas de texto para tr en `scripts/reglas_idioma.ts`: «sen» y sus formas inequívocas (-abilirsin, -iyorsun, -eceksin, -melisin, condicional -rsen), posesivos de «sen» en sustantivos con vocal final (kredin, paran), jerga de chat, apóstrofo tipográfico y porcentaje detrás del número.
- Mercados de prueba en `check_universales`: tr-TR con TRY, «Saint Vincent ve Grenadinler» (XCD) y «Demokratik Kongo Cumhuriyeti» (CDF, nombre largo con posesivo), con las reglas sobre toda la página.
- Casos en `check_motor`: parseo tr-TR («₺1.500.000», «%20», miles ambiguos), unidades, gramática turca, mayúsculas, y zz-tr en hermanas y ediciones.
- Documentación: ADR 0002 D12 y una sección en `docs/global/ESTADO.md`.

## Decisiones

- Un solo registro: «siz» con las formas corteses («hesaplayın», «girin», «maaşınız»), como en Garanti, İş Bankası, e-Devlet y GİB. Nunca «sen». Los botones van en imperativo corto («Hesapla», «Kodu kopyala»), como los botones de esos sitios. Mercados con `trato: "usted"`; los diccionarios escriben solo `base`.
- La entrada del ADR es D12: D9 (motor-eu), D10 (motor-ar) y D11 (motor-id) están en ramas sin mergear.
- Los diccionarios no pegan sufijos a cifras ni a valores interpolados (la armonía dependería de cómo se lee el número). La fecha va en medio de la oración («24 Ekim 2026 tarihine kadar») y los montos después de dos puntos; las cartas del informe cierran con «... toplam tutar:» antes de la cifra.
- Slug de «Tu sueldo en el mundo»: `ulkelere-gore-maas` («ülkelere göre maaş», lo que se busca), con SEO sobre «Vergi Özgürlük Günü».
- Universales neutrales de país (el turco también se usa en el norte de Chipre): sin SGK, GİB, BDDK ni DASK, sin cifras legales tipeadas; la tasa de `iva` sale del dato del país. La ayuda de crédito y tarjeta explica cómo pasar la tasa mensual (la que anuncian los bancos turcos) a anual.
- Las 41 universales se escribieron en 4 forks; revisé muestras (prestamo, iva, tarjeta-de-credito, porcentaje, dias-entre-fechas, imc) y los sufijos fijos sobre cifras literales («200'ün %15'i 30'dur», «120'nin»).

## Checks

| Check | Resultado |
|---|---|
| `npx tsc --noEmit -p .` | 0 errores |
| check_i18n | TODO OK, 19614 textos en 11 idiomas × 3 tratos |
| check_motor | TODO OK, 2331 pruebas (cargadores regenerados) |
| check_universales | 41 universales, 4497 casos ✓ |
| check_ofertas_intl | 46048 textos revisados sin fallas de tr. Da 15 FALLAS, todas de cl/sueldo-liquido y cl/finiquito (la planilla con datos de Chile difiere de la calculadora en el tope de UF, 3707987 contra 3708942); ajeno a este frente, igual que en motor-id |
| check_textos_paises zz-tr | TODO OK, 35 textos, 0 avisos |
| gen_idiomas_universales --check | index al día |
| check_fronteras | TODO OK, 7590 archivos |
| check_eol | TODO OK, 8260 archivos en LF |
| check_seo_intl | TODO OK, 7562 páginas |
| check_mundo | TODO OK, 43 países |
| check_hreflang | 900 FALLAS, todas del clúster de inflación de otros mercados (kw, my, ph...: «el clúster no lista las mismas páginas»); ninguna toca tr, zz-tr ni ulkelere-gore-maas. Ajeno a este frente, igual que en motor-id |
| check_paises | TODO OK, 59 países (98 avisos de series de otros mercados: ve, za...) |

## Puesta al día con main 7d190a68

- Merge de `origin/main` (7d190a68) sin conflictos (commit 68a7f495). Main sumó calendario laboral y fiscal, «¿Cuántas horas de trabajo cuesta?», rankings, «Sueldos reales», afiliados y medición de fugas, con `Record<Idioma, ...>` que dejaban 14 errores de tsc en `src/motor`.
- Commit 2ab6593a: diccionarios `tr` de calendario, horas, rankings, sueldos reales y afiliados; productos de horas con `tr`; slugs y rutas en turco ASCII: `maas-takvimi` (con .ics, evento y OG), `kac-saatlik-calisma`, `ulke-siralamasi` (`maasin-alim-gucu`, `vergi-ozgurluk-gunu`, `zamdan-ne-kalir`) y `gercek-maaslar`. Registro de D12: calendario, horas y rankings impersonales; sueldos y afiliados con «siz»; nada pegado a cifras, fechas ni montos. Sin fuente OG de respaldo (Geist con latin-ext cubre el turco). ADR 0002 D12 y ESTADO actualizados.
- Checks después de la puesta al día: tsc 0 errores; check_i18n TODO OK (30375 textos en 11 idiomas × 3 tratos); check_motor 2331 pruebas OK; check_universales 41 universales, 4497 casos OK; check_ofertas_intl 15 FALLAS, todas cl/sueldo-liquido y cl/finiquito (UF, ajeno); check_textos_paises zz-tr 35 textos, 0 avisos; gen_idiomas_universales --check al día; check_fronteras 7658 archivos OK; check_eol 8487 archivos OK; check_calendario 91 fechas en 20 ediciones OK; check_horas 32 países OK (1 aviso de AR); check_rankings 3 rankings, 344 filas OK; check_sueldos 15436 pasadas, 0 fallas; check_mundo OK; check_embed 59 mercados OK; check_seo_intl 7562 páginas OK; check_hreflang 1242 FALLAS, todas del clúster de inflación de otros mercados (ninguna de tr).

## Saltado

- Push y PR: no hay permiso de escritura en esta cuenta.
- Build (`npm run build`): opcional según el brief, no lo corrí.

## Pendientes y riesgos

- Falta el país Turquía (BRIEF-PAIS): brütten nete maaş hesaplama (tramos de gelir vergisi, primas de SGK y de desempleo, damga vergisi, exención del salario mínimo), kıdem ve ihbar tazminatı, KDV y asgari ücret, verificados en gib.gov.tr, sgk.gov.tr, Resmî Gazete y csgb.gov.tr.
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar. Dudas anotadas por los traductores: el espesor sugerido para una entrada de autos en hormigón («12 ile 15 cm», adaptado del valor métrico de en.ts) y la escala de notas del ejemplo de promedio (7, 8 y 9, como el modelo; en Turquía se califica sobre 100 o sobre 5).
- Al mergear junto con motor-eu, motor-ar y motor-id va a haber conflictos de una línea en `IDIOMAS`, `IDIOMAS_VENTA`, los Record de diccionarios, `SLUG_MUNDO`, `GRAMATICA`, `REGISTRO` de reglas_idioma, `TRATOS` de check_ofertas_intl y `PRUEBA` de check_universales; también en `src/paises/index.ts`, los cargadores, los index de las universales y `check_motor` (hermanas y ediciones de zz). Se resuelven sumando las listas y regenerando con `gen_idiomas_universales` y `check_motor --generar-cargadores`.
- `mayusculaInicial` cambia `nombreCorto` y la oferta secundaria para todos los idiomas (de `toUpperCase` a `toLocaleUpperCase` con el locale del mercado); fuera del turco el resultado es el mismo. El informe pasa a mostrar los porcentajes con el formato de Intl del locale.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
