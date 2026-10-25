# Jamaica (jm): 18 calculadoras locales y 40 universales, en inglés de Jamaica

## Qué incluye

Rama `claude/pais-jm`, basada en `origin/main` (777a00d3). No depende de ningún motor sin mergear.

- `src/paises/jm/`: mercado (`jm`, `JM`, `en-JM`, trato `tu`, JMD con símbolo `J$`, `America/Jamaica`, escala 160), `datos.json` (57 datos, 65 tramos verificados y 3 no verificados), `series.json` (3), avisos (vacío), 2 novedades y 19 detectores.
- `scripts/paises/jm/`: generador de `datos.json` con las fuentes, generador del `index.ts` y de los clientes, `ver_paginas.ts` (contenido con marcadores resueltos) y `probar_detectores.ts` (corre los detectores contra las fuentes reales sin escribir nada).
- Commit `publicar jm`: `estado: "publicado"`, alta al final de `PAISES`, cargadores generados y medición de mercados regenerada.

### Calculadoras locales

| Slug | Concepto | Estado | Fuente |
|---|---|---|---|
| salary-calculator | sueldo-neto | publicado | TAJ, guía de nómina dic. 2025 (3 ejemplos oficiales como casos) y Technical Advisory 042025/01/IT-TA |
| income-tax-calculator | impuesto-renta | publicado | TAJ, advisory (escenarios 1 y 2 oficiales) y tabla 2013-2028 |
| nis-nht-education-tax-calculator | aportes-seguridad-social | publicado | TAJ, guía de nómina |
| employer-cost-calculator | costo-empleador | publicado | TAJ, guía de nómina (NIS, NHT, Education Tax, HEART/NSTA) |
| minimum-wage-calculator | salario-minimo | publicado | JIS: Orden 2026, J$17,000 por 40 horas desde el 1/7/2026 |
| overtime-calculator | horas-extra | publicado | MLSS (resumen de la National Minimum Wage Order) y JIS |
| vacation-leave-calculator | vacaciones | publicado | MLSS (Holidays with Pay Order) |
| sick-leave-calculator | propio | publicado | MLSS (Holidays with Pay Order) |
| maternity-leave-calculator | propio | publicado | MLSS (Maternity Leave Act) |
| notice-period-calculator | preaviso | publicado | JIS, resumen de la Employment (Termination and Redundancy Payments) Act |
| redundancy-calculator | indemnizacion-despido | **borrador** | escala no verificada (ver pendientes) |
| gct-calculator | iva | publicado | TAJ, historia de la tasa estándar (15 % desde abril de 2020); reemplaza a la universal `vat` |
| transfer-tax-calculator | propio | publicado | TAJ, Rates and Fees (transfer tax 2 %, stamp duty J$5,000 o J$100, recargo de 1/4 en hipotecas) |
| property-tax-calculator | propio | publicado | TAJ, escala «as at April 1, 2017» (folleto de mayo de 2022) |
| nht-mortgage-calculator | propio | publicado | NHT: tasas de 0 a 5 % por ingreso semanal, plazo de 40 años, tope de J$9 millones |
| car-licence-fee-calculator | propio | publicado | TAJ, Rates and Fees (motor vehicle licence y certificate of fitness) |
| usd-to-jmd | tipo-de-cambio | publicado | BOJ, tasas promedio ponderadas de compra y venta |
| inflation-calculator | inflacion | publicado | STATIN, comunicados mensuales del CPI (interanual) |

Universales: las 41 con `universales: "todas"`; `vat` se cae sola por la GCT local, quedan 40. Total del país: 58.

## Checks corridos (con el país publicado)

PENDIENTE

## Decisiones

- El umbral de PAYE se carga por tramos de abril (mensual 149,948 / 158,530 / 166,958) y el anual por año de evaluación (1,876,614 en 2026), los dos del advisory de TAJ, porque el umbral sube cada 1 de abril pero el impuesto anual se calcula por año calendario.
- La banda del 30 % sale de la nota de TAJ (J$6 millones al año o J$500,000 al mes). El sueldo neto es mensual: TAJ no publica la banda del 30 % para pagos semanales o quincenales.
- Salario mínimo 2026 verificado en JIS (Jamaica Information Service, del Gobierno): el MLSS todavía no subió la Orden 2026 a su página (sí la de 2025, que no trae montos).
- Preaviso verificado en el resumen de JIS de la ley porque laws.moj.gov.jm está en mantenimiento y el portal LIPJ pide captcha.
- Vacaciones, enfermedad, maternidad y horas extra salen del documento del MLSS «Labour Management Procedures» (2024), que resume las órdenes y la ley con los párrafos citados.
- Property tax: la escala de TAJ es «as at April 1, 2017». No encontramos un cambio de tasas; el NLA empezó una revaluación de tierras en julio de 2026 que cambiaría los valores, no las tasas.
- Las páginas de TAJ Rates and Fees y de préstamos del NHT no tienen fecha: el tramo arranca el día de la lectura (24/10/2026).
- GCT local en vez de la universal: el slug `vat` no es lo que busca la gente en Jamaica.

## Pendientes y riesgos

- `redundancy-calculator` en borrador: la escala (2 semanas por año los primeros 10, 3 después, 104 semanas para calificar) solo se vio en guías de terceros. Hay que leerla en las Regulations cuando vuelva laws.moj.gov.jm.
- Inflación: detector manual (el dato interanual solo está en el PDF de cada comunicado de STATIN); hay que sumar el punto de octubre a mediados de noviembre o la calculadora sale de lo publicable antes del 23/11.
- La tasa USD del BOJ tiene un solo punto (23/10); el detector html la actualiza cada día hábil.
- El MLSS a veces tarda más de 30 s en responder (el detector devuelve fuente caída sin inventar nada).
- Sin credenciales (Supabase, Vercel, PayPal): no se corrió nada que las necesite.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
