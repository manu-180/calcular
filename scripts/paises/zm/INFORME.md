# Zambia (`zm`): informe

- Rama: `claude/pais-zm`. Último commit de código: `7d1ce282` (este informe va en el commit siguiente).
- Mercado `zm`, `en-ZM`, trato `tu`, ZMW, Africa/Lusaka, escala 25, estado `interno`.
- 21 calculadoras locales (18 publicables, 3 en borrador) + 40 universales. Con el país registrado
  quedan 61, 58 publicables. La universal `vat` se cae sola porque hay VAT local.

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| paye-calculator | impuesto-renta | sí | Bandas 2026 del folleto PAYE de la ZRA; caso oficial K15,000 → K3,176 |
| net-salary-calculator | sueldo-neto | **no** (borrador) | Falta verificar el techo de NAPSA 2026 (ver abajo). Declara `mundo` |
| napsa-calculator | aportes-seguridad-social | **no** (borrador) | Mismo motivo |
| employer-cost-calculator | costo-empleador | **no** (borrador) | Mismo motivo |
| nhima-calculator | propio | sí | FAQ de NHIMA: 1 % + 1 % del básico |
| skills-development-levy-calculator | propio | sí | Folleto SDL de la ZRA; caso oficial (K610,000 → K3,050) |
| minimum-wage | salario-minimo | sí | SI 48 de 2023 (General Order, vigente desde el 1/1/2024): 7 categorías y asignaciones de vivienda, transporte y almuerzo |
| overtime-calculator | horas-extra | sí | Employment Code Act 2019, art. 74 y 75 (1,5×, 2×, divisores 208/240) |
| leave-days-calculator | vacaciones | sí | Art. 36 (2 días por mes) y Quinto Anexo (FP × D / 26) |
| gratuity-calculator | propio | sí | Art. 73 (mínimo 25 % del básico, proporcional) |
| redundancy-pay-calculator | indemnizacion-despido | sí | Art. 54/55 (2 meses por año) y 38(6) (alta médica, 3 meses por año) |
| notice-period-calculator | preaviso | sí | Art. 53 (24 h / 14 días / 30 días) |
| maternity-leave-calculator | propio | sí | Art. 41 (14 semanas, +4 por parto múltiple, 6 después del parto) |
| vat-calculator | iva | sí | 16 % y umbral de K800,000 (folleto de VAT de la ZRA) |
| turnover-tax-calculator | regimen-simplificado | sí | 5 % sobre lo que pasa de K2,500 por mes; caso oficial K6,000 → K175 |
| rental-income-tax-calculator | propio | sí | Bandas mensuales y anuales 0/4/16 %; 3 casos oficiales |
| property-transfer-tax-calculator | propio | sí | 8 % (tierra, acciones, PI), 10 % (minería) |
| mobile-money-levy-calculator | propio | sí | Tabla de cargos fijos de la ZRA |
| presumptive-tax-calculator | propio | sí | Tabla por asientos de la página de la ZRA |
| dollar-to-kwacha | tipo-de-cambio | sí | Serie `zm.usd`, tasa media del BoZ (API JSON) |
| inflation-calculator | inflacion | sí | Serie `zm.cpi`, IPC 2009=100 de ZamStats (desde enero de 2018) |

## Datos

41 datos, 40 verificados el 2026-10-26 en fuente primaria https:

- **ZRA**: folletos 2026 (PAYE, Turnover Tax, Rental Income Tax, Property Transfer, Mobile Money Levy,
  Introduction to VAT), folleto SDL y la página `tax-information` (impuesto presuntivo), y la
  calculadora PAYE de la ZRA para la tasa de NAPSA del 5 %.
- **NHIMA**: FAQ, pregunta 29.
- **MLSS**: PDF de la Employment Code Act 2019 y SI 48 de 2023.
- Series: `zm.usd` (API del BoZ, desde julio de 2026) y `zm.cpi` (ZamStats, *The Monthly* vol. 282,
  225 y 249).

No verificado (1):

- `zm.napsa-ceiling` = K37,236 desde 2026-01-01. Solo lo vi en avisos de proveedores de nómina (Sage,
  PaySpace, Workpay). napsa.co.zm está detrás de Incapsula y rechaza todo pedido desde nuestro entorno,
  incluidas las copias de Web Archive. La calculadora PAYE de la ZRA todavía usa un techo viejo
  (K26,840). Por eso net-salary, napsa y employer-cost quedan en borrador, con casos que prueban la
  fórmula pasando valores fijos.

## Detectores (`fuentes.ts`) y su prueba

Corrí `scripts/datos-paises/correr.ts --mercado zm` contra las fuentes reales: los 12 detectores
respondieron sin error y no hubo novedades.

- `zm.usd-boz` (serie, API JSON, `tlsTolerante`): toma la última publicación de cada día. Trajo
  datos hasta el 2026-10-26.
- `zm.cpi-zamstats` (serie, `manual`): ZamStats publica el índice solo dentro del PDF. Sigue el
  precedente de `gr.dtk`.
- 7 detectores `folletoZra`: avisan si aparece el mismo folleto en una carpeta de uploads posterior.
  Para probarlo inyecté un `PAYE.pdf` en `2027/02` y lo detectó.
- `zm.zra-presumptive`: avisa si cambia la tabla. Al cambiar K10,368 en el HTML, lo detectó.
- `zm.nhima-faq`: contra la página real devuelve `[]`.
- `zm.mlss-media`: avisa cuando se sube a MLSS un PDF nuevo de salarios o del Employment Code.

No hay detector de NAPSA porque el sitio bloquea los pedidos.

## Checks

Todos corridos con zm registrado localmente; `src/paises/index.ts` revertido y sin commitear.

- `npx tsc --noEmit`: OK.
- `check_paises zm`: OK. 41 datos (40 verificados, 1 pendiente), 2 series, 61 calculadoras. Dos
  avisos de series: hay que actualizar `zm.usd` y `zm.cpi` antes del 2026-11-26.
- `check_paises_casos zm`: 59 casos en 21 archivos, todos OK.
- `check_textos_paises zm`: 804 textos, 0 avisos.
- `check_fronteras`: OK (12451 archivos).
- `check_eol`: OK.
- `check_motor`: 4111 pruebas OK.
- `check_mundo`: OK. zm no aparece porque está en `interno`. Cuando se publique va a quedar excluido
  porque el sueldo neto está en borrador. Ya tiene `mundo` declarado: bruto `basico`, mes, neto `neto`.
- `next dev` (webpack, puerto 3101, con `NEXT_PUBLIC_SITIO_INTL_URL`): `/zm`, `/zm/paye-calculator`,
  `/zm/minimum-wage` y `/zm/loan` responden 200 con los marcadores resueltos.
  `/zm/net-salary-calculator` responde 404 porque está en borrador. Turbopack no arranca con el
  `node_modules` en junction, por eso usé webpack.

## Riesgos y dudas para el coordinador

1. **Techo de NAPSA**: si alguien puede abrir napsa.co.zm desde otra red, verificar K37,236 lleva
   tres calculadoras a publicables, entre ellas el sueldo neto que entra en «Tu sueldo en el mundo».
2. **Turnover tax**: el folleto de la ZRA se contradice. El ejemplo resta K2,500 y una nota dice
   «5 % sobre el total». Seguí el ejemplo oficial, que coincide con el método del rental income tax.
3. **Employment Code**: hubo un proyecto de reforma (2023/2024) que bajaba el gratuity. No encontré
   que se haya promulgado y uso el texto de 2019. El detector de MLSS debería avisar si sale.
4. **Ley de pensiones 2026**: la National Pension Scheme Act 2026 (Act 72) está sancionada pero no
   vigente; entra en vigor cuando el ministro fije la fecha por SI.
5. **IPC**: la carga es manual. ZamStats publica *The Monthly* a fin de mes y hay que cargar cada
   punto a mano desde la tabla 1.1 del anexo.
6. **Novedades y avisos**: quedan vacíos. No encontré un cambio de 2026 leído en fuente primaria que
   amerite una novedad.
