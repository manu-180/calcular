# universales: las 41 calculadoras universales en noruego bokmål (nb)

## Qué incluye

- `src/motor/universales/<id>/textos/nb.ts` (`textosNb`) y `contenido/nb.ts` (`contenidoNb`) para las 41 universales, más el cableado de los `index.ts` hecho con `npx tsx scripts/gen_idiomas_universales.ts`.
- Nada más. No toca el núcleo (tipos, i18n, venta, gramática, checks): ya estaba en `claude/mundo-motor-eu`. Los mercados de prueba nb de `scripts/check_universales.ts` (no NOK, vc con nombre largo) ya venían en esa rama, así que no hubo que sumarlos.
- Un export nuevo: `dias-entre-fechas/textos/nb.ts` exporta `duracionNb` (dag/dager, måned/måneder, år) y `edad` lo usa, igual que sv con `duracionSv`.

## Depende de

`claude/mundo-motor-eu` (rama local, e371d144, ya al día con main; D9 del ADR 0002). La rama sale de ahí y no mergea main. Hay que mergear el motor primero. Cuatro commits de 10 u 11 universales.

## Registro y estilo

- Registro du, el de DNB, Sbanken, Forbrukerrådet y NAV (D9). Ningún De/Dem/Deres de cortesía.
- Bokmål de Noruega con su vocabulario real: terminbeløp, nedbetalingstid, egenkapital, avdrag, effektiv rente, mva (eks./inkl. mva.), timelønn, månedslønn, dekningsgrad y påslag, virkedager, KMI/BMI, termindato, eggløsning, løpetempo, strømforbruk, strøk, fliser, ferdigbetong.
- Textos neutrales de país: sin organismos noruegos y con «prisvekst» en vez de inflasjon. La tasa de mva sale del dato del país.
- Salud (imc, calorias, fecha-de-parto, ovulacion): informativo, sin diagnósticos, con la oración de que no reemplaza la consulta con lege o jordmor.
- Combustible sigue en l/100 km (la definición) y explica cómo pasar de liter per mil (×10). En imperial dice «engelsk mil», porque en noruego «mil» son 10 km.
- Los números de los ejemplos se calculan, con el formato nb-NO de Intl.

## Slugs (ASCII, æ → ae, ø → o, å → a; los 41 distintos)

prestamo lanekalkulator · tasa-efectiva effektiv-rente · hipoteca boliglanskalkulator · alquilar-o-comprar leie-eller-kjope · interes-compuesto renters-rente · interes-simple rentekalkulator · meta-de-ahorro sparekalkulator · ahorro-retiro pensjonssparing · tarjeta-de-credito nedbetale-kredittkort · presupuesto budsjett-50-30-20 · fondo-de-emergencia buffersparing · costo-de-un-auto bilkostnader · rendimiento-inversion beregn-avkastning · margen-de-ganancia fortjenestemargin · punto-de-equilibrio nullpunktsberegning · tarifa-freelance beregn-timepris · conversor-sueldo timelonn-til-manedslonn · aumento-de-sueldo lonnsokning · horas-trabajadas beregn-arbeidstid · iva mva-kalkulator · porcentaje prosentkalkulator · variacion-porcentual prosentvis-endring · regla-de-tres reguladetri · descuento rabattkalkulator · propina tipskalkulator · dividir-gastos dele-utgifter · promedio vektet-gjennomsnitt · edad alderskalkulator · dias-entre-fechas dager-mellom-datoer · sumar-dias legg-til-dager · imc bmi-kalkulator · calorias kaloribehov · fecha-de-parto terminkalkulator · ovulacion eggolsningskalkulator · ritmo-de-carrera lopetempo · combustible drivstoffkalkulator · consumo-electrico stromforbruk · pintura hvor-mye-maling · metros-cuadrados kvadratmeter · ceramicos flisekalkulator · hormigon betongkalkulator

Decisiones: quedan libres `lonnskalkulator`, `lonn-etter-skatt`, `nettolonn` y `skattekalkulator` para la calculadora local de sueldo neto de Noruega. `beregn-arbeidstid` y no `arbeidstimer`, que ya es la página de horas del motor.

## Checks

- `npx tsx scripts/check_universales.ts`: 41 universales, 4330 casos probados, 0 fallas (solo nb sobre el motor). Cada id corrido también por separado, todos en verde.
- `npx tsx scripts/gen_idiomas_universales.ts --check`: index al día.
- `npx tsc --noEmit -p .`: 0 errores.
- `npx tsx scripts/check_eol.ts`: TODO OK (LF).
- `npx tsx scripts/check_textos_paises.ts zz-nb`: 35 textos, 0 avisos.

## Pendientes y riesgos

- Sin revisión de un hablante nativo. Dudas marcadas: h1 «Renters rente-kalkulator», «rekkeevne» frente a «dekkevne» en pintura, «pakke» frente a «eske» en cerámicos, la etiqueta «Alder per dato» en edad.
- horas-trabajadas usa de ejemplo un recargo de overtid del 50 % y 40 h de jornada normal; conversor-sueldo usa 37,5 h por semana. Son ejemplos, no datos verificados del país.
- Choca con `claude/mundo-trad-fi`, sv, da y pl solo en las líneas generadas de los `index.ts`: se resuelve corriendo `gen_idiomas_universales` después de mergear.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
