# Nepal (`np`): informe del agente

- Rama: `claude/pais-np` (base `origin/main`). Mercado `np`, inglés (`en-NP`), NPR, Asia/Kathmandu, escala 140, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: **57 calculadoras** = 17 locales publicables + 40 universales (la de IVA se cae sola porque hay `vat-calculator` local).

## Calculadoras locales (17, todas publicables)

| Slug | Concepto | Base |
|---|---|---|
| income-tax-calculator | impuesto-renta | Tarifa del IRD para el año 2083/84 (Income Tax Act 2058) |
| salary-calculator | sueldo-neto (inferido por `mundo`) | IRD + procedimiento del SSF |
| ssf-calculator | aportes-seguridad-social | Procedimiento de operación del SSF, quinta enmienda, art. 25 |
| vat-calculator | iva | Folleto del IRD sobre la Economic Act 2083 |
| minimum-wage-in-nepal | salario-minimo | Comunicado del Ministerio de Trabajo (1 Shrawan 2082) |
| overtime-calculator | horas-extra | Labour Act 2074, arts. 28 a 31 |
| home-leave-calculator | vacaciones | Labour Act, arts. 43 y 49 |
| dashain-bonus-calculator | bono-semestral | Labour Act, art. 37 |
| gratuity-calculator | fondo-cesantia | Labour Act, arts. 52 y 53 |
| notice-period-calculator | preaviso | Labour Act, art. 144 |
| severance-pay-calculator | indemnizacion-despido | Labour Act, art. 145 (reducción de personal) |
| employer-cost-calculator | costo-empleador | SSF + Labour Act |
| maternity-leave-calculator | propio | Labour Act, art. 45 y 48 |
| capital-gains-tax-calculator | propio | Tarifa del IRD 2083/84 |
| turnover-tax-calculator | regimen-simplificado | Tarifa del IRD 2083/84 (art. 4(4) y 4(4A)) |
| dollar-rate-in-nepal | tipo-de-cambio | API de divisas del NRB (compra y venta) |
| indian-rupee-to-npr | propio | API de divisas del NRB |

## Datos

- 37 datos y 3 series (USD compra, USD venta, 100 INR), **todos verificados el 2026-10-29** leyendo la fuente primaria: PDF de tarifas del IRD, folleto del IRD, procedimiento del SSF, Labour Act 2074 (copia de la Comisión de Leyes alojada en ssf.gov.np), comunicado del ministerio y API del NRB.
- Sin datos no verificados. Quedaron fuera por falta de fuente primaria legible: inflación (el sitio del NSO no publica el IPC en la portada ni en una API), impuesto a los alquileres, retención en la fuente, impuesto de sellos y registro de tierras.
- Los PDF del IRD, del SSF y del ministerio usan tipografías heredadas o son imagen: los números se leyeron decodificando la fuente (Preeti) y mirando la imagen de las tablas.

## Decisiones a revisar

- La tarifa 2083/84 del IRD trae las mismas bandas para soltero y pareja (1 % hasta NPR 10 lakh, 10 % hasta 15, 20 % hasta 25, 27 % hasta 40, 29 % arriba). No hay selector de estado civil.
- Quien aporta al SSF o a un fondo de retiro no paga el 1 % de la primera banda (anexo 1 de la ley, nota de la tabla). La deducción por retiro modelada es el aporte del trabajador (10 % del sueldo básico en el SSF); el aporte patronal no se suma al ingreso. Si el IRD trata el aporte patronal de otra forma, el neto de un afiliado cambia unos puntos.
- El 31 % del SSF (11 % trabajador, 20 % empleador) sale del art. 25 del procedimiento; el reparto 1,20 / 0,80 / 0,67 / 28,33 también.
- El año fiscal 2083/84 se cargó con vigencia desde el 2026-07-17 (1 Shrawan 2083, por analogía con 1 Shrawan 2082 = 2025-07-17 en el calendario del IRD). Si el calendario nepalí fija otro día, hay que mover un día el `desde` de la tarifa y de la novedad.
- Horas extra, días de licencia y preaviso valorados en dinero usan «días pagos al mes» (30 por defecto) como campo, porque la ley no fija el divisor.
- La compensación por reducción de personal cuenta solo años completos cuando hay más de un año (la ley dice «por cada año de servicio»).

## Detectores (6)

`npx tsx scripts/paises/np/probar-detectores.ts`, corrido con las fuentes reales: 3 de series del NRB devuelven los últimos 12 días; 3 de normas (títulos del IRD, comunicados del ministerio, lista de reglamentos del SSF) devuelven `[]`.

## Checks (con `np` registrado localmente)

- `tsc --noEmit`: sin errores.
- `check_paises np`: OK, 38 datos, 3 series, 57 calculadoras (2 avisos: las series de divisas vencen en 10 días si el cron no corre).
- `check_paises_casos np`: OK, 60 casos en 17 archivos.
- `check_textos_paises np`: OK, 776 textos.
- `check_fronteras`: OK. `check_eol`: OK. `check_seo_pais np`: OK (1 aviso de palabras).
- `check_mundo`: OK; con el mercado en `publicado` entra «inferido» (6,6 % / 11,2 % / 24,3 %).
- `check_motor`: 4595 ok y 1 falla preexistente (`forint`).
