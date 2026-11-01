# Lesoto (`ls`): informe del agente

- Rama: `claude/pais-ls` (base `origin/main`). Último commit de código: `f95b6522` (más el commit de este informe).
- Mercado: `ls`, inglés (`en-LS`), LSL con símbolo `M` (como lo escribe RSL), `Africa/Maseru`, escala 18, `estado: "interno"`. `src/paises/index.ts` no se commitea.
- Total: **57 calculadoras** = 17 locales + 40 universales (`universales: "todas"`; la universal de IVA se cae sola porque hay `vat-calculator` local).

## Calculadoras locales (17, todas `publicado` y con datos verificados)

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| take-home-pay | sueldo-neto (declara `mundo`) | sí | Estructura del impuesto a la renta 2026/27 de RSL (LN 24/2026), Income Tax Act s. 95 |
| income-tax-calculator | impuesto-renta | sí | ídem (anual, también para sole traders) |
| gross-salary-calculator | propio (neto a bruto) | sí | ídem |
| bonus-tax-calculator | propio | sí | ídem (PAYE del mes con y sin bono) |
| vat-calculator | iva | sí | Página Tax Rates de RSL: 15 %, 10 % electricidad, 0 % |
| fringe-benefits-tax | propio | sí | Tax Rates (FBT 40 %) e Income Tax Act ss. 116 a 127 |
| company-tax-calculator | propio | sí | Tax Rates: 25 %, 10 % manufactura y agro comercial |
| withholding-tax-calculator | retencion-honorarios | sí | Tax Rates: 5 %, 10 %, 7,5 % (servicios técnicos de Sudáfrica) |
| pension-lump-sum-tax | propio | sí | Income Tax Act ss. 2 y 99 (tasa estándar 25 % o sumarlo al ingreso) |
| overtime-calculator | horas-extra | sí | Labour Act 2024, ss. 185 a 187 |
| hourly-rate-calculator | propio | sí | Labour Act 2024, s. 187 |
| annual-leave | vacaciones | sí | Labour Act 2024, s. 188 |
| sick-leave | propio | sí | Labour Act 2024, s. 190 |
| notice-period | preaviso | sí | Labour Act 2024, ss. 130 a 132 |
| severance-pay | indemnizacion-despido | sí | Labour Act 2024, s. 136 |
| final-pay | liquidacion-final | sí | Labour Act 2024, ss. 130, 136 y 188 |
| maternity-leave | propio | sí | Labour Act 2024, ss. 191 y 192 |

## Datos

- **23 datos con 25 tramos verificados, 0 sin verificar.** Todos leídos el 2026-10-27 en rsl.org.ls (https): los PDF de la estructura del impuesto a la renta 2025/26 y 2026/27, la página Tax Rates, la Income Tax Act consolidada y la copia del Gazette de la Labour Act No. 3 of 2024 que publica RSL.
- Bandas y crédito con dos tramos (desde el 2025-04-01 y el 2026-04-01), probados con los ejemplos oficiales de RSL (M10 000 da PAYE M1 332; M114 000 al año da M14 184).
- Descartado en lugar de cargarlo sin fuente:
  - **Salario mínimo** (Legal Notice No. 54 of 2026, por sector). El Gazette solo está en lesotholii.org, que bloquea la lectura automática con Cloudflare, y en ningún sitio del Gobierno encontré copia. Las cifras que circulan son de WageIndicator y de estudios jurídicos. No hay calculadora de salario mínimo.
  - **Inflación**: el Bureau of Statistics publica el IPC (base 2022 = 100) en un PDF dentro de un ZIP por mes, sin serie histórica legible. No la armé.
  - **Tipo de cambio**: el loti va a la par con el rand, y la tabla de cotizaciones del CBL es un plugin de WordPress de terceros, no un dato oficial.

## Detectores (3) y su prueba

`npx tsx scripts/paises/ls/probar-detectores.ts`, corrido hoy contra las fuentes reales:
- `ls.rsl-income-tax-structures` (html, `/income-tax-structures`): `[]` (no hay estructura posterior a 2026/27).
- `ls.rsl-ama-regulations` (html, `/income-tax`): `[]` (no hay reglamento AMA posterior al No. 24 de 2026).
- `ls.rsl-tax-rates` (html, `/tax-rates`): `[]` (las 8 líneas de tasas siguen iguales).
- Prueba positiva: con las constantes bajadas a 2024 / AMA 50-2025 y una tasa alterada, los tres devolvieron hallazgos (las estructuras 2025/26 y 2026/27, el AMA 24/2026 y «1 rate lines differ»).

## Checks (corridos, con `ls` registrado localmente)

- `npx tsc --noEmit`: sin errores.
- `check_paises ls`: OK, 23 datos (25 tramos verificados, 0 pendientes), 57 calculadoras, 0 avisos.
- `check_paises_casos ls`: 57 casos en 17 archivos, OK.
- `check_textos_paises ls`: 714 textos, 0 avisos.
- `check_fronteras`: 13 279 archivos sin cruces. `check_eol`: 14 541 archivos en LF.
- `check_motor`: 4393 pruebas OK.
- `check_mundo`: OK. Con `interno`, `ls` no aparece (la grilla solo toma mercados visibles en producción). Con `ls` pasado a `publicado` por un momento (sin commitear) entra como `declarado`: tasas efectivas de 8,6 %, 23,6 % y 27,9 % en 15k, 50k y 150k dólares internacionales.
- `next dev --webpack -p 3132`: `/ls`, `/ls/take-home-pay`, `/ls/final-pay` y `/ls/loan` (universal) responden 200, con su H1 y los marcadores resueltos. La home lista 61 enlaces.

## Riesgos y dudas para el coordinador

1. **Income Tax Act consolidada a 2012.** Es la versión que publica RSL. Las tasas que siguen vigentes (FBT 40 %, sociedades 25 % y 10 %) las confirma la página Tax Rates actual. El 15 % del auto, el tope del 20 % para la vivienda, el tope del 20 % para aportes a pensión y la tasa estándar del 25 % salen solo de ese texto: una reforma posterior a 2012 podría haberlos cambiado.
2. **Semana y día de salario.** La Labour Act no dice cómo pasar un sueldo mensual a semanal o diario para la indemnización, el preaviso o las vacaciones. Uso su propia regla de la s. 187: mensual / 195 × 45 horas para la semana y × 9 u 8 horas para el día. Lo explico en cada página.
3. **Bordes de antigüedad.** Para el preaviso, «más de seis meses» lo tomo como 6 meses completos o más. Para la indemnización, «más de un año» lo tomo como un año completo o más.
4. **No residentes.** No los cubro. La s. 12(2) aplica las tasas de residente a quien vive afuera pero trabaja a tiempo completo en Lesoto, pero no queda claro si también le corresponde el crédito.
5. **Salario mínimo.** Si alguien consigue el Gazette de LN 54/2026 desde un sitio oficial, se puede sumar la calculadora `minimum-wage`. El pedido es el mismo que en otros países: una fuente oficial alcanzable sin Cloudflare.
6. Las páginas de rsl.org.ls tienen texto de spam inyectado (préstamos en ucraniano y noruego) junto al contenido oficial. Los detectores leen solo las líneas de tasas y los enlaces a PDF, así que el spam no los afecta, pero conviene avisarle a RSL.
7. Hice un solo commit de código en lugar de commitear cada 3 o 4 calculadoras.
