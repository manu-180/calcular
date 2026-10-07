# Guatemala (gt): estado para retomar

Pausa pedida por el coordinador el 2026-10-07. Todavía no hay archivos en `src/paises/gt/`.
Todo lo de abajo se leyó el 2026-10-07 en la fuente indicada.

## Verificado en fuente primaria

| Dato | Valor | Fuente (https) |
|---|---|---|
| Salario mínimo 2026, AG 256-2025 (19/12/2025), vigente 2026-01-01 | CE1 agrícola 124.64 diario / 3,791.20 mensual; CE1 no agrícola 131.58 / 4,002.28; CE1 exportadora y maquila 112.10 / 3,409.73; CE2 agrícola 119.21 / 3,625.89; CE2 no agrícola 125.49 / 3,816.90; CE2 exportadora y maquila 105.90 / 3,221.10. CE1 = depto. de Guatemala, CE2 = resto. Art. 8 e: más bonificación incentivo (Decreto 78-89), sin monto | https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Acuerdo-Gubernativo-Numero-256-2025-Salario-Minino.pdf (PDF escaneado, leído como imagen) |
| Aguinaldo, Decreto 76-78 | 100 % del salario ordinario mensual por año o proporcional (art. 1); 50 % 1a quincena de diciembre y 50 % 2a quincena de enero, o 100 % en diciembre (art. 2); proporcional inmediato al terminar (art. 5); sexto a la indemnización (art. 9); 150 jornadas trabajadores de campo (art. 10); exento de impuestos y de cuotas IGSS, IRTRA, INTECAP (art. 15) | https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Ley-Reguladora-del-Aguinaldo-Decreto-76-78.pdf |
| Bono 14, Decreto 42-92 | 100 % del salario ordinario mensual por año ininterrumpido, proporcional si menos (art. 2); base: promedio del año que termina en junio (art. 2); pago 1a quincena de julio; proporcional desde el 1 de julio anterior (art. 3); sexto a la indemnización (art. 4); no cuenta para aguinaldo (art. 6) | https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Ley-de-Bonificacion-Anual-para-Trabajadores-del-Sector-Privado-y-Publico-Decreto-42-92.pdf |
| Código de Trabajo | art. 82: un mes de salario por año, proporcional, base promedio últimos 6 meses; art. 116: jornada diurna 8 h/48 sem, nocturna 6 h/36; art. 117: mixta 7 h/42; art. 121: horas extra al menos 50 % más; art. 122: tope 12 h diarias; art. 130: 15 días hábiles de vacaciones por año; art. 131: 150 días trabajados; art. 133: vacaciones compensables en dinero al cesar, proporcional; art. 134: salario de vacaciones = promedio del último año (3 meses si agrícola) | https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Codigo-de-Trabajo.pdf |
| ISR asalariados, Decreto 10-2012 (DCA 5/3/2012) | art. 70: exentos aguinaldo y Bono 14 hasta 100 % del salario mensual, e indemnización; art. 72 a: deducción Q48,000 sin comprobar + hasta Q12,000 por planilla de IVA; c: cuotas IGSS; art. 73: Q0.01 a Q300,000 5 %; más de Q300,000: Q15,000 + 7 % del excedente; art. 76: retención = proyección anual / 12 | https://www.congreso.gob.gt/assets/uploads/info_legislativo/decretos/2012/010-2012.pdf |
| Decreto 13-2026 (DCA 15/5/2026) | art. 4 transitorio: deducción extraordinaria Q3,024 para rentas del trabajo de 2026, sin comprobar, vigente 8 días tras publicación. Arts. 1 a 3 desde 2027-01-01: deducción = 12 salarios mínimos mensuales no agrícolas más bonificación incentivo (el más alto entre circunscripciones, vigente al 1 de enero); art. 72 Bis: actualización automática, SAT publica valores en 5 días hábiles | https://www.congreso.gob.gt/assets/uploads/info_legislativo/decretos/3bcf4-13-2026.pdf |
| IGSS IVS laboral | 1.83 % (patrono 3.67 %), Acuerdo 1124 JD art. 40 | https://www.igssgt.org/wp-content/uploads/2026/10/Acuerdo-1124-Junta-Directiva-IGSS-Rev-2021.pdf |
| Tipo de cambio de referencia Banguat | 2026-10-07: 7.64254; serie SOAP 20/09 a 07/10: 7.62938, 7.62559, 7.6288, 7.63357, 7.63682 (24 a 27/09), 7.63147, 7.63722, 7.63856, 7.64028, 7.64136 (02 a 04/10), 7.63456, 7.63715, 7.64254 | https://www.banguat.gob.gt/tipo_cambio/ (HTML GET) y https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx (SOAP POST, operación TipoCambioRango) |

## No verificado (motivo)

- Bonificación incentivo Q250 (Decreto 37-2001): congreso.gob.gt no tiene ruta pública conocida del PDF y la copia del Organismo Judicial (ww2.oj.gob.gt) rechaza conexión. Decreto 13-2026 y AG 256-2025 la nombran sin monto.
- IGSS EMA laboral 3 % (total 4.83 %): los reglamentos 410 (art. 62) y 1002 (art. 46) muestran 2 % y 2 % por programa; sus notas remiten a acuerdos de extensión (1095, 1121, 1243) que fijan la tasa combinada. No encontré el que da el 3 % combinado.
- IVA 12 % (Decreto 27-92 art. 10, reformado por 66-2002): portal SAT detrás de Cloudflare (no se debe saltear), copia del TSE da 403, Puerto Quetzal redirige. Candidata a probar: https://www.congreso.gob.gt/assets/uploads/info_legislativo/decretos/66-02.PDF (apareció en búsqueda).
- Período 1/12 a 30/11 del aguinaldo: no está en el Decreto 76-78.

## Detectores (decisión)

- Serie `gt.tipo-cambio`: el Http del cron solo hace GET y el .asmx con GET da "Runtime Error". Usar https://www.banguat.gob.gt/tipo_cambio/ : `<th>Tipo de Cambio de Referencia vigente para el  miércoles, 7 de octubre de 2026</th>` y `<td align="center">7.64254</td>`. Un punto por corrida. Banda propuesta min 7.0, max 8.5, salto 0.03.
- Norma salario mínimo: https://mintrabajo.gob.gt/acuerdos-gubernativos/ lista PDFs `Acuerdo-Gubernativo-...-Salario-Minimo-AAAA.pdf`; detectar enlaces con "Salario-Minimo" o "Salario-Minino" de un año mayor al cargado.

## Plan de calculadoras

| slug | concepto | estado previsto |
|---|---|---|
| bono-14 | decimo-cuarto | publicable |
| aguinaldo | bono-semestral | publicable |
| indemnizacion | liquidacion-final (indemnización art. 82 con sextos, vacaciones, aguinaldo y Bono 14 proporcionales) | publicable |
| salario-minimo | salario-minimo (regiones ce1, ce2; actividad por opción; dato mapa por región) | publicable |
| isr-asalariados | impuesto-renta (IGSS como campo que se copia del recibo, porque el 4.83 % no está verificado) | publicable |
| vacaciones | vacaciones | publicable |
| horas-extra | horas-extra | publicable (hora = mensual / 30 / horas de jornada: recalculado, anotarlo) |
| tipo-de-cambio | tipo-de-cambio | publicable |
| sueldo-liquido | sueldo-neto | borrador (falta EMA 3 %) |
| bonificacion-incentivo | propio | borrador (falta Q250) |
| iva | iva | borrador salvo que se verifique el 12 % |

Trato: usted (research). Locale es-GT, GTQ, America/Guatemala, regiones ce1 y ce2.

## Próximo paso exacto

1. Intentar 66-02.PDF del Congreso para el IVA.
2. Escribir `src/paises/gt/` completo copiando la forma de `src/paises/mx/`.
3. Script `scripts/paises/gt/probar_detectores.ts` (copiar el de mx) y correrlo.
4. Correr tsc y los cuatro checks de la receta; commit y push.
