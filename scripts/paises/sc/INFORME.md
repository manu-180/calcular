# Seychelles (`sc`): informe del agente

- Rama: `claude/pais-sc` (base `origin/main`).
- Mercado: `sc`, inglés (`en-SC`), SCR, `Indian/Mahe`, escala 14, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: **58 calculadoras** = 18 locales (todas `publicado`) + 40 universales (`universales: "todas"`; la de IVA se cae sola porque hay `vat-calculator` local).

## Calculadoras locales

| Slug | Concepto | Base |
|---|---|---|
| income-tax-calculator | impuesto-renta | SRC, tramos mensuales de ciudadanos desde 1/6/2018 |
| net-salary-calculator | sueldo-neto (declara `mundo`) | SRC y nota del SPF del 8/12/2022 |
| spf-contribution-calculator | aportes-seguridad-social | nota del SPF (5 %, 5 %, 10 % desde 1/1/2023) |
| employer-cost-calculator | costo-empleador | SPF empleador, s. 46C y S.I. 3 de 2017 |
| minimum-wage-calculator | salario-minimo | S.I. 16 de 2025 (SR40.95 y SR47.19 por hora desde 1/4/2025) |
| overtime-calculator | horas-extra | Conditions of Employment Regulations, reg. 6 |
| public-holiday-pay-calculator | propio | reg. 5 |
| annual-leave-calculator | vacaciones | reg. 9 |
| sick-leave-calculator | propio | reg. 12 y 12A (S.I. 34 de 2019) |
| maternity-leave-calculator | propio | reg. 16 y 19A (S.I. 32 de 2018 y 26 de 2015) |
| notice-period-calculator | preaviso | Employment Act, ss. 59, 60 y 70 |
| severance-pay-calculator | indemnizacion-despido | Employment Act, ss. 47(2), 62A |
| thirteenth-month-pay-calculator | bono-semestral | Employment Act s. 46C y S.I. 3 de 2017 |
| vat-calculator | iva | SRC, tasa 15 %, umbral SCR 2 millones |
| business-tax-calculator | propio | SRC FAQ, bandas desde enero 2022 |
| presumptive-tax-calculator | regimen-simplificado | SRC, 1,5 % bajo SCR 1 millón |
| immovable-property-tax-calculator | propio | SRC, 0,50 % para no seychellois |
| withholding-tax-calculator | retencion-honorarios | SRC, retenciones de la Business Tax Act |

## Datos

- 40 datos: 39 tramos verificados (leídos el 2026-10-29 en src.gov.sc, pensionfund.sc y employment.gov.sc) y 1 no verificado.
- No verificado: `sc.income-tax-bands-non-citizen`. La página de impuestos de la SRC y su FAQ imprimen columnas distintas para no ciudadanos (15 % contra 0 % en el primer tramo y montos fijos distintos). Ninguna calculadora lo usa, que es lo correcto.
- El PDF del Employment Act y los reglamentos salen de escaneos con texto OCR ruidoso. Los valores usados se contrastaron con la imagen de la página (horas extra, licencia anual, preaviso, salario mínimo) o con el texto limpio de la enmienda (S.I. 32 de 2018, 34 de 2019, 26 de 2015, Actas 19 de 2023 y 22 de 2022).
- La tasa de IVA (15 %) y el umbral (SCR 2 millones) están en la página «Seychelles Tax System» de la SRC. El texto escaneado de la VAT Act 2010 no se pudo leer sin OCR.
- Sin series: el CBS no publica un tipo de cambio accesible, así que no hay conversor ni inflación.

## Detectores (5, todos de normas)

`sc.spf-notices` y `sc.src-notices` leen los feeds RSS de pensionfund.sc y src.gov.sc (notas posteriores a 2026-10-29 que mencionen tasas, impuestos o umbrales). `sc.minimum-wage-regulations`, `sc.conditions-of-employment` y `sc.employment-act-amendments` miran las páginas de normas del ministerio y avisan si aparece un año posterior al último leído.

## Dudas y riesgos para el coordinador

- Decimotercer mes: el Employment Act (s. 46D) lo ató a la evaluación de desempeño para 2022 a 2025. Una guía comercial dice que una ley de 2025 restituyó el mes completo, pero no encontré el texto oficial. La calculadora usa la regla de la s. 46C (mes completo) y lleva un aviso de cautela. Si el coordinador prefiere cero riesgo, puede pasarla a borrador.
- Base del SPF para el empleado: la nota oficial da el porcentaje, pero no el salario sobre el que se aplica. Se usa el bruto del mes.
- Impuesto a la renta: se calcula sobre el bruto mensual sin deducir el aporte al SPF (así lo describe la tabla de la SRC).
- Divisor de «un día de salario» y del valor hora a partir del mensual: la ley no lo fija. Los campos lo dejan editable (indemnización) o lo explican en una observación (horas extra y salario mínimo mensual).
- La neta de `mundo` entra a la grilla solo cuando el mercado pase a `publicado`.
- Pedido al motor: ninguno.
