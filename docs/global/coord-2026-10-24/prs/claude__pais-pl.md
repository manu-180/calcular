# País pl: Polska en polaco (64 calculadoras, 24 locales, publicado)

## Qué incluye

Mercado `src/paises/pl/` (codigo `pl`, pais `PL`, idioma `pl`, locale `pl-PL`, trato `tu` según
ADR 0002 D9, moneda PLN, escala 4, nombre «Polska», zona Europe/Warsaw), publicado en el commit
`publicar pl` (estado `publicado`, alta al final de `PAISES`, cargadores y medición regenerados).

- 24 calculadoras locales, todas `publicado`, ninguna en borrador:
  | slug | concepto |
  |---|---|
  | kalkulator-wynagrodzen | sueldo-neto (umowa o pracę, mes a mes con umbral 120 000 zł, límite 30-krotności y ulga dla młodych; entra en «Tu sueldo en el mundo») |
  | umowa-zlecenie | propio (estudiante < 26, chorobowe voluntario, PIT-2, mała umowa ≤ 200 zł) |
  | umowa-o-dzielo | retencion-honorarios (KUP 20 % y 50 %) |
  | kalkulator-b2b | propio (compara skala, liniowy y ryczałt con ZUS pełny, preferencyjny o ulga na start) |
  | kalkulator-ryczaltu | regimen-simplificado |
  | kalkulator-pit | impuesto-renta (skala anual, rozliczenie wspólne) |
  | skladki-zus | aportes-seguridad-social (przedsiębiorca + zdrowotna por forma) |
  | maly-zus-plus | propio (art. 18c) |
  | placa-minimalna | salario-minimo (2026 y tramo 2027) |
  | koszt-pracodawcy | costo-empleador |
  | kalkulator-vat | iva (23/8/5 %; reemplaza la universal) |
  | urlop-wypoczynkowy | vacaciones (20/26 días, staż za szkołę, etat, proporcional) |
  | ekwiwalent-za-urlop | propio (współczynnik por año) |
  | nadgodziny | horas-extra (50/100 % con el wymiar del mes) |
  | wymiar-czasu-pracy | propio (art. 130 y días festivos, con Wigilia) |
  | odprawa | indemnizacion-despido (1/2/3 pensiones, tope 15 płac mínimas) |
  | okres-wypowiedzenia | preaviso (fecha de fin: sábado o fin de mes) |
  | kalkulator-chorobowego | propio (L4 80/100 %) |
  | kalkulator-walut | tipo-de-cambio (EUR, USD, CHF, GBP, tabla A NBP) |
  | kalkulator-inflacji | inflacion (GUS) |
  | kalkulator-odsetek-ustawowych | propio (ustawowe y handlowe por tramos de la stopa referencyjna) |
  | kalkulator-lokat | plazo-fijo (con podatek Belki) |
  | podatek-belki | propio (zyski kapitałowe 19 %, odsetki) |
  | kalkulator-pcc | propio (2/1/0,5 %, exención 1000 zł) |
- 40 universales en polaco con `universales: "todas"` (la de IVA cae porque hay VAT local).
- Total 64. Queda 4 por encima del tope de 60: las 24 locales están en el rango 15 a 25 del brief
  y cada una responde a una búsqueda polaca real.
- SEO propio por página (title, description, h1, FAQ, glosario) con las búsquedas polacas:
  «kalkulator wynagrodzeń brutto netto», «umowa zlecenie kalkulator», «kalkulator B2B»,
  «kalkulator ryczałtu», «składki ZUS», «mały ZUS plus», «płaca minimalna netto»,
  «kalkulator VAT», «ile dni urlopu», «ekwiwalent za urlop», «wymiar czasu pracy»,
  «kalkulator L4», «kurs euro NBP», «kalkulator inflacji», «odsetki ustawowe», «podatek Belki»,
  «PCC 2 % samochód».
- `series.json`: kursy NBP EUR, USD, CHF y GBP (40 sesiones hasta el 23/10/2026) y CPI GUS
  (índice encadenado, 2000-01 a 2026-09). `avisos.json` (2: płaca minimalna 2027 y ZUS 2027),
  `novedades.ts` (3), `fuentes.ts` (15 detectores) y `scripts/paises/pl/probar_detectores.ts`.

## Datos

42 datos, 52 tramos, todos verificados el 24/10/2026 en fuentes primarias; 0 no verificados.

- ISAP / Dziennik Ustaw (textos jednolite leídos en PDF de api.sejm.gov.pl): ustawa o PIT
  (Dz.U. 2026 poz. 592: skala, kwota zmniejszająca, 19 % liniowy y Belki, KUP, ulga dla młodych,
  art. 30 ust. 1 pkt 5a, art. 30b, wspólne rozliczenie), ryczałt (2025 poz. 843: stawki y 50 %
  de la zdrowotna), system ubezpieczeń społecznych (2026 poz. 199: tasas y reparto, art. 18c),
  świadczenia zdrowotne (2025 poz. 1461: 9 % y 4,9 %), ustawa budżetowa 2026 (poz. 62: 9420 zł,
  FP 1 %, FS 1,45 %, FGŚP 0,10 %), VAT (2026 poz. 1263), PCC (2026 poz. 191), Kodeks pracy
  (2026 poz. 1245), Kodeks cywilny art. 481 (2026 poz. 795), transakcje handlowe (2023 poz. 1790),
  zwolnienia grupowe art. 8 (2026 poz. 1195), ustawa zasiłkowa (2026 poz. 854), dni wolne
  (2025 poz. 296), rozporządzenia de płaca minimalna 2026 (2025 poz. 1242) y 2027 (2026 poz. 1213),
  reglamento de urlopy (1997 nr 2 poz. 14 y 2009), Ordynacja podatkowa art. 63 (2026 poz. 622).
- zus.pl: tabla de składki 2026 (5652 zł, 1441,80 zł, 1,67 %, 282 600 zł, zdrowotna mínima y
  bases del ryczałt con el przeciętne wynagrodzenie GUS IV kw. 2025 = 9228,64 zł).
- Monitor Polski 2025 poz. 1274 (eli.gov.pl): límite de la zdrowotna en liniowy 14 100 zł.
- NBP: stopa referencyjna (archivo XML, tramos desde 2023-10-05; 3,75 % desde 2026-03-05) y
  tabla A por la API.
- GUS: CSV de wskaźniki cen «grudzień poprzedniego roku = 100».

## Decisiones

- Trato `tu` (Ty implícito, D9); textos sin formas con género (nada de «złożyłeś»).
- Tramos de normas con `desde` 2026-01-01: solo se verificó que rigen hoy, no desde cuándo.
  Los valores de 2026 (ZUS, fondos, 30-krotność, prognozowane wynagrodzenie, ryczałt zdrowotna,
  límite 14 100) vencen el 31/12/2026 con `proximaRevision`; el 1/1/2027 las calculadoras que
  los usan salen de lo publicable hasta cargar los valores de 2027.
- CPI: índice encadenado por diciembres (grudzień 1999 = 100). El encadenado no coincide al
  décimo con la serie «analogiczny miesiąc» (septiembre 2026: 3,9 % contra 4,1 %), por eso la
  calculadora no muestra inflación interanual.
- B2B: FP y FS no se restan como costo (no verificado); se dice en la observación.
- Ekwiwalent za urlop con concepto `propio` (no es toda la liquidación final).
- Detector GUS sin user agent de navegador: stat.gov.pl responde 503 con él.

## Depende de

`claude/mundo-motor-eu` (motor pl/sv/da/nb/fi) y `claude/mundo-trad-pl` (universales en polaco),
ninguna mergeada en main. La rama sale de `claude/mundo-motor-eu` y mergea `claude/mundo-trad-pl`
(conflictos en `IDIOMAS_VENTA`/`DICCIONARIOS` y `TRATOS`: se dejó la versión del motor, que es el
superconjunto; `gen_idiomas_universales` sin cambios). `origin/main` ya estaba incluido.

## Checks corridos

Con pl publicado (después de `check_motor --generar-cargadores` y `check_medicion_mercados --escribir`):

- `npx tsc --noEmit -p .`: OK.
- `check_motor --generar-cargadores`: 2354 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_paises pl`: OK, 42 datos (52 tramos verificados, 0 pendientes), 5 series, 64 calculadoras,
  publicado; 2 avisos esperables (kursy NBP e CPI dejan de ser publicables al 23/11 si el cron no
  trae puntos nuevos).
- `check_paises_casos pl`: 80 casos en 24 archivos OK.
- `check_textos_paises pl`: 1173 textos, 0 avisos.
- `check_fronteras`: 7728 archivos OK. `check_eol`: 8399 archivos en LF.
- `check_seo_intl`: 7712 páginas intl OK en los dos modos.
- `check_ofertas_intl pl`: OK (49 287 textos).
- `check_mundo`: PL entra declarado (21,5 / 28,0 / 39,3 %); TODO OK.
- `check_hreflang`: 924 fallas, todas del clúster de inflación (ver riesgos), ajenas a pl.
- `check-all`: 148/150 suites verdes; fallan `check_hreflang` (lo de arriba) y `check_ofertas_intl`
  completo por 15 casos de `cl/sueldo-liquido` y `cl/finiquito` (tope en UF de la planilla contra la
  calculadora: 3 707 987 contra 3 708 942), ajeno a pl.
- Detectores probados contra la red con `scripts/paises/pl/probar_detectores.ts`: 15/15 responden
  (4 kursy NBP hasta el 23/10/2026, CPI GUS con 321 puntos idénticos a series.json, stopa
  referencyjna y 9 búsquedas ELI sin hallazgos nuevos).

## Puesta al día con el motor eu (merge `dcb1b86b`)

Se mergeó `claude/mundo-motor-eu` (e371d144, al día con main bb530d7a), sin conflictos. Trae el
calendario laboral (`/pl/kalendarz-placowy`), «Ile godzin pracy to kosztuje?»
(`/pl/ile-godzin-pracy`), el ranking de países (`/pl/ranking-krajow`), «Prawdziwe zarobki»
(`/pl/prawdziwe-zarobki`), los afiliados en polaco y la carpeta de «Tu sueldo en el mundo»
(`/pl/wynagrodzenie-na-swiecie`), que el motor no había creado. `claude/mundo-trad-pl` ya estaba
incluida: no hizo falta mergearla de nuevo. `scripts/paises/pl/probar_detectores.ts`: el cast de
hallazgos pasa a `readonly` (main cambió el tipo y tsc lo marcaba).

Checks después del merge:
- gen_idiomas_universales sin cambios; `check_motor --generar-cargadores` 2354 pruebas OK;
  `check_medicion_mercados --escribir` 57 mercados; tsc OK.
- `check_paises pl`: TODO OK, 2 avisos (los mismos de kursy NBP y CPI al 23/11).
- `check_paises_casos pl`: 80 casos en 24 archivos OK. `check_textos_paises pl`: 1173 textos, 0 avisos.
- `check_fronteras`: 7797 archivos OK. `check_eol`: OK.
- `check_seo_intl`: 7712 páginas intl OK en los dos modos.
- `check_hreflang`: 1278 fallas, todas del clúster de inflación (630 pares que no listan las mismas
  páginas y 9 no recíprocos, en cada modo). Suben desde 924 porque main trae más mercados en el
  clúster; es la falla conocida de main arreglada en `claude/mundo-arreglos-2026-10-24`. Ajena a pl.

## Saltado

- Sin credenciales: no hubo pasos que las pidieran. Sin push ni PR (403), cuerpo en este archivo.
- `next dev` y `npm run build` no se corrieron (opcionales; check-all cubre tsc y checks).

## Pendientes y riesgos

- Cargar los valores de 2027 (ZUS, FP/FS/FGŚP de la ustawa budżetowa 2027, 30-krotność, bases
  de la zdrowotna) cuando se publiquen; si no, el 1/1/2027 se caen wynagrodzenia, B2B, ZUS y otras.
- `check_hreflang` falla con 924 pares, todos del clúster de inflación entre mercados que ya
  están en otra fecha (Asia y Oceanía al 25/10); pl solo aparece como miembro del clúster.
  Ajeno a pl, no se tocaron series de otros países.
- PPK, ulgi del PIT, koszty autorskie en el etat y el límite anual de 30-krotności en
  koszt-pracodawcy no se modelan (se dice en observaciones o FAQ).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
