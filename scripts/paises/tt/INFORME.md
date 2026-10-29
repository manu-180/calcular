# Trinidad y Tobago (`tt`): informe del agente

- Rama: `claude/pais-tt` (base `origin/main`). El último commit de código es `51295e6f`; este informe va en el commit siguiente.
- Mercado `tt`, `en-TT`, trato `tu`, TTD con símbolo `TT$`, `America/Port_of_Spain`, escala 7, estado `interno`.
- **54 calculadoras**: 14 locales y 40 universales (`universales: "todas"`; la universal `iva` se cae porque hay una local del mismo concepto).

## Calculadoras locales

| slug | concepto | ¿publicable? | por qué |
|---|---|---|---|
| salary-calculator | sueldo-neto | sí | NIS por clase y lunes del mes, Health Surcharge y PAYE. Declara `mundo` |
| net-to-gross-calculator | propio | sí | el mismo cálculo en sentido inverso (búsqueda binaria) |
| weekly-pay-calculator | propio | sí | sueldo semanal con la columna semanal del NIS |
| income-tax-calculator | impuesto-renta | sí | personal allowance de 90.000, 70 % del NIS con tope de 60.000 compartido con pensiones, 25 % y 30 % |
| bonus-tax-calculator | propio | sí | impuesto incremental de un bono (no incluye NIS sobre el bono, lo avisa) |
| nis-calculator | aportes-seguridad-social | sí | tabla NIBTT 2026 (16 clases, empleado y empleador, semanal y mensual) |
| health-surcharge-calculator | propio | sí | 8,25 o 4,80 por semana según el umbral; exentos |
| employer-cost-calculator | costo-empleador | sí | sueldo más el NIS del empleador |
| minimum-wage-calculator | salario-minimo | sí | TT$20,50 por hora, día, semana y mes (LN 390/2023) |
| maternity-leave-calculator | propio | sí | 14 semanas, 1 mes con sueldo completo y 2 con medio sueldo, fechas. Aviso `info` por el proyecto de ley de 2026 |
| severance-tax-calculator | propio | sí | severance exento hasta 500.000; contract gratuity al 25/30 % |
| vat-calculator | iva | sí | 12,5 %, umbral de registro de 600.000 |
| stamp-duty-calculator | propio | sí | escalas para vivienda y para terreno; exención de 1,5 M para primera vivienda |
| usd-to-ttd | tipo-de-cambio | sí | compra y venta del Banco Central para USD, CAD, GBP y EUR (8 series) |

No hay ninguna en borrador. No hice horas extra, vacaciones, licencia por enfermedad, despido (severance pay), preaviso, property tax ni inflación (los motivos están abajo).

## Datos (28, todos verificados el 2026-10-27 en fuente primaria https)

- **IRD** (ird.gov.tt):
  - deducciones: personal allowance 90.000 desde el 1/1/2023; 70 % del NIS; tope de 60.000.
  - severance y gratuity: 25 % hasta 1.000.000 y 30 % por encima; exención de severance de 500.000 desde el 30/11/2018.
  - Health Surcharge: 8,25 / 4,80, con umbrales de 469,99 por mes y 109 por semana.
  - VAT: 12,5 % y umbral de 600.000.
  - stamp duty: tasas de 2008 y FAQ de primera vivienda.
- **NIBTT**: planilla «Earnings Classes and Contributions from 05 January 2026» (16,2 %, Legal Notice 487/2025). La cargué en 4 escalas: semanal y mensual, empleado y empleador. El aporte es la `cuotaFija` de cada clase.
- **Gaceta**: Legal Notice No. 390 of 2023 (salario mínimo desde el 1/1/2024).
- **laws.gov.tt**: Maternity Protection Act, Chap. 45:57, sección 9 (consolidado a 2014, que incluye la Ley 7 de 2012).
- **Banco Central**: tabla Exchange Rates de su portada, punto del 2026-10-26.
- **Ningún dato quedó como no verificado.** Lo que no pude leer en fuente primaria directamente no entró:
  - **Minimum Wages Order 2014** (horas extra, vacaciones, enfermedad): solo está en news.gov.tt, que presenta un certificado TLS de otro dominio (moc.gov.tt). labour.gov.tt devuelve 403 a scripts y no publica las tasas.
  - **Retrenchment and Severance Benefits Act**: el PDF del Industrial Court da 404. Además hay un proyecto de reforma de las tasas (Senate Bill No. 6 of 2026) en trámite.
  - **Property tax**: el presupuesto 2026 lo abandonó y su estado actual no está claro en fuentes oficiales.
  - **Business levy y green fund levy**: el umbral no está confirmado en el IRD.
  - **Inflación**: la serie del RPI de la CSO no la busqué.

## Detectores (17) y prueba real

Probados con `npx tsx scripts/paises/tt/probar_detectores.ts`, contra las fuentes reales el 2026-10-27:

- **8 series del Banco Central**: leen la fecha y la tasa de la tabla y dan `sin-novedad` (último punto 2026-10-26).
- **`tt.nib-contribution-rates`**: avisa si aparece una planilla nueva. El primer intento dio ETIMEDOUT y el reintento, `sin-novedad`.
- **6 `vigila` del IRD**: controlan textos clave de deducciones, severance, Health Surcharge, VAT y stamp duty. Todos dieron 0 hallazgos.
- **2 manuales**: la Gaceta (salario mínimo) y la ley de maternidad.

## Checks (corridos con `tt` registrado en local; `src/paises/index.ts` sin commitear)

| check | resultado |
|---|---|
| `tsc --noEmit` | exit 0 |
| `check_paises tt` | ✅ 28 datos (28 verificados), 8 series, 54 calculadoras |
| `check_paises_casos tt` | TODO OK: 51 casos en 14 archivos |
| `check_textos_paises tt` | TODO OK: 680 textos |
| `check_fronteras` | TODO OK: 13267 archivos |
| `check_eol` | OK: 14528 archivos en LF |
| `check_motor` | TODO OK: 4393 pruebas |
| `check_calendario` | TODO OK |
| `check_mundo` | TODO OK. TT no aparece mientras esté `interno` (la grilla filtra por visibilidad en producción). Con `publicado` en local entra como `declarado`, con tasa efectiva de 5,7 % a 22,4 % y PPA 3,84 |

El aviso esperable es que `usd-to-ttd` deja de ser publicable el 2026-11-26 si el cron no actualiza las series.

## Riesgos y dudas para el coordinador

1. **`next dev` no se pudo mirar.**
   - Turbopack rechaza el `node_modules` compartido («Symlink points out of the filesystem root»).
   - Con `--webpack` arranca, pero todo da 404, incluso `/jm` que ya está publicada, así que es un problema del entorno y no del país.
   - Las páginas solo están validadas por check_motor y los demás checks.
2. **NIS 2027**: según IBFD (fuente secundaria) la tasa sube a 19,2 % el 4/1/2027. Puse `proximaRevision: 2027-01-04` en las escalas; hay que cargar la planilla nueva cuando el NIBTT la publique.
3. **Stamp duty de primera vivienda**: el IRD dice «exemption up to a maximum of $1,500,000». Lo interpreté así: el valor hasta 1,5 M queda exento y lo que pasa paga la tasa del tramo en que cae. La interpretación está en un comentario y en un caso.
4. **NIS mensual**: un aporte por cada lunes del mes, según el NIBTT. El PAYE mensual es un doceavo del impuesto anual, y el Health Surcharge mensual también va por lunes. Este último punto es una inferencia mía: el IRD da solo la tasa semanal.
5. **Fechas `desde`**: las tasas del IRD (renta, VAT, Health Surcharge) tienen `desde` 2026-01-01 porque las páginas no dan la fecha de inicio. Está anotado en la `nota` de la fuente.
6. **Ley de maternidad**: el texto de laws.gov.tt es un consolidado no oficial a 2014. Hay un aviso `info` por el proyecto de ley de 2026 (Senate Bill No. 8).
7. **Pedido de datos**: si alguien consigue la Minimum Wages Order 2014 en un https válido, salen horas extra, vacaciones y licencia por enfermedad (3 locales más).
