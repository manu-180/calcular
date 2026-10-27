# Chipre (`cy`, `el-CY`) y edición `cy-en` (`en-CY`): informe

Rama `claude/pais-cy`. Estado `interno` en ambas ediciones. Hecho el 2026-10-26.

## Calculadoras locales (18, todas publicables)

Todas tienen sus datos verificados hoy en fuente primaria y casos que dan. La edición `cy-en` traduce las 18.

| slug (el) | slug (en) | concepto | por qué es publicable |
|---|---|---|---|
| ypologismos-katharou-misthou | net-salary-calculator | sueldo-neto | ΚΑ 8,8 %, ΓεΣΥ 2,65 %, escala 2026, tope 1/5, deducción por hijos; declara `mundo` |
| ypologismos-miktou-apo-katharo | net-to-gross-salary | propio | la misma nómina, resuelta hacia atrás |
| ypologismos-forou-eisodimatos | income-tax-calculator | impuesto-renta | escala 2026 y las nuevas deducciones de la guía del Τμήμα Φορολογίας |
| eisfores-koinonikon-asfaliseon | social-insurance-calculator | aportes-seguridad-social | caso **oficial**: ejemplo del Οδηγός Εργοδότη (369,98 €) |
| kostos-ergodoti | employer-cost-calculator | costo-empleador | mismo ejemplo oficial; 13.º cotiza con el tope del mes |
| eisfores-gesy | gesy-contribution-calculator | propio | ley 89(I)/2001 art. 19, tope 180.000 € y orden de llenado |
| katotatos-misthos | minimum-wage | salario-minimo | ΚΔΠ 427/2025: 1.088 € y 979 € los primeros seis meses |
| ypologismos-fpa | cyprus-vat-calculator | iva | 19 / 9 / 5 / 3 / 0 % (ley 95(I)/2000) |
| etisia-adeia | annual-leave-calculator | vacaciones | ley 8/1967 art. 5: 20 o 24 días, proporcional a 48 semanas |
| proeidopoiisi-termatismou | notice-period-calculator | preaviso | guía de terminación de empleo (empleador y empleado) |
| plirome-pleonasmou | redundancy-pay-calculator | indemnizacion-despido | ley 24/1967, Τέταρτος Πίνακας; tope 4 × 220,76 € |
| eisfores-autotelos-ergazomenon | self-employed-contributions | propio | 16,6 % con mínimos 2026 por categoría (xlsx oficial) |
| teli-metavivasis | property-transfer-fees | propio | Κεφ. 219: 3/5/8 %, −50 % sin IVA, 0 con IVA |
| chartosima | stamp-duty-calculator | propio | ley 19/1963: 1,50 € y 2 € cada 1.000 €, tope 20.000 € |
| foros-kefalaiouchikon-kerdon | capital-gains-tax-calculator | propio | ley 52/1980: 20 %, exenciones de 30.000, 50.000 y 150.000 € |
| tokoi-katatheseon | fixed-deposit-interest | plazo-fijo | ΕΕΑ 17 % sobre intereses + ΓεΣΥ 2,65 % |
| ektakti-eisfora-merismata | dividend-tax-calculator | propio | ΕΕΑ 5 % (beneficios de 2026 en adelante) o 17 % (hasta 2025) + ΓεΣΥ |
| ypologismos-plithorismou | inflation-calculator | inflacion | serie ΔΤΚ de la ΣΥΚ (2015=100), 2000-01 a 2026-09 |

**Universales:** entran las 40 (`universales: "todas"`), sin exclusiones. En total son 58 calculadoras por edición.

## Datos

Hay 34 datos y 40 tramos, todos `verificado` con `verificadoEl` 2026-10-26. No quedó ningún dato no verificado. Las fuentes:

- **cylaw.org (Παγκύπριος Δικηγορικός Σύλλογος, «of» en PAISES.md).** Texto consolidado de las leyes 118(I)/2002 (renta, ya con el Ν. 244(I)/2025), 89(I)/2001 (ΓεΣΥ), 95(I)/2000 (IVA), 8/1967, 24/1967, Κεφ. 219, 19/1963, 52/1980 y 117(I)/2002. También el ΚΔΠ 427/2025 en PDF de la Gaceta.
- **mlsi.gov.cy (Υπηρεσίες Κοινωνικών Ασφαλίσεων).** Οδηγός Εργοδότη, Οδηγός Ασφαλισμένου, guía de terminación de empleo, guía de vacaciones, xlsx de βασικές ασφαλιστέες αποδοχές 1981-2026 y xlsx de categorías de autónomos 2026.
- **Τμήμα Φορολογίας.** Guía explicativa de la reforma 2026 (PDF alojado en businessincyprus.gov.cy, porque tax.gov.cy no resolvía DNS). De ahí salen la deducción por hijos, las de vivienda, energía y seguro de hogar, y los límites de ingreso.
- **ΣΥΚ (cystatdb.cystat.gov.cy, API PxWeb).** El ΔΤΚ mensual.

Hay tramos futuros ya en ley: ΚΑ de 9,3 % (empleado y empleador) y 17,6 % (autónomo) desde 2029. Los topes de 2025 quedan cargados para probar el borde.

## Detectores (`scripts/paises/cy/probar_detectores.ts`, corrido contra la red real)

- `cy.dtk-cystat` (serie, POST a la PxWeb): ✅ 320 puntos, el último 2026-09-01 = 122,06, igual que series.json. series.json tiene 321 puntos; la diferencia de uno no la pude aislar (la comparación se colgó y la corté).
- `cy.kdp-cylaw` (norma, índice anual de ΚΔΠ): ✅ 0 hallazgos posteriores a hoy. La página responde con la forma esperada y ΚΔΠ 427/2025 figura en el índice de 2025.
- `cy.yka-anakoinoseis` (norma, anuncios de la ΥΚΑ): ✅ 0 hallazgos.

## Checks

| check | resultado |
|---|---|
| `tsc --noEmit` | sin errores |
| `check_paises cy` / `cy-en` | OK: 34 datos, 40 tramos verificados, 58 calculadoras cada una |
| `check_paises_casos cy` / `cy-en` | OK: 62 casos en 18 archivos, y la edición sin textos sin traducir |
| `check_textos_paises cy` / `cy-en` | OK: 871 y 594 textos, 0 avisos |
| `check_eol` | OK |
| `check_motor` (registrado localmente) | OK: 3855 pruebas |
| `check_mundo` | sin errores. Con `cy` en `publicado` (solo local) entra como «declarado»: 11,5 % / 14,3 % / 28,0 %, 12 pagas |
| `check_fronteras` | 1 falla **ajena**: `src/motor/compartir/AlCelu.tsx` importa `uqr` (viene de main, no de esta rama) |

`src/paises/index.ts` no está commiteado.

## Riesgos y dudas para el coordinador

1. **`next dev` no se pudo mirar.** Turbopack entra en pánico con el `node_modules` en junction («Symlink points out of the filesystem root»). Con `--webpack` todo da 404, incluso `gr`, que ya está publicado. Es un problema del entorno del worktree; conviene una mirada visual antes de publicar.
2. **cylaw.org.** Es el portal del Colegio de Abogados con el texto consolidado. PAISES.md lo lista como fuente oficial, pero no es la Gaceta misma.
3. **Guía del Τμήμα Φορολογίας.** Está alojada en businessincyprus.gov.cy (portal del gobierno) porque tax.gov.cy no resolvía DNS.
4. **Supuestos de cálculo, explicados en el contenido de cada calculadora:**
   - sueldo semanal = mensual × 12 / 52 (redundancia y preaviso);
   - el 13.º se cotiza con el sueldo de diciembre hasta el tope del mes;
   - el tope del ΓεΣΥ del empleador se toma como 180.000 / 12 por mes;
   - el año del autónomo tiene 52 semanas;
   - en los sellos se redondea «cada 1.000 € o fracción» por tramo.
5. **El 13.º sueldo no es legal en Chipre.** El sueldo neto usa 12 pagas por defecto y para `mundo`; el 13.º es opcional.
6. **El sueldo neto no aplica las exenciones del art. 8(21A)/(23A)** (por ejemplo la de primer empleo con sueldos altos). Tampoco aplica los límites de ingreso a la deducción por hijos: los deja como una casilla.
7. **Ganancias de capital.** El costo ajustado por inflación lo ingresa la persona. La exención de vivienda principal no se trata como saldo de por vida, porque la ley no es clara en eso.
8. **Redundancia.** El tope del sueldo semanal (4 × las ganancias asegurables básicas) puede subirlo un decreto ministerial; no busqué si existe uno vigente.
9. **El ΓεΣΥ sobre intereses y dividendos** se aplica por el art. 19(1)(ζ) y la definición de «εισόδημα» de la misma ley.
