# Brunéi (`bn`): informe del agente

- Rama: `claude/pais-bn` (base `origin/main`). `src/paises/index.ts` no se commitea (lo registra el coordinador).
- Mercado: `bn`, inglés (`en-BN`), BND, `Asia/Brunei`, trato tu, `estado: "interno"`, escala 1.
- Total: **52 calculadoras** = 12 locales (11 publicables, 1 borrador) + 40 universales (`universales: "todas"`).

## Calculadoras locales

| Slug | Concepto | Publicable | Base |
|---|---|---|---|
| spk-calculator | aportes-seguridad-social | sí | TAP: tasa del empleado y tabla del empleador del SPK |
| take-home-pay | sueldo-neto (declara `mundo`) | sí | TAP (SPK) y Ministerio de Finanzas (sin impuesto a la renta personal) |
| employer-cost-calculator | costo-empleador | sí | TAP |
| corporate-tax-calculator | propio | sí | Revenue Division: 18,5 %, umbral fiscal, relief de empresa nueva |
| withholding-tax-calculator | retencion-honorarios | sí | Revenue Division: tabla de retención a no residentes |
| stamp-duty-penalty-calculator | propio | sí | Revenue Division: penalidad por sellado tardío y exenciones |
| spk-self-employed-calculator | propio | sí | TAP: Match-Up del Gobierno para autónomos |
| bnd-to-sgd | tipo-de-cambio | sí | MAS: Currency Interchangeability Agreement (a la par) |
| inflation-calculator | inflacion | sí, con detector | IPC mensual de DEPS |
| capital-allowance-calculator | propio | sí | Revenue Division: allowances de capital |
| company-car-deduction-calculator | propio | sí | Revenue Division: tope de BND 50.000 por auto |
| minimum-wage | salario-minimo | no (borrador) | ver abajo |

## Datos

- **35 tramos verificados** (37 datos con los 2 del salario mínimo) y 1 serie (IPC). Todo se leyó en esta sesión en fuente primaria https con `verificadoEl: 2026-10-29`: tap.com.bn, mof.gov.bn (Revenue Division), deps.gov.bn y la página del MAS (leída renderizada).
- Brunéi no tiene impuesto a la renta personal: lo dice el FAQ de impuesto corporativo del Ministerio de Finanzas ("NO tax is levied on personal income") y está cargado como dato en 0 %. No hay IVA ni GST en las fuentes que se leyeron, pero ninguna lo afirma de forma explícita, así que **la ausencia de IVA no se afirma en ningún texto** y no hay calculadora de IVA.
- TAP/SCP ya no existen como tales: desde el 15 de julio de 2023 rige el SPK (8,5 % del empleado sin tope; empleador 10,5 / 9,5 / 8,5 % por grupo salarial, fijo BND 57,50 hasta BND 500, mínimo BND 57,50). Los textos lo explican para quien aún busca «TAP SCP calculator».
- **No verificados (2), calculadora en borrador:** salario mínimo mensual (BND 500) y por hora (BND 2,62). Motivo: `labour.gov.bn` no abre desde el servidor (certificado TLS vencido), `agc.gov.bn` devuelve 404 a cualquier pedido automático, y `ambd.gov.bn` no resuelve en la red de la sesión. Los valores salen solo de un resultado de búsqueda y de una nota del Consejo Legislativo leída resumida.
- **No se cargó, por no poder leerlo en fuente oficial:** Employment Order 2009 (vacaciones, horas extra, preaviso, licencia de maternidad, indemnización), tasas de stamp duty por tipo de instrumento (First Schedule del Stamp Act), tarifa eléctrica de DES (página movida) e impuestos de importación y excise (tablas en imágenes). Por eso faltan esas calculadoras laborales.
- IPC de DEPS: se omite diciembre de 2024 porque el valor impreso (107,7) no cuadra con su propia variación anual; el resto de la serie desde enero de 2021 sí cuadra.

## Detectores (8) y prueba

`npx tsx scripts/paises/bn/probar-detectores.ts`, corrido contra las fuentes reales:
- `bn.cpi-deps` (html): devolvió la serie completa desde 2021 con septiembre de 2026 = 106,2.
- 6 de norma (TAP tasa del empleado y tabla del empleador, TAP autónomos, FAQ de impuesto corporativo, página de impuesto a la renta, página de stamp duty): todos `[]`, es decir el texto leído sigue igual.
- `bn.mas-par` es `manual`: la página del MAS se arma con JavaScript y el HTML no trae texto.

## Checks (corridos, con `bn` registrado localmente)

- `npx tsc --noEmit`: sin errores.
- `check_paises bn`: OK, 37 datos, 1 serie, 52 calculadoras.
- `check_paises_casos bn`: 49 casos en 11 archivos, OK.
- `check_textos_paises bn`: 569 textos, 0 avisos.
- `check_seo_pais bn`: OK, 0 avisos.
- `check_fronteras`: OK. `check_eol`: OK.
- `check_motor`: 4595 pruebas OK, 1 falla (`forint`, ya falla en main).
- `check_mundo`: OK. Mientras `bn` esté `interno` no aparece en la grilla.

## Riesgos y dudas para el coordinador

- El código `bn` es también el del idioma bengalí en las ediciones `zz-bn`. No chocó en ningún check, pero conviene mirar rutas y hreflang antes de publicar.
- La penalidad de sellado tardío está descrita con dos redacciones distintas en dos páginas de la Revenue Division (a los 3 meses frente a 30 días). Se siguió la página de stamp duty y hay un aviso `info` visible en la calculadora.
- Los ejemplos del umbral fiscal salen de la página de la Revenue Division, que muestra tablas de 2011 y 2012 con tasas de entonces; se usó la mecánica y la tasa vigente de 18,5 % (año de tasación 2015 en adelante).
- Faltan las calculadoras laborales hasta poder leer la Employment Order 2009 y el Minimum Wage Order en una fuente primaria. Hace falta abrir `labour.gov.bn` y `agc.gov.bn` desde otra red.
