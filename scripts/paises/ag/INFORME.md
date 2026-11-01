# Antigua y Barbuda (`ag`): informe del agente

- Rama: `claude/pais-ag` (base `origin/main`). `src/paises/index.ts` no se commitea (lo registra el coordinador).
- Mercado: `ag`, inglés (`en-AG`), XCD, `America/Antigua`, trato `tu`, `estado: "interno"`, escala 3.
- Total: **56 calculadoras** = 16 locales (13 publicables, 3 en borrador) + 40 universales (`universales: "todas"`; la de IVA se cae sola porque hay `abst-calculator` local).

## Calculadoras locales

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| abst-calculator | iva | sí | Revenue (Miscellaneous Provisions) Act 2023 y Sales Tax (Amendment) Act 2024 |
| social-security-calculator | aportes-seguridad-social | sí | Comunicado del Social Security Board del 31.12.2024 y su FAQ |
| medical-benefits-calculator | propio | sí | Medical Benefits Regulations 2011, reg. 17 |
| employer-cost-calculator | costo-empleador | sí | ídem |
| overtime-calculator | horas-extra | sí | Labour Code, C24, C26 y C27 |
| public-holiday-pay-calculator | propio | sí | Labour Code, C14 y C15 |
| vacation-leave-calculator | vacaciones | sí | Labour Code, C8 y C18 |
| sick-leave-pay-calculator | propio | sí | Labour Code, C16 y C17 |
| sickness-benefit-calculator | propio | sí | Social Security Board, página de sickness |
| maternity-allowance-calculator | propio | sí | Social Security Board, página de maternity |
| severance-pay-calculator | indemnizacion-despido | sí | Labour Code, C40 a C44 |
| notice-period-calculator | preaviso | sí | Labour Code, C9 y C11 |
| unincorporated-business-tax-calculator | propio | sí | IRD, FAQ de UBT (2021) |
| take-home-pay-calculator | sueldo-neto (declara `mundo`) | no, borrador | Education Levy sin verificar |
| minimum-wage-calculator | salario-minimo | no, borrador | tarifa de EC$11,50 sin fuente oficial |
| usd-to-xcd | tipo-de-cambio | no, borrador | paridad 2,70 no leída en eccb-centralbank.org |

## Datos

31 datos: **28 tramos verificados, 3 no verificados**, todos leídos hoy (2026-10-29) en sede oficial con https.

No verificados, con el motivo:
- `ag.education-levy-bands`: la Board of Education Act 1994 (leída) fija 2,5 % sobre EC$6.500 a 60.000 y 5 % arriba, pero cobra la tasa solo por los años fiscales 1994 a 1996. No se encontró página oficial vigente ni ley posterior que confirme que se cobra hoy. Por eso el sueldo neto queda en borrador.
- `ag.minimum-wage-hourly` (EC$11,50 desde el 1.4.2026): solo en prensa (antiguanewsroom devolvió 403) y guías de empleadores. No se halló la Minimum Wage Order ni aviso del Labour Department.
- `ag.xcd-per-usd` (2,70): eccb-centralbank.org devolvió 403 a las herramientas. Solo se vio en el resumen de un buscador.

Verificados (fuente primaria): ABST 17 % (Act 13 de 2023, art. 2) y plazo de 15 días para la declaración (Act 1 de 2024); Social Security 7/9 % privado y 6/9 % público desde 2025 (tabla en imagen del comunicado del Board, leída a ojo) y techo de EC$6.500 al mes y 1.500 a la semana (FAQ del Board); Medical Benefits 3,5 % + 3,5 % y 2,5 % de 60 a 69 (Regulations 2011, reg. 17); sickness 60 % por hasta 26 semanas; maternity 60 % por 13 semanas, promedio con al menos 26 semanas; Labour Code (1,5x tras 8 h diarias o 48 semanales, feriado, 1 día de vacaciones por mes, 12 días de enfermedad, 1 día de indemnización por mes tras un año, preaviso igual al período de pago hasta 30 días, prueba de 3 meses); UBT (0 %, 8 %, 25 % por tramos, desplazados EC$42.000 por socio, recargo del mayor entre 5 % y EC$500).

## Hallazgos a tener en cuenta

- **No hay impuesto a la renta personal sobre sueldos.** No se cargó como dato porque la ley derogatoria no se leyó: la Personal Income Tax (Amendment) Act 2016 fija deducciones hasta el año 2016 y el presupuesto 2026 (ab.gov.ag) lista como impuestos directos solo Corporation Tax, UBT y Property Tax. Los textos lo dicen así y no afirman «abolido».
- La fecha de vigencia del ABST 17 % (1.1.2024) surge del anuncio del IRD del 22.12.2023, que no se pudo abrir. La ley se publicó en Gazette el 29.12.2023 y no trae fecha de entrada en vigor.
- El techo de Social Security sale de la FAQ del Board, que todavía cita las tasas de 2021 (desactualizada). El monto coincide en todas las guías de 2026, pero conviene confirmarlo.
- El Medical Benefits Scheme se tomó del reglamento de 2011 sin buscar reformas posteriores. El empleador paga solo por empleados menores de 60 según la reg. 17(1); para 60 a 69 la calculadora no muestra aporte patronal.
- UBT: el FAQ es de 2021 y no se encontró tabla posterior. Los tramos para 2 a 5 socios se verificaron contra el cuadro del FAQ (cada socio suma EC$42.000 a los dos límites).
- Labour Code leído en el texto consolidado Cap. 27 de laws.gov.ag. No se revisó si la Act 9 de 2019 u otra lo modificó en estos puntos.
- Sin calculadoras de property tax, stamp duty ni Education Levy publicables: property tax usa una tasa fijada cada año por orden, y stamp duty tiene varias enmiendas que no se pudieron conciliar con el presupuesto disponible.
- Sin series ni calculadora de inflación: no se pudo leer ninguna serie oficial (ECCB y Statistics Division no accesibles).

## Detectores

Dos de carril norma, sin prueba real contra la fuente en vivo (solo validados por forma en `check_paises`): `ag.sswb-posts` (API de WordPress de socialsecurity.gov.ag) y `ag.laws-revenue-acts` (listado anual de laws.gov.ag).

## Chequeos (2026-10-29)

- `tsc --noEmit`: sin errores.
- `check_paises ag`: 31 datos, 56 calculadoras, OK.
- `check_paises_casos ag`: 39 casos en 13 archivos, OK.
- `check_textos_paises ag`: 635 textos, 0 avisos.
- `check_seo_pais ag`: 2570 calculadoras locales revisadas, 0 avisos.
- `check_fronteras`: OK. `check_eol`: OK. `check_mundo`: OK (el neto de `ag` está en borrador, no entra a la comparación).
- `check_motor`: 1 falla («forint», preexistente en main), 4595 ok.
