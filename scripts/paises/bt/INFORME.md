# Bután (`bt`): informe del agente

- Rama: `claude/pais-bt` (con `origin/main` mergeado el 31/10/2026).
- Mercado: `bt`, inglés (`en-BT`), BTN, Asia/Thimphu, escala 85, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: **64 calculadoras** = 24 locales, todas publicables, + 40 universales (`universales: "todas"`). Sin borradores.
- El 31/10/2026 los portales que el 29/10 estaban caídos respondieron: drc.gov.bt, nab.gov.bt, rma.org.bt, nsb.gov.bt, mof.gov.bt, moice.gov.bt, oag.gov.bt y nppf.org.bt. molhr.gov.bt y moesd.gov.bt no resuelven (el trabajo pasó al MoICE). web.archive.org estaba fuera de servicio, pero no hizo falta: toda lectura es del sitio oficial.

## Calculadoras locales

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| income-tax-calculator | impuesto-renta | sí | Income Tax Act 2025, Schedule 1 |
| take-home-pay-calculator | sueldo-neto | sí | Act, s. 44 y Schedule 1; NPPF 5 % mínimo |
| presumptive-tax-calculator | regimen-simplificado | sí | Act, Schedule 2; notificación DRC 16/12/2025 |
| corporate-tax-calculator | propio | sí | Act, Schedule 1 |
| withholding-tax-calculator | retencion-honorarios | sí | Notificación DRC, parte 2 |
| rental-income-tax-calculator | propio | sí | Act, s. 74 y Schedule 1 |
| gst-calculator | iva | sí (era borrador) | GST Act consolidada, Schedule I |
| gst-registration-calculator | propio | sí | GST Act, Schedule II; FAQ DRC 2026 |
| minimum-wage-calculator | salario-minimo | sí | Circular MoLHR 31/10/2013 |
| inflation-calculator | inflacion | sí | IPC del NSB, serie 2023-24 = 100 |
| dollar-to-ngultrum | tipo-de-cambio | sí | Boletín estadístico del RMA, octubre 2026 |
| ngultrum-to-rupee | propio | sí (era borrador) | RMA, Monetary Policy Statement 2026 |
| annual-leave-calculator | vacaciones | sí | Regulation on Working Conditions 2022, ss. 181 a 197 |
| maternity-leave-calculator | propio | sí | Regulation, ss. 202 a 212 |
| gratuity-calculator | propio | sí | Regulation, ss. 243 a 251 |
| notice-period-calculator | preaviso | sí | Labour and Employment Act 2007, ss. 68, 72, 91 |
| wrongful-dismissal-compensation-calculator | indemnizacion-despido | sí | Act, ss. 94, 127 |
| overtime-pay-calculator | horas-extra | sí | Act, ss. 110, 124, 125 |
| public-holiday-pay-calculator | propio | sí | Act, ss. 108, 110 |
| night-duty-pay-calculator | propio | sí | Act, s. 125 y definición de night work |
| probation-period-calculator | propio | sí | Act, ss. 72 a 74 |
| final-pay-deadline-calculator | liquidacion-final | sí | Act, ss. 68, 127, 131 |
| salary-deduction-limit-calculator | propio | sí | Act, ss. 131, 132 |
| private-provident-fund-calculator | aportes-seguridad-social | sí | NPPF, Private PF Scheme Guidelines 2021, cláusula 9 |

## Datos

- 50 datos, 50 tramos verificados, 0 pendientes. 2 series. `verificadoEl` 31/10/2026, salvo los 3 de NPPF (29/10/2026).
- Labour Act: los 17 datos pasaron de la copia del ADB a la oficial (`moice.gov.bt/.../labouract.pdf`). Se releyeron las secciones citadas en la copia oficial y coinciden.
- Dos circulares son escaneos sin texto: salario mínimo 2013 y National Workforce 2023. Se leyeron como imagen.
- Salario mínimo: Nu. 125 al día o 3.750 al mes. **Decisión:** se publica como verificado. La prensa de 2025 dice Nu. 215 y hay calculadoras de terceros con 450, pero la circular de 2013 es la última que lista el Departamento de Trabajo, y su guía de compensación de 2024 sigue calculando con Nu. 3.750. El 215 era la categoría no calificada de la National Workforce, otra escala (subió a 400 el 1/10/2023, solo para obras por administración del Estado). La FAQ lo explica. Riesgo en Riesgos.
- Paridad: el RMA la dice textual («at par»). El `desde` 2026-01-01 es el del documento, no el inicio de la paridad, y la `nota` lo aclara.
- Tipo de cambio: tasa de cierre de mes del boletín, último punto 31/8/2026 (95,38). La tabla diaria de rma.org.bt/exchangeRates no devolvió datos al lector.
- IPC: el índice da 5,58 % a 12 meses a septiembre de 2026, igual que el informe del NSB publicado el 20/10/2026.
- Fuera de alcance, sin cargar: tasas NPPF de la función pública y fondo GIS. El sueldo neto pide la tasa y las otras deducciones al usuario.

## Novedades y detectores

- 4 novedades con fuente primaria: IPC septiembre 2026, aviso NPPF junio 2026, inicio del GST y nueva ley de renta.
- 3 detectores de norma: `bt.drc-income-tax`, `bt.drc-gst`, `bt.moice-labour`. Buscan PDFs de esa materia con año y mes en la ruta posteriores a los leídos.
- Prueba real (`scripts/paises/bt/probar_detectores.ts`, 31/10/2026): los 3 leyeron la página real y dieron 0 hallazgos, que es lo esperado hoy.
- Sin detector de series: IPC y dólar salen de xlsx, así que se actualizan a mano. `maxAntiguedadDias` 100 avisa cuando quedan viejas.

## Checks (con `bt` registrado localmente)

- `tsc --noEmit -p .`: sin errores.
- `check_paises bt`: 50 datos, 2 series, 64 calculadoras, 0 avisos.
- `check_paises_casos bt`: 75 casos en 24 archivos.
- `check_textos_paises bt`: 1039 textos, 0 avisos.
- `check_seo_pais bt`: sin fallas ni avisos.
- `check_ofertas_intl bt`, `check_fronteras`, `check_eol`: OK.
- `check_mundo`: `bt` no figura entre los excluidos.
- No se miró en `next dev`: la junction de node_modules no sirve para Turbopack y no se hizo `npm ci`.

## Riesgos y pendientes

1. Salario mínimo: no se puede descartar una circular nueva sin publicar en la lista del MoICE. El detector `bt.moice-labour` la marcaría si aparece. Conviene una consulta al Departamento de Trabajo antes de confiar a largo plazo.
2. Sueldo neto: usa el impuesto anual dividido 12. El empleador retiene por la tabla del Annexure I (15 % sin tope, en escalones de Nu. 100), así que el recibo puede diferir un poco. La observación y la FAQ lo avisan.
3. La calculadora de sueldo neto no resta del impuesto el aporte propio al fondo: la s. 44 da una deducción única. No se encontró una regla que permita otra cosa, pero no hay ejemplo oficial que lo confirme.
4. El umbral voluntario de GST (Nu. 2,5 millones) sale de la FAQ del DRC. El texto de la Act solo fija el obligatorio.
5. Horas extra y nocturnidad siguen pidiendo las horas del mes al usuario. La sección 161 de la Regulation fija 8 horas al día y 48 a la semana: se puede usar para mejorarlas.
6. Falta dar de alta el país: lo hace el coordinador.
