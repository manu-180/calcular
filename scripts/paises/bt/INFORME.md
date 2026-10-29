# Bután (`bt`): informe del agente

- Rama: `claude/pais-bt` (base `origin/main`).
- Mercado: `bt`, inglés (`en-BT`), BTN, Asia/Thimphu, escala 85, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: **51 calculadoras** = 11 locales (9 publicables, 2 borrador) + 40 universales (`universales: "todas"`).
- Cobertura baja a propósito: el 29/10/2026 todos los sitios oficiales de Bután (drc.gov.bt, nab.gov.bt, rma.org.bt, nsb.gov.bt, mof.gov.bt en documentos) devolvieron 503 o cortaron la conexión, tanto con WebFetch como con curl. Sin fuente primaria legible no hay impuesto a la renta, GST, salario mínimo ni sueldo neto publicables.

## Calculadoras locales

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| notice-period-calculator | preaviso | sí | Labour and Employment Act 2007, arts. 68, 72, 91 |
| wrongful-dismissal-compensation-calculator | indemnizacion-despido | sí | Act, arts. 94, 127 |
| overtime-pay-calculator | horas-extra | sí | Act, arts. 110, 124, 125 |
| public-holiday-pay-calculator | propio | sí | Act, arts. 108, 110 |
| night-duty-pay-calculator | propio | sí | Act, art. 125 y definición de night work |
| probation-period-calculator | propio | sí | Act, arts. 72 a 74 |
| final-pay-deadline-calculator | liquidacion-final | sí | Act, arts. 68, 127, 131 |
| salary-deduction-limit-calculator | propio | sí | Act, arts. 131, 132 |
| private-provident-fund-calculator | aportes-seguridad-social | sí | NPPF, Private PF Scheme Guidelines 2021, cláusula 9 |
| gst-calculator | iva | borrador | tasa 5 % sin verificar |
| ngultrum-to-rupee | tipo-de-cambio | borrador | paridad 1:1 sin verificar |

## Datos

- 22 datos: 20 tramos verificados, 2 sin verificar.
- Verificados (leídos el 29/10/2026): 17 de la Labour and Employment Act of Bhutan 2007 (texto en PDF alojado por el ADB, `lpr.adb.org`; no se pudo abrir la copia oficial de la Oficina del Fiscal General) y 3 de las Private Provident Fund Scheme Guidelines 2021 de NPPF (`nppf.org.bt`, PDF leído completo).
- Sin verificar: `bt.gst-rate` (5 %) y `bt.inr-per-btn` (1). Motivo: drc.gov.bt y rma.org.bt no respondieron; solo se vieron en prensa y en resultados de búsqueda.
- No cargados por falta de fuente legible: tramos del impuesto a la renta personal 2026 (se sabe por prensa: exento hasta Nu. 300.000, 5 % de 300.001 a 500.000, 10 % de 500.001 a 750.000, 30 % sobre 3,5 millones; faltan los tramos intermedios), deducción estándar (prensa: 15 % hasta Nu. 150.000), salario mínimo (fuentes en conflicto: 125, 215, 450 o 460 por día), vacaciones, licencia por maternidad y gratuity (están en las Rules, no en la Ley), tasas NPPF de la función pública (la página no dice la base).

## Novedades y detectores

- 1 novedad real: aviso de NPPF del 2/6/2026 (fuente primaria leída).
- Sin detectores: no hay página oficial cuya forma se haya podido comprobar.

## Pendientes para quien tenga acceso a los sitios oficiales

1. Leer la Income Tax Act 2025 y las reglas del DRC, cargar `bt.pit-bands` y construir los calculadores de impuesto a la renta, sueldo neto (declarar `mundo`) y costo del empleador.
2. Verificar GST 5 % y el umbral de registro en el DRC y pasar `gst-calculator` a publicado.
3. Verificar la paridad en rma.org.bt y pasar `ngultrum-to-rupee` a publicado.
4. Leer las Labour and Employment Rules and Regulations para vacaciones, maternidad y gratuity.
5. Confirmar que la Labour and Employment Act 2007 no tiene enmiendas posteriores a las calculadoras publicadas.
6. Las calculadoras de horas (overtime, night duty) piden las horas del mes al usuario porque la jornada la fija una orden ejecutiva que no se leyó.
