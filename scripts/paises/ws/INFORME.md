# Samoa (`ws`): informe del agente

- Rama: `claude/pais-ws` (base `origin/main`). Mercado `ws`, inglés (`en-WS`), WST, Pacific/Apia, escala 3, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: 16 calculadoras locales publicables + universales (`universales: "todas"`; la universal de IVA se cae sola porque hay `vagst-calculator` local).

## Portales abiertos al empezar (29/10/2026)

| Portal | Resultado |
|---|---|
| revenue.gov.ws | Abre con `https://www.revenue.gov.ws/` (redirige a revenue.gov.ws; el host pelado da reset por el proxy del entorno). Hojas IS01 e IS02 en PDF, página de impuestos con VAGST. |
| cbs.gov.ws | Abre. `/daily-exchange-rates` trae USD, NZD, AUD, EUR, FJD, JPY, GBP y CNY por tala con fecha. |
| npf.ws | Abre (Wix). `/employers-guide` y `/employer-faqs` se leen como HTML; la ley (SNPF Act 1972) es un PDF incrustado que no se pudo leer. |
| mcil.gov.ws | Abre. Salario mínimo en `/services/employment` y texto consolidado de la Labour and Employment Relations Act 2013 en PDF del propio ministerio. |
| palemene.ws | Abre, pero enlaza a SharePoint (no se usó). |
| sbs.gov.ws | Abre con `www`. IPC mensual en PDF y xlsx. |

## Calculadoras locales

| Slug | Concepto | Base |
|---|---|---|
| paye-calculator | impuesto-renta | IS02 (tabla quincenal) e IS01 (tabla anual) |
| net-pay-calculator | sueldo-neto (declara `mundo`) | IS01, IS02, Guía de empleadores NPF |
| npf-calculator | aportes-seguridad-social | Guía de empleadores NPF |
| employer-cost-calculator | costo-empleador | NPF y LERA s47 |
| minimum-wage | salario-minimo | MCIL (5,24; 5,65; 6,05 por hora) |
| vagst-calculator | iva | Página de impuestos del Ministry for Revenue |
| annual-leave-calculator | vacaciones | LERA s40, s41 |
| overtime-calculator | horas-extra | LERA s39, s47, s48 |
| notice-period-calculator | preaviso | LERA Anexo 2, s55, s56 |
| final-pay-calculator | liquidacion-final | LERA s55 |
| maternity-leave-calculator | propio | LERA s43 a s46 |
| withholding-tax-calculator | retencion-honorarios | IS01 |
| provisional-tax-calculator | propio | IS01 (ejemplo oficial de 10.000) |
| business-income-tax-calculator | regimen-simplificado | IS01 |
| usd-to-wst | tipo-de-cambio | Banco Central de Samoa, 6 series |
| inflation-calculator | inflacion | IPC de la Oficina de Estadística (SBS) |

## Datos

28 datos con 30 tramos verificados y 0 sin verificar, 7 series (6 monedas y el IPC). Todo leído el 29/10/2026 en fuente primaria https.

## Dudas que quedan para quien revise

1. Los tramos del PAYE se aplican de forma marginal. IS01 dice «progressive tax rates» para los sole traders y la tabla de IS02 no dice si «20 %» es sobre toda la paga o sobre el tramo. Para sueldo mensual y anual se usa la tabla anual de IS01 (15.000 y 25.000), porque IS02 solo publica la quincenal (576 y 962).
2. NPF: la Guía de empleadores dice 10 % + 10 % (20 %), pero `/employer-faqs` todavía dice «14 % o más» y la misma guía dice un mínimo de 3,00 por hora, ya viejo. Se usó la Guía por ser la explícita y detallada. Si el NPF aclara lo contrario, hay que cambiar `ws.npf-employee-rate` y `ws.npf-employer-rate`.
3. Las fechas `desde` de los datos de ley (hojas IS del 2020, LERA consolidada con la enmienda 2023) son la fecha del documento, no la de entrada en vigor, que no figura en lo leído. Por eso ninguna página muestra `#desde` de esos datos.
4. No hay indemnización legal por despido en lo leído de la LERA (solo preaviso y consulta en despidos por redundancia), así que no hay calculadora de ese concepto.
5. Sin leer: ACC, impuestos de sellos o transferencia, impuestos aduaneros y a la hotelería, ley del SNPF en PDF.
6. `check_mundo` no lista a `ws` porque el mercado es interno; la validación del neto se cumple por construcción (neto creciente y mayor al 60 % del bruto), pero conviene mirarla al publicar.
7. IPC: solo 13 meses (sep 2025 a sep 2026) leídos del xlsx. La serie no tiene detector (el xlsx no se puede leer desde el cron); vence a los 70 días y hay que cargarla a mano cada mes.

## Detectores

Seis de tipo serie (tasas del Banco Central) y cuatro de tipo norma (hojas IS01 e IS02 por nombre de archivo, VAGST, salario mínimo y Guía NPF). No se corrieron contra la red: las expresiones se escribieron mirando el HTML y el texto de las páginas leídas con curl el 29/10/2026.
