# país eg: Egipto en árabe (20 locales publicables, 1 en borrador, 41 universales)

Rama `claude/pais-eg`, basada en la rama local `claude/mundo-trad-ar`, que a su vez está sobre `claude/mundo-motor-ar`. **Depende de los PR de `claude/mundo-motor-ar` y `claude/mundo-trad-ar`**: hay que mergear primero el motor árabe, después las universales árabes y recién después esta rama. `origin/main` ya estaba contenido (el merge dio «Already up to date»).

Primer país árabe del sitio: RTL, registro de D10 (فصحى de banca y gobierno, `trato: "usted"`, segunda persona masculina genérica; la licencia por maternidad le habla en femenino a la trabajadora), cifras occidentales (`ar-EG-u-ca-gregory-nu-latn`), puntuación árabe y slugs en inglés.

## Qué incluye

- `src/paises/eg/`: `mercado.ts` (eg, EG, مصر, ar, ar-EG-u-ca-gregory-nu-latn, usted, EGP, Africa/Cairo, escala 50), `datos.json` (32 datos: 31 verificados, 1 no verificado), `series.json` (IPC general de CAPMAS, 26 puntos de agosto 2024 a septiembre 2026), `avisos.json` (vacío), `novedades.ts` (3), `fuentes.ts` (4 detectores), `lib/nomina.ts`, `lib/fechas.ts`.
- `scripts/paises/eg/`: `probar_detectores.ts` (corre los detectores contra las fuentes reales) y `ver_textos.ts` (contenido con los marcadores resueltos, para leerlo).
- Universales: las 41 con `{ todas: true, ajustes: [{ id: "iva", datos: { tasa: "eg.vat" } }] }` (IVA 14 %).

### Calculadoras locales

| slug | concepto | estado | base |
|---|---|---|---|
| net-salary (حساب صافي المرتب) | sueldo-neto | publicado | ley 148/2019 + ley 91/2005 reformada por la 7/2024 |
| salary-tax (ضريبة كسب العمل) | impuesto-renta | publicado | ley 7/2024, art. 8 y 13 |
| social-insurance (التأمينات الاجتماعية) | aportes-seguridad-social | publicado | ley 148/2019 arts. 19, 36, 46, 70, 86 |
| employer-cost | costo-empleador | publicado | ídem |
| gross-from-net | propio | publicado | inversa del neto |
| minimum-wage (الحد الأدنى للأجور) | salario-minimo | publicado | privado 7.000, Estado 8.000, por hora 28 |
| annual-leave (الإجازات السنوية) | vacaciones | publicado | ley 14/2025 art. 124 |
| overtime (ساعات العمل الإضافية) | horas-extra | publicado | ley 14/2025 art. 121 |
| unfair-dismissal (تعويض الفصل التعسفي) | indemnizacion-despido | publicado | ley 14/2025 arts. 156, 164, 165 |
| notice-period (مهلة الإخطار) | preaviso | publicado | ley 14/2025 arts. 156 a 164 |
| redundancy-pay | propio | publicado | ley 14/2025 art. 241 |
| end-of-service (مكافأة نهاية الخدمة) | propio | publicado | ley 14/2025 art. 172 |
| pension (المعاش) | jubilacion | publicado | ley 148/2019 arts. 21, 24 y tabla 5 |
| lump-sum (تعويض الدفعة الواحدة) | propio | publicado | ley 148/2019 art. 26 |
| unemployment-benefit (تعويض البطالة) | propio | publicado | ley 148/2019 arts. 87 a 89 |
| sick-pay (تعويض الإجازة المرضية) | propio | publicado | ley 148/2019 art. 76 |
| maternity-leave (إجازة الوضع) | propio | publicado | ley 14/2025 art. 54 |
| annual-raise (العلاوة الدورية) | propio | publicado | ley 14/2025 art. 12 + Consejo Nacional de Salarios |
| real-estate-tax (ضريبة التصرفات العقارية) | propio | publicado | ETA, 2.5 % |
| inflation-calculator (حاسبة التضخم) | inflacion | publicado | IPC de CAPMAS |
| dollar-to-pound (سعر الدولار) | tipo-de-cambio | **borrador** | cbe.org.eg da 403 desde esta máquina |

## Datos y fuentes

Verificados el 2026-10-24 en fuente primaria:

- Escala del impuesto a los sueldos, umbrales de pérdida de tramos (600, 700, 800, 900 mil y 1,2 millones) y exención personal de 20.000: gaceta de la ley 7/2024 en eta.gov.eg (el texto sale con las cifras invertidas; se reconstruyó la tabla columna por columna).
- Tasas del seguro social por rama (empleado 9 + 1 + 1 = 11 %, empleador 12 + 1 + 1 + 0,5 + 3,25 + 1 = 18,75 %), factor 45 a los 60 años, tope 80 %, piso 65 %, 180 meses, indemnización única 15 %, desempleo 75/65/55/45 % y 12 o 28 semanas, enfermedad 75/85 % y 180 días: PDF de la ley 148/2019 en nosi.gov.eg. El PDF no tiene texto árabe extraíble, así que se leyeron las páginas renderizadas.
- Mínimo y máximo de أجر الاشتراك 2026 (2.700 y 16.700): noticia de NOSI del 30/11/2025.
- Salario mínimo privado 7.000 desde el 1/3/2025, 28 por hora a tiempo parcial y mínimo de la علاوة de 250: comunicado del Consejo Nacional de Salarios en mped.gov.eg.
- Ley de trabajo 14/2025 (vacaciones, horas extra, preaviso, despido, art. 172, art. 241, maternidad, علاوة 3 %), vigente desde el 1/9/2025: PDF de la gaceta en labour.gov.eg.
- IVA 14 % desde el ejercicio 2017/2018: guía de la ley 67/2016 en eta.gov.eg.
- Impuesto a la venta de inmuebles 2,5 %: guía de ETA de agosto de 2026 y nota de ETA del 29/1/2022 (vigente desde el 19/5/2013).
- IPC: API pública de CAPMAS (puerto 8080), comunicados mensuales «الأرقام القياسية لأسعار المستهلكين».

Decisiones con criterio propio:

- Mínimo del Estado 8.000 desde el 1/7/2026: verificado en el boletín diario 1327 del IDSC (centro de información del Consejo de Ministros), que cita al ministro de Finanzas. mof.gov.eg es una SPA sin texto y sis.gov.eg responde «Server Unavailable» desde acá. Si Manuel prefiere no tomar el IDSC como primario, hay que pasar ese tramo a no verificado, y la calculadora de salario mínimo queda en borrador hasta sacar la opción del sector público.
- Supuestos de cálculo declarados en pantalla: salario diario = mensual ÷ 30 (vacaciones no gozadas, horas extra, enfermedad), salario semanal = mensual × 12 ÷ 52 (desempleo), fracciones de año prorrateadas (despido, recompensas). La ley no fija esos divisores.
- La enfermedad compara el pago con el mínimo privado (la ley dice «الحد الأدنى المقرر قانونا للأجر» sin distinguir).
- Las recompensas de los arts. 172 y 241 se guardan en % del sueldo mensual (50/100 y 100/150) para que el texto diga «50% من الأجر الشهري» y no «0.5 شهر».

No verificado:

- `eg.usd-rate` (dólar del Banco Central): cbe.org.eg responde 403 a curl, a WebFetch y al navegador integrado (página vacía). La calculadora dollar-to-pound queda en borrador. Cuando se pueda leer, conviene convertirla en serie diaria con su detector.
- Tasas de los certificados de ahorro (شهادات الادخار): no las publica el CBE y su sitio no carga; no se hizo calculadora (la universal de interés compuesto cubre el cálculo).

## Detectores

`eg.cpi-capmas` (serie, API de CAPMAS: 26 puntos, último 2026-09-01 = 294.2), `eg.nosi-noticias` (lista SharePoint de NOSI: avisa noticias nuevas sobre أجر الاشتراك o las tasas), `eg.eta-noticias` (portada de noticias de ETA: impuesto a la renta, IVA, inmuebles), `eg.labour-leyes` (página de leyes del Ministerio de Trabajo: PDFs nuevos de 2026 en adelante). Los cuatro se corrieron contra las fuentes reales con `scripts/paises/eg/probar_detectores.ts`. No hay detector para el salario mínimo: la portada de mped.gov.eg carga por JS y las noticias de labour.gov.eg no traen fecha.

## Commits

- `592f991b` mercado, datos, serie IPC, detectores y 8 calculadoras (neto, impuesto, seguro social, costo empleador, bruto desde neto, salario mínimo, vacaciones, horas extra)
- `92624c23` despido injustificado, preaviso, despido por causas económicas, fin de servicio
- `4dac3c3b` jubilación, indemnización única, desempleo, enfermedad
- `9511b973` maternidad, علاوة, inmuebles, inflación, dólar (borrador)
- `6bd229f5` recompensas en %, detector de NOSI, scripts de prueba
- `3c9c0c01` publicar eg (estado publicado, alta en `PAISES`, cargadores y medición regenerados)
- `bed8874b` **fuera de `src/paises/eg`**: `src/paises/zz-ar/mercado.ts` pasa a `ar-001-u-ca-gregory-nu-latn` (como zz-en `en-001` y zz-ja `ja-001`). Con eg publicado, la edición de prueba compartía `ar-EG` con Egipto y `check_hreflang` sumaba unas 2.500 fallas en modo interno (locale repetido en el clúster y enlaces no recíprocos). Si se prefiere, este cambio va al PR del motor árabe.

## Checks (corridos, no supuestos)

- `npx tsc --noEmit -p .`: sin errores.
- `npx tsx scripts/check_motor.ts --generar-cargadores`: 2355 pruebas OK (genera `cargadores/eg.ts`, `cargadores/mercados.ts` y `universales/cargadores.ts`).
- `npx tsx scripts/check_medicion_mercados.ts --escribir`: 57 mercados.
- `check_paises eg`: ✅ 32 datos (31 verificados, 1 pendiente), 1 serie, 62 calculadoras (21 locales + 41 universales), publicado, 0 avisos.
- `check_paises_casos eg`: 57 casos en 20 archivos OK.
- `check_textos_paises eg`: 862 textos, 0 avisos.
- `check_fronteras`: 7684 archivos sin cruces. `check_eol`: OK.
- `check_mundo`: EG entra declarado (16,5 % / 21,8 % / 25,1 %, PPA 7,7218 EGP).
- `check_seo_intl`: 7626 páginas intl OK. `check_ofertas_intl`: eg aparece en todas las familias que le tocan; la suite falla solo por planillas de Chile (ver abajo).
- `npx tsx scripts/check-all.ts`: **148/150 suites verdes**. Fallan, por causas ajenas a eg:
  - `check_hreflang`: 924 fallas, todas del clúster de inflación (las páginas `inflation-calculator` de au, nz, sg, hk, my y ph no listan las mismas páginas que el resto; también 6 «no es recíproco» desde ni/inflacion). Sin eg registrado la misma suite daba 900 fallas del mismo tipo; eg suma 24 solo porque su calculadora de inflación entra al mismo clúster. Probablemente series vencidas de esos seis mercados: hay que correr `scripts/datos-paises/correr.ts --mercado <m>` para ellos.
  - `check_ofertas_intl`: `cl/finiquito` y `cl/sueldo-liquido`, diferencias planilla contra calculadora con la UF del día.
- `next dev` (con `npm ci` real en el worktree): `/eg/net-salary` con 10.000 da 8.307,50 (igual que el caso), `/eg/vat` muestra 14 %, `/eg` lista 61 calculadoras; `dir="rtl"` y `lang="ar-EG"` en las tres, formulario y resultados alineados a la derecha.
- Detectores probados contra las fuentes reales con `scripts/paises/eg/probar_detectores.ts`.

Pasos saltados: ninguno por credenciales (no hacían falta). No se corrió `npm run build` (opcional con check-all corrido).

## Pendientes y riesgos

- **Revisión de un hablante nativo de árabe egipcio pendiente**: los textos están en فصحى según D10 y pasaron las reglas de `check_textos_paises`, pero nadie nativo los leyó.
- Dólar del CBE y certificados de ahorro, ver arriba.
- El mínimo privado puede cambiar: la prensa de septiembre de 2026 habla de comités del Consejo Nacional de Salarios, sin decisión publicada.
- La edad de jubilación sube por el art. 41 de la ley 148/2019 (no lo modelamos): la jubilación asume el factor 45 de los 60 años.
- Para el motor árabe: el bloque «آخر رقم آلي» de la portada del país arma «الرقم القياسي ...لإجمالي الجمهورية, في 1 سبتمبر 2026» con una coma latina pegada a texto árabe (va «،»). Sale del motor, no del país.
- El commit `publicar eg` choca con otras ramas en `src/paises/index.ts` y en los cargadores generados; se resuelve regenerando al mergear.

## Merge de las universales ar al día (24/10, tarde)

`85839187` mergea `claude/mundo-trad-ar` en `88bc6692` (universales ar sobre el motor ar puesto al día
con main 7d190a68: calendario, horas, rankings, sueldos reales y afiliados en árabe, rtl de las hojas
nuevas, coma árabe en las uniones armadas por código). `src/paises/zz-ar/mercado.ts` no chocó: el motor
hizo el mismo cambio a `ar-001` que bed8874b. Los generadores no cambiaron nada (sin commit aparte).

- `check_motor --generar-cargadores`: 2355 pruebas OK · `check_medicion_mercados --escribir`: 57
  mercados · `gen_idiomas_universales`: 0 index reescritos
- `npx tsc --noEmit -p .`: OK
- `check_paises eg`: 32 datos (31 verificados, 1 pendiente), 1 serie, 62 calculadoras, publicado, 0 avisos
- `check_paises_casos eg`: 57 casos en 20 archivos · `check_textos_paises eg`: 862 textos, 0 avisos
- `check_seo_intl`: 7690 páginas intl OK · `check_universales`: 41 universales, 4664 casos
- `check_hreflang`: 1978 fallas, todas del clúster de inflación (inflation-calculator, ipc,
  correcao-pelo-ipca, teuerungsrechner y sus pares); 86 tocan `/eg/inflation-calculator` por estar en
  ese clúster. Ninguna de zz-ar ni de las páginas nuevas en árabe. Falla conocida de main.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
