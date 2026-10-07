# Bolivia: investigación para replicar calcular.ar

Fecha de corte: 6-7 de octubre de 2026. Cada dato lleva valor, vigencia, fuente y fecha de verificación. «NO VERIFICADO» significa que no se pudo confirmar en fuente primaria en esta sesión.

Convención de fuentes:
- **P** = fuente oficial primaria (BCB, INE, Ministerio de Economía, SIN).
- **C** = compilador de normas (lexivox.org, pixilegal.com, infoleyes): reproduce el texto del decreto pero no es la Gaceta Oficial. La Gaceta Oficial de Bolivia (gacetaoficialdebolivia.gob.bo) **no resolvió DNS** desde esta máquina el 6/10/2026.
- **S** = prensa o blog (solo para contexto o cuando no hubo primaria).

## 0. Contexto que cambia todo (2026)

| Hecho | Valor | Vigencia | Fuente | Verificado |
|---|---|---|---|---|
| Fin del tipo de cambio fijo 6,96 | Pasó a régimen flexible; primer TCO 9,73 Bs/USD | Desde 29/06/2026 | P: serie diaria en [bcb.gob.bo/tco_reporte_ultima_cotizacion.php](https://www.bcb.gob.bo/tco_reporte_ultima_cotizacion.php) (arranca 27/06 en 9,73). S: [El Tribuno 30/06/2026](https://www.eltribuno.com/internacionales/2026-6-30-0-0-0-bolivia-abandono-el-tipo-de-cambio-fijo-y-estreno-un-esquema-flexible). Instrumento normativo exacto (se cita «RM 245/2026»): NO VERIFICADO | 06/10/2026 |
| Nueva metodología del TCO | Mediana ponderada por monto de las compras de dólares de bancos a clientes; sin operaciones interbancarias; publicación 23:30 cada día hábil; se eliminó el tope de venta TCO + Bs 0,10 | Desde 25/09/2026 (Res. Directorio BCB 142/2026, 24/09/2026) | S: [Los Tiempos 25/09/2026](https://www.lostiempos.com/actualidad/economia/20260925/bcb-implementara-nuevo-metodo-calcular-tipo-cambio-oficial). La nota metodológica «mediana ponderada por monto» aparece en la página P del BCB citada arriba. Texto de la resolución: NO VERIFICADO | 06/10/2026 |
| TCO hoy | **11,97 Bs/USD** | Cotización 06/10/2026 (Tabla 186-26) | P: [ultimo.php](https://www.bcb.gob.bo/librerias/indicadores/otras/ultimo.php) | 06/10/2026 |
| Valor Referencial del Dólar (VRD) | Publicado desde dic-2025 (compra y venta) convivió con el 6,96. El BCB mantiene la sección «VRD: bases de cálculo». Si sigue publicándose después del 29/06/2026: NO VERIFICADO | | P: [bcb.gob.bo VRD](https://www.bcb.gob.bo/?q=content/valor-referencial-de-compra-del-d%C3%B3lar-estadounidense-3) | 06/10/2026 |
| Tarjetas para pagos al exterior | Rehabilitadas en abril 2026; débito con tope USD 500 por defecto (el banco puede subirlo), crédito según capacidad | Desde ~06/04/2026 | S: [Los Tiempos 06/04/2026](https://www.lostiempos.com/actualidad/economia/20260406/terminan-restricciones-al-uso-tarjetas-credito-debito). Norma ASFI/BCB: NO VERIFICADO | 06/10/2026 |
| Recesión | FMI proyecta PIB 2026 de -3,3% | Proyección | S: [Bloomberg Línea](https://www.bloomberglinea.com/latinoamerica/pib-de-paraguay-creceria-45-y-el-de-bolivia-caeria-33-los-polos-opuestos-de-sudamerica/) | 06/10/2026 |
| Paquete económico | DS 5503 (17/12/2025) fue **abrogado** por DS 5516 (13/01/2026) tras negociación con la COB; también abroga DS 5484 | 13/01/2026 | C: [pixilegal DS 5516](https://www.pixilegal.com/normativa/decreto-5516-2026-01-13) | 06/10/2026 |

Implicancia: el dólar dejó de ser un número fijo y pasó a ser la consulta financiera más volátil del país. Es el mismo patrón que en Argentina: tráfico diario recurrente y datos automatizables.

## 1. Mapa de calculadoras (ordenado por demanda estimada)

**De dónde sale la estimación de demanda:** no hubo acceso a Keyword Planner, Ahrefs ni Similarweb (conectores sin autorizar). El orden es cualitativo y combina: (a) cantidad de sitios con calculadora dedicada que aparecen en buscadores, (b) cobertura de prensa en 2026, (c) recurrencia (diaria/mensual/anual), (d) analogía con el ranking de calcular.ar. Tratarlo como hipótesis a validar con Search Console de un piloto.

| # | Calculadora (nombre local) | Recurrencia | Por qué arriba |
|---|---|---|---|
| 1 | Dólar hoy / tipo de cambio oficial (TCO) y conversor Bs-USD | Diaria | Régimen flotante desde jun-2026, cambia todos los días |
| 2 | Aguinaldo (y «doble aguinaldo Esfuerzo por Bolivia») | Anual, pico nov-dic | Prensa lo cubre todos los años; el doble aguinaldo genera búsquedas aunque no se pague |
| 3 | Finiquito / beneficios sociales (indemnización + desahucio + duodécimas) | Permanente | Varias calculadoras dedicadas compitiendo; recesión con caída de 205 mil ocupados en el semestre ([Correo del Sur](https://correodelsur.com/economia/20260823/poblacion-ocupada-cae-en-205-mil-personas-en-el-primer-semestre.html)) |
| 4 | Sueldo líquido pagable (total ganado menos Gestora, ANS y RC-IVA) | Mensual | Equivalente a «sueldo neto» |
| 5 | Salario mínimo 2026 (mensual, por día, por hora) | Anual | Subió 20% en enero |
| 6 | RC-IVA dependientes (Formulario 110, cuántas facturas presentar) | Mensual | El cambio de 2025 amplió la base de alcanzados |
| 7 | Bono de antigüedad | Mensual | Depende del SMN: cada aumento lo mueve |
| 8 | Quinquenio | Permanente | Búsqueda de nicho pero con intención alta |
| 9 | Vacaciones según antigüedad (días y pago proporcional) | Permanente | |
| 10 | UFV: conversor y actualización de montos | Diaria | Se usa para deudas tributarias, contratos, multas |
| 11 | Inflación (IPC) y actualización de montos | Mensual | Inflación 2025 fue 20,40% |
| 12 | Horas extras, dominicales, nocturnas | Permanente | |
| 13 | Régimen Tributario Simplificado (categoría y cuota) | Bimestral | Comerciantes minoristas, vivanderos, artesanos |
| 14 | IVA 13% + IT 3% (precio con factura) | Permanente | |

### 1.1 Fichas con base legal, fórmula y valores

#### Salario Mínimo Nacional (SMN)
| Campo | Dato |
|---|---|
| Valor | **Bs 3.300** mensual (+20% sobre Bs 2.750 de 2025) |
| Base legal | DS 5516 de 13/01/2026, art. 23; retroactivo al 01/01/2026; público y privado |
| Fuente P | Ministerio de Economía, [Instructivo MEFP/VPCF/DGPGP 01/2026](https://www.economiayfinanzas.gob.bo/sites/default/files/2026-01/13-01-2026-instructivo_salario-minimo.pdf) (cita «Artículo 23 del Decreto Supremo N° 5516 de 13 de enero de 2026» y el monto Bs3.300) |
| Próxima actualización | Tradicionalmente 1 de mayo; en 2026 no hubo segundo aumento. El Gobierno dijo que no hay condiciones y que abrirá mesas técnicas hacia fines de 2026 ([Red Uno, 21/04/2026](https://www.reduno.com.bo/economia/habra-o-no-un-nuevo-aumento-salarial-en-bolivia-esto-se-sabe-hasta-ahora-202642110048)). Fecha del próximo: NO VERIFICADO |
| Equivalente | Bs 3.300 / 11,97 = USD 275,69 al TCO del 06/10/2026 |
| Verificado | 06/10/2026 |

#### Aguinaldo de Navidad
| Campo | Dato |
|---|---|
| Fórmula | Aguinaldo = promedio del total ganado de los últimos 3 meses × (meses trabajados en el año / 12). Requiere más de 3 meses trabajados. No sufre aportes ni RC-IVA |
| Base legal | Ley de 18/12/1944 y DS 229 de 21/12/1944. Plazo de pago (20 de diciembre) y sanción por mora (pago doble): conocido, pero el texto y la resolución ministerial anual 2026 NO VERIFICADO |
| Próxima actualización | Resolución Ministerial del Ministerio de Trabajo, normalmente noviembre. NO VERIFICADO para 2026 |

#### Segundo aguinaldo «Esfuerzo por Bolivia»
| Campo | Dato |
|---|---|
| Condición | Se paga cuando el crecimiento anual del PIB supera 4,5% (período interanual a junio, dato INE) |
| Base legal | DS 1802 de 20/11/2013. Texto primario NO VERIFICADO en esta sesión; condición confirmada por análisis de UDAPE ([PDF UDAPE 11/2025](https://www.udape.gob.bo/wp-content/uploads/2025/11/12.-IMPACTO-DEL-SEGUNDO-AGUINALDO.pdf), no abierto) y prensa |
| Estado 2026 | Con FMI proyectando -3,3% y caída de empleo, **casi seguro no corresponde**. Anuncio oficial del INE/Gobierno para 2026: NO VERIFICADO (suele salir en octubre-noviembre) |
| Valor de producto | Página «¿Hay doble aguinaldo 2026?» con el dato de PIB que publica el INE: pico de búsqueda en octubre-noviembre aunque la respuesta sea no |

#### Indemnización por tiempo de servicios, desahucio y finiquito
| Componente | Fórmula | Base legal |
|---|---|---|
| Indemnización | Promedio total ganado últimos 3 meses × (años + meses/12 + días/360). Corresponde después de 90 días continuos, **también en retiro voluntario** | DS 110 de 01/05/2009, arts. 1 y 2 ([C: lexivox](https://www.lexivox.org/norms/BO-DS-N110.xhtml)) |
| Desahucio | 3 salarios si el despido es sin causa y sin preaviso. No corresponde en renuncia | DS 110 art. 3 y Ley General del Trabajo art. 12 (C) |
| Aguinaldo proporcional | Duodécimas del año en curso | Ver ficha aguinaldo |
| Vacaciones | No gozadas + proporcionales | DS 17288 (ver ficha). Regla exacta de proporcionales: NO VERIFICADO |
| Quinquenios ya cobrados | Se descuentan | DS 522/2010 |
| Plazo y multa por mora | 15 días y recargo del 30% (DS 28699): NO VERIFICADO en esta sesión |
| Verificado | 06/10/2026 (DS 110 en compilador; Gaceta no accesible) |

#### Quinquenio
| Campo | Dato |
|---|---|
| Fórmula | Promedio del total ganado de los 3 meses previos a la solicitud × 5 (un sueldo por año) por cada quinquenio consolidado |
| Reglas | A pedido del trabajador, por escrito; pago único en 30 días calendario, sin fraccionar |
| Base legal | DS 522 de 26/05/2010 ([C: lexivox](https://www.lexivox.org/norms/BO-DS-N522.html)); DS 110 art. 4 protege quinquenios previos |
| Verificado | 06/10/2026 (vía compilador) |

#### Bono de antigüedad
| Años | % | Bono con base 3 SMN = Bs 9.900 |
|---|---|---|
| 2 a 4 | 5% | Bs 495 |
| 5 a 7 | 11% | Bs 1.089 |
| 8 a 10 | 18% | Bs 1.782 |
| 11 a 14 | 26% | Bs 2.574 |
| 15 a 19 | 34% | Bs 3.366 |
| 20 a 24 | 42% | Bs 4.158 |
| 25 o más | 50% | Bs 4.950 |

- Escala: DS 21060 art. 60 ([C: lexivox](https://www.lexivox.org/norms/BO-DS-21060.html)). Base sobre SMN: DS 21137 art. 13 ([C](https://www.lexivox.org/norms/BO-DS-21137.html)); base de **3 SMN**: DS 23113 de 10/04/1992 según el compilador. Texto literal del DS 23113: NO VERIFICADO.
- Se recalcula cada vez que cambia el SMN. Verificado 06/10/2026.

#### Vacaciones
| Antigüedad | Días hábiles |
|---|---|
| 1 a 5 años | 15 |
| 5 a 10 años | 20 |
| Más de 10 años | 30 |

Base legal: LGT art. 44 y DS 17288 de 18/03/1980. Texto primario NO VERIFICADO (lexivox no lo tiene; [infoleyes](https://bolivia.infoleyes.com/norma/1162/decreto-supremo-17288) no abierto). La escala es consistente en todas las fuentes secundarias.

#### Sueldo líquido pagable (aportes del trabajador)
| Concepto | % sobre total ganado | Base legal / fuente |
|---|---|---|
| Cotización mensual (vejez) | 10% | Ley 065 de Pensiones |
| Prima riesgo común | 1,71% | Ley 065 |
| Comisión Gestora | 0,5% | Ley 065 |
| Aporte solidario del asegurado | 0,5% | Ley 065 |
| **Total laboral** | **12,71%** | S: [misalariobo.com](https://misalariobo.com/tabla-aportes-gestora-bolivia/), [planifica.com.bo](https://www.planifica.com.bo/aportes-afp-caja-salud-bolivia-guia-empleado-empleador/). La tabla oficial de gestora.bo devolvió **403**: NO VERIFICADO en P |
| Aporte Nacional Solidario | 1,15% sobre excedente de Bs 13.000; 5,74% sobre excedente de Bs 25.000; 11,48% sobre excedente de Bs 35.000 (escalonado) | Ley 1582 de 01/10/2024 ([C: lexivox](https://www.lexivox.org/norms/BO-L-N1582.html)) |

#### Aportes patronales (para planilla y costo laboral)
| Concepto | % |
|---|---|
| Caja Nacional de Salud (o caja sectorial) | 10% (base legal exacta: NO VERIFICADO) |
| Riesgo profesional | 1,71% |
| Aporte patronal vivienda | 2% |
| Aporte patronal solidario | 3,5% (subió de 3% con Ley 1582/2024) |
| **Total** | **17,21%** |

Fuente: Ley 1582 (C) y fuentes S citadas arriba. Verificado 06/10/2026.

#### RC-IVA dependientes
| Paso | Regla |
|---|---|
| 1 | Total ganado menos aportes laborales (12,71% y ANS) = sueldo neto sujeto |
| 2 | Mínimo no imponible: 2 SMN = Bs 6.600 |
| 3 | Impuesto = 13% × (neto − 2 SMN) |
| 4 | Menos cómputo fijo: 13% de **1 SMN** = Bs 429 (era 2 SMN hasta abril de 2025) |
| 5 | Menos 13% de facturas presentadas en Formulario 110 y saldo a favor del mes anterior actualizado por UFV |
| Umbral 2026 | Paga si neto > 3 SMN = Bs 9.900, es decir **total ganado > Bs 11.342** aprox. (cálculo propio: 9.900 / 0,8729) |
| Base legal | Ley 843 (Texto Ordenado) Título II; DS 21531 modificado. El cambio a 1 SMN se reportó junto con DS 5383 (mayo 2025) según [eju.tv 02/05/2025](https://eju.tv/?p=4606591) y Visión 360; el decreto exacto que modifica el cómputo: **NO VERIFICADO** (una fuente cita DS 2491/2015) |
| Oportunidad | yo-facturo.com todavía explica el RC-IVA con 4 SMN (regla vieja). Contenido desactualizado del competidor = ventaja |

#### UFV (Unidad de Fomento de Vivienda)
| Campo | Dato |
|---|---|
| Valor | **3,35405 Bs/UFV** (07/10/2026); 3,35141 (30/09/2026) |
| Fuente P | [BCB tabla de cotizaciones](https://www.bcb.gob.bo/librerias/indicadores/otras/ultimo.php) y [UFV datos estadísticos](https://www.bcb.gob.bo/?q=servicios/ufv/datos_estadisticos) |
| Metodología | Se ajusta diariamente con el IPC del INE; reglamento en el sitio del BCB. Fórmula exacta: NO VERIFICADO |
| Uso | Actualización de deudas tributarias (SIN), saldos de crédito fiscal RC-IVA, contratos |

#### Inflación (IPC, base 2016=100, INE)
| Indicador | Valor | Período |
|---|---|---|
| Índice | 152,85 | Septiembre 2026 |
| Mensual | 0,85% | Septiembre 2026 |
| Acumulada 2026 | 3,88% | Enero-septiembre |
| 12 meses | 5,70% | Sep-25 a sep-26 |
| Inflación 2025 completa | 20,40% | Dic-24 a dic-25 |

Fuente P: archivo xlsx del INE descargado el 06/10/2026 desde [ine.gob.bo/index.php/nacional](https://www.ine.gob.bo/index.php/nacional/) (enlace directo [nube.ine.gob.bo/.../auAr2RoVf2ya2Eu/download](https://nube.ine.gob.bo/index.php/s/auAr2RoVf2ya2Eu/download), «Fecha de publicación: Octubre de 2026»). Coincide con el BCB ([indicadores_inflacion](https://www.bcb.gob.bo/?q=indicadores_inflacion)).
**Discrepancia detectada:** notas de prensa mezclan el 18,33% acumulado (que es septiembre de **2025**) con 2026, y una nota cita 0,20% mensual para septiembre (que también es 2025). Usar solo el xlsx del INE. Julio 2026 tuvo -2,79% mensual (deflación tras bloqueos).

#### Impuestos a la actividad
| Impuesto | Valor | Base legal | Estado |
|---|---|---|---|
| IVA | 13% (incluido en precio, tasa efectiva 14,94% sobre neto) | Ley 843 | Vigente. P no consultada en esta sesión |
| IT (Impuesto a las Transacciones) | 3% sobre ingresos brutos | Ley 843 | **Vigente**. Proyecto de eliminación presentado el 28/07/2026 (diputada Rocha, [ABI](https://abi.bo/diputada-rocha-presenta-proyecto-de-ley-para-eliminar-el-impuesto-a-las-transacciones/)); el ministro también propuso eliminarlo. Aprobación: no encontrada; vigilar |
| ITF | Derogado | Ley 1717 de 10/04/2026 abroga Ley 3446 ([C: pixilegal](https://www.pixilegal.com/normativa/ley-1717-2026-04-10)); SIN lo ratificó con RND 102600000013 ([P: impuestos.gob.bo, 14/04/2026](https://www.impuestos.gob.bo/index.php/nota_prensa/impuestos-ratifica-eliminacion-del-itf-en-beneficio-de-la-economia-de-los-bolivianos/)) | Eliminado |
| IUE | 25% | Ley 843 | Vigente, NO VERIFICADO en P |
| Impuesto a las Grandes Fortunas | Gobierno anunció derogación (nov-2025) | | Estado a oct-2026: NO VERIFICADO |

#### Régimen Tributario Simplificado (RTS)
| Categoría | Capital (Bs) | Cuota bimestral (Bs) |
|---|---|---|
| 1 | 12.001 a 15.000 | 47 |
| 2 | 15.001 a 18.700 | 90 |
| 3 | 18.701 a 23.500 | 147 |
| 4 | 23.501 a 29.500 | 158 |
| 5 | 29.501 a 37.000 | 200 |
| 6 | 37.001 a 60.000 | 350 |

Tope de ventas anuales Bs 184.000. Base: DS 24484 modificado por DS 3698. Fuente S (yo-facturo, IBCE); página oficial [siatinfo.impuestos.gob.bo RTS](https://siatinfo.impuestos.gob.bo/index.php/regimenes-tributarios/regimenes-especiales/regimen-tributario-simplificado) no abierta: **NO VERIFICADO en P**. Montos fijos desde 2018, sin indexación.

#### Horas extras
Recargo 100% (LGT art. 55); dominicales y feriados con recargo; nocturno con recargo. Porcentajes exactos: NO VERIFICADO en esta sesión.

## 2. Fuentes automatizables (probadas el 06/10/2026)

| Dato | URL | Formato | Frecuencia | ¿Respondió? |
|---|---|---|---|---|
| TCO + UFV + monedas del día | `https://www.bcb.gob.bo/librerias/indicadores/otras/ultimo.php` | HTML simple (tabla) | Diaria | Sí, 200. Trae TCO 11.97 y UFV 3.35405 |
| Tabla de cualquier fecha | `https://www.bcb.gob.bo/librerias/indicadores/otras/otras_imprimir.php?qdd=30&qmm=09&qaa=2026` | HTML | Diaria, histórico por parámetro | Sí: devolvió 30/09/2026 TCO 12.02, UFV 3.35141 |
| Misma tabla en Excel | `.../otras_imprimir2XLS.php?qdd=DD&qmm=MM&qaa=AAAA` (también `otras_imprimirODS.php`) | XLS binario real | Diaria | Sí, 200, `application/vnd.ms-excel` |
| Serie TCO desde el inicio del régimen flotante | `https://www.bcb.gob.bo/tco_reporte_ultima_cotizacion.php` | HTML | Diaria | Sí, 200 (snapshot con cortes; verificar que se actualice) |
| Tipo de cambio histórico anual | `https://www.bcb.gob.bo/tiposDeCambioHistorico/pdf.php?anio=2026` | PDF | Diaria | Sí, PDF de 66 KB; parsear PDF es frágil, preferir el HTML por fecha |
| IPC mensual (serie 2018-2026) | `https://nube.ine.gob.bo/index.php/s/auAr2RoVf2ya2Eu/download` (enlazado desde `/index.php/nacional/`) | XLSX | Mensual (primeros días del mes) | Sí. Riesgo: enlace de Nextcloud compartido, puede cambiar; scrapear la página `/nacional/` para obtener el enlace vigente |
| UFV calculadora | `https://www.bcb.gob.bo/calculadora-ufv/` | Web | Diaria | No probado |
| Normas (decretos) | Gaceta Oficial de Bolivia | | | **No**: DNS falla. Alternativa: monitorear compiladores (pixilegal tiene URL por fecha: `/normativa/decreto-NNNN-AAAA-MM-DD`) y notas del Ministerio de Trabajo ([mintrabajo.gob.bo](https://www.mintrabajo.gob.bo/), 200) y SIN ([impuestos.gob.bo](https://www.impuestos.gob.bo/), 200) |
| Tabla de aportes Gestora | gestora.bo | | | **No**: 403 |

No hay API JSON oficial en ninguno de los organismos. Todo es scraping de HTML o descarga de XLS/XLSX. El BCB es estable y parametrizable por fecha: es la mejor fuente del país.

## 3. Idioma, tono y formato

| Tema | Recomendación |
|---|---|
| Tratamiento | **Usted** para contenido laboral e impositivo (registro formal de ministerios, SIN y estudios contables). «Tú» neutro es aceptable en microcopy. Nada de voseo argentino: en Santa Cruz existe voseo coloquial pero no es el registro web |
| Vocabulario | finiquito, beneficios sociales, desahucio, quinquenio, duodécimas, haber básico, total ganado, líquido pagable, boleta de pago, planilla de sueldos, gestión (= año fiscal: «gestión 2026»), Gestora (ex AFP), CNS / caja de salud, NIT, factura, Formulario 110, SIN, UFV, bono de antigüedad, segundo aguinaldo |
| Moneda | Boliviano, símbolo **Bs** antes del número (Bs 3.300). Código BOB |
| Números | Punto de miles y coma decimal en prensa y en el BCB en redes («Bs12,02»); las tablas del BCB usan punto decimal (11.97). Para usuarios: **Bs 3.300,50** |
| Fechas | dd/mm/aaaa |

## 4. Competencia (búsquedas hechas el 06/10/2026)

Nota: WebSearch no es Google Bolivia; el orden real de SERP es NO VERIFICADO. Lo que se ve es quién tiene páginas indexadas y dedicadas.

| Búsqueda | Quién aparece | Calidad |
|---|---|---|
| calculadora finiquito Bolivia | hacecuentas.com, toptrabajos.com, yo-facturo.com, finiquitojusto.com, boliviaimpuestos.com | Media. finiquitojusto y hacecuentas son sitios multipaís con plantilla genérica |
| calcular quinquenio | boliviaimpuestos.com, finiquitojusto.com, yo-facturo.com | Blogs; casi no hay calculadora dedicada |
| calculadora aguinaldo Bolivia | yo-facturo.com (calculadora dedicada), finiquitojusto.com, asistente-rd.com | yo-facturo es el competidor más serio |
| sueldo neto / RC-IVA | yo-facturo.com, boliviaimpuestos.com, misalariobo.com, boliviatrabajos.com | yo-facturo usa regla vieja de 4 SMN en una página |
| bono de antigüedad | yo-facturo.com, finiquitojusto.com | Contenido flojo, con errores (una fuente dice 3% a 26%) |
| dólar hoy Bolivia / TCO | paralelo.bo, dolarparalelobolivia.net, osmarbolivar.github.io (monitor), lapatria.bo, El Deber | Fuerte en dólar paralelo; débil en «dólar oficial + histórico + conversor» |
| UFV hoy | boliviaimpuestos.com, BCB | Débil |
| doble aguinaldo 2026 | finiquitojusto.com, yo-facturo.com, prensa | Prensa domina en octubre-noviembre |

Lectura: no hay un «calcular.ar boliviano» con datos que se actualicen solos. yo-facturo.com (software de facturación) es el rival más parecido, con calculadoras de sueldo neto, aguinaldo y RC-IVA. boliviaimpuestos.com tiene autoridad en temas tributarios pero es blog.

## 5. Productos pagos y medios de cobro

### Productos (2-4)
| Producto | Para quién | Precio orientativo | Comentario |
|---|---|---|---|
| Planilla de sueldos Excel 2026 (total ganado, bono antigüedad automático, Gestora 12,71%, ANS, RC-IVA con F-110, CNS y aportes patronales 17,21%, provisiones de aguinaldo e indemnización) | Contadores, pymes | USD 10-20 | Es el equivalente directo de la planilla de liquidación argentina. Se actualiza con el SMN |
| Informe de finiquito / beneficios sociales en PDF (con base legal citada, listo para presentar en el Ministerio de Trabajo) | Trabajadores despedidos o que renuncian | USD 3-6 | Alta intención de pago en un momento crítico |
| Planilla de RC-IVA dependientes (control de facturas y saldo a favor actualizado por UFV) | Dependientes con total ganado > Bs 11.342 | USD 3-5 | Mensual, recurrente |
| Planilla de aguinaldo y doble aguinaldo para empresas | Pymes, nov-dic | USD 5-10 | Estacional |

### Medios de cobro
| Medio | ¿Viable? | Detalle |
|---|---|---|
| MercadoPago | No | No opera en Bolivia |
| Tarjeta internacional (cobrando con un procesador que acepte tarjetas extranjeras, por ejemplo un merchant of record como Lemon Squeezy o Paddle, o Stripe desde una entidad fuera de Bolivia) | **Sí, desde abril 2026** | Las tarjetas bolivianas volvieron a operar en el exterior; débito con tope USD 500 por defecto. Para tickets de USD 3-20 alcanza. Se cobra en USD y el banco convierte al tipo de cambio del día. Aceptación real de cada MoR para tarjetas bolivianas: NO VERIFICADO |
| QR Simple (QR interoperable en Bs) | Solo con socio o cuenta local | Requiere cuenta en banco boliviano a nombre del comercio. Sin entidad local no se puede |
| Tigo Money | Solo con presencia local | Igual que QR |
| USDT / Binance Pay | Posible, nicho | El uso de cripto se extendió desde 2024; estatus regulatorio actual NO VERIFICADO. Fricción alta para un trabajador común |
| PayPal | Posible para quien tenga cuenta | Penetración baja |

Conclusión: **se puede cobrar**, con tarjeta internacional vía un procesador global, a precios bajos. Sin socio local no hay QR, que es como paga la mayoría.

## 6. Calendario de picos de búsqueda

| Mes | Pico | Por qué |
|---|---|---|
| Diario | Dólar oficial (TCO), UFV | Régimen flotante desde 29/06/2026 |
| Enero | Salario mínimo, planillas nuevas | En 2026 el aumento salió en enero (DS 5516) |
| Abril | IUE empresas, cierre fiscal | Vencimiento IUE (NO VERIFICADO fecha 2026) |
| 1 de mayo | Salario mínimo e incremento salarial | Fecha tradicional de aumentos |
| Mensual (días 13-20) | RC-IVA, Formulario 110, sueldo líquido | Presentación de facturas y vencimientos del SIN según NIT |
| Primeros días del mes | Inflación | INE publica IPC |
| Julio | Vacaciones de invierno | Consultas de vacaciones |
| Octubre-noviembre | «Doble aguinaldo 2026» | Se conoce el PIB a junio |
| Noviembre-20 de diciembre | Aguinaldo | Plazo de pago |
| Todo el año, con picos en crisis | Finiquito, indemnización, desahucio | Recesión 2026 |

## 7. Resumen de lo NO VERIFICADO

- Instrumento normativo exacto del paso al tipo de cambio flexible (se cita RM 245/2026) y texto de la Res. BCB 142/2026.
- Continuidad del VRD después del 29/06/2026.
- Decreto exacto que bajó el cómputo RC-IVA de 2 SMN a 1 SMN.
- Textos primarios de DS 1802 (doble aguinaldo), DS 17288 (vacaciones), DS 23113 (base 3 SMN), DS 28699 (plazo y recargo 30%), LGT art. 55 (horas extras).
- Porcentajes Gestora y CNS en fuente oficial (gestora.bo devolvió 403).
- Tabla RTS en la página del SIN.
- Decisión 2026 sobre el doble aguinaldo; fecha del próximo aumento salarial; destino del proyecto para eliminar el IT; estado del Impuesto a las Grandes Fortunas.
- Volúmenes de búsqueda reales (sin herramienta de keywords) y orden real de SERP en Google Bolivia.
