# Venezuela: investigación para replicar calcular.ar

Fecha de corte: 6-7 de octubre de 2026. Cada dato lleva valor, vigencia, fuente y fecha de verificación. «NO VERIFICADO» significa que no se pudo confirmar en fuente primaria en esta sesión.

Convención de fuentes:
- **P** = fuente oficial primaria (BCV, Gaceta Oficial, SENIAT, ministerios).
- **S** = prensa, ONG jurídica (Acceso a la Justicia) o blog.

Limitaciones de acceso probadas el 06/10/2026:
- **SENIAT** (seniat.gob.ve, seniatenlinea.seniat.gob.ve): no respondió (timeout) desde esta máquina. Todo dato tributario queda en fuente S.
- **Ministerio del Trabajo** (mpppst.gob.ve): 403.
- **Gaceta Oficial** (tsj.gob.ve/gaceta-oficial): responde 200 pero el listado es dinámico (JS); no se pudo leer el contenido.
- **BCV** (bcv.org.ve): responde, pero con cadena de certificados TLS incompleta (falla en clientes estrictos; funciona con `curl -k`). Es la única fuente primaria confiable y automatizable.

## 0. Contexto que condiciona todo (2026)

| Hecho | Dato | Fuente | Verificado |
|---|---|---|---|
| Gobierno | Presidenta encargada Delcy Rodríguez | S: [Resumen Latinoamericano 03/10/2026](https://www.resumenlatinoamericano.org/2026/10/03/venezuela-presidenta-e-delcy-rodriguez-destaca-que-venezuela-acumula-22-trimestres-de-crecimiento-economico) | 06/10/2026 |
| Tipo de cambio oficial BCV | **873,867 Bs/USD**; 984,263 Bs/EUR | P: [bcv.org.ve](https://www.bcv.org.ve/), «Fecha Valor: Miércoles, 07 Octubre 2026» | 07/10/2026 |
| Devaluación | +193% en el año y +367% interanual (873,87 vs 187,29 el 07/10/2025) | S: [Finanzas Digital](https://finanzasdigital.com/tasa-de-cambio-bcv-07-octubre-2026/) | 07/10/2026 |
| Política cambiaria | «Devaluación agresiva» desde julio para cerrar brecha con el paralelo (paralelo ~800 en julio) | S: [Infobae 10/07/2026](https://www.infobae.com/venezuela/2026/07/10/delcy-rodriguez-ejecuta-una-devaluacion-agresiva-para-cerrar-la-brecha-cambiaria-en-venezuela/) | 06/10/2026 |
| Inflación | 8,4% mensual en septiembre 2026; 225,3% acumulada en el año | P: portada BCV (bloque INPC «Septiembre - 2026») | 07/10/2026 |
| Sanciones | Alivio de sanciones en 2026: Binance incorporó bancos públicos venezolanos a P2P (15/04/2026) | S: [iProUP](https://www.iproup.com/economia-digital/66862-binance-suma-bancos-publicos-en-venezuela-y-flexibiliza-pagos-p2p-tras-alivio-de-sanciones). Alcance exacto de licencias OFAC: NO VERIFICADO | 06/10/2026 |

Implicancia: con ~8% de inflación mensual y devaluación diaria, **cualquier monto en bolívares queda viejo en semanas**. Los únicos valores estables están indexados a USD (ingreso mínimo integral, cestaticket) o a la UT. Una calculadora venezolana tiene que trabajar en USD y convertir con la tasa BCV del día.

## 1. Mapa de calculadoras (ordenado por demanda estimada)

**De dónde sale la estimación:** no hubo acceso a Keyword Planner, Ahrefs ni Similarweb (conectores sin autorizar). Orden cualitativo basado en: (a) cantidad de sitios y notas diarias dedicadas (la tasa BCV tiene notas diarias en NTN24, RPP, Finanzas Digital, La Verdad de Monagas), (b) recurrencia, (c) cantidad de calculadoras dedicadas de competidores, (d) analogía con calcular.ar. Hipótesis a validar.

| # | Calculadora (nombre local) | Recurrencia | Comentario |
|---|---|---|---|
| 1 | Dólar BCV hoy / conversor Bs-USD-EUR | Diaria | Volumen altísimo, dominado por medios. Puerta de entrada para todo lo demás |
| 2 | Prestaciones sociales (garantía vs retroactivo + intereses) | Permanente | La calculadora laboral estrella |
| 3 | Liquidación laboral completa | Permanente | Prestaciones + vacaciones y bono vacacional fraccionados + utilidades fraccionadas |
| 4 | Utilidades (aguinaldo venezolano) | Anual, pico nov-dic | |
| 5 | Vacaciones y bono vacacional | Permanente, pico jul-ago | |
| 6 | Ingreso mínimo integral / salario mínimo en Bs | Cada anuncio (1 de mayo) + diario por tasa | |
| 7 | Cestaticket en bolívares | Diario por tasa | |
| 8 | IVA + IGTF (precio final cobrando en divisas) | Permanente | Comercios |
| 9 | ISLR personas naturales (UT, desgravamen, rebajas) | Anual, pico ene-mar | |
| 10 | Inflación (INPC BCV) y actualización de montos | Mensual | Ahora que el BCV volvió a publicar |
| 11 | Unidad tributaria a Bs / multas en «moneda de mayor valor» | Permanente | Contadores |
| 12 | Contribución especial de pensiones 9% | Mensual | Empresas |

### 1.1 Fichas

#### Tasa oficial BCV
| Campo | Dato |
|---|---|
| Valor | USD 873,86700000; EUR 984,26261811; CNY 130,34; TRY 17,77; RUB 10,23 (Bs por unidad) |
| Vigencia | Fecha valor 07/10/2026. Se publica cada día hábil con fecha valor del día hábil siguiente |
| Fuente P | [bcv.org.ve](https://www.bcv.org.ve/) (portada); histórico trimestral en XLS en [estadisticas/tipo-cambio-de-referencia-smc](https://www.bcv.org.ve/estadisticas/tipo-cambio-de-referencia-smc) |
| Verificado | 07/10/2026 (scraping propio de la portada) |

#### Salario mínimo e ingreso mínimo integral
| Componente | Valor | Base / fuente | Verificado |
|---|---|---|---|
| Salario mínimo | **Bs 130** mensual (sin cambios desde marzo 2022; ~USD 0,15 a tasa BCV del 07/10/2026) | Decreto 4.653 (marzo 2022), citado por S. Número de Gaceta: NO VERIFICADO | 06/10/2026 |
| Cestaticket socialista | USD 40 indexado, pagado en Bs a tasa BCV | S: Ministro del Trabajo Carlos Alexis Castillo, 04/05/2026 | 06/10/2026 |
| Bono contra la guerra económica | USD 200 | Idem | 06/10/2026 |
| **Ingreso mínimo integral** | **USD 240** (= Bs 209.728 al 07/10/2026) | Anuncio 30/04-04/05/2026. S: [Efecto Cocuyo](https://efectococuyo.com/politica/ministro-del-trabajo-confirma-que-no-hubo-aumento-del-salario-minimo-el-incremento-fue-200-de-bono-de-guerra-y-40-de-cestatickets/), [Bloomberg Línea](https://www.bloomberglinea.com/latinoamerica/venezuela/como-se-pagara-el-salario-minimo-2026-en-venezuela-aumento-funcionara-con-bonos/). **Decreto y Gaceta: NO VERIFICADO** (las notas no citan número) | 06/10/2026 |
| Pensión | USD 70 por vía de bonos | Idem | 06/10/2026 |
| ¿Obliga al sector privado? | Efecto Cocuyo reporta que el ministro dijo que las privadas deben garantizar el ingreso integral; no hay norma publicada que lo respalde. **NO VERIFICADO** | | |
| Clave para calcular | Prestaciones, vacaciones, utilidades, cajas de ahorro y cuotas sindicales **se calculan sobre el salario (Bs 130), no sobre el ingreso integral**, porque los bonos son no salariales (lo confirma el ministro según Bloomberg Línea) | | 06/10/2026 |
| Próxima actualización | Históricamente el 1 de mayo. 2027: NO VERIFICADO |

Problema de producto: una calculadora de prestaciones con el salario mínimo legal da cifras ridículas (centavos de dólar). En la práctica las empresas pagan salarios en USD convertidos y una parte como bonos no salariales. La calculadora tiene que pedir el **salario real** y separar porción salarial de no salarial, con advertencia legal clara.

#### Prestaciones sociales (LOTTT art. 142)
| Literal | Regla |
|---|---|
| a) Garantía | 15 días de **salario integral** por trimestre, con base en el salario del último mes del trimestre, depositados |
| b) Días adicionales | Después del primer año, 2 días por año, acumulativos hasta 30 días, con el **salario integral promedio** del año |
| c) Retroactivo | Al terminar la relación: 30 días por año o fracción superior a 6 meses, con el **último salario** |
| d) Se paga el mayor | Max(a + b, c) |
| Intereses (art. 143) | Tasa fijada por el BCV. Activa: para mora (arts. 128, 130, 142 f, 143 cuarto aparte). Promedio activa-pasiva: prestaciones en contabilidad del patrono (art. 143 tercer aparte) |
| Anticipos | Hasta 75% de la garantía (art. 144) |
| Salario integral | Salario normal + alícuota de utilidades + alícuota de bono vacacional |

- Ley: Decreto LOTTT, **Gaceta Oficial N° 6.076 Extraordinario del 07/05/2012** (número confirmado en la nota al pie del archivo oficial del BCV, ver abajo). Texto primario de la ley no consultado (Gaceta no accesible).
- Interpretación de la base salarial: Sala de Casación Social, Sentencia N° 01 del 19/01/2016 (S: [Acceso a la Justicia](https://accesoalajusticia.org/sentencia-que-establece-la-base-salarial-de-calculo-para-la-garantia-de-prestaciones-sociales/)), citada textualmente: «quince (15) días de salario integral a calcular con base al salario del último mes».

**Tasa de interés sobre prestaciones (dato automatizable, P):**

| Mes | Promedio activa-pasiva | Activa | Gaceta | Fecha Gaceta |
|---|---|---|---|---|
| Julio 2026 | 47,52% | 59,04% | 43.441 | 20/08/2026 |
| Junio 2026 | 47,56% | 59,12% | 43.418 | 17/07/2026 |

Fuente P: [BCV 1_3_18.xlsx](https://www.bcv.org.ve/sites/default/files/GEE%20-%20Tasas%20de%20Interes/1_3_18.xlsx), descargado el 06/10/2026. Base: Resolución BCV 21-01-03 (Gaceta 42.050 del 19/01/2021). Publicación con ~50 días de rezago (agosto 2026 todavía no estaba).

#### Utilidades (LOTTT art. 131)
| Campo | Dato |
|---|---|
| Fórmula | 15% de los beneficios líquidos de la empresa repartidos entre trabajadores; **mínimo 30 días** y **máximo 120 días** de salario por año. Fraccionadas: proporcional a meses trabajados |
| Base salarial | Salario normal devengado en el ejercicio (S) |
| Fuente | S (finiquitojusto, g-talent, búsquedas). Texto primario: NO VERIFICADO. Plazo de pago y adelanto de diciembre (art. 132): NO VERIFICADO |

#### Vacaciones y bono vacacional (LOTTT arts. 190 y 192)
| Concepto | Primer año | Por año adicional | Tope |
|---|---|---|---|
| Vacaciones | 15 días hábiles | +1 día hábil | 15 días adicionales (30 total) |
| Bono vacacional | 15 días de salario normal | +1 día | 30 días |

Fuente S, consistente entre fuentes. Texto primario: NO VERIFICADO.

#### Unidad Tributaria (UT)
| Campo | Dato |
|---|---|
| Valor | **Bs 43,00** (antes Bs 9,00; +377,7%) |
| Vigencia | Desde Gaceta N° 43.140 del 02/06/2025. Sigue vigente en oct-2026 (no se encontró reajuste posterior) |
| Instrumento | Providencia Administrativa SNAT/2025/000048 |
| Fuente | S: [Acceso a la Justicia](https://accesoalajusticia.org/reajustado-el-valor-de-la-unidad-tributaria-u-t-a-bs-4300/), [Finanzas Digital](https://finanzasdigital.com/reajuste-unidad-tributaria-venezuela-43-bolivares/), PwC y Forvis Mazars (notas profesionales). SENIAT no accesible: **P NO VERIFICADO** |
| Observación | 1 UT = USD 0,049 a tasa BCV del 07/10/2026. Al ritmo de devaluación actual, el umbral de ISLR alcanza a casi cualquier ingreso formal. Probable reajuste en 2027 (sin fecha, NO VERIFICADO) |

#### ISLR personas naturales residentes
| Elemento | Valor |
|---|---|
| Obligados a declarar | Enriquecimiento neto > 1.000 UT (Bs 43.000) o ingresos brutos > 1.500 UT (Bs 64.500) |
| Desgravamen único | 774 UT (Bs 33.282) |
| Rebaja personal | 10 UT; por carga familiar 10 UT c/u |
| Tarifa N° 1 (art. 50 Ley ISLR) | 6% a 34% progresiva por tramos en UT (hasta 1.000 UT 6%; 1.000-1.500 9%; 1.500-2.000 12%; 2.000-2.500 16%; 2.500-3.000 20%; 3.000-4.000 24%; 4.000-6.000 29%; más de 6.000 34%) |
| Plazo | Declaración anual hasta el 31 de marzo |
| Fuente | S (hacecuentas, Diario de los Andes, KPMG 2023). Tramos y sustraendos: **NO VERIFICADO en P** (SENIAT inaccesible); los tramos listados son los de la ley vigente según conocimiento previo, reconfirmar antes de publicar |

#### IVA e IGTF
| Impuesto | Valor | Base | Estado |
|---|---|---|---|
| IVA general | 16% (reducida 8%) | Ley de IVA | Vigente según todas las fuentes S; P NO VERIFICADO |
| IGTF pagos en divisas o cripto | **3%** (la ley permite 2% a 8%) | Ley de IGTF (reforma 2022) y decreto de alícuota | Vigente (S) |
| IGTF en bolívares para sujetos pasivos especiales | 0% | Decreto 4.972 de 12/07/2024 (S: [Acceso a la Justicia](https://accesoalajusticia.org/fue-eliminado-impuesto-grandes-transacciones-financieras/)). La nota cita «Gaceta 6.281», número que no cuadra con la numeración extraordinaria de 2024: **NO VERIFICADO** | Vigente (S) |

#### Contribución especial de pensiones
| Campo | Dato |
|---|---|
| Valor | 9% del total pagado a trabajadores (salario y bonos no salariales) |
| Base | Ley de Protección de las Pensiones de Seguridad Social; Decreto 4.952, Gaceta 42.880 del 16/05/2024 (S: [Acceso a la Justicia](https://accesoalajusticia.org/fijado-en-9-el-monto-de-la-contribucion-especial-prevista-en-la-ley-de-proteccion-de-las-pensiones-de-seguridad-social/)) |
| Piso de la base (ingreso mínimo integral) | NO VERIFICADO |

#### Moneda de referencia, Petro y multas
| Tema | Dato | Estado |
|---|---|---|
| Petro | Eliminado: cierre del monedero y conversión a Bs el 15/01/2024 (S: [CriptoNoticias](https://criptonoticias.com/comunidad/gobierno-venezuela-elimina-monedero-petro)). El menú del BCV conserva la sección histórica «Petro» | No usar |
| Multas tributarias | El Código Orgánico Tributario (reforma 2020) las expresa con el tipo de cambio oficial de la **moneda de mayor valor** publicada por el BCV. Hoy esa moneda es el **euro** (EUR 984,26 > USD 873,87 en la portada del BCV del 07/10/2026) | Artículo exacto: NO VERIFICADO |
| Moneda de cuenta real | USD (salarios, ingreso integral, precios); bolívares para pago | |

#### Inflación (INPC)
| Indicador | Valor | Fuente |
|---|---|---|
| Septiembre 2026, mensual | 8,4% | P: portada BCV |
| Acumulada 2026 a septiembre | 225,3% | P: portada BCV |
| Agosto 2026, mensual / interanual | 8,9% / 534,2% | S: [Finanzas Digital](https://finanzasdigital.com/inflacion-de-venezuela-desacelera-a-8-9-en-agosto-bcv/) |
| Enero / febrero 2026 | 32,6% / 14,6% | S: [La Patilla 06/03/2026](https://lapatilla.com/2026/03/06/bcv-registro-una-inflacion-acumulada-de-519-en-los-dos-primeros-meses-de-2026/) |

**Cuál es oficial y qué tan regular es:** la oficial es la del **BCV** (INPC). El BCV **dejó de publicar desde octubre de 2024** y **reanudó en marzo de 2026** (publicó enero y febrero juntos); desde entonces publica mensualmente con ~1 semana de rezago (septiembre ya estaba el 07/10/2026). Alternativa histórica: Observatorio Venezolano de Finanzas (vinculado a la AN opositora); si publica en 2026 y con qué regularidad: NO VERIFICADO. Riesgo real: el BCV ya cortó la serie una vez; un producto que dependa de la inflación oficial puede quedarse sin dato meses.

## 2. Fuentes automatizables (probadas el 06-07/10/2026)

| Dato | URL | Formato | Frecuencia | ¿Respondió? |
|---|---|---|---|---|
| Tasa oficial USD/EUR/CNY/TRY/RUB + bloque INPC | `https://www.bcv.org.ve/` (ids `#dolar`, `#euro`, etc.) | HTML (Drupal) | Diaria | Sí, 200, 151 KB. Requiere aceptar cadena TLS incompleta |
| Histórico de tasas oficiales | `https://www.bcv.org.ve/sites/default/files/EstadisticasGeneral/2_1_2{a,b,c,d}26_smc.xls` (letra = trimestre, 26 = año) | XLS | Diaria, archivo trimestral | Sí, 200 (archivo `d26` guardado el 06/10/2026) |
| INPC | `https://www.bcv.org.ve/sites/default/files/precios_consumidor/4_5_7.xls`, `4_1_7.xls`, etc. (listado en `/estadisticas/consumidor`) | XLS | Mensual | Sí, 200 |
| Tasa de interés de prestaciones sociales | `https://www.bcv.org.ve/sites/default/files/GEE%20-%20Tasas%20de%20Interes/1_3_18.xlsx` | XLSX | Mensual (~50 días de rezago) | Sí, 200; incluye número y fecha de Gaceta de cada tasa |
| Tasas bancarias diarias | `.../GEE%20-%20Tasas%20de%20Interes/1_1_6_diario.xlsx` | XLSX | Diaria | Enlace presente, no descargado |
| UT, calendarios, providencias | SENIAT | | | **No** (timeout) |
| Decretos y Gacetas | `https://www.tsj.gob.ve/gaceta-oficial` | HTML dinámico | | Responde 200 pero sin contenido legible sin JS. No apto como está |
| Ingreso mínimo integral | Sin fuente oficial publicada; solo anuncios | | Anual | **No automatizable**: requiere carga manual |

No existe API JSON oficial. El BCV es scrapeable y estable en estructura de URLs. Lo legal (salario, bonos, UT) no es automatizable: se anuncia por TV o redes y la Gaceta llega tarde o no se cita.

## 3. Idioma, tono y formato

| Tema | Recomendación |
|---|---|
| Tratamiento | **Tú** en general (es el registro de los sitios de calculadoras y medios venezolanos); usted solo en textos legales formales. Nada de voseo |
| Vocabulario | prestaciones sociales, liquidación, utilidades, bono vacacional, vacaciones fraccionadas, salario normal, salario integral, cestaticket, bono de guerra, ingreso mínimo integral, tasa BCV, dólar oficial, dólar paralelo, quincena, nómina, RIF, SENIAT, UT, IGTF, pago móvil, Zelle, Binance, Patria |
| Moneda | Bolívar, **Bs.** con punto (Bs. 873,87). Código VES. Mostrar siempre el equivalente en USD |
| Números | Coma decimal y punto de miles (el BCV publica «873,86700000»). Redondear a 2 decimales para usuarios |
| Fechas | dd/mm/aaaa |

## 4. Competencia (búsquedas del 06/10/2026)

Nota: WebSearch no es Google Venezuela; el orden real de SERP es NO VERIFICADO.

| Búsqueda | Quién aparece | Calidad |
|---|---|---|
| calculadora prestaciones sociales Venezuela | hacecuentas.com/ve (calculadora + anticipo), g-talent.net, finiquitojusto.com, Acceso a la Justicia | hacecuentas es el rival directo: 54 calculadoras venezolanas, actualizado abril 2026 |
| utilidades y bono vacacional | hacecuentas.com/ve, finiquitojusto.com, g-talent.net | Plantillas genéricas multipaís |
| ISLR personas naturales | hacecuentas.com, PwC, Forvis Mazars, Diario de los Andes | Profesionales con autoridad pero sin calculadora |
| IGTF / IVA | usdt.com.ve, impucalculo.com, bodegazo.com, Gálac | Fragmentado |
| unidad tributaria 2026 | alegra.com, nompli.com, Finanzas Digital, Acceso a la Justicia | Blogs de software |
| dólar BCV hoy | Finanzas Digital, NTN24, RPP, La Verdad de Monagas, monitores de paralelo | Saturado por medios con notas diarias |
| salario mínimo / ingreso integral | g-talent.net, vacantes.com, Bloomberg Línea, Efecto Cocuyo | Prensa domina |

Lectura: **hacecuentas.com** (multipaís, ya tiene /ve con 54 calculadoras) y **finiquitojusto.com** (multipaís) ocupan el espacio de calculadoras. Ninguno muestra la tasa de interés BCV de prestaciones actualizada sola ni trabaja en USD con conversión diaria como núcleo. El diferencial de calcular.ar (datos que se actualizan solos) aplica a: tasa BCV, INPC y tasa de prestaciones.

## 5. Productos pagos y medios de cobro

### Productos (2-4)
| Producto | Para quién | Precio orientativo | Comentario |
|---|---|---|---|
| Planilla de nómina bimonetaria (USD a Bs con tasa BCV, separación salario vs bonos no salariales, cestaticket, contribución 9% pensiones, IVSS/FAOV/INCES: porcentajes NO VERIFICADOS) | Contadores, pymes | USD 10-15 | El dolor real: nómina en USD pagada en Bs |
| Planilla de prestaciones con intereses BCV mes a mes (garantía trimestral, días adicionales, retroactivo, intereses con la serie 1_3_18) | Contadores, RR. HH. | USD 8-12 | Se nutre del archivo automatizable del BCV |
| Informe de liquidación en PDF | Trabajadores | USD 2-5 | Poder adquisitivo muy bajo: ticket mínimo |
| Planilla AR-I / ISLR personas naturales | Asalariados | USD 3-5 | Estacional ene-mar |

### Medios de cobro
| Medio | ¿Viable? | Detalle |
|---|---|---|
| MercadoPago | No | No opera en Venezuela |
| Tarjeta internacional vía procesador global | Limitado | Pocos venezolanos tienen tarjeta habilitada para consumo internacional; se usan tarjetas de Binance, Zinli o cuentas en EE. UU. Aceptación de Venezuela por Lemon Squeezy/Paddle/Stripe: NO VERIFICADO (revisar listas de países restringidos y sanciones) |
| **Binance Pay / USDT** | **Sí, el más realista** | Alta adopción de stablecoins; Binance lanzó tarjeta en Venezuela y sumó bancos públicos a P2P en abril 2026 (S: iProUP, CriptoNoticias). Requiere cuenta Binance del comercio |
| Zelle | Sí, para quien tenga cuenta en EE. UU. | Muy usado entre comercios; el cobrador necesita cuenta bancaria en EE. UU. |
| PayPal | Parcial | Común entre freelancers; comisiones altas |
| Pago Móvil (Bs) | Solo con cuenta bancaria venezolana y RIF | Sin socio local no es viable |

Conclusión: **se puede cobrar, pero con fricción**: Binance Pay/USDT como canal principal y Zelle/PayPal como secundarios. Precios muy bajos y riesgo de cumplimiento (sanciones) a revisar con asesor antes de facturar.

## 6. Calendario de picos de búsqueda

| Momento | Pico | Por qué |
|---|---|---|
| Diario | Dólar BCV, conversor, cestaticket en Bs | Devaluación diaria |
| Enero-31 de marzo | ISLR, AR-I, UT | Declaración anual |
| Primera semana de cada mes | Inflación | Publicación BCV (desde mar-2026) |
| ~20 de cada mes | Tasa de prestaciones | Publicación BCV en Gaceta |
| 30 de abril-1 de mayo | Salario mínimo, ingreso mínimo integral, bono de guerra | Anuncio presidencial habitual |
| Julio-agosto | Vacaciones y bono vacacional | Vacaciones escolares |
| Noviembre-diciembre | Utilidades | Pago de fin de año |
| Todo el año | Prestaciones y liquidación | |

## 7. ¿Los datos son mantenibles y verificables? (evaluación honesta)

| Dato | Mantenible | Verificable | Comentario |
|---|---|---|---|
| Tasa BCV | Sí, automático | Sí (P) | Scraping estable de la portada + XLS trimestral |
| INPC | Sí, automático | Sí (P) | Pero el BCV ya cortó la serie 17 meses (oct-2024 a mar-2026) |
| Tasa de prestaciones | Sí, automático | Sí (P, con Gaceta) | El mejor dato del país para un producto |
| Fórmulas LOTTT | Sí, estables desde 2012 | Parcial | Texto primario no accesible en línea desde aquí |
| Salario, bonos, cestaticket | No, manual | **No**: se anuncian sin Gaceta citada | Y su obligatoriedad privada es ambigua |
| UT, ISLR, IVA, IGTF | Manual, cambian poco | **No en P** (SENIAT inaccesible) | Depender de PwC/Mazars como verificación |

Veredicto: lo **cambiario y monetario** es tan automatizable como en Argentina. Lo **laboral y tributario** es verificable solo a medias y depende de anuncios sin respaldo normativo publicado. Un sitio venezolano serio tiene que mostrar la fecha y la fuente de cada número y avisar cuando el dato es un anuncio y no una norma.

## 8. Resumen de lo NO VERIFICADO

- Decreto y Gaceta del ingreso mínimo integral USD 240 (mayo 2026) y su obligatoriedad para el sector privado.
- Gaceta del salario mínimo Bs 130 (Decreto 4.653).
- Todo dato tributario en fuente primaria (SENIAT inaccesible): UT 43 en Gaceta 43.140, tramos ISLR, IVA 16%, IGTF 3% y el número de Gaceta del Decreto 4.972.
- Texto primario LOTTT arts. 131, 132, 142, 143, 190, 192 (solo vía sentencia citada y fuentes secundarias).
- Piso de la base de la contribución de pensiones 9%; porcentajes de IVSS, FAOV, INCES y paro forzoso.
- Artículo del COT sobre multas en moneda de mayor valor.
- Regularidad 2026 del Observatorio Venezolano de Finanzas.
- Aceptación de Venezuela por procesadores de pago globales y alcance de licencias OFAC 2026.
- Volúmenes de búsqueda reales y orden de SERP en Google Venezuela.
