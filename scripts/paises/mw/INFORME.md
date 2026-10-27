# Malawi (`mw`): informe

- Rama: `claude/pais-mw`. Último commit de código: `94fd2dcc` (este informe va en el commit siguiente).
- Mercado `mw`, `en-MW`, trato `tu`, MWK, Africa/Blantyre, escala 1750, estado `interno`.
- 21 calculadoras locales (20 publicables, 1 en borrador) + 40 universales = 61 (60 publicables). La
  universal `vat` se cae sola porque hay VAT local.

## Calculadoras locales

| slug | concepto | publicable | por qué |
|---|---|---|---|
| paye-calculator | impuesto-renta | sí | Bandas mensuales del aviso de la MRA (vigentes desde el 30/12/2025); 3 casos oficiales de la calculadora PAYE de mra.mw |
| net-salary-calculator | sueldo-neto | sí | PAYE + pensión 5 %. Declara `mundo` |
| pension-calculator | aportes-seguridad-social | sí | Pension Act 2023, s. 12 (5 % y 10 %) |
| employer-cost-calculator | costo-empleador | sí | Pensión 10 % + TEVET 1 % del básico |
| tevet-levy-calculator | propio | sí | Página TEVET de la MRA (1 %) y multa del 20 % |
| vat-calculator | iva | sí | VAT (Amendment) (No. 2) Act 2025: 17,5 % |
| transfer-levy-calculator | propio | sí | Levy de 0,05 % sobre mobile money > MK 100.000 y transferencias bancarias |
| winnings-tax-calculator | propio | sí | 15 % sobre todo premio (2025) |
| withholding-tax-calculator | retencion-honorarios | sí | Tasas de la página de la MRA; caso oficial (acarreo MK 500.000 → MK 50.000) |
| fringe-benefit-tax-calculator | propio | sí | Página FBT de la MRA (30 %, auto 15 %, colegios 50 %, vivienda 10/12 %) |
| presumptive-tax-calculator | regimen-simplificado | sí | Folleto 2023-24 de la MRA, confirmado por su página actual; casos oficiales |
| personal-income-tax-calculator | propio | sí | Tasas anuales 0 %/30 % del aviso de la MRA |
| capital-gains-tax-calculator | propio | sí | Indexación por IPC del aviso de la MRA; reproduce su ejemplo 3 (MK 3.315.000) |
| inflation-calculator | inflacion | sí | Serie `mw.cpi` (IPC 1970 = 100, mensual desde 1991, aviso de la MRA) |
| dollar-to-kwacha | tipo-de-cambio | sí | Serie `mw.usd`, tasa media del RBM |
| overtime-calculator | horas-extra | sí | Employment Act s. 39 (1,5×, 2×, 2×) |
| annual-leave-calculator | vacaciones | sí | s. 44 (18/15 días, proporcional) |
| notice-period-calculator | preaviso | sí | s. 29 (por forma de pago y antigüedad) |
| sick-leave-calculator | propio | sí | s. 46 (4 semanas completas + 8 a medio sueldo) |
| maternity-leave-calculator | propio | sí | s. 47 (8 semanas cada 3 años) |
| severance-pay-calculator | indemnizacion-despido | **no** (borrador) | La tabla vigente del First Schedule no se pudo leer en fuente primaria (ver abajo) |

Universales: entran todas (`universales: "todas"`); solo cae `vat` por la local.

## Datos

35 datos, 34 verificados el 2026-10-27 en fuente primaria https:

- **MRA**: aviso «New Tax Measures» (marzo 2026: PAYE, renta personal, levy de transferencias, premios),
  VAT (Amendment) (No. 2) Act 2025 publicada por la MRA, páginas de Withholding Tax, Fringe Benefit
  Tax, TEVET Levy y TEVET Compliance, folleto de Presumptive Tax y aviso de IPC de octubre 2026.
- **Ministerio de Trabajo** (labour.gov.mw): Employment Act 2000 y Pension Act 2023.
- **Series**: `mw.usd` (RBM, 83 puntos de julio a octubre de 2026, fijo en 1.734,0118) y `mw.cpi`
  (429 puntos mensuales de 1991-01 a 2026-09).

No verificado (1):

- `mw.severance-weeks` (2/3/4 semanas por año): el ministerio solo publica el texto de 2000 de la
  Employment Act, cuyo First Schedule fue reemplazado después. El texto consolidado está en MalawiLII,
  que bloquea todo pedido desde nuestro entorno con Cloudflare; solo vimos fragmentos en su buscador.
  Por eso la indemnización queda en borrador, con casos que prueban la fórmula con valores fijos.

Salario mínimo: no hay calculadora. La orden de 2026 (vigente desde el 1/6/2026) no está publicada en
ninguna fuente oficial que pudiéramos abrir (MalawiLII bloqueado, el ministerio no la sube); solo la
vimos en prensa y en WageIndicator.

## Detectores (`fuentes.ts`) y su prueba

`scripts/paises/mw/probar_detectores.ts` corre cada detector contra la fuente real y contra la misma
respuesta alterada. Con la real, los 8 detectores con red devuelven `[]` o el punto ya cargado; con la
alterada, los 8 detectan el cambio. `correr.ts --mercado mw` también corrió (7 sin novedad; `mra-avisos`
dio timeout con 30 puntos y lo bajé a 10, que responde).

- `mw.usd-rbm` (serie, HTML del RBM): trae `2026-10-27 = 1734.0118`; con fecha y valor cambiados
  devuelve el punto nuevo. Banda 1200 a 5000, salto máximo 0,6: el kwacha está fijado y se mueve por
  devaluaciones de una vez, y la banda las deja pasar para que el cron las proponga.
- `mw.cpi-mra` (serie, `manual`): el IPC solo sale dentro del PDF del aviso mensual.
- `mw.mra-avisos` (norma, API de descargas de la MRA): avisa de avisos nuevos de impuestos o IPC.
- `mw.mra-paye-calculator` (norma, `postJson` a la calculadora de la MRA): si MK 2.000.000 deja de
  dar MK 570.500, avisa.
- `mw.mra-wht`, `mw.mra-fbt`, `mw.mra-tevet`, `mw.mra-presumptive` (norma, páginas de la MRA vía API).
- `mw.labour-documentos` (norma): un PDF nuevo en la página de leyes del Ministerio de Trabajo.

La API de mra.mw exige el encabezado `access-token` que manda su propio JavaScript público; está
comentado en el código.

## Checks

Con mw registrado localmente; `src/paises/index.ts` revertido y sin commitear.

- `npx tsc --noEmit`: OK.
- `check_paises mw`: OK. 35 datos (34 verificados, 1 pendiente), 2 series, 61 calculadoras. Tres avisos
  normales de series: hay que cargar el IPC de octubre (la MRA lo publica hacia el 20/11) y puntos
  nuevos del dólar antes del 2026-11-26.
- `check_paises_casos mw`: 81 casos en 21 archivos, todos OK.
- `check_textos_paises mw`: 852 textos, 0 avisos.
- `check_fronteras`: OK (12934 archivos). `check_eol`: OK. `check_motor`: 4268 pruebas OK.
- `check_mundo`: OK. Con mw en `interno` no aparece; pasándolo a `publicado` de forma temporal entra
  como «declarado» (28,5 % / 35,0 % / 38,3 %, PPA 627,17 MWK).
- `next dev` (webpack, puerto 3111): `/mw`, `/mw/net-salary-calculator`, `/mw/paye-calculator` y
  `/mw/loan` responden 200 con los marcadores resueltos; `/mw/severance-pay-calculator` da 404 (borrador).

## Riesgos y dudas para el coordinador

1. **Employment Act**: horas extra, vacaciones, preaviso, enfermedad y maternidad salen del texto de
   2000 que publica el ministerio. Los fragmentos del consolidado de MalawiLII coinciden en esas
   secciones, pero no pude leerlo entero. Si alguien abre MalawiLII desde otra red, conviene verificar
   el First Schedule (indemnización) y pasar esa calculadora a publicada.
2. **Pension Act 2023**: entra en vigor por aviso del ministro; no vi el aviso. La Pension Act 2011
   fija los mismos mínimos (10 % y 5 %), así que el cálculo no cambia.
3. **PAYE y pensión**: seguimos a la calculadora de la MRA, que aplica las bandas sobre el bruto sin
   restar el aporte a la pensión.
4. **Impuesto a las sociedades**: el aviso dice 30 % «up to K5 billion» y 40 % «in excess of», sin
   aclarar si es marginal. No hice calculadora; solo se menciona en una FAQ con las mismas palabras.
5. **Presumptive tax**: la página actual de la MRA tiene la tabla rota (falta la fila de MK 4 a 7
   millones); usé el folleto 2023-24, que coincide en lo demás.
6. **Montos**: Intl formatea MWK como «MK 170,000»; los textos escritos a mano usan el mismo formato.
7. **Push**: la cuenta activa de `gh` en esta máquina es `developers-insights`, sin permiso de escritura.
   Empujé con el token de `manu-180` (`gh auth token --user manu-180`) solo en el comando, sin cambiar
   la configuración global.
