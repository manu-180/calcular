# Jordania (jo): 59 calculadoras en árabe, publicado

Rama `claude/pais-jo`, creada sobre `claude/mundo-trad-ar`. **Depende de `claude/mundo-motor-ar` y
`claude/mundo-trad-ar`**: el idioma `ar` (motor, rtl, plurales, cifras latinas) y las 41 universales en
árabe tienen que mergearse antes o junto con esta rama. **Recomendado también
`claude/mundo-arreglos-2026-10-24`** (sin mergear acá): arregla el parseo en el formulario de montos de
monedas de 3 decimales como el dinar (fils). Los casos no lo necesitan (pasan números, no texto), por eso
no lo mergeé; sin él, un monto escrito con 3 decimales («1544.136») puede no pasar del formulario.

**Sin `origin/main`**: el merge de main trae horas, calendario, rankings, sueldos y afiliados con
diccionarios por idioma sin `ar` (tsc da 10 errores). Completar esos diccionarios es trabajo del motor
árabe, no del país; aborté el merge. Al integrar: mergear main en `claude/mundo-motor-ar` con el árabe de
esos módulos y además pasar por `etiquetaIdioma()` las claves hreflang de horas, rankings y sueldos
(hoy usan `m.locale` crudo, que en árabe trae `-u-ca-gregory-nu-latn`).

## Qué incluye

- Mercado `jo`: `ar-JO-u-ca-gregory-nu-latn` (D10: cifras occidentales, calendario gregoriano; los meses
  salen en levantino, «كانون الثاني»), `trato: "usted"`, JOD con 3 decimales, Asia/Amman, escala 0,7,
  nombre «الأردن». Publicado al final de `PAISES`, cargadores y medición de mercados regenerados
  (57 mercados). Entra a «Tu sueldo en el mundo» (declarado; 7,5 % / 10,3 % / 22,1 %).
- 19 calculadoras locales (17 publicadas, 2 en borrador) + 40 universales (la de IVA se cae por la local
  `sales-tax-calculator`). Total 59; publicables 57. Slugs en inglés, como pide D10.

| slug | concepto | estado |
|---|---|---|
| income-tax-calculator (ضريبة الدخل: escala 5 a 30 %, exenciones 9.000 + 9.000, facturas, tope 23.000, contribución nacional) | impuesto-renta | publicada |
| salary-calculator (صافي الراتب: seguro 7,5 % con tope 3.733 + retención mensual) | sueldo-neto | publicada |
| social-security-calculator (اشتراكات الضمان, trabajador y empleador por seguro) | aportes-seguridad-social | publicada |
| employee-cost-calculator (تكلفة الموظف, 14,25 %) | costo-empleador | publicada |
| minimum-wage (الحد الأدنى للأجور 290) | salario-minimo | publicada |
| sales-tax-calculator (الضريبة العامة على المبيعات 16 % + tasa especial opcional) | iva | publicada |
| end-of-service-calculator (مكافأة نهاية الخدمة, art. 32: solo sin seguro social) | propio | publicada |
| unfair-dismissal-compensation (الفصل التعسفي, art. 25) | indemnizacion-despido | publicada |
| notice-period (بدل الإشعار, art. 23) | preaviso | publicada |
| final-settlement (مستحقات نهاية الخدمة) | liquidacion-final | publicada |
| annual-leave-calculator (الإجازة السنوية 14/21, art. 61) | vacaciones | publicada |
| overtime-calculator (العمل الإضافي 125/150 %, art. 59) | horas-extra | publicada |
| sick-leave-calculator (الإجازة المرضية 14 + 14, art. 65) | propio | publicada |
| retirement-pension-calculator (راتب تقاعد الشيخوخة, art. 62) | jubilacion | publicada |
| early-retirement-calculator (التقاعد المبكر, art. 64 y tabla 5) | propio | publicada |
| unemployment-benefit-calculator (بدل التعطل, arts. 50, 52, 53) | propio | publicada |
| inflation-calculator (IPC interanual del DOS) | inflacion | publicada |
| jod-usd-converter (paridad con el dólar) | tipo-de-cambio | borrador |
| land-registration-fees (رسوم تسجيل الأراضي وضريبة بيع العقار) | propio | borrador |

- Datos: 37 (38 tramos verificados, 3 no verificados), 1 serie, 2 avisos (alcance de la ley del trabajo,
  info; proyecto de reforma de la seguridad social 2026, cautela), 1 novedad (tope de 3.733 en 2026),
  7 detectores (6 de norma, 1 de serie automático).

## Fuentes primarias leídas el 24/10/2026

- **istd.gov.jo** (دائرة ضريبة الدخل والمبيعات): ley 34/2014 de impuesto a la renta consolidada con la
  reforma 38/2018 (`QRCODE/income2.pdf`, arts. 9 y 11) y ley 6/1994 del impuesto general a las ventas
  consolidada a septiembre de 2022 (art. 6 a, PDF con fuente rota leído por imagen). El sitio responde
  de forma intermitente.
- **ssc.gov.jo** (المؤسسة العامة للضمان الاجتماعي): ley 1/2014 consolidada al 16/4/2023 (PDF escaneado,
  leído por imagen: arts. 4, 20, 24, 42, 48, 50, 52, 53, 59, 62, 64 y tabla 5); comunicado del tope 2026
  (3.733 y 623 de desempleo; 3.668 y 612 en 2025); comunicado del mínimo de 290 para 2025-2027.
- **opendata.gov.jo** (portal oficial de datos abiertos): ley del trabajo 8/1996 consolidada hasta la
  reforma 14/2019 (actualizada en el portal el 16/7/2025). mol.gov.jo y lob.gov.jo rechazan conexiones
  desde fuera de Jordania («Request Rejected»).
- **dosweb.dos.gov.jo** (دائرة الإحصاءات العامة): IPC de septiembre de 2026, 2,73 % interanual.
- **tawasal.gov.jo**: proyecto de ley reformatoria de la seguridad social 2026 (para el aviso de cautela).

## No verificados (calculadora en borrador)

- `jo.usd-peg` (0,709): cbj.gov.jo rechaza las conexiones desde fuera de Jordania. jod-usd-converter.
- `jo.land-registration-fee` y `jo.property-sales-tax` (4 % y 4 %, indicativos): dls.gov.jo no respondió;
  faltan además las exenciones de departamentos por superficie. land-registration-fees.

## Decisiones

- Divisor diario 30 y hora = salario / 30 / 8 (la ley del trabajo no fija divisor); dicho en cada página.
- La gratificación del art. 32 sale 0 si la persona está bajo la seguridad social (es lo que dice la ley).
- `indemnizacion-despido` es el despido arbitrario del art. 25; la gratificación queda `propio`.
- Impuesto a la renta: imponible e impuesto se bajan al dinar (art. 11 هـ); el tramo de 30 % se toma
  marginal sobre lo que pasa del millón.
- Neto del desempleo después del 17,5 % de vejez (arts. 52 b y 53 b/2) y con el tope neto anual.
- Maternidad no se hizo: hay un proyecto para pasar de 10 semanas a 90 días y no pude confirmar si se
  promulgó.

## Checks (corridos con jo publicado)

- `npx tsc --noEmit -p .`: OK.
- `check_paises jo`: OK (37 datos, 38 tramos verificados, 3 pendientes, 59 calculadoras); el completo
  dentro de check-all: 60 países, 98 avisos, OK.
- `check_paises_casos jo`: 68 casos en 19 archivos, OK. `check_textos_paises jo`: 874 textos, 0 avisos.
- `check_fronteras`: 7677 archivos OK. `check_eol`: 8349 archivos en LF.
- `check_motor --generar-cargadores`: 2353 pruebas OK. `check_medicion_mercados --escribir`: 57 mercados.
- `check_seo_intl`: 7682 páginas intl OK en los dos modos.
- `check_ofertas_intl jo`: OK (46.703 textos). En la corrida completa fallan solo los 15 casos conocidos
  de cl/finiquito (UF), ajenos, arreglados en `claude/mundo-arreglos-2026-10-24`.
- `check_mundo`: jo entra (declarado).
- `check_hreflang`: 1978 fallas, todas del clúster de inflación (la falla conocida de main, arreglada en
  `claude/mundo-arreglos-2026-10-24`: cada mercado del clúster en su propia fecha). Medido en el mismo
  momento sin jo: 1892; las 86 de diferencia son los pares de `jo/inflation-calculator` dentro de ese
  mismo clúster. Ninguna falla fuera de inflación. (El número varía con la hora del día por la misma causa:
  a las 17 h daba 1380 con jo.)
- `check-all`: 148/150 suites verdes; fallan check_hreflang y check_ofertas_intl por lo de arriba.
- `npm run build`: no corrido (opcional con check-all pasado).

## Pendientes y riesgos

- Revisión de un hablante nativo (árabe de Jordania) de todos los textos: registro, términos locales
  (الضمان، الاقتطاع، بدل الإشعار) y naturalidad. Pendiente.
- Proyecto de reforma de la seguridad social 2026 (tawasal.gov.jo): si se promulga, cambian la jubilación
  anticipada y el cálculo del promedio. El detector `jo.ssc-law-amendment` vigila la página de SSC.
- Releer la paridad en cbj.gov.jo y las tasas de registro en dls.gov.jo desde una conexión en Jordania.
- Push y PR saltados: la cuenta no tiene permiso de escritura (403) y no hay `gh`.
- No miré las páginas en `next dev` (Turbopack rechaza la junction de node_modules y no corrí `npm ci`).

## Merge de las universales ar al día (24/10, tarde)

`43643bb5` mergea `claude/mundo-trad-ar` en `88bc6692` (universales ar sobre el motor ar puesto al día
con main 7d190a68: calendario, horas, rankings, sueldos reales y afiliados en árabe, rtl de las hojas
nuevas, coma árabe en las uniones armadas por código, zz-ar en `ar-001`). Sin conflictos; los
generadores no cambiaron nada (sin commit aparte).

El aviso de esta rama (horas, calendario, rankings y sueldos arman el hreflang con el locale crudo) ya
está resuelto en el motor (`aedb0067`): las cuatro páginas y su JSON-LD (`inLanguage`) pasan por
`etiquetaIdioma()`, así que el clúster dice `ar-JO`, `ar-SA`, `ar-EG` y no
`ar-JO-u-ca-gregory-nu-latn`. check_hreflang compara con la misma etiqueta base.

- `check_motor --generar-cargadores`: 2353 pruebas OK · `check_medicion_mercados --escribir`: 57
  mercados · `gen_idiomas_universales`: 0 index reescritos
- `npx tsc --noEmit -p .`: OK
- `check_paises jo`: 37 datos, 1 serie, 59 calculadoras, publicado, 0 avisos
- `check_paises_casos jo`: 68 casos en 19 archivos · `check_textos_paises jo`: 874 textos, 0 avisos
- `check_seo_intl`: 7682 páginas intl OK · `check_universales`: 41 universales, 4664 casos
- `check_hreflang`: 1924 fallas, todas del clúster de inflación (inflation-calculator, ipc,
  correcao-pelo-ipca, teuerungsrechner y sus pares); 74 tocan `/jo/inflation-calculator` por estar en
  ese clúster. Ninguna de zz-ar ni de las páginas nuevas en árabe. Falla conocida de main.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
