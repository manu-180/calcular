# República Dominicana: investigación para replicar calcular.ar

Fecha de verificación de todo el documento: **7 de octubre de 2026**, salvo que se indique otra.
Convención: «VERIFICADO» = leído en la fuente oficial primaria (texto legal, sitio del organismo o archivo descargado). «Secundaria» = solo en prensa o consultoras. «NO VERIFICADO» = no se pudo confirmar en fuente primaria; no usar en producción sin revisar.

## 1. Resumen

| Tema | Estado |
|---|---|
| Código de Trabajo (Ley 16-92) leído completo | VERIFICADO, PDF oficial del Ministerio de Trabajo |
| Salarios mínimos 2026 (CNS-01-2025) | VERIFICADO en comunicado oficial del MT |
| TSS: tasas y topes 2026 | VERIFICADO en tss.gob.do |
| Escala ISR 2026 | VERIFICADO contra la tabla oficial DGII (sin cambios desde 2023) |
| Escala ISR 2027 (Ley 30-26) | Secundaria; texto de la ley NO VERIFICADO |
| IPC y tasa de cambio BCRD | VERIFICADO, archivos descargados y leídos hoy |
| Mercado Pago | No opera (dominio redirige a mercadolibre.com) |

Hecho que cambia el calendario: la **Ley 30-26** (promulgada el 18/06/2026 según fuente secundaria) sube el tramo exento del ISR asalariado a RD$480,000 anuales **desde el ejercicio 2027**. Enero 2027 va a concentrar búsquedas de «nueva escala ISR 2027» y «cuánto me descuentan de ISR 2027». Es la oportunidad editorial más clara del país.

## 2. Calculadoras priorizadas

Demanda estimada: **estimación cualitativa propia**, no medida. No se usó Keyword Planner ni Trends (no disponibles en esta sesión). Criterios: obligación legal que afecta a todo asalariado formal, existencia de pago con fecha fija (genera picos) y cantidad de competidores que ya publican la página (señal de que hay tráfico). Referencia de escala: el MT informa que el aumento de 2026 alcanza a «alrededor de 1.4 millones de trabajadores» (mt.gob.do, 03/02/2026).

| # | Calculadora (nombre local) | Demanda estimada | Equivalente calcular.ar |
|---|---|---|---|
| 1 | Regalía pascual (salario de Navidad) | Muy alta, pico nov-dic | Aguinaldo |
| 2 | Prestaciones laborales (preaviso + cesantía + vacaciones + regalía proporcional) | Muy alta, todo el año | Indemnización / liquidación final |
| 3 | Sueldo neto (descuentos TSS + ISR) | Alta, todo el año | Sueldo neto |
| 4 | Retención ISR asalariados 2026 y 2027 | Alta, pico enero 2027 | Ganancias |
| 5 | Salario mínimo por tamaño de empresa | Media-alta, pico febrero | Salario mínimo |
| 6 | Vacaciones | Media | Vacaciones |
| 7 | Bonificación (participación en beneficios) | Media, pico marzo-mayo | Sin equivalente directo |
| 8 | Horas extras | Media | Horas extras |
| 9 | Aportes TSS (AFP, SFS, SRL) empleador y trabajador | Media (pymes) | Liquidación de sueldos |
| 10 | Trabajo doméstico (salario mínimo y prestaciones) | Media | Trabajo doméstico |
| 11 | Inflación IPC y tasa del dólar | Media | Inflación |

### 2.1 Regalía pascual

| Campo | Valor |
|---|---|
| Base legal | Código de Trabajo, arts. 219 a 222 (Ley 16-92) |
| Fórmula | Regalía = suma del salario ordinario devengado en el año calendario ÷ 12 |
| Exclusiones | Horas extraordinarias y participación en beneficios (art. 219) |
| Tope | 5 salarios mínimos legales (art. 219) |
| Proporcional | Sí, al tiempo trabajado en el año (art. 220) |
| Fecha límite de pago | A más tardar el 20 de diciembre (art. 220) |
| ISR | No sujeto a ISR, aunque supere 5 salarios mínimos (art. 222, párrafo agregado por Ley 204-97) |
| URL oficial | https://transparencia.mt.gob.do/images/docs/publicaciones/codigo-de-trabajo.pdf |
| Estado | VERIFICADO 07/10/2026 |

Punto a resolver en producto: qué salario mínimo usa el tope de 5 salarios (el del tamaño de empresa del trabajador o el nacional de TSS). El código dice «cinco salarios mínimos legalmente establecido» sin precisar. NO VERIFICADO el criterio administrativo; mostrar el supuesto en la calculadora.

### 2.2 Prestaciones laborales

| Concepto | Regla | Base legal |
|---|---|---|
| Preaviso | 3 a 6 meses: 7 días · 6 a 12 meses: 14 días · más de 1 año: 28 días | CT art. 76 |
| Cesantía | 3 a 6 meses: 6 días · 6 a 12 meses: 13 días · 1 a 5 años: 21 días por año · 5 años o más: 23 días por año. Fracción mayor de 3 meses se paga con los ordinales 1 y 2. Años anteriores a 1992: 15 días por año | CT art. 80 |
| Vacaciones | 1 a 5 años: 14 días laborables · 5 años o más: 18 días | CT art. 177 (mod. Ley 97-97) |
| Vacaciones proporcionales (menos de 1 año) | Más de 5 meses: 6 días; 6 m: 7; 7 m: 8; 8 m: 9; 9 m: 10; 10 m: 11; 11 m: 12 | CT arts. 179 y 180 |
| Despido injustificado | Preaviso + cesantía + hasta 6 meses de salario (art. 95 ord. 3) | CT art. 95 |
| Salario diario | Salario mensual promedio del último año ÷ 23.83 (quincenal ÷ 11.91; semanal ÷ 5.5) | Reglamento 258-93, art. 14 (mod. Decreto 565-99) |

Fórmula: `prestaciones = (días_preaviso + días_cesantía) × (promedio_mensual_último_año / 23.83) + vacaciones_no_disfrutadas + regalía_proporcional`.

Competidor oficial: el MT tiene calculadora propia en https://calculo.mt.gob.do/ (responde 200).

Estado: VERIFICADO 07/10/2026 en el PDF del Código y su reglamento (incluido en el mismo PDF).

### 2.3 Sueldo neto y aportes TSS

| Seguro | Trabajador | Empleador | Tope 2026 (desde 01/02/2026) |
|---|---|---|---|
| SFS (Seguro Familiar de Salud) | 3.04% | 7.09% | RD$232,230.00 (10 SMN) |
| SVDS / AFP (pensiones) | 2.87% | 7.10% | RD$464,460.00 (20 SMN) |
| SRL (riesgos laborales) | 0% | 1% fijo + 0.10 a 0.30 según riesgo (IDOPPRIL) | RD$92,892.00 (4 SMN) |

- Salario mínimo nacional para topes: **RD$23,223.00**, vigente desde 01/02/2026 (Resolución TSS 01-2025).
- Base legal: Ley 87-01 del Sistema Dominicano de Seguridad Social.
- URL: https://tss.gob.do/preguntas-frecuentes/ (tasas y topes) y https://tss.gob.do/tss-informa-nuevos-topes-de-cotizacion-del-regimen-contributivo-del-sdss/ (05/02/2026).
- Estado: VERIFICADO 07/10/2026.
- Próxima actualización: cuando el Comité Nacional de Salarios emita la próxima resolución del sector no sectorizado (la CNS-01-2025 cubre 2025 y 2026). Fecha NO VERIFICADA.

Fórmula neto: `neto = bruto − 3.04% × min(bruto, tope_SFS) − 2.87% × min(bruto, tope_AFP) − retención_ISR`.

### 2.4 Retención ISR asalariados

**Escala 2026 (anual), vigente sin indexación desde 2023:**

| Renta neta anual (RD$) | Impuesto |
|---|---|
| Hasta 416,220.00 | Exento |
| 416,220.01 a 624,329.00 | 15% del excedente de 416,220.01 |
| 624,329.01 a 867,123.00 | RD$31,216.00 + 20% del excedente de 624,329.01 |
| Más de 867,123.01 | RD$79,776.00 + 25% del excedente de 867,123.01 |

- Base legal: Código Tributario (Ley 11-92), art. 296.
- Verificación: la tabla oficial «Tabla de retención mensual para los asalariados, año 2023» de la DGII reproduce exactamente esta escala (comprobé tres filas: RD$42,450 mensual retiene 1,164.75; RD$58,050 retiene 3,805.85; RD$73,650 retiene 6,995.44). La DGII no publicó tablas 2024, 2025 ni 2026: la última en el listado es 2023, lo que confirma que la escala no se movió.
- URL: https://dgii.gov.do/publicacionesOficiales/tablaRetenciones/Paginas/default.aspx (PDF: `/publicacionesOficiales/tablaRetenciones/Retenciones/Retenciones 2023.pdf`).
- Exento mensual equivalente: RD$34,685.
- Base de cálculo: salario menos aportes del trabajador a AFP y SFS. Práctica estándar; artículo exacto NO VERIFICADO en esta sesión.
- Estado: VERIFICADO 07/10/2026.

**Escala 2027 (Ley 30-26, art. 21, reescribe el art. 296). Fuente secundaria (siemprealdia.co); texto de la ley NO VERIFICADO:**

| Renta neta anual (RD$) | Impuesto |
|---|---|
| Hasta 480,000 | Exento |
| 480,000.01 a 685,000 | 15% del excedente de 480,000.01 |
| 685,000.01 a 910,000 | RD$30,750 + 20% del excedente de 685,000.01 |
| 910,000.01 a 4,800,000 | RD$75,750 + 25% del excedente de 910,000.01 |
| Más de 4,800,000.01 | RD$1,048,250 + 27% del excedente de 4,800,000.01 |

Contradicción a resolver antes de publicar: Diario Libre (02/08/2026) dice que el exento mensual pasa a **RD$39,900**; siemprealdia y acento hablan de **RD$40,000** (480,000 ÷ 12). La aritmética de los tramos coincide con 40,000 (15% × 205,000 = 30,750). Según la fuente secundaria, la escala se ajustará anualmente por inflación acumulada. Pedir el texto en Gaceta Oficial o en dgii.gov.do antes de enero 2027.

### 2.5 Salarios mínimos 2026

Resolución **CNS-01-2025** (26/02/2025), sector privado no sectorizado. Aumento total 20% en dos tramos; el último (8%) rige desde el **01/02/2026**.

| Categoría | RD$ mensual | Estado |
|---|---|---|
| Grandes empresas | 29,988.00 | VERIFICADO (MT, 03/02/2026) |
| Medianas | 27,489.60 | VERIFICADO (MT) |
| Pequeñas | 18,421.20 | VERIFICADO (MT) |
| Microempresas | 16,993.20 | VERIFICADO (MT) |
| Vigilantes de seguridad privada | 24,633.00 | Secundaria (EY) |
| Trabajadores agrícolas (jornada de 8 h) | 714.60 **por jornada** | Secundaria (EY). Ojo: varias fuentes lo publican como «mensual», es diario |
| Zonas francas (CNS-03-2025, desde 01/06/2026) | 20,875.00 | Secundaria (EY) |
| Hoteles y casinos, más de 150 empleados (CNS-04-2025, desde 01/06/2026) | 21,840.00 | Secundaria (EY) |
| Hoteles y casinos, hasta 150 | 18,409.30 | Secundaria (EY) |
| Restaurantes y comida, más de 150 | 21,000.00 | Secundaria (EY) |
| Restaurantes y comida, hasta 150 | 17,701.25 | Secundaria (EY) |
| Trabajo doméstico | 13,000.00 desde 01/05/2025 | VERIFICADO en anuncio MT (14/04/2025). El PDF de la Resolución CNS-02-2025 en mt.gob.do es un escaneo ilegible por OCR; no confirmé si prevé tramo 2026 |

URLs: https://mt.gob.do/ministerio-de-trabajo-llama-a-empresarios-a-cumplir-con-el-pago-del-aumento-del-8-del-salario-minimo/ · https://mt.gob.do/gobierno-anuncia-aumento-salarial-del-30-para-las-trabajadoras-del-hogar/ · https://www.ey.com/es_ce/technical/tax/tax-alerts/republica-dominicana-salario-minimo-2026

Clasificación por tamaño: la define la Ley 488-08 de mipymes (empleados y ventas). Umbrales NO VERIFICADOS en esta sesión.

### 2.6 Bonificación (participación en beneficios)

| Campo | Valor |
|---|---|
| Base legal | CT arts. 223 a 225 |
| Regla | 10% de las utilidades netas anuales, repartido entre trabajadores por tiempo indefinido |
| Tope individual | 45 días de salario ordinario si tiene menos de 3 años; 60 días si tiene 3 años o más |
| Proporcional | Al salario del tiempo trabajado en el ejercicio |
| Plazo de pago | Entre 90 y 120 días después del cierre del ejercicio (cierre 31/12: abril-mayo) |
| Estado | VERIFICADO 07/10/2026 |

La calculadora solo puede dar el **tope** o el reparto si el usuario conoce la utilidad. El reparto entre trabajadores (proporción por salario) no está detallado en el código; NO VERIFICADO el método reglamentario.

### 2.7 Horas extras

CT art. 203: hasta 68 horas semanales, recargo no menor de 35%; más de 68 horas, recargo no menor de 100%. Valor hora: salario mensual ÷ 23.83 ÷ horas de la jornada (Reglamento 258-93, art. 32). VERIFICADO.

## 3. Fuentes automatizables (probadas el 07/10/2026)

| Dato | URL exacta | Formato | Frecuencia | Prueba |
|---|---|---|---|---|
| IPC nacional (serie mensual 1984-2026) | https://cdn.bancentral.gov.do/documents/estadisticas/precios/documents/ipc_base_2019-2020.xls | XLS (hoja «IPC base 2019-2020») | Mensual | 200, guardado 02/09/2026. Último dato: agosto 2026 = 140.7598; variación 12 meses 5.13% |
| Tasa del dólar diaria (compra/venta) y promedio mensual | https://cdn.bancentral.gov.do/documents/estadisticas/mercado-cambiario/documents/TASA_DOLAR_REFERENCIA_MC.xlsx | XLSX (hojas «Diaria» y «PromMensual») | Diaria | 200. Último: 05/10/2026 compra 60.3569, venta 61.0999. El `.xls` homónimo está congelado en 2022: usar `.xlsx` |
| Página de precios BCRD | https://www.bancentral.gov.do/a/d/2534-precios | HTML con links | Mensual | 200 |
| Topes y avisos TSS | https://tss.gob.do/wp-json/wp/v2/search?search=topes | JSON (API REST de WordPress) | Por evento (febrero) | 200, devuelve los posts de topes 2024 y 2026 |
| Noticias y salarios MT | https://mt.gob.do/wp-json/wp/v2/search?search=salario%20minimo | JSON (WordPress) | Por evento | 200 |
| Tablas de retención DGII | https://dgii.gov.do/publicacionesOficiales/tablaRetenciones/Paginas/default.aspx | HTML con PDFs | Anual (si cambia la escala) | 200 |
| Calculadora oficial de prestaciones | https://calculo.mt.gob.do/ | Web | n/a | 200 (competidor, no fuente) |
| ONE (estadística) | https://www.one.gob.do | HTML | n/a | **403** a clientes automáticos |

Cron sugerido: IPC el día 5 a 10 de cada mes; dólar diario; TSS y MT semanal vía API de WordPress buscando «salario mínimo», «topes», «resolución».

## 4. Idioma, moneda y formato

| Tema | Recomendación |
|---|---|
| Tratamiento | **Tú** en interfaz (uso coloquial dominante); **usted** en textos legales. Observación propia, no medida |
| Palabras locales | «regalía pascual» o «salario de Navidad» (no «aguinaldo»), «prestaciones laborales», «desahucio» (despido sin causa), «dimisión» (renuncia con causa), «cesantía», «TSS», «AFP», «SFS», «ARS», «bonificación», «patrono/empleador» |
| Moneda | Peso dominicano, **RD$** (ISO DOP) |
| Formato | Coma para miles y punto decimal: RD$29,988.00 (así publican MT, TSS y DGII) |

## 5. Competencia en Google

No pude correr consultas SERP en esta sesión (se agotó el cupo de búsquedas compartido). La lista sale de los resultados que aparecieron al investigar y de verificar cada sitio con una petición directa.

| Búsqueda principal (estimada) | Quién aparece | Hueco |
|---|---|---|
| calcular regalía pascual | hacecuentas.com/do, cuantomecuesta.com/rd, alegra (blog), siemprealdia.co | Ninguno explica el tope de 5 salarios con el monto en pesos de 2026 |
| calculadora prestaciones laborales | calculo.mt.gob.do (oficial), finiquitojusto.com, hacecuentas.com/do | La oficial tiene UX vieja; nadie muestra el desglose con el artículo al lado |
| sueldo neto República Dominicana | hacecuentas.com/do, cuantomecuesta.com/rd | Ninguno aplica topes TSS por seguro |
| tabla ISR 2026 / escala ISR 2027 | alegra, siemprealdia, revistamercado.do, acento | Calculadora comparativa 2026 vs 2027 con Ley 30-26: no la vi en nadie |
| salario mínimo 2026 RD | EY, alegra, g-talent, siemprealdia | Tabla completa por sector con fuente primaria |
| bonificación 45 y 60 días | blogs contables | Calculadora con tope automático |
| TSS aportes empleador | hacecuentas.com/do | Costo total del empleado para pymes |

Competidores verificados: hacecuentas.com/do (8 calculadoras, monetiza con AdSense, sin productos pagos) · cuantomecuesta.com/rd · finiquitojusto.com (21 países, gratis, sin productos pagos) · calculo.mt.gob.do.

Hueco real: nadie vende la planilla de nómina dominicana (regalía + TSS + ISR + prestaciones) ni actualiza sola con la tabla DGII y los topes TSS.

## 6. Productos pagos y medios de pago

- **Mercado Pago no opera**: `www.mercadopago.com.do` responde 301 a `mercadolibre.com` (genérico), igual que GT, SV y HN; los países donde opera (mx, co, cl, pe, uy) responden 200. Prueba del 07/10/2026.
- Alternativas probadas (sitio responde 200): **PayPal** (paypal.com/do), **Azul** (azul.com.do) y **CardNet** (cardnet.com.do), estas dos requieren comercio local (NO VERIFICADO requisito exacto); **Lemon Squeezy** y **Paddle** como merchant of record internacional con tarjeta, que es lo más simple para un vendedor argentino.
- Productos que encajan: planilla de nómina con TSS e ISR 2026/2027, planilla de prestaciones, planilla de regalía, informe «costo real de un empleado».

## 7. Picos de búsqueda (por calendario legal, no medidos)

| Mes | Disparador |
|---|---|
| Enero 2027 | Entra la escala ISR de la Ley 30-26 |
| Febrero | Topes TSS y salario mínimo (en 2026 el tramo rigió el 01/02) |
| Marzo a mayo | Bonificación (90 a 120 días tras el cierre) |
| Junio | Salarios de zonas francas y turismo (CNS-03 y CNS-04-2025, desde 01/06/2026) |
| Noviembre y diciembre | Regalía pascual (pago hasta el 20/12) |

## 8. NO VERIFICADO

- Texto oficial de la Ley 30-26 y la contradicción RD$39,900 vs RD$40,000 mensual.
- Montos de vigilantes, agrícolas, zonas francas y turismo (solo EY).
- Tramo 2026 del salario doméstico (resolución CNS-02-2025 ilegible).
- Criterio del tope de regalía (qué salario mínimo).
- Umbrales de tamaño de empresa (Ley 488-08).
- Artículo exacto que excluye AFP y SFS de la base del ISR.

## 9. Atractivo del mercado: 8/10

Datos oficiales muy automatizables (BCRD en Excel diario, TSS y MT con API WordPress), reforma ISR 2027 que va a generar búsquedas nuevas, competencia con UX floja o sin productos pagos. Resta: Mercado Pago no opera y el competidor oficial del MT ya ocupa «prestaciones».
