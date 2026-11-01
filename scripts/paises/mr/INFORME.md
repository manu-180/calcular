# Mauritania (`mr`): informe del agente

- Rama: `claude/pais-mr` (base `origin/main`).
- Mercado: `mr`, árabe (`ar-MR-u-ca-gregory-nu-latn`, trato usted), MRU, `Africa/Nouakchott`, escala 40, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: **56 calculadoras** = 16 locales + 40 universales (`universales: { todas: true }`; la universal de IVA se cae porque `calcul-tva` es local).
- Slugs en francés administrativo (ITS, CNSS, SMIG, TVA, préavis): es como se nombran estos conceptos en Mauritania, y no chocan con los slugs ingleses de las universales árabes.

## Calculadoras locales (16, todas `publicado`)

| Slug | Concepto | Base |
|---|---|---|
| salaire-net | sueldo-neto (declara `mundo`) | CGI arts. 110, 113, 114; decreto 2021-186 (CNSS); decreto 2012-261 (CNAM) |
| salaire-brut | propio (neto → bruto) | ídem |
| calcul-its | impuesto-renta | CGI arts. 110 y 114 |
| cotisations-cnss | aportes-seguridad-social | decreto 2021-186; bordereau trimestral CNSS; decreto 2012-261 |
| cout-employeur | costo-empleador | ídem más CGI arts. 150 a 153 (taxe d'apprentissage) |
| calcul-tva | iva | CGI art. 230; LFR 2023 (18 % telefonía) |
| smig | salario-minimo | decreto 2026-064 (desde 01/04/2026); Code du travail art. 170 |
| conges-payes | vacaciones | Code du travail arts. 178 a 189 |
| heures-supplementaires | horas-extra | Code du travail arts. 170 a 172; convención colectiva general (CCGT) art. 39 |
| indemnite-licenciement | indemnizacion-despido (con colectivo y jubilación) | CCGT art. 31 |
| preavis | preaviso | CCGT arts. 27 y 28; Code du travail art. 50 |
| pension-retraite | jubilacion | ley 2021-007 (arts. 52 a 54 nuevos de la ley 67-039) |
| cours-dollar-ouguiya | tipo-de-cambio (series USD y EUR con detector) | servicio de cursos de referencia del BCM |
| impot-sur-les-societes | propio | CGI art. 51 |
| impot-dividendes | propio (IRCM) | CGI arts. 121, 122, 125, 126, 128 |
| vignette-automobile | propio | CGI arts. 139 a 143 |

## Fuentes primarias que abren (29/10/2026)

- finances.gov.mr: leyes de finanzas 2023 a 2026 y sus rectificativas (PDF), CGI versión oficial enero 2023 (DGI), y la «Recueil des textes» con los decretos de la CNAM.
- impots.gov.mr/DGI: sitio viejo (2020), con el CGI 2020; no se usó como fuente de valores.
- msgg.gov.mr/JO: Journal officiel en PDF (JO n.º 1503 con el decreto 2021-186).
- cnss.mr: SPA con API JSON de documentos (ley 2021-007, ley 67-039, bordereau trimestral).
- fonctionpublique.gov.mr: Code du travail, leyes 2022-025 y 2024-018 que lo modifican, CCGT 1974, decreto SMIG 2026-064.
- connect.bcm.mr: API de cursos de referencia del BCM (la que alimenta bcm.mr).
- No abren: travail.gov.mr, dgi.gov.mr, douane.gov.mr. ANSADE abre pero es una SPA; no se buscó IPC.

## Datos

- **39 datos con 39 tramos verificados, 0 sin verificar**, más 2 series (USD y EUR del BCM, 28/10/2026). Todo leído hoy en fuente primaria https.
- Cadena de vigencia del CGI: se leyó el CGI oficial de enero de 2023 (incluye hasta la LFI 2022) y el artículo 3 de cada ley posterior: LFR 2022, LFR 2023, LFI 2024 (escaneada: leída página por página como imagen), LFR 2024, LF 2025, LFR 2025, LF 2026 y LFR 2026. Ninguna toca los arts. 110, 113, 114, 51, 126, 140 ni 153; la LFR 2023 agrega el 18 % de telefonía al art. 230.
- **Hueco**: el PDF de la LFI 2023 publicado (francés y árabe) salta las páginas de los arts. 1 a 3. El proyecto (PLFI 2023) solo derogaba una exención de vehículos de diputados, y la LFR 2023 cita el art. 230 «rédaction actuelle (LFI 2022)». No hay indicio de cambio, pero el texto votado de la LFI 2023 no se leyó.
- Fechas `desde` aproximadas por falta de fecha en el PDF: TVA telefonía desde la LFI 2024 (10/01/2024, que ya la encuentra vigente); ley 2021-007 desde 01/01/2021.

## Interpretaciones a revisar

1. **CNAM antes del ITS**: el art. 113 del CGI resta «retenciones obligatorias de pensión y cotizaciones de seguridad social». Se resta también la cotización CNAM del asalariado (4 %). Si la DGI no la admite, el ITS sube unas pocas centenas de MRU en sueldos medios.
2. **Medicina del trabajo 2 %** (cout-employeur): el bordereau de la CNSS la lista junto a las cotizaciones sobre remuneraciones topadas; se calcula sobre la base topada (15.000 MRU).
3. **Reparto 13 % / 1 %** de la CNSS: sale del bordereau oficial y de la FAQ de cnss.mr; el decreto 2021-186 solo fija el 14 % por rama.
4. **CCGT 1974, erratas del PDF oficial**: el art. 39 dice «de la 41e à la 41e heure» (se toma 41 a 48 porque la tranche siguiente empieza en la 49e) y el art. 31 repite «sixième à dixième» para el 35 % (se toma «más de 10 años», como en la grilla colectiva del mismo artículo). Están anotadas en `nota` de cada dato.
5. SMIG mensual = hora × 40 × 52 / 12 (el decreto da solo la hora). Se usa también para el mínimo de pensión (60 % del SMIG mensual de 40 horas).
6. Preaviso de 15 días y días cumplidos: el sueldo se reparte en 30 días.

## Descartado

- Taxe sur les transactions électroniques (LF 2026, 0,1 %): la LFR 2026 le pone un tope de 200 MRU por operación, pero el PDF no trae fecha de promulgación. Queda solo como novedad, sin calculadora.
- Droits d'enregistrement inmobiliarios: la LF 2025 reescribe los arts. 297 a 391; no se llegó a reconstruir la tabla vigente.
- IPC de ANSADE: SPA, no se buscó la API.

## Detectores (5) y prueba

`npx tsx scripts/paises/mr/probar-detectores.ts`, corrido hoy:
- `mr.usd-bcm` y `mr.eur-bcm` (`api-json`, últimos 20 días): devolvieron los puntos del 12 al 28/10/2026.
- `mr.finances-lois` (html, PDF en carpetas posteriores a 2026-10 en /fr/Lois), `mr.travail-textes` (html, posteriores a 2026-06 en /fr/emploi) y `mr.cnss-documents` (JSON, id > 15): `[]`.

## Checks (corridos con `mr` registrado localmente)

- `tsc --noEmit`: sin errores.
- `check_paises mr`: ✅ 39 datos verificados, 2 series, 56 calculadoras. Aviso: la serie del BCM vence si no se actualiza en 10 días.
- `check_paises_casos mr`: 70 casos en 16 archivos, todos OK.
- `check_textos_paises mr`: 816 textos, 0 avisos.
- `check_fronteras`: OK. `check_eol`: OK.
- `check_seo_pais mr`: 0 avisos.
- `check_mundo`: OK. Con `mr` en `publicado` (prueba local, revertida) entra como `declarado`: 13,3 % / 29,9 % / 38,2 %, PPA 12,192 MRU (2025).
- `check_motor`: 1 falla, «forint», que ya falla en main.
