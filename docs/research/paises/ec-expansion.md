# Ecuador: expansión de calculadoras (de 15 a 38 publicadas)

Fecha: 12/10/2026. Complementa `docs/research/paises/ec.md` (7/10/2026). Todo valor que entra como
`verificado` en `src/paises/ec/datos.json` se leyó ese día en la fuente primaria que figura en la tabla.

## Cómo se midió la demanda

Sin volúmenes de Keyword Planner en esta sesión. La señal es cualitativa y se cruza de tres lados:

1. **Competidor directo** (hacecuentas.com/ec, sitemap del 12/10): hubs de décimos y fondos de reserva,
   IESS aportes y jubilación, licencias y pensión alimenticia, liquidación y despido, sueldo neto,
   impuesto a la renta, IVA, RIMPE, impuestos del auto (impuesto vehicular y rodaje), créditos y ahorro,
   préstamo quirografario, ISD, aporte voluntario al IESS y validación de cédula.
2. **Prensa ecuatoriana 2026** (Expreso, El Universo, Vistazo, El Diario, Primicias): notas de servicio
   repetidas sobre jubilación IESS, pensiones alimenticias, ISD con tarjeta, matrícula vehicular,
   afiliación voluntaria, licencia de paternidad, despido de mujeres embarazadas y gastos personales.
3. **Calendario legal**: lo que es obligatorio y le pasa a mucha gente (licencias, despidos, jornada
   nocturna, período de prueba) pesa más que lo de nicho.

## Lista rankeada

Demanda: A (alta y todo el año), B (media o estacional fuerte), C (nicho o de cola larga).

| # | Calculadora (slug) | Demanda | Norma | Fuente primaria leída | Estado |
|---|---|---|---|---|---|
| 1 | despido-intempestivo | A | CT art. 185 y 188 | Código del Trabajo (codificación SERCOP 2026) | publicada |
| 2 | desahucio | A | CT art. 184 y 185 | ídem | publicada |
| 3 | impuesto-vehicular | A | Ley de Reforma Tributaria 2001 | sri.gob.ec/impuestos-vehiculares (tabla y 1 % de usados) | publicada |
| 4 | impuesto-salida-divisas | A | Ley Reformatoria para la Equidad Tributaria | sri.gob.ec/impuesto-a-la-salida-de-divisas-isd (5 %, 3 SBU, USD 5.188,26) | publicada |
| 5 | licencia-maternidad | A | CT art. 152, 153 y 155 | Código del Trabajo | publicada |
| 6 | licencia-paternidad | A | CT art. 152 (15 días desde el 12/5/2023) | Código del Trabajo | publicada |
| 7 | aportes-iess | A | Tasas de aportación IESS | iess.gob.ec Tasasdeaportacion.pdf | publicada |
| 8 | simulador-de-credito | A | sin norma: cuota francesa con la tasa que da el banco | no requiere dato | publicada |
| 9 | plazo-fijo | A | LRTI art. 9 num. 15.1 y retención del 3 % | LRTI del SRI y tabla de retenciones del SRI | publicada |
| 10 | gastos-personales | B (pico enero a marzo) | LRTI, gastos personales | LRTI y Decreto Ley 742 (ya cargados) | publicada |
| 11 | jornada-nocturna | B | CT art. 49 (25 %) | Código del Trabajo | publicada |
| 12 | periodo-de-prueba | B | CT art. 15 (90 días; 15 en trabajo del hogar) | Código del Trabajo | publicada |
| 13 | despido-ineficaz | B | CT art. 195.1 a 195.3 | Código del Trabajo | publicada |
| 14 | retencion-en-la-fuente | B (contadores y freelancers) | Res. NAC-DGERCGC26-00000009 | XLS de porcentajes del SRI (desde marzo 2026) | publicada |
| 15 | impuesto-herencias | B | LRTI art. 36 lit. d | PDF de tablas de herencias del SRI 2026 | publicada |
| 16 | jornada-parcial | B | CT art. 47 y 82 | Código del Trabajo | publicada |
| 17 | sueldo-por-dias | B | CT art. 82 (pago proporcional) | no requiere dato normativo | publicada |
| 18 | contrato-eventual | C | CT art. 17 (35 % sobre la hora) | Código del Trabajo | publicada |
| 19 | jubilacion-patronal | C | CT art. 216 | Código del Trabajo | publicada (haber individual, fondo global mínimo y topes; la pensión exacta la fija un cálculo actuarial) |
| 20 | multa-sri | C | LRTI art. 100 | LRTI del SRI | publicada |
| 21 | cesantia-iess | C | aportes de cesantía 2 % + 1 % | Tasasdeaportacion.pdf del IESS | publicada |
| 22 | impuesto-renta-sociedades | B (contadores, pico en abril) | LRTI art. 37 y CT art. 97 | LRTI del SRI | publicada |
| 23 | validar-cedula | A (formularios y facturación) | algoritmo módulo 10 de la cédula | no requiere dato normativo | publicada |
| 24 | jubilacion-iess | A | Ley de Seguridad Social y Res. C.D. 100 | coeficientes y requisitos verificados en C.D. 100 (PDF escaneado, tabla leída en dos columnas); mínimos y máximos 2026 solo en prensa | borrador (se publica al verificar mínimos y máximos) |
| 25 | pension-alimenticia | A | Acuerdo MDH-DM-2026-0005-A | desarrollohumano.gob.ec no responde desde fuera de Ecuador; no está en la búsqueda del Registro Oficial | no construida |
| 26 | afiliacion-voluntaria | B | Res. C.D. 467 y reformas | la C.D. 467 (2014) dice 20,50 %; el 17,60 % actual solo aparece en prensa | no construida |
| 27 | prestamo-quirografario BIESS | B | tasas y plazos del BIESS | biess.fin.ec redirige a un login | no construida |
| 28 | tablas sectoriales MDT | B | acuerdos del Ministerio del Trabajo | trabajo.gob.ec no responde desde fuera de Ecuador | no construida |
| 29 | subsidio por enfermedad IESS | C | reglamento de subsidios | sin página del IESS legible | no construida |
| 30 | despido por discapacidad | C | Ley Orgánica de Discapacidades (reformada en 2025) | texto vigente y numeración no confirmados | no construida |

## Trampas que salieron al leer las normas

- **Paternidad**: desde el 12/5/2023 son 15 días por parto normal (antes 10). Mucha prensa vieja todavía dice 10.
- **Lactancia**: la jornada de 6 horas dura 15 meses desde que termina la licencia por maternidad (no 12).
- **ISD 2026**: la tarifa general sigue en 5 %; hay 2,5 % y 0 % solo para importaciones de listas de
  subpartidas (no aplica a personas). Efectivo al viajar: exento hasta 3 SBU por adulto, más 1 SBU por
  menor que viaja con él. Tarjetas en el exterior: USD 5.188,26 al año exentos (2025 a 2027).
- **Herencias**: hijos menores de edad o con discapacidad no pagan; padres e hijos pagan con las
  tarifas a la mitad. La exoneración total del primer grado (Decreto Ley de 2021) fue declarada
  inconstitucional en 2023 y no rige.
- **Plazo fijo**: intereses exentos de impuesto a la renta si el depósito es a 180 días o más y no eres
  deudor de ese banco (las tarjetas de crédito no cuentan como deuda). Si no, retención del 3 %.
- **Retenciones**: el SRI cambió la tabla en marzo de 2026; los RIMPE negocio popular no tienen
  retención y los RIMPE emprendedor, 1 %.
- **Jubilación patronal**: la pensión mensual sale de coeficientes actuariales (Acuerdo MDT 99 de 2016)
  que no están en una fuente legible; publicamos el haber individual, el mínimo del fondo global y los
  topes legales de la pensión, y lo decimos en la página.

## Pedidos pendientes (para una sesión con acceso desde Ecuador o con el PDF a mano)

- Tabla de pensiones alimenticias mínimas 2026 (MDH-DM-2026-0005-A).
- Pensiones mínimas y máximas de vejez del IESS 2026 (para publicar `jubilacion-iess`).
- Tasa vigente de la afiliación voluntaria (resolución del IESS posterior a la C.D. 467).
- Tasas y plazos de los préstamos quirografarios e hipotecarios del BIESS.

## Detectores nuevos (probados contra la red el 12/10/2026)

| Detector | Qué vigila | Resultado real |
|---|---|---|
| ec.sri-isd | tarifa general del año y monto exento con tarjeta en la página del ISD | 0 hallazgos: 5 % y USD 5.188,26 coinciden con lo cargado |
| ec.sri-tabla-herencias | enlace al PDF de la tabla de herencias (cambia de identificador con cada tabla nueva) | 1 hallazgo con el PDF vigente |
| ec.sri-retenciones | enlace al XLS de porcentajes de retención | 1 hallazgo con el XLS vigente |
| ec.sri-vehiculos | primer y último tramo de la tabla del impuesto vehicular | 0 hallazgos: coincide con lo cargado |
