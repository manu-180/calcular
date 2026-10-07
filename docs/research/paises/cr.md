# Costa Rica: investigación de producto y datos legales

Fecha de corte: 7/10/2026. Verificaciones hechas el 7/10/2026. «NO VERIFICADO» = no se pudo confirmar en fuente oficial primaria en esta sesión; no usar en producción sin revisar.

Limitación de la sesión: hacienda.go.cr e inec.cr devuelven 403 (Cloudflare) a clientes automáticos, tanto con curl como con WebFetch; ccss.sa.cr no responde. Los datos fiscales y de cargas sociales salen de fuentes secundarias de calidad (EY, prensa) y quedan marcados. El presupuesto de búsquedas web se agotó a mitad de la sesión.

## 1. Resumen

| Tema | Conclusión |
|---|---|
| Atractivo del mercado | **7/10.** Población ~5,2 M (NO VERIFICADO) con ingreso alto para la región y alta bancarización. El derecho laboral genera calculadoras con mucho volumen (aguinaldo, cesantía, preaviso, liquidación) y el salario mínimo tiene decenas de categorías por perfil, lo que justifica una herramienta buena. Contra: moneda propia (colón) y fuentes oficiales detrás de Cloudflare, lo que complica la automatización. |
| Diferencial posible | Liquidación completa (preaviso + cesantía con la tabla por años + vacaciones + aguinaldo proporcional), impuesto al salario con créditos por hijo y cónyuge, buscador de salario mínimo por perfil ocupacional (el MTSS lo tiene en un tablero Power BI difícil de usar). |
| Fuentes automáticas | Débiles: Hacienda e INEC con 403; el MTSS publica salarios mínimos en Power BI; el servicio web histórico del BCCR devolvió 503 el 7/10. |
| Competencia | Blogs de software contable (Alegra, Siempre al Día), portales de empleo y prensa; el MTSS tiene calculadora oficial de aguinaldo. No hay competidor multipaís tipo hacecuentas (su sitemap no tiene /cr/, verif. 7/10). |
| Medio de pago | MercadoPago no opera en Costa Rica. SINPE Móvil (BCCR) es el medio local dominante; PayPal o merchant of record para tarjeta internacional. |

## 2. Valores clave vigentes

| Concepto | Valor | Vigencia | Base legal | Fuente | Verif. |
|---|---|---|---|---|---|
| Impuesto al salario, tramos mensuales | hasta ₡918.000: exento; ₡918.000 a ₡1.347.000: 10%; ₡1.347.000 a ₡2.364.000: 15%; ₡2.364.000 a ₡4.727.000: 20%; más de ₡4.727.000: 25% | 1/1/2026 a 31/12/2026 | Decreto Ejecutivo 45333-H, La Gaceta 229 del 5/12/2025 | EY Tax Alert: https://www.ey.com/es_ce/technical/tax/tax-alerts/costa-rica-ministerio-de-hacienda-establecio-los-tramos-del-impuesto-sobre-la-renta-para-el-periodo-fiscal-2026 ; Observador: https://observador.cr/hacienda-cobrara-renta-a-salarios-a-partir-de-los-918-000-en-2026-antes-se-hacia-desde-los-922-000/ | 7/10 en EY y prensa; hacienda.go.cr con 403. NO VERIFICADO en fuente primaria |
| Créditos fiscales asalariados (mensuales) | por hijo ₡1.710; por cónyuge ₡2.590 | 2026 | idem | EY | NO VERIFICADO en fuente primaria |
| Tramos 2025 (referencia) | exento hasta ₡922.000 | 2025 | | Observador | prensa |
| Por qué bajaron | inflación interanual negativa (-0,38%) usada para indexar | | | EY | prensa |
| Personas físicas con actividad lucrativa (anual) | exento hasta ₡6.244.000 (antes ₡4.094.000), tramos ampliados por la Ley 10.667 desde 1/1/2026; créditos anuales por hijo ₡20.520 y por cónyuge ₡31.080 | 2026 | Ley 10.667; Decreto 45333-H | EY | NO VERIFICADO en fuente primaria; tramos completos no extraídos |
| Salarios mínimos sector privado | aumento general 1,63%; trabajo doméstico +3,96%; ocupaciones especializadas +2,18%; técnicos medios +2,50% | desde 1/1/2026 | Decreto Ejecutivo 45303-MTSS; sesión 5886 del Consejo Nacional de Salarios (27/10/2025) | Observador: https://observador.cr/aprobado-aumento-del-163-para-los-salarios-minimos-en-el-2026/ ; Écija: https://www.ecija.com/actualidad-insights/actualizacion-de-tramos-de-renta-y-aumento-del-salario-minimo-entran-en-vigor-el-1-de-enero-de-2026 | prensa. NO VERIFICADO en el decreto |
| Montos de ejemplo | trabajo doméstico ₡268.731,31 mensual; licenciado universitario ₡796.921,00 mensual | 2026 | idem | Siempre al Día (agregador) | NO VERIFICADO |
| Lista completa por perfil | tablero Power BI del MTSS con la OIT | | | https://www.mtss.go.cr/temas-laborales/salarios/salario_minimo.html | 7/10 (existe el enlace; los montos no son extraíbles por HTML) |
| Ajuste 2027 | lo fija el CNS en el último trimestre de 2026 con la fórmula IPC + productividad (PIB per cápita) | 1/1/2027 | | prensa | patrón histórico; si existe ajuste de segundo semestre 2026: NO VERIFICADO |

### Seguridad social (CCSS)

ccss.sa.cr no respondió el 7/10. Todo NO VERIFICADO.

| Aporte | Tasa de referencia | Verif. |
|---|---|---|
| Trabajador | 10,83% (SEM 5,50% + IVM 4,33% + Banco Popular 1%); la cuota IVM sube por escalones cada 3 años | NO VERIFICADO (valor de memoria, confirmar antes de usar) |
| Patrono | alrededor de 26,5% a 26,7% según el escalón IVM vigente | NO VERIFICADO |

### Derechos laborales (Código de Trabajo y Ley 2412 de aguinaldo)

Texto oficial no consultado (SCIJ es una aplicación JavaScript que no se pudo navegar en esta sesión). Reglas: NO VERIFICADO contra texto legal; coinciden con lo que publican las fuentes secundarias.

| Instituto | Regla | Base |
|---|---|---|
| Aguinaldo | Suma de salarios ordinarios y extraordinarios del 1/12 del año anterior al 30/11 / 12. Pago dentro de los primeros 20 días de diciembre. Exento de renta y de cargas sociales | Ley 2412 |
| Preaviso | 3 a 6 meses: 1 semana; 6 a 12 meses: 15 días; más de 1 año: 1 mes | CT art. 28 |
| Cesantía | 3 a 6 meses: 7 días; 6 a 12 meses: 14 días; desde 1 año, tabla de días por año (19,5 a 22) con tope de 8 años; base: promedio de los últimos 6 meses | CT art. 29 (reformado por Ley de Protección al Trabajador) |
| Vacaciones | 2 semanas por cada 50 semanas trabajadas | CT art. 153 |
| Horas extra | jornada extraordinaria pagada a tiempo y medio (+50%) | CT art. 139 |
| Período de prueba | hasta 3 meses | CT art. 28 |

Herramienta oficial existente: calculadora de aguinaldo del MTSS, https://www.mtss.go.cr/buscador/Aguinaldo.aspx (enlazada desde https://www.mtss.go.cr/tramites-servicios/calculadoras.html; responde 403 a clientes automáticos). Es competencia directa para «calcular aguinaldo».

## 3. Calculadoras priorizadas por demanda

Demanda estimada de forma cualitativa (cobertura de prensa y blogs por tema en 2026, obligatoriedad del pago). **Sin datos de volumen**; validar con Keyword Planner en geo Costa Rica.

| # | Calculadora (nombre local) | Por qué | Estado de los datos |
|---|---|---|---|
| 1 | Aguinaldo | Pico noviembre y diciembre, universal; el MTSS tiene la suya, hay que ser mejor (proporcional, horas extra, comisiones, explicación) | Fórmula NO VERIFICADO en ley |
| 2 | Liquidación laboral (preaviso + cesantía + vacaciones + aguinaldo) | Alta intención, mejor candidata a planilla paga | NO VERIFICADO en ley |
| 3 | Impuesto al salario / salario neto | Universal; tramos cambian cada enero | Tramos en EY; CCSS NO VERIFICADO |
| 4 | Salario mínimo por perfil (buscador) | Decenas de categorías, tablero oficial incómodo | Montos NO VERIFICADO |
| 5 | Vacaciones | Todo el año | NO VERIFICADO |
| 6 | Horas extra | Todo el año | NO VERIFICADO |
| 7 | Trabajo doméstico (salario + CCSS + aguinaldo) | Subió 3,96% en 2026, buena nota | NO VERIFICADO |
| 8 | Renta de actividad lucrativa (independientes) | Ley 10.667 cambió tramos en 2026 | Parcial (EY) |
| 9 | Inflación / IPC | Fácil, baja intención | Fuente con 403 |
| 10 | Tipo de cambio colón/dólar | Muy buscado en CR, cubierto por bancos y BCCR | BCCR |

## 4. Fuentes automatizables (probadas el 7/10/2026)

| Fuente | URL | Formato | Estado |
|---|---|---|---|
| MTSS | https://www.mtss.go.cr/ | HTML estático (Hermes-Soft); salarios mínimos en Power BI; actas del CNS en PDF | 200 OK; montos solo en Power BI (no automatizable de forma simple) |
| Ministerio de Hacienda | https://www.hacienda.go.cr/ | | **403 Cloudflare** (curl y WebFetch) |
| INEC (IPC) | https://inec.cr/ | | **403 Cloudflare**; admin.inec.cr responde 200 (Drupal) pero no se ubicó la serie |
| BCCR, portal nuevo de indicadores | https://sdd.bccr.fi.cr/es/IndicadoresEconomicos/Inicio/ | aplicación JavaScript (SPA) | 200 OK; no se ubicó API pública documentada |
| BCCR, servicio web histórico | https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx | SOAP; requiere suscripción con correo y token | **503** el 7/10 |
| SCIJ (normativa) | https://pgrweb.go.cr/scij/ | SPA | 200 OK; no apto para cron simple |
| Imprenta Nacional (La Gaceta) | https://www.imprentanacional.go.cr/ | HTML/PDF | 200 OK |
| CCSS | https://www.ccss.sa.cr/ | | sin respuesta |

Conclusión: Costa Rica necesita carga manual asistida (un aviso cuando La Gaceta publica el decreto de tramos en diciembre y el de salarios en diciembre o enero) más que crons. El tipo de cambio podría venir del BCCR si el servicio con token vuelve a responder.

## 5. Idioma, tono y formato

| Tema | Recomendación |
|---|---|
| Tratamiento | **«Usted».** En Costa Rica el ustedeo es general, incluso entre amigos; el «vos» es informal. «Tú» suena extranjero. NO VERIFICADO (criterio lingüístico general) |
| Vocabulario | planilla, aguinaldo, cesantía, preaviso, liquidación, patrono, la Caja (CCSS), renta, salario mínimo por perfil (no calificado, semicalificado, calificado, especializado, técnico, diplomado, bachiller, licenciado), «tiempo y medio» |
| Moneda | Colón costarricense: ₡ (código CRC) |
| Números | Fuentes vistas usan punto de miles y coma decimal (₡268.731,31). El formato del decreto original: NO VERIFICADO |

## 6. Competencia (búsquedas del 7/10/2026 con buscador de EE. UU.; el orden en Google.co.cr puede variar)

| Búsqueda | Quién aparece | Hueco |
|---|---|---|
| impuesto al salario 2026 | blog.alegra.com, EY, PwC (PDF), observador.cr, siemprealdia.co, toptrabajos.com | Calculadora de neto con créditos y CCSS integrados |
| salarios mínimos 2026 | blog.alegra.com, siemprealdia.co, g-talent.net, aglegal.com (con buscador), observador.cr, Bloomberg Línea, ecija.com | Buscador por perfil rápido y móvil |
| aguinaldo | calculadora oficial del MTSS (no se pudo medir su posición) | Proporcionales y casos (comisiones, incapacidades) |

No hay competidor multipaís especializado en CR: hacecuentas.com no tiene páginas /cr/ (sitemap del 7/10).

## 7. Productos pagos posibles y medios de pago

| Producto | Comentario |
|---|---|
| Planilla de liquidación laboral (preaviso, cesantía, vacaciones, aguinaldo) | El más fuerte: la tabla de cesantía por años es la parte que la gente no sabe hacer |
| Planilla de nómina (CCSS obrero y patronal, renta, aguinaldo provisionado) | Pymes |
| Planilla de trabajo doméstico | Salario mínimo específico + CCSS |
| Informe de aguinaldo con desglose | Bajo precio, alto volumen en diciembre |

| Medio de pago | Estado |
|---|---|
| MercadoPago | **No opera en Costa Rica**: su documentación para desarrolladores solo lista AR, BR, CL, CO, MX, PE, UY (verif. 7/10). Existe mercadolibre.co.cr pero eso no habilita cobros |
| SINPE Móvil | Medio local dominante entre personas (página del BCCR: https://www.bccr.fi.cr/cr/es/sistema-de-pagos/servicios-sinpe/servicios-dirigidos-a-personas/sinpe-movil.html). Requiere cuenta en banco costarricense para recibir: no sirve sin entidad local |
| PayPal / merchant of record con tarjeta internacional | Opción realista desde Argentina; disponibilidad NO VERIFICADO en esta sesión |
| Procesadores locales (Tilopay, ONVO u otros) | NO VERIFICADO |

## 8. Calendario de picos (derivado de fechas legales; volumen NO VERIFICADO)

| Mes | Búsquedas que suben |
|---|---|
| Octubre y noviembre | debate y aprobación del salario mínimo del año siguiente en el CNS |
| Noviembre y diciembre | aguinaldo (pago hasta el 20 de diciembre), tramos de renta del año siguiente (decreto en diciembre) |
| Enero | salario mínimo nuevo, tramos nuevos, cálculo de planilla |
| Marzo | declaración anual de renta de actividades lucrativas (fecha exacta NO VERIFICADO) |

## 9. NO VERIFICADO (resumen)

- Tramos y créditos de renta 2026 en fuente primaria (Hacienda con 403); valores tomados de EY y prensa, coincidentes entre sí.
- Montos de salario mínimo por perfil (decreto 45303-MTSS no leído).
- Tasas CCSS obrero y patronal 2026.
- Todas las reglas del Código de Trabajo y la Ley 2412 contra el texto oficial.
- API del BCCR (servicio histórico en 503; portal nuevo sin API ubicada).
- Volúmenes de búsqueda.
