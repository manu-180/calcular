# Nicaragua: investigación de producto y datos legales (versión esencial)

Fecha de corte: 7/10/2026. Verificaciones hechas el 7/10/2026. «NO VERIFICADO» = no se pudo confirmar en fuente oficial primaria en esta sesión; no usar en producción sin revisar.

Limitación de la sesión: mitrab.gob.ni (Ministerio del Trabajo) rechaza la conexión desde fuera del país; el sitio del BCN tiene protección antibots con captcha (no se intentó sortear); dgi.gob.ni es una aplicación JavaScript que devolvió error en las páginas de legislación. El presupuesto de búsquedas web se agotó antes de llegar a Nicaragua.

## 1. Resumen

| Tema | Conclusión |
|---|---|
| Atractivo del mercado | **3/10.** Población ~6,9 M (NO VERIFICADO) pero el ingreso más bajo de los cuatro países, alta informalidad y baja capacidad de pago en línea. Calculadoras con demanda clara (aguinaldo, liquidación con indemnización del art. 45, IR salarial, INSS), pero monetización difícil. Riesgo adicional: contexto político y acceso limitado a fuentes oficiales. |
| Diferencial posible | Calculadora de liquidación (aguinaldo proporcional + vacaciones + indemnización art. 45) e IR salarial con INSS, en córdobas y con tipo de cambio oficial del día. |
| Fuentes automáticas | Sorprendentemente buenas para datos macro: el BCN tiene un servicio SOAP público de tipo de cambio que funciona, e INIDE publica IPC y canasta básica en XLS/XLSX con URLs predecibles. Malas para lo laboral (MITRAB no responde). |
| Medio de pago | MercadoPago no opera en Nicaragua. Solo tarjeta internacional (PayPal o merchant of record). |

## 2. Valores clave vigentes

| Concepto | Valor | Vigencia | Fuente | Verif. |
|---|---|---|---|---|
| Tipo de cambio oficial | C$ 36,6243 por USD | 7/10/2026 | BCN, servicio SOAP `RecuperaTC_Dia`: https://servicios.bcn.gob.ni/Tc_Servicio/ServicioTC.asmx | 7/10 (consulta real con respuesta 36.6243) |
| IPC julio 2026 | mensual -0,07%; acumulada 2,10%; interanual 4,0%; subyacente interanual 2,84% | publicado 13/8/2026 | INIDE: https://www.inide.gob.ni/docs/ipc/ipc_2026/ipc_jul26/Nota_de_Prensa_de_Inflaci%c3%b3n_julio_2026.pdf | 7/10 |
| IPC agosto y septiembre 2026 | no figuran publicados en la página de IPC del INIDE al 7/10 (el último es julio) | | https://www.inide.gob.ni/Home/ipc | 7/10 |
| Canasta básica julio 2026 | C$ 21.474,94 (53 productos: alimentos, usos del hogar, vestuario) | mensual | INIDE: https://www.inide.gob.ni/docs/CanastaB/canastab/CB2026/CBJul2026.xlsx | 7/10 |
| Salario mínimo por sector | | | MITRAB (no responde) | **NO VERIFICADO**: no se obtuvieron montos ni el acuerdo ministerial vigente |

### Seguridad social e IR salarial

Todo NO VERIFICADO (INSS y DGI no expusieron los datos a clientes automáticos).

| Concepto | Valor de referencia | Base legal | Verif. |
|---|---|---|---|
| INSS laboral | 7% | Decreto Presidencial 06-2019 (reforma al reglamento de la Ley de Seguridad Social) | NO VERIFICADO |
| INSS patronal | 21,5% (empleadores con menos de 50 trabajadores) y 22,5% (50 o más) | idem | NO VERIFICADO |
| INATEC | 2% patronal | | NO VERIFICADO |
| IR salarial, tabla anual | hasta C$ 100.000: 0%; C$ 100.000 a 200.000: 15% sobre el excedente; C$ 200.000 a 350.000: C$ 15.000 + 20%; C$ 350.000 a 500.000: C$ 45.000 + 25%; más de C$ 500.000: C$ 82.500 + 30%. Base: salario anualizado menos INSS laboral | Ley 822 de Concertación Tributaria, art. 23 | NO VERIFICADO |

### Derechos laborales (Código del Trabajo, Ley 185)

Reglas: NO VERIFICADO contra texto oficial.

| Instituto | Regla | Base |
|---|---|---|
| Aguinaldo (décimo tercer mes) | 1 mes de salario por año (proporcional si trabajó menos), pagado dentro de los primeros 10 días de diciembre; no paga INSS ni IR | CT art. 93 a 95 |
| Indemnización por antigüedad | 1 mes de salario por cada uno de los primeros 3 años; 20 días por año desde el cuarto; máximo 5 meses | CT art. 45 |
| Vacaciones | 15 días de descanso pagado por cada 6 meses de trabajo ininterrumpido | CT art. 76 |
| Horas extra | se pagan al 100% adicional (doble) | CT art. 62 |

## 3. Calculadoras priorizadas por demanda

Demanda estimada de forma cualitativa (obligatoriedad del pago). **Sin datos de volumen ni de SERP**; validar con Keyword Planner en geo Nicaragua.

| # | Calculadora | Por qué |
|---|---|---|
| 1 | Aguinaldo | Pico fuerte en noviembre y diciembre |
| 2 | Liquidación (indemnización art. 45 + vacaciones + aguinaldo proporcional) | Alta intención |
| 3 | Salario neto (INSS + IR) | Universal en empleo formal |
| 4 | Salario mínimo por sector | Ajuste anual; datos no alcanzables hoy |
| 5 | Conversor córdoba/dólar oficial | Automatizable al 100% con el SOAP del BCN, buen tráfico de entrada |
| 6 | Inflación y canasta básica | Automatizable con INIDE |

## 4. Fuentes automatizables (probadas el 7/10/2026)

| Fuente | URL | Formato | Estado |
|---|---|---|---|
| BCN, tipo de cambio | https://servicios.bcn.gob.ni/Tc_Servicio/ServicioTC.asmx (operaciones `RecuperaTC_Dia` con Año, Mes, Día; también existe una mensual) | SOAP/XML, sin autenticación | **200 OK, probado con respuesta real.** Diario |
| BCN, sitio web | https://www.bcn.gob.ni/ | | Protección antibots con captcha: no usar para crons |
| INIDE, IPC | https://www.inide.gob.ni/Home/ipc ; patrón `/docs/ipc/ipc_{AAAA}/ipc_{mes3}{AA}/Cuadros_Estadisticas_IPC_{mes}_{AAAA}.xls` | PDF y XLS | 200 OK; mensual con unas 2 semanas de rezago (julio publicado el 13/8) |
| INIDE, canasta básica | https://www.inide.gob.ni/Home/canasta ; patrón `/docs/CanastaB/canastab/CB{AAAA}/CB{Mes}{AAAA}.xlsx` (mayúsculas y abreviaturas irregulares: «CBMar26», «CBjun2026»: scrapear la página) | XLSX (total en la fila «TOTAL CANASTA BÁSICA») | 200 OK |
| MITRAB | https://www.mitrab.gob.ni/ | | Sin conexión desde fuera del país |
| DGI | https://www.dgi.gob.ni/ | SPA | 200 en portada; páginas de legislación con error |
| INSS | https://www.inss.gob.ni/ | | respuesta vacía a clientes automáticos |
| La Gaceta | https://www.lagaceta.gob.ni/ | HTML/PDF | 200 OK |

## 5. Idioma, tono y formato

| Tema | Recomendación |
|---|---|
| Tratamiento | **«Vos».** Nicaragua es plenamente voseante, como Argentina: el copy de calcular.ar se reutiliza casi sin cambios de conjugación. NO VERIFICADO (criterio lingüístico general) |
| Vocabulario | aguinaldo o décimo tercer mes, indemnización por antigüedad, liquidación, INSS, IR, planilla o nómina, córdobas, «reales» (coloquial para dinero) |
| Moneda | Córdoba (C$, código NIO); el dólar circula mucho para precios grandes |
| Números | Punto decimal y coma de miles en publicaciones oficiales (INIDE «2.10 por ciento»; BCN «36.6243»). Verif. 7/10 |

## 6. Competencia

NO VERIFICADO: no quedaban búsquedas para medir SERP. Dato verificado: hacecuentas.com no tiene páginas /ni/ (sitemap del 7/10).

## 7. Productos pagos posibles y medios de pago

| Producto | Comentario |
|---|---|
| Planilla de liquidación y nómina (INSS, IR, aguinaldo, vacaciones) | Única apuesta razonable; precio bajo |

| Medio de pago | Estado |
|---|---|
| MercadoPago | **No opera en Nicaragua**: su documentación para desarrolladores solo lista AR, BR, CL, CO, MX, PE, UY (verif. 7/10). Existe mercadolibre.com.ni pero no habilita cobros |
| PayPal / merchant of record con tarjeta internacional | Única vía realista; disponibilidad y restricciones (sanciones, bancos corresponsales) NO VERIFICADO |

## 8. Calendario de picos (derivado de fechas legales; volumen NO VERIFICADO)

| Mes | Búsquedas que suben |
|---|---|
| Febrero a marzo | ajuste anual del salario mínimo (mes exacto NO VERIFICADO) |
| Noviembre y diciembre | aguinaldo (pago en los primeros 10 días de diciembre) |

## 9. NO VERIFICADO (resumen)

- Salario mínimo vigente por sector y su acuerdo.
- Tasas INSS e INATEC; tabla del IR salarial (Ley 822 art. 23).
- Reglas del Código del Trabajo (art. 45, 62, 76, 93 a 95).
- Competencia y volúmenes de búsqueda.
