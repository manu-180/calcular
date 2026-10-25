# universales: las 41 calculadoras universales en sueco (sv)

## Qué incluye

- `src/motor/universales/<id>/textos/sv.ts` (`textosSv`) y `contenido/sv.ts` (`contenidoSv`) para las 41 universales, más el cableado de los `index.ts` hecho con `npx tsx scripts/gen_idiomas_universales.ts`.
- Nada más. No toca el núcleo del motor (tipos, i18n, ventas, gramática, checks): eso ya estaba en `claude/mundo-motor-eu`. Los mercados de prueba suecos de `scripts/check_universales.ts` (se SEK, fi-sv EUR, vc con nombre largo) ya venían en esa rama, así que no hubo que sumarlos.
- Un export nuevo: `dias-entre-fechas/textos/sv.ts` exporta `duracionSv` (años, meses y días en sueco) y `edad` lo usa, igual que hace el inglés con `duracionEn`.

## Depende de

`claude/mundo-motor-eu` (sin mergear). La rama sale de `origin/claude/mundo-motor-eu` en 63ef6301. Hay que mergear el motor primero.
No mergeé `origin/main`: desde el merge-base no cambió nada en `src/motor/universales`, `gen_idiomas_universales.ts` ni `check_universales.ts`, y así no toco el núcleo que el otro agente sigue armando.

## Registro y estilo

- Registro du, el de los bancos y las webs de servicio suecas. Ningún «Ni/Er» de cortesía.
- Textos neutrales de país, porque los mismos textos van a Suecia, a Finlandia en sueco (sv-FI, EUR) y a cualquier país: sin Skatteverket, 1177, CSN ni ISK, sin «kronor» escrito a mano y sin reglas suecas (amorteringskrav, ränteavdrag) dadas como universales. La tasa de moms sale del dato del país.
- Salud (imc, calorias, fecha-de-parto, ovulacion): informativo, sin diagnósticos, con la oración de que no reemplaza la consulta con vårdpersonal. Ovulacion aclara que no es un método anticonceptivo.
- Los números de los ejemplos se calculan. Algunos que en en/de estaban tipeados también se calculan acá (37 % del descuento doble, regla del 72, rentabilidad real, 5:00 por km).

## Slugs (ASCII, sin å ä ö, todos distintos)

prestamo lanekalkyl · tasa-efectiva effektiv-ranta · hipoteca bolanekalkyl · alquilar-o-comprar hyra-eller-kopa · interes-compuesto ranta-pa-ranta · interes-simple rantekalkylator · meta-de-ahorro sparkalkylator · ahorro-retiro pensionssparande · tarjeta-de-credito betala-av-kreditkort · presupuesto budget-50-30-20 · fondo-de-emergencia buffertsparande · costo-de-un-auto bilkostnad · rendimiento-inversion rakna-ut-avkastning · margen-de-ganancia marginalkalkylator · punto-de-equilibrio break-even-kalkyl · tarifa-freelance rakna-ut-timpris · conversor-sueldo timlon-till-manadslon · aumento-de-sueldo loneokning · horas-trabajadas rakna-arbetstid · iva momskalkylator · porcentaje procentraknare · variacion-porcentual procentuell-forandring · regla-de-tres reguladetri · descuento rabattkalkylator · propina dricksraknare · dividir-gastos dela-kostnader · promedio viktat-medelvarde · edad rakna-ut-alder · dias-entre-fechas dagar-mellan-datum · sumar-dias lagg-till-dagar · imc bmi-kalkylator · calorias kaloribehov · fecha-de-parto graviditetskalkylator · ovulacion agglossning · ritmo-de-carrera loptempo · combustible bensinkostnad · consumo-electrico elkostnad · pintura hur-mycket-farg · metros-cuadrados kvadratmeter · ceramicos hur-mycket-kakel · hormigon betongkalkylator

Decisión: pensionssparande y no pensionskalkylator, para dejar ese slug libre a una calculadora local sueca de la allmän pension.

## Checks

- `npx tsx scripts/check_universales.ts`: 41 universales, 4497 casos probados, 0 fallas. También corrí cada id por separado, todos en verde.
- `npx tsx scripts/gen_idiomas_universales.ts --check`: index al día.
- `npx tsx scripts/check_eol.ts`: 7621 archivos en LF, OK.
- `npx tsc --noEmit -p .`: 3 errores, todos del núcleo en obra de la rama base (63ef6301) y ninguno en universales: falta `da` en `GRAMATICA` (`src/motor/i18n/gramatica.ts:310`), y `src/motor/i18n/nb.ts` e `inicio/nb.ts` usan un `GRAMATICA.nb` que todavía no existe. Se arreglan en `claude/mundo-motor-eu`.

## Pendientes y riesgos

- Al mergear con las ramas de los otros idiomas (pl, da, nb, fi) los `index.ts` de las universales van a chocar. Se resuelve corriendo `npx tsx scripts/gen_idiomas_universales.ts` después del merge.
- Ningún país sueco publicado todavía. El agente de `se` puede pisar un slug si investiga otra búsqueda.
- No hay datos oficiales en este PR (las universales no los usan, salvo la tasa de moms que pone cada país).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
