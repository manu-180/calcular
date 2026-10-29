# Fiyi (`fj`): informe del agente

- Rama: `claude/pais-fj` (base `origin/main`). `src/paises/index.ts` no se commitea (lo registra el coordinador).
- Mercado: `fj`, inglés (`en-FJ`), FJD, `Pacific/Fiji`, trato `tu`, escala 2, `estado: "interno"`.
- Total: **57 calculadoras** = 17 locales + 40 universales (la universal de IVA se cae sola porque hay `vat-calculator` local).

## Calculadoras locales

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| paye-calculator | impuesto-renta | sí | Tabla de residentes y no residentes de FRCS (desde el año 2024); ejemplo oficial de la Employer Guide 2026 como caso |
| net-pay-calculator | sueldo-neto (declara `mundo`, bruto anual) | sí | FRCS más FNPF del empleado (Budget Supplement 2026-27) |
| fnpf-calculator | aportes-seguridad-social | sí | Budget Supplement 2026-27 (empleador 8 % del 1/8/2026 al 31/7/2027, empleado 8 %) |
| employer-cost-calculator | costo-empleador | sí | ídem, más deducción del 150 % del exceso (resumen de políticas de FRCS) |
| minimum-wage | salario-minimo | sí, ver riesgos | Discurso del presupuesto 2024-25: FJ$4.50 desde 1/8/2024 y FJ$5.00 desde 1/4/2025 |
| vat-calculator | iva | sí | VAT Guide de FRCS: 12.5 % desde 1/8/2025, umbral FJ$100,000 |
| secondary-employment-tax-calculator | propio | sí | Employer Guide 2026 (código S y sin declaración, 20 %) |
| redundancy-tax-calculator | propio | sí | Employer Guide 2026 (exención de FJ$15,000) |
| fringe-benefits-tax-calculator | propio | sí | Employer Guide 2026 (20 %, ejemplo oficial como caso) |
| capital-gains-tax-calculator | propio | sí | Página de tasas de FRCS (10 %) |
| contract-payment-tax-calculator | retencion-honorarios | sí | Employer Guide 2026 (5 % sobre contratos de más de FJ$1,000) |
| withholding-tax-calculator | propio | sí | Página de tasas de FRCS (10 %, 15 %, 3 %) |
| paye-penalty-calculator | propio | sí | Employer Guide 2026 (20 % y 25 %) |
| annual-leave-calculator | vacaciones | no, borrador | Employment Relations Act 2007 sin texto oficial leído |
| overtime-calculator | horas-extra | no, borrador | ídem |
| redundancy-pay-calculator | indemnizacion-despido | no, borrador | ídem (FRCS resume una semana por año, no es el texto de la ley) |
| maternity-leave-calculator | propio | no, borrador | ídem |

## Datos

- **25 datos: 22 tramos verificados y 6 sin verificar**, todos con `verificadoEl: 2026-10-29`.
- Verificados, leídos el 29/10/2026: tasa-escala de FRCS (`tax-rates-and-codes`), VAT Guide, Employer Guide 2026 (PDF), Resumen de políticas de ingresos 2026-27 (PDF de FRCS), Budget Supplement 2026-27 (PDF del Ministerio de Finanzas) y Discurso del presupuesto 2024-25 (fiji.gov.fj).
- No verificados (todos de la Employment Relations Act 2007): días de vacaciones (10), licencia por enfermedad (10), licencia de maternidad (84), factor de horas extra (1.5), semanas de indemnización por año (1) y la tasa de FNPF del empleador desde el 1/8/2027 (10, sin dato oficial de qué pasa después del período de ocho por ciento). Motivo: laws.gov.fj, natlex.ilo.org, paclii.org y employment.gov.fj no cargaron desde este entorno, y el único texto oficial leído (Employer Guide) solo resume la indemnización. Las cuatro calculadoras que los usan quedaron en borrador.
- Descartado sin cargar: tasa de impuesto de servicios turísticos (5 %, desde el 1/9/2026, umbral FJ$2 millones). Figura en el resumen de políticas de FRCS como medida de presupuesto, pero no leí el texto de la Tourism Services Tax Act. Tampoco cargué series (tipo de cambio del RBF e IPC del Bureau of Statistics): no pude abrir las fuentes.

## Detectores (2) y prueba

- `fj.frcs-income-tax-bands` y `fj.frcs-vat-rate` (carril norma, html). Probé con curl que las expresiones regulares coinciden con el HTML real de las dos páginas de FRCS el 29/10/2026. No corrí el cron.

## Checks (corridos, con `fj` registrado localmente)

- `tsc --noEmit` (con `--max-old-space-size=8192`): sin errores.
- `check_paises fj`: OK, 25 datos, 57 calculadoras.
- `check_paises_casos fj`: 54 casos en 13 archivos, OK.
- `check_textos_paises fj`: 603 textos, 0 avisos. `check_seo_pais fj`: OK, 0 avisos.
- `check_fronteras`: 14 105 archivos sin cruces. `check_eol`: 15 361 archivos en LF.
- `check_mundo`: OK, `fj` entra con `net-pay-calculator`.
- `check_motor`: 1 falla ajena a `fj` (forint de Hungría: `"1 234 567,00 Ft"` contra `"1 234 567 Ft"`), 4595 ok.

## Riesgos y dudas para el coordinador

- **Salario mínimo**: el valor de FJ$5.00 desde el 1/4/2025 sale del discurso del presupuesto 2024-25, que es fuente oficial pero anuncia el calendario. No pude abrir la Legal Notice ni el reglamento. Prensa del presupuesto 2026-27 dice que se mantiene en FJ$5 (con una revisión pendiente), pero esa es fuente secundaria. Decisión del coordinador si prefiere bajarla a borrador hasta leer la norma.
- **PAYE sobre el bruto**: la calculadora no deduce el aporte del empleado a FNPF de la base del impuesto, igual que la fórmula de la Regulation 6 en la Employer Guide, que parte del pago normal. Es una lectura del texto de FRCS, no una afirmación de la ley.
- **Fechas `desde` de la Employer Guide**: los tramos leídos en la guía 2026 llevan `desde: 2026-01-01` como primera fecha en que se leyeron vigentes, no la fecha de la norma.
- **Aporte FNPF**: se aplica sobre el bruto sin tope, porque las fuentes leídas no mencionan un tope.
- **Vencimientos**: los tramos de FNPF del empleador y empleado y de deducción del 150 % cierran el 31/7/2027; desde el 1/8/2027 esas calculadoras dejan de publicarse hasta cargar la tasa vigente.
- Pedido al motor: ninguno.
