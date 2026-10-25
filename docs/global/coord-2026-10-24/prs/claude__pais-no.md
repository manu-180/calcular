# País Noruega (no, bokmål): 21 calculadoras locales y 40 universales

Depende de `claude/mundo-motor-eu` y `claude/mundo-trad-nb` (sin mergear en main). La rama sale de
`claude/mundo-motor-eu`, mergea `claude/mundo-trad-nb` (fast-forward, sin conflictos) y `origin/main`
(286ecb06).

## Qué incluye

- `src/paises/no/`: mercado (`codigo: "no"`, `pais: "NO"`, `idioma: "nb"`, `locale: "nb-NO"`, `trato: "tu"`
  según D9, NOK, `Europe/Oslo`, escala 10, `nombre: "Norge"`), 52 datos con 54 tramos verificados, 6
  series (Norges Bank EUR, USD, SEK, DKK, GBP y KPI de SSB), 1 aviso, 4 novedades y 15 detectores.
- Mercado e idioma: el motor separa `codigo` (ruta `/no`) de `idioma` (`nb`); `idiomaDeLocale("nb-NO")`
  da `nb`, así que no hay choque con el ISO `no`. El import en `src/paises/index.ts` se llama `no` (no es
  palabra reservada).
- 21 calculadoras locales, todas publicadas (ninguna en borrador):

| slug | concepto |
|---|---|
| lonn-etter-skatt | sueldo-neto (entra en «Tu sueldo en el mundo», declarado) |
| skattekalkulator | impuesto-renta (restskatt o penger til gode) |
| trinnskatt | propio |
| trygdeavgift | aportes-seguridad-social |
| feriepenger | vacaciones |
| arbeidsgiveravgift | costo-empleador |
| sykepenger | propio |
| foreldrepenger | propio |
| dagpenger | propio |
| barnetrygd | propio |
| kontantstotte | propio |
| oppsigelsestid | preaviso |
| overtidstillegg | horas-extra |
| mva-kalkulator | iva (reemplaza a la universal, mismo slug) |
| dokumentavgift | propio |
| formuesskatt | propio |
| utbytteskatt | propio (utbytte, aksjegevinst y ASK) |
| valutakalkulator | tipo-de-cambio |
| kpi-kalkulator | inflacion |
| forsinkelsesrente | propio |
| grunnbelopet | conversor-unidad (G a kroner) |

- Universales: `"todas"`, entran 40 de 41 (la de IVA cae porque la cubre `mva-kalkulator`).
- Commit `publicar no`: estado publicado, alta en `PAISES`, cargadores generados y medición.
- `scripts/paises/no/probar_detectores.ts` (corre los detectores contra la red) y `ver_textos.ts`
  (contenido con los marcadores resueltos).

## Datos (todos verificados el 2026-10-24 en fuente primaria)

- Skatteetaten: forskuddsutskrivingen 2026 (22 %, 18,5 % y fradrag de 45 000 en tiltakssonen,
  formuesskatt 0,35 % + 0,65/0,75 %, bunnfradrag 1,9 mill, trinn 2 21,5 mill, verdsettelse, oppjusteringsfaktor
  1,72) y satser `?year=2026` de trinnskatt, trygdeavgift (7,6/10,8/5,1 %, nedre grense 99 650,
  opptrapping 25 %), minstefradrag (46 %, 95 700), personfradrag (114 540), arbeidsgiveravgift por sone
  (fribeløp 1a 850 000) y mva (25/15/12 %).
- Lovdata: dokumentavgift 2026 (2,5 %, mínimo 250), ferieloven §§ 5 y 10 (10,2 %, +2,3 puntos desde los 60
  hasta 6 G), arbeidsmiljøloven § 15-3 y § 10-6, folketrygdloven § 8-10 (1/260, 6 G) y § 4-12 (2,4 promille,
  tope 90 %), forsinkelsesrente 12 % (1/1/2026) y 12,25 % (1/7/2026). Husleieloven § 4-2 para una FAQ.
- Nav: G 130 160 (1/5/2025) y 136 549 (1/5/2026), sykepenger, foreldrepenger (días por dekningsgrad),
  engangsstønad 92 648, dagpenger (62,4 %, 1,5 G / 3 G, 52 o 104 semanas, barnetillegg 38), barnetrygd
  2 012 y tillegg 512 (1/2/2026), kontantstøtte 7 500 con la tabla por horas.
- Kartverket: tinglysingsgebyr 545 (2026) y redondeo del grunnlag a miles hacia abajo.
- Norges Bank (API de datos) y SSB (PxWebApi tabla 14700, 2025=100, reemplaza a la 03013).
- No verificados: ninguno. No hay salario mínimo general en Noruega (solo tariffavtaler de alcance
  general) y no se cargó ninguno.

## Decisiones

- Feriepenger: la ley da 10,2 % y 12,5 % desde los 60 (no 12 %); la sats de convenio (12 %, 14,3 %) va como
  «egen sats» que escribe la persona, sin dato inventado.
- Lønn etter skatt y skattekalkulator calculan la skatt anual (no tabelltrekk): el aviso aclara que el
  trekk mensual sigue el skattekort. No cubren pensión, næring ni skattebegrensning.
- Forsinkelsesrente desde el 1/1/2026 (los semestres anteriores no se verificaron en Lovdata).
- SEK y DKK se guardan por 1 unidad (Norges Bank publica por 100); el detector divide por UNIT_MULT.
- Arbeidsgiveravgift: sone 1a con 10,6 % y aviso del fribeløp, sin modelar el agotamiento.
- Detectores de norma: año nuevo en el selector de las satser de Skatteetaten, nuevo G en nav.no, nuevas
  satser de barnetrygd y cambio de styringsrente (Norges Bank) para la forsinkelsesrente.

## Checks

Corridos con el país publicado en el árbol:

- `npx tsc --noEmit -p .`: 0 errores.
- `check_paises no`: OK (52 datos, 54 tramos verificados, 6 series, 61 calculadoras); `check_paises` completo
  en check-all: 64 países OK. Avisos esperables: valuta y KPI dejan de ser publicables si el cron no
  actualiza las series antes del 24/11.
- `check_paises_casos no`: 95 casos en 21 archivos OK.
- `check_textos_paises no`: 1103 textos, 0 avisos.
- `check_fronteras`: 7786 archivos OK. `check_eol`: 8681 archivos en LF.
- `check_motor --generar-cargadores`: 2351 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_mundo`: NO entra en «Tu sueldo en el mundo» con `mundo` declarado en `lonn-etter-skatt`
  (PPA 10,001 NOK, 12 pagas).
- `check_seo_intl`: 7706 páginas intl OK.
- `check_ofertas_intl`: 15 fallas, todas de cl (UF en sueldo-liquido y finiquito), ajenas y ya arregladas
  en `claude/mundo-arreglos-2026-10-24`. Ninguna de no.
- `check_hreflang`: 1924 fallas, todas del clúster de inflación (la falla conocida de main, arreglada en
  `claude/mundo-arreglos-2026-10-24`); 74 nombran `no/kpi-kalkulator` porque entra en ese clúster.
  Ninguna falla de no fuera de él.
- `check-all`: 151/155 suites verdes. Fallan check_hreflang y check_ofertas_intl (lo de arriba),
  check_mes_en_render (11 páginas de `(ar)` que leen el reloj al cargar el módulo vía `informeMundo`) y
  check_panel_sql (18 fallas de RLS y grants en tablas `ca_sueldos_*`): las dos últimas vienen del motor y
  de main, no tocan `src/paises/no`.
- `scripts/paises/no/probar_detectores.ts`: 15 de 15 detectores responden contra la red real.

## Pasos saltados

- Sin push ni PR (sin permiso de escritura), sin credenciales de Supabase, Vercel o PayPal.
- No se miró en `next dev` (la junction de node_modules no sirve para Turbopack).

## Pendientes y riesgos

- Satser 2027: el aviso `no.satser-2027` vence el 31/12/2026; los detectores de Skatteetaten avisan
  cuando aparezca 2027 en el selector.
- Series con vencimiento corto (valuta 10 días, KPI 75 días): dependen del cron `datos-paises`; los
  detectores se probaron contra la red real el 24/10 (15 de 15 responden con la forma esperada).
- El commit `publicar no` choca con otras ramas en `src/paises/index.ts`, los cargadores generados y
  `mercados-registro.ts`: se resuelve regenerando.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
