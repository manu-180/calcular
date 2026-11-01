# Estado: calcularya.com en el mundo

Plan y decisiones: `docs/adr/0002-mundo.md`. Receta de universales: `docs/global/RECETA-UNIVERSAL.md`.
Rama de integración: `claude/global-calculators-multipa-s-dfbec3` (incluye el PR #30 de auditoría).

## PLAN DE PAÍSES (Manuel, 23/10/2026): hay que hacerlos todos

`docs/global/plan-paises/2026-10-23-tope-paises-calcular.md` (y el `.csv` con los portales probados
por país) es el plan vigente. Manda sobre `docs/global/PAISES.md`.
- Nivel A, 87 países: primero, en el orden de «Orden sugerido para los A pendientes» (por usuarios
  de internet).
- Nivel B, 58 países: después. Lo que no tenga fuente legible queda en borrador.
- Nivel C, 50 países: no se hacen salvo que Manuel diga lo contrario. Liechtenstein se hizo igual:
  ahv.li y gesetze.li fueron legibles.

Barra para cada país: entre 40 y 60 calculadoras, cada una con oferta de venta, en su idioma
(textos nativos, no traducidos) y con SEO propio por página con las búsquedas reales del país.

Al 23/10 están publicados o en camino a main: ar (calcular.ar) y en calcularya cl co mx pe uy ec cr
gt py do sv pa hn ni ve bo us br gb fr de es it ca nl ie at pt au nz za ch sg be in hk ng my ph ma
lu ke tz gh sn pk jp ae li, más las ediciones ch-fr ch-it ca-fr be-fr lu-de. Se puede reconstruir
desde `PAISES` en `src/paises/index.ts`.

## 01/11/2026 · Tanda 6 de países: am, al, si, ee, is, lv (`claude/paises-tanda-6`)

Sale de `claude/paises-tanda-5`, ya en main, y lleva el `origin/main` con el build nuevo. Publicados Armenia (am), Albania (al),
Eslovenia (si), Estonia (ee), Islandia (is) y Letonia (lv), detrás de mn. Trae los motores armenio (D30), albanés (D31), esloveno
(D32), estonio (D33), islandés (D34) y letón (D35). Informes en `scripts/paises/<m>/INFORME.md`. `mercados-registro.ts` regenerado: 143 mercados intl. Mercado `ee` =
Estonia con idioma `et`; mercado `et` = Etiopía con idioma `en` (`zz-et` es la edición de prueba en estonio): no se cruzan.

| País | Locales | Publicables | Borrador | Universales |
|---|---|---|---|---|
| am | 21 | 21 | ninguno | todas (41, `iva` con `am.aah`) |
| al | 23 | 19 | leja-vjetore, oret-shtese, afati-i-njoftimit, shperblimi-per-vjetersi | todas (cae IVA) |
| si | 24 | 24 | ninguno | todas (cae IVA) |
| ee | 21 | 21 | ninguno | todas (cae IVA) |
| is | 25 | 23 | desemberuppbot, orlofsuppbot | todas (cae IVA) |
| lv | 21 | 20 | uzteikuma-termins | todas (cae IVA) |

Checks: `check-all` 156 de 159 antes de sumar main y lv; después, en verde tsc, `check_motor` (5889), `check_seo_intl` (20774 páginas), `check_hreflang` (22803) y `check_eol`. Fallan solo cosas viejas y ajenas: `check_mundo` (be), `check_paises` (28 en 175: series vencidas y llaves de ca) y `check_textos_paises` (6: bo, cr, mx, pe). `check_mundo` no volvió a correr con lv.

Ajustes de la integración:
- `sinMayusculas` une ka y hy en un solo regex.
- Descripciones de país, fuentes y novedades en armenio acortadas: `check_seo_intl` daba 174 de ancho contra un máximo de 160.
- Tarjetas: `tieneMarcadores` (registro) también cuenta `{{anio}}`. Antes un h1 con solo ese marcador y un primer párrafo sin dato
  mostraba `{{anio}}` crudo en la tarjeta. Prueba en `check_motor`.
- Dram: `DECIMALES_DE_USO = { AMD: 0 }` en `decimalesDeMoneda`, y `formatearMonto` lo respeta. Tabla y universales de Armenia ya
  no dicen «75 000,00 ֏». No se hizo con `mercado.redondeo.decimales` porque ese camino cambia dos mercados publicados: pk (Intl 0,
  redondeo 2) y uz (Intl 2, redondeo 0). **Pedido abierto:** uz tiene el mismo problema que tenía am; decidir si UZS va a la tabla.
- ISK: `is` ya tenía `simbolos: { ISK: "kr." }`; `check_motor` exige símbolo propio en todo mercado con ISK (Node da «kr.»,
  Chromium «ISK»; el check corre en Node, no ve el error de hidratación en sí). `zz-is` no lo lleva: hereda XTS de zz y el registro
  rechaza símbolos de otra moneda, lo que la deja fuera del registro.

Datos no verificados y motivo:
- am: ninguno. `cba.am` corta la conexión; el tipo de cambio se leyó en el CSV oficial de `api.cba.am`.
- al: `al.paga-maksimale-kontribute`: la noticia de Tatime responde con bloqueo y solo hay extracto (186 416, PwC dice 220 520); las
  4 calculadoras que cotizan piden el tope en un campo opcional y, sin él, exageran la cotización en sueldos altos.
  `al.leje-vjetore`, `al.ore-shtese`, `al.afat-njoftimi`, `al.shperblim-vjetersi`: Kodi i Punës bloqueado por firewall o solo con JavaScript.
- si: ningún dato cargado sin verificar. Fuera del cálculo por eso: tope del nadomestilo parental (112.a ZSDP-1, avisado en pantalla)
  y porcentaje de nadure (lo fija la convención colectiva; el 30 es un valor inicial editable).
- ee: ninguno. `ee.fie-sotsiaalmaksu-lagi` (111 720) es derivado de SMS § 2; el PDF de EMTA no se pudo leer. `tkh-max-*` de Töötukassa, sin recalcular.
- is: `is.desemberuppbot` (solo SA, parte del convenio) e `is.orlofsuppbot` (solo extracto). Decisión pendiente: si se acepta el
  convenio como fuente, se verifican y publican. althingi.is responde 403: ley 30/1987 y ley del stimpilgjald sin leer.
- lv: `lv.uzteikums` (10 días e inmediato): solo el art. 103 de 2001 en vestnesis.lv; `likumi.lv` caído todo el día y sin redacción vigente.

Riesgos:
- Todos: D30 a D35 piden revisión de hablante nativo antes de publicar y no se hizo (el informe de is dice que «bloquea la
  publicación»). Se publica en la rama por encargo: **decidir antes de mergear**. Slugs sin validar en el autocompletar de Google de cada país.
- Cálculo en el navegador sin probar en ninguno de los seis. am, al, ee y lv ni miraron `next dev`; si e is lo miraron sin apretar calcular (en is, webpack no carga el cálculo).
- am: mínimo de la ley de prestaciones tomado literal (90 000; podría ser 93 750): riesgo principal de cálculo. Seguro de salud 2026
  como si-no. Art. 150 con cambios desde 2027 sin leer en detalle: revisar en enero.
- al: fuentes leídas al principio con User-Agent de navegador, contra la regla; el 1/11 se releyeron con uno propio los seis PDF y el
  texto es idéntico. Divisor de 30 días y exención de dhurata son lecturas propias. Compensación del 16,7 % sin modelar. El neto baja
  en 50 000 y 60 000 lekë (es la ley). `al.ick` sin detector (xlsx): carga a mano, se cae hacia fines de noviembre. `kufi-zero` vence el 31/12/2029.
- si: referendo ZIURS del **6/12/2026**: revisar después (normiranci con efecto 1/1/2026, zimski regres, tope de contribuciones). Series caen antes del 1/12 sin cron.
- ee: FIE sin II pilar y haigushüvitis sin embarazo o donación, **sin aviso** en la página. Töötuskindlustus termina el 31/12/2026: falta el decreto 2027. THI cae el 1/12 sin cron.
- is: `orlofslaun` publicable con porcentajes de una guía de 1993 (art. 7 sin leer). `drattarvextir` cubre solo noviembre y queda sin
  `hasta`: revisar cada mes. `meginvextir` decide el 18/11. Pedido abierto: prueba de formato en Chromium.
- lv: leyes leídas en extractos de LM y VDI de 2020 a 2023, sin contrastar con likumi.lv (horas extra al 100 %: en 2017 hubo un proyecto
  para bajarla). Solidaritātes nodoklis y su deducción, 3 % sobre 200 000 y vecāku pabalsts son lecturas o aproximaciones propias. VSAA
  leída en inglés con traducción automática. Reforma de cuidado infantil del 3/11/2026: revisar vecāku pabalsts. Serie de inflación cae el 1/12 sin cron.

## 01/11/2026 · Tanda 5 de países: sk, ge, hr, mn (`claude/paises-tanda-5`)

Publicados: Eslovaquia (sk), Georgia (ge), Croacia (hr) y Mongolia (mn), detrás de bt. Los cuatro con
`universales: "todas"` (40 universales; en sk, ge y hr cae la de IVA por la local, en mn queda la universal sin ajuste).
Trae los motores eslovaco (D25), georgiano (D26), croata (D27) y mongol (D28). Informes en
`scripts/paises/<m>/INFORME.md`. `mercados-registro.ts` regenerado: 137 mercados intl. sr y hr comparten 26 slugs de
universales (por ejemplo `kalkulator-kredita`): no chocan, porque el registro las indexa por mercado.

| País | Locales | Publicables | Borrador | Universales |
|---|---|---|---|---|
| sk | 25 | 24 | inflacna-kalkulacka | todas |
| ge | 23 | 22 | saprotsento-shemosavlis-gadasakhadi | todas |
| hr | 21 | 20 | doprinosi-za-obrtnike | todas |
| mn | 16 | 10 | tetgever-tootsooluur, ul-khodlokh-khorongiin-tatvar, eeljiin-amraltyn-olgovor, iluu-tsagiin-khols, khalagdsany-tetgemj, ajlaas-garakh-medegdel | todas |

Datos no verificados y motivo:
- sk: `sk.inflacia-rocna`: `data.statistics.sk` rechaza la conexión.
- ge: `ge.protsenti` (decisión de esta integración): el art. 131.5 dice que el interés de una institución licenciada no
  tributa en la fuente y la guía de rs.ge da 5 %. Además se sacó el interés de `sashemosavlo-gadasakhadi` y la novedad
  `ge.mpr-2026-05`. `ge.dekretuli-dakhmareba`: el monto lo fija un decreto en matsne, ilegible; no lo usa ninguna
  calculadora.
- hr: `hr.stope-samostalni` (15, 5 y 16,5 %): solo leídas en la página de paušalistas, Zakon o doprinosima no se pudo abrir.
- mn: 12 datos del Хөдөлмөрийн хууль (decisión de esta integración: `mn.eeljiin-*`, `mn.iluu-tsag-koef`,
  `mn.amralt-odor-koef`, `mn.bayar-koef`, `mn.shono-koef`, `mn.doloo-khonog-tsag`, `mn.tsutslalt-sar`, `mn.medegdel-khonog`):
  solo el texto original de 2021 en nczd.gov.mn, y legalinfo.mn rechaza la conexión (reintentado el 1/11). Contenido y
  casos para recuperar en `origin/claude/pais-mn`. `mn.noat`, `mn.ul-khodlokh-khuvi-dood` y `-deed`: solo extracto de
  buscador. `mn.khkhoat` y `mn.khongololt` desde 2027, `mn.hhdh-sar` y `mn.hhdh-tsag` desde 2027 y `mn.emd-*` desde 2027:
  reforma o decreto sin leer.

Revisado: Zakon o radu de hr, cotejado en narodne-novine.nn.hr con el texto completo de NN 127/2017, 98/2019, 151/2022 y la
Odluka USRH de NN 64/2023 (solo art. 192). Las cifras de los arts. 65, 77, 122 y 126 no cambiaron y los arts. 78 a 82 no se
tocaron, así que las laborales siguen publicables. Sí faltaba y se sumó: sin otkazni rok ni otpremnina con 65 años de edad
y 15 de cotización (arts. 122.8 y 126.2) y recargo de domingo de al menos 50 % (art. 94.1). Excepción de topónimos para
Hlebine y Sveta Nedelja en `reglas_idioma` y sus `etiquetas`.

Riesgos:
- Revisión por hablante nativo: D25 a D28 la piden para eslovaco, georgiano, croata y mongol, y no se hizo. Los slugs no se
  validaron en el autocompletar de Google de cada país, y no se cambian después de publicar.
- mn: reforma tributaria desde el 1/1/2027. ХХОАТ, хөнгөлөлт, ЭМД y mínimo tienen `hasta: 2026-12-31`: sueldo neto, ХХОАТ,
  НДШ, costo del empleador, mínimo y prestaciones dejan de publicarse ese día hasta cargar 2027, y eso exige un acceso que
  llegue a legalinfo.mn. НӨАТ queda en la universal sin ajuste. Base del ХХОАТ, ЭМД sin tope y empleador sin tope son lecturas
  propias. Solo 10 locales publicables, debajo de la barra de 15 a 25.
- ge: matsne.gov.ge responde «Access Denied». Código Laboral leído en un PDF de sla.gov.ge, con enmiendas al menos hasta
  2023: confirmar arts. 27, 31, 37 y 48. Art. 46.4 no cubre normas especiales del sector público. Sin salario mínimo (decreto
  de 1999 ilegible). `ge.cpi` se carga a mano: a los 70 días `inflatsiis-kalkulatori` deja de publicarse.
- hr: tope de la najviša osnovica aplicado solo al mirovinsko sin leer el art. 205. Regla de prebivalište vista en un extracto.
  Series `hr.prosjecna-*` y `hr.medijalna-*` a mano (`prosjecna-placa` se cae a los 120 días). Tasas municipales, bases y
  paušal 2027 se cargan en diciembre. Selector de 556 opciones no visto renderizado (unos 30 KB por página en cinco páginas).
  `gen_datos.py` no está en el repo. Inflación con HICP y no IPC nacional.
- sk: los valores anuales vencen el 31/12/2026 (mínimo 2027 de 972 sin cargar) y hay redacciones futuras sin leer en
  595/2003, 311/2001, 222/2004, 580/2004 y 461/2003. Bono mensual, redondeo de dávky y tope de PN inferidos.
  `rodicovsky-prispevok` con 364,80 de una página sin fecha.
- Ningún país se miró renderizado en `next dev` y `next build` no se corrió en esta integración.

Checks (`check-all`, 1/11/2026): 155 de 159 suites en la corrida completa. `check_seo_intl` (8 fallas de ancho en /ge y
/zz-ka) y `check_textos_paises` (`ge.protsenti`, `mn.khalagdsany-tetgemj`) eran de esta tanda: arregladas y repasadas sueltas.
Ajenas a esta tanda:
- `check_mundo`: be (neto de 24.000).
- `check_paises`: 27 fallas. 23 son series vencidas (bo, ca, ca-fr, ch, ch-fr, ch-it, co, cr, gb, gt, hk, kr, kw, mx, ni, pe, pk,
  za) y 4 las llaves anidadas de `oas-clawback` y `tfsa-contribution-room` de ca y ca-fr.
- `check_textos_paises`: 6 de ancho en bo.salario-minimo (2), bo.finiquito-atrasado, cr.tipo-de-cambio, mx.tipo-de-cambio y
  pe.tipo-de-cambio.

## 01/11/2026 · Motor albanés (`claude/mundo-motor-sq`)

`sq` entra en `IDIOMAS` con motor, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo en el mundo»
(`paga-ne-bote`), rankings (`renditja-e-vendeve`), horas de trabajo (`sa-ore-pune`), calendario
(`kalendari-i-pagave`), «Sueldos reales» (`pagat-reale`), venta completa (`IDIOMAS_VENTA`) y las 41 universales con
slug ASCII propio. «ju» en minúscula con 2.ª del plural («vendosni»), botón «Llogarit», mercados con `trato:
"usted"`, formato `1 234 567 Lekë`, comillas “ ”. Plurales one/other (`pluralSq`) y casos del país (`GRAMATICA.sq`,
`rasatSq`). Decisiones en ADR 0002, D31. Edición de prueba `zz-sq` (interna, `sq-001`).
- Falta para publicar Albania: el país en sí, con datos verificados, y revisión por hablante nativo. `kalkulator-page`
  queda libre para su local. `mercado.nombre` va indefinido: «Shqipëri».

## 01/11/2026 · Motor esloveno (`claude/mundo-motor-sl`, ADR 0002 D32)

`sl` entra en `IDIOMAS` e `IDIOMAS_VENTA` con motor, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo
en el mundo» (`placa-po-svetu`), rankings (`lestvice-drzav`), horas de trabajo (`koliko-ur-dela`), calendario
(`koledar-plac`), «Sueldos reales» (`dejanske-place`), venta completa y las 41 universales con slug ASCII propio.
Vikanje con «vi» en minúscula y 2.ª del plural («vnesite»), mercados con `trato: "usted"`, formato `1.234,50 €`.
Plurales one/two/few/other (`pluralSl`) y declinación del país (`GRAMATICA.sl`). Edición de prueba `zz-sl` (interna, `sl-001`).
Fuentes oficiales: fu.gov.si, gov.si, pisrs.si y bsi.si abren desde este entorno (1/11/2026), buena noticia para el
agente de país.
- Falta para publicar Eslovenia: el país en sí, con datos verificados, y revisión por hablante nativo.

## 01/11/2026 · Motor estonio (`claude/mundo-motor-et`, ADR 0002 D33)

`et` entra en `IDIOMAS` e `IDIOMAS_VENTA` con motor, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo
en el mundo» (`palk-maailmas`), rankings (`riikide-vordlus`), horas de trabajo (`tootunnid`), calendario
(`palgakalender`), «Sueldos reales» (`tegelikud-palgad`), venta completa y las 41 universales con slug ASCII propio.
Registro «sina» con imperativo de segunda del singular, mercados con `trato: "tu"`, formato `1 234,50 €`. Plurales
one/other con partitivo singular y declinación del país (`GRAMATICA.et`). Edición de prueba `zz-et` (interna, `et-001`).
Estonia será el mercado `ee`; `et` como mercado sigue siendo Etiopía.
- Falta para publicar Estonia: el país en sí, con datos verificados, y revisión por hablante nativo.

## 01/11/2026 · Motor islandés (`claude/mundo-motor-is`, ADR 0002 D34)

`is` entra en `IDIOMAS` e `IDIOMAS_VENTA` con motor, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo
en el mundo» (`laun-um-allan-heim`), rankings (`rodun-landa`), horas de trabajo (`hversu-margar-vinnustundir`),
calendario (`launadagatal`), «Sueldos reales» (`raunveruleg-laun`), venta completa y las 41 universales con slug ASCII
propio. «þú» e imperativo de singular, mercados con `trato: "tu"`, formato `1.234.568 kr.`. Plurales one/other
(`pluralIs`: «21 dagur») y país con caso y preposición (`GRAMATICA.is`: «á Íslandi», «í Þýskalandi»). Edición de prueba
`zz-is` (interna, `is-001`).
- Falta para publicar Islandia: el país en sí, con datos verificados, y revisión por hablante nativo.

## 01/11/2026 · Tanda 4 de países: rs, me, bg, tj, bt (`claude/paises-tanda-4`)

Publicados: Serbia (rs), Montenegro (me), Bulgaria (bg), Tayikistán (tj) y Bután (bt), detrás de cn. Los cinco
con `universales: "todas"` (cae sola la de IVA, porque hay local del mismo concepto). Trae los motores serbio
(`claude/mundo-motor-sr`, D23) y búlgaro (`claude/mundo-motor-bg`, D24) y `check_ofertas_intl` con textos de
país y mail en el locale del mercado. Informes en `scripts/paises/<m>/INFORME.md`. `mercados-registro.ts`
regenerado: 133 mercados intl.

| País | Locales | Publicables | Borrador | Universales |
|---|---|---|---|---|
| rs | 20 | 19 | porodiljsko-odsustvo | todas |
| me | 18 | 16 | porodiljsko-odsustvo, prekovremeni-rad | todas |
| bg | 21 | 18 | danak-dividenti, danak-varhu-nedvizhimi-imoti, zakonna-lihva | todas |
| tj | 11 | 7 | otpusknye, sverkhurochnye, vykhodnoe-posobie, srok-preduprezhdeniya | todas |
| bt | 24 | 24 | ninguna | todas |

Datos no verificados y motivo:
- rs: `rs.porodiljsko-gornja-granica`: solo en el texto de 2017 de parlament.gov.rs, sin refundido vigente.
- me: `me.prekovremeni-uvecanje`, `me.nocni-uvecanje`, `me.praznik-uvecanje` y `me.nedjelja-uvecanje`
  (decisión de esta integración): el Opšti kolektivni ugovor (Sl. list 150/22) no se leyó, los porcentajes
  salen de respuestas del ministerio que lo citan, y la extensión de Sl. list 45/26 vence el 30/4/2026 sin que
  se sepa qué rige después. `prekovremeni-rad` en borrador, sin `.casos.ts`. `me.porodiljsko-staz-12` y
  `me.porodiljsko-gornja-granica`: art. 51 leído en un refundido de 2022, sin reformas posteriores.
- bg: `bg.danak-dividenti` (ЗДДФЛ vigente ilegible, fuentes en desacuerdo entre 5 % y 10 %),
  `bg.zakonna-lihva-nadbavka` (ПМС № 347/2025 en dv.parliament.bg, conexión rechazada),
  `bg.danak-nedvizhimi-sofia` (ordenanza de Sofía y ЗМДТ ilegibles).
- tj: 7 datos del Código de Trabajo (`tj.otpusk-dney`, `tj.nedelya-chasov`, `tj.sverkhurochnye-mnozhitel`,
  `tj.sverkhurochnye-chasov-v-god`, `tj.vykhodnoe-mesyatsev`, `tj.preduprezhdenie`,
  `tj.preduprezhdenie-rabotnika`): redacción hasta 2024 en copia de archive; las leyes № 2234, № 2261 y № 2312
  de 2026 no se leyeron completas. Contenido y casos para recuperar en el commit `6ed3d1d9`.
- bt: sin datos no verificados.

Revisado: `rs.neoporezivi-iznos` 2026 queda en 34.221. La nota de mfin.gov.rs dice «sa 34.521 dinar na 37.369
dinara» y «za 9,2 odsto», pero es errata: el 9,2 % solo cuadra con 34.221 y el refundido de la ley (docx de
mfin.gov.rs, disposición transitoria) dice 34.221.

Riesgos:
- Revisión por hablante nativo: D23 y D24 la piden para serbio y búlgaro, y no se hizo. Los slugs de rs, me y bg
  no se validaron en el autocompletar de Google del país, y no se cambian después de publicar.
- me: mezcla de variantes. Las locales van en ijekavski, las 40 universales y el marco del sitio en ekavski
  (D23 prevé una edición que los pise; no está hecha). La FAQ de `minimalna-zarada` sigue citando el art. 15 del
  Opšti kolektivni ugovor, sin cifras. `kalkulator-plate` usa prirez de 13 % (contrastado con MONSTAT, no es un
  valor legal). Sin tope de PIO ni contribución a la Cámara de Comercio. No se midió el 65 % de oraciones
  compartidas contra rs.
- rs: mínimo 2026 (371) citado de la nota del Ministerio, sin la Odluka; 405 de 2027 del comunicado del Gobierno.
  Las osnovice no tienen tramo 2027: cargarlas en diciembre, y releer Sl. glasnik 80/2026 antes.
- bg: 10 % y ДДС verificados en páginas del Ministerio de Economía, no en las leyes (nra.bg, parliament.bg y
  minfin.bg no se pudieron leer). Tope neto de болнични y майчинство aproximado.
- tj: solo 7 locales publicables, lejos de la barra de 15 a 25. Código Tributario leído en tayiko, traducción
  propia. Salario mínimo por el comentario oficial, no el decreto. Sin detector del Código Tributario (andoz.tj
  tiene la cadena TLS incompleta).
- bt: salario mínimo Nu. 125 de una circular de 2013, con prensa que dice otra cosa: conviene consultar al
  Departamento de Trabajo. El neto puede diferir un poco de la tabla de retención.
- Series a mano o sin detector: `rs.prosecna-bruto` y `rs.prosecna-neto`, `me.ipc` (avisa antes del 1/12/2026),
  `bg` ИПЦ (solo trae el último mes), `tj` kurs-valyut (si no corren los detectores), `bt` IPC y dólar.
- Ningún país se miró renderizado en `next dev` (Turbopack no acepta la junction de node_modules). `next build`
  tampoco se corrió en esta integración.

Checks (`check-all`, 1/11/2026): 156 de 159 suites. `check_motor` 5052 pruebas, `check_paises_casos` 10281 casos,
`check_hreflang` 20797 páginas, `check_ofertas_intl`, `check_guiones` y `check_fronteras` OK. Las tres que fallan
no son de esta tanda:
- `check_mundo`: be (neto de 24.000 da 23589,12 contra 23487,48 de la cuenta oficial).
- `check_paises`: 26 fallas en 17 mercados. 22 son series vencidas (bo, ca, ca-fr, ch, ch-fr, ch-it, cr, gb, gt, hk,
  kr, kw, mx, ni, pe, pk, za). Las otras 4 son llaves anidadas en la `description` de `oas-clawback` y
  `tfsa-contribution-room` de ca y ca-fr (`{{ca.tfsa-annual-limits[{{anio}}]}}`): vienen de main y no están en la lista
  de fallas conocidas.
- `check_textos_paises`: 6 fallas de ancho en bo.salario-minimo (2), bo.finiquito-atrasado, cr.tipo-de-cambio,
  mx.tipo-de-cambio y pe.tipo-de-cambio, todas calculadoras con serie vencida.
Falló también `me.prekovremeni-rad` por ancho al pasar a borrador: se reescribió su contenido sin los porcentajes y
se volvieron a correr `check_paises me`, `check_seo_pais me`, `check_textos_paises`, `check_guiones`, `check_eol` y
`tsc`, sin fallas nuevas (`check-all` completo no se repitió). Arreglada la raya de hu en `check_guiones`.
Avisos de series de la tanda antes del 1/12/2026: rs (4 calculadoras), me, bg y tj (1 cada una).

## 01/11/2026 · Motor armenio (`claude/mundo-motor-hy`, ADR 0002 D30)

Armenio oriental reformado completo: núcleo, venta, secciones globales, las 41 universales y `zz-hy`. Registro Դուք con mayúscula, «։» y «՞»,
sin plural detrás de un número, sufijos del país con `casosHy`, sin mayúsculas sostenidas («և» subiría a «ԵՒ»), ֏ detrás y una letra armenia
= 1,3 latinas en `anchoVisual`. Fuentes del país al 01/11: abren src.am, arlis.am, armstat.am y mlsa.am (redirige a welfare.gov.am); cba.am
cortó la conexión dos veces. Falta el país (`am`) y una revisión nativa.

## 31/10/2026 · Motor serbio latino (`claude/mundo-motor-sr`)

`sr` entra en `IDIOMAS` con motor, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo en el
mundo» (`plata-u-svetu`), rankings (`rang-lista-zemalja`), horas de trabajo (`koliko-sati-rada`),
calendario (`kalendar-isplata`), «Sueldos reales» (`stvarne-plate`), venta completa (`IDIOMAS_VENTA`) y las
41 universales con slug ASCII propio. Alfabeto latino (`sr-Latn-RS`), ekavski, «vi» en minúscula con 2.ª
del plural («unesite»), mercados con `trato: "usted"`, formato con «RSD» por Intl. Plurales
one/few/other (`pluralSr`) y declinación del país (`GRAMATICA.sr`). Universales neutrales: Montenegro las
reusa con EUR. Cirílico: edición futura (`rs-cyrl`). Decisiones en ADR 0002, D23. Edición de prueba `zz-sr`
(interna, `sr-Latn-001`).
- Falta para publicar Serbia y Montenegro: los países en sí, con datos verificados, y revisión por hablante nativo.

## 1/11/2026 · Motor vietnamita (`claude/mundo-motor-vi`, ADR 0002 D37)

`vi` en `IDIOMAS` e `IDIOMAS_VENTA`: textos del motor, sitio, inicio, legales, venta, mundo, rankings, horas,
calendario, sueldos, embed, compartir, afiliados y las 41 universales; edición interna `zz-vi`. Registro de bancos y
servicios («bạn», botón «Tính»), sin contrastar en sus webs (ver D37). Subset `vietnamese` de Geist precargado en todos los
mercados y Noto Sans en OG por el ₫. `tinh-luong-gross-net` queda libre. Listo para que un agente de país escriba Vietnam.
Fuentes el 1/11/2026: abren vanban.chinhphu.vn y sbv.gov.vn; gdt.gov.vn rechaza la conexión y baohiemxahoi.gov.vn la corta;
mof.gov.vn y nso.gov.vn sin probar. Falla de main ajena al frente: `check_mundo` (be, neto).

## 1/11/2026 · Motor mongol (`claude/mundo-motor-mn`, ADR 0002 D28)

`mn` en `IDIOMAS` e `IDIOMAS_VENTA`: textos del motor, sitio, inicio, legales, venta, mundo, rankings, horas,
calendario, sueldos, embed, compartir, afiliados y las 41 universales; edición interna `zz-mn`. Registro de bancos
y servicios («та», «-на уу», botones en «-х»), sin confirmar en sus webs (ver D28). El sufijo de caso lo lleva «улс»,
nunca el nombre ni una cifra. MNT como moneda de prueba. Listo para que un agente de país escriba Mongolia.
Falla de main ajena al frente: `check_mundo` (be, neto).

## 1/11/2026 · Motor letón (`claude/mundo-motor-lv`, ADR 0002 D35)

`lv` en `IDIOMAS` e `IDIOMAS_VENTA`: textos del motor, sitio, inicio, legales, venta, mundo, rankings, horas,
calendario, sueldos, embed, compartir, afiliados, redes y las 41 universales; edición interna `zz-lv`. Registro
de VID: «jūs» en minúscula, 2.ª del plural, botones en infinitivo («Aprēķināt»). Plurales one/other con el 0 en
genitivo (`pluralLv`), país con genitivo, locativo sin preposición y dativo (`GRAMATICA.lv`). `algas-kalkulators`
queda libre para la local. Listo para que un agente de país escriba Letonia (`lv`). Falla de main ajena al frente:
`check_mundo` (be, neto). Falta revisión por hablante nativo.

## 1/11/2026 · Motor macedonio (`claude/mundo-motor-mk`, ADR 0002 D36)

`mk` en `IDIOMAS` e `IDIOMAS_VENTA`: textos del motor, sitio, inicio, legales, venta, mundo, rankings, horas,
calendario, sueldos, embed, compartir, afiliados y las 41 universales; edición interna `zz-mk`. Registro de bancos
(«вие» en minúscula, 2.ª del plural, botón «Пресметај»). MKD como moneda de prueba. Falta revisión por hablante nativo.
Listo para que un agente de país escriba Macedonia del Norte (`kalkulator-za-plata` libre).

## 31/10/2026 · Motor búlgaro (`claude/mundo-motor-bg`, ADR 0002 D24)

`bg` en `IDIOMAS` e `IDIOMAS_VENTA`: textos del motor, sitio, inicio, legales, venta, mundo, rankings, horas,
calendario, sueldos, embed, compartir, afiliados y las 41 universales; edición interna `zz-bg`. Registro de
bancos y servicios: 2.ª del plural, «Вие» con mayúscula. EUR como moneda de prueba (euro desde el 1/1/2026,
comunicado de la BNB). Slugs con la transliteración oficial, por `src/motor/secciones.ts`, sin carpetas por
idioma. Listo para que un agente de país escriba Bulgaria (`bg`). Fallas de main ajenas al frente:
`check_horas` (AR, salario vencido el 31/10), `check_mundo` (be, neto) y `check_guiones` (raya en
`src/paises/hu/calculadoras/vegkielegites-szamitas.casos.ts`).

## 01/11/2026 · Motor croata (`claude/mundo-motor-hr`)

`hr` entra en `IDIOMAS` con motor, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo en el
mundo» (`placa-u-svijetu`), rankings (`ljestvica-zemalja`), horas de trabajo (`koliko-radnih-sati`), calendario
(`kalendar-placa`), «Sueldos reales» (`stvarne-place`), venta completa (`IDIOMAS_VENTA`) y las 41 universales
con slug ASCII propio. Ijekavski, «vi» en minúscula con 2.ª del plural («unesite»), mercados con `trato:
"usted"`, formato `1.234,50 €`. Plurales one/few/other (`pluralHr`) y declinación del país (`GRAMATICA.hr`).
Decisiones en ADR 0002, D27. Edición de prueba `zz-hr` (interna, `hr-001`).
- Falta para publicar Croacia: el país en sí, con datos verificados, y revisión por hablante nativo.

## 29/10/2026 · Tanda 2 de países (grupo A): ag, bz, ne, bn, np, sc, ws (`claude/paises-tanda-2`)

Publicados: Antigua y Barbuda (ag), Belice (bz), Níger (ne), Brunéi (bn), Nepal (np), Seychelles (sc) y
Samoa (ws). Los siete con `universales: "todas"` (cargadores generados, `mercados-registro.ts`
regenerado, 125 mercados intl). Informes de cada agente en `scripts/paises/<m>/INFORME.md`. Orden en
`PAISES`: ag, bz, ne, bn, np, sc, ws. El código de mercado `bn` (Brunéi) y la edición universal `zz-bn`
(bengalí, interna) conviven como `pl`/`zz-pl` o `id`/`zz-id`: son códigos distintos.

| País | Locales | Publicables | Borrador | Universales |
|---|---|---|---|---|
| ag | 16 | 9 | employer-cost, maternity-allowance, sickness-benefit, social-security, minimum-wage, take-home-pay, usd-to-xcd | todas |
| bz | 14 | 12 | income-tax, net-salary | todas |
| ne | 10 | 8 | calcul-tva, smig | todas |
| bn | 12 | 11 | minimum-wage | todas |
| np | 17 | 17 | ninguna | todas |
| sc | 18 | 16 | employer-cost, thirteenth-month-pay | todas |
| ws | 16 | 13 | employer-cost, net-pay, npf | todas |

Datos no verificados y motivo:
- ag: el tope mensual (EC$6.500) y semanal (EC$1.500) de Social Security salen de la FAQ de
  contribuciones del Board, que todavía cita las tasas de 2021: pasaron a `no-verificado`. Quedan en
  borrador las cuatro calculadoras que los usan (social-security, employer-cost, maternity-allowance,
  sickness-benefit) y se borraron sus `.casos.ts`; take-home-pay ya estaba en borrador. También sin
  verificar: salario mínimo EC$11,50 (solo prensa), paridad XCD/USD (sitio del ECCB inaccesible) y
  las bandas del Education Levy (la ley de 1994 las fija solo hasta 1996).
- sc: `sc.thirteenth-limit` pasó a `no-verificado` (la s.46D condicionó el pago 2023-2025 y no hay
  texto oficial de la enmienda 2025). thirteenth-month-pay y employer-cost (que usa el mismo dato) en
  borrador, sin `.casos.ts`.
- ws: las tasas SNPF (10 % empleado y 10 % empleador) salen de un Employers Guide desactualizado que
  contradice la FAQ oficial («14% or more»): `no-verificado`, igual que el recargo por mora y el día de
  vencimiento (misma guía). Borrador: npf, net-pay y employer-cost, sin `.casos.ts`. El título de npf
  tiene «20 %» fijo en el texto: revisarlo al verificar las tasas. El PAYE sigue publicado.
- bz: income-tax-exemption (29.000) y income-tax-rate (25 %): la Act 40/2024 no se pudo leer;
  income-tax y net-salary en borrador.
- ne: tva 19 % (CGI nuevo ilegible) y smig 42.000 F (decreto no publicado): calcul-tva y smig en
  borrador.
- bn: salario mínimo (BND 500 / 2,62 por hora): labour.gov.bn y agc.gov.bn inaccesibles; minimum-wage
  en borrador.
- np: sin datos no verificados.

Riesgos:
- ne: la Ordonnance 2026-45 (rectificativa de la ley de finanzas 2026) es un escaneo que no se leyó y
  puede cambiar el barème del ITS o las tasas; la TDTA del 5 % se aplica a todo el monto (el texto no
  lo precisa) y se avisa en pantalla.
- bz: Labour Act en la edición 2020; income tax en borrador por la Act 40/2024 ilegible.
- np: el inicio del año fiscal 2083/84 se infiere como 2026-07-17.
- sc: sin serie de tipo de cambio.
- ws: la serie de IPC no tiene detector, se actualiza a mano.
- bn: Employment Order 2009 ilegible, así que no hay calculadoras laborales.
- Avisos de series: ne (dólar-fcfa), np (dólar e inr) y ws (usd-to-wst, inflation) dejan de ser
  publicables si las series no se actualizan (check_paises avisa a 30 días).
- Fallas conocidas en main que siguen igual: `check_motor` forint, check_guiones de hu.

No publicados en esta sesión: tj (portales del Código Tributario y laboral caídos: solo 1 local
publicable; rama `claude/pais-tj` guardada), bt (impuesto, GST y salario mínimo ilegibles, Labour Act
solo en copia del ADB; rama `claude/pais-bt` guardada), sz, lc y tl (portales oficiales caídos o
inaccesibles desde el entorno; sin rama).

## 29/10/2026 · Tanda 1 de países (grupo A): mg, bj, bb, cv, fj (`claude/paises-tanda-1`)

Publicados: Madagascar (mg), Benín (bj), Barbados (bb), Cabo Verde (cv) y Fiyi (fj). Los cinco con
`universales: "todas"` (cargadores generados, `mercados-registro.ts` regenerado, 118 mercados intl).
Informes de cada agente en `scripts/paises/<m>/INFORME.md`.

| País | Locales | Publicables | Borrador | Datos verificados |
|---|---|---|---|---|
| mg | 16 | 15 | calcul-salaire-net | 35 (2026-10-27, impots.mg, CGI LFI 2026) |
| bj | 22 | 22 | ninguna | 45 (CGI 2026, Código del Trabajo, Ley 2017-05, BCEAO) |
| bb | 19 | 17 | minimum-wage-calculator, property-transfer-tax-calculator | ver `scripts/paises/bb/INFORME.md` |
| cv | 14 | 13 | euro-escudo | ver `scripts/paises/cv/INFORME.md` |
| fj | 17 | 12 | annual-leave, overtime, redundancy-pay, maternity-leave, minimum-wage | 20 tramos verificados, 8 pendientes |

Datos no verificados y motivo:
- mg: calcul-salaire-net en borrador porque las cotizaciones CNaPS 1 % y OSTIE 1 % no tienen texto
  oficial en línea.
- bb: el aumento del salario mínimo 2026 solo está anunciado (minimum-wage-calculator en borrador);
  la exención de 150 000 del property transfer tax no se pudo leer (property-transfer-tax-calculator
  en borrador).
- cv: la paridad euro-escudo no se pudo leer en bcv.cv (euro-escudo en borrador).
- fj: la ERA 2007 no fue accesible, así que annual-leave, overtime, redundancy-pay y maternity-leave
  quedan en borrador. El salario mínimo (FJ$4.50 desde 2024-08-01 y FJ$5.00 desde 2025-04-01) solo se
  leyó en el discurso del presupuesto 2024-25 y la Legal Notice no fue accesible: se pasó a
  `no-verificado` («solo leído en el discurso del presupuesto 2024-25; Legal Notice no accesible»),
  minimum-wage pasó a borrador y se borró su `.casos.ts` (sin dato verificado no hay casos). La
  novedad `fj.minimum-wage-5-2025` sigue publicada con su propia fuente.

Riesgos:
- bj: its-treizieme-mois interpreta el promedio del art. 126; la redevance ORTB de 4 000 F está fija
  en el código.
- bb: la indemnización se topa a los insurable earnings (interpretación); la pensión NIS usa solo la
  base nueva.
- cv: las convenciones se avisan en pantalla (día = retribución/30). Sin detectores.
- fj: FNPF del empleador y la deducción del 150 % vencen el 31/7/2027.
- Avisos de series: mg.convertisseur-ariary-euro y bj.convertisseur-dollar-fcfa dejan de ser
  publicables si la serie de tipo de cambio no se actualiza (check_paises avisa a 30 días).
- Fallas conocidas en main que siguen igual: `check_motor` forint, check_guiones de hu.

## 25/10/2026 · Integración de los motores de idioma (`claude/mundo-idiomas-integrado`)

Una sola rama junta `claude/mundo-arreglos-2026-10-24` y los motores eu (pl, sv, da, nb, fi), ar, id,
tr, bn, th, uk, uz, ru, ro, cs, el, hu y he, con las universales de pl, sv, da, nb, fi y ar, sobre
origin/main. Reemplaza a los PR de cada rama: los choques comunes (listas de idiomas, Record<Idioma>,
plural.ts, FormasUnidad, el contador y la normalización del buscador, formato.ts con los dígitos de
otras escrituras, cargadores, expectativas de zz-* y el orden de D9 a D22 del ADR) quedan resueltos una
vez. Las secciones de cada motor siguen abajo, en el orden del ADR.

## 31/10/2026 · Motor eslovaco (`claude/mundo-motor-sk`)

sk en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, afiliados, redes, «Tu sueldo en
el mundo» (`mzda-vo-svete`), rankings (`rebricek-krajin`), horas (`kolko-hodin-prace`), calendario
(`vyplatny-kalendar`), sueldos reales (`skutocne-mzdy`), venta completa (`IDIOMAS_VENTA`) y las 41 universales
con slugs ASCII (`kalkulacka-uveru`, `kalkulacka-dph`, `hypotekarna-kalkulacka`...). Registro: vykanie con «vy»
en minúscula, el de Finančná správa y los bancos; mercados con `trato: "usted"`. Plurales `pluralSk`. `GRAMATICA.sk`
y `padySk` declinan el país («na Slovensku», «v Česku», «pre Slovensko», «Slovenska»). Decisiones en ADR 0002, D25.
Edición de prueba `zz-sk`.

Falta para publicar Eslovaquia:
- El país en sí (BRIEF-PAIS): výpočet čistej mzdy, daň z príjmov, odvody, SZČO, minimálna mzda, DPH, con datos
  verificados en fuentes oficiales.
- Revisión de un hablante nativo sobre una muestra de páginas.
- Al mergear con `claude/mundo-motor-sr` y `claude/mundo-motor-bg`: chocan las listas de idiomas, los mapas
  `Record<Idioma>` y las expectativas de zz-* de `check_motor`; D23, D24 y D25 ya tienen números propios.

## 24/10/2026 · Motor europeo: polaco, sueco, danés, noruego y finés (`claude/mundo-motor-eu`)

pl, sv, da, nb y fi en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, «Tu
sueldo en el mundo» y venta completa (`IDIOMAS_VENTA`). Un registro informal por idioma (Ty
implícito, du, sinä implícito). Decisiones en ADR 0002, D9. Ediciones de prueba `zz-pl`, `zz-sv`,
`zz-da`, `zz-nb` y `zz-fi`. Puesto al día con main bb530d7a en `claude/mundo-motor-eu-al-dia`:
calendario laboral, horas de trabajo, rankings de países, «Sueldos reales» y afiliados en los cinco,
con sus carpetas de ruta, y las carpetas de «Tu sueldo en el mundo» que faltaban (slugs en D9).

Falta para el primer país de estos idiomas (Polonia, Suecia, Dinamarca, Noruega, Finlandia):
- Las 41 universales en cada idioma: ramas `claude/mundo-trad-<idioma>` (solo `textos/<idioma>.ts` y
  `contenido/<idioma>.ts`; después `npx tsx scripts/gen_idiomas_universales.ts`).
- El país en sí (BRIEF-PAIS). Finlandia puede tener además la edición `fi-sv` en sueco (sv-FI ya está
  en los mercados de prueba de `check_universales`).
- Revisión de un hablante nativo de cada idioma sobre una muestra de páginas antes de publicar.

## 24/10/2026 · Motor árabe RTL (`claude/mundo-motor-ar`)

`ar` entra en `IDIOMAS` con motor, sitio, inicio, novedades, legales, errores, compartir, embed,
«Tu sueldo en el mundo» (`rawatib-alalam`), calendario (`taqwim-alrawatib`), horas de trabajo
(`saat-alamal`), rankings (`tartib-alduwal`), «Sueldos reales» (`rawatib-haqiqiya`), afiliados y
diccionario de venta (`IDIOMAS_VENTA`). Decisiones en
ADR 0002, D10: árabe estándar moderno de banco y gobierno con segunda persona en masculino genérico,
dígitos occidentales (`-u-ca-gregory-nu-latn`), CSS con propiedades lógicas y flechas espejadas, slugs
en inglés para las universales. Edición de prueba `zz-ar` (interna, `ar-001`).
- Falta: las 41 universales en árabe (`claude/mundo-trad-ar`, otro agente). Hasta que entren, un
  mercado árabe solo tiene sus calculadoras locales.
- Con esto se pueden escribir ediciones árabes de los países ya publicados en inglés (ae, kw) y
  países árabes nuevos (eg, sa, qa, bh, om, jo). Revisión por hablante nativo antes del primero.

## 24/10/2026 · Motor indonesio (`claude/mundo-motor-id`)

id en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, «Tu sueldo en el mundo»
(`gaji-di-dunia`), venta completa (`IDIOMAS_VENTA`) y las 41 universales con slugs en indonesio
(`kalkulator-kpr`, `kalkulator-pinjaman`, `kalkulator-ppn`...). Registro «Anda» con mayúscula, el de
BCA, Mandiri, OJK y DJP Online; mercados con `trato: "usted"`. Decisiones en ADR 0002, D11. Edición de
prueba `zz-id`.

Puesta al día con main 7d190a68: calendario (`kalender-gaji`), horas de trabajo (`berapa-jam-kerja`),
rankings (`peringkat-negara`), «Sueldos reales» (`gaji-sebenarnya`) y afiliados en indonesio.

Falta para publicar Indonesia:
- El país en sí (BRIEF-PAIS): PPh 21 con TER, BPJS Kesehatan y Ketenagakerjaan, UMP/UMK por provincia,
  PPN, THR, pesangon, con datos verificados en fuentes oficiales (pajak.go.id, bpjs, kemnaker).
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar.

## 24/10/2026 · Motor turco (`claude/mundo-motor-tr`)

tr en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, «Tu sueldo en el mundo»
(`ulkelere-gore-maas`), venta completa (`IDIOMAS_VENTA`) y las 41 universales con slugs en turco ASCII
(`kredi-hesaplama`, `konut-kredisi-hesaplama`, `kdv-hesaplama`...). Registro «siz» con formas
corteses, el de los bancos y e-Devlet; mercados con `trato: "usted"`. `GRAMATICA.tr` pone los sufijos
de caso con apóstrofo y armonía vocálica («Türkiye'de», «Almanya'nın»). Mayúsculas con el locale
(`mayusculaInicial`) por la i con y sin punto. Decisiones en ADR 0002, D12. Edición de prueba `zz-tr`.

Puesta al día con main 7d190a68: calendario (`maas-takvimi`), horas de trabajo (`kac-saatlik-calisma`),
rankings (`ulke-siralamasi`), «Sueldos reales» (`gercek-maaslar`) y afiliados en turco.

Falta para publicar Turquía:
- El país en sí (BRIEF-PAIS): brütten nete maaş hesaplama (gelir vergisi dilimleri, SGK ve işsizlik
  primleri, damga vergisi, asgari ücret istisnası), kıdem ve ihbar tazminatı, KDV, asgari ücret, con
  datos verificados en fuentes oficiales (gib.gov.tr, sgk.gov.tr, Resmî Gazete, csgb.gov.tr).
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar.

## 24/10/2026 · Motor tailandés (`claude/mundo-motor-th`)

th en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, «Tu sueldo en el mundo»
(`ngoen-duean-thua-lok`), calendario (`patithin-ngoen-duean`), horas de trabajo (`chua-mong-tham-ngan`),
rankings (`andap-prathet`), «Sueldos reales» (`ngoen-duean-ching`), afiliados, venta completa
(`IDIOMAS_VENTA`) y las 41 universales con el slug en inglés del catálogo (como ja, ko y zh). Registro cortés y neutro de SCB, Kasikorn y กรมสรรพากร: sin คุณ/ท่าน,
sin ครับ/ค่ะ y sin punto final; mercados con `trato: "usted"`. Fechas en พ.ศ. (calendario por defecto de
th en Intl) y cifras arábigas; `parsearNumero` lee «2.5 ล้าน» y los dígitos tailandeses; `anchoVisual`
no cuenta vocales ni tonos apilados. CSS con `word-break: normal` para el corte por diccionario.
Decisiones en ADR 0002, D13. Edición de prueba `zz-th`.

Falta para publicar Tailandia:
- El país en sí (BRIEF-PAIS): ภาษีเงินได้บุคคลธรรมดา (escala y deducciones de rd.go.th), ประกันสังคม
  (sso.go.th, 5 % con tope), ค่าจ้างขั้นต่ำ por provincia, ภาษีมูลค่าเพิ่ม 7 %, ภาษีหัก ณ ที่จ่าย,
  ค่าชดเชย por despido (Ley de protección laboral), con datos verificados en fuentes oficiales.
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar.
- La OG de las calculadoras intl (`og/[[...slug]]`) no carga fuentes CJK ni tailandesas (igual que hoy
  para ja/ko/zh): con un título tailandés puede salir con cuadritos. Solo la tarjeta del mundo carga
  Noto Sans Thai.

## 24/10/2026 · Motor bengalí (`claude/mundo-motor-bn`)

bn en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, «Tu sueldo en el mundo»
(`bishwe-beton`), venta completa (`IDIOMAS_VENTA`, las 27 familias) y las 41 universales con el slug en
inglés del catálogo (`loan`, `bmi`, `vat`). Registro «আপনি» con las formas corteses, el de bKash, Sonali
Bank y NBR e-Return; mercados con `trato: "usted"`. Montos con dígitos bengalíes (০-৯) y miles en lakh
y crore; `parsearNumero` acepta lo que escribe un teclado bengalí. Decisiones en ADR 0002, D14. Edición
de prueba `zz-bn`.

Falta para publicar Bangladés:
- El país en sí (BRIEF-PAIS): আয়কর con sus tramos y el umbral libre de impuesto, ভ্যাট (tasa general y
  reducidas), সঞ্চয়পত্র y su উৎসে কর, PF/gratuity de la Bangladesh Labour Act, ফেস্টিভ্যাল বোনাস, con
  datos verificados en fuentes oficiales (nbr.gov.bd, bangladesh.gov.bd, nsd.gov.bd, bb.org.bd).
- Decidir el fin de semana de los días hábiles (viernes, y sábado en la administración pública): hoy
  `dias-entre-fechas` y `sumar-dias` cuentan de lunes a viernes y los textos bn lo advierten.
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar.

## 24/10/2026 · Motor ucraniano (`claude/mundo-motor-uk`)

uk en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo en
el mundo» (`zarplata-u-sviti`), rankings, horas de trabajo, calendario, sueldos reales, venta completa
(`IDIOMAS_VENTA`) y las 41 universales con slugs en la transliteración oficial ucraniana
(`kalkuliator-kredytu`, `kalkuliator-pdv`, `skladni-vidsotky`...). Registro «ви» con minúscula y
formas corteses, el de Дія y los bancos; mercados con `trato: "usted"`. Plurales one/few/many/other
(`pluralUk`, unidades de tiempo con `pocos`/`muchos`). `GRAMATICA.uk` declina el país («в Україні»,
«для України», «на Кіпрі»). El buscador ahora indexa cirílico. Decisiones en ADR 0002, D15. Edición de
prueba `zz-uk`.

Falta para publicar Ucrania:
- El país en sí (BRIEF-PAIS): калькулятор зарплати з ПДФО, військовим збором і ЄСВ del
  empleador, ФОП (групи єдиного податку), відпускні, лікарняні, мінімальна зарплата, прожитковий
  мінімум, ПДВ, con datos verificados en fuentes oficiales (zakon.rada.gov.ua, tax.gov.ua, bank.gov.ua,
  ukrstat.gov.ua).
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar (las dudas de
  vocabulario de los forks están en el cuerpo del PR).
- Al mergear con `claude/mundo-motor-eu`: `src/motor/i18n/plural.ts` choca (los dos lo crean) y hay
  que dejar `pluralPl` y `formaUk`/`pluralUk` juntos; `FormasUnidad` en `unidades.ts` es la misma.

## 24/10/2026 · Motor uzbeko latino (`claude/mundo-motor-uz`)

uz en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, «Tu sueldo en el mundo»
(`mamlakatlar-boyicha-ish-haqi`), horas de trabajo, rankings, sueldos reales, calendario, afiliados,
venta completa (`IDIOMAS_VENTA`) y las 41 universales con slugs en uzbeko ASCII
(`kredit-kalkulyatori`, `ipoteka-kalkulyatori`, `qqs-kalkulyatori`...). Escritura latina oficial con
oʻ y gʻ en U+02BB y la tutuq en U+02BC; registro «Siz» de soliq.uz, my.gov.uz y los bancos; mercados
con `trato: "usted"`. `GRAMATICA.uz` pega -ning/-da al nombre y usa «uchun» suelto. Formato de Intl
uz-UZ («1 234 567,50 soʻm»). Decisiones en ADR 0002, D16. Edición de prueba `zz-uz`.

Falta para publicar Uzbekistán:
- El país en sí (BRIEF-PAIS): ish haqi kalkulyatori (daromad soligʻi, INPS y demás aportes),
  eng kam ish haqi, BHM (bazaviy hisoblash miqdori), QQS, ijtimoiy soliq, con datos verificados en
  fuentes oficiales (soliq.uz, lex.uz, mehnat.uz, cbu.uz). Redondeo del soʻm en su mercado.
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar (dudas anotadas en
  los commits de las universales: choychaqa, daromadlilik, marjinal daromad, temp).
- Una edición en ruso, si se decide, sería aparte.

## 24/10/2026 · Motor ruso (`claude/mundo-motor-ru`)

ru en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo en
el mundo» (`zarplata-v-mire`), rankings (`reyting-stran`), horas de trabajo (`skolko-chasov-raboty`),
calendario (`kalendar-zarplaty`), sueldos reales (`realnye-zarplaty`), venta completa
(`IDIOMAS_VENTA`) y las 41 universales con slugs transliterados (`kalkulyator-kredita`,
`kalkulyator-nds`, `kalkulyator-ipoteki`...). Registro «вы» con minúscula e imperativo cortés, el de
Kaspi, Halyk, egov.kz y Сбер; mercados con `trato: "usted"`; sin «ё». Plurales one/few/many/other
(`pluralRu`, unidades de tiempo con `pocos`/`muchos`). `GRAMATICA.ru` declina el país («в
Казахстане», «для Казахстана», «во Франции», «на Кипре»). El buscador indexa cirílico. Textos
neutrales de país para Kazajistán, Kirguistán, Uzbekistán (edición) y otros. Decisiones en ADR 0002,
D17 (por qué Kazajistán sale en ruso primero y el kazajo queda como edición futura `kz-kk`). Edición
de prueba `zz-ru`; `check_universales` prueba ru-KZ con KZT.

Falta para publicar Kazajistán:
- El país en sí (BRIEF-PAIS): калькулятор зарплаты с ИПН, ОПВ, ВОСМС y los aportes del empleador
  (СО, ОПВР, ООСМС), МРП y МЗП del año, НДС, отпускные, больничные, пособия, ипотека «Отбасы»,
  депозиты con ГЭСВ, con datos verificados en fuentes oficiales (adilet.zan.kz, kgd.gov.kz,
  egov.kz, nationalbank.kz, stat.gov.kz).
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar.
- Al mergear con `claude/mundo-motor-eu` y `claude/mundo-motor-uk`: `src/motor/i18n/plural.ts` choca
  (las tres lo crean) y hay que dejar `pluralPl`, `formaUk`/`pluralUk` y `formaRu`/`pluralRu` juntos;
  `FormasUnidad` en `unidades.ts`, `resultadosPocos` en el buscador y el cirílico del índice son los
  mismos cambios. `IDIOMAS`, los `Record<Idioma>` y `src/paises/index.ts` chocan por la lista.

## 24/10/2026 · Motor rumano (`claude/mundo-motor-ro`)

ro en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo en
el mundo» (`salariu-in-lume`), rankings (`clasamentul-tarilor`), horas de trabajo
(`cate-ore-de-munca`), calendario (`calendar-salarial`), sueldos reales (`salarii-reale`), venta
completa (`IDIOMAS_VENTA`) y las 41 universales con slugs ASCII (`calculator-credit`,
`calculator-tva`, `calculator-credit-ipotecar`...). Registro de ANAF SPV, BCR e ING Home'Bank:
«dumneavoastră» implícito y 2.ª del plural, también en los botones («Calculați»); mercados con
`trato: "usted"`. ș y ț con coma, â/î de la Academia, comillas „”. Plurales one/few/other con «de»
(`formaRo`/`pluralRo`/`deRo`: «20 de ani», «101 ani»). `GRAMATICA.ro` declina el país con el
artículo enclítico («României», «Mexicului», «din Chile»). Textos neutrales para Rumania y Moldavia.
Decisiones en ADR 0002, D18. Edición de prueba `zz-ro`; `check_universales` prueba ro-RO con RON,
ro-MD con MDL y dos nombres largos.

Falta para publicar Rumania y Moldavia:
- Los países en sí (BRIEF-PAIS): en `ro` el calculator salariu net (CAS, CASS, impozit pe venit,
  deducere personală), salariul minim, TVA, concediu de odihnă, indemnizație de creștere a copilului
  y credit ipotecar, con datos verificados en fuentes oficiales (legislatie.just.ro, anaf.ro, bnr.ro,
  insse.ro); en `md` salariu net (impozit pe venit, contribuțiile CNAS y CNAM del empleado),
  salariul minim y TVA, con legis.md, sfs.md, bnm.md y statistica.md. Ninguna tasa está cargada
  todavía: todas se leen en la fuente.
- El mercado `md` tiene que fijar `simbolos: { MDL: "MDL" }` (Intl escribe «L»).
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar.
- Al mergear con `claude/mundo-motor-eu`, `-uk` y `-ru`: `src/motor/i18n/plural.ts` choca (todas lo
  crean) y hay que dejar `pluralPl`, `formaUk`/`pluralUk`, `formaRu`/`pluralRu` y
  `formaRo`/`pluralRo`/`deRo` juntos; `FormasUnidad` en `unidades.ts` y `nombreDeUnidad` en
  `formato.ts` son el mismo cambio. En el buscador, `resultadosPocos` (eslavos) y `resultadosDe`
  (rumano) conviven en `cuantosResultados`. `IDIOMAS`, los `Record<Idioma>` y `src/paises/index.ts`
  chocan por la lista.

## 24/10/2026 · Motor checo (`claude/mundo-motor-cs`)

cs en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo en
el mundo» (`mzda-ve-svete`), rankings (`zebricek-zemi`), horas de trabajo (`kolik-hodin-prace`),
calendario (`vyplatni-kalendar`), sueldos reales (`skutecne-mzdy`), venta completa (`IDIOMAS_VENTA`)
y las 41 universales con slugs ASCII sin diacríticos (`kalkulacka-uveru`, `kalkulacka-dph`,
`hypotecni-kalkulacka`...). Registro: vykání con «vy» en minúscula, el de Finanční správa y los
bancos; mercados con `trato: "usted"`. Nombre visible «Česko». Plurales one/few/many/other
(`pluralCs`, unidades de tiempo con `pocos`/`muchos`). `GRAMATICA.cs` y `padyCs` declinan el país
(«v Česku», «pro Česko», «na Slovensku»). Geist con `latin-ext`. Decisiones en ADR 0002, D19.
Edición de prueba `zz-cs`.

Falta para publicar Chequia:
- El país en sí (BRIEF-PAIS): výpočet čisté mzdy (daň z příjmů, sleva na poplatníka, sociální a
  zdravotní pojištění), OSVČ (paušální daň, výdajové paušály), minimální mzda, DPH (sazby), náhrada
  mzdy, cestovní náhrady, con datos verificados en fuentes oficiales (financnisprava.cz, cssz.cz,
  mpsv.cz, czso.cz, cnb.cz, zakonyprolidi.cz o e-sbirka.gov.cz).
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar.
- Al mergear con `claude/mundo-motor-eu` y `claude/mundo-motor-uk`: `src/motor/i18n/plural.ts` choca
  (las tres lo crean) y hay que dejar `pluralPl`, `formaUk`/`pluralUk` y `formaCs`/`pluralCs` juntos;
  `FormasUnidad` en `unidades.ts` y el cambio de `formato.ts` son los mismos; `resultadosPocos` en los
  tipos es el mismo y `cuantosResultados` del buscador queda con la versión de esta rama
  (Intl.PluralRules del `lang`), que sirve para uk y cs.

## 24/10/2026 · Motor griego (`claude/mundo-motor-el`)

el en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo en
el mundo» (`misthos-ston-kosmo`), rankings (`katataxi-choron`), horas de trabajo
(`poses-ores-douleias`), calendario (`imerologio-misthodosias`), sueldos reales
(`pragmatikoi-misthoi`), venta completa (`IDIOMAS_VENTA`) y las 41 universales con slugs ELOT 743 en
ASCII (`ypologismos-dosis-daneiou`, `ypologismos-fpa`, `ypologismos-stegastikou-daneiou`...).
Registro: πληθυντικός ευγενείας, el de myAADE, gov.gr y los bancos; mercados con `trato: "usted"`.
Preguntas con «;» (U+003B), comillas «», monotónico, mayúsculas sin tono. Plurales one/other
(`pluralEl`). `GRAMATICA.el` y `casosEl` ponen artículo y caso al país («στην Ελλάδα», «της
Κύπρου», «για τον Καναδά»). Geist no trae griego: fuente del sistema en `:lang(el)` y Noto Sans en las
OG. Decisiones en ADR 0002, D20. Edición de prueba `zz-el`.

Falta para publicar Grecia y Chipre:
- Los países en sí (BRIEF-PAIS): υπολογισμός καθαρού μισθού (φόρος εισοδήματος por κλίμακα,
  εισφορές ΕΦΚΑ en Grecia; GHS y Κοινωνικές Ασφαλίσεις en Chipre), ελεύθεροι επαγγελματίες, κατώτατος
  μισθός, ΦΠΑ (tasas general y reducidas de cada país), δώρα εορτών y επίδομα αδείας, ENFIA, con
  datos verificados en fuentes oficiales (aade.gr, efka.gov.gr, gov.gr, minfin.gov.gr, mof.gov.cy,
  mlsi.gov.cy).
- Revisión de un hablante nativo sobre una muestra de páginas antes de publicar.
- Al mergear con `claude/mundo-motor-cs`, `claude/mundo-motor-eu` y las demás ramas de motor:
  `src/motor/i18n/plural.ts` choca (todas lo crean) y hay que dejar `formaEl`/`pluralEl` junto a las
  funciones de los otros idiomas; las listas de `IDIOMAS`, `IDIOMAS_VENTA`, los Record de diccionarios
  y `GRAMATICA` suman cada idioma; el `FUENTE_CJK` de las OG suma `el: "Noto Sans"` junto a lo que
  agreguen las otras (ru también usa Noto Sans); las mayúsculas de las OG con `toLocaleUpperCase` y la
  normalización del buscador (rango griego y sigma final) se suman a la del cirílico de la rama ru.

## 24/10/2026 · Motor húngaro (`claude/mundo-motor-hu`)

hu en motor, errores, calculadora, sitio, inicio, legales, compartir, embed, afiliados, «Tu sueldo en
el mundo» (`fizetes-a-vilagban`), rankings (`orszagok-rangsora`), horas de trabajo
(`hany-ora-munka`), calendario (`fizetesi-naptar`), sueldos reales (`valodi-fizetesek`), venta
completa (`IDIOMAS_VENTA`) y las 41 universales con slugs ASCII sin diacríticos (`hitelkalkulator`,
`afa-kalkulator`, `lakashitel-kalkulator`...). Registro: tegezés, la de OTP, K&H y los portales de
calculadoras; mercados con `trato: "tu"`. Sin plural detrás de un número. `esetekHu` y `GRAMATICA.hu`
dan los casos del país con armonía vocálica («Magyarországon», «Németországban», «az Egyesült
Államokban»); `neveloHu` elige «a» o «az» también delante de cifras. Ningún sufijo pegado a cifras ni
marcadores. Geist con `latin-ext`. Decisiones en ADR 0002, D21. Edición de prueba `zz-hu`.

Falta para publicar Hungría:
- El país en sí (BRIEF-PAIS; todo lo que sigue, a verificar en fuente oficial): nettó bér kalkulátor
  (`nettober-kalkulator`, libre: SZJA, TB-járulék,
  családi kedvezmény, 25 év alattiak kedvezménye, első házasok), minimálbér y garantált bérminimum,
  ÁFA y sus kulcsok, KATA y átalányadó, táppénz, végkielégítés, con datos verificados en fuentes
  oficiales (nav.gov.hu, njt.hu, magyarkozlony.hu, ksh.hu, mnb.hu, allamkincstar.gov.hu).
- Revisión de un hablante nativo sobre una muestra de páginas (sobre todo la tabla de sufijos de
  países poco frecuentes y los títulos con «kalkulátor» separado).
- Al mergear con `claude/mundo-motor-cs`, `-tr`, `-eu` y las demás ramas de motor: chocan las listas
  por idioma (`IDIOMAS`, `GRAMATICA`, los `DICCIONARIOS_*`, `IDIOMAS_VENTA`, `TRATOS` y los mercados de
  prueba de los checks, los slugs de las páginas globales, `PAISES` con las ediciones zz-*) y las
  esperas de `check_motor` sobre las hermanas de zz/bono; se resuelven sumando los idiomas de las dos
  ramas. El cambio de Geist a `latin-ext` es el mismo que el de cs.

## 01/11/2026 · Motor georgiano (`claude/mundo-motor-ka`)

Georgiano completo (ADR 0002, D26): núcleo, venta, secciones globales, las 41 universales y `zz-ka`. Registro
თქვენ, sin plural detrás de un número, sufijos del país con `casosKa`, mayúsculas neutras (mtavruli fuera de la
interfaz), ₾ detrás y una letra georgiana = 1,4 latinas en `anchoVisual`. Falta el país (`ge`) y una revisión nativa.

## 24/10/2026 · Motor hebreo RTL (`claude/mundo-motor-he`, sobre `claude/mundo-motor-ar`)

`he` entra en `IDIOMAS` con motor, sitio, inicio, novedades, legales, errores, compartir, embed,
afiliados, «Tu sueldo en el mundo» (`sachar-baolam`), rankings (`dirug-medinot`), horas de trabajo
(`kama-shaot-avoda`), calendario (`luach-maskorot`), «Sueldos reales» (`sachar-amiti`), venta completa
(`IDIOMAS_VENTA`) y las 41 universales con el slug en inglés del catálogo. Registro: plural inclusivo
(«הזינו», «בחרו») y botones en infinitivo («לחישוב»), como Bank Hapoalim, Leumi y gov.il; mercados con
`trato: "usted"`. Formato he-IL (₪ por Intl, cifras occidentales, calendario gregoriano). Plurales
one/two/other con el dual (`pluralHe`). Fuente del sistema para el hebreo y Noto Sans Hebrew en las OG
(con orden visual a mano, `og-rtl.tsx`). Decisiones en ADR 0002, D22. Edición de prueba `zz-he`
(interna, `he-001`).
- Depende de `claude/mundo-motor-ar` (rtl, `direccion.ts`, CSS lógico): mergear el árabe primero.
- Falta para publicar Israel: el país en sí (שכר נטו con מס הכנסה, נקודות זיכוי, ביטוח לאומי y מס
  בריאות, שכר מינימום, מע"מ, פיצויי פיטורים, דמי הבראה, ימי חופשה) con datos verificados en
  gov.il, btl.gov.il y taxes.gov.il. Revisión por hablante nativo antes de publicar.

## 19/10/2026 · CÓMO RETOMAR (leer primero)

Manuel pidió cerrar los países empezados sin sumar nuevos, publicar y dejar esto listo para seguir
país por país en otra sesión hasta completar el planeta.

**En producción:** 45 países contando Argentina, y 5 ediciones (ch-fr, ch-it, ca-fr, be-fr, lu-de).
Los últimos en salir fueron Kenia (PR #36) y Tanzania (66 calculadoras, 63 datos), que salió junto con el arreglo de la unidad
duplicada en los textos de Kenia (`claude/fix-ke-unidades`).

**Empezados y sin terminar.** Cada uno tiene su rama remota con WIP pusheado. Las sesiones se cortaron
varias veces por límite de uso.

| Frente | Rama | Dónde quedó |
|---|---|---|
| Japón + diccionario de venta ja/ko/zh | claude/pais-jp | depurando un 404 de `jp/take-home-pay` en el registro |
| Ghana | claude/pais-gh | segundo bloque de calculadoras; `postJson` opcional en el Http del cron |
| Senegal | claude/pais-sn | escribiendo contenidos (fr, vous, CGI y BCEAO) |
| Túnez | claude/pais-tn | en curso |
| Liechtenstein, después us-es | claude/pais-li, claude/edicion-us-es | mercado, avisos, novedades, fuentes, lib de Lohn |
| Emiratos | claude/pais-ae | ILOE, Emiratisation y mínimo para emiratíes commiteados; depende del motor árabe |
| Kuwait | claude/pais-kw | en curso; depende del motor árabe |
| Pakistán | claude/pais-pk | faltaban STSC, cuenta de ahorro, tarjeta extranjera y dólar |
| Costa de Marfil | claude/pais-ci | en curso |
| Angola | claude/pais-ao | en curso |
| Motor árabe RTL | claude/mundo-motor-ar | terminado el 24/10 salvo universales (ver arriba); ae y kw salieron en inglés |
| Motor pl/sv/da/nb/fi | claude/mundo-motor-eu | terminado el 24/10 (núcleo de los cinco idiomas; universales en ramas mundo-trad) |
| Motor indonesio (id) | claude/mundo-motor-id | terminado el 24/10 (núcleo, venta y las 41 universales); al día con main 7d190a68 (calendario, horas, rankings, sueldos reales y afiliados) |
| Motor turco (tr) | claude/mundo-motor-tr | terminado el 24/10 (núcleo, venta y las 41 universales); al día con main 7d190a68 (calendario, horas, rankings, sueldos reales y afiliados) |
| Motor bengalí (bn) | claude/mundo-motor-bn | terminado el 24/10 (núcleo, venta y las 41 universales); falta el país bd |
| Motor tailandés (th) | claude/mundo-motor-th | terminado el 24/10 (núcleo, venta y las 41 universales) |
| Motor ucraniano (uk) | claude/mundo-motor-uk | terminado el 24/10 (núcleo, venta, páginas globales y las 41 universales) |
| Motor uzbeko (uz, latino) | claude/mundo-motor-uz | terminado el 24/10 (núcleo, venta, módulos nuevos y las 41 universales) |
| Motor ruso (ru) | claude/mundo-motor-ru | terminado el 24/10 (núcleo, venta, páginas globales y las 41 universales); listo para Kazajistán |
| Motor rumano (ro) | claude/mundo-motor-ro | terminado el 24/10 (núcleo, venta, páginas globales y las 41 universales); listo para Rumania y Moldavia |
| Motor checo (cs) | claude/mundo-motor-cs | terminado el 24/10 (núcleo, venta, páginas globales y las 41 universales) |
| Motor griego (el) | claude/mundo-motor-el | terminado el 24/10 (núcleo, venta, páginas globales y las 41 universales) |
| Motor georgiano (ka) | claude/mundo-motor-ka | terminado el 01/11 (núcleo, venta, páginas globales y las 41 universales) |
| Motor húngaro (hu) | claude/mundo-motor-hu | terminado el 24/10 (núcleo, venta, páginas globales y las 41 universales) |
| Uganda | (no empezada) | se asignó y se canceló antes de escribir código |

Para retomar un frente en una sesión nueva: `git fetch` de su rama, leer su último commit y
`docs/global/BRIEF-PAIS.md`, y terminarlo en un worktree propio. Los agentes de esta sesión no
sobreviven a una sesión nueva; el estado vive en las ramas.

**Publicar un país terminado** (receta probada con Kenia y Tanzania):
1. En la rama de integración: merge de `origin/main` y de la rama del país.
2. `estado: "publicado"` en `src/paises/<m>/mercado.ts`; import y alta al final de `PAISES` en
   `src/paises/index.ts`.
3. `npx tsx scripts/check_motor.ts --generar-cargadores`, `npx tsx scripts/check_medicion_mercados.ts --escribir`, `npx tsc --noEmit -p .`.
4. Build y `scripts/check-all.ts` (144 suites) en un worktree aparte, nunca en el de la sesión: el
   hook Stop commitea lo suelto. Si falla check_hreflang por una serie vencida, correr
   `npx tsx scripts/datos-paises/correr.ts --mercado <m>` y copiar el `series.json`.
5. PR contra main, `gh run watch <runId>` hasta `conclusion == success`, merge, curl a una página.

**Orden sugerido para seguir:** terminar la tabla de arriba (motor árabe antes que ae y kw; Japón
antes que cualquier otro asiático), después avanzar por tiers de `docs/global/PAISES.md` (199
países): primero los del tier 1 y 2 que faltan, después de a uno por región.

**Pendientes de Manuel:** pasos 1 y 2 de `docs/global/SQL-METRICAS.md`. Verificar en navegador
la LNT de Quebec. Revisar los borradores de Marruecos (CNSS, SMIG, preaviso) y el EPF de Malasia.
Cargar `nz.ocr` a mano antes del 11/12. Revisión por hablante nativo de ja/ko/zh antes de publicar Japón.

**Pedidos al motor abiertos:**
- `post` en el Http del cron, para la PSA de Filipinas y el CBK de Kenia (Ghana lo está sumando).
- Un modo tolerante del parser HTTP, para las páginas de TRA de Tanzania (hoy quedan como "manual").

El cron datos-paises no está actualizando uy, hn y bo.

## 17/10/2026 · Motor 3: japonés, coreano y chino (`claude/mundo-motor-3`)

ja, ko y zh (tradicional zh-TW/zh-HK y simplificado zh-CN/zh-SG) en motor, sitio, inicio, legales,
errores y las 41 universales. Decisiones en ADR 0002, D8. Edición de prueba `zz-ja`.

Falta para el primer país asiático (Japón, Corea, Taiwán o Hong Kong en chino):
- Diccionario de venta en ja/ko/zh (`src/lib/pagos/textos`, sumar a `IDIOMAS_VENTA`); sin él el país
  no ofrece informes ni planillas y `check_ofertas_intl` falla al registrarlo.
- El país en sí (BRIEF-PAIS): datos verificados, calculadoras locales, slugs locales con la convención
  de D8. Taiwán usa la tasa de 營業稅 en la universal `iva`; Hong Kong no tiene IVA.
- Revisión de un hablante nativo de cada idioma sobre una muestra de páginas antes de publicar.

## Ronda 1 (13/10/2026, en curso)

| Frente | Rama | Archivos que posee |
|---|---|---|
| Idiomas del motor (es pt en fr de it nl) | `claude/mundo-i18n` | `src/motor/{tipos,datos,textos,formato}.ts`, `src/motor/i18n/**`, `ui/{textos-inicio,Legales,NoEncontrada}`, not-found y llms.txt intl, `check_textos_paises`, `check_i18n` |
| Ofertas, informes, planillas y mails por idioma; familias de universales | `claude/mundo-ofertas` | `src/lib/pagos/**` (menos `ventas-intl.ts`), `ui/Oferta.tsx`, `(intl)/**/informes/**`, `(intl)/**/planillas/**` (menos `_compra.tsx`), `src/lib/prefill/intl*`, checks de ofertas |
| Escala e integración de universales | `claude/mundo-escala` | `src/motor/{registro,cliente,paginas,seo,mapa,sitio,hosts}.ts`, resto de `src/motor/ui/**`, `src/app/(intl)/**` (menos informes, planillas y not-found), `api/geo/**`, `src/paises/index.ts`, `universales/cargadores.ts`, `public/banderas/**`, checks de motor, hreflang y ruteo |
| Métricas del panel | `claude/mundo-metricas` | `supabase/migrations` nuevas, `src/lib/{medicion,panel}/**`, `components/panel/**`, `(ar)/dashboard/**`, `api/e/**`, `rastreo*.ts`, `_compra.tsx`, `api/pagos/checkout/**`, `ventas-intl.ts` |
| Universales de finanzas, negocio y sueldo (19) | `claude/mundo-univ-finanzas` | `src/motor/universales/<19 ids>/**`, `universales/finanzas.ts` |
| Universales cotidianas, salud, hogar e IVA (21) | `claude/mundo-univ-cotidianas` | `src/motor/universales/<21 ids>/**`, `universales/cotidianas.ts` |
| Investigación de los países del mundo | `claude/mundo-paises-research` | `docs/global/PAISES.md` |

## Integrado en la rama (14/10/2026)

- Contrato de universales, 40 conceptos, 6 categorías, `check_universales`, `gen_idiomas_universales`.
- **41 universales** en es (tú, usted, vos) y en: 1.157 casos en verde, incluidos mercados con nombre
  de país largo. Frentes cerrados: `claude/mundo-univ-finanzas`, `claude/mundo-univ-cotidianas`.
- `docs/global/PAISES.md`: 199 países, tier 1 = US DE GB IN FR CA AU BR IT ES NL CH ZA BE AT.

## Traducción de universales (en curso)

Un agente por idioma, cada uno crea solo `textos/<idioma>.ts` y `contenido/<idioma>.ts`; el cableado
lo hace `gen_idiomas_universales`: `claude/mundo-trad-{pt,fr,de,it,nl}`. Registro fijo por idioma:
pt «você», fr «vous», de «Sie», it «tu», nl «je».

## Pedidos al motor anotados

- `NOMBRES_UNIDAD` por idioma: hecho; filas, tablas e informe formatean con el locale del mercado.
- Tipo de campo `hora` y campos condicionales (`visibleSi`): hechos en motor 2 (RECETA, sección 7).
  Falta migrar horas-trabajadas de sus listas de 96 horarios a `hora`.
- `ui(trato, locale)`: hecho en `claude/mundo-integracion` (receta actualizada).
- Tipado de campos generados en bucle o según unidades (hoy un cast a `Record` en `calcular`).

## 16/10/2026 23:20 · En main y producción; se retoma la expansión a todo el mundo

PR #31 (y #30) mergeados a main el 16/10 22:36, deploy READY: 38 países, 4 ediciones. Antes del merge
se arreglaron: lakhs en en-IN (`parsearNumero`), prefill intl con null en campos ocultos, tabla del
EMI de India, mes por render en Comercio por horas y `uy.dolar` vencido (hreflang).

Misión de Manuel: todos los países del mundo, cada uno en su idioma, lo más completo posible, con
fuentes citadas y al día, sin frenar. Frentes en curso (cada uno en su worktree y rama):

| Frente | Rama | Agente |
|---|---|---|
| Filipinas | claude/pais-ph | af4a25bad79056aa2 |
| Luxemburgo fr + lu-de | claude/pais-lu | a8551c6c0f34cfe9e |
| Marruecos | claude/pais-ma | a38af4c77ca2794fb |
| Quebec | claude/quebec | a09af92be368a2db8 |
| Motor 3 (ja/ko/zh) | claude/mundo-motor-3 | a2ac60979cc7a480b |
| Emiratos | claude/pais-ae | ab9a66bde237e6a69 |
| Kuwait | claude/pais-kw | a80b3b979be977cdc |
| Pakistán | claude/pais-pk | afc298c5c5529a805 |
| Kenia | claude/pais-ke | ada73c81be98bb517 |
| Costa de Marfil | claude/pais-ci | ab0048b77b06a4135 |
| Angola | claude/pais-ao | a3758a764dbcf8a03 |
| Motor árabe (RTL) | claude/mundo-motor-ar | a69696ff45bde473e |
| Motor pl/sv/da/nb/fi | claude/mundo-motor-eu | a83bcd96f30132acb |

Publicar sigue el procedimiento de la entrada de la pausa. Un PR nuevo contra main por tanda.

## 16/10/2026 19:30 · PAUSA pedida por Manuel · 38 países y 4 ediciones publicados

Publicados desde la última entrada: Nigeria (55) y Malasia (60). Verde con 44 mercados:
check_paises_casos 4282, check_textos_paises 54355, check_hreflang 5664, check_seo_intl 5932.

Frenado de forma segura: ningún agente corriendo, todo commiteado y pusheado. Para retomar, cada frente
tiene su rama y su worktree (`.claude/worktrees/agent-<id>`); con SendMessage al id se retoma con su
contexto, o se lanza un agente nuevo con el encargo de BRIEF-PAIS sobre la misma rama.

| Frente | Rama | Agente | Dónde quedó |
|---|---|---|---|
| Filipinas | claude/pais-ph | af4a25bad79056aa2 | checks finales antes de cerrar |
| Luxemburgo fr + lu-de | claude/pais-lu | a8551c6c0f34cfe9e | 14 locales con casos; falta contenido, lu-de y checks |
| Marruecos (fr) | claude/pais-ma | a38af4c77ca2794fb | 5 locales nuevas por registrar y checks |
| Quebec en ca y ca-fr | claude/quebec | a09af92be368a2db8 | impôt QC, salaire net y taxe de bienvenue hechos; falta CNESST, ofertas TPS/TVQ, detector manual y ESTADO |
| Motor 3 (ja, ko, zh) | claude/mundo-motor-3 | a2ac60979cc7a480b | núcleo hecho; universales en curso (iba por préstamo y tasa efectiva) |
| Emiratos (en) | claude/pais-ae | ab9a66bde237e6a69 | sin código todavía |
| Kuwait (en) | claude/pais-kw | a80b3b979be977cdc | sin código todavía |
| Pakistán (en) | claude/pais-pk | afc298c5c5529a805 | sin código todavía |

Al publicar un país: merge de su rama, `estado: "publicado"` en mercado.ts, import y alta en `PAISES`
(`src/paises/index.ts`), `check_motor --generar-cargadores`, `check_medicion_mercados --escribir`, tsc y
checks (paises, paises_casos, textos_paises, fronteras, eol, hreflang, seo_intl), commit y push.

Pendientes que no dependen de agentes: SQL de métricas (docs/global/SQL-METRICAS.md, pasos 1 y 2, lo
corre Manuel); EPF de Malasia (kwsp.gov.my detrás de Cloudflare, se verifica a mano); `nz.ocr` manual
antes del 2026-12-11.

## 16/10/2026 14:30 · 36 países y 4 ediciones publicados

Hong Kong (en, 60 calculadoras) publicado. Verde con 42 mercados: check_paises_casos 4172,
check_textos_paises 52855, check_hreflang 5434, check_seo_intl 5690. Tercer corte por límite de sesión
del día (10:15); avance guardado como WIP y retomados a las 14:29: Filipinas, Malasia, Nigeria,
Marruecos (fr), Luxemburgo (fr + lu-de), Emiratos (en), Quebec completo (taxe de bienvenue ya hecha) y
motor 3 (ja, ko, zh; universales en curso).

## 16/10/2026 05:45 · 35 países y 4 ediciones publicados

India (57 calculadoras) publicada, con las ediciones ch-fr (62), ch-it (62), ca-fr (53) y be-fr (52).
Verde con 41 mercados: check_motor 1823, check_paises_casos 4076, check_textos_paises 51879,
check_hreflang 5314, check_seo_intl 5564, check_datos_paises 85. dea.gov.in (India) usa la raíz ISRG
Root YR, que Node no trae: se versionó su cruce firmado por ISRG Root X1 en `scripts/datos-paises/certs`
(tlsTolerante suma intermedios, nunca apaga la verificación).

En curso: Filipinas, Hong Kong (en), Malasia (en), Nigeria, Marruecos (fr), Luxemburgo (fr + lu-de),
Quebec completo en ca y ca-fr (impôt QC, CNESST, taxe de bienvenue, ofertas TPS/TVQ, detector manual
para nz.ocr) y motor 3 (ja, ko, zh).

Pedidos al motor anotados por los países: título de la fuente traducible en ediciones (be-fr muestra
el documento en neerlandés).

## 16/10/2026 04:30 · 34 países publicados

Bélgica (nl, 56 calculadoras) publicada. Verde con 36 mercados: check_paises_casos 3737,
check_textos_paises 48544, check_hreflang 4742, check_seo_intl 4962. El límite de sesión cortó a los 8
agentes a las 01:45; avance guardado como WIP en cada rama y retomados a las 04:21: India, Filipinas,
Hong Kong, Malasia, ediciones ca-fr, ch-fr/ch-it y be-fr, y motor 3 (ja, ko, zh).

## 16/10/2026 01:00 · 33 países publicados

Suiza (de, 62 calculadoras) y Singapur (61) publicadas; motor 2 integrado (ediciones de idioma con
`definirEdicion`, marcadores de escalas, semanas, hora, campos condicionales, cargadores en dev,
check_ofertas más rápido; zz-en de prueba). Verde con 35 mercados: check_motor 1645,
check_paises_casos 3670, check_textos_paises 47778, check_hreflang 4632, check_seo_intl 4846.
Hipoteca y alquilar o comprar dicen «deposit» en en-GB/IE/AU/NZ/ZA. IPC de ca y at con margen de
100 días (el de 75 dejaba un hueco cada mes por el atraso de publicación).

Ojo: a la medianoche de Argentina, check_hreflang puede fallar si una serie vence justo entre la fecha
de dos zonas horarias (los clústeres se arman con la fecha de cada mercado). Se ve con
`CALCULAR_HOY=AAAA-MM-DD` fijo.

En curso (retomados a las 00:52 tras un timeout de la API que cortó a todos; avance pusheado):
India, Bélgica (nl, en checks finales), Filipinas, Hong Kong (en), Malasia (en), edición ca-fr
(+ check_ofertas: it/calcolo-tfr y za.bond-calculator; nz.ocr a detector manual), ediciones ch-fr y
ch-it, y motor 3 (`claude/mundo-motor-3`: ja, ko y zh para Japón, Corea, Taiwán y HK en chino).

RBNZ: la página y el xlsx tienen el desafío anti-bots de Cloudflare. No se saltea: `nz.ocr` pasa a
manual.

## Edición ca-fr (`claude/edicion-ca-fr`, interno y sin registrar)

13 calculadoras de `ca` traducidas al francés de Quebec (vous, fr-CA) más las universales en
francés: TPS/TVQ, salario mínimo, RRQ/RPC, cotizaciones y prestaciones de assurance-emploi, costo
empleador (con RQAP), ACE, recuperación de la SV, REER, CELI, inflación, USD/CAD e hipoteca variable.
Por defecto abren en Quebec (región qc, plan RRQ).

**Quebec en `ca` (`claude/quebec`):**
- Impuesto de Quebec en sueldo neto e impuesto a la renta. Usa la tabla 2026, el monto de base y la
  deducción para trabajadores (Finanzas Quebec). Del lado federal suma el abatimiento del 16,5 % (CRA
  T4032-QC), y aplica QPP, EI de Quebec y RQAP. Traducidas en ca-fr (`calcul-salaire-net`,
  `calcul-impot-revenu`).
- Taxe de bienvenue 2026 (Québec.ca) en land-transfer-tax, sin Montreal. Traducida en ca-fr
  (`calcul-taxe-de-bienvenue`).
- Vacances, heures supplémentaires y préavis (LNT) en **borrador**: Légis Québec y la CNESST
  responden 403 a las herramientas (Cloudflare y CloudFront). Hay que abrir la ley en un navegador,
  confirmar los valores de `ca.qc-vacation-pay`, `ca.qc-overtime` y `ca.qc-notice`, pasarlos a
  verificado y publicar las tres calculadoras (ya están traducidas).
- Pendientes:
  - ganancias de capital con Quebec, porque falta verificar la tasa de inclusión de Quebec;
  - las tasas de Montreal en la taxe de bienvenue;
  - créditos de Quebec además del de base (personne seule, âge, revenus de retraite).
- Ofertas fr-CA: la familia de facturación dice TPS/TVQ (`src/lib/pagos/textos/fr-ca.ts`).

## Motor 2 (`claude/mundo-motor-2`, integrado el 16/10/2026)

- **País y edición (ADR 0002, D3):** `definirEdicion(base, {...})` en `src/motor/registro.ts` y
  `definirTextos` en `src/motor/edicion.ts`. Una edición (`ca-fr`) reusa datos, series, avisos y
  detectores del país y escribe solo textos. Edición de prueba: `src/paises/zz-en`. Receta en
  `docs/global/BRIEF-PAIS.md` («Ediciones»). Hreflang entre ediciones (calculadoras, inicio, fuentes y
  novedades), selector con «País (Idioma)», geo por `navigator.languages`, cargadores generados para
  traducciones y `check_paises_casos` que marca textos sin traducir.
- **i18n con locale:** los diccionarios del sitio reciben el locale; de-CH y de-LI sin «ß»; parches
  `regional` por locale para variantes futuras.
- **Marcadores:** `{{serie}}` y `{{serie#desde}}` (la serie tiene que estar en `requiere`), filas de
  escala `{{id[n].tasa|desde|hasta|cuotaFija}}` con `-1` para la última, `#desde` en escalas.
  `check_paises` falla si un marcador no se resuelve hoy.
- **Unidad `semanas`** en los 7 idiomas; campo `region` con subconjunto (`regiones: [...]`).
- **`next dev` calcula en mercados internos** sin publicarlos (`cargadores/dev.ts` +
  `src/paises/cargadores-dev.ts`); producción sigue con los mapas generados.
- **`check_ofertas_intl`** con índice de casos: de 128 s a unos 30 s en esta máquina.
- **`nz.ocr`:** el RBNZ está detrás del desafío anti-bots de Cloudflare (`cf-mitigated: challenge`)
  y no se saltea. El motor no tiene vía para series manuales (`metodo: "manual"` es solo una etiqueta;
  el detector igual corre). Queda así: el semáforo (`scripts/datos-paises/semaforo.ts`) avisa desde 30
  días antes del vencimiento (2026-12-11) y el punto nuevo se carga a mano en `src/paises/nz/series.json`
  después de cada decisión del RBNZ. Pedido al motor: que un detector `manual` no corra y figure como
  «carga manual» en el resumen del cron.

## 14/10/2026 23:30 · 31 países publicados

Nueva Zelanda (60 calculadoras) y Sudáfrica (60) publicadas. Verde con 32 mercados: check_motor 1559,
check_paises_casos 3487, check_textos_paises 45680, check_hreflang 4345, check_seo_intl 4544.

El límite semanal cortó a los demás a las 18:00; avance pusheado y retomados a las 23:30: motor 2,
India (solo había investigado, sin código), Singapur, Suiza (de, en verificación final) y Bélgica (nl,
WIP `7315719`). Nuevos: Filipinas (`claude/pais-ph`) y Hong Kong en inglés (`claude/pais-hk`).

Pendientes de los países:
- `nz.ocr`: detector `manual` (el cron no lo corre; el semáforo avisa 30 días antes). Vence el 2026-12-11.
- `za`: los marcadores de series ya existen (`{{za.prime-rate}}`). IPC y prime vencen el 2026-11-13 si el cron no corre.
- Universal hipoteca dice «Down payment»; en NZ se dice «deposit».
- Montos escritos a mano en escalas y FAQ de nz y za: revisar en abril y marzo de 2027.

## 14/10/2026 17:30 · 29 países publicados · PR borrador #31

| País | Calculadoras | | País | Calculadoras |
|---|---|---|---|---|
| Estados Unidos | 63 | | Canadá (en) | 61 |
| Reino Unido | 61 | | Países Bajos | 63 |
| Brasil | 63 | | Irlanda | 61 |
| Francia | 60 | | Austria | 62 |
| Alemania | 67 | | Portugal | 62 |
| España | 59 | | Australia | 59 |
| Italia | 57 | | 16 de Latinoamérica | ~80 cada uno |

Verde con 30 mercados (con global y zz): check_motor 1516, check_paises_casos 3319, check_textos_paises
43893, check_hreflang 4105 páginas, check_seo_intl 4292 páginas, check_universales 2660 casos, eol.
Integrado también el pulido (`claude/mundo-pulido`): es-ES, pt-PT, fr-CA, de-CH, redondeo, «1er» en fr.

En curso (retomados a las 17:21 tras el tercer corte por límite de uso, con el avance guardado como
WIP en cada rama): motor 2 (`claude/mundo-motor-2`: ediciones de idioma, marcadores de series y
escalas, semanas, cargadores en dev, check_ofertas más rápido), India, Singapur, Sudáfrica, Suiza (de),
Nueva Zelanda y Bélgica (nl).

Procedimiento ante un corte por límite: en cada worktree de agente, `git checkout -- src/paises/index.ts`
(registro local de prueba), commit WIP de `src`/`scripts`, push de la rama y SendMessage para retomar.

## Hoy (14/10/2026 08:50) · PR borrador: https://github.com/manu-180/calcular/pull/31

| País | Calculadoras | Rama |
|---|---|---|
| Estados Unidos `us` | 63 (23 locales + 40 universales) | `claude/pais-us` |
| Reino Unido `gb` | 61 (21 + 40) | `claude/pais-gb` |
| Brasil `br` | 63 (23 + 40) | `claude/pais-br` |
| Francia `fr` | 60 (20 + 40) | `claude/pais-fr` |
| Alemania `de` | 67 (27 + 40; Grunderwerbsteuer en borrador) | `claude/pais-de` |
| España `es` | 59 (19 + 40) | `claude/pais-es` |
| Italia `it` | 57 (17 + 40) | `claude/pais-it` |
| 16 de Latinoamérica | ~80 cada uno (1.246 en total) | `claude/mundo-integracion` |

Todos publicados e integrados. Verde con 24 mercados: check_motor 1382, check_paises_casos 2764,
check_textos_paises 37545, check_seo_intl 3520 páginas, check_hreflang, check_universales, check_eol.

En curso: pulido de universales y motor (`claude/mundo-pulido`: es-ES, pt-PT, fr-CA, de-CH, redondeo,
fechas fr, bloque de fuentes traducido), y los países nl au ca pt at ie.

Pendientes conocidos:
- España: pisar slugs de universales con vocabulario peninsular cuando entre el pulido.
- Ediciones con dos idiomas (ca-fr, ch-fr, be-fr): el registro todavía no tiene País/Edición.
- Marcador para series y para filas de una escala; unidad «semanas».

## Retomado (14/10/2026 02:27)

Integrados: escala (`claude/mundo-escala`) y métricas (`claude/mundo-metricas`), con cargadores
regenerados y el check del flujo de ofertas ajustado (el checkout intl se registra siempre; la fila no
lleva datos sin la casilla). Verdes: tsc, check_motor (1020), check_paises, check_paises_casos (2166),
check_i18n, check_universales, check_hreflang, check_seo_intl, check_panel_sql, check_metricas_mundo,
check_rastreo, check_pagos, check_flujo_ofertas_intl, check_fronteras, check_eol. check_ofertas_intl
solo falla por la UF de Chile en planillas viejas (artefacto que regenera el build).

En curso:

| Frente | Rama |
|---|---|
| Pedidos cruzados, global en inglés, universales en LATAM, `ui(trato, locale)` | `claude/mundo-integracion` |
| Traducción de las 19 de finanzas | `claude/mundo-trad-{pt,fr,de,it,nl}` |
| Países tanda 1 (encargo: `docs/global/BRIEF-PAIS.md`) | `claude/pais-{us,gb,de,fr,br}` |

Siguiente tanda de países: es it nl ca au at ch be in za pt ie nz.

**14/10 03:50 a 07:20:** las 41 universales quedaron en los 7 idiomas (1992 casos, integradas en
efd6636). A las ~03:55 el límite de uso de la sesión cortó a los 11 agentes; a las 07:21 se guardó
como WIP lo que había sin commitear (us, de, fr, br, es), se pushearon todas las ramas y se retomaron
integración, us, gb, de, fr, br, es e it. nl (`claude/pais-nl`), au y ca quedan para la tanda siguiente:
sus agentes no habían escrito nada. Correr menos agentes Opus en paralelo para no volver a tocar el
límite de golpe.

## Pausa y cómo retomar (14/10/2026 00:45, pedida por Manuel)

Todo commiteado y pusheado. Integrado en esta rama: contrato, 41 universales (es, en), PAISES.md,
**i18n del motor** (`claude/mundo-i18n`, 7 idiomas, `check_i18n` verde) y **ofertas por idioma**
(`claude/mundo-ofertas`, 19 familias nuevas, textos en 7 idiomas). Checks verdes tras integrar:
tsc, check_i18n, check_universales (41, 1157 casos), check_fronteras, check_eol.

| Frente pausado | Rama · último commit | Qué falta |
|---|---|---|
| Escala | `claude/mundo-escala` · 566770c (verde, 8 de 9 puntos) | integrar; punto 9 (global en inglés) ya destrabado por i18n (datos.ts acepta IDIOMAS) |
| Métricas | `claude/mundo-metricas` · f832241 (WIP, casi todo hecho) | revisar 2 fallas de `check_flujo_ofertas_intl` (probable: el checkout intl ahora se registra siempre, `api/pagos/checkout/route.ts`); commit final; Manuel corre `docs/global/SQL-METRICAS.md` pasos 1 y 2. Arregló un bug grave: `/api/e` descartaba todo evento con producto intl, así que hoy no se mide ningún clic de oferta de calcularya |
| Traducción pt | `claude/mundo-trad-pt` · 7af11db | 19 de finanzas |
| Traducción fr | `claude/mundo-trad-fr` · 4623cb6 | 19 de finanzas; su script de tipografía fr (`tipo_fr.py`) vivía en su scratchpad |
| Traducción de | `claude/mundo-trad-de` · b8e382c | 19 de finanzas; «ß» en `ui()` para de-CH |
| Traducción it | `claude/mundo-trad-it` · a941bb7 | 18 de finanzas (prestamo hecha); creó `universales/comun/italiano.ts` |
| Traducción nl | `claude/mundo-trad-nl` · b191f0e | 17 de finanzas; prestamo y tasa-efectiva sin verificar |

**Orden al retomar:**
1. Integrar `claude/mundo-escala` (conflictos esperables en `src/motor/ui/**` e i18n: gana i18n en
   diccionarios, escala en estructura). Correr tsc y todos los checks del motor.
2. Pedidos cruzados pendientes:
   - escala → i18n: claves `shell.menu.vida` (es «Vida diaria», en «Everyday») y `pais.irASeccion`;
     sacar textos provisorios de `menu.ts` e `Inicio.tsx`.
   - i18n → UI: `AvisoPais.tsx:40`, `SelectorPais.tsx:42`, `Sello.tsx:36` con idioma fijo;
     `metadatos.ts:72` y `og/[[...slug]]/route.tsx:103` a `paginasLegales(idioma, trato, locale)`;
     `validar.ts:57` aceptar ids del país de una edición (`paisDelMercado`).
   - i18n → ofertas: regex `^[a-z]{2,6}$` de `catalogo-intl.ts:34` y `:363` a `RE_CODIGO_MERCADO`.
   - ofertas → universales: prestamo, hipoteca, interes-compuesto, tarjeta-de-credito declaran `tablas`
     (verificar que ya lo hacen); tarjeta: campo del pago llamado `pago|pagoMensual|cuota`.
   - ofertas/escala → informe: `_informe-vivo.tsx` tiene que cargar universales con `cargarUniversal`.
   - métricas → `_compra.tsx`: `textos={textosTarjeta(m.idioma, m.trato).aviso}` en `<AvisoPronto>`.
   - `ui()` de universales sin locale (decimales, «ß» de-CH, variantes pt-PT): pasar `locale` a `ui`.
3. Prender global en inglés (`src/paises/index.ts`: «Worldwide», en, en).
4. Integrar métricas.
5. Retomar los 5 traductores (SendMessage a cada uno o agentes nuevos con su rama) con las 19 de
   finanzas; integrar con `git merge -X ours` y `npx tsx scripts/gen_idiomas_universales.ts`.
6. Encargo de país global (docs/global/BRIEF-PAIS.md, nuevo) y tanda 1: US GB CA AU (en), DE AT CH
   (de), FR BE (fr), IT, NL, ES, BR PT. Cada país: `universales: "todas"` + iva con su tasa verificada
   + calculadoras locales verificadas.
7. Sumar `universales: "todas"` a los 16 países LATAM.

## Próximo

Ronda 2: integrar las ramas de la ronda 1, traducir universales a pt fr de it nl, País y edición
(países con varios idiomas), y la primera tanda de países (tier 1 de `docs/global/PAISES.md`).
