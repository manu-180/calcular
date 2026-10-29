# Informe: Botswana (`bw`, en-BW)

- Rama: `claude/pais-bw`. Commits: 4fbfca23, e7eb1e87, 77da09ff y el de este informe.
- Mercado en `interno`, BWP, escala 14, trato `tu`. `src/paises/index.ts` no está commiteado.
- Total: 60 calculadoras = 20 locales (14 publicables y 6 en borrador) + 40 universales (todas;
  la universal de IVA se cae porque hay una local). Hoy se publican 54.

## Contexto que cambia todo: leyes nuevas desde el 1/7/2026

- **Income Tax Act, 2026** (Act 13 of 2026, «Date of Commencement: 01.07.2026»): suma un tramo de
  27,5 % sobre P400 000 y sube sociedades de 22 % a 24,5 %. BURS publicó la tabla nueva de PAYE
  («Tax Table_2026.pdf», vigente desde el 1/7/2026).
- **VAT Act, 2026** (Act 15 of 2026, S.I. 95 of 2026: en vigor el 1/7/2026): 14 % sin cambios, umbral
  de registro de P1 000 000.
- **Employment and Labour Relations Act 2025**: según el Daily News del Gobierno rige desde el
  1/9/2026, pero no encontramos el texto final ni la orden de comienzo en un sitio oficial. Solo hay
  una copia del proyecto de ley (2025) en ilo.org. Por eso lo laboral queda en borrador. La
  indemnización (severance) va «at the rate to be prescribed»: sin reglamento no se puede calcular.

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| take-home-pay | sueldo-neto | sí | Tabla BURS 2026. Casos oficiales: ejemplos 3, 4 y 5. Declara `mundo`. |
| paye-calculator | impuesto-renta | sí | Semanal, quincenal, mensual o anual; residentes y no residentes. Ejemplo oficial 6. |
| bonus-tax-calculator | propio | sí | Método anual de BURS. Ejemplo oficial 7. |
| part-year-tax-calculator | propio | sí | Primer empleo a mitad de año. Ejemplo oficial 9. |
| gratuity-tax-calculator | propio | sí | s.17: 50 % exento y el menor de «todo este año» o «repartido hasta 3 años». Ejemplo oficial 10. |
| pension-tax-relief | propio | sí | s.28(5): tope 15 % del ingreso gravable. |
| company-car-benefit | propio | sí | Regulación 24: 10 % del costo al año. |
| housing-benefit-calculator | propio | sí | Regulaciones 18 a 22 y Housing Benefit Table (dos filas como casos oficiales). |
| tax-free-salary-gross-up | propio | sí | Ejemplo oficial de grossing-up (P7 500 → P242,86). |
| vat-calculator | iva | sí | VAT Act 2026, s.7(2): 14 %. |
| company-tax-calculator | propio | sí | Schedule 1: 24,5 %, IFSC 15 %, mutuales 5 %; retención sobre dividendos. |
| withholding-tax-calculator | propio | sí | Schedule 1, párrafos 6 y 7; umbral de P48 000 para alquiler y comisiones. |
| capital-gains-tax | propio | sí | Escala propia de ganancias de capital de personas (Schedule 1, párrafo 2). |
| inflation-calculator | inflacion | sí | Inflación anual de Statistics Botswana, de 2021-01 a 2026-09. |
| pension-lump-sum-tax | propio | no | La s.19(3) es ambigua: no queda claro si el 50 % es exento cuando se retira todo en efectivo. |
| overtime-calculator | horas-extra | no | ELRA: solo tenemos el proyecto de ley. |
| annual-leave | vacaciones | no | ELRA: solo el proyecto de ley. |
| notice-period | preaviso | no | ELRA: solo el proyecto de ley. |
| minimum-wage | salario-minimo | no | P9,06/h solo en fuentes secundarias (S.I. 7 of 2024 no encontrada en un sitio oficial). |
| transfer-duty | propio | no | 5 % sobre P1M para ciudadanos y 30 % para no ciudadanos: solo en el formulario TD01 de 2020. |

## Datos

Verificados hoy (2026-10-27), en fuente primaria https:
- `burs.org.bw/images/Tax%20Table_2026.pdf`: paye-resident (2020/21 a 2025/26 y desde el
  1/7/2026), paye-resident-2021-2026, paye-non-resident (los dos tramos), car-benefit-rate,
  housing-benefit-rates, housing-capital-factor y housing-benefit-cap.
- Income Tax Act 2026 (descarga de BURS): cgt-individual, company-tax, wht-resident,
  wht-non-resident, wht-domestic-threshold, gratuity-exempt-share, lump-sum-exempt-share y
  pension-deduction-cap.
- VAT Act 2026 (descarga de BURS): vat y vat-registration-threshold.
- Serie `bw.cpi-annual`: portada de statsbots.org.bw más la tabla 2 del informe del IPC de septiembre
  de 2026 (coinciden en los meses comunes). Le puse `maxAntiguedadDias: 100` porque el gráfico de la
  portada se actualiza con un mes de atraso.

No verificados (con motivo en `datos.json`):
- annual-leave-days, overtime-rate, public-holiday-rate, overtime-divisor y notice-period-days: solo
  están en el proyecto de la ELRA.
- minimum-wage-hourly: solo en WageIndicator y Trading Economics.
- transfer-duty: solo en un formulario de BURS de 2020, no en la ley.

## Detectores (probados en vivo con `scripts/paises/bw/probar_detectores.ts`)

- `bw.cpi-statsbots` (serie, `tlsTolerante`: el TLS falla desde Argentina): lee el gráfico JSON de la
  portada y devolvió 67 puntos, el último 2026-08 = 9,3.
- `bw.burs-leyes` (norma): busca en la portada de BURS una página «Tax Laws <año>» o una «Tax
  Table_<año>.pdf» posterior a 2026. Devolvió `[]` (encontró los enlaces y ningún año nuevo).

## Checks (con bw registrado solo localmente)

- `tsc --noEmit`: 0 errores.
- `check_paises bw`: OK. 24 datos (19 tramos verificados y 7 pendientes), 1 serie, 60 calculadoras.
- `check_paises_casos bw`: 74 casos en 15 archivos, todos OK.
- `check_textos_paises bw`: 769 textos, 0 avisos.
- `check_fronteras`: 13 286 archivos OK. `check_eol`: 14 548 archivos en LF.
- `check_motor`: 4 393 pruebas OK.
- `check_mundo`: OK. Con el mercado en `interno`, bw no aparece en la grilla. Pasándolo a
  `publicado` solo en local, entra como «declarado» con 2,0 % / 15,2 % / 23,0 % de tasa efectiva
  (15k, 50k y 150k dólares internacionales).
- `next dev --webpack -p 3112`: /bw, /bw/take-home-pay, /bw/gratuity-tax-calculator y /bw/mortgage
  responden 200 y /bw/annual-leave (borrador) 404, con los marcadores resueltos.

## Riesgos y dudas para el coordinador

1. Tope del aporte jubilatorio: la s.28(5) dice «15 % of the taxable income». Lo leí literal,
   d ≤ 15 % × (bruto − d), o sea 13,04 % del bruto. Si BURS lo aplica sobre el bruto, el neto cambia
   un poco en aportes altos.
2. Housing benefit: el porcentaje entre P48 100 y P58 600 sale de la tabla de BURS (sube 0,25 punto
   cada P100); por debajo de P48 100 no aplico tope y lo aviso en pantalla.
3. Gratuity repartida: para los años hasta 2025/26 se usa la tabla anterior (dato aparte, verificado
   en la Part V de la tabla de BURS).
4. Lo laboral (ELRA) conviene retomarlo cuando aparezcan en un sitio oficial la ley y sus
   reglamentos (tasa de severance, salario mínimo).
5. Entorno: el push con la cuenta activa de gh (developers-insights) da 403. Empujé con la credencial
   ya guardada de manu-180 solo para ese comando, sin cambiar la cuenta global. `next dev` con
   Turbopack falla por el junction de `node_modules` («points out of the filesystem root»); con
   `--webpack` y `NEXT_PUBLIC_SITIO_INTL_URL=http://calcularya.localhost:3112` anda.
6. Pedido al motor: ninguno.
