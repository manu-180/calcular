# Uruguay: investigación de producto y datos legales

Fecha de corte: 6/10/2026. Verificaciones hechas el 6 y 7/10/2026 contra la fuente primaria salvo que diga lo contrario. «NO VERIFICADO» = no se pudo confirmar en fuente oficial en esta sesión; no usar en producción sin revisar.

## 1. Resumen

| Tema | Conclusión |
|---|---|
| Atractivo del mercado | 6/10. País chico (3,4 M hab.) pero de ingreso alto y con regulación rica en BPC/UI/franjas que obliga a calcular. Datos oficiales muy automatizables. Competencia real y ya automatizada (datosuruguay.com). |
| Diferencial posible | Cálculo correcto de incidencias (despido con aguinaldo, licencia y salario vacacional), IRPF mensual exacto con la escala DGI, laudos por grupo del Consejo de Salarios, planillas pagas para PyMEs y hogares con trabajo doméstico. |
| Fuentes automáticas | Excelentes: IMPO devuelve JSON de cualquier norma, BCU tiene web service SOAP de cotizaciones (UI incluida), INE publica XLS/XLSX estables de IPC, UI, URA. |
| Medio de pago | MercadoPago opera (mercadopago.com.uy responde 200, verif. 7/10). |

## 2. Valores clave vigentes

| Concepto | Valor | Vigencia | Base legal | Fuente oficial | Verif. |
|---|---|---|---|---|---|
| Salario Mínimo Nacional (SMN) | $ 25.383 mensual | 1/7/2026 a 31/12/2026 (enero a junio: $ 24.572) | Decreto 319/025 | https://www.impo.com.uy/bases/decretos/319-2025 | 6/10 |
| Jornal mínimo / hora mínima | SMN / 25 = $ 1.015,32 ; SMN / 200 = $ 126,92 | idem | Decreto 319/025 (divisores 25 y 200) | idem | 6/10 |
| Próximo ajuste SMN | 1/1/2027 | decreto de fin de año | | | estimado por patrón histórico |
| BPC | $ 6.864 | desde 1/1/2026, fija todo el año | Decreto 11/026 (ajuste 4,38% por IPC, Ley 17.856) | https://www.impo.com.uy/bases/decretos/11-2026 | 6/10 |
| BFC (base ficta de contribución) | $ 1.848 (deducido: 5 BFC = $ 9.240 en tabla BPS monotributo) | enero 2026 | | https://www.bps.gub.uy/bps/file/6668/23/monotributo-ley-18.083---2026.pdf | 6/10 (valor derivado) |
| UI (Unidad Indexada) | $ 6,6516 al 1/10/2026 | diaria | Ley 17.761 | BCU web service (ver sección 4) | 7/10 |
| URA (Unidad Reajustable de Alquileres) | $ 1.928,96 (agosto 2026) | mensual | Decreto-Ley 14.219 | INE XLS URA | 7/10 |
| UR | $ 1.922,68 (junio 2026, último decreto visto) | mensual, decreto con ~2 meses de atraso | Decreto 187/026 | https://impo.com.uy/bases/decretos/187-2026 | 7/10 |
| Coeficiente reajuste alquileres (CRA) | 1,0425 para alquileres que ajustan en julio 2026 | mensual | Decreto 187/026 art. 4 | idem | 7/10 |
| IPC setiembre 2026 | mensual 0,54% ; acumulado año 4,21% ; 12 meses 4,68% | publicado oct. 2026 | | INE XLSX IPC (sección 4) | 7/10 |
| Tasa plazo fijo en pesos, personas físicas (promedio sistema) | agosto 2026: <30 d 4,10% ; 30-60 d 4,51% ; 61-90 d 4,97% ; 91-180 d 5,03% ; 181-366 d 5,15% ; promedio familias 4,84% | mensual | | BCU tasas.xls, hoja «Pasivas $» | 7/10 (mapeo de columnas inferido de los encabezados) |

### Aportes a la seguridad social (BPS)

Tasas según tabla BPS (página de trabajo doméstico, actualizada 4/7/2025). Para Industria y Comercio las tasas de jubilación, FONASA y FRL son las mismas; BSE es exclusivo de doméstico.

| Aporte | Personal | Patronal | Fuente / Verif. |
|---|---|---|---|
| Jubilatorio (montepío) | 15% | 7,5% | BPS, 6/10 |
| FONASA | 3% base; variable 3% a 8% (ver abajo) | 5% (+ complemento cuota mutual en doméstico) | BPS, 6/10 |
| FRL | 0,10% | 0,10% | BPS, 6/10. Blogs dicen 0,125%: la Ley 19.689 solo autoriza subir hasta 0,125%; no se encontró decreto que lo aplique. NO VERIFICADO el 0,125% |
| FGCL (garantía créditos laborales) | 0 | 0,025% | BPS, 6/10 |
| BSE (solo doméstico) | 0 | 1,87% | BPS, 6/10 |

FONASA personal (umbral 2,5 BPC = $ 17.160 mensuales en 2026). Tasas listadas por BPS: 3%, 4,5%, 5%, 6%, 6,5%, 8%. Mapeo estándar (verificar con tabla BPS de Industria y Comercio antes de codear):

| Situación | Hasta 2,5 BPC | Más de 2,5 BPC |
|---|---|---|
| Sin hijos ni cónyuge | 3% | 4,5% |
| Con hijos | 3% | 6% |
| Con cónyuge a cargo | 5% | 6,5% |
| Con hijos y cónyuge | 5% | 8% |

### IRPF Categoría II (rentas de trabajo), escala mensual 2026

Fuente: Excel oficial DGI «IRPF categoría 2 escalas y alícuotas» (BPC $ 6.864): https://www.gub.uy/direccion-general-impositiva/politicas-y-gestion/irpf-categoria-2-escalas-alicuotas (verif. 6/10).

| Franja (BPC) | Desde $ | Hasta $ | Tasa |
|---|---|---|---|
| 0 a 7 | 0 | 48.048 | 0% |
| 7 a 10 | 48.048 | 68.640 | 10% |
| 10 a 15 | 68.640 | 102.960 | 15% |
| 15 a 30 | 102.960 | 205.920 | 24% |
| 30 a 50 | 205.920 | 343.200 | 25% |
| 50 a 75 | 343.200 | 514.800 | 27% |
| 75 a 115 | 514.800 | 789.360 | 31% |
| más de 115 | 789.360 | | 36% |

Deducciones: se aplica 14% sobre el total de deducciones si los ingresos nominales mensuales son hasta 15 BPC ($ 102.960); 8% si superan (Excel DGI). Deducibles: aportes personales (jubilatorio, FONASA, FRL), Fondo de Solidaridad, y por hijo menor a cargo 20 BPC anuales ($ 11.440 mensuales), duplicado para hijo con discapacidad (Decreto 148/007, verificado en IMPO JSON 7/10).

Fórmula: IRPF mensual = impuesto por franjas sobre (nominal + incremento ficto del 6% cuando el nominal supera 10 BPC: regla conocida, NO VERIFICADO en fuente hoy) menos (deducciones × 14% u 8%). Si el resultado es negativo, 0.

### Régimen simplificado

| Concepto | Valor 2026 | Fuente | Verif. |
|---|---|---|---|
| Monotributo BPS (Ley 18.083): unipersonal sin dependientes, sin SNIS | $ 2.637 (jubilatorio+FRL $ 2.088 + seguro enfermedad $ 549) | BPS PDF «monotributo ley 18.083 2026» | 6/10 |
| Monotributo con SNIS | $ 6.327 (sin cónyuge, sin hijos) a $ 7.888 (con cónyuge e hijos) | idem | 6/10 |
| Gradualidad (altas desde 2021) | 25% jubilatorio primeros 12 meses, 50% meses 13 a 24, 100% desde mes 25 | fuentes secundarias | NO VERIFICADO en BPS |
| Tope ingresos monotributo unipersonal | 183.000 UI anuales (60% del literal E) | documentos BPS (resultados de búsqueda) | parcialmente verificado |
| Literal E (IVA pequeña empresa): tope | 305.000 UI anuales | Decreto 310/025 refiere al límite | 6/10 |
| Literal E: cuota fija mensual | $ 5.910 (escalones por múltiplos del límite: $ 6.840 a $ 19.240) | Decreto 310/025, https://www.impo.com.uy/bases/decretos/310-2025 | 6/10. Un blog dice $ 5.660: es incorrecto |
| Monotributo Social MIDES | | | NO VERIFICADO |

### Derechos laborales

| Instituto | Regla | Base legal | Fuente | Verif. |
|---|---|---|---|---|
| Aguinaldo (SAC) | 1/12 del total de salarios en dinero de los 12 meses previos al 1/12. Se paga en dos cuotas (dic-may en junio, jun-nov en diciembre); la fecha la fija cada año un decreto. Proporcional al egreso salvo notoria mala conducta | Ley 12.840; Decreto-Ley 14.525 | https://www.gub.uy/ministerio-trabajo-seguridad-social/politicas-y-gestion/derecho-reglamentacion-laboral/derecho-laboral-uruguayo/sueldo-anual-complementario-aguinaldo | 6/10 |
| Licencia anual | 20 días; +1 día al cumplir 5 años y luego +1 cada 4 años, sin tope. Mensual: 1/30 del sueldo por día. Al egreso se paga la proporcional sin descuentos | Ley 12.590, Ley 13.556, Decreto-Ley 14.328 | MTSS, régimen de licencia | 6/10 |
| Salario vacacional | Mínimo 100% del jornal líquido de licencia, antes de gozarla y proporcional a los días | Ley 16.101 arts. 4 y 5 | https://www.impo.com.uy/bases/leyes/16101-1989 | 6/10 |
| Indemnización por despido, mensuales | 1 mes de remuneración total por año o fracción, tope 6 meses. Sin aportes. Lo que exceda el mínimo legal paga IRPF | Leyes 10.489, 10.542, 10.570, 12.597 | https://www.gub.uy/ministerio-trabajo-seguridad-social/politicas-y-gestion/derecho-reglamentacion-laboral/derecho-laboral-uruguayo/despido-regimen-comun | 6/10 |
| Indemnización, jornaleros | 25 jornales por año con 240 jornales trabajados; si no, 2 por cada 25 trabajados; tope 150 jornales; sin derecho si < 100 jornales | idem | idem | 6/10 |
| Despido doméstico | Derecho desde 90 días corridos | Ley 18.065 | MTSS despido | 6/10 |
| Incidencias en la base de despido (aguinaldo, licencia, salario vacacional) | La práctica y los competidores las suman; la ley dice «remuneración total» | Ley 10.570 | | NO VERIFICADO el criterio exacto (es jurisprudencial) |
| Preaviso | La página MTSS de despido común no lo menciona. Un competidor muestra «preaviso hasta 3 meses» | | | NO VERIFICADO: confirmar que no existe en régimen común antes de publicar |
| Horas extras | 100% de recargo en días hábiles; 150% en feriados y descanso. Máximo 8 h semanales | Ley 15.996, Decreto 550/989 | https://www.gub.uy/ministerio-trabajo-seguridad-social/politicas-y-gestion/derecho-reglamentacion-laboral/derecho-laboral-uruguayo/horas-extras | 6/10 |
| Valor hora del mensual | Divisor según sector (200 en industria por SMN; comercio usa 30 días × 8 h en la práctica) | | | NO VERIFICADO por sector |
| Trabajo doméstico: mínimos desde 1/7/2026 | Mensual 44 h: General $ 32.051, Cocina $ 33.796, Cuidados $ 34.885. Hora: $ 169 / $ 178 / $ 184 | Actas Consejo de Salarios 5/12/2025 y 6/7/2026 | BPS Comunicado R 14/2026 | 7/10 |
| Trabajo doméstico: aumento julio 2026 | Mensuales: hasta $ 37.223: 2,8%; $ 37.224 a $ 157.902: 1,9%; más: 1,7%. Jornaleros por valor hora: hasta $ 196: 2,8%; $ 197 a $ 831: 1,9%; más: 1,7% | idem | idem | 7/10 |
| Seguro de desempleo (paro) | Mensuales: % decreciente del promedio de 6 meses durante 6 meses; jornaleros en jornales | Ley 18.399 | BPS (PDF no legible) | NO VERIFICADO valores |
| Licencia maternidad / paternidad | 14 semanas maternidad; paternidad días según Ley 19.161 | Ley 19.161 | | NO VERIFICADO |
| Consejos de Salarios (11ª ronda) | Franjas y porcentajes por grupo | | | NO VERIFICADO: requiere bajar los laudos por grupo de MTSS |

## 3. Calculadoras priorizadas por demanda

Demanda estimada con: autocompletado de Google (suggestqueries, gl=uy, 7/10/2026), competidores que rankean y lo que ya tiene datosuruguay.com. No hay volúmenes de Keyword Planner publicados: el orden es ESTIMACIÓN.

Señales de autocompletado relevantes: «calcular mi jubilación», «calcular descuento sueldo», «calcular egreso», «calcular liquidación por egreso», «calcular días de licencia», «calcular precio sin iva», «calculadora alquiler ipc», «calculadora de ipc», «cuánto me corresponde de licencia / liquidación si renuncio / seguro de desempleo / aguinaldo / despido», «irpf 2026 calculadora», «sueldo líquido uruguay calculadora», «salario vacacional cómo se calcula jornalero», «monotributo uruguay costo», «ui hoy».

| # | Calculadora (nombre local) | Base legal | Fórmula | Fuente de datos | Estado |
|---|---|---|---|---|---|
| 1 | Sueldo líquido (nominal a líquido) | Aportes BPS + IRPF Ley 18.083 | nominal − 15% − FONASA − 0,1% FRL − IRPF | BPC (decreto anual), escala DGI | Verificado |
| 2 | Liquidación por egreso (despido o renuncia) | Leyes 12.840, 12.590, 16.101, 10.489/12.597 | aguinaldo prop. + licencia no gozada + salario vacacional + (despido si corresponde) | SMN, BPC | Verificado salvo incidencias |
| 3 | Aguinaldo (junio/diciembre) | Ley 12.840 | suma de nominales del semestre / 12 ; IRPF aparte | | Verificado |
| 4 | Indemnización por despido (mensual y jornalero) | Ley 10.489 y modif. | mensual × años (tope 6); jornales | | Verificado |
| 5 | IRPF mensual y anual | Ley 18.083, Decreto 148/007 | escala por franjas menos deducciones al 14% u 8% | Excel DGI anual | Verificado |
| 6 | Licencia y salario vacacional | Leyes 12.590, 16.101 | días por antigüedad; jornal líquido × días | | Verificado |
| 7 | Alquiler (ajuste por IPC / CRA / URA) | Decreto-Ley 14.219 | alquiler × CRA del mes | INE IPC + decreto mensual IMPO | Verificado |
| 8 | Jubilación BPS (estimador) | Ley 20.130 (reforma 2023) | complejo: sueldo básico jubilatorio × tasa de reemplazo | BPS | NO VERIFICADO: alta demanda («calcular mi jubilación» es la 1ª sugerencia), alta complejidad |
| 9 | Trabajo doméstico (sueldo, aportes, despido) | Ley 18.065, Grupo 21 | mínimos por categoría + aportes BPS incluido BSE 1,87% | BPS comunicados semestrales | Verificado |
| 10 | Seguro de desempleo | Ley 18.399 | % decreciente sobre promedio de 6 meses | BPS | NO VERIFICADO |
| 11 | Monotributo y Literal E (costo mensual) | Ley 18.083, Decreto 310/025 | tabla fija | BPS PDF enero, decreto DGI | Verificado |
| 12 | Horas extras | Ley 15.996 | valor hora × 2 (hábil) o × 2,5 (feriado/descanso) | | Verificado (divisor por sector NO VERIFICADO) |
| 13 | Conversor UI/UR/BPC a pesos | | | BCU WS, INE | Verificado |
| 14 | Inflación (IPC) y actualización de montos | | índice final / índice inicial | INE XLSX | Verificado |
| 15 | Plazo fijo (tasas promedio del sistema) | | capital × tasa × días/365 | BCU tasas.xls | Verificado |
| 16 | Precio sin IVA / con IVA (22% básica, 10% mínima) | Título 10 TO | | | NO VERIFICADO en fuente hoy |

## 4. Fuentes automatizables (probadas)

| Dato | URL exacta | Formato | Frecuencia | Prueba |
|---|---|---|---|---|
| Cualquier ley o decreto (SMN, BPC, UR/URA/CRA, Literal E) | `https://www.impo.com.uy/bases/decretos/{nro}-{año}?json=true` (también `/leyes/...`) | JSON (latin-1) con `nombreNorma`, `fechaPromulgacion`, `fechaPublicacion`, `articulos[].textoArticulo` | al publicarse | OK 7/10 (decretos 11-2026 y 187-2026 parseados) |
| Diario Oficial (para descubrir decretos nuevos) | `https://www.impo.com.uy/diariooficial/{aaaa}/{mm}/{dd}/documentos.pdf` | PDF | diaria | URL vista en resultados, no probada |
| UI, dólar y otras cotizaciones | `https://cotizaciones.bcu.gub.uy/wscotizaciones/servlet/awsbcucotizaciones` (SOAP, namespace `Cotiza`, moneda 9800 = UI, 2225 = dólar billete) | XML | diaria | OK 7/10: UI 1/10/2026 = 6,6516; dólar 6/10/2026 = 40,166 |
| IPC (serie completa con variaciones) | `https://www5.ine.gub.uy/documents/Estadísticaseconómicas/SERIES%20Y%20OTROS/IPC/Base%20Octubre%202022=100/IPC%20gral%20y%20variaciones_base%202022.xlsx` | XLSX | mensual (primeros días del mes) | OK 7/10 (último dato set. 2026) |
| IPC informe mensual | `https://www5.ine.gub.uy/documents/Estad%C3%ADsticasecon%C3%B3micas/HTML/IPC/2026/IPC%20Setiembre%202026.html` | HTML | mensual | OK 7/10 |
| UI serie diaria | `https://www5.ine.gub.uy/documents/Estad%C3%ADsticasecon%C3%B3micas/SERIES%20Y%20OTROS/UI/Unidad%20Indexada.xls` | XLS | mensual (publica valores por adelantado hasta inicios del mes siguiente) | OK 7/10 |
| Unidad Previsional | `https://www5.ine.gub.uy/documents/Estad%C3%ADsticasecon%C3%B3micas/SERIES%20Y%20OTROS/UP/Unidad%20Previsional%20-%20UP.xls` | XLS | mensual | OK 7/10 (HTTP 200) |
| URA | `https://www5.ine.gub.uy/documents/Estad%C3%ADsticasecon%C3%B3micas/SERIES%20Y%20OTROS/UR/Unidad%20Reajustable%20de%20Alquileres.xls` | XLS | mensual | OK 7/10 |
| Índice Medio de Salarios | `https://www5.ine.gub.uy/documents/Estad%C3%ADsticasecon%C3%B3micas/SERIES%20Y%20OTROS/IMS/Base%20Julio%202008=100/IMSN%20M%20B08.xls` | XLS | mensual | link visto, no descargado |
| Tasas activas y pasivas | `https://www.bcu.gub.uy/Servicios-Financieros-SSF/Series%20IF/tasas.xls` (hojas «Pasivas $», «Pasivas UI», «Pasivas U$S») | XLS | mensual (último: ago. 2026) | OK 7/10 |
| Escala IRPF | `https://www.gub.uy/direccion-general-impositiva/sites/direccion-general-impositiva/files/2026-02/IRPF%20categor%C3%ADa%202%20escalas%20y%20al%C3%ADcuotas.xlsx` | XLSX | anual (la ruta cambia cada año: scrapear la página padre) | OK 6/10 |
| Monotributo | `https://www.bps.gub.uy/bps/file/6668/23/monotributo-ley-18.083---2026.pdf` | PDF | semestral/anual | OK 6/10 |
| Trabajo doméstico | BPS comunicados (ej. `https://www.bps.gub.uy/bps/file/24374/2/2026---comunicado-r-14---trabajo-domestico-aumento-salarial-julio-2026.pdf`) | PDF | enero y julio | OK 7/10 (la variante sin «r» da 404 a veces) |

Cron sugerido: diario BCU (UI); mensual INE (IPC, UI, URA) día 3 a 10; IMPO JSON para detectar decretos «FIJACION DE UR, URA, IPC, CRA», «SALARIO MINIMO NACIONAL», «BASE DE PRESTACIONES»; BPS PDFs en enero y julio con revisión humana (PDF, no API).

## 5. Idioma y tono

| Tema | Recomendación |
|---|---|
| Tratamiento | Voseo rioplatense en el copy («calculá», «tenés»), igual que Argentina. Organismos (DGI, BPS) usan usted en lo formal. ESTIMACIÓN por uso común |
| Vocabulario | sueldo nominal / sueldo líquido; recibo de sueldo; liquidación por egreso; despido; licencia (no «vacaciones» para el derecho); salario vacacional; aguinaldo; montepío (aporte jubilatorio); mensual / jornalero; laudo (mínimo por categoría); Consejo de Salarios; unipersonal; monotributo; e-ticket / e-factura; seguro de paro |
| Moneda | Pesos uruguayos: «$» (o «$U»); dólares «U$S». Punto de miles y coma decimal: $ 25.383 ; $ 126,92 |
| Unidades | BPC, UI, UR, URA, BFC son de uso diario: mostrar siempre el equivalente en pesos con fecha |

## 6. Competencia (búsquedas hechas el 6 y 7/10/2026, buscador US: el orden real en Google.com.uy puede variar)

| Búsqueda | Quién aparece | Calidad / oportunidad |
|---|---|---|
| calcular sueldo líquido | datosuruguay.com, yo-facturo.com, hacecuentas.com/uy | datosuruguay es fuerte: 15+ calculadoras, 50+ indicadores, «actualizado diariamente» con BCU/INE/BPS, gratis, sin publicidad, pide donaciones por MercadoPago |
| calcular aguinaldo | datosuruguay, hacecuentas, yo-facturo, toptrabajos, bloomberglinea | Herramientas simples; oportunidad en aguinaldo con IRPF y con variables (horas extra, comisiones) |
| calculadora despido / liquidación | datosuruguay, toptrabajos, finiquitojusto, hacecuentas | Al menos uno suma «preaviso hasta 3 meses», dudoso en régimen común: oportunidad de precisión |
| IRPF calculadora | DGI (simulador Excel), datosuruguay, cuantomecuesta, yo-facturo | DGI solo da Excel: oportunidad de web instantánea |
| monotributo | yo-facturo, datosuruguay, hacecuentas | |
| alquiler ipc / UI hoy | datosuruguay, hacecuentas, INE/BCU | Commodity; ganar con velocidad y fuente visible |
| calcular jubilación | BPS (simulador propio, NO VERIFICADO) | Alta demanda, pocas herramientas buenas: oportunidad |

Conclusión: el nicho no está vacío. datosuruguay.com ya hizo lo que propone calcular.ar (automatización desde fuentes oficiales) y es gratuito. Para ganar hace falta profundidad (incidencias, casos jornalero/doméstico, IRPF exacto) y productos pagos que ellos no tienen.

## 7. Productos pagos posibles

| Producto | Público | Por qué |
|---|---|---|
| Planilla de trabajo doméstico (recibos mensuales, aportes BPS con BSE, aguinaldo, licencia, salario vacacional, despido) | ~100.000 hogares empleadores (cifra de Presidencia sobre el acuerdo del sector, NO VERIFICADO el número) | Dos ajustes por año y tres categorías nuevas desde julio 2026: alta confusión |
| Planilla de liquidación de sueldos para PyME (BPS, FONASA, IRPF, laudos por grupo) | unipersonales y PyMEs sin contador interno | IRPF por franjas + deducciones es lo que más errores genera |
| Informe de liquidación por egreso con fundamento legal (PDF) | trabajadores que negocian un despido | Equivalente al informe pago argentino |
| Planilla de alquileres (CRA mensual, URA, garantías) | propietarios | CRA cambia todos los meses |

Medios de pago: MercadoPago (disponible). Alternativas locales: dLocal, Handy, redes de cobranza Abitab/RedPagos (NO VERIFICADO integración).

## 8. Calendario de picos

| Mes | Evento | Calculadoras |
|---|---|---|
| Enero | Nuevo SMN, nueva BPC (decreto), ajustes de Consejos de Salarios, doméstico | sueldo líquido, IRPF, doméstico |
| Diciembre a febrero | Licencia de verano | licencia, salario vacacional |
| Mayo a julio | Declaración jurada anual IRPF/IASS (fechas DGI, NO VERIFICADO) | IRPF anual, devolución |
| Junio | 1ª cuota de aguinaldo | aguinaldo |
| Julio | 2º tramo SMN, ajustes de Consejos de Salarios y doméstico | sueldo, doméstico |
| Diciembre | 2ª cuota de aguinaldo | aguinaldo |
| Todo el año, mensual | IPC, CRA de alquileres, UI | alquiler, inflación, UI |
