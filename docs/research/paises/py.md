# Paraguay: investigación de producto y datos legales

Fecha de corte: 6/10/2026. Verificaciones hechas el 6 y 7/10/2026. «NO VERIFICADO» = no se pudo confirmar en fuente oficial en esta sesión; no usar en producción sin revisar.

## 1. Resumen

| Tema | Conclusión |
|---|---|
| Atractivo del mercado | 5/10. 6,9 M hab. (NO VERIFICADO), ingreso menor que UY. Regulación laboral más simple (un Código del Trabajo, un aporte IPS de 9%), lo que reduce la cantidad de calculadoras con valor. Competencia débil salvo el MTESS, que tiene calculadoras oficiales. |
| Diferencial posible | Liquidación final completa (preaviso + indemnización + vacaciones dobles + aguinaldo proporcional + bonificación familiar), IRP con escala, RESIMPLE, IVA 5%/10%, CDA con tasas reales del BCP. |
| Fuentes automáticas | Medias: el BCP publica HTML y XLSX pero bloquea clientes sin User-Agent de navegador (403) y las URLs de archivos llevan UUID (hay que scrapear la página padre). No hay equivalente al JSON de IMPO. Gaceta Oficial no respondió. |
| Medio de pago | MercadoPago NO opera en Paraguay: mercadopago.com.py redirige a mercadolibre.com (verif. 7/10). Usar Bancard o Pagopar (pagopar.com redirige a upay.com.py/pagopar). |

## 2. Valores clave vigentes

| Concepto | Valor | Vigencia | Base legal | Fuente | Verif. |
|---|---|---|---|---|---|
| Salario mínimo legal (actividades diversas no especificadas), mensual diurno | Gs. 3.044.000 | desde 1/7/2026 (anterior: Gs. 2.899.048) | Decreto 6225/2026 (17/6/2026, +5%); Resolución MTESS 670/2026 | Agencia IP: https://www.ip.gov.py/ip/2026/07/09/mtess-reglamenta-reajuste-de-salarios-para-trabajadores-del-sector-privado-y-rige-desde-el-1-de-julio/ ; ABC: https://www.abc.com.py/economia/2026/06/26/reajuste-del-salario-minimo-estos-son-los-pagos-por-hora-dia-y-jornada-nocturna/ | 6/10 (agencia estatal + prensa; texto del decreto no leído en Gaceta) |
| Jornal mínimo | Gs. 117.077 (SM / 26) | idem | idem | idem | 6/10 |
| Diario del mensualero | Gs. 101.467 (SM / 30) | idem | | idem | 6/10 |
| Hora diurna | Gs. 12.683 (SM / 240) | idem | | idem | 6/10 |
| Mensual nocturno (+30%) | Gs. 3.957.200 ; hora Gs. 18.844 | idem | CT art. 234 | idem | 6/10 |
| Tiempo parcial, hora | diurna Gs. 14.634 ; nocturna Gs. 21.743 | idem | | ABC | 6/10 |
| Próximo ajuste | 1/7/2027, por inflación interanual de mayo informada por el BCP (el Ejecutivo puede dar más, como en 2026) | | | | patrón histórico |
| IPC setiembre 2026 | mensual 0,1% ; acumulado año 1,9% ; interanual 1,7% | publicado 1/10/2026 aprox. | | BCP: https://www.bcp.gov.py/web/institucional/w/informe-de-inflaci%C3%B3n-septiembre-2026/-/categories/94873 | 7/10 |
| Tasas CDA moneda local, bancos (promedio ponderado agosto 2026) | 30 d 5,28% ; 90 d 5,56% ; 180 d 7,15% ; 360 d 7,32% ; 720 d 9,56% ; 1080 d 9,38%. Financieras: 90 d 7,25% ; 180 d 7,91% | mensual | | BCP «Curva de depósitos CDA» (XLSX) | 7/10 |
| Tasas CDA moneda extranjera, bancos (ago. 2026) | 30 d 2,78% ; 90 d 3,40% | mensual | | idem | 7/10 |

### Seguridad social (IPS)

| Aporte | Tasa | Fuente | Verif. |
|---|---|---|---|
| Aporte obrero | 9% del salario | fuentes secundarias coincidentes (Deel, hacecuentas, prensa) | NO VERIFICADO en ips.gov.py (el sitio devuelve una página vacía de 331 bytes a clientes automáticos) |
| Aporte patronal | 16,5% (14% IPS + 2,5% con destino a otros entes; el desglose varía según la fuente) | idem | NO VERIFICADO |
| Total | 25,5% | | NO VERIFICADO |
| Trabajo doméstico | mismas tasas y salario mínimo al 100% desde Ley 6338/2019 que modificó la Ley 5407/2015 | prensa | NO VERIFICADO |

### Impuestos (DNIT, ex SET)

| Concepto | Valor | Base legal | Fuente | Verif. |
|---|---|---|---|---|
| IRP rentas de servicios personales: tasas | 8%, 9% y 10% | Ley 6380/2019 | https://www.dnit.gov.py/web/portal-institucional/irp | 6/10 (tasas) |
| IRP: tramos sobre renta neta anual | 8% hasta Gs. 50.000.000 ; 9% hasta Gs. 150.000.000 ; 10% sobre el excedente | Ley 6380/2019 | prensa y competidores | NO VERIFICADO en texto de la ley |
| IRP: umbral de inscripción | ingresos brutos anuales > Gs. 80.000.000 | Ley 6380/2019 | ABC 14/2/2024; DNIT lo publica como imagen | NO VERIFICADO en texto oficial |
| IRP ganancias de capital | 8% | | DNIT | 6/10 |
| IRP: vencimiento DJ anual | marzo (según terminación de RUC) | | DNIT | 6/10 |
| IRE RESIMPLE | unipersonales con ingresos ≤ Gs. 80.000.000; 4 cuotas fijas trimestrales de Gs. 60.000 a Gs. 240.000 según ingresos del año anterior (escalones desde Gs. 20.000.000); DJ hasta 26/2/2026; pagos marzo, junio, setiembre, diciembre | Ley 6380/2019 | https://www.dnit.gov.py/web/portal-institucional/w/ire-resimple-ingresos-de-2025-deben-declararse-en-febrero | 6/10 (tabla exacta de cuotas por escalón NO VERIFICADO) |
| IRE SIMPLE | tope de ingresos | | | NO VERIFICADO |
| IVA | 10% general; 5% reducida | Ley 6380/2019 | | NO VERIFICADO en fuente hoy (alta demanda: «calcular iva 5 por ciento») |

### Derechos laborales (Código del Trabajo, Ley 213/93 y modif. Ley 496/95)

Texto consultado: copia consolidada publicada por la Universidad Nacional de Itapúa (https://humanidades.uni.edu.py/wp-content/uploads/2016/07/Ley-213-93-C%C3%B3digo-Laboral.pdf) y página de la ley en DNIT (https://www.dnit.gov.py/web/portal-institucional/w/n-ley-n-213-93). Verif. 7/10. Conviene contrastar con BACN antes de publicar.

| Instituto | Regla | Artículo |
|---|---|---|
| Aguinaldo | 1/12 de las remuneraciones devengadas en el año calendario en todo concepto (salario, horas extra, comisiones, otras). Antes del 31 de diciembre o al terminar la relación. Proporcional en renuncia y despido. Inembargable | 243, 244, 245 |
| Vacaciones | Hasta 5 años: 12 días corridos; más de 5 y hasta 10: 18; más de 10: 30. Empiezan en lunes. Se pagan por adelantado con el salario vigente o el mínimo si es mayor | 218, 220 |
| Vacaciones no gozadas al egreso | Se compensan en dinero; el monto es doble si se paga por despido después del período de goce. Si termina antes del año por causa del empleador: proporcional | 221 |
| Preaviso (contrato indefinido) | Hasta 1 año: 30 días; 1 a 5 años: 45; 5 a 10: 60; más de 10: 90. Si el empleador lo omite, paga el salario del período; si lo omite el trabajador, paga la mitad | 87, 90 |
| Indemnización por despido injustificado | 15 salarios diarios por cada año de servicio o fracción de 6 meses, haya o no preaviso. Base: promedio de los salarios de los últimos 6 meses | 91, 92 b |
| Estabilidad (10 años) | Solo despido por justa causa probada; si la reintegración no es factible, indemnización doble | 94, 96, 97 |
| Muerte del trabajador | Herederos: mitad de la indemnización del art. 91 | 91 |
| Período de prueba | 30 días (doméstico y no calificados); 60 días (calificados y aprendices) | 58 |
| Jornada | Diurna 8 h / 48 h semanales (6 a 20 h); nocturna 7 h / 42 h; mixta 7,5 h / 45 h | 194, 195, 196 |
| Horas extra y nocturnidad | Extra: +50% mínimo; nocturno: +30% sobre diurno; extra nocturna: +100% sobre hora nocturna; feriado: +100% sobre hora hábil | 234 |
| Bonificación familiar | 5% del salario mínimo por hijo (Gs. 152.200 con el SM vigente) si el hijo es menor de 17 años; se pierde si el salario supera 200% del mínimo (Gs. 6.088.000) | 261, 262, 263 |
| Base del preaviso y la indemnización en algunos regímenes | salario mínimo de actividades no especificadas o el convencional si es mayor | 189 (capítulo especial; revisar alcance) |
| Divisor del salario diario para indemnización (/30) | uso práctico de competidores | NO VERIFICADO en texto |
| Exclusiones del aguinaldo (bonificación familiar, reposo, maternidad) | prensa | NO VERIFICADO |
| Jubilación IPS (edad, años, tasa) | | NO VERIFICADO |

## 3. Calculadoras priorizadas por demanda

Demanda estimada con autocompletado de Google (suggestqueries, gl=py, 7/10/2026) y competidores. Sin volúmenes publicados de Keyword Planner: el orden es ESTIMACIÓN.

Señales: «calcular iva 5 por ciento», «calcular descuento de ips», «calculadora de días hábiles», «calculadora de alquileres», «calculadora de vacaciones», «cómo calcular el iva 10», «cómo calcular el interés de un préstamo paraguay», «cuánto me corresponde de aguinaldo por 5 meses de trabajo», «cuánto me corresponde de liquidación por 1 año de trabajo», «indemnización por despido», «simulador de liquidación ministerio de trabajo», «aguinaldo paraguay 2026 / cómo se calcula», «liquidación empleada doméstica paraguay», «indemnización y preaviso paraguay», «vacaciones paraguay cuántos días», «irp a partir de cuánto se paga», «irp gastos deducibles», «calcular ips paraguay», «salario mínimo paraguay 2026».

| # | Calculadora (nombre local) | Base legal | Fórmula | Datos | Estado |
|---|---|---|---|---|---|
| 1 | Liquidación final / finiquito (despido o renuncia) | CT arts. 87, 90, 91, 92, 221, 244 | preaviso + indemnización (si despido injustificado) + vacaciones causadas (doble si corresponde) + proporcionales + aguinaldo proporcional | SM | Verificado |
| 2 | Aguinaldo (incluido proporcional por meses) | CT art. 243 | suma de remuneraciones del año / 12 | | Verificado |
| 3 | Salario neto (descuento IPS) | IPS | bruto − 9% (+ bonificación familiar) | | Tasas NO VERIFICADO en IPS |
| 4 | IVA 10% y 5% (incluido, discriminado) | Ley 6380 | precio / 1,1 o / 1,05 | | Tasas NO VERIFICADO hoy |
| 5 | Indemnización por despido + preaviso | CT arts. 87, 91, 92 | 15 × (promedio 6 meses / 30) × años (fracción ≥ 6 meses suma) | | Verificado (divisor NO VERIFICADO) |
| 6 | Vacaciones (días y monto) | CT arts. 218 a 221 | días por antigüedad × salario diario | | Verificado |
| 7 | Salario mínimo, jornal y hora | Decreto 6225/2026 | SM / 26, / 30, / 240 | MTESS | Verificado |
| 8 | Empleada doméstica (sueldo, IPS, liquidación) | Leyes 5407/2015 y 6338/2019 | igual que régimen general | | NO VERIFICADO texto de la ley |
| 9 | IRP servicios personales | Ley 6380/2019 | escala 8/9/10% sobre renta neta si ingresos > 80 M | DNIT | Tramos NO VERIFICADO |
| 10 | Horas extra y nocturnas | CT art. 234 | hora × 1,5 / × 1,3 / nocturna × 2 / feriado × 2 | | Verificado |
| 11 | CDA / plazo fijo (tasas BCP) | | capital × tasa × días / 365 | BCP Curva CDA | Verificado |
| 12 | Inflación (IPC) y actualización de alquileres | | índice final / índice inicial | BCP IPC | Verificado |
| 13 | Interés de préstamo | | sistema francés | | sin dato oficial |
| 14 | RESIMPLE | Ley 6380 | tabla de cuotas | DNIT | Parcial |
| 15 | Días hábiles (feriados PY) | | | BCP publica página de feriados | NO VERIFICADO formato |

## 4. Fuentes automatizables

| Dato | URL | Formato | Frecuencia | Prueba |
|---|---|---|---|---|
| IPC (informe mensual) | `https://www.bcp.gov.py/web/institucional/w/informe-de-inflaci%C3%B3n-{mes}-{año}/-/categories/94873` (índice: `https://www.bcp.gov.py/indice-de-precios-al-consumidor-ipc-`) | HTML + PDFs adjuntos | mensual, primeros días | OK 7/10 con User-Agent de navegador; sin él, 403 |
| Tasas CDA y plazo fijo | página `https://www.bcp.gov.py/web/institucional/curva-de-dep%C3%B3sitos-cda` enlaza `.../documents/20117/2353830/Curva_CDA.xlsx/{uuid}?t=...` | XLSX (una hoja por mes, ML y ME, bancos y financieras) | mensual | OK 7/10 (4,5 MB) |
| Tipo de cambio | página `https://www.bcp.gov.py/web/institucional/cotizacion-minorista-del-tipo-de-cambio-nominal` enlaza XLSX mensuales | XLSX | mensual | página OK 7/10; archivos no descargados |
| Anexo estadístico | `https://www.bcp.gov.py/web/institucional/anexo-estadistico` (XLSX anual 2025) | XLSX | anual | OK 7/10 |
| Salario mínimo | sin API. Detectar con noticias de ip.gov.py / MTESS en junio | HTML | anual | manual con alerta |
| Gaceta Oficial | `https://www.gacetaoficial.gov.py/` | | | sin respuesta 7/10 |
| DNIT (RESIMPLE, IRP, vencimientos) | noticias en `https://www.dnit.gov.py/web/portal-institucional/w/...` | HTML | eventual | OK 6/10 |
| IPS | `https://www.ips.gov.py/` | | | responde 331 bytes (redirección JS): no automatizable |

Cron sugerido: BCP IPC mensual (día 1 a 5) con UA de navegador; Curva CDA mensual scrapeando el link con UUID; SM con alerta en junio y revisión humana.

## 5. Idioma y tono

| Tema | Recomendación |
|---|---|
| Tratamiento | Voseo en copy comercial («calculá», «sabés»); es el uso hablado mayoritario y lo usan marcas locales. ESTIMACIÓN: validar con 5 sitios locales antes de redactar. Textos legales y del Estado en usted |
| Vocabulario | salario / sueldo; liquidación de haberes; liquidación final o finiquito; despido injustificado; preaviso; indemnización; aguinaldo; vacaciones; IPS; jornal / jornalero / mensualero; bonificación familiar; hoja de liquidación (recibo, CT art. 235); planilla del MTESS; RUC; factura legal; Marangatú (sistema DNIT) |
| Moneda | Guaraní sin decimales: «Gs. 3.044.000» (también «₲»). Punto de miles |
| Bilingüismo | Guaraní es oficial; el copy de calculadoras va en español |

## 6. Competencia (búsquedas 6 y 7/10/2026, buscador US: el orden en Google.com.py puede variar)

| Búsqueda | Quién aparece | Calidad / oportunidad |
|---|---|---|
| calcular liquidación paraguay | hacecuentas.com/py, finiquitojusto.com, toptrabajos.com | Genéricas, multi-país, con AdSense |
| calculadora aguinaldo paraguay | MTESS (calculadoras.mtess.gov.py), hacecuentas, toptrabajos, prensa (ABC, Última Hora) | El MTESS tiene «Calculadora de Aguinaldos», «Calculadora de Liquidaciones Laborales para la Ciudadanía» y «Calculadora de Tiempo Parcial»: autoridad alta, UX básica |
| salario neto / IPS | hacecuentas.com/py | Única herramienta dedicada visible |
| indemnización paraguay | finiquitojusto, toptrabajos, hacecuentas | Ninguna explica preaviso + indemnización + vacaciones dobles juntas |
| IRP | prensa, DNIT | Sin calculadora buena: oportunidad |
| IVA 5% / 10% | NO VERIFICADO (sin búsqueda disponible) | probable commodity |

Conclusión: competencia más débil que en UY, pero el MTESS ocupa el primer lugar en «simulador de liquidación ministerio de trabajo». La oportunidad es la calidad (desglose con artículo del Código) y contenido sobre IRP/RESIMPLE.

## 7. Productos pagos posibles

| Producto | Público | Por qué |
|---|---|---|
| Planilla de liquidación de sueldos + IPS + aguinaldo + planillas anuales del MTESS | PyMEs | La presentación anual de planillas al MTESS es una obligación conocida (NO VERIFICADO el formato vigente) |
| Planilla de empleada doméstica (sueldo, IPS, vacaciones, aguinaldo, liquidación) | hogares | Equiparación al 100% del mínimo y alta de IPS generan dudas |
| Informe de liquidación final con artículos del Código (PDF) | trabajadores despedidos | Insumo para reclamar ante el MTESS |
| Planilla IRP + IVA para profesionales independientes | contribuyentes de servicios personales | DJ de marzo y umbral de 80 M |

Medios de pago: sin MercadoPago. Opciones: Bancard (vPOS), Pagopar/upay, billeteras Tigo Money y Personal (NO VERIFICADO integración y comisiones), dLocal (NO VERIFICADO).

## 8. Calendario de picos

| Mes | Evento | Calculadoras |
|---|---|---|
| Febrero | DJ RESIMPLE (hasta el 26/2 en 2026) | RESIMPLE |
| Marzo | DJ IRP anual | IRP |
| Marzo, junio, setiembre, diciembre | Cuotas RESIMPLE | RESIMPLE |
| Junio | Anuncio de reajuste del salario mínimo (BCP informa inflación de mayo) | salario mínimo, neto |
| Julio | Nuevo salario mínimo (1/7) | salario mínimo, jornal, doméstica |
| Noviembre a diciembre | Aguinaldo (pago antes del 31/12) | aguinaldo (pico principal) |
| Diciembre a febrero | Vacaciones de verano | vacaciones |
| Todo el año | IPC mensual, IVA mensual | inflación, IVA |
