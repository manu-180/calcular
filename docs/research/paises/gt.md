# Guatemala: investigación para replicar calcular.ar

Fecha de verificación de todo el documento: **7 de octubre de 2026**, salvo que se indique otra.
Convención: «VERIFICADO» = leído en la fuente oficial primaria. «Secundaria» = prensa o consultoras. «NO VERIFICADO» = no confirmado en fuente primaria; no usar en producción sin revisar.

## 1. Resumen

| Tema | Estado |
|---|---|
| Salario mínimo 2026 (Acuerdo Gubernativo 256-2025) | VERIFICADO, leí el escaneo oficial firmado |
| Código de Trabajo (Decreto 1441): indemnización, vacaciones, horas extras | VERIFICADO, PDF del MINTRAB |
| Aguinaldo (Decreto 76-78) y Bono 14 (Decreto 42-92) | VERIFICADO, PDFs del MINTRAB |
| ISR asalariados (Decreto 10-2012) | NO VERIFICADO: portal.sat.gob.gt bloquea clientes automáticos (Cloudflare, 403) |
| Cuotas IGSS | NO VERIFICADO: igssgt.org no publica los porcentajes en páginas legibles |
| Tipo de cambio Banguat (SOAP) | VERIFICADO, respondió hoy |
| IPC INE | Sitio protegido por bot manager (Radware): no automatizable directo |
| Mercado Pago | No opera |

## 2. Calculadoras priorizadas

Demanda estimada: **cualitativa, no medida** (sin Keyword Planner ni Trends en esta sesión). Criterio: prestación obligatoria con fecha fija, universalidad y competidores que ya publican la página.

| # | Calculadora (nombre local) | Demanda estimada | Equivalente calcular.ar |
|---|---|---|---|
| 1 | Bono 14 | Muy alta, pico junio-julio | Aguinaldo |
| 2 | Aguinaldo | Muy alta, pico noviembre-enero | Aguinaldo |
| 3 | Indemnización y prestaciones laborales (liquidación) | Muy alta, todo el año | Indemnización / liquidación final |
| 4 | Salario mínimo 2026 por actividad y circunscripción | Alta, pico diciembre-enero | Salario mínimo |
| 5 | Sueldo líquido (IGSS + ISR) | Alta | Sueldo neto |
| 6 | ISR asalariados (proyección anual, planilla de IVA) | Media-alta, pico enero-marzo | Ganancias |
| 7 | Vacaciones | Media | Vacaciones |
| 8 | Horas extras | Media | Horas extras |
| 9 | Costo patronal (IGSS + IRTRA + INTECAP) | Media (pymes) | Liquidación de sueldos |
| 10 | Tipo de cambio quetzal-dólar e inflación | Media | Inflación |

### 2.1 Bono 14

| Campo | Valor |
|---|---|
| Base legal | Decreto 42-92, Ley de Bonificación Anual para Trabajadores del Sector Privado y Público |
| Fórmula | 100% del salario ordinario mensual por un año ininterrumpido; proporcional si es menos (art. 2) |
| Período | 1 de julio al 30 de junio (art. 3: proporcional «entre el uno de julio inmediato anterior y la fecha de terminación») |
| Pago | Primera quincena de julio (art. 3) |
| Independiente del aguinaldo | Sí (art. 1) |
| Efecto en indemnización | Se suma en la proporción de seis meses (art. 4) |
| URL | https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Ley-de-Bonificacion-Anual-para-Trabajadores-del-Sector-Privado-y-Publico-Decreto-42-92.pdf |
| Estado | VERIFICADO 07/10/2026 |

Fórmula: `bono14 = salario_promedio × días_trabajados_entre_01/07_y_30/06 / 365`.

### 2.2 Aguinaldo

| Campo | Valor |
|---|---|
| Base legal | Decreto 76-78, Ley Reguladora de la Prestación del Aguinaldo |
| Fórmula | 100% del salario ordinario mensual por un año de servicios continuos, o la parte proporcional (art. 1) |
| Pago | 50% en la primera quincena de diciembre y 50% en la segunda quincena de enero; o 100% en diciembre (art. 2) |
| Al terminar la relación | Pago inmediato de la parte proporcional (art. 5) |
| Efecto en indemnización | Se suma en la proporción de seis meses (art. 9) |
| Trabajadores de campo | Mínimo 150 jornadas en el año (art. 10) |
| URL | https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Ley-Reguladora-del-Aguinaldo-Decreto-76-78.pdf |
| Estado | VERIFICADO 07/10/2026 |

Período de cómputo **1 de diciembre al 30 de noviembre**: es el criterio de uso habitual, pero el Decreto 76-78 no lo dice. NO VERIFICADO en norma (posiblemente en su reglamento).

### 2.3 Indemnización y liquidación

| Concepto | Regla | Base legal |
|---|---|---|
| Indemnización por tiempo servido | Un mes de salario por cada año de servicios continuos; proporcional si no llega al año | Código de Trabajo art. 82 |
| Salario base | Promedio de los salarios de los **últimos seis meses** (art. 82 lit. b) |  |
| Más aguinaldo y Bono 14 | Ambos se suman «en la proporción correspondiente a seis meses de servicios» | Decreto 76-78 art. 9; Decreto 42-92 art. 4 |
| Vacaciones no gozadas | Compensables en dinero solo al terminar la relación | CT art. 133 |
| Aguinaldo y Bono 14 proporcionales | Pago inmediato al terminar | Decreto 76-78 art. 5; Decreto 42-92 art. 3 |

Fórmula de uso habitual: `salario_indemnizable = promedio_6_meses + promedio_6_meses / 12 (aguinaldo) + promedio_6_meses / 12 (Bono 14)`, es decir promedio × 14/12 («sexto de aguinaldo y sexto de Bono 14»). Esa lectura de «proporción de seis meses» es la práctica; NO VERIFICADO que sea la que aplica la calculadora oficial (calculoprestaciones.mintrabajo.gob.gt no respondió desde este entorno). La bonificación incentivo de Q250 no integra salario ordinario (Decreto 37-2001, NO VERIFICADO en texto).

URL: https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Codigo-de-Trabajo.pdf. Estado: VERIFICADO 07/10/2026 (arts. 82, 121, 130 a 133).

### 2.4 Salario mínimo 2026

**Acuerdo Gubernativo 256-2025**, vigente del 01/01/2026. CE1 = departamento de Guatemala; CE2 = resto del país. Mensual = diario × 365 / 12.

| Actividad | CE1 diario | CE1 mensual | CE2 diario | CE2 mensual |
|---|---|---|---|---|
| Agrícola | Q124.64 | Q3,791.20 | Q119.21 | Q3,625.89 |
| No agrícola | Q131.58 | Q4,002.28 | Q125.49 | Q3,816.90 |
| Exportadora y de maquila | Q112.10 | Q3,409.73 | Q105.90 | Q3,221.10 |

- Más la **bonificación incentivo** del Decreto 78-89 (art. 8 lit. e del acuerdo la exige; «queda prohibida la división»). Monto **Q250 mensuales** según Decreto 37-2001: NO VERIFICADO en texto legal (fuentes secundarias coinciden).
- Agrícola = sección A de la CIIU Rev. 4; no agrícola = secciones B a U (art. 1).
- El lugar del centro de trabajo define la circunscripción (art. 8 lit. c).
- Las multas laborales se calculan con el mínimo no agrícola de la circunscripción (art. 9).
- URL: https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Acuerdo-Gubernativo-Numero-256-2025-Salario-Minino.pdf (PDF escaneado, sin texto: el cron no puede leerlo, requiere OCR o carga manual).
- Estado: VERIFICADO 07/10/2026.
- Próxima actualización: acuerdo de diciembre 2026 para 2027. El MINTRAB ya publicó el acuerdo que nombra la Comisión Paritaria de Salario Mínimo «año 2026».

### 2.5 ISR asalariados (NO VERIFICADO)

SAT bloquea clientes automáticos con Cloudflare (403 en portal.sat.gob.gt, tanto por WebFetch como por curl). Lo que sigue es el esquema conocido del Decreto 10-2012 y **debe confirmarse en la SAT antes de publicar**:

| Ítem | Valor a confirmar |
|---|---|
| Base legal | Decreto 10-2012, Ley de Actualización Tributaria, Libro I, rentas del trabajo |
| Tramo 1 | Renta imponible hasta Q300,000: 5% |
| Tramo 2 | Más de Q300,000: Q15,000 + 7% del excedente |
| Deducción sin comprobar | Q48,000 anuales |
| Otras deducciones | Cuotas IGSS, hasta Q12,000 por planilla de IVA, primas de seguro de vida, donaciones con límite |
| Exentos | Aguinaldo y Bono 14 hasta 100% del salario |

### 2.6 Sueldo líquido y costo patronal (NO VERIFICADO)

| Cuota | Valor a confirmar |
|---|---|
| IGSS laboral | 4.83% |
| IGSS patronal | 10.67% |
| IRTRA | 1% patronal |
| INTECAP | 1% patronal |

El sitio del IGSS (igssgt.org, responde 200, lento: 14 s) no muestra estos porcentajes en sus páginas «patronos», «consulta de cuotas» ni «preguntas frecuentes». Buscar el acuerdo de Junta Directiva vigente antes de publicar.

### 2.7 Vacaciones y horas extras

- Vacaciones: mínimo **15 días hábiles** remunerados por año continuo (CT art. 130); requiere 150 días trabajados en el año si el contrato no exige todas las jornadas (art. 131); se fijan dentro de los 60 días siguientes (art. 132). VERIFICADO.
- Horas extras: al menos **50% más** del salario (CT art. 121). VERIFICADO.

## 3. Fuentes automatizables (probadas el 07/10/2026)

| Dato | URL | Formato | Frecuencia | Prueba |
|---|---|---|---|---|
| Tipo de cambio de referencia | https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx (operación `TipoCambioDia`, SOAPAction `http://www.banguat.gob.gt/variables/ws/TipoCambioDia`) | SOAP/XML | Diaria | 200. Respuesta: 06/10/2026, referencia Q7.63715 por dólar |
| Inflación Banguat | https://www.banguat.gob.gt/page/inflacion-total | HTML | Mensual | 200 (habría que parsear HTML o el archivo enlazado) |
| IPC y canasta básica INE | https://www.ine.gob.gt/indice-de-precios-al-consumidor/ · https://www.ine.gob.gt/canasta-basica-alimentaria/ | HTML/PDF | Mensual | La portada da 200, pero las páginas internas redirigen a validate.perfdrive.com (Radware): no apto para cron sin navegador |
| Acuerdos gubernativos (salario mínimo) | https://mintrabajo.gob.gt/acuerdos-gubernativos/ | HTML con PDFs | Anual (diciembre) | 200. PDF escaneado |
| SAT | https://portal.sat.gob.gt | HTML | n/a | **403** (Cloudflare) |
| Calculadora oficial | https://calculoprestaciones.mintrabajo.gob.gt/prestaciones/simple | Web | n/a | No resolvió desde este entorno (código 000) |
| Diario de Centro América | NO VERIFICADO URL de API o feed | | | No probado |

Cron sugerido: tipo de cambio diario por SOAP; salario mínimo por alerta en diciembre y carga manual del valor (el PDF es imagen).

## 4. Idioma, moneda y formato

| Tema | Recomendación |
|---|---|
| Tratamiento | **Usted** en interfaz (registro formal predominante en trámites); «vos» es coloquial. Observación propia |
| Palabras locales | «Bono 14», «aguinaldo», «indemnización», «prestaciones», «finiquito», «sueldo líquido», «planilla», «patrono», «IGSS», «bonificación incentivo», «circunscripción» |
| Moneda | Quetzal, **Q** (ISO GTQ) |
| Formato | Coma de miles y punto decimal: Q3,791.20 (así lo escribe el acuerdo oficial) |

## 5. Competencia en Google

Sin consultas SERP en esta sesión (cupo agotado). Competidores vistos en resultados y verificados por petición directa:

| Búsqueda principal (estimada) | Quién aparece | Hueco |
|---|---|---|
| calcular bono 14 | Calculadora oficial MINTRAB, finiquitojusto.com, cuantomecuesta.com/gt | Explicar período 1/7 a 30/6 con fechas exactas y caso de despido |
| calcular aguinaldo Guatemala | Ídem | Pago partido 50/50 dic-ene |
| calculo de indemnización Guatemala | MINTRAB, finiquitojusto.com | Desglose con sexto de aguinaldo y Bono 14 explicado |
| salario mínimo 2026 Guatemala | EY, Prensa Libre, La Hora, AGN, livinginguatemala.com, g-talent | Tabla con diario, mensual y total con bonificación, con el PDF oficial enlazado |
| ISR asalariados Guatemala | Blogs contables | Calculadora de proyección anual con planilla de IVA |
| sueldo líquido Guatemala | Pocos | Neto con IGSS e ISR mensual |

Competidores verificados: cuantomecuesta.com/gt (200) · finiquitojusto.com (cubre GT, gratis) · calculadora oficial del MINTRAB (enlazada desde https://mintrabajo.gob.gt/salario-minimo-y-calculo-de-prestaciones/, con secciones Aguinaldo, Bono 14 y Prestaciones). hacecuentas.com no tiene sección GT (404).

Hueco real: nadie vende planilla de nómina guatemalteca con IGSS, IRTRA, INTECAP, ISR y provisiones de aguinaldo y Bono 14.

## 6. Productos pagos y medios de pago

- **Mercado Pago no opera**: `www.mercadopago.com.gt` redirige a mercadolibre.com (prueba del 07/10/2026).
- **Recurrente** (recurrente.com): pasarela guatemalteca; según su sitio acepta Visa y Mastercard, ACH en Guatemala sin comisión y transferencias desde EE. UU., México y Europa; comisión de 4.50% mostrada en su calculadora POS. Requisitos para comerciante extranjero NO VERIFICADOS.
- PayPal (paypal.com/gt responde 200), Lemon Squeezy o Paddle como merchant of record con tarjeta internacional.
- Productos: planilla de nómina con IGSS e ISR; planilla de liquidación con Bono 14 y aguinaldo; planilla de vacaciones.

## 7. Picos de búsqueda (por calendario legal, no medidos)

| Mes | Disparador |
|---|---|
| Diciembre y enero | Salario mínimo nuevo (acuerdo de diciembre) y aguinaldo (dos cuotas) |
| Junio y julio | Bono 14 (pago primera quincena de julio) |
| Enero a marzo | ISR anual del asalariado (fecha de declaración NO VERIFICADA) |

## 8. NO VERIFICADO

- Todo el ISR asalariados (Decreto 10-2012): SAT inaccesible.
- Cuotas IGSS, IRTRA, INTECAP.
- Monto de la bonificación incentivo (Q250, Decreto 37-2001).
- Período 1/12 a 30/11 del aguinaldo.
- Interpretación «promedio × 14/12» de la indemnización en la calculadora oficial.
- Feed o API del Diario de Centro América.

## 9. Atractivo del mercado: 7/10

Mercado grande, dos prestaciones extra con picos fuertes (Bono 14 y aguinaldo), salario mínimo con seis valores que favorece páginas programáticas. Restan: SAT e INE bloquean automatización, alta informalidad laboral (dato NO VERIFICADO en esta sesión), Mercado Pago no opera.
