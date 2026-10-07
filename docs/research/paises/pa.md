# Panamá: investigación de producto y datos legales (versión esencial)

Fecha de corte: 7/10/2026. Verificaciones hechas el 7/10/2026. «NO VERIFICADO» = no se pudo confirmar en fuente oficial primaria en esta sesión; no usar en producción sin revisar.

Limitación de la sesión: el presupuesto de búsquedas web se agotó antes de llegar a Panamá, así que esta ficha se armó navegando directamente sitios oficiales. El decreto de salario mínimo vigente existe y está identificado, pero es un PDF escaneado (sin texto extraíble). css.gob.pa bloquea clientes automáticos.

## 1. Resumen

| Tema | Conclusión |
|---|---|
| Atractivo del mercado | **5/10.** Población ~4,5 M (NO VERIFICADO), dolarizado (USD a la par del balboa), ingreso alto. El décimo tercer mes en tres partidas genera tres picos de búsqueda al año y el salario mínimo tiene una matriz enorme (región × actividad × ocupación), que se presta a un buscador. Contra: mercado chico y sin competencia medida (sin datos de SERP en esta sesión). |
| Diferencial posible | Calculadora de décimo tercer mes por partida, prima de antigüedad + indemnización, buscador de salario mínimo por región y actividad, salario neto con CSS, seguro educativo e ISR. |
| Fuentes automáticas | Malas: decreto de salario mínimo escaneado, CSS bloqueada, INEC con páginas ASP.NET sin API. Carga manual cada dos años (el salario mínimo se revisa cada 2 años). |
| Medio de pago | MercadoPago no opera en Panamá. Tarjeta internacional vía PayPal o merchant of record; precio en USD. |

## 2. Valores clave vigentes

| Concepto | Valor | Vigencia | Base legal | Fuente | Verif. |
|---|---|---|---|---|---|
| Salario mínimo | Decreto Ejecutivo No. 13 del 31/12/2025, publicado en Gaceta Oficial Digital No. 30438 del 6/1/2026 (reemplaza al D.E. No. 1 del 10/1/2024) | desde enero 2026 (ciclo bienal 2026-2027, NO VERIFICADO) | D.E. 13/2025 | MITRADEL: https://www.mitradel.gob.pa/el-salario-minimo-en-panama/ ; PDF: https://www.mitradel.gob.pa/wp-content/uploads/2025/12/Decreto-Ejecutivo-No.13-del-31-de-diciembre-de-2025.pdf | 7/10 (decreto identificado). **Montos por hora, regiones y actividades: NO VERIFICADO** (PDF de 5 páginas escaneado como imagen) |
| Consulta oficial | MITRADEL ofrece consulta por región, actividad económica y provincia con resultado por e-mail o PDF | | | misma página | 7/10 |
| Moneda | Balboa a la par con el dólar; circula el USD | | | | conocimiento general |

### Seguridad social e impuesto sobre la renta

css.gob.pa y dgi.mef.gob.pa no expusieron estos datos en esta sesión. Todo NO VERIFICADO.

| Concepto | Valor de referencia | Base legal | Verif. |
|---|---|---|---|
| CSS trabajador | 9,75% | Ley Orgánica de la CSS, reformada por Ley 462 de 2025 | NO VERIFICADO |
| CSS empleador | 13,25%, con aumentos escalonados previstos por la Ley 462 de 2025 (calendario exacto NO VERIFICADO) | idem | NO VERIFICADO |
| Seguro educativo | trabajador 1,25%; empleador 1,50% | | NO VERIFICADO |
| Riesgos profesionales | a cargo del empleador, tasa según actividad | | NO VERIFICADO |
| ISR personas naturales (anual) | hasta B/. 11.000: exento; B/. 11.000 a 50.000: 15% sobre el excedente de 11.000; más de B/. 50.000: B/. 5.850 + 25% sobre el excedente de 50.000 | Código Fiscal art. 700 (reforma Ley 8 de 2010) | NO VERIFICADO |

### Derechos laborales (Código de Trabajo y Decreto de Gabinete 221 de 1971)

Reglas: NO VERIFICADO contra texto oficial (no se consultó la Gaceta Oficial en esta sesión).

| Instituto | Regla | Base |
|---|---|---|
| Décimo tercer mes | 1/12 de lo devengado, pagado en 3 partidas: 15 de abril (período 16/12 a 15/4), 15 de agosto (16/4 a 15/8) y 15 de diciembre (16/8 a 15/12). Cotiza CSS a tasa reducida (7,25%, NO VERIFICADO) y no paga seguro educativo | Decreto de Gabinete 221/1971 |
| Prima de antigüedad | 1 semana de salario por cada año trabajado, en contratos por tiempo indefinido, al terminar la relación por cualquier causa | CT art. 224 |
| Indemnización por despido injustificado | escala por años de servicio (semanas de salario por año) | CT art. 225 |
| Vacaciones | 30 días por cada 11 meses de trabajo continuo | CT art. 54 |
| Horas extra | recargos de 25%, 50% y 75% según jornada (diurna, nocturna, mixta); NO VERIFICADO | CT art. 33 |

## 3. Calculadoras priorizadas por demanda

Demanda estimada de forma cualitativa (obligatoriedad y frecuencia del pago). **Sin datos de volumen ni de SERP**; validar con Keyword Planner en geo Panamá.

| # | Calculadora | Por qué |
|---|---|---|
| 1 | Décimo tercer mes (por partida) | Tres picos al año, universal en el sector privado |
| 2 | Liquidación (prima de antigüedad + indemnización + vacaciones + XIII proporcional) | Alta intención; candidata a planilla paga |
| 3 | Salario mínimo por región y actividad | Matriz grande; el decreto es una imagen, una tabla limpia tiene valor |
| 4 | Salario neto (CSS + seguro educativo + ISR) | Universal |
| 5 | Vacaciones | Todo el año |
| 6 | Impuesto sobre la renta anual | Declaración en marzo (fecha NO VERIFICADO) |

## 4. Fuentes automatizables (probadas el 7/10/2026)

| Fuente | URL | Formato | Estado |
|---|---|---|---|
| MITRADEL | https://www.mitradel.gob.pa/ | WordPress pesado (página de salario mínimo de 1,6 MB); PDF escaneado | 200 OK, lento (más de 60 s en algunos intentos) |
| Gaceta Oficial | https://www.gacetaoficial.gob.pa/ | HTML/PDF | 200 OK |
| INEC (IPC) | https://www.inec.gob.pa/ | páginas ASP.NET de publicaciones (`/publicaciones/Default3.aspx?ID_PUBLICACION=...`) | 200 OK; sin API |
| DGI (MEF) | https://dgi.mef.gob.pa/ | HTML/PDF | 200 OK desde Python; curl con timeout |
| CSS | https://www.css.gob.pa/ | | 403 con curl; 29 bytes con Python (bloqueo) |
| Superintendencia de Bancos | https://www.superbancos.gob.pa/ | HTML | 200 OK (posible fuente de tasas de depósitos; no explorado) |

## 5. Idioma, tono y formato

| Tema | Recomendación |
|---|---|
| Tratamiento | «Tú» (estándar en Panamá; «usted» en trato formal). NO VERIFICADO (criterio lingüístico general) |
| Vocabulario | décimo tercer mes («el décimo»), prima de antigüedad, planilla, quincena, Seguro Social (CSS), seguro educativo, ficha |
| Moneda | Balboa (B/.) a la par del USD; en la práctica se usa «$» o «B/.» |
| Números | Formato estadounidense habitual (coma de miles y punto decimal: B/. 1,250.50). NO VERIFICADO en documentos oficiales en esta sesión |

## 6. Competencia

NO VERIFICADO: no quedaban búsquedas para medir SERP. Dato verificado: hacecuentas.com no tiene páginas /pa/ (sitemap del 7/10). Medir antes de invertir: «décimo tercer mes Panamá», «calcular prima de antigüedad», «salario mínimo Panamá 2026», «liquidación laboral Panamá».

## 7. Productos pagos posibles y medios de pago

| Producto | Comentario |
|---|---|
| Planilla de liquidación (prima de antigüedad + indemnización + XIII + vacaciones) | La más fuerte |
| Planilla de nómina quincenal (CSS, seguro educativo, ISR, XIII en tres partidas) | Pymes; la quincena es el período de pago habitual |
| Tabla de salario mínimo 2026-2027 en Excel | Producto barato, aprovecha que el decreto es una imagen |

| Medio de pago | Estado |
|---|---|
| MercadoPago | **No opera en Panamá**: su documentación para desarrolladores solo lista AR, BR, CL, CO, MX, PE, UY (verif. 7/10) |
| PayPal / merchant of record con tarjeta internacional | Opción realista; precio en USD sin conversión. Disponibilidad NO VERIFICADO |
| Yappy u otros locales | Requieren cuenta local; NO VERIFICADO |

## 8. Calendario de picos (derivado de fechas legales; volumen NO VERIFICADO)

| Mes | Búsquedas que suben |
|---|---|
| Diciembre y enero, cada dos años (decretos de enero 2024 y diciembre 2025; próximo esperado a fines de 2027, NO VERIFICADO) | salario mínimo nuevo |
| Marzo | declaración de renta |
| Abril | primera partida del décimo tercer mes (15/4) |
| Agosto | segunda partida (15/8) |
| Diciembre | tercera partida (15/12) |

## 9. NO VERIFICADO (resumen)

- Montos del salario mínimo 2026 (decreto escaneado) y su período de vigencia.
- Tasas CSS (Ley 462 de 2025 y su escalonamiento), seguro educativo, tasa sobre el XIII mes.
- Escala del ISR del art. 700.
- Reglas del Código de Trabajo (art. 33, 54, 224, 225) y del Decreto de Gabinete 221/1971.
- Competencia y volúmenes de búsqueda.
