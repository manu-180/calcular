# País se: Sverige en sueco (64 calculadoras, 24 locales, publicado)

## Qué incluye

Mercado `src/paises/se/` (codigo `se`, pais `SE`, idioma `sv`, locale `sv-SE`, trato `tu` (du) según
ADR 0002 D9, moneda SEK, escala 10, nombre «Sverige», zona Europe/Stockholm, sin regiones: la
kommunalskatt va como mapa de las 290 kommuner), publicado en el commit `publicar se` (estado
`publicado`, alta al final de `PAISES`, cargadores y medición regenerados).

**Depende de `claude/mundo-motor-eu` (motor sv/pl/da/nb/fi) y de `claude/mundo-trad-sv` (las 41
universales en sueco), las dos sin mergear en main.** La rama sale de `claude/mundo-motor-eu`, con
`claude/mundo-trad-sv` y `origin/main` (7d190a68) mergeados.

- 24 calculadoras locales, todas `publicado`, ninguna en borrador:
  | slug | concepto |
  |---|---|
  | lon-efter-skatt | sueldo-neto (skattetabell kolumn 1 con la kommunalskatt de cada kommun, kyrkoavgift opcional, slutlig skatt anual con tasas exactas; entra en «Tu sueldo en el mundo») |
  | statlig-skatt | impuesto-renta (skiktgräns y brytpunkt 660 400) |
  | arbetsgivaravgift | costo-empleador (31,42 %, 19-23 años 20,81 % hasta 25 000 kr/mes desde 1/4/2026, 67+ 10,21 %) |
  | egenavgifter | propio (28,97 %, schablonavdrag 25 %, nedsättning 7,5 % tope 15 000) |
  | semesterersattning | vacaciones (procentregeln 12 % y semestertillägg 0,43 % / 1,82 %) |
  | semesterdagar | propio (7 § semesterlagen) |
  | uppsagningstid | preaviso (11 § LAS) |
  | sjuklon | propio (80 % y karensavdrag 20 % de la sjuklön semanal) |
  | sjukpenning | propio (80 % / 75 % × 0,97 × SGI, tope 10 pbb) |
  | foraldrapenning | propio (sjukpenningnivå, grundnivå 250, lägstanivå 180, tope 1 259 kr/día) |
  | barnbidrag | propio (1 250 kr + flerbarnstillägg) |
  | momskalkylator | iva (25/12/6 %, livsmedel 6 % desde 1/4/2026; reemplaza la universal) |
  | ranteavdrag | propio (30 % hasta 100 000 y 21 % encima) |
  | skatt-pa-bostadsforsaljning | propio (22 % de la vinst, 50 % de la förlust) |
  | isk-skatt | propio (schablonintäkt 3,55 %, grundnivå 300 000) |
  | csn-aterbetalning | propio (anualidad creciente 2 %, ränta 2,135 %, mínimo 15 % pbb; estimación) |
  | inflationskalkylator | inflacion (KPI de SCB, 1980 = 100) |
  | valutaomvandlare | tipo-de-cambio (EUR, USD, NOK, DKK, GBP, mittkurs de Riksbanken) |
  | prisbasbelopp | conversor-unidad (pbb, förhöjt pbb, ibb) |
  | drojsmalsranta | propio (referensränta + 8 por semestre, räntelagen) |
  | traktamente | propio (300/150/210/150, nattraktamente y reducciones por comidas) |
  | reseavdrag | propio (25 kr/mil, förmånsbil 12 y 9,50, umbral 15 000) |
  | fastighetsavgift | propio (0,75 %, tope 10 425, 15 años libres desde värdeår 2012) |
  | lagfart | propio (1,5 % / 4,25 % + 825 kr; pantbrev 2 % + 375 kr) |
- 40 universales en sueco con `universales: "todas"` (la de moms cae por la local del mismo concepto).
- Total 64.
- SEO propio por página (title, description, h1, FAQ, glosario) con las búsquedas suecas: «räkna ut
  lön efter skatt», «statlig skatt brytpunkt», «arbetsgivaravgift», «egenavgifter enskild firma»,
  «semesterersättning beräkna», «semesterdagar», «uppsägningstid LAS», «sjuklön karensavdrag»,
  «sjukpenning», «föräldrapenning kalkylator», «barnbidrag flerbarnstillägg», «momskalkylator»,
  «ränteavdrag», «reavinstskatt bostad», «skatt på ISK», «CSN-lån återbetalning»,
  «inflationskalkylator KPI», «valutaomvandlare», «prisbasbelopp 2026», «dröjsmålsränta»,
  «traktamente 2026», «reseavdrag 2026», «fastighetsavgift», «lagfart kostnad».
- Suecia no tiene salario mínimo legal: no hay calculadora de salario mínimo.
- `series.json`: mittkurser de Riksbanken EUR, USD, NOK, DKK, GBP (25/8 a 23/10/2026) y KPI de SCB
  1980 = 100 (1980-01 a 2026-09: TAB5737 hasta 12/2025 y TAB6792 rebasado desde 1/2026, porque SCB
  pasó a base 2020 en enero de 2026). `avisos.json` vacío, `novedades.ts` (6), `fuentes.ts`
  (14 detectores) y `scripts/paises/se/probar_detectores.ts`.

## Datos

48 datos, 56 tramos, todos verificados el 24/10/2026 en fuentes primarias; 0 no verificados.

- Skatteverket: «Belopp och procentsatser för inkomståret 2026» (PDF), «Belopp och procent 2026,
  kort version», «Teknisk beskrivning för skattetabeller 2026» (SKV 433: grundavdrag,
  jobbskatteavdrag, pensionsavgift, public service, skattereduktion för förvärvsinkomst, 1,16
  puntos de begravning y trossamfund), «Kommunala skattesatser 2026» (txt, 290 kommuner:
  kommunal + región y begravningsavgift), páginas de arbetsgivaravgifter, egenavgifter,
  momssatser, ISK, ränteutgifter, försäljning av bostad, traktamente y resor till och från arbetet.
- riksdagen.se: semesterlag (1977:480), LAS (1982:80) 11 §, sjuklönelag (1991:1047) 6 §,
  socialförsäkringsbalk (2010:110) 12, 15, 25 y 28 kap., studiestödslag (1999:1395) 4 kap.,
  räntelag (1975:635) 6 y 9 §§, lag (2023:748) 3 § (nedsättning de egenavgifter).
- Riksbanken (API SWEA): mittkurser y referensränta SECBREFEFF por semestre 2024-2026.
- SCB (API v2): KPI fastställda tal.
- CSN: ränta 2026 2,135 %, mínimo 8 880 kr y avgift 150 kr. Lantmäteriet: stämpelskatt y avgifter.
- Försäkringskassan (forsakringskassan.se) estaba en mantenimiento el 24/10: föräldrapenning,
  sjukpenning y barnbidrag se verificaron en el texto de la socialförsäkringsbalk.
- Validación: la función de skatteavdrag reproduce exacto las 6 734 filas de kolumn 1 (tablas 29 a
  42, hasta 80 000 kr) de la tabla mensual 2026 de Skatteverket.

## Checks (corridos, con el país registrado)

- `npx tsc --noEmit -p .`: OK.
- `check_paises`: TODO OK, 64 países (se: 48 datos, 56 tramos verificados, 0 pendientes, 6 series,
  64 calculadoras). Avisos esperables: valutaomvandlare e inflationskalkylator dependen del cron.
- `check_paises_casos se`: 100 casos en 24 archivos, OK.
- `check_textos_paises se`: 1838 textos, 0 avisos.
- `check_fronteras`: 7795 archivos, OK. `check_eol`: OK.
- `check_motor --generar-cargadores`: 2354 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_mundo`: OK; SE entra «declarado» (12,3 % / 19,4 % / 37,1 %, PPA 8,889 SEK).
- `check_seo_intl`: TODO OK, 7712 páginas.
- `check_ofertas_intl`: 15 fallas, todas de cl (UF, ajenas; arregladas en
  `claude/mundo-arreglos-2026-10-24`). se tiene ofertas en todos los conceptos.
- `check_hreflang`: 1924 fallas, todas del clúster de inflación (falla conocida de main, arreglada
  en `claude/mundo-arreglos-2026-10-24`); ninguna fuera de ese clúster.
- `check-all`: 151/155 suites verdes. Fallan check_hreflang y check_ofertas_intl (arriba),
  check_mes_en_render (páginas de src/app que leen el reloj al cargar el módulo vía «Tu sueldo en el
  mundo», ajeno a src/paises/se) y check_panel_sql (grants de Supabase, ajeno).
- `scripts/paises/se/probar_detectores.ts`: los 14 detectores responden contra la red (5 kurser y
  KPI con su último punto, normas sin hallazgos nuevos).

## Decisiones

- Kommunalskatt como mapa `opcion-dato` de 290 kommuner (no regiones del mercado): el registro de
  regiones exigiría 290 tramos por dato. Clave ASCII del nombre; Håbo queda `haabo` para no chocar
  con Habo. Por defecto Stockholm.
- Lön efter skatt usa el método de la skattetabell (lo que sale en el lönebesked); la kyrkoavgift se
  escribe a mano porque cambia por församling dentro de la misma kommun.
- Semesterersättning por sammalöneregeln al terminar el empleo no se calcula: la ley no fija el
  valor por día (lo fijan los convenios). Se calculan el 12 % y el semestertillägg.
- Sjuklön estima la timlön como månadslön × 12 / 52 / horas (dicho en la página).
- CSN: la ley fija el aumento del 2 % anual pero no el calendario de pagos dentro del año; se
  presenta como estimación.
- Detectores de Riksbanken reintentan tras 61 s porque la API anónima limita llamadas por minuto.

## Pasos saltados

- Push y PR: sin permiso de escritura en manu-180/calcular (403), sin `gh`.
- `next dev`: no se miró en el navegador (la junction de node_modules no sirve para Turbopack y no se
  hizo `npm ci` en el worktree). `npm run build` no se corrió.

## Pendientes y riesgos

- La reducción de arbetsgivaravgift para jóvenes termina el 30/9/2027 y el tope de 25 000 kr solo
  tiene tramo desde el 1/4/2026: desde el 1/10/2027 la calculadora deja de ser publicable hasta
  cargar el tramo nuevo (proximaRevision 2027-10-01).
- Todos los datos anuales tienen proximaRevision 2027-01-01 (nuevas skattetabeller, pbb, etc.).
- Las series dependen del cron: valutaomvandlare deja de publicarse si las kurser pasan 10 días sin
  actualizar, y la inflationskalkylator si KPI pasa 75 días.
- `src/paises/index.ts` y los cargadores generados van a chocar con otras ramas de país.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
