# Estonia (ee), informe del agente

Rama `claude/pais-ee`. **Depende de `claude/mundo-motor-et`** (idioma `et`, ADR D33), sin mergear todavía:
esta rama nace de ella y no compila sobre `main` hasta que entre el motor. Mercado `ee`, idioma `et`,
locale `et-EE`, EUR, Europe/Tallinn, escala 0.9, trato `tu` («sina»). `estado: "interno"`. No se commiteó
`src/paises/index.ts`.

## Calculadoras: 61 (21 locales + 40 universales)

Las 41 universales de `et` entran con `universales: "todas"`; la de IVA cae porque hay local del mismo concepto.

| slug | concepto | publicable | nota |
|---|---|---|---|
| palgakalkulaator | sueldo-neto | sí | bruto a neto; `mundo` declarado |
| brutopalga-kalkulaator | propio | sí | neto a bruto |
| tooandja-kulu | costo-empleador | sí | 33 %, 0,8 %, miinimum 292,38 |
| miinimumpalk | salario-minimo | sí | 946 y 5,67 desde 1/4/2026 |
| tulumaksu-kalkulaator | impuesto-renta | sí | 22 %, 8400, deducciones |
| sotsiaalmaks | aportes-seguridad-social | sí | |
| fie-maksud | retencion-honorarios | sí | TuMS § 14, piso y techo |
| ettevotluskonto | regimen-simplificado | sí | agregada: 20 a 26 % |
| kaibemaksu-kalkulaator | iva | sí | 24, 13, 9 |
| puhkusetasu-arvutamine | vacaciones | sí | decreto 91 |
| haigushuvitis | propio | sí | 70, 80, 100 %; tope 126,87 |
| vanemahuvitis | propio | sí | tope 3806,10 (nacidos desde 2026) |
| lastetoetus | propio | sí | |
| tootuskindlustushuvitis | propio | sí | ingresos y baasmäär |
| koondamishuvitis | indemnizacion-despido | sí | |
| etteteatamistahtaeg | preaviso | sí | |
| uletunnitoo | horas-extra | sí | |
| dividendide-tulumaks | propio | sí | 22/78 |
| maamaks | propio | sí | la persona pone precio y tasa municipal |
| pensionikalkulaator | jubilacion | sí | la persona pone sus osakud |
| inflatsiooni-kalkulaator | inflacion | sí | Statistikaamet IA002 |

Sin borradores.

## Datos

63 tramos verificados, 0 pendientes, leídos el 2026-11-01. 2026: **tulumaks 22 %, no 24 %** (TuMS § 4; la versión
que rige el 1/1/2027 también dice 22 %). Käibemaks 24 % sigue en la versión 2027.

Cómo se leyó: Riigi Teataja y Töötukassa son SPA y WebFetch las ve vacías, sin bloqueo (200 con curl simple). Se
leyeron en el panel de navegador (Riigi Teataja también con su API pública `public-api/api/v1/akt`). Sin
user-agent falso ni rodeos. EMTA, SKA, Tervisekassa y SM con WebFetch.

Sin dato no verificado. Notas:
- `ee.fie-sotsiaalmaksu-lagi` 111 720: derivado de SMS § 2 lg 1 p 5 (10 veces el mínimo por mes: 3 × 886 y 9 × 946).
  El PDF de EMTA con 36 867,60 no se pudo leer; solo un extracto de buscador lo confirma.
- Pensión: 399,24 viene de una página de SKA que lo escribe «399,2400». SM no publica baasosa ni aastahinne en lo leído.
- Tope y piso de vanemahüvitis: PHS § 42 usa el mínimo vigente (946) y § 41 la tasa 886 para quien no tuvo ingresos.
- `tkh-max-*` (101,27 y 67,51) salen de Töötukassa; no recalculados (el promedio nacional no se leyó).
- Keskmine palk (stat.ee) y Eesti Pank no se usan: ninguna calculadora los necesita.

## Simplificaciones

Avisadas en la página: FIE sin excepciones de § 2 lg 5; koondamishüvitis con un promedio único aunque empleador
(6 meses) y Töötukassa (9 meses) calculan distinto; desempleo sin la prórroga de 60 días del § 8; maamaks sin el tope
de suba anual (§ 8¹). **No avisadas:** FIE sin el aporte de II pilar y haigushüvitis sin los casos de embarazo o donación.

## Detectores

Probados contra las fuentes con `scripts/paises/ee/probar_detectores.ts`:
- `ee.thi-stat`, serie por POST a PxWeb: 21 puntos, último 2026-09 = 329,07. Necesita `http.postJson`.
- `ee.riigiteataja-*` (9 leyes), norma: 0 hallazgos. El id de cada redacción empieza con su fecha de publicación
  (PPKKAAAANNN) y se marca lo posterior al 2026-11-01. La primera versión comparaba ids como números y daba
  falsos positivos: corregido.

## Checks (con `ee` registrado solo localmente)

- `tsc --noEmit -p .`: sin errores
- `check_paises ee`: OK, 63 datos, 61 calculadoras; 1 aviso: THI sale de lo publicable si el cron no suma el punto
  de octubre antes del 1/12/2026
- `check_paises_casos ee`: 73 casos en 21 archivos
- `check_textos_paises ee`: 1032 textos, 0 avisos
- `check_seo_pais ee`: OK; 1 aviso, ettevotluskonto con 214 palabras (objetivo 220)
- `check_ofertas_intl ee`, `check_fronteras`, `check_eol`, `check_motor` (5119 pruebas): OK
- `check_mundo`: falla solo por `be`, ajena a este país. Con `ee` publicado temporalmente entra como «declarado»:
  6,5 / 19,3 / 23,0 %. Con `interno` no se lista.

## Riesgos y pendientes

- **Sin mirada en `next dev`**: Turbopack no acepta la junction y no se hizo `npm ci`. Títulos y marcadores sí se
  leyeron resueltos con `scripts/paises/ee/mirar_textos.ts`.
- **Slugs sin validar en Google de Estonia**: WebSearch es solo de EE. UU. Salen del encargo y del vocabulario de D33.
- **Estonio sin revisión nativa**: escrito por el agente; el registro «sina» es a confirmar (D33).
- Cifras que vencen: tramos de 2026 con `proximaRevision` 2027-01-01. Töötuskindlustus termina el 31/12/2026: hace
  falta el decreto de tasas 2027.
- Los números de `ejemplo` están escritos a mano, como en los países modelo: revisarlos cuando cambien los datos.
