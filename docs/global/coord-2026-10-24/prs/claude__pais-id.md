# Indonesia (id): 23 calculadoras locales en indonesio y publicación

**Depende de `claude/mundo-motor-id`** (motor indonesio, ADR 0002 D11, sin mergear). Esta rama sale de
ese motor (`git checkout -b claude/pais-id claude/mundo-motor-id`) y ya incluye `origin/main` al
24/10/2026. Mergear primero el motor.

## Qué incluye

`src/paises/id/` completo: mercado (`id`, `ID`, `id-ID`, trato `usted` con «Anda», IDR, escala 16000,
Asia/Jakarta, redondeo a rupia entera, 12 provincias como regiones), `datos.json` (58 datos: 66 tramos
verificados, 3 no verificados), `series.json` (JISDOR diario y inflación anual del IHK, ambos de
bi.go.id), detectores (2 series y 18 normas: fichas de JDIH Kemenkeu y JDIH Kemnaker), 2 novedades
(PP 20/2026 para UMKM y UMP 2026), y el commit `publicar id` (alta al final de `PAISES`, cargadores y
registro de medición regenerados).

Calculadoras locales (23; 22 publicadas, 1 en borrador):

| slug | concepto | fuente principal |
|---|---|---|
| kalkulator-gaji-bersih | sueldo-neto | PP 58/2023 (TER), PMK 168/2023, PP 44/45/46 de 2015, Perpres 64/2020 |
| kalkulator-pph-21 | impuesto-renta | UU 7/2021 Pasal 17, PMK 101/2016 (PTKP), PMK 168/2023 (caso oficial Tuan A) |
| kalkulator-ter-pph-21 | propio | PP 58/2023 Lampiran A, B y C (casos oficiales de PMK 168/2023) |
| kalkulator-pph-21-bukan-pegawai | retencion-honorarios | PMK 168/2023 (caso oficial Tuan V) |
| kalkulator-gross-up-pph-21 | propio | PP 58/2023 |
| kalkulator-pajak-pesangon | propio | PP 68/2009 (pesangon y JHT sekaligus) |
| kalkulator-bpjs-ketenagakerjaan | aportes-seguridad-social | PP 44, 45 y 46 de 2015 |
| kalkulator-bpjs-kesehatan | propio | Perpres 64/2020 |
| kalkulator-biaya-karyawan | costo-empleador | PP 44/45/46 de 2015, Perpres 64/2020, Permenaker 6/2016 |
| upah-minimum-provinsi | salario-minimo | decretos de gobernador o páginas oficiales de 12 provincias |
| kalkulator-thr | bono-semestral | Permenaker 6/2016 |
| kalkulator-pesangon | indemnizacion-despido | PP 35/2021 Pasal 40 a 57 |
| kalkulator-lembur | horas-extra | PP 35/2021 Pasal 26, 31, 32 |
| kalkulator-cuti-tahunan | vacaciones | UU 6/2023 (Pasal 79 UU Ketenagakerjaan), PP 35/2021 Pasal 33 |
| kalkulator-ppn | iva | PMK 131/2024 (12% con DPP nilai lain 11/12; lujo sobre precio) |
| kalkulator-pph-final-umkm | regimen-simplificado | PP 20/2026 y PP 55/2022 Pasal 60 |
| kalkulator-pajak-sewa | propio | PP 34/2017 (caso oficial de la explicación) |
| kalkulator-bphtb | propio | UU 1/2022 (HKPD) Pasal 46 y 47 |
| kalkulator-pbb | propio | UU 1/2022 (HKPD) Pasal 40 a 42 |
| kalkulator-deposito | plazo-fijo | PP 131/2000 |
| kurs-jisdor | tipo-de-cambio | serie JISDOR de Bank Indonesia |
| kalkulator-inflasi | inflacion | serie de inflación anual (BI, datos BPS) |
| kalkulator-zakat-penghasilan | propio | **borrador**: nisab BAZNAS 2026 no verificado |

Universales: entran con `universales: "todas"` (40, la de IVA cae sola porque hay PPN local). En total
62 calculadoras publicables. `check_mundo`: Indonesia entra declarada (13 pagas por THR), impuesto
efectivo 5,0 %, 12,2 % y 22,2 % en los tres puntos de control.

## Datos no verificados (y qué calculadora toca)

- `id.jp-batas-upah` (tope de JP 2026, Rp11.086.300 según la cuenta oficial de X de BPJS
  Ketenagakerjaan y la prensa): bpjsketenagakerjaan.go.id no resuelve desde aquí y la circular no está
  en ninguna fuente oficial legible. Decisión: gaji bersih, BPJS Ketenagakerjaan y biaya karyawan piden
  el tope como campo opcional (sin el campo, el 1 % de JP se calcula sobre todo el sueldo). Cuando se
  verifique, conviene pasar a dato requerido.
- `id.zakat-nisab-bulan` y `id.zakat-kadar` (Keputusan Ketua BAZNAS 15/2026): baznas.go.id devuelve
  403 y la copia archivada del estudio está cortada. La calculadora de zakat queda en borrador.
- UMP: solo 12 de 38 provincias tienen el monto leído en el decreto o la página oficial (.go.id): DKI
  Jakarta, Jawa Tengah, Jawa Timur, Sumatera Utara, Sumatera Selatan, Kepulauan Riau, Bali, NTB, NTT,
  Kalimantan Timur, Sulawesi Selatan y Papua Tengah. Jawa Barat, Banten, Lampung, Riau y DIY tienen
  sitio bloqueado (403 o sin conexión). Las regiones del mercado son solo esas 12. Sumatera Utara: la
  página de la Disnaker dice Rp3.228.971 y la prensa Rp3.228.949; se usó la oficial.

## Checks corridos (con el país registrado)

- `npx tsc --noEmit -p .`: OK.
- `check_paises id`: OK (58 datos, 66 tramos verificados, 3 pendientes, 2 series, 63 calculadoras);
  2 avisos de vencimiento a 30 días de las series (JISDOR e inflación, las renueva el cron).
- `check_paises_casos id`: 72 casos en 22 archivos, todos OK (14 casos con origen oficial: ejemplos de PMK 168/2023 y PP 34/2017, decretos de UMP, Permenaker 6/2016 y JISDOR).
- `check_textos_paises id`: 1134 textos, 0 avisos.
- `check_fronteras`: 7687 archivos OK. `check_eol`: 8360 archivos en LF, OK.
- `check_motor --generar-cargadores`: 2349 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_seo_intl`: 7692 páginas OK.
- `check_hreflang`: 1050 fallas, todas del clúster de inflación y causadas por otro mercado: la serie
  `ni.ipc` (Nicaragua) vence el 24/10 (último punto julio de 2026, 115 días) y no tiene detector de
  serie, así que `correr.ts --mercado ni` no la renueva. Sin Indonesia ya hay 900 fallas; las 150
  restantes son los pares de `id/kalkulator-inflasi` dentro del mismo clúster roto. Ninguna falla fuera
  del clúster de inflación.
- `check_ofertas_intl`: 15 fallas, todas de Chile (`cl/sueldo-liquido` y `cl/finiquito`, desfase de la
  UF entre planilla y calculadora). Ninguna de Indonesia.
- `scripts/datos-paises/correr.ts --mercado id`: 2 series y 18 normas sin novedad, ninguna fuente caída.
- `check-all`: 148 de 150 suites en verde. Fallan solo `check_hreflang` y `check_ofertas_intl`, por las
  dos causas ajenas de arriba (serie `ni.ipc` vencida y UF de Chile).

## Puesta al día con el motor (main 7d190a68)

Merge de `claude/mundo-motor-id` (c2186ba6, ya al día con main 7d190a68) en 60b0d424, sin conflictos.
Indonesia suma calendario (`kalender-gaji`), rankings (`peringkat-negara`), «Sueldos reales»
(`gaji-sebenarnya`), «¿Cuántas horas de trabajo cuesta?» (`berapa-jam-kerja`) y afiliados en indonesio.
`check_motor --generar-cargadores` y `check_medicion_mercados --escribir` no cambiaron archivos.

- `tsc`: 0 errores.
- `check_paises id`: OK, 2 avisos (series JISDOR e inflación, las renueva el cron). `check_paises_casos id`: 72 casos en 22 archivos OK. `check_textos_paises id`: 1134 textos, 0 avisos.
- `check_seo_intl`: 7692 páginas OK.
- `check_horas`: OK, 32 países, 1 aviso (AR vence el 31/10). Indonesia todavía no entra al índice de horas (no está en el índice de salario mínimo por hora de main).
- `check_rankings`: TODO OK, 3 rankings, 352 filas, 44 países (Indonesia incluida), 118 ediciones.
- `check_sueldos`: 15436 pasadas, 0 fallas. `check_calendario`: 91 fechas en 20 ediciones, .ics válidos. `check_eol`: OK.
- `check-all`: 151 de 155 suites en verde. Fallan solo las cuatro conocidas y ajenas: `check_hreflang`
  (1924 fallas, todas del clúster de inflación; 75 son los pares de `id/kalkulator-inflasi` dentro de ese
  clúster roto), `check_ofertas_intl` (15 fallas de cl, UF), `check_mes_en_render` (11 páginas de `(ar)`)
  y `check_panel_sql` (18 fallas de `ca_sueldos`).

## Pasos saltados

- Sin credenciales (Supabase, Vercel, PayPal): no se probó nada que las necesite.
- No se miró en `next dev` (Turbopack rechaza la junction de node_modules y no se hizo `npm ci`).
- Sin push ni PR (la cuenta no tiene permiso de escritura).

## Pendientes y riesgos

- **Revisión de un hablante nativo de indonesio pendiente** para todos los textos (contenido, etiquetas,
  observaciones). Se escribieron con el registro de D11 («Anda», imperativo corto, sin jerga).
- **Nueva ley laboral**: la DPR aprobó el 6/10/2026 la UU Pelindungan Ketenagakerjaan (23 capítulos,
  313 artículos; según prensa quita el multiplicador 0,5 del pesangon y rige un año después de
  promulgada). No está promulgada ni hay texto oficial: pesangon, lembur y cuti siguen con PP 35/2021 y
  UU 6/2023. Cuando se promulgue hay que revisar `id.pesangon-pengali` y agregar un aviso.
- PTKP: el gobierno anunció una posible suba para 2027 (prensa); los datos llevan `proximaRevision`
  2027-01-01.
- BPJS Kesehatan: Perpres 59/2024 (KRIS) prevé nuevas cuotas; al 24/10/2026 rigen las de Perpres
  64/2020.
- Agregar las 26 provincias restantes de UMP a medida que se lean sus decretos.
- Conflictos esperables al mergear en `src/paises/index.ts` y en los cargadores generados: regenerar.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
