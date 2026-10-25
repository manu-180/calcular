# País dk: Danmark en danés (62 calculadoras, 22 locales, publicado)

## Qué incluye

Mercado `src/paises/dk/` (codigo `dk`, pais `DK`, idioma `da`, locale `da-DK`, trato `tu` («du»,
ADR 0002 D9), moneda DKK, escala 7, nombre «Danmark», zona Europe/Copenhagen), publicado en el
commit `publicar dk` (estado `publicado`, alta al final de `PAISES`, cargadores y medición
regenerados).

- 22 calculadoras locales, todas `publicado`, ninguna en borrador:
  | slug | concepto |
  |---|---|
  | loen-efter-skat | sueldo-neto (am-bidrag, ATP, pensión propia, kommuneskat y kirkeskat de las 98 kommuner, bundskat, mellemskat, topskat, toptopskat, skatteloft 44,57 %, beskæftigelses- y jobfradrag; entra en «Tu sueldo en el mundo») |
  | topskat | propio (mellemskat, topskat y toptopskat de la reforma 2026, sueldo en el que empieza cada una) |
  | am-bidrag | aportes-seguridad-social (8 %, ATP de las dos partes) |
  | kommuneskat | propio (kommuneskat, kirkeskat, skatteloftsnedslag y grundskyld de las 98 kommuner) |
  | feriepenge | vacaciones (feriegodtgørelse 12,5 %, ferietillæg 1 %, 2,08 días por mes) |
  | fratraedelsesgodtgoerelse | indemnizacion-despido (funktionærloven § 2 a: 1 y 3 meses a los 12 y 17 años) |
  | opsigelsesvarsel | preaviso (funktionærloven § 2: 1 a 6 meses, anciennitet a la fecha de fratræden) |
  | momsberegner | iva (25 %; reemplaza la universal) |
  | boerne-og-ungeydelse | propio (børnecheck 2026 y 2027, deling, aftrapning 2 %) |
  | su-beregner | propio (videregående: udeboende y hjemmeboende con tillæg por forældreindkomst) |
  | dagpenge | propio (90 % del grundlag después de am-bidrag, máximos fuldtid y deltid) |
  | atp-bidrag | propio (por horas al mes, privado) |
  | aktieskat | propio (27/42 %, grænse 79.400 y 89.600 kr. en 2027) |
  | ejendomsvaerdiskat | propio (5,1 y 14 promille sobre el 80 %, grænse 9.007.000 kr.) |
  | grundskyld | propio (promille de cada kommune) |
  | gaveafgift | propio (bundfradrag y tasas 2026 y 2027) |
  | valutaomregner | tipo-de-cambio (EUR, USD, GBP, SEK, NOK, Nationalbanken) |
  | inflationsberegner | inflacion (forbrugerprisindeks PRIS01) |
  | folkepension | jubilacion (folkepensionsalder por fecha de nacimiento, grundbeløb y pensionstillæg) |
  | morarenter | propio (renteloven: referencesats + 8 por halvår, rykkergebyr) |
  | koerselsfradrag | propio (2026, satser subidas de forma temporal, yderkommuner, skatteværdi) |
  | koerselsgodtgoerelse | propio (Skatterådet 3,94 y 2,28 kr. por km, cykel 0,64) |
- 40 universales en danés con `universales: "todas"` (la de moms cae porque hay momsberegner local).
- Total 62. Dos por encima del tope de 60: las 22 locales están en el rango 15 a 25 del brief y cada
  una responde a una búsqueda danesa real.
- Dinamarca no tiene salario mínimo legal: no hay calculadora de salario-minimo. Tampoco horas
  extra (dependen de la overenskomst).
- SEO propio por página (title, description, h1, FAQ, glosario) con las búsquedas danesas:
  «løn efter skat», «topskat 2026», «am-bidrag», «kommuneskat 2026», «beregn feriepenge»,
  «fratrædelsesgodtgørelse», «opsigelsesvarsel», «momsberegner», «børnecheck 2026», «SU 2026»,
  «dagpenge 2026», «ATP-bidrag», «aktieskat», «ejendomsværdiskat», «grundskyld»,
  «gaveafgift 2026», «valutaomregner», «inflationsberegner», «folkepension», «morarenter»,
  «kørselsfradrag 2026», «kørselsgodtgørelse».
- `series.json`: kurser de Nationalbanken EUR, USD, GBP, SEK y NOK (44 días hábiles hasta el
  23/10/2026, DKK por 100) y forbrugerprisindeks (PRIS01, 2000-12 a 2026-09). `avisos.json` (2:
  kommuneskat 2027 todavía sin publicar y kørselsfradrag 2026 temporal), `novedades.ts` (3:
  reforma de topskat 2026, morarente 10 % desde el 1/7/2026, kørselsfradrag 2026), `fuentes.ts`
  (19 detectores) y `scripts/paises/dk/probar_detectores.ts`.

## Datos

55 datos, 69 tramos, todos verificados el 24/10/2026 en fuentes primarias; 0 no verificados.

- Skatte- og Vækstministeriet (svmn.dk, el ex skm.dk; skat.dk enlaza ahí sus «Satser»): páginas de
  satser de personskatteloven (bundskat 12,01 %, personfradrag 54.100/55.700, mellemskat 7,5 % sobre
  641.200, topskat 7,5 % sobre 777.900, toptopskat 5 % sobre 2.592.700, skatteloft 44,57 %,
  aktieindkomst 27/42 % y grænse 79.400/89.600), ligningsloven (beskæftigelsesfradrag 12,75 %
  máx. 63.300, jobfradrag 4,5 % sobre 235.200 máx. 3.100, kørselsgodtgørelse), arbejdsmarkedsbidrag
  (8 %), boafgiftsloven (gaveafgift), børne- og ungeydelsesloven, ejendomsskatteloven y momsloven
  (25 %), todas con los valores 2026 y 2027; y la oversigt over kommuneskatter 2026 (98 kommuner,
  idéntica a la tabla PSKAT de Danmarks Statistik, de donde se generó el mapa).
- skat.dk: satser for kørselsfradrag 2026 (3,17 / 1,59 / 3,51 kr.).
- Juridisk vejledning C.A.4.3.7 (info.skat.dk): base del beskæftigelsesfradrag (arbejdsindkomst).
- retsinformation.dk (PDF de las LBK vigentes): ferieloven LBK 152/2024 (§§ 4, 5, 16, 18, 19),
  funktionærloven LBK 1002/2017 (§§ 1, 2, 2 a, 2 b), renteloven LBK 459/2014 (§§ 3, 5, 9 b) y la
  vejledning VEJ 9121/2026 de dagpenge (90 %, grundlag después de am-bidrag, 12 de 24 meses).
- bm.dk (Beskæftigelses- og Ligestillingsministeriet): satser 2026 de dagpenge y folkepension.
- borger.dk: ATP-satser 2026 privat (escrita por ATP) y folkepensionsalder por fecha de nacimiento.
- su.dk: SU 2026 videregående (udeboende 7.426, hjemmeboende 1.154 a 3.202, forældreindkomst,
  søskendefradrag).
- Nationalbanken: XML de valutakurser; historia de kurser (DNVALD) y de la udlånsrente (DNRENTD)
  por la API de Statistikbanken. Danmarks Statistik: PRIS01 y PSKAT.

## Decisiones

- Trato `tu` («du»), slugs con oe/aa/ae como las universales danesas (`loen-efter-skat`,
  `boerne-og-ungeydelse`, `fratraedelsesgodtgoerelse`).
- Los valores 2027 que el ministerio ya publica por regulación de PSL § 20 se cargan como tramo
  verificado. Las tasas de kommuneskat, kirkeskat y grundskyld 2027 todavía no salieron: los
  datos 2026 quedan sin `hasta` (con aviso y `proximaRevision`) para que el país no se caiga el
  1/1/2027. SU, dagpenge, folkepension y kørselsfradrag/-godtgørelse vencen el 31/12/2026: esas
  calculadoras salen de lo publicable el 1/1/2027 hasta cargar 2027.
- Løn efter skat: am-bidrag sobre la løn menos la pensión propia y el ATP (el am-bidrag de la
  pensión lo retiene la pensionskasse, kildeskatteloven § 49 D); beskæftigelses- y jobfradrag sobre
  la løn bruta (arbejdsindkomst, JV C.A.4.3.7). Sin kapitalindkomst ni fradrag personales.
- Topskat y kommuneskat: el skatteloftsnedslag se calcula (kommune + bund + mellemskat − 44,57) y da
  igual a la columna oficial en las 98 kommuner.
- Opsigelsesvarsel: la anciennitet se cuenta a la fecha de fratræden (fin de mes), lo que reproduce
  los cortes conocidos de 5 meses, 2 años 9 meses, 5 años 8 meses y 8 años 7 meses.
- Morarenter: la calculadora lee los halvår verificados de `datos.json` (como el CPI de pl con
  series.json) y corta en la fecha de cálculo; fuera de los halvår cargados tira error.
- Ejendomsværdiskat y grundskyld: sin skatterabat, stigningsbegrænsning ni nedslag (se dice en
  observaciones y FAQ).
- Aviso: unidades `dias`, `horas` y `meses` ya traen la palabra al formatear; los textos no la
  repiten después del marcador.

## Depende de

`claude/mundo-motor-eu` (motor pl/sv/da/nb/fi) y `claude/mundo-trad-da` (universales en danés),
ninguna mergeada en main. La rama sale de `claude/mundo-motor-eu` y mergea `claude/mundo-trad-da`
(fast-forward, sin conflictos) y `origin/main` (286ecb06, sin conflictos).

## Checks corridos

Con dk publicado (después de `check_motor --generar-cargadores` y `check_medicion_mercados --escribir`):

- `npx tsc --noEmit -p .`: OK.
- `check_motor --generar-cargadores`: 2352 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_paises dk`: OK, 55 datos (69 tramos verificados, 0 pendientes), 6 series, 62 calculadoras,
  publicado; 2 avisos esperables (kurser de Nationalbanken y forbrugerprisindeks dejan de ser
  publicables al 24/11 si el cron no trae puntos nuevos).
- `check_paises_casos dk`: 83 casos en 22 archivos OK. `check_textos_paises dk`: 1435 textos, 0 avisos.
- `check_fronteras`: 7788 archivos OK. `check_eol`: 8683 archivos en LF.
- `check_seo_intl`: 7708 páginas intl OK en los dos modos.
- `check_ofertas_intl dk`: OK. Completo: 15 fallas, todas de `cl/sueldo-liquido` y `cl/finiquito`
  (tope en UF), la falla conocida de main.
- `check_mundo`: DK entra declarado (19,8 / 32,0 / 40,8 %); TODO OK.
- `check_hreflang`: 1924 fallas, todas del clúster de inflación (la falla conocida de main arreglada
  en `claude/mundo-arreglos-2026-10-24`); 74 de ellas nombran `/dk/inflationsberegner` solo porque
  dk entra como miembro del clúster. Ninguna fuera del clúster de inflación.
- `check-all`: 151/155 suites verdes. Fallan `check_hreflang` y `check_ofertas_intl` (lo de arriba),
  `check_mes_en_render` (11 páginas de `src/app/(ar)` que evalúan el reloj al cargar el módulo) y
  `check_panel_sql` (tablas `ca_sueldos_*` sin RLS en el esquema): las dos últimas vienen de main y
  no tocan archivos de dk.
- Kommuner cotejadas contra la tabla oficial de svmn.dk en el navegador: las 98 filas (kommuneskat,
  kirkeskat, grundskyld y skatteloftsnedslag calculado) dan el mismo hash.
- Detectores probados contra la red con `scripts/paises/dk/probar_detectores.ts`: 19/19 responden
  (5 kurser hasta el 23/10/2026, forbrugerprisindeks con 310 puntos hasta 2026-09, udlånsrente y
  13 páginas de satser sin hallazgos nuevos).

## Saltado

- Sin credenciales: no hubo pasos que las pidieran. Sin push ni PR (403), cuerpo en este archivo.
- `next dev` y `npm run build` no se corrieron (opcionales; check-all cubre tsc y checks).

## Pendientes y riesgos

- Cargar en noviembre/diciembre las kommuneskat, kirkeskat y grundskyld 2027 (svmn.dk o PSKAT), y
  en enero los satser 2027 de SU, dagpenge, folkepension, ATP y kørselsfradrag/-godtgørelse.
- El BDO y Deloitte mencionan que el gobierno podría congelar los beløbsgrænser 2027; si pasa, hay
  que corregir los tramos 2027 de personskatteloven y ligningsloven (el detector de la página de
  satser lo avisa).
- Løn efter skat no modela pensión del empleador en la base del beskæftigelsesfradrag ni fradrag
  personales; folkepension no modela la supplerende pensionsydelse ni la reducción para parejas
  con un solo pensionista.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
