# Chile: investigación para replicar calcular.ar

Fecha de corte: 6 de octubre de 2026 (verificaciones hechas el 6 y 7 de octubre de 2026).
Convención: «Primaria» = leído en el organismo emisor (DT, SII, SP, SUSESO, INE, Mintrab, ChileAtiende) o en su API. «Secundaria» = confirmado en 2 o más fuentes especializadas sin abrir el texto oficial. «NO VERIFICADO» = no se pudo confirmar.

## 0. Hechos que cambian el diseño del producto

| Hecho | Por qué importa | Fuente | Estado |
|---|---|---|---|
| El ingreso mínimo cambió **dos veces en 2026**: $539.000 desde 1/01/2026 (Ley 21.751) y **$553.553 desde 1/05/2026** (Ley 21.830, publicada 22/06/2026, retroactiva). Próximo reajuste automático **1/01/2027** por IPC mayo a diciembre 2026. | Gratificación (tope), pensión de alimentos, asignación familiar y casa particular dependen del IMM: hay que guardar el IMM con rango de fechas, no un valor único por año. | [DT, Dictamen ORD. 307/28 del 22/06/2026](https://dt.gob.cl/legislacion/1624/w3-article-129410.html), [Garrigues (Ley 21.751)](https://www.garrigues.com/es_ES/noticia/chile-publica-ley-establece-reajuste-ingreso-minimo-mensual-efecto-retroactivo-partir-1) | Primaria |
| **Ley 40 horas (Ley 21.561)**: 44 h desde 26/04/2024, **42 h desde 26/04/2026**, 40 h desde 26/04/2028. | Cambia el factor de hora extra (0,0079545 → 0,0083333). | [Mintrab 40 horas](https://www.mintrab.gob.cl/40horas/) | Primaria |
| **Reforma de pensiones (Ley 21.735)**: el aporte del empleador subió de 1% a **3,5% desde agosto 2026** (vigente hasta julio 2027) y sigue subiendo hasta 8,5% adicional en 2033. No se descuenta al trabajador. | No cambia el sueldo líquido; sí el **costo empresa** (planilla paga para empleadores). Sube cada agosto: cron anual. | [AAFP](https://www.aafp.cl/noticias/reforma-previsional-cotizacion-adicional-35-agosto-2026/), [Hacienda](https://www.hacienda.cl/noticias-y-eventos/noticias/implementacion-de-la-reforma-previsional-nueva-cotizacion-del-empleador-regira) | Secundaria (desglose 0,1% + 0,9% + 2,5% según AAFP: verificar en SP) |
| **IPC con nueva base 2023=100** (INE). mindicador.cl dejó de actualizar su serie `ipc` en diciembre 2025. | No usar mindicador para IPC: leer INE o BCCh. | [INE IPC](https://www.ine.gob.cl/estadisticas/economia/indices-de-precio-e-inflacion/indice-de-precios-al-consumidor), `https://mindicador.cl/api/ipc` (último dato: 2025-12) | Primaria (ambos probados 7/10/2026) |
| Retención de **boleta de honorarios 15,25% en 2026**, 16% en 2027, 17% en 2028. | Cambio anual el 1 de enero. | [SII noticia 26/12/2025](https://www.sii.cl/noticias/2025/261225noti01smn.htm) | Primaria |
| Casa particular: desde Ley 21.269 el empleador paga **3% al seguro de cesantía** (2,2% cuenta individual + 0,8% fondo solidario) y la indemnización a todo evento bajó de 4,11% a **1,11%**. | Muchas calculadoras siguen mostrando 4,11%: error común de la competencia. | [DT consulta 119845](https://www.dt.gob.cl/portal/1628/w3-article-119845.html) | Primaria |

## 1. Mapa de calculadoras (ordenado por demanda estimada)

**De dónde sale el orden:** sin acceso a Keyword Planner ni Google Trends en esta sesión. Estimación propia por (a) densidad de competidores con páginas dedicadas (finclaro y monedario hacen SEO programático sobre UF y finiquito, señal de volumen alto), (b) estacionalidad legal, (c) analogía con calcular.ar. **Validar con Keyword Planner** antes de priorizar.

### 1.1 Valores base vigentes

| Parámetro | Valor | Vigencia | Base legal | Fuente | Verificado |
|---|---|---|---|---|---|
| Ingreso mínimo mensual (18 a 65 años) | $553.553 | desde 1/05/2026 | Ley 21.830 | [DT ORD. 307/28](https://dt.gob.cl/legislacion/1624/w3-article-129410.html) | Primaria, 6/10/2026 |
| IMM menores de 18 y mayores de 65 | $412.938 | desde 1/05/2026 | Ley 21.830 | idem | Primaria |
| IMM para fines no remuneracionales | $356.815 | desde 1/05/2026 | Ley 21.830 | idem | Primaria |
| UF | $41.106,35 (6/10/2026); $41.057,20 (30/09/2026); $41.065,38 (1/10/2026) | diaria (BCCh publica del 10 al 9) | Ley 18.840 / BCCh | [SII UF 2026](https://www.sii.cl/valores_y_fechas/uf/uf2026.htm), `https://mindicador.cl/api/uf/06-10-2026` | Primaria (coinciden SII y API) |
| UTM / UTA | UTM $72.151; UTA $865.812 | octubre 2026 | SII | [SII UTM 2026](https://www.sii.cl/valores_y_fechas/utm/utm2026.htm) | Primaria |
| Tope imponible AFP, salud y accidentes | 90,0 UF | desde remuneraciones de febrero 2026, todo 2026 | Ajuste por Índice de Remuneraciones Reales (+2,5%) | [SP 2026](https://www.spensiones.cl/portal/institucional/594/w3-article-16921.html) | Primaria |
| Tope imponible seguro de cesantía | 135,2 UF | idem | idem | idem | Primaria |
| SIS (seguro de invalidez y sobrevivencia, cargo empleador) | 1,62% | desde abril 2026 | | [SP sistema AFP](https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9897.html) | Primaria |
| Comisiones AFP (sobre remuneración imponible) | Uno 0,46% · Modelo 0,58% · PlanVital 1,16% · Habitat 1,27% · Capital 1,44% · Cuprum 1,44% · Provida 1,45% | declaradas "desde 1/10/2025" por la SP | | [SP sistema AFP](https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9897.html) | Primaria. **Discrepancia**: finclaro.cl publica Uno 0,49%. Gana la SP, pero conviene cron mensual sobre la SP |
| Asignación familiar | Tramo 1: $22.601 (ingreso ≤ $649.039) · Tramo 2: $13.870 (≤ $947.990) · Tramo 3: $4.382 (≤ $1.478.539) · Tramo 4: $0 | desde 1/05/2026 | Ley 21.830 | [SUSESO tramos](https://www.suseso.gob.cl/606/w3-article-498133.html) | Primaria (SUSESO muestra límite 1.478.540; prensa 1.478.539: diferencia de $1, verificar) |
| IPC | agosto 2026: +0,6% mensual; 4,1% en 12 meses; 3,6% acumulado | base 2023=100; septiembre se publica ~8/10/2026 | INE | [INE](https://www.ine.gob.cl/estadisticas/economia/indices-de-precio-e-inflacion/indice-de-precios-al-consumidor), [CNN Chile](https://www.cnnchile.com/negocios/sube-el-costo-de-la-vida-indice-precios-consumidor-de-agosto-registro-variacion-mensual-de-06/) | Primaria (mensual) + secundaria (12 meses). Fecha exacta de publicación de septiembre: NO VERIFICADO |
| TPM | 4,5% | al 6/10/2026 | BCCh | `https://mindicador.cl/api` (campo `tpm`) | Secundaria (agregador, no BCCh directo) |
| Dólar observado | $977,25 | 6/10/2026 | BCCh | mindicador | Secundaria (agregador) |

### 1.2 Calculadoras

| # | Calculadora (nombre local) | Base legal | Fórmula | Parámetros vigentes y próxima actualización | Fuente oficial | Estado |
|---|---|---|---|---|---|---|
| 1 | **Valor UF hoy / conversor UF a pesos** (y UTM/UTA) | Ley 18.840; SII | monto × UF del día | Diaria. UF publicada hasta el día 9 del mes siguiente | [SII UF](https://www.sii.cl/valores_y_fechas/uf/uf2026.htm) | Primaria |
| 2 | **Sueldo líquido** | DL 3.500 (AFP 10% + comisión); salud 7% Fonasa o plan Isapre (mín. 7%); Ley 19.728 (cesantía); LIR art. 43 (impuesto único 2ª categoría) | Imponible (tope 90 UF) − 10% AFP − comisión AFP − 7% salud (o plan Isapre en UF) − 0,6% cesantía (solo indefinido; tope 135,2 UF) = base tributable → impuesto único con tabla mensual SII → líquido (+ no imponibles: colación, movilización) | Tabla SII octubre 2026 en UTM: 0 a 13,5 exento; 13,5 a 30: 4% − 0,54; 30 a 50: 8% − 1,74; 50 a 70: 13,5% − 4,49; 70 a 90: 23% − 11,14; 90 a 120: 30,4% − 17,80; 120 a 310: 35% − 23,32; > 310: 40% − 38,82. En pesos (UTM 72.151): exento hasta $974.038,50. Cambia cada mes con la UTM. | [SII tabla 2ª categoría 2026](https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm), [SP](https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9897.html) | Tabla: primaria. 7% salud y 0,6% cesantía: secundaria ([AFP Capital](https://www.afpcapital.cl/centro-de-ayuda/preguntas-frecuentes/seguro-de-cesantia/como-se-financia-el-seguro-de-cesantia)) |
| 3 | **Finiquito e indemnización por años de servicio** | Código del Trabajo arts. 161, 162, 163, 172, 73 | IAS = 30 días de última remuneración por año y fracción > 6 meses, tope 330 días (11 años); base máxima 90 UF del último día del mes anterior. Más feriado proporcional (#8) y remuneraciones pendientes. | Base máxima hoy: 90 × $41.057,20 (UF 30/09/2026) = **$3.695.148**. El tope de 11 años no aplica a contratos anteriores al 14/08/1981 (NO VERIFICADO en esta sesión). | [DT art. 172](https://www.dt.gob.cl/legislacion/1624/w3-propertyvalue-145812.html), [DT consulta tope](https://www.dt.gob.cl/portal/1628/w3-article-60604.html) | Primaria (tope 90 UF, 30 días/año). Tope 330 días: secundaria ([Buk](https://www.buk.cl/blog/calculo-indemnizacion-anos-servicio-chile-2026)) |
| 4 | **Indemnización sustitutiva del aviso previo** | CT arts. 161 y 162 | 1 mes de última remuneración, base máxima 90 UF | idem UF | [DT](https://www.dt.gob.cl/portal/1628/w3-article-96076.html) | Primaria (tope 90 UF) |
| 5 | **Boleta de honorarios (bruto ↔ líquido)** | Ley 21.133 | Retención = bruto × 15,25%; líquido = bruto × 0,8475; bruto = líquido / 0,8475 | 2027: 16%; 2028: 17% | [SII](https://www.sii.cl/noticias/2025/261225noti01smn.htm) | Primaria |
| 6 | **Gratificación legal** | CT arts. 47 (30% utilidades) y 50 (25% de remuneraciones) | Art. 50: 25% de lo devengado en el año, tope 4,75 IMM anual. Mensualizada: min(25% × remuneración mensual, 4,75 × IMM / 12) | Con IMM $553.553: tope anual $2.629.376,75; mensual **$219.114,73** (prensa redondea a $219.115). Cambia 1/01/2027 con el IMM. | CT; IMM de [DT](https://dt.gob.cl/legislacion/1624/w3-article-129410.html) | Fórmula: secundaria ([Talana](https://web.talana.com/blog/gratificacion-legal-chile-2026)). Cálculo propio sobre IMM primario |
| 7 | **Horas extras** | CT art. 32; Ley 21.561 | Valor hora extra = sueldo / 30 × 28 / (4 × jornada semanal) × 1,5. Factor 42 h: **0,0083333**; 44 h: 0,0079545; 40 h (desde 26/04/2028): 0,00875 | Jornada 42 h desde 26/04/2026 | [DT valor hora extra](https://dt.gob.cl/portal/1628/w3-article-95182.html) | Primaria (fórmula y factor 42 h). Factores 44 y 40 h: cálculo propio |
| 8 | **Vacaciones / feriado proporcional y progresivo** | CT arts. 67, 68, 73 | 15 días hábiles por año; proporcional = días de feriado / 12 por mes trabajado (1,25); progresivo: +1 día por cada 3 años nuevos sobre 10 años de trabajo | Sin cambios previstos | [DT feriado proporcional](https://www.dt.gob.cl/portal/1628/w3-article-60200.html) | Primaria |
| 9 | **Sueldo mínimo 2026** | Ley 21.830 | Tabla de los tres montos + historial | Reajuste 1/01/2027 por IPC may a dic 2026 | [DT](https://dt.gob.cl/legislacion/1624/w3-article-129410.html) | Primaria |
| 10 | **Pensión de alimentos** | Ley 14.908 arts. 3 y 7; Ley 21.484 (pago efectivo) | Mínimo: 40% del ingreso mínimo remuneracional que corresponda a la edad del alimentante para 1 hijo; 30% por cada hijo si son 2 o más. Máximo: 50% de las rentas del alimentante. | Con IMM $553.553: 1 hijo **$221.421**; 2 o más: **$166.066 c/u**. **Ojo**: la base legal es el IMM, no la UTM (el pedido original decía UTM). | [Derechopedia art. 3](https://derechopedia.cl/Art%C3%ADculo_3_de_la_ley_sobre_abandono_de_familia_y_pago_de_pensiones_alimenticias) | Secundaria (no abrí BCN) |
| 11 | **IPC / reajuste de arriendo / actualizar montos** | INE | Variación entre índices (base 2023=100); en arriendos se usa también UF | Mensual (~día 8) | [INE](https://www.ine.gob.cl/estadisticas/economia/indices-de-precio-e-inflacion/indice-de-precios-al-consumidor) | Primaria |
| 12 | **PGU (Pensión Garantizada Universal)** | Ley 21.419; Ley 21.735 | Monto máximo según edad, decrece entre pensión base inferior y superior | **$250.275** máximo para 75 años o más desde septiembre 2026 (82+ ya lo tenían). Menores de 75: $231.732 y pensión base inferior $789.139 según prensa. Reajuste anual en febrero por IPC. | [ChileAtiende PGU](https://www.chileatiende.gob.cl/fichas/130457) | $250.275: primaria. $231.732 y $789.139: secundaria ([Meganoticias](https://www.meganoticias.cl/dato-util/532864-pgu-monto-minimo-segun-edad-pension-base-2026-30-09-2026.html)). Pensión base superior: NO VERIFICADO |
| 13 | **Asignación familiar** | Ley 18.020 / DFL 150; Ley 21.830 | Monto por carga según tramo de ingreso | ver §1.1; cambia con cada reajuste del IMM | [SUSESO](https://www.suseso.gob.cl/606/w3-article-498133.html) | Primaria |
| 14 | **Costo empresa / liquidación de sueldo del empleador** | Ley 21.735, Ley 19.728, Ley 16.744 | Sueldo + SIS 1,62% + cesantía 2,4% (indefinido) o 3% (plazo fijo) + aporte reforma 3,5% + mutual (cotización básica 0,93% + adicional) | Aporte reforma sube cada agosto | SP, AAFP | SIS: primaria. 2,4%/3%: secundaria. Mutual 0,93%: NO VERIFICADO |
| 15 | **Depósito a plazo** | Mercado; CMF publica TMC | Interés = capital × tasa período × días/30 (tasas mensuales base 30 días en bancos chilenos: NO VERIFICADO) | TMC y tasas de captación: no leídas (CMF exige API key) | CMF | NO VERIFICADO |
| 16 | **Trabajadora de casa particular** | Ley 20.786; Ley 21.269; CT art. 163 | Sueldo ≥ IMM; empleador: 3% AFC + 1,11% indemnización a todo evento + SIS + cotizaciones normales | IMM | [DT](https://www.dt.gob.cl/portal/1628/w3-article-119845.html) | Primaria (3% y 1,11%). Jornada puertas afuera bajo Ley 40 horas: NO VERIFICADO |
| 17 | **Operación Renta (F22)** | LIR | Reliquidación anual, devolución de retenciones de honorarios, créditos | Abril de cada año. Calendario AT 2027: NO VERIFICADO | SII | NO VERIFICADO para 2027 |

## 2. Fuentes automatizables (probadas el 7/10/2026)

| Fuente | URL exacta | Formato | Frecuencia | Token | Respondió |
|---|---|---|---|---|---|
| mindicador.cl (agregador no oficial) | `https://mindicador.cl/api` · `https://mindicador.cl/api/uf/DD-MM-AAAA` · `/api/utm`, `/api/dolar`, `/api/tpm` | JSON | diaria | No | Sí. UF 6/10/2026 = 41.106,35 (coincide con SII). **Serie `ipc` congelada en 2025-12** por el cambio de base del INE: no usar para IPC. No tiene TMC |
| SII: UF | `https://www.sii.cl/valores_y_fechas/uf/uf2026.htm` | HTML (tabla) | diaria | No | Sí |
| SII: UTM/UTA | `https://www.sii.cl/valores_y_fechas/utm/utm2026.htm` | HTML | mensual | No | Sí (enero a octubre 2026) |
| SII: impuesto único 2ª categoría | `https://www.sii.cl/valores_y_fechas/impuesto_2da_categoria/impuesto2026.htm` | HTML | mensual | No | Sí (octubre 2026 en pesos) |
| CMF API (UF, UTM, IPC, dólar, TMC, TAB) | `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=KEY&formato=json` | JSON/XML | diaria/mensual | **Sí, API key** (registro gratuito en api.cmfchile.cl: condiciones NO VERIFICADO) | Sin key responde HTTP 422 "API key no ha sido suministrada" |
| BCCh Base de Datos Estadísticos (SieteRestWS) | `https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=U&pass=P&function=GetSeries&timeseries=F073.UFF.PRE.Z.D` | JSON | diaria | **Sí, usuario y clave** (registro) | Sin credenciales redirige a página de error (HTTP 302). Código de serie de UF: NO VERIFICADO |
| INE IPC | `https://www.ine.gob.cl/estadisticas/economia/indices-de-precio-e-inflacion/indice-de-precios-al-consumidor` + boletín PDF mensual (ej. `.../boletines/español/2026/boletin-índice-de-precios-al-consumidor-agosto-2026.pdf`) | HTML/PDF/XLSX | mensual | No | Sí. API del INE: NO VERIFICADO |
| Superintendencia de Pensiones | `https://www.spensiones.cl/portal/institucional/594/w3-propertyvalue-9897.html` (comisiones, SIS) | HTML | cuando cambian | No | Sí |
| SUSESO asignación familiar | `https://www.suseso.gob.cl/606/w3-article-498133.html` | HTML | con cada ley de IMM | No | Sí |
| DT dictámenes | `https://dt.gob.cl/legislacion/1624/...` | HTML | por evento | No | Sí |

Recomendación: cron diario con mindicador (UF, UTM, dólar) y verificación cruzada contra la tabla del SII; cron mensual sobre SII (tabla de impuesto único, UTM), INE (IPC) y SP (comisiones AFP). Pedir API key de CMF para TMC y como respaldo oficial de UF. IMM, PGU, asignación familiar, topes imponibles y retención de honorarios son eventos (ley o resolución): PR manual con checklist.

## 3. Idioma, tono y formato

| Tema | Recomendación | Base |
|---|---|---|
| Tratamiento | **Tú** en la web (competidores y ChileAtiende escriben de tú: "Si tienes 75 años o más"). Usted queda para documentos formales (cartas de despido, finiquitos). | Texto de ChileAtiende citado por la prensa; preferencia general: criterio propio |
| Vocabulario | sueldo (bruto, líquido, imponible), liquidación de sueldo, finiquito, carta de despido, gratificación, aguinaldo, feriado (vacaciones legales), cotizaciones, AFP, Fonasa/Isapre, seguro de cesantía/AFC, boleta de honorarios, arriendo, depósito a plazo, "pega" y "lucas" (coloquial, no usar en calculadoras) | Fuentes leídas |
| Unidades | UF, UTM, UTA conviven con pesos: toda calculadora debe aceptar montos en UF y mostrar equivalencia | SII, CT art. 172 |
| Moneda | Peso chileno, CLP, símbolo $; **sin decimales** en pesos | |
| Formato numérico | Punto de miles y coma decimal: $553.553; UF 41.106,35; 15,25% | SII |
| Fechas | dd-mm-aaaa o dd/mm/aaaa | SII y mindicador usan dd-mm-aaaa |

## 4. Competencia (honesta)

Método: WebSearch (motor de EE. UU., **no** el SERP de Google Chile). Indica quién invierte en cada búsqueda; el orden exacto en google.cl: NO VERIFICADO.

| Búsqueda | Quién aparece |
|---|---|
| valor UF hoy / UF a pesos | **finclaro.cl** (páginas programáticas: "1000-uf-a-pesos", "5000-uf-a-pesos"...), **monedario.cl**, contable.app; además SII y BCCh |
| calculadora sueldo líquido 2026 | runahr.com, monedario.cl, uf-hoy.com, finclaro.cl, **hacecuentas.com**, simplo.cl, contable.app |
| calculadora finiquito 2026 | runahr.com, **finclaro.cl** (programático por años: "/finiquito/1-ano", "/finiquito/20-anos"), Buk, monedario, uf-hoy, contable.app |
| gratificación legal 2026 | finclaro, Buk, Talana, g-talent, rexmas, hacecuentas |
| impuesto segunda categoría | monedario, SII (oficial), Rankia, transtecnia |
| boleta de honorarios 2026 | SII (oficial, con simulador), Buk, 24horas, monedario |
| horas extras 42 horas | DT (oficial), Buk, Nubox, jibble, hacecuentas, Meganoticias |

Lectura:
- **Mercado saturado** en las búsquedas grandes: dos sitios nativos con SEO programático y datos 2026 al día (finclaro.cl y monedario.cl), el clon multi-país **hacecuentas.com** (mismo modelo que calcular.ar, ya presente en AR, CO y CL), y las HR-tech (Buk, Talana, Runa, Simplo, Nubox, rexmas) que publican calculadoras como lead magnet. Además el Estado tiene simuladores propios (SII honorarios, DT).
- **Hueco real** (observación, no medido): (1) casa particular con las tasas correctas post Ley 21.269 (3% + 1,11%); (2) costo empresa con el aporte de la reforma de pensiones que sube cada agosto hasta 2033; (3) IMM con dos tramos en el mismo año (enero y mayo) aplicado bien a gratificación y alimentos; (4) pensión de alimentos con calculadora (hoy dominado por artículos y abogados); (5) transparencia de "dato verificado el día X en SII/DT" que nadie muestra.

## 5. Productos pagos y medios de pago

| Producto | Por qué | Referencia |
|---|---|---|
| Planilla de liquidación de sueldo + costo empresa (AFP por administradora, Isapre en UF, impuesto único con UTM del mes, aporte reforma) con actualización mensual | Pymes sin software de remuneraciones; el aporte del empleador cambia cada agosto | Competencia gratuita (Simplo regala plantillas): precio sostenible NO VERIFICADO |
| Finiquito completo + carta de despido con causal y plazos | Alto intent, cada término de contrato | NO VERIFICADO |
| Planilla de trabajadora de casa particular (contrato, cotizaciones 3% + 1,11%, finiquito) | Nicho con errores frecuentes en la competencia | NO VERIFICADO |
| Informe de pensión de alimentos (mínimo legal, tope 50%, reajuste) | Demanda emocional y recurrente; ojo: no es asesoría legal | NO VERIFICADO |

Medios de pago:
- **Mercado Pago Chile: confirmado** que existe Checkout Pro en mercadopago.cl (documentación para desarrolladores en mercadopago.cl/developers). Según la página oficial de checkout (resumen del buscador, la página devolvió 403 a la lectura directa): acepta crédito, débito, prepago, transferencia y dinero en cuenta; comisión 3,19% + IVA (dinero al instante) o 2,89% + IVA (a 10 días); vendedores nuevos 2,59% / 2,29% + IVA ([mercadopago.cl/herramientas-para-vender/check-out](https://www.mercadopago.cl/herramientas-para-vender/check-out)). Estado: secundaria.
- En Chile el estándar local es Webpay (Transbank); Flow y Khipu son alternativas comunes. Condiciones: NO VERIFICADO.

## 6. Calendario de picos de búsqueda (derivado de fechas legales; volumen NO VERIFICADO)

| Mes | Pico | Por qué |
|---|---|---|
| Enero | sueldo mínimo 2027 (reajuste por IPC), retención honorarios 16%, UTM de enero | Ley 21.830; Ley 21.133 |
| Febrero | topes imponibles nuevos, reajuste PGU | SP; PGU por IPC |
| Abril | **Operación Renta** (F22), devolución de honorarios | SII |
| Mayo | reajuste de IMM (en años con ley que lo fije) | 2026: Ley 21.830 |
| Agosto | aumento del aporte del empleador (reforma de pensiones) | Ley 21.735 |
| Septiembre | aguinaldo de Fiestas Patrias, PGU para nuevos tramos de edad | Costumbre/contratos; Ley 21.735 |
| Diciembre | aguinaldo de Navidad, vacaciones, finiquitos de fin de año | Estacional |
| Abril 2028 | jornada 40 h | Ley 21.561 |
| Todo el año (diario) | valor UF, UTM, sueldo líquido, finiquito | Evergreen |

## 7. NO VERIFICADO (resumen)

- Textos del Código del Trabajo y Ley 14.908 en BCN (no se abrió leychile). Afecta: tope 330 días (art. 163), excepción de contratos previos a 1981, art. 3 y 7 Ley 14.908.
- Desglose oficial del aporte del empleador 3,5% (Ley 21.735) en la SP.
- Pensión base superior de la PGU y monto exacto para menores de 75.
- TMC y tasas de depósito a plazo (CMF exige API key).
- Calendario de Operación Renta AT 2027.
- Cotización básica de mutual (0,93%).
- Fecha exacta de publicación del IPC de septiembre 2026.
- Código de serie de UF en la API del BCCh y condiciones de la API key de CMF.
- Comisiones de Mercado Pago (leídas solo en el resumen del buscador; la página dio 403).
- Volúmenes de búsqueda (todo el orden de demanda es estimado).
