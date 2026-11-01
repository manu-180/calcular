# Barbados (`bb`): informe del agente

- Rama: `claude/pais-bb` (base `origin/main`, con el avance parcial previo). Mercado `bb`, inglés (`en-BB`), BBD, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: **59 calculadoras** = 19 locales + 40 universales (`universales: "todas"`; la de IVA se cae sola porque hay `vat-calculator` local).

## Calculadoras locales (19; 17 publicadas, 2 en borrador)

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| salary-calculator | sueldo-neto (declara `mundo`) | sí | Policy Note BRA OGC 001/2026, tabla NISSS |
| income-tax-calculator | impuesto-renta | sí | Policy Note BRA OGC 001/2026 |
| nis-calculator | aportes-seguridad-social | sí | tabla de aportes de NISSS (clase R) |
| employer-cost-calculator | costo-empleador | sí | ídem |
| vat-calculator | iva | sí | página de tasas de la BRA |
| overtime-calculator | horas-extra | sí | Shops Act 2015-30 (folleto del Labour Department) |
| holiday-pay-calculator | vacaciones | sí | Holidays with Pay Act 2017-3 (hoja informativa) |
| notice-period-calculator | preaviso | sí | Employment Rights Act 2012-9, s. 22 (texto leído) |
| severance-pay-calculator | indemnizacion-despido | sí | Severance Payments Act Cap. 355A |
| maternity-benefit-calculator | propio | sí | NISSS y Maternity Leave Act Cap. 345A |
| sickness-benefit-calculator | propio | sí | NISSS |
| unemployment-benefit-calculator | propio | sí | NISSS |
| paternity-benefit-calculator | propio | sí | NISSS |
| nis-pension-calculator | jubilacion | sí | NISSS, base nueva (ejemplo oficial reproducido en casos) |
| land-tax-calculator | propio | sí | BRA, FAQ y comunicado de agosto 2026 |
| usd-to-bbd | tipo-de-cambio | sí | Banco Central (paridad 2 a 1, FXF 2 %) |
| inflation-calculator | inflacion | sí | Barbados Statistical Service, RPI (serie manual) |
| minimum-wage-calculator | salario-minimo | no, borrador | la Orden de junio 2025 es un borrador; el valor desde 2026-01-21 es solo un aviso de intención |
| property-transfer-tax-calculator | propio | no, borrador | la parte exenta con vivienda (150.000) no se pudo verificar en el texto de la ley |

## Datos

47 datos, 53 tramos verificados, 3 pendientes (`no-verificado`): salario mínimo por hora y por semana desde 2026-01-21 (aviso de intención, no orden publicada) y la exención del impuesto de transferencia de propiedad. Los casos de los dos borradores y de un caso de NIS 2025 fijan sus valores con `valores`.

## Chequeos (corridos)

tsc 0 errores; check_paises 1 país OK; check_paises_casos 76 casos en 19 archivos; check_textos_paises 1003 textos; check_seo_pais 2573 calculadoras locales; check_fronteras OK; check_eol OK; check_mundo OK. check_motor: 1 falla ajena a bb (formato del forint húngaro, 4595 ok).

## Riesgos

- Los detectores de `fuentes.ts` dependen de que las páginas de NISSS, BRA y el Ministerio de Trabajo mantengan sus textos.
- Pensión: solo base nueva; NISSS también usa base antigua y un promedio 50/50 en la transición.
- Indemnización: el salario semanal se limita al tope semanal de NIS, por la definición de basic pay de la ley.
- Maternidad: las semanas pagadas las ingresa la persona; el dato oficial leído da solo la tasa, la licencia mínima y la ayuda por hijo.
