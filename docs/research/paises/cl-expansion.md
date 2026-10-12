# Chile: expansión de calculadoras (12/10/2026)

De 14 a 38 calculadoras publicadas en `src/paises/cl`. Todo dato que usan está leído en fuente
primaria el 12/10/2026 (o antes, por la sesión que armó las 14 primeras).

## Cómo se ordenó la demanda

Sin Keyword Planner. Señales usadas: catálogos de la competencia chilena (monedario.cl con 22
calculadoras, finclaro.cl con 45, hacecuentas.com con su sección `/cl`), búsquedas «calculadora de X
Chile 2026» en WebSearch (motor de EE. UU., no el SERP de google.cl) y calendario legal (aguinaldos,
reajustes, Operación Renta). El orden es estimado: validarlo con Search Console cuando haya tráfico.

## Calculadoras nuevas (24)

| # | Slug | Concepto | Norma | Fuente primaria | Estado |
|---|---|---|---|---|---|
| 1 | indemnizacion-por-anos-de-servicio | indemnizacion-despido | CT arts. 163 y 172 | BCN, Código del Trabajo (versión 23/07/2026) | publicada |
| 2 | aviso-previo | preaviso | CT art. 162 | BCN, Código del Trabajo | publicada |
| 3 | sueldo-bruto | propio | DL 3.500, LIR art. 43 | mismos datos que sueldo líquido (SP, SII) | publicada |
| 4 | cotizaciones-previsionales | aportes-seguridad-social | DL 3.500, Ley 19.728, Ley 21.735, Ley 16.744 | SP, BCN | publicada |
| 5 | licencia-medica | propio | DFL 44 de 1978, arts. 7, 8, 14, 16 y 17 | BCN idNorma 4252 | publicada |
| 6 | seguro-de-cesantia | propio | Ley 19.728 art. 25 | Diario Oficial, Res. ex. 383 SP (17/03/2026) | publicada |
| 7 | pension-de-alimentos | pension-alimentos | Ley 14.908 arts. 3 y 7 | BCN, DFL 1 de 2000 Justicia (idNorma 172986) | publicada |
| 8 | asignacion-familiar | propio | Ley 18.987 / Ley 21.830 arts. 4 y 5 | Diario Oficial, Ley 21.830 | publicada |
| 9 | pgu | propio | Ley 21.419 art. 12, Ley 21.735 | ChileAtiende fichas 102077 y 130457; BCN | publicada |
| 10 | prenatal-y-postnatal | propio | CT arts. 195, 196, 197 bis | BCN, Código del Trabajo | publicada |
| 11 | feriado-progresivo | propio | CT art. 68 | BCN, Código del Trabajo | publicada |
| 12 | dias-de-vacaciones | propio | CT arts. 67, 69, 70 | BCN, Código del Trabajo | publicada (festivos no incluidos, se avisa) |
| 13 | ley-40-horas | propio | Ley 21.561, CT art. 28 | BCN | publicada |
| 14 | semana-corrida | propio | CT art. 45 | BCN, Código del Trabajo | publicada |
| 15 | sueldo-proporcional | propio | práctica de liquidación (mes de 30 días) | sin dato normativo | publicada |
| 16 | reforma-de-pensiones | propio | Ley 21.735, art. cuarto transitorio | BCN idNorma 1212060; SP | publicada |
| 17 | impuesto-global-complementario | propio | LIR art. 52 | BCN idNorma 6368 | publicada (estimación, aviso de cautela) |
| 18 | aguinaldo-pensionados | propio | Ley 21.806 art. 5 | Diario Oficial (05/02/2026) | publicada hasta el 31/12/2026 |
| 19 | tope-imponible | propio | topes SP 2026, CT art. 172 | SP | publicada |
| 20 | uf-por-fecha | propio | UF diaria | SII uf2026.htm (serie) | publicada |
| 21 | reajuste-de-arriendo | propio | IPC INE | SII (IPC base 2023) | publicada |
| 22 | credito-hipotecario | propio | cálculo financiero en UF | SII (UF) | publicada |
| 23 | deposito-a-plazo | plazo-fijo | cálculo financiero | sin dato normativo | publicada |
| 24 | plan-isapre | propio | cotización legal 7 % | Superintendencia de Salud, SP | publicada |

## Investigadas y no construidas

| Calculadora | Por qué no |
|---|---|
| Dólar observado (tipo-de-cambio) | La página del SII (`dolar2026.htm`) tenía solo hasta el 1/10 al 12/10; BCCh y CMF piden credenciales; mindicador respondía 502. Sin fuente diaria confiable la serie quedaría vieja. |
| Impuesto a la herencia | El XML de BCN de la Ley 16.271 vino en versión de 1998 y el SII menciona cambios de 2020 en la exención: no se pudo leer el texto vigente. |
| Crédito de consumo con impuesto de timbres | No se ubicó el DL 3.475 vigente en BCN (el idLey devolvió otra norma). |
| Bono por hijo | Necesita el ingreso mínimo histórico del mes de nacimiento y la rentabilidad del Fondo C: sin serie oficial cargada. |
| Aguinaldo del sector público | Fiestas Patrias 2026 ya pasó; Navidad 2026 la fija la ley de reajuste de diciembre de 2026. |
| Contribuciones (impuesto territorial) | Tasas y sobretasas por avalúo con reglas de exención complejas; queda para otra tanda. |
| Pensión AFP proyectada | Depende de supuestos de rentabilidad y tablas de mortalidad; riesgo de engañar. |
| Días hábiles con festivos | No hay lista oficial de festivos legible (gob.cl respondió 403). |

## Datos nuevos en `datos.json`

- Código del Trabajo: aviso previo (30 días), feriado progresivo (10, 3 y 10 años), prenatal 42 días,
  postnatal 84 / 126 / +7 por bebé, parental 84 / 126, jornada diaria máxima 10 h, 5 a 6 días.
- Ley 21.830: asignación familiar por tramos (escala) y subsidio familiar, desde el 1/5/2026.
- Ley 14.908: mínimos 40 % y 30 % del ingreso mínimo, máximo 50 % de las rentas.
- Res. ex. 383 SP: porcentajes, máximos y mínimos del Fondo de Cesantía Solidario (6/3/2026 a 28/2/2027).
- PGU: monto máximo por edad, pensión inferior y superior (ChileAtiende).
- Ley 21.806: aguinaldos 2026 de pensionados.
- LIR art. 52: escala anual del global complementario en UTA.
- Ley 21.735: cronograma de la cotización del empleador. Verificado hasta julio de 2029; desde agosto
  de 2029 queda no verificado porque la tasa depende de una evaluación externa (art. cuarto transitorio).
- DFL 44: carencia de 3 días, licencias de más de 10 días y subsidio mínimo de 50 % del ingreso mínimo.

## Detectores nuevos (probados contra la red el 12/10/2026)

| Detector | Resultado |
|---|---|
| cl.sp-resoluciones-cesantia (SP, resoluciones del seguro de cesantía) | 9 hallazgos parseados, todos anteriores a la verificación: sin novedad |
| cl.pgu-chileatiende (ficha PGU) | 0 hallazgos: los montos cargados siguen en la ficha |
| cl.bcn-normas (ampliado a los datos nuevos) | 3 hallazgos, anteriores a la verificación |

## Trampas encontradas

- El XML de BCN de la Ley 19.728 trae `fechaVersion` 2027-04-01: hay un cambio legal futuro del seguro
  de cesantía. Revisar antes de cargar los montos de marzo de 2027.
- El caso 2 del finiquito tenía fecha 15/10/2026 con UF publicada solo hasta el 9/10: al llegar la UF del
  15 el resultado cambiaba y la puerta del cron quedaba en rojo. Se pasó al 9/10.
- `avisos.json` decía que la cotización del empleador llega a 7 %; la ley dice 8,5 %.
