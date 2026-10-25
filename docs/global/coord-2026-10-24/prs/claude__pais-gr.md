# Grecia (gr): 21 calculadoras locales en griego, ΦΠΑ local y 40 universales

Rama `claude/pais-gr`. **Depende de `claude/mundo-motor-el`** (motor griego sin mergear, ADR 0002 D20): se creó con `git checkout -b claude/pais-gr claude/mundo-motor-el` y se mergeó `origin/main` (ya estaba al día). Hay que mergear antes el motor el.

## Qué incluye

- `src/paises/gr/`: mercado Ελλάδα (`el-GR`, `trato: "usted"` = πληθυντικός ευγενείας según D20, EUR, Europe/Athens, escala 0.9 de PAISES.md), `datos.json` (45 datos, 47 tramos verificados, 1 no verificado), `series.json` (ΔΤΚ de la ΕΛΣΤΑΤ, 2020=100, mensual desde 2000-01 hasta 2026-09), `avisos.json` (vacío), 5 novedades, 2 detectores, `lib/` (escala con hijos y jóvenes, μείωση, nómina de 14 pagas, δώρα, despido, inflación).
- 22 calculadoras locales (21 publicadas, 1 borrador), cada una con casos, cliente y contenido propio (h1, title, description, FAQ, glosario) en griego, slugs ELOT 743:
  - Sueldo: `ypologismos-katharou-misthou` (sueldo-neto, 14 pagas, declara `mundo`), `ypologismos-miktou-apo-katharo`, `kostos-ergodoti`, `asfalistikes-eisfores-misthoton`, `katotatos-misthos`.
  - Pagas y licencias: `doro-christougennon` (bono-semestral, fecha de pago 21/12 en el calendario), `doro-pascha`, `epidoma-adeias`, `imeres-adeias`.
  - Despido y horas: `apozimiosi-apolysis` (con y sin προειδοποίηση, tope y adicional transitorio de 2012), `proeidopoiisi-apolysis`, `ypologismos-yperorion`, `nychterini-ergasia-kyriaki`.
  - Impuestos: `ypologismos-fpa` (24/13/6/4 y los reducidos 30% de las islas; reemplaza la universal), `ypologismos-forou-eisodimatos`, `foros-eleftheron-epangelmation`, `eisfores-eleftheron-epangelmation`, `foros-metavivasis-akinitou` (3% + 3% δήμοι = 3,09%), `foros-enoikion` (escala 2026 15/25/35/45), `tokoi-katatheseon` (15%), `ypologismos-plithorismou`.
  - Borrador: `elachisto-tekmarto-eisodima`.
- Universales: `"todas"` → entran 40 (la de ΦΠΑ se cae por concepto ante la local). Total 61 publicadas.
- `scripts/paises/gr/`: `correr.ts` (corre una calculadora con los datos del repo), `nueva.ts` (crea cliente y la registra en el index del país), `probar_detectores.ts`.
- Commit aparte `publicar gr`: estado publicado, alta al final de `PAISES`, cargadores (`cargadores/gr.ts`, `mercados.ts`) y `mercados-registro.ts` regenerados. Va a chocar con otras ramas en esos archivos: se resuelve regenerando.

## Datos y fuentes (todo leído en primaria el 24/10/2026)

- ΦΕΚ (almacenamiento oficial del Εθνικό Τυπογραφείο que usa search.et.gr): ν. 5246/2025 (κλίμακα 2026 con hijos y jóvenes, escala de alquileres, ΦΠΑ e islas), ν. 5045/2023 y ν. 4646/2019 (μείωση φόρου art. 16), ν. 5219/2025 (φόρος μεταβίβασης), ΚΥΑ del κατώτατος μισθός 2025 (880/39,30) y 2026 (920/41,09 desde 1/4/2026), ΚΥΑ 19040/1981 (δώρα), ν. 5162/2024 (τεκμαρτό).
- e-ΕΦΚΑ: εγκύκλιοι 38/2024 (ΚΠΚ 101/103/105: 13,37/21,79 etc.), 1/2023 (ΔΥΠΑ), 3/2025 y 4/2026 (πλαφόν 7.572,62 y 7.761,94), 6/2026 (μη μισθωτοί por categoría, ανεργία 10 €, επικουρική, εφάπαξ).
- Επιθεώρηση Εργασίας (hli.gov.gr): επίδομα αδείας, días de άδεια, αποζημίωση y προειδοποίηση, υπερωρίες/υπερεργασία, νύχτα y Κυριακή.
- ΑΑΔΕ: anuncio del 31/12/2025 sobre ΦΠΑ reducido en Λέσβος, Κως, Σάμος, Χίος. Διαύγεια (codificación ministerial del ΚΦΕ, ΑΔΑ Ε7ΔΠΗ-Φ32): φόρος τόκων 15% y deducción del 5% de alquileres.
- ΕΛΣΤΑΤ DKT87: serie del ΔΤΚ (septiembre 2026: 128,2234; interanual 5,0%).
- No verificado: `gr.tekmarto-pollaplasiastis` (cuántos sueldos son el «ετήσιο ποσό του κατώτατου μισθού» del art. 28Α ΚΦΕ; 14 es la lectura habitual, sin circular primaria). Por eso `elachisto-tekmarto-eisodima` queda en borrador.

## Decisiones

- El impuesto anual del sueldo se reparte en 14 pagas (12 + δώρο Χριστουγέννων + δώρο Πάσχα + επίδομα αδείας, sumadas desde sus datos). La regla operativa de retención ×14/÷14 no está en una fuente primaria leída; la cuenta usa el impuesto legal del año, que es el mismo.
- Los δώρα suman la αναλογία del επίδομα αδείας (1/24, derivada del medio sueldo anual; la ΚΥΑ lo cuenta como τακτική αποδοχή). Se puede apagar. El 4,166% no se leyó escrito en primaria. Proporción continua por días (días/19 × 2/25 y días/8 × 1/15).
- Despido: el 1/6 sale de los datos de δώρα y επίδομα (dan 2/12) y se aplica también al adicional transitorio de 2012.
- Horas extra, nocturnas y domingos piden el ωρομίσθιο: la fórmula μισθός/25 × 6/40 solo aparece en fuentes secundarias.
- Ελεύθεροι επαγγελματίες: sin el τεκμαρτό (se avisa en el resultado) y sin la «ειδική κατηγορία» de εισφορές (la εγκύκλιος no dice quién entra).
- ΕΝΦΙΑ no se hizo: depende de las τιμές ζώνης (decisiones ministeriales) y las tablas del ΦΕΚ no tienen capa de texto.
- Detector de la ΔΤΚ `manual` (la ΕΛΣΤΑΤ publica solo xlsx y el Http de los detectores lee texto); `maxAntiguedadDias` 90 para dar margen a la carga manual. Detector `html` de las εγκύκλιοι del e-ΕΦΚΑ (probado con la página guardada y con la real: 0 nuevos).

## Checks

RESULTADOS_CHECKS

## Pendientes y riesgos

- **Revisión de un hablante nativo de griego pendiente** (textos, FAQ y etiquetas escritos sin revisión humana).
- Cargar a mano el ΔΤΚ de octubre de 2026 cuando salga (mediados de noviembre); vence el 30/11/2026.
- Verificar en primaria el multiplicador del τεκμαρτό para publicar `elachisto-tekmarto-eisodima`.
- No se miró `next dev` (la junction de node_modules no sirve para Turbopack); sin credenciales no se corrió nada de Supabase, Vercel ni PayPal. No hay push ni PR (sin permiso).
- `src/paises/index.ts` y los cargadores generados chocan con otras ramas: regenerar al mergear.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
