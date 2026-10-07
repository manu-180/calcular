# México: investigación para replicar calcular.ar

Fecha de corte: 6 de octubre de 2026 (verificaciones hechas el 6 y 7 de octubre de 2026).
Convención: cada dato lleva valor, vigencia, fuente y estado. «Primaria» = leído en el organismo emisor (DOF, INEGI, SAT, Banxico). «Secundaria» = confirmado en portales especializados sin poder abrir el texto oficial en esta sesión. «NO VERIFICADO» = no se pudo confirmar.

Nota de acceso: `diputados.gob.mx` (texto consolidado de LFT, LISR, LSS) **no respondió desde esta red** (timeout en 443 y 80, 7/10/2026). Los artículos de ley que no se publicaron en el DOF recientemente quedaron como «Secundaria». El DOF sí respondió (con cortes intermitentes) y su API SIDOF respondió siempre.

## 0. Hechos que cambian el diseño del producto

| Hecho | Por qué importa | Fuente | Estado |
|---|---|---|---|
| **Reforma de 40 horas ya está en la LFT.** Constitucional: DOF 3/03/2026. Ley secundaria: DOF 1/05/2026, vigente ese día. Jornada máxima semanal: 48 h (2026), 46 (2027), 44 (2028), 42 (2029), 40 (2030), cada escalón desde el 1 de enero. | Horas extras, valor hora y cualquier "costo de un empleado" quedan parametrizados por año. Se puede publicar ya "calculadora de jornada 2027" y captar la búsqueda antes que nadie. | [DOF 01/05/2026, codigo 5786537](https://dof.gob.mx/nota_detalle.php?codigo=5786537&fecha=01/05/2026) | Primaria, 7/10/2026 |
| **Horas extra máximas por semana (transitorio cuarto): 9 (2026), 9 (2027), 10 (2028), 11 (2029), 12 (2030).** Pago doble (100% más). Excedente: hasta 4 h más por semana al triple (200% más). Ordinaria + extra nunca más de 12 h diarias. Extra en hasta 4 h diarias y máximo 4 días. | **Discrepancia detectada:** IDC Online publica 2028 = 11 y 2029 = 10 (invertido). El DOF dice 10 y 11. Ventaja de precisión frente a la competencia. | [DOF 01/05/2026](https://dof.gob.mx/nota_detalle.php?codigo=5786537&fecha=01/05/2026) vs [IDC Online](https://idconline.mx/laboral/2026/05/04/historico-la-jornada-laboral-de-40-horas-se-adiciona-a-la-lft) | Primaria |
| **Registro electrónico de jornada obligatorio** (art. 132 fr. XXXIV). Las disposiciones de la STPS entran en vigor el 1/01/2027. Multa: 250 a 5.000 UMA (art. 994 fr. IV Bis). | Producto pago posible: planilla de registro de jornada para PyMEs (ver §5). | DOF 01/05/2026 (mismo decreto) | Primaria |
| **Subsidio para el empleo 2026: 15.02% de la UMA mensual** (desde febrero), 15.59% de la UMA 2025 en enero. Límite: ingresos mensuales hasta $11,492.66. | El decreto dice que 15.02% "representa $536.22", pero 15.02% × UMA mensual 2026 ($3,566.22) = **$535.65**. $536.22 es lo que da enero (15.59% × $3,439.46). Calcular siempre con la fórmula, no con el monto del considerando. | [DOF 31/12/2025, codigo 5777649](https://dof.gob.mx/nota_detalle.php?codigo=5777649&fecha=31/12/2025) | Primaria (texto) + cálculo propio |
| Tablas de ISR 2026 **actualizadas** (Anexo 8 RMF 2026). | Cualquier competidor que siga con la tabla 2025 calcula mal. | [DOF 28/12/2025, codigo 5777219](https://dof.gob.mx/nota_detalle.php?codigo=5777219&fecha=28/12/2025) | Primaria |
| Competidor argentino **hacecuentas.com** (mismo modelo que calcular.ar) ya tiene secciones `/mx` y `/pe` (sueldo neto, aguinaldo-prima-PTU, pensión alimenticia, salario mínimo, UMA). Uno de sus snippets dice que el aguinaldo exento es "~$32,430" cuando 30 UMA diarias = **$3,519.30**. | El hueco no es "existir", es **exactitud verificable + actualización automática**. | [hacecuentas.com/mx](https://hacecuentas.com/mx) (HTTP 200, 7/10/2026) | Primaria (sitio) |

## 1. Valores base vigentes

| Parámetro | Valor | Vigencia | Base legal | Fuente oficial | Estado |
|---|---|---|---|---|---|
| Salario mínimo general (ZSMG) | $315.04 diarios (+13%) | 1/01/2026 a 31/12/2026 | Art. 123 A fr. VI Constitución; Resolución CONASAMI | [DOF 09/12/2025, codigo 5775534](https://dof.gob.mx/nota_detalle.php?codigo=5775534&fecha=09/12/2025) | Primaria, 7/10/2026 |
| Salario mínimo Zona Libre de la Frontera Norte | $440.87 diarios (+5%) | idem | idem | idem | Primaria |
| Salarios mínimos profesionales | 61 oficios, p. ej. albañil oficial $363.44 (ZSMG) / $440.87 (ZLFN) | idem | idem | idem | Primaria |
| UMA | $117.31 diario · $3,566.22 mensual · $42,794.64 anual | 1/02/2026 a 31/01/2027 (enero 2026 se usó UMA 2025: $113.14) | Ley para Determinar el Valor de la UMA, art. 4 y 5 | [DOF 09/01/2026, codigo 5778072](https://dof.gob.mx/nota_detalle.php?codigo=5778072&fecha=09/01/2026) | Primaria |
| INPC general | 145.462 (agosto 2026), +0.20% mensual. 2a quincena agosto 145.531 | mensual y quincenal | Ley del SNIEG; INEGI | [DOF 10/09/2026, codigo 5798385](https://dof.gob.mx/nota_detalle.php?codigo=5798385&fecha=10/09/2026) | Primaria. INPC septiembre: aún no publicado al 7/10 (fecha exacta del calendario INEGI: NO VERIFICADO) |
| Tipo de cambio FIX (DOF) | $18.1343 | 6/10/2026 | Banxico | API SIDOF indicador 158 | Primaria (API) |
| UDIS | 8.845713 | 6/10/2026 | Banxico | API SIDOF indicador 159 | Primaria (API) |
| CETES 28 días | 6.13% (subasta 25/08/2026) | semanal | Banxico (subasta) | [Banco Base, PDF subasta](https://resource.bancobase.com/uploads/Subasta_de_valores_gubernamentales_25_de_agosto_del_2026_199a407b18.pdf) | Secundaria; tasa de la última subasta de septiembre/octubre: NO VERIFICADO (la API SIE pide token) |
| IVA | 16% general; 8% región fronteriza (estímulo por decreto) | permanente | Ley del IVA art. 1; Decreto de estímulos región fronteriza | n/a | NO VERIFICADO en fuente primaria esta sesión |

Derivados (cálculo propio con valores primarios): tope prima de antigüedad 2 SM = $630.08 (ZSMG) / $881.74 (ZLFN); 30 UMA = $3,519.30; 15 UMA = $1,759.65; 90 UMA = $10,557.90; 25 UMA (tope SBC IMSS) = $2,932.75 diarios.

## 2. Mapa de calculadoras (ordenado por demanda estimada)

**De dónde sale el orden:** sin acceso a Keyword Planner ni Ahrefs en esta sesión (el MCP de Ahrefs pide autenticación). Es una estimación propia por (a) universalidad (todo asalariado formal), (b) pico legal anual, (c) densidad de páginas dedicadas de la competencia observada en buscadores el 6-7/10/2026, (d) equivalente en calcular.ar. **Validar con Keyword Planner** (cuenta Google Ads 4869983637, geo México) antes de priorizar.

| # | Calculadora (nombre local) | Base legal | Fórmula | Valores vigentes | Próxima actualización | Fuente primaria | Estado |
|---|---|---|---|---|---|---|---|
| 1 | **Sueldo neto / cálculo de ISR quincenal y mensual** | LISR art. 96; RLISR 175; Anexo 8 RMF 2026; Decreto subsidio para el empleo; LSS arts. 25, 106, 107, 147, 168 | ISR = cuota fija + (base − límite inferior) × %. Subsidio = 15.02% × UMA mensual si ingreso ≤ $11,492.66 (periodos menores: ÷ 30.4 × días). ISR a retener = max(0, ISR − subsidio). Cuotas IMSS obreras sobre SBC (tope 25 UMA): EyM excedente 0.40% × (SBC − 3 UMA), prestaciones en dinero 0.25%, gastos médicos pensionados 0.375%, invalidez y vida 0.625%, cesantía y vejez 1.125%. Neto = bruto − ISR − IMSS | Tabla mensual 2026: 0.01-844.59 (0, 1.92%); 844.60-7,168.51 (16.22, 6.40%); 7,168.52-12,598.02 (420.95, 10.88%); 12,598.03-14,644.64 (1,011.68, 16%); 14,644.65-17,533.64 (1,339.14, 17.92%); 17,533.65-35,362.83 (1,856.84, 21.36%); 35,362.84-55,736.68 (5,665.16, 23.52%); 55,736.69-106,410.50 (10,457.09, 30%); 106,410.51-141,880.66 (25,659.23, 32%); 141,880.67-425,641.99 (37,009.69, 34%); 425,642.00 en adelante (133,488.54, 35%). Tabla quincenal (15 días): 0.01-416.70 (0, 1.92%) ... 210,020.71 en adelante (65,866.05, 35%) | Tablas: cuando la inflación acumulada supera 10% (LISR art. 152); próxima fecha NO VERIFICADO. Subsidio: decreto anual (fin de diciembre). UMA: enero | [Anexo 8 RMF 2026](https://dof.gob.mx/nota_detalle.php?codigo=5777219&fecha=28/12/2025); [Decreto subsidio](https://dof.gob.mx/nota_detalle.php?codigo=5777649&fecha=31/12/2025) | Tablas y subsidio: Primaria. Tasas IMSS obreras: Secundaria ([El Contribuyente](https://www.elcontribuyente.mx/indicadores/cuotas-imss/)); la página de tablas del IMSS no rindió contenido |
| 2 | **Aguinaldo** | LFT art. 87; LISR art. 93 fr. XIV | Salario diario × 15 × (días trabajados / 365). Exento ISR hasta 30 UMA ($3,519.30); el excedente se grava (art. 96 o procedimiento opcional art. 174 RLISR) | 15 días mínimo; pago antes del 20 de diciembre | Solo cambia la UMA (febrero) | LFT (diputados.gob.mx, inaccesible) | Secundaria (art. 87 y exención). Iniciativas para subirlo a 30 días: estado NO VERIFICADO |
| 3 | **Finiquito y liquidación** | LFT arts. 48, 50, 76, 79, 80, 87, 162, 485, 486 | Finiquito (renuncia): días pendientes + aguinaldo proporcional + vacaciones proporcionales + prima vacacional 25% + prima de antigüedad si ≥ 15 años (12 días por año, salario topado a 2 SM). Liquidación (despido injustificado): lo anterior + 3 meses de salario integrado (indemnización constitucional) + prima de antigüedad sin requisito de 15 años + 20 días por año cuando procede (art. 50, supuestos de no reinstalación) + salarios vencidos hasta 12 meses (art. 48). Exento ISR: 90 UMA por año de servicio (LISR art. 93 fr. XIII) | Tope prima antigüedad $630.08 / $881.74 por día | Enero (SM) y febrero (UMA) | LFT; [DOF 09/12/2025](https://dof.gob.mx/nota_detalle.php?codigo=5775534&fecha=09/12/2025) | Topes: Primaria. Fórmula: Secundaria ([SDV, arts. 48, 50, 162](https://sdv.com.mx/herramientas/calculadora-liquidacion/)). Ojo: la procedencia de los "20 días por año" es la parte más discutida; mostrarla como opción con explicación, no como regla fija |
| 4 | **Vacaciones dignas y prima vacacional** | LFT art. 76 y 78 (DOF 27/12/2022); art. 80 | Días: 1 año 12; 2: 14; 3: 16; 4: 18; 5: 20; 6-10: 22; 11-15: 24; 16-20: 26; 21-25: 28; 26-30: 30; luego +2 cada 5 años. Al menos 12 días continuos. Prima vacacional ≥ 25% del salario de esos días; exenta 15 UMA ($1,759.65) | vigente desde 1/01/2023 | No tiene actualización periódica | [DOF 27/12/2022, codigo 5675889](https://dof.gob.mx/nota_detalle.php?codigo=5675889&fecha=27/12/2022) | Art. 76/78: Primaria. Art. 80 (25%): Secundaria |
| 5 | **PTU / reparto de utilidades** | LFT arts. 117 a 131 (art. 127 fr. VIII, tope); LISR art. 9 y 93 fr. XIV | 10% de la renta gravable. 50% por días trabajados, 50% por salarios. Tope individual: 3 meses de salario o promedio de PTU de los últimos 3 años (lo más favorable). Mínimo 60 días trabajados (eventuales). Exento 15 UMA ($1,759.65) | Pago: personas morales hasta 30/05; físicas hasta 29/06 (2026) | Anual | LFT (inaccesible) | Secundaria ([SDV](https://sdv.com.mx/recursos/calculo-ptu-2026/), [Siigo](https://www.siigo.com/mx/blog/derecho-laboral/calculo-de-ptu-reparto-utilidades/)) |
| 6 | **Salario mínimo 2026 (diario, quincenal, mensual)** | Art. 123 A fr. VI; LFT arts. 90-97 | Diario × días. Mensual de referencia CONASAMI: × 30.4 (o 30.4167 según quién lo publique: $9,577.22 vs $9,582.47) | $315.04 / $440.87 | Resolución CONASAMI en diciembre, vigente 1/01/2027 | [DOF 09/12/2025](https://dof.gob.mx/nota_detalle.php?codigo=5775534&fecha=09/12/2025) | Primaria |
| 7 | **Horas extras (con calendario 40 horas)** | LFT arts. 59, 61, 66, 67 (derogado 2o párrafo), 68, transitorios 2o y 4o (DOF 1/05/2026) | Valor hora = salario diario / horas de la jornada (8 diurna, 7 nocturna, 7.5 mixta). Extra dentro del límite semanal del año: × 2. Excedente (máx. 4 h/semana): × 3. Exención ISR (LISR art. 93 fr. I): quien gana el salario mínimo, exento lo doble dentro del límite legal; el resto, 50% exento hasta 5 UMA por semana | Límite 2026: 9 h/semana dobles | 1/01/2027 (46 h ordinarias, 9 extra) | [DOF 01/05/2026](https://dof.gob.mx/nota_detalle.php?codigo=5786537&fecha=01/05/2026) | LFT: Primaria. Exención ISR horas extra: Secundaria |
| 8 | **UMA a pesos / multas** | LDVUMA | UMA × cantidad | $117.31 | INEGI la publica en enero (DOF ~9/01), rige 1/02 | [DOF 09/01/2026](https://dof.gob.mx/nota_detalle.php?codigo=5778072&fecha=09/01/2026) | Primaria |
| 9 | **RESICO personas físicas** | LISR art. 113-E | Tasa sobre ingresos cobrados del mes, sin deducciones: hasta $25,000: 1.00%; hasta $50,000: 1.10%; hasta $83,333.33: 1.50%; hasta $208,333.33: 2.00%; hasta $3,500,000 anual: 2.50% | 2026 (montos fijos en ley, no se actualizan por inflación) | Solo por reforma a LISR | LISR (inaccesible) | Secundaria ([SDV art. 113-E](https://sdv.com.mx/compendio/ley-isr/articulo-113-e/), [Alegra](https://blog.alegra.com/mexico/resico-personas-fisicas/)) |
| 10 | **Declaración anual de personas físicas / ISR anual** | LISR art. 150-152; Anexo 8 RMF 2026 apartado C | Tarifa anual 2026: 0.01-10,135.11 (0, 1.92%); 10,135.12-86,022.11 (194.59, 6.40%); 86,022.12-151,176.19 (5,051.37, 10.88%); 151,176.20-175,735.66 (12,140.13, 16%); 175,735.67-210,403.69 (16,069.64, 17.92%); 210,403.70-424,353.97 (22,282.14, 21.36%); 424,353.98-668,840.14 (67,981.92, 23.52%); 668,840.15-1,276,925.98 (125,485.07, 30%); 1,276,925.99-1,702,567.97 (307,910.81, 32%); 1,702,567.98-5,107,703.92 (444,116.23, 34%); 5,107,703.93 en adelante (1,601,862.46, 35%). Deducciones personales: tope 5 UMA anuales o 15% del ingreso (NO VERIFICADO esta sesión) | Ejercicio 2026, se declara en abril 2027 | Anual | [Anexo 8 RMF 2026](https://dof.gob.mx/nota_detalle.php?codigo=5777219&fecha=28/12/2025) | Tarifa: Primaria (es la tabla de enajenación de inmuebles del mismo anexo, idéntica a mensual × 12). Tope de deducciones: NO VERIFICADO |
| 11 | **Infonavit (aportación y crédito) / Afore** | Ley Infonavit art. 29 (5% patronal); LSS art. 168 (cesantía y vejez, cuota patronal progresiva 2023-2030) | Infonavit: 5% del SBC (patrón). Afore: retiro 2% patronal + cesantía y vejez patronal según rango de SBC + 1.125% obrero + cuota social | CyV patronal 2026: 3.150% (1 SM) a 7.513% (desde 4.01 UMA) | 1 de enero de cada año hasta 2030 | NO VERIFICADO primario | Secundaria ([El Contribuyente](https://www.elcontribuyente.mx/2025/11/asi-cambiaran-las-cuotas-patronales-del-imss-en-2026-tablas-y-ajustes-clave/)) |
| 12 | **Inflación INPC / actualizar montos** | Ley del SNIEG; CFF art. 17-A (factor de actualización) | Factor = INPC mes reciente / INPC mes antiguo | Agosto 2026: 145.462 | Quincenal y mensual (INEGI, publicado también en DOF) | [DOF 10/09/2026](https://dof.gob.mx/nota_detalle.php?codigo=5798385&fecha=10/09/2026) | Primaria |
| 13 | **CETES / inversión** | Banxico, subastas semanales | Rendimiento = monto × tasa × días / 360; retención ISR por intereses (tasa 2026 NO VERIFICADO) | ver §1 | Semanal (martes) | Banxico SIE (token) | Secundaria / NO VERIFICADO |
| 14 | **Trabajadoras del hogar (IMSS obligatorio + finiquito)** | LFT arts. 331 a 343; LSS arts. 239-A a 239-H (DOF 16/11/2022, vigor 17/11/2022) | Mismo esquema de finiquito/aguinaldo/vacaciones; inscripción obligatoria al IMSS | SM general | Con el SM | NO VERIFICADO primario | Secundaria ([IDC](https://idconline.mx/seguridad-social/2022/11/17/oficializan-la-afiliacion-obligatoria-de-las-trabajadoras-domesticas)) |
| 15 | **Pensión alimenticia** | Códigos civiles/familiares de cada estado; criterio judicial (proporcionalidad necesidad/capacidad) | **No hay fórmula legal única.** Cualquier porcentaje fijo es práctica judicial, no ley | n/a | n/a | n/a | No publicar como "cálculo legal"; a lo sumo simulador con aviso |

## 3. Fuentes automatizables (probadas el 7/10/2026)

| Fuente | URL exacta | Formato | Frecuencia | Token | Resultado de la prueba |
|---|---|---|---|---|---|
| **API SIDOF (DOF): notas del día** | `https://sidofqa.segob.gob.mx/dof/sidof/notas/DD-MM-YYYY` | JSON (`NotasMatutinas`, `NotasVespertinas`, `NotasExtraordinarias`, con `codNota` y `titulo`) | diaria | No | **Respondió 200.** Con esto se detectaron por título: CONASAMI (09-12-2025, 5775534), subsidio (31-12-2025, 5777649), INPC (10-09-2026, 5798385). Es el equivalente directo al cron de Boletín Oficial de calcular.ar |
| API SIDOF: indicadores | `https://sidofqa.segob.gob.mx/dof/sidof/indicadores/` y `.../indicadores/{codTipo}/{DD-MM-YYYY}/{DD-MM-YYYY}` | JSON | diaria | No | **Respondió 200.** 158 = dólar FIX (18.1343 el 6/10), 159 = UDIS (8.845713). 165, 166, 174, 175 son tasas (TIIE) pero el mapeo exacto de cada código: NO VERIFICADO |
| DOF texto de la nota | `https://dof.gob.mx/nota_detalle.php?codigo={codNota}&fecha=DD/MM/YYYY` | HTML | por nota | No | Respondió 200 con cortes ("connection reset"); usar reintentos (`--retry`). Ojo: `www.dof.gob.mx` falla por certificado, usar `dof.gob.mx` |
| Banxico SIE API | `https://www.banxico.org.mx/SieAPIRest/service/v1/series/{serie}/datos/oportuno` (ej. CETES 28 `SF43936`, header `Bmx-Token`) | JSON | diaria/semanal | **Sí** (gratuito, registro en `https://www.banxico.org.mx/SieAPIRest/service/v1/token`) | Sin token: HTTP 400 "Token inválido". Endpoint vivo; falta token. No hay token en envkit (`envkit for banxico`: servicio no catalogado) |
| INEGI API de indicadores (BIE) | `https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/{id}/es/0700/false/BIE/2.0/{token}?type=json` | JSON | según indicador | **Sí** (gratuito) | Sin token válido: HTTP 400 "No se encontraron resultados". Alternativa sin token: INPC desde la API SIDOF (INEGI lo publica en el DOF) |
| SAT / Anexo 8 RMF | DOF (vía SIDOF) | HTML | anual (fines de diciembre) + cuando cambie | No | Probado: el Anexo 8 2026 se lee completo del DOF |

Recomendación de cron: (1) diario a las 8:00 CDMX, leer SIDOF `notas/` del día y matchear títulos ("Salarios Mínimos", "Unidad de medida y actualización", "subsidio para el empleo", "Índice nacional de precios", "Resolución Miscelánea Fiscal", "Ley Federal del Trabajo", "Ley del Seguro Social"); abrir PR con el texto extraído. (2) diario: indicadores SIDOF (FIX, UDIS). (3) Banxico SIE con token para CETES y tasa objetivo.

## 4. Idioma, tono y formato

| Tema | Recomendación | Evidencia |
|---|---|---|
| Tratamiento | **Tú** en el sitio (todos los competidores observados usan tú: "Calcula tu finiquito"). Usted solo en textos legales | Observado en competidores, 7/10/2026 |
| Números | `$9,582.47`: coma de miles, punto decimal, signo `$` adelante. Para distinguir de dólares: "$315.04 MXN" o "pesos" | DOF usa "$11,492.66", "$117.31" (Primaria) |
| Vocabulario | sueldo/salario, quincena, recibo de nómina, aguinaldo, finiquito vs liquidación, prima vacacional, prima de antigüedad, PTU o reparto de utilidades, patrón (la ley ahora dice "persona empleadora"), SBC, SDI, UMA, RFC, CURP, IMSS, Infonavit, Afore, "días de descanso obligatorio" | DOF 01/05/2026 usa "persona empleadora/trabajadora" |
| Periodos de pago | La nómina mexicana es **quincenal** en su mayoría: toda calculadora debe ofrecer semanal, decenal, quincenal y mensual (el Anexo 8 trae tablas de 7, 10, 15 días y mensual) | Anexo 8 RMF 2026 (Primaria) |
| Zona | Selector "Zona general / Zona Libre de la Frontera Norte" en salario mínimo, finiquito e IVA | Resolución CONASAMI |

## 5. Competencia (búsquedas principales)

Método: resultados de buscador del agente (no es Google México con geolocalización) el 6-7/10/2026, más carga directa de los sitios. **No es un ranking de Google MX verificado**: confirmar con Search Console / Ahrefs (MCP pide autenticación).

| Búsqueda | Quién aparece | Lectura |
|---|---|---|
| calculadora finiquito / liquidación 2026 | elconta.mx, hacecuentas.com, cotizadorhipotecario.mx, calcuris.com, sdv.com.mx, Alegra; oficial: calculadora de la STPS en `conciliacionyarbitraje.app/calculadora` | Saturado. Hueco: explicar finiquito vs liquidación con el caso de los 20 días y salarios vencidos, y entregar un informe PDF |
| calculadora sueldo neto / ISR quincenal 2026 | contadormx.com, hacecuentas.com, calculoseguro.mx, calcforlife.com, sdv.com.mx, runahr.com | Saturado. Hueco: subsidio con la fórmula correcta (535.65, no 536.22), IMSS completo |
| calculadora aguinaldo 2026 | runahr.com, hacecuentas.com (varias URLs), cotizadorhipotecario.mx, contable.app | Saturado y con errores (exención mal calculada) |
| calculadora PTU 2026 | runahr.com, Siigo, hacecuentas.com, contadormx.com, calcforlife.com, sdv.com.mx | Medio. Pico mayo |
| salario mínimo 2026 / UMA 2026 | IDC Online, contadormx, Alegra, Facturama, El Contribuyente, medios (UnoTV, El Financiero) | Medios fuertes; difícil ganar el informativo, sí la calculadora |
| horas extra 2026 / jornada 40 horas | idconline, cegid, elcontribuyente, factorial | **Hueco real**: calculadoras de horas extra con el calendario 2026-2030 son escasas y al menos un medio fuerte tiene el transitorio mal |

Competidores clave: **hacecuentas.com** (argentino, multi-país, mismo playbook); **calculoseguro.mx** (~190 calculadoras, muchas de nicho); **sdv.com.mx** (despacho contable, cita artículos); **contadormx.com / elcontribuyente.mx / idconline.mx** (contenido fiscal con autoridad); HR SaaS (**Runa, Factorial, Siigo, Alegra**) que usan calculadoras como lead magnet. Evaluación honesta: en las 5 búsquedas grandes (sueldo neto, aguinaldo, finiquito, PTU, ISR) no hay hueco de existencia, hay hueco de **calidad y frescura**. El hueco de existencia está en la reforma de 40 horas (horas extra por año, costo de reducción de jornada, registro electrónico 2027).

## 6. Productos pagos posibles

| Producto | Para quién | Por qué paga | Pico |
|---|---|---|---|
| Planilla Excel de **nómina quincenal 2026** (ISR art. 96 + subsidio + IMSS obrero/patronal + Infonavit), actualizada en enero/febrero | PyMEs y contadores independientes | Ahorra horas cada quincena; la competencia gratuita no hace patronal completo | enero-febrero |
| **Informe PDF de finiquito o liquidación** con desglose por artículo de la LFT | Trabajador despedido que va a conciliación | Documento para negociar | todo el año, sube en enero |
| Planilla de **PTU** (reparto por días y salarios con topes) | Empresas | Cálculo obligatorio anual con topes complejos | abril-mayo |
| Kit **jornada 40 horas + registro electrónico** (control de horas, extras dobles/triples por año) | PyMEs | Obligación nueva desde 1/01/2027 con multa de 250 a 5,000 UMA | nov 2026 a ene 2027 |

Medios de pago: **Mercado Pago Checkout Pro opera en México** (confirmado en la documentación oficial el 7/10/2026): tarjeta crédito/débito, transferencia SPEI, OXXO, Paycash, Banamex, Santander, BBVA, cuenta Mercado Pago y Meses sin Tarjeta. Fuente: [Mercado Pago Developers MX](https://www.mercadopago.com.mx/developers/es/docs/checkout-pro/overview). OXXO y SPEI son claves para quien no usa tarjeta.

## 7. Calendario de picos

| Mes | Pico | Base |
|---|---|---|
| Enero | Salario mínimo nuevo (rige 1/01), finiquitos post diciembre, nueva jornada (46 h desde 1/01/2027), registro electrónico (1/01/2027) | DOF |
| Febrero | UMA nueva (rige 1/02) | LDVUMA art. 5 |
| Marzo-abril | Declaración anual personas morales (marzo) y físicas (abril); devoluciones de ISR | LISR |
| Mayo-junio | **PTU** (morales hasta 30/05, físicas hasta 29/06) | LFT art. 122 |
| Abril y julio-agosto | Vacaciones (Semana Santa y verano), prima vacacional | LFT art. 76 |
| Noviembre-diciembre | **Aguinaldo** (pago antes del 20/12), anuncio del salario mínimo (CONASAMI, principios de diciembre) | LFT art. 87 |
| Quincenal | INPC (dos publicaciones al mes) | INEGI/DOF |

## 8. NO VERIFICADO (pendiente antes de publicar)

1. Texto consolidado de LFT arts. 48, 50, 80, 87, 127, 162, 485, 486 (diputados.gob.mx inaccesible): fórmulas tomadas de fuentes secundarias concordantes.
2. Tasas IMSS obreras y tabla de cesantía y vejez patronal 2026 (solo secundaria).
3. Tasas RESICO PF (solo secundaria, aunque estables en ley).
4. Tope de deducciones personales anuales y tasa de retención ISR por intereses 2026.
5. CETES 28 días de la última subasta (necesita token Banxico).
6. IVA fronterizo 8% vigente en 2026 (decreto de estímulos).
7. Mapeo de códigos 165/166/174/175 de la API SIDOF.
8. Fecha exacta de publicación del INPC de septiembre 2026.
9. Iniciativas de aguinaldo de 30 días (estado legislativo).
10. Volúmenes de búsqueda (orden estimado, no medido).

## 9. Atractivo del mercado: 7/10

A favor: mercado enorme, nómina quincenal (más búsquedas recurrentes), dos reformas laborales con calendario hasta 2030 que obligan a recalcular todo, API SIDOF abierta y sin token (automatización equivalente al Boletín Oficial), Mercado Pago con OXXO/SPEI. En contra: SERP muy competida en las búsquedas grandes, incluido un clon argentino del modelo (hacecuentas.com) y SaaS de RRHH con mucha autoridad. Estrategia de entrada: arrancar por la cuña de la reforma 40 horas + horas extra + registro electrónico (hueco real), y competir en sueldo neto/aguinaldo/finiquito por exactitud demostrable (cita al DOF con fecha en cada número).
