# Liberia (`lr`): informe

Rama `claude/pais-lr` (base origin/main). Último commit de código: `ed359cab`. Mercado `en-LR`, trato `tu`,
monedas LRD (símbolo `L$`) y USD, `escala: 200`, `unidades: "imperial"`, estado `interno`.

Calculadoras: 23 locales (18 publicables y 5 en borrador) más 40 universales (todas menos `vat`, que la
reemplaza la local `gst-calculator`). Publicables hoy: 58.

## Calculadoras locales

| Slug | Concepto | ¿Publicable? | Por qué |
|---|---|---|---|
| income-tax-calculator | impuesto-renta | sí | Tabla PIT de la LRA. Ingreso en L$ o US$ (tipo de cambio lo pone la persona, como en el PIT Calculator USD de la LRA) |
| take-home-pay | sueldo-neto | sí | PIT sobre el bruto (la LRA no descuenta NASSCORP), NASSCORP 4 %, beneficios en especie con exención. Declara `mundo` |
| gross-salary | propio | sí | Bruto desde el neto (inverso del anterior) |
| non-cash-benefits-tax | propio | sí | Exención de L$100,000 (Sec. 202-C) y PIT extra |
| gst-calculator | iva | sí | GST 13 % sobre bienes y servicios, 0 % en exportaciones (ley de dic. 2025). Aviso: el VAT reemplaza al GST el 1/1/2027 |
| nasscorp-contribution | aportes-seguridad-social | sí | 4 % empleado, 4 % empleador, 2 % accidentes de trabajo (FAQ de NASSCORP) |
| employer-cost | costo-empleador | sí | Sueldo + 6 % |
| nasscorp-pension | jubilacion | sí | 25 % + 1 % cada 10 meses sobre el mínimo (100 o 144). Caso oficial de NASSCORP (4,083.33) |
| withholding-tax | propio | sí | Tabla de retenciones mensuales de la LRA |
| rental-income-tax | propio | sí | Retención 10 % (residente) o 15 % (no residente) |
| contractor-tax | retencion-honorarios | sí | Contratos 10 %, servicios 6 % |
| non-resident-tax | propio | sí | Sec. 806(b): 15 %, con cálculo inverso desde el neto |
| presumptive-tax | regimen-simplificado | sí | 4 % trimestral bajo L$3M de facturación anual, 2 % sobre eso |
| corporate-income-tax | propio | sí | 25 % general, 30 % minería y petróleo, 15 % arroz |
| real-property-tax | propio | sí | Seis tasas para propiedad edificada. Tres casos son ejemplos oficiales de la LRA |
| property-tax-penalty | propio | sí | 5 % por mes desde el 31/7, tope 25 % (no incluye el interés) |
| excise-tax | propio | sí | Schedule 1 de la ley de dic. 2025, en US$ por litro, paquete, kg o mL |
| exchange-rate | tipo-de-cambio | sí | Cotizaciones de compra y venta del CBL (dos series) |
| overtime-pay | horas-extra | no | Decent Work Act: falta una fuente oficial (ver abajo) |
| annual-leave | vacaciones | no | ídem |
| severance-pay | indemnizacion-despido | no | ídem |
| notice-period | preaviso | no | ídem, y la tabla del PDF está mal escaneada |
| minimum-wage | salario-minimo | no | ídem. Además, el ministro anunció en 2026 un piso de US$143/mes que no figura en ninguna orden publicada |

## Datos

Verificados el 2026-10-27 (19 tramos), todos en fuentes primarias https:
- LRA, Tax Education (`revenue.lra.gov.lr/domestic-tax/tax-education/`): bandas PIT, exención de beneficios en especie, retenciones, impuesto presuntivo y límite de L$3M, impuesto a las sociedades, multa inmobiliaria.
- LRA, Real Property Taxes: tasas del impuesto inmobiliario.
- Ley de reforma de diciembre de 2025 (PDF escaneado en el sitio de la LRA, leído página por página): GST 13 % (Sec. 1000 y 1021), Sec. 806(b) 15 %, Schedule 1 de excise. `desde` 2026-05-01, fecha en que la LRA empezó a aplicarla según su aviso del 7/4/2026.
- NASSCORP (`nasscorp.org.lr/faq/`): tasas de aporte y fórmula de la pensión.
- CBL (`cbl.org.lr/research/buying-selling-rates`): 12 puntos diarios de compra y de venta.

No verificados (6), todos de la Decent Work Act 2015: salario mínimo, recargo del 50 % por horas extra, jornada de 48 h, vacaciones, indemnización por despido (4 semanas por año) y preaviso. Motivo: el único texto que encontré está en liblaw.org; el Ministerio de Trabajo no lo publica (mol.gov.lr no responde).

Lo que dejé afuera a propósito: tasas de terrenos baldíos (la LRA da 5 % y 3,5 % para el mismo caso), GST de telecomunicaciones (la ley habla de un recargo del 5 % y el aviso de la LRA, de 15 %) y la tasa del VAT 2027 (todavía no está publicada).

## Detectores (`fuentes.ts`), probados contra las fuentes reales con `scripts/paises/lr/probar_detectores.ts`

| id | carril | prueba |
|---|---|---|
| lr.cbl-usd-lrd-buying | serie | trajo 31 puntos (22/9 a 27/10). Banda 120 a 260, salto 5 % |
| lr.cbl-usd-lrd-selling | serie | ídem |
| lr.lra-tax-laws | norma | `[]`: encontró las leyes listadas y ninguna es posterior a 2025 |
| lr.lra-notices | norma | `[]`: la API de WordPress respondió y no hay avisos de tasas posteriores al 27/10 |
| lr.nasscorp-faq | norma | `[]`: las frases del 4 % y del 2 % siguen en la FAQ |

## Checks

| Check | Resultado |
|---|---|
| `tsc --noEmit` | 0 errores |
| `check_paises lr` | ✅ 25 datos (19 verificados, 6 pendientes), 2 series, 63 calculadoras, 1 aviso informativo |
| `check_paises_casos lr` | TODO OK: 71 casos en 18 archivos |
| `check_textos_paises lr` | TODO OK: 822 textos, 0 avisos |
| `check_fronteras` | TODO OK: 13298 archivos |
| `check_eol` | OK: 14560 archivos en LF |
| `check_motor` (con lr registrado en local) | TODO OK: 4393 pruebas |
| `check_mundo` (con lr publicado solo en local) | LR entra: 21.4 % / 26.7 % / 28.2 % de tasa efectiva |
| `next dev` (webpack, puerto 3111) | `/lr`, `/lr/take-home-pay`, `/lr/gst-calculator` y `/lr/loan` responden 200 |

## Riesgos y dudas para el coordinador

1. **Mundo en dólares.** La PPA del Banco Mundial para Liberia (0.53) está en US$, no en L$. Por eso el `mundo` de `take-home-pay` usa salario y neto en US$, convertidos con el último punto de compra del CBL que haya en `series.json`, leído al importar el archivo. Si el motor espera la PPA en la moneda principal del mercado, conviene revisarlo en general.
2. La carga del excise toma la columna «Proposed» del Schedule 1 de la ley sancionada como la vigente. Desde el 1/1/2027 esas tasas se indexan cada año y la LRA las publica antes del 1/12: hay que volver a cargarlas.
3. Para aplicar el GST y el excise tomé el 1/5/2026 (cuando la LRA empezó a aplicarlos). Según la ley rigen desde su publicación, el 1/4/2026.
4. El VAT reemplaza al GST el 1/1/2027. El aviso vence el 31/12/2026, y en esa fecha `gst-calculator` necesita la tasa nueva.
5. Las 5 laborales quedan en borrador hasta encontrar la Decent Work Act en un sitio oficial. También falta confirmar el salario mínimo vigente.
6. `next dev` con Turbopack falla en este worktree por el junction de `node_modules`; con `--webpack` y `NEXT_PUBLIC_SITIO_INTL_URL` funciona.
7. El impuesto a la renta y el sueldo neto piden el tipo de cambio cuando se cobra en US$, para no depender de la serie: si el cron se cae, igual siguen publicables.
