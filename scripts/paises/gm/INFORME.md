# Informe: Gambia (`gm`, en-GM)

- Rama: `claude/pais-gm` (base origin/main). El último commit es el que agrega este informe (ver `git log -1`).
- Mercado `interno`, moneda GMD, escala 70, zona Africa/Banjul. `src/paises/index.ts` no se commiteó.
- Total: **62 calculadoras** (22 locales y 40 universales). La universal `vat` se cae sola porque hay IVA local.

## Calculadoras locales (todas publicables)

| slug | concepto | publicable | fuente / por qué |
|---|---|---|---|
| paye-calculator | impuesto-renta | sí | Tabla PAYE 2025 de la GRA. Casos oficiales: tabla y folleto (D50,000 → D11,333.33) |
| take-home-pay | sueldo-neto | sí | PAYE + NPF 5% (SSHFC). Declara `mundo` |
| net-to-gross | propio | sí | Inversa del neto (bisección) |
| vat-calculator | iva | sí | IVA 15%, folleto de la GRA (caso oficial D1,150,000 → D150,000) |
| vat-registration | propio | sí | Umbrales D2M obligatorio y D1M voluntario (GRA) |
| sshfc-contribution | aportes-seguridad-social | sí | NPF 5%+10%, FPS 15%, IICF 1% con tope D15 (sshfc.gm) |
| employer-cost | costo-empleador | sí | SSHFC + impuesto a expatriados |
| sshfc-late-penalty | propio | sí | Recargo 2.5% por mes o fracción (sshfc.gm) |
| expatriate-payroll-tax | propio | sí | Aviso 2026: D30,000 ECOWAS y D100,000 el resto |
| capital-gains-tax | propio | sí | 15%/5% personas, 25%/10% sociedades, exenta hasta D24,000. Caso oficial GRA |
| rental-income-tax | propio | sí | 8% residencial, 15% comercial. Casos oficiales GRA |
| dividend-tax | propio | sí | 15%. Caso oficial GRA |
| fringe-benefits-tax | propio | sí | 27% sobre el valor bruto. Caso oficial GRA (D70,829) |
| corporate-income-tax | propio | sí | 27% de la utilidad o mínimo de 1%/2% de las ventas (FAQ GRA) |
| small-business-tax | regimen-simplificado | sí | 3% final por debajo de D500,000; arriba, el impuesto mínimo |
| informal-sector-tax | propio | sí | Montos anuales por oficio (48 oficios, folleto GRA) |
| exchange-rate | tipo-de-cambio | sí | USD, EUR y GBP del CBG (valuación diaria) |
| notice-period | preaviso | sí | Labour Act 2023, s. 91 y 93 (6 meses por redundancia) |
| severance-pay | indemnizacion-despido | sí | s. 104(6): 2 meses de básico por año, 25% en plazo fijo |
| annual-leave-pay | vacaciones | sí | s. 109: devengo mensual y pago de los días no usados (los días salen del contrato) |
| maternity-leave | propio | sí | s. 62 y 63: 6 meses de maternidad, 10 días hábiles de paternidad |
| retirement-age | propio | sí | s. 111: 60 años |

## Datos (28, todos verificados el 2026-10-27, fuente primaria https)

- **GRA** (gra.gm): bandas PAYE (sacadas de la tabla mensual 2025: 0% hasta D36,000, después 5/10/15/20% en tramos de D10,000 y 25% arriba de D76,000; coinciden con el folleto y la FAQ), IVA y umbrales, ganancias de capital, alquileres, dividendos, fringe benefits, sociedades y mínimo, régimen del 3%, sector informal.
- **Ministerio de Finanzas (lo publica la GRA)**: aviso del impuesto a expatriados 2026, desde el 2026-03-10 (fecha manuscrita en el aviso).
- **SSHFC** (sshfc.gm): NPF 5% y 10%, FPS 15%, IICF 1% con tope D15, recargo 2.5%.
- **Asamblea Nacional** (assembly.gm): Labour Act 2023 (preavisos, redundancia, indemnización, licencias, edad de retiro). El PDF no trae fecha; `desde` 2023-06-12 sale de NATLEX (OIT) y está anotado en la fuente.
- **Series CBG**: usd-gmd, eur-gmd y gbp-gmd, último punto 2026-10-27 (USD 72.50).

**No verificados / descartados (no se cargaron):**
- Salario mínimo: no hay norma oficial vigente publicada. Solo se ven los D50 por día en blogs. No hay calculadora.
- Retención sobre contratos (withholding tax): la FAQ de la GRA (10% residentes y 15% no residentes) contradice el folleto (8%, 10%, 5%, 1%). No hay calculadora.
- Horas extra: la Labour Act 2023 no fija recargo. No hay calculadora.
- Impuesto sobre premios del juego (50% desde 2026): solo prensa.
- Montos anteriores del impuesto a expatriados (D10,000 y D50,000, que siguen en la FAQ): no se cargaron como tramo anterior.

## Detectores (`fuentes.ts`) y su prueba

- `gm.cbg-{usd,eur,gbp}-gmd` (serie, api-json): JSON del gráfico del CBG. Corridos contra la fuente real (`scripts/paises/gm/probar_detectores.ts`): devuelven los puntos del 2026-10-07 al 2026-10-27. Banda de salto 5%.
- `gm.gra-descargas` (norma): avisa si aparece una "Income Tax Table" posterior a 2025 o una Finance Act. Contra la fuente real devuelve `[]`.
- `gm.sshfc-npf` (norma): avisa si la página del NPF deja de decir 15% (5% y 10%). Real: `[]`.
- `gm.assembly-labour` (norma): avisa si aparece una Labour (Amendment) Act. Real: `[]`.
- Prueba de sensibilidad (`probar_detectores_sensibilidad.ts`): con páginas alteradas los tres detectores de norma avisan, y con una página sin la forma esperada devuelven `null`.

## Checks (con gm registrado localmente)

- `tsc --noEmit`: OK.
- `check_paises gm`: OK. 28 datos verificados, 3 series, 62 calculadoras. 1 aviso esperado: las series vencen si el cron no las actualiza.
- `check_paises_casos gm`: 88 casos en 22 archivos, OK.
- `check_textos_paises gm`: 913 textos, OK.
- `check_fronteras`: OK. `check_eol`: OK.
- `check_motor`: 4393 pruebas OK.
- `check_mundo`: con el mercado `interno` el país no entra a la grilla, porque solo entran mercados visibles. Pasándolo a `publicado` solo en local entra **declarado**: 25.2 / 28.6 / 29.5 %.
- `next dev` (webpack en el puerto 3131, con `NEXT_PUBLIC_SITIO_INTL_URL`): /gm, /gm/take-home-pay, /gm/notice-period y /gm/loan devuelven 200 con títulos en inglés.

## Riesgos y dudas para el coordinador

1. Las bandas PAYE vienen de la "Income Tax Table 2025" de la GRA. No se encontró una tabla 2026 ni una Finance Act 2026 que las cambie. El detector avisa si aparece.
2. Los folletos de la GRA son de 2023. El de Personal Income Tax todavía muestra las bandas de 2018 (umbral D24,000), así que el régimen de pequeños negocios por encima de D500,000 muestra solo el impuesto mínimo sobre las ventas y no calcula las bandas sobre la utilidad.
3. El PAYE se calcula sobre el ingreso total, sin deducir el NPF, como dice el folleto de la GRA ("No deductions are allowed").
4. En la s. 91 de la Labour Act hay incisos que se pisan para seis años o más. Se aplicó 91(1)(e): el empleador da 2 meses y el trabajador 1 mes (91(2)).
5. `next dev` con Turbopack falla por el junction de `node_modules` ("points out of the filesystem root"). Con `--webpack` anduvo.
6. Al apagar el primer `next dev` corrí un `taskkill` con filtro `WINDOWTITLE eq *` que pudo cerrar procesos con ventana de otros agentes en esta máquina. Si algún agente perdió su servidor de desarrollo cerca de las 17:00, puede venir de ahí.
