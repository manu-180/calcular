# Uganda (ug): 18 calculadoras locales verificadas + 41 universales, publicado

Rama: `claude/pais-ug` (sobre `origin/main`, mergeado el 24/10; no depende de ningún motor sin mergear).

## Qué incluye

calcularya.com/ug en inglés de Uganda (`en-UG`, UGX, Africa/Kampala, escala 4000). 60 calculadoras registradas:
41 universales (con el ajuste de IVA a `ug.vat` = 18 %, verificado en URA) y 19 locales, de las que 18 se
publican y 1 queda en borrador.

| Slug | Concepto | Estado | Fuente principal |
|---|---|---|---|
| paye-calculator | impuesto-renta | publicado | URA, PAYE rates (residente y no residente, mensual) |
| net-salary-calculator | sueldo-neto | publicado | URA + NSSF |
| nssf-calculator | aportes-seguridad-social | publicado | NSSF, membership (5 % y 10 %) |
| employer-cost-calculator | costo-empleador | publicado | NSSF + URA |
| local-service-tax-calculator | propio | publicado | Local Governments (Amendment) (No. 2) Act 2008 (Gazette) + guía de KCCA |
| nssf-midterm-access-calculator | propio | publicado | NSSF, Midterm Benefit (20 %, 50 % con discapacidad) |
| withholding-tax-calculator | retencion-honorarios | publicado | Income Tax Act Cap. 338, Schedule 4 (ULII) |
| rental-income-tax-calculator | propio | publicado | URA, Rental Income Tax (casos con sus dos ejemplos oficiales) |
| presumptive-tax-calculator | regimen-simplificado | publicado | URA, Small Business Taxpayers |
| annual-leave-calculator | vacaciones | publicado | Employment Act Cap. 226, s. 53 |
| overtime-calculator | horas-extra | publicado | Employment Act, s. 51 y 52 |
| notice-period-calculator | preaviso | publicado | Employment Act, s. 57 |
| severance-pay-calculator | indemnizacion-despido | publicado | Employment (Amendment) Act 2026, s. 86 y 88 |
| terminal-benefits-calculator | liquidacion-final | publicado | Employment Act + enmienda 2026 |
| sick-pay-calculator | propio | publicado | Employment (Amendment) Act 2026, s. 54 |
| maternity-leave-calculator | propio | publicado | Employment Act, s. 55 y 56 |
| dollar-to-shilling | tipo-de-cambio | publicado | Bank of Uganda, opening middle rate |
| inflation-calculator | inflacion | publicado | UBOS, CPI press releases |
| stamp-duty-calculator | propio | borrador | ver pendientes |

SEO con las búsquedas de Uganda: «PAYE calculator Uganda 2026/27», «net salary calculator Uganda», «NSSF
contribution calculator», «local service tax», «NSSF midterm access», «withholding tax», «rental income tax»,
«presumptive tax», «terminal benefits», «dollar to Uganda shilling». Dos novedades: umbral de PAYE de
Ushs 335,000 desde el 1/7/2026 y Employment (Amendment) Act 2026 (severance y sick pay).

## Datos

37 datos (36 tramos verificados el 24/10/2026, 1 no verificado) y 2 series.

- PAYE sale del borrador: la tabla mensual de URA (ura.go.ug/en/domestic-taxes/paye-rates/) ya trae los
  tramos 2026/27 (0 hasta 335,000; 20 %, 25 %, 30 %; +10 % arriba de 10,000,000), coherentes con el
  Income Tax (Amendment) Bill 2026 que fija la vigencia el 1/7/2026.
- Rental tax, IVA y presuntivo pasan a fuentes de URA; retenciones a la ITA Cap. 338 de ULII (versión al
  31/12/2023; el proyecto 2026 no cambia esas tasas).
- No verificado: `ug.stamp-duty-transfer` (1,5 %). La Stamp Duty (Amendment) Bill 2026 proponía 3 %; los
  estudios dicen que quedó 1,5 %, pero la ley sancionada no se pudo leer (ulii.org responde 403 y URA no
  publicó el nuevo Schedule 2). Por eso stamp-duty-calculator queda en borrador.
- Salario mínimo: no se hizo. El único vigente es la orden de 1984 (Ushs 6,000 al mes), sin aplicación
  general; no hay un salario mínimo nuevo publicado en la Gazette.
- Series: `ug.usd` (BoU, 4,209.76 al 22/10, vence a los 21 días) y `ug.inflation` (UBOS, junio a
  septiembre 2026, 4,6 % en septiembre).

## Decisiones

- LST: la ley define «take-home salary» como bruto menos PAYE; KCCA aplica la tabla al bruto. La calculadora
  deja elegir la base (por defecto, la de la ley).
- Severance: un mes de sueldo por año trabajado, solo años completos (la ley no dice cómo prorratear).
- Tasa diaria y horaria (vacaciones, horas extra, liquidación, licencias): sueldo mensual × 12 / 52 semanas,
  aclarado en cada resultado; la ley no define la tasa diaria.
- Neto: PAYE + NSSF 5 %; el LST queda fuera (se descuenta solo de julio a octubre) y se avisa.

## Detectores

Vigilancia de textos en URA (PAYE, IVA, rental, presuntivo) y NSSF (membresía con regex de las tasas,
midterm), probados contra el HTML bajado el 24/10. Proyectos de ley tributarios del Parlamento. Manuales:
`ug.usd` (BoU publica la tasa solo en XLSX y Power BI; el Http del cron no lee binarios), `ug.inflation`
(PDF escaneados), Employment Act, ITA y LST (ULII da 403 a las páginas; los PDF son fijos).

## Checks

- `npx tsc --noEmit -p .`: OK.
- `check_paises ug`: OK (60 calculadoras, 1 aviso: ug.usd vence antes del 23/11 si no se carga a mano).
- `check_paises_casos ug`: OK, 69 casos en 18 archivos.
- `check_textos_paises ug`: OK, 787 textos.
- `check_fronteras`: OK, 7579 archivos. `check_eol`: OK, 8250 archivos.
- `check_motor --generar-cargadores`: OK, 2295 pruebas. `check_medicion_mercados --escribir`: 57 mercados.
- `check_seo_intl`: OK, 7642 páginas.
- `check_mundo`: OK; Uganda entra por inferencia (net-salary-calculator).
- `check_ofertas_intl`: 15 fallas, todas de Chile (cl/sueldo-liquido y cl/finiquito: tope en UF), ajenas.
- `check_hreflang`: 924 fallas ajenas, todas en el clúster de inflación: la serie de inflación de Nicaragua
  deja de ser publicable el 25/10 y los mercados con huso adelantado (au, nz, ug...) ya están en esa fecha
  mientras los de América siguen en el 24/10. Se resuelve actualizando la serie de `ni`.
- `check-all`: 148/150 suites verdes; fallan solo check_hreflang y check_ofertas_intl, por las causas
  ajenas de arriba (inflación de Nicaragua y tope en UF de Chile).

## Pasos saltados

- `next dev`: no se miró (otro servidor de desarrollo corría en el clon); los checks de render de páginas
  pasan.
- Sin push ni PR (sin permiso de escritura): este archivo es el cuerpo del PR.

## Pendientes y riesgos

- Cargar a mano `ug.usd` (antes del 12/11) e `ug.inflation` con el comunicado de octubre de UBOS. Pedido al
  motor: un `http.binario` o lector XLSX para el detector del BoU.
- Stamp duty: verificar la tasa de transferencias en la Stamp Duty (Amendment) Act 2026 y pasar a publicado.
- El commit `publicar ug` choca con otras ramas en `src/paises/index.ts` y en los cargadores generados.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
