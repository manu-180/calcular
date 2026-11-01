# Ruanda (`rw`): informe del agente

- **Rama:** `claude/pais-rw` (base `origin/main` en `b10c75cb`). Último commit: el que agrega este informe (ver `git log -1`).
- **Mercado:** `rw`, `en-RW`, trato `tu`, RWF (0 decimales, símbolo fijado en «RWF» porque Intl escribe «RF»), `Africa/Kigali`, escala 1450, estado `interno`.
- **Total:** 64 calculadoras en el registro: 24 locales (23 publicables y 1 en borrador) y 40 universales.

## Calculadoras locales

| slug | concepto | ¿publicable? | por qué |
|---|---|---|---|
| net-salary-calculator | sueldo-neto | sí | Bandas PAYE y aportes RSSB leídos en la RRA. Declara `mundo` y entra a la grilla como `declarado` |
| paye-calculator | impuesto-renta | sí | Bandas de la RRA, 30 % del segundo empleador y 15 % del trabajo eventual |
| rssb-contribution-calculator | aportes-seguridad-social | sí | Pensión 6+6, maternidad 0,3+0,3, CBHI 0,5 % y RAMA 7,5+7,5, todo de la RRA |
| employer-cost-calculator | costo-empleador | **no (borrador)** | El 2 % de riesgos del trabajo no está en ninguna fuente oficial que hoy se pueda abrir |
| notice-period-calculator | preaviso | sí | Ley 66/2018, art. 24 |
| terminal-benefits-calculator | indemnizacion-despido | sí | Ley 66/2018, arts. 31 y 32 |
| unfair-dismissal-calculator | propio | sí | Ley 66/2018, art. 30 |
| annual-leave-calculator | vacaciones | sí | Ley 66/2018, art. 46 |
| sick-leave-calculator | propio | sí | Ley 66/2018, arts. 54 y 55 |
| maternity-leave-calculator | propio | sí | Página de RSSB: 14 semanas y reintegro de las últimas 8 |
| vat-calculator | iva | sí | 18 % y umbrales de inscripción de la RRA (reemplaza a la universal `vat`) |
| withholding-tax-calculator | propio | sí | Página de tipos de retención de la RRA |
| rental-income-tax-calculator | propio | sí | Bandas anuales y deducción del 50 % (RRA) |
| small-business-tax-calculator | regimen-simplificado | sí | Montos fijos y 3 % (guía RRA 2025) |
| capital-gains-tax-calculator | propio | sí | 10 % (guía RRA 2025) |
| business-income-tax-calculator | propio | sí | Sociedades al 28 % y bandas anuales para personas (guía RRA 2025) |
| property-tax-calculator | propio | sí | Tasas de impuesto inmobiliario de la RRA |
| property-sale-tax-calculator | propio | sí | 2 % o 2,5 % sobre lo que excede RWF 5.000.000 (RRA) |
| trading-licence-calculator | propio | sí | Tabla de patentes de la RRA |
| tax-penalty-calculator | propio | sí | Multas e intereses de la ley 020/2023 y de los impuestos de distrito (RRA) |
| road-maintenance-levy-calculator | propio | sí | Ley 013/2025 (guía RRA 2025) |
| tourism-tax-calculator | propio | sí | 3 %, ley 015/2025 (guía RRA 2025) |
| usd-to-rwf | tipo-de-cambio | sí | Serie diaria del BNR (USD y EUR, tasa promedio) |
| inflation-calculator | inflacion | sí | IPC urbano del NISR, mensual desde 2009 |

## Universales

Entran con `universales: "todas"`: son 40. La universal `vat` se cae sola porque hay una calculadora local de IVA. No excluí ninguna.

## Datos

Son 63 datos, con 62 tramos verificados el 2026-10-26. Todos tienen URL https y se leyeron en fuente primaria:

- **RRA (páginas web):**
  - Cálculo de PAYE.
  - Tipos de retención.
  - Las cuatro páginas de aportes RSSB: pensión, maternidad, CBHI y médico.
  - IVA: tasas e inscripción.
  - Renta de alquileres, impuesto inmobiliario, impuesto a la venta de inmuebles, patente y multas de distrito.
  - Declaración de renta: intereses y multas.
- **RRA, «Basic information on Rwanda taxation system, version 2025» (PDF):**
  - Trabajo eventual.
  - Bandas anuales para personas.
  - Sociedades al 28 %.
  - Régimen de montos fijos y 3 %.
  - Ganancias de capital al 10 %.
  - Peaje vial.
  - Impuesto turístico.
- **Official Gazette (PDF de Minijust):** ley 66/2018, más la ley 027/2023, que solo modificó los arts. 24 (agrega el 24 bis), 43, 44, 45, 56 y 57.
- **RSSB:** página del Maternity Leave Benefit Scheme.
- **Series:** `rw.usd` y `rw.eur` del BNR (`fxrates.bnr.rw/currency_history`, el mismo origen que la tabla de bnr.rw) y `rw.cpi-urban` del NISR (planilla `CPI_time_series_September_2026.xls`, redondeada a un decimal como en cada informe mensual).

**No verificados (3 tramos):**

- `rw.occupational-hazards` (2 % a cargo del empleador): lo dan las guías de nómina, pero la página de RSSB que lo decía hoy devuelve 404 y la RRA no lo lista. Por eso `employer-cost-calculator` quedó en borrador.
- `rw.pension-employee` y `rw.pension-employer` desde 2027-01-01 (7 % cada uno): RSSB anunció +2 puntos por año desde 2027 hasta llegar al 20 % en 2030, pero no encontré una orden publicada en el boletín y la página del cronograma da 404. El tramo vigente (6 %) tiene `hasta: 2026-12-31` y `proximaRevision: 2027-01-01`.

## Detectores (18), probados contra las fuentes reales el 2026-10-26

Script: `npx tsx scripts/paises/rw/probar_detectores.ts`.

- **Series (3):**
  - `rw.usd-bnr` y `rw.eur-bnr`: JSON del BNR con las últimas dos semanas. Devolvieron 11 puntos cada uno; último USD 1476,015.
  - `rw.cpi-nisr`: busca el último informe del IPC desde la portada del NISR y lee la tabla de 13 meses. Devolvió 13 puntos; último 223,7 (septiembre de 2026).
- **Normas (15):**
  - 13 páginas de la RRA: el detector avisa si una deja de mostrar los valores que leímos.
  - La lista de leyes de la RRA: avisa si aparece una ley posterior al 27/05/2025. El regex reconoce las 40 leyes de la página.
  - La página de maternidad de RSSB.
  - Las 15 devolvieron 0 hallazgos.

## Checks

| check | resultado |
|---|---|
| `tsc --noEmit` | sin errores |
| `check_paises rw` | OK: 63 datos, 3 series, 64 calculadoras. Un aviso: el tipo de cambio deja de ser publicable si el cron no suma puntos en 10 días (es lo esperado) |
| `check_paises_casos rw` | 77 casos en 23 archivos, todos OK |
| `check_textos_paises rw` | 1115 textos revisados, 0 avisos |
| `check_fronteras` | **1 falla ajena:** `src/motor/compartir/AlCelu.tsx:4` importa `uqr`. Viene así de main (`b10c75cb`); no la toqué |
| `check_eol` | OK (12822 archivos) |
| `check_motor` (con rw registrado localmente) | 3855 pruebas OK |
| `check_mundo` | Con rw en `interno` no aparece, porque la grilla solo toma mercados visibles en producción. Pasándolo a `publicado` solo en local: `RW rw declarado 28.9 % 34.3 % 35.8 %`, 12 pagas, OK |
| `next dev` (puerto 3102) | `/rw`, `/rw/net-salary-calculator`, `/rw/terminal-benefits-calculator` y `/rw/loan` dan 200 y no queda ningún marcador sin resolver. El borrador da 404 |

## Riesgos y dudas para el coordinador

1. **Base del CBHI.** La RRA dice «0.5 % of the net salary» sin definir qué es el neto. Lo tomé como el sueldo después de PAYE, pensión y maternidad (sin RAMA), que es la práctica de las nóminas. Está explicado en el texto de la calculadora.
2. **Pensión.** La RRA dice 6 % + 6 %, pero el FAQ de rssb.rw todavía dice «15 % of basic salary, 7.5 % + 7.5 %», que parece una confusión con RAMA. Usé el dato de la RRA. La fecha 2025-01-01 sale del anuncio de la reforma, porque la página de la RRA no la trae.
3. **PAYE.** Usé el redondeo hacia arriba al franco entero que indica la calculadora oficial de la RRA. Los aportes se redondean a la mitad hacia arriba.
4. **Intereses por mora.** Apliqué la tasa según la demora total («a delay not exceeding six months» → 0,5 % por cada mes) a todos los meses, y conté 30 días por mes. Es la lectura literal de la tabla de la RRA, pero hay otra lectura posible (tasa escalonada mes a mes).
5. **Vacaciones de menores.** Les apliqué también el tope de 21 días que dice «in any case» (2 días/mes × 12 = 24 queda en 21).
6. **Patente de vehículos.** La tabla de la RRA dice «40.000/40.000» (anual/trimestral); por eso no muestro el trimestral para vehículos. Además, la tabla no cubre a inscriptos con facturación de 2 a 12 millones: la calculadora pide elegir otra opción.
7. **Sin calculadoras.** Salario mínimo: no hay orden ministerial vigente verificable. Horas extra: la ley no fija recargo. Licencia por paternidad: la cantidad de días la fija una orden ministerial que no encontré.
8. **`next dev`.** Turbopack falla con el `node_modules` en junction («points out of the filesystem root»). Funciona con `next dev --webpack` y `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3102`.
9. `src/paises/index.ts` no está commiteado: rw hay que registrarlo al publicar.
