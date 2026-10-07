# Perú: investigación para replicar calcular.ar

Fecha de corte: 6 de octubre de 2026 (verificaciones hechas el 6 y 7 de octubre de 2026).
Convención: cada dato lleva valor, vigencia, fuente y estado. «Primaria» = leído en el organismo emisor (El Peruano, SUNAT, SBS, BCRP). «Secundaria» = confirmado en portales o medios sin poder abrir el texto oficial en esta sesión. «NO VERIFICADO» = no se pudo confirmar.

Nota de acceso: `gob.pe` y `personas.sunat.gob.pe` devuelven 403/418 a lectores automáticos; con user-agent de navegador `gob.pe` responde 200 pero `emprender.sunat.gob.pe` siguió en 403. Los PDF de legislación de `sunat.gob.pe/legislacion/` y la página de la SBS sí se leyeron.

## 0. Hechos que cambian el diseño del producto

| Hecho | Por qué importa | Fuente | Estado |
|---|---|---|---|
| **La RMV subió a S/ 1,230.00 el 1/10/2026** (DS 015-2026-TR, publicado 28/09/2026). Segundo tramo: +S/ 70 hasta **S/ 1,300.00**, por un DS a emitirse **en el primer semestre de 2027**. | Todo lo atado a la RMV cambió hace 6 días: asignación familiar S/ 123, aporte mínimo EsSalud S/ 110.70, nocturno S/ 1,660.50, CTS de noviembre y gratificación de diciembre. Hay que parametrizar la RMV por fecha y dejar listo el tramo 2027. | [El Peruano, DS 015-2026-TR](https://busquedas.elperuano.pe/dispositivo/EX/2559163-1); [El Peruano nota](https://elperuano.pe/noticia/305879-desde-hoy-rige-la-nueva-rmv-sueldo-minimo-sube-a-s-1230-y-cambia-otros-conceptos-laborales) | Primaria (DS) + diario oficial (conceptos derivados), 7/10/2026 |
| **CTS de libre disposición al 100% hasta el 31/12/2026** (Ley 32322, publicada 9/05/2025). Desde 2027 vuelve el régimen restrictivo. | La calculadora de CTS debe decir cuánto se puede retirar hoy y qué cambia en enero 2027. | [Infobae 1/04/2026](https://www.infobae.com/peru/2026/04/01/cts-en-peru-en-2026-trabajadores-podran-retirar-hasta-el-100-de-sus-fondos/), [Forbes Perú](https://forbes.pe/economia-y-finanzas/2025-05-09/es-oficial-ejecutivo-autorizo-el-retiro-de-cts-hasta-2026/) | Secundaria. **Discrepancia**: el resumen de Forbes menciona tope del 50% para uso libre; Infobae y El Comercio dicen 100%. Texto de la ley: NO VERIFICADO |
| **Remuneración máxima asegurable (AFP) para devengue octubre 2026: S/ 12,732.70** (un portal todavía muestra S/ 12,672.65, que era el trimestre anterior). | Se actualiza cada trimestre: necesita cron, no un número fijo. | [SBS, comisiones y primas](https://www.sbs.gob.pe/app/spp/empleadores/comisiones_spp/Paginas/comision_prima.aspx) | Primaria, 7/10/2026 |
| Inflación Lima (12 meses) **4.44% a agosto 2026**, subiendo desde 1.70% en enero. | Calculadora de inflación/actualización tiene demanda creciente. | API BCRP serie PN01273PM | Primaria (API) |
| Competidores ya instalados con el mismo modelo: **sueldojusto.pe** (8 calculadoras laborales + blog "CTS noviembre 2026" y "gratificación diciembre 2026" + plantillas gratis) y **hacecuentas.com/pe** (argentino, multi-país). | Hay que entrar con exactitud y velocidad de actualización (RMV nueva), no con "existir". | Sitios cargados el 7/10/2026 (HTTP 200) | Primaria (sitios) |

## 1. Valores base vigentes

| Parámetro | Valor | Vigencia | Base legal | Fuente oficial | Estado |
|---|---|---|---|---|---|
| RMV | S/ 1,230.00 (antes S/ 1,130.00) | desde 1/10/2026; S/ 1,300.00 en el 1er semestre 2027 (DS pendiente) | DS 015-2026-TR | [El Peruano](https://busquedas.elperuano.pe/dispositivo/EX/2559163-1) | Primaria, 7/10/2026 |
| UIT | S/ 5,500.00 (2025: S/ 5,350) | 1/01/2026 a 31/12/2026 | DS 301-2025-EF (publicado 17/12/2025) | [El Peruano](https://busquedas.elperuano.pe/dispositivo/NL/2469116-1) | Primaria, 7/10/2026 |
| Asignación familiar | S/ 123.00 (10% RMV; antes S/ 113) | desde 1/10/2026 | Ley 25129 | [El Peruano nota](https://elperuano.pe/noticia/305879-desde-hoy-rige-la-nueva-rmv-sueldo-minimo-sube-a-s-1230-y-cambia-otros-conceptos-laborales) | Diario oficial (nota) |
| Aporte mínimo EsSalud | S/ 110.70 (9% × RMV) | desde 1/10/2026 | Ley 26790 | idem | Diario oficial (nota) |
| AFP: aporte obligatorio | 10.00% | octubre 2026 | TUO Ley SPP | [SBS](https://www.sbs.gob.pe/app/spp/empleadores/comisiones_spp/Paginas/comision_prima.aspx) | Primaria |
| AFP: prima de seguro | 1.37% (las 4 AFP), hasta la RMA | octubre 2026 | idem | idem | Primaria |
| AFP: comisión sobre flujo | Habitat 1.47%, Integra 1.55%, Prima 1.60%, Profuturo 1.69% | octubre 2026 | idem | idem | Primaria |
| AFP: comisión anual sobre saldo (mixta) | Habitat 1.25%, Integra 0.78%, Prima 1.25%, Profuturo 0.68% (componente de flujo de la mixta = 0% desde feb 2023) | octubre 2026 | idem | idem | Primaria |
| RMA (remuneración máxima asegurable) | S/ 12,732.70 | devengue octubre 2026 | Compendio SPP, art. 67 | idem | Primaria |
| ONP | 13% | permanente | DL 19990 | NO VERIFICADO primario esta sesión | Secundaria (conocido) |
| EsSalud (empleador) | 9% | permanente | Ley 26790 | NO VERIFICADO primario | Secundaria |
| Tasa de referencia BCRP | 4.25% | sin cambios enero a septiembre 2026 | BCRP | API BCRP PD04722MM | Primaria (API) |
| Tipo de cambio SUNAT | compra 3.423 / venta 3.435 | 6/10/2026 | SUNAT | `https://www.sunat.gob.pe/a/txt/tipoCambio.txt` | Primaria (endpoint) |
| Tipo de cambio SBS venta | 3.435 | 5/10/2026 | SBS/BCRP | API BCRP PD04640PD | Primaria (API) |
| IPC Lima, var. 12 meses | 4.44% (ago 2026); 4.07% (jul); 4.01% (jun) | mensual (INEI, 1er día del mes siguiente) | INEI | API BCRP PN01273PM | Primaria (API) |

Derivados (cálculo propio con UIT 2026): 7 UIT = S/ 38,500; 3 UIT = S/ 16,500; 24 UIT = S/ 132,000; tramos de renta de trabajo 5 / 20 / 35 / 45 UIT = S/ 27,500 / 110,000 / 192,500 / 247,500; RMT 15 UIT = S/ 82,500; 300 UIT = S/ 1,650,000.

## 2. Mapa de calculadoras (ordenado por demanda estimada)

**De dónde sale el orden:** sin Keyword Planner ni Ahrefs en esta sesión. Estimación propia por (a) universalidad en planilla, (b) picos legales (en Perú hay 4 picos laborales al año: CTS x2 y gratificación x2), (c) densidad de páginas dedicadas de la competencia (sueldojusto.pe, hacecuentas.com/pe, Buk, Misha, Infobae, El Comercio) observada el 6-7/10/2026. **Validar con Keyword Planner** (cuenta 4869983637, geo Perú).

| # | Calculadora (nombre local) | Base legal | Fórmula | Valores vigentes | Próxima actualización | Fuente primaria | Estado |
|---|---|---|---|---|---|---|---|
| 1 | **Gratificación (julio y diciembre) + bonificación extraordinaria** | Ley 27735 y reglamento DS 005-2002-TR; Ley 30334 (bonificación extraordinaria) | Gratificación = remuneración computable × meses completos del semestre / 6 (ene-jun para julio, jul-dic para diciembre). Remuneración computable incluye asignación familiar. Bonificación extraordinaria = 9% de la gratificación (6.75% si el trabajador tiene EPS). La gratificación no paga aportes; sí renta de 5ta. Pago hasta el 15/07 y el 15/12 | Ejemplo diciembre 2026 con RMV + asignación familiar: (1,230 + 123) × 1.09 = **S/ 1,474.77** | RMV 2027 (1er semestre) | Normas citadas (texto no abierto) | Fórmula: Secundaria. Montos: Primaria + cálculo propio |
| 2 | **CTS (mayo y noviembre)** | TUO DL 650, DS 001-97-TR; Ley 32322 | Remuneración computable (RC) = remuneración + asignación familiar + 1/6 de la última gratificación. Depósito = RC/12 × meses + RC/360 × días del semestre (nov-abr para mayo; may-oct para noviembre). Depósito hasta el 15/05 y 15/11. Disponibilidad: 100% hasta 31/12/2026 (Ley 32322, ver §0) | Noviembre 2026: usa la RMV S/ 1,230 vigente al 31/10 | 15/11/2026; régimen de retiro cambia 1/01/2027 | Normas citadas | Secundaria |
| 3 | **Liquidación de beneficios sociales** | DS 001-97-TR (CTS trunca), Ley 27735 (gratificación trunca), DL 713 (vacaciones truncas) | CTS trunca + gratificación trunca (+9%) + vacaciones truncas (remuneración/12 × meses, /360 × días) + vacaciones no gozadas + indemnización si corresponde. Pago en 48 horas del cese | Depende de RMV/UIT | Con la RMV | Normas citadas | Secundaria |
| 4 | **Sueldo neto + renta de 5ta categoría** | TUO LIR arts. 34, 46, 53, 75; DS 179-2004-EF | Neto = bruto − AFP (10% + prima 1.37% hasta RMA + comisión) u ONP 13% − retención de 5ta. Renta 5ta: proyección anual (remuneración × meses + gratificaciones + bonificación extraordinaria) − 7 UIT − gastos deducibles (hasta 3 UIT: 30% de alquiler, honorarios, EsSalud de trabajadoras del hogar, etc.) → escala acumulativa: hasta 5 UIT 8%; 5-20 UIT 14%; 20-35 UIT 17%; 35-45 UIT 20%; más de 45 UIT 30%. Retención mensual por el procedimiento del art. 40 del reglamento | 7 UIT = S/ 38,500; tramos en S/ arriba | UIT en diciembre (para 2027) | [LIR cap. VI, art. 46 (SUNAT)](https://www.sunat.gob.pe/legislacion/renta/ley/capvi.pdf); [LIR cap. VII, art. 53 (SUNAT)](https://www.sunat.gob.pe/legislacion/renta/ley/capvii.pdf) | Escala y deducciones: Primaria, 7/10/2026. Procedimiento de retención mensual: Secundaria |
| 5 | **AFP vs ONP / comparador de AFP** | TUO Ley SPP; DL 19990; Ley 32123 (reforma previsional 2024, efectos 2026 NO VERIFICADO) | AFP: 10% + 1.37% (tope RMA) + comisión flujo, o comisión sobre saldo. ONP: 13% sin tope | Ver §1 | RMA trimestral; comisiones (licitación anual); prima (licitación SIS) | [SBS](https://www.sbs.gob.pe/app/spp/empleadores/comisiones_spp/Paginas/comision_prima.aspx) | Primaria (AFP). "Retiro AFP" (leyes de retiro extraordinario) estado 2026: NO VERIFICADO |
| 6 | **Utilidades** | DL 892; DS 009-98-TR | Porcentaje según actividad de la empresa (pesca, telecomunicaciones, industria 10%; minería, comercio, restaurantes 8%; otras 5%) sobre renta antes de impuestos; 50% por días laborados y 50% por remuneraciones; tope 18 remuneraciones; pago dentro de 30 días del vencimiento de la declaración anual | Empresas con más de 20 trabajadores | Anual (marzo-abril) | Normas citadas | NO VERIFICADO primario (porcentajes por sector y tope tomados de conocimiento previo; confirmar en DL 892 antes de publicar) |
| 7 | **Vacaciones (régimen general y MYPE)** | DL 713 y DS 012-92-TR; TUO Ley MYPE (DS 013-2013-PRODUCE) | Régimen general: 30 días calendario por año completo; si no se gozan en el año siguiente, triple pago (remuneración por el trabajo + por vacaciones + indemnización de 1 remuneración). Micro y pequeña empresa (régimen especial): 15 días. Truncas: proporcional | n/a | n/a | Normas citadas | Secundaria |
| 8 | **Indemnización por despido arbitrario** | DS 003-97-TR (TUO DL 728) arts. 34, 38, 76 | Plazo indeterminado: 1.5 remuneraciones mensuales por año completo (fracciones en dozavos y treintavos), tope 12 remuneraciones. Plazo fijo: 1.5 remuneraciones por mes faltante, tope 12. Micro empresa: 10 remuneraciones diarias por año (tope 90); pequeña: 20 diarias por año (tope 120) | n/a | n/a | Normas citadas | Secundaria |
| 9 | **Horas extras** | DS 007-2002-TR art. 10; DS 008-2002-TR | Jornada máxima 8 h diarias / 48 semanales. Sobretasa mínima 25% las dos primeras horas, 35% las siguientes. Valor hora = remuneración mensual / 30 / 8 | n/a | n/a | Normas citadas | Secundaria |
| 10 | **Sueldo mínimo / asignación familiar** | DS 015-2026-TR; Ley 25129 | RMV S/ 1,230; asignación familiar = 10% RMV = S/ 123 (trabajadores con hijos menores de 18 o hasta 24 si estudian) | ver §1 | 1er semestre 2027 (S/ 1,300) | [El Peruano](https://busquedas.elperuano.pe/dispositivo/EX/2559163-1) | Primaria (RMV) |
| 11 | **Renta de 4ta categoría (recibos por honorarios)** | TUO LIR arts. 33, 45, 46, 74; RS 000390-2025/SUNAT | Retención 8% en recibos mayores a S/ 1,500. Renta neta = bruta − 20% (tope 24 UIT = S/ 132,000) − 7 UIT (compartida con 5ta). Suspensión 2026 si ingresos anuales proyectados no superan **S/ 48,125** (8.75 UIT; mensual S/ 4,010); directores y similares S/ 38,500 (7 UIT; mensual S/ 3,208). Formulario virtual 1609 | 2026 | RS de SUNAT en diciembre | [LIR cap. VI, art. 45 (SUNAT)](https://www.sunat.gob.pe/legislacion/renta/ley/capvi.pdf) | Art. 45/46: Primaria. Montos de suspensión: Secundaria ([LP Derecho](https://lpderecho.pe/fijan-nuevos-montos-para-la-suspension-de-pagos-y-retenciones-de-cuarta-categoria-en-2026-resolucion-de-superintendencia-000390-2025-sunat/), [El Peruano](https://elperuano.pe/noticia/286270-emite-recibos-por-honorarios-si-gana-menos-de-s-4-010-al-mes-podra-suspender-pagos-a-cuenta-en-2026)), coherentes con 8.75 UIT × 5,500 |
| 12 | **Tipo de cambio SUNAT / dólar hoy** | SUNAT (para comprobantes) | Publicación diaria | 3.423 / 3.435 (6/10/2026) | diaria | `sunat.gob.pe/a/txt/tipoCambio.txt` | Primaria (endpoint). Mucha demanda, poca diferenciación |
| 13 | **RUS / RER / Régimen MYPE Tributario** | DL 937 (NRUS); LIR cap. XV (RER); DL 1269 (RMT) | RMT: renta neta anual hasta 15 UIT 10%, exceso 29.5%; pagos a cuenta 1% de ingresos netos del mes si ingresos anuales hasta 300 UIT. RER: 1.5% de ingresos netos mensuales. NRUS: categoría 1 cuota S/ 20 (ingresos/compras hasta S/ 5,000 mes), categoría 2 cuota S/ 50 (hasta S/ 8,000) | 2026 | Solo por reforma | [DL 1269 (SUNAT)](https://www.sunat.gob.pe/legislacion/mypeIR/dl1269.pdf) | RMT: Primaria (texto original del DL 1269; modificatorias posteriores NO VERIFICADO). RER y NRUS: NO VERIFICADO |
| 14 | **Inflación / actualizar montos con IPC** | INEI | Factor = índice final / índice inicial | var. 12 m 4.44% (ago 2026) | Mensual | API BCRP | Primaria (variación). Código de la serie de **índice** con la base vigente: NO VERIFICADO (la serie PN01270PM base 2009 figura "descontinuada") |
| 15 | **Trabajadoras del hogar** | Ley 31047 (2020) y su reglamento DS 009-2021-TR | Remuneración no menor a la RMV por jornada completa; gratificaciones julio y diciembre; CTS; vacaciones 30 días; EsSalud 9% a cargo del empleador | RMV S/ 1,230 | Con la RMV | Normas citadas | NO VERIFICADO primario (beneficios tomados de conocimiento previo; confirmar en el texto de la ley) |
| 16 | **Plazo fijo / tasas** | SBS (tasas por entidad) | Interés compuesto con TEA | n/a | diaria | SBS (no probado) | NO VERIFICADO |

## 3. Fuentes automatizables (probadas el 7/10/2026)

| Fuente | URL exacta | Formato | Frecuencia | Token | Resultado |
|---|---|---|---|---|---|
| **BCRP API de series** | `https://estadisticas.bcrp.gob.pe/estadisticas/series/api/{códigos separados por -}/{json|csv|xml|txt|html}/{inicio}/{fin}` (mensual `2026-1`, diaria `2026-09-25`) | JSON/CSV | diaria/mensual | **No** | **Respondió 200.** PN01273PM (IPC Lima var 12 m), PD04722MM (tasa de referencia), PD04640PD (TC SBS venta). Multi-serie en una llamada probado (`PN01273PM-PN01270PM`). Valores "n.d." en días sin dato |
| **SUNAT tipo de cambio** | `https://www.sunat.gob.pe/a/txt/tipoCambio.txt` | texto `DD/MM/YYYY|compra|venta|` | diaria | No | **Respondió 200**: `06/10/2026|3.423|3.435|` |
| **SBS comisiones y RMA** | `https://www.sbs.gob.pe/app/spp/empleadores/comisiones_spp/Paginas/comision_prima.aspx` | HTML (detrás de Incapsula: requiere user-agent de navegador y cookies, `curl -L -c/-b`) | mensual (RMA trimestral) | No | **Respondió 200** con tabla de devengue 2026-10. La URL con `paginas` en minúscula entra en bucle de redirecciones; usar `Paginas` |
| **El Peruano (normas)** | `https://busquedas.elperuano.pe/dispositivo/{EX|NL}/{id}` | HTML | diaria | No | Respondió (DS 015-2026-TR y DS 301-2025-EF leídos). API pública de búsqueda/listado: NO VERIFICADO; para el cron habría que scrapear el boletín diario o vigilar palabras clave |
| SUNAT legislación (PDF) | `https://www.sunat.gob.pe/legislacion/renta/ley/capvi.pdf`, `capvii.pdf`; `.../mypeIR/dl1269.pdf` | PDF | cuando cambia la ley | No | Respondió 200 con user-agent de navegador |
| INEI | sin API probada | n/a | mensual | n/a | Usar BCRP como espejo del IPC |
| gob.pe | HTML | n/a | n/a | No | 200 con user-agent de navegador, 403/418 a bots. Búsqueda interna poco útil para normas |

Cron sugerido: (1) diario: TC SUNAT + BCRP (TC, tasa de referencia). (2) mensual día 1-2: IPC (BCRP) y SBS (comisiones, RMA, prima). (3) diario: El Peruano normas legales, palabras clave "Remuneración Mínima Vital", "Unidad Impositiva Tributaria", "CTS", "gratificación", "retiro", "AFP"; abrir PR. (4) diciembre: UIT del año siguiente y RS de suspensión de 4ta.

## 4. Idioma, tono y formato

| Tema | Recomendación | Evidencia |
|---|---|---|
| Tratamiento | **Tú** ("Antes de iniciar, debes saber: Tienes 3 opciones" es el estilo de gob.pe). sueldojusto.pe también usa tú | gob.pe, leído 7/10/2026 |
| Moneda | `S/ 1,230.00`: símbolo S/ con espacio, coma de miles, punto decimal (formato del DS 015-2026-TR). **Ojo:** el DS de la UIT escribe `S/ 5 500,00` y la SBS `12 732,70` y `1,47%`. Elegir uno y ser consistente; recomiendo el del DS de RMV porque es el que usa la mayoría de medios | El Peruano, SBS (Primaria) |
| Vocabulario | remuneración (en lo legal) y sueldo (en lo coloquial), planilla, boleta de pago, gratificación ("grati"), CTS, beneficios sociales, liquidación, vacaciones truncas, recibo por honorarios, quinta/cuarta categoría, AFP/ONP, EsSalud, MYPE, RUC, clave SOL, UIT, RMV | Normas y medios |
| Regímenes | Selector obligatorio "régimen general / pequeña empresa / microempresa" en vacaciones, CTS, gratificación e indemnización (los beneficios cambian mucho) | TUO Ley MYPE |

## 5. Competencia (búsquedas principales)

Método: resultados de buscador del agente (no es Google Perú geolocalizado) el 6-7/10/2026 y carga directa de los sitios. Confirmar con Search Console/Ahrefs.

| Búsqueda | Quién aparece | Lectura |
|---|---|---|
| calculadora CTS / CTS noviembre 2026 | sueldojusto.pe (calculadora + artículo "cts-noviembre-2026"), Buk, El Comercio, Infobae, Peru Retail | Medios ganan lo informativo; la calculadora tiene pocos jugadores serios |
| calculadora gratificación / gratificación diciembre 2026 | sueldojusto.pe ("gratificacion-diciembre-2026"), finiquitojusto.com, Buk | Pico 1-15 de diciembre. **Oportunidad inmediata**: RMV nueva cambia el cálculo |
| liquidación de beneficios sociales | sueldojusto.pe, hacecuentas.com/pe, estudios jurídicos | Hueco en informe PDF descargable |
| AFP comisiones / AFP vs ONP | tramitesperu.com, sueldojusto.pe (comparador), misha.pe, Gestión | Hueco: comparador con RMA vigente por trimestre (un competidor muestra la RMA vieja) |
| UIT 2026 / sueldo mínimo | El Peruano, Bloomberg Línea, LP Derecho, Buk, misha.pe, hacecuentas.com/pe | Informativo dominado por medios |
| renta de 4ta / suspensión | LP Derecho, El Peruano, Infobae, BYB Consultores; sueldojusto.pe tiene calculadora 4ta | Medio |

Lectura honesta: Perú tiene **menos competencia que México** pero ya hay un sitio dedicado moderno (sueldojusto.pe, 8 calculadoras, plantillas de documentos gratis) y un clon multi-país argentino (hacecuentas.com/pe). Ninguno parece tener actualización automática verificable desde la fuente. Calculadora oficial del MTPE: existencia NO VERIFICADO.

## 6. Productos pagos posibles

| Producto | Para quién | Por qué paga | Pico |
|---|---|---|---|
| **Planilla Excel de beneficios sociales** (CTS + gratificación + vacaciones + asignación familiar) con régimen general/pequeña/micro | MYPEs y contadores | Cuatro cálculos obligatorios al año con RMV y regímenes distintos | abril-mayo, octubre-noviembre, junio-julio, noviembre-diciembre |
| **Informe PDF de liquidación de beneficios sociales** | Trabajador cesado | Documento para reclamar al empleador o en SUNAFIL | todo el año |
| Excel de **renta de 5ta** con proyección mensual y deducción adicional de 3 UIT (alquiler, honorarios) | Trabajadores en planilla y RR. HH. | Recuperar devolución en la declaración anual | febrero-abril |
| Kit **trabajadora del hogar** (boleta, gratificación, CTS, vacaciones) | Empleadores de hogar | Ley 31047 exige beneficios y pocos saben calcularlos | julio y diciembre |

Medios de pago: **Mercado Pago Checkout Pro opera en Perú** (confirmado en la documentación oficial el 7/10/2026): tarjeta de crédito/débito, cuenta Mercado Pago y **Yape**. PagoEfectivo aparece asociado a Checkout API, no a Checkout Pro. Fuente: [Mercado Pago Developers PE](https://www.mercadopago.com.pe/developers/es/docs/checkout-pro/overview). Yape es el medio de pago móvil dominante: tenerlo en el checkout es clave.

## 7. Calendario de picos

| Mes | Pico | Base |
|---|---|---|
| Enero | UIT nueva, retenciones de 4ta, fin de la libre disposición de CTS (desde 1/01/2027) | DS UIT; Ley 32322 |
| Febrero-abril | Declaración anual de renta (cronograma SUNAT 2027: NO VERIFICADO), devolución de 5ta y 4ta | LIR |
| Marzo-mayo | **Utilidades** (30 días después del vencimiento de la DJ) | DL 892 |
| Mayo | **CTS** (depósito hasta el 15/05) | DS 001-97-TR |
| 1er semestre 2027 | RMV S/ 1,300 (segundo tramo) | DS 015-2026-TR |
| Julio | **Gratificación** (hasta el 15/07) | Ley 27735 |
| Octubre | RMV S/ 1,230 (desde 1/10/2026, pico **ahora**) | DS 015-2026-TR |
| Noviembre | **CTS** (hasta el 15/11) | DS 001-97-TR |
| Diciembre | **Gratificación** (hasta el 15/12), UIT del año siguiente | Ley 27735 |

## 8. NO VERIFICADO (pendiente antes de publicar)

1. Texto de Ley 32322 (100% vs 50% de libre disposición de CTS; las fuentes difieren).
2. Textos de Ley 27735, Ley 30334, DS 001-97-TR, DS 003-97-TR, DL 713, DS 007-2002-TR (fórmulas tomadas de fuentes secundarias concordantes; SUNAFIL/MTPE no consultados).
3. Utilidades: porcentajes por sector y tope de 18 remuneraciones (DL 892).
4. Ley 31047 (trabajadoras del hogar): beneficios exactos.
5. NRUS (categorías/cuotas 2026) y RER (1.5%).
6. Modificatorias posteriores del DL 1269 (RMT).
7. ONP 13% y EsSalud 9% (no se abrió el texto; son parámetros estables).
8. Estado de retiros extraordinarios de AFP en 2026 y efectos de la Ley 32123.
9. Código BCRP de la serie de índice IPC con la base vigente.
10. API o listado programático de El Peruano.
11. Existencia de una calculadora oficial del MTPE.
12. Volúmenes de búsqueda (orden estimado, no medido).

## 9. Atractivo del mercado: 6.5/10

A favor: cuatro picos laborales obligatorios al año (CTS x2, gratificación x2) más utilidades; RMV recién cambiada (1/10/2026) y otro cambio anunciado para 2027, con lo que el valor de "se actualiza solo" es tangible; fuentes abiertas sin token (BCRP, SUNAT TC, SBS); Mercado Pago con Yape; competencia menos consolidada que en México. En contra: mercado formal chico (alta informalidad, planilla mucho menor que México), menor ticket para productos pagos, y ya hay dos competidores con el mismo enfoque. Ventana táctica: publicar antes del 15/11 (CTS) y del 15/12 (gratificación) con la RMV de S/ 1,230 aplicada, porque es exactamente donde la competencia puede quedar desactualizada.
