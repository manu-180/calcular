# universales: las 41 calculadoras universales en finés (fi)

## Qué incluye

- `src/motor/universales/<id>/textos/fi.ts` (`textosFi`) y `contenido/fi.ts` (`contenidoFi`) para las 41 universales, más el cableado de los `index.ts` hecho con `npx tsx scripts/gen_idiomas_universales.ts`.
- Nada más. No toca el núcleo (tipos, i18n, venta, gramática, checks): ya estaba en `claude/mundo-motor-eu`. Los mercados de prueba fi de `scripts/check_universales.ts` (Suomi EUR, Malta por el adesivo, Saint Vincent ja Grenadiinit por el nombre largo) ya venían en esa rama, así que no hubo que sumarlos.
- Un export nuevo: `dias-entre-fechas/textos/fi.ts` exporta `duracionFi` («36 vuotta, 4 kuukautta ja 28 päivää») y `edad` lo usa, igual que sv con `duracionSv`.

## Depende de

`claude/mundo-motor-eu` (rama local, e371d144, ya al día con main; D9 del ADR 0002). La rama sale de ahí y no mergea main. Hay que mergear el motor primero. Cuatro commits de 10 u 11 universales.

## Registro y estilo

- sinä implícito (D9, como OP, Nordea y S-Pankki): imperativo singular («Syötä», «Laske», «Valitse»), sufijos posesivos («lainasi», «palkkasi») y pasiva donde suena natural («lasketaan»). Nada de teitittely.
- Casos gramaticales: nominativo singular tras 1 y partitivo tras los demás números («1 päivä», «3 päivää», «40 tuntia»), con ayudantes locales donde el número es variable. Los montos nunca llevan desinencia de caso pegada («X €:een»): las frases se reescriben para dejarlos en nominativo, o se usan inesivo y genitivo que no cambian con el número.
- `ctx.nombrePais` va siempre en nominativo, detrás de « | » o de dos puntos («Alv-laskuri: {pais}»). No se usa `GRAMATICA.fi` en las universales: con «Saint Vincent ja Grenadiinit» la regla daba una forma incorrecta.
- Vocabulario de Finlandia: kuukausierä, laina-aika, lyhennys, annuiteetti, todellinen vuosikorko, korkoa korolle, alv (veroton/verollinen hinta), kate y lisäys, katetuotto, kannattavuusraja, puskurirahasto, arkipäivät, juhlapyhät, painoindeksi con las clases finlandesas, laskettu aika (LA), raskausviikko, riittoisuus, hukka, valmisbetoni.
- Textos neutrales de país (sin organismos finlandeses). Rangos con palabras («X ja Y välillä») porque no se usan rayas.
- Salud (imc, calorias, fecha-de-parto, ovulacion): informativo, sin diagnósticos, con la oración de que no reemplaza la consulta con lääkäri o kätilö.
- Los números de los ejemplos se calculan, con el formato fi-FI de Intl.

## Slugs (ASCII, ä → a, ö → o; los 41 distintos)

prestamo lainalaskuri · tasa-efectiva todellinen-vuosikorko · hipoteca asuntolainalaskuri · alquilar-o-comprar vuokra-vai-omistusasunto · interes-compuesto korkoa-korolle · interes-simple korkolaskuri · meta-de-ahorro saastolaskuri · ahorro-retiro elakesaastaminen · tarjeta-de-credito luottokorttivelka · presupuesto budjetti-50-30-20 · fondo-de-emergencia puskurirahasto · costo-de-un-auto auton-kulut · rendimiento-inversion tuottolaskuri · margen-de-ganancia katelaskuri · punto-de-equilibrio kannattavuusraja · tarifa-freelance tuntihintalaskuri · conversor-sueldo tuntipalkka-kuukausipalkaksi · aumento-de-sueldo palkankorotus · horas-trabajadas tyoaikalaskuri · iva alv-laskuri · porcentaje prosenttilaskuri · variacion-porcentual prosenttimuutos · regla-de-tres verrantolaskuri · descuento alennuslaskuri · propina tippilaskuri · dividir-gastos kulujen-jakaminen · promedio painotettu-keskiarvo · edad ikalaskuri · dias-entre-fechas paivalaskuri · sumar-dias lisaa-paivia-paivamaaraan · imc bmi-laskuri · calorias kalorintarve · fecha-de-parto laskettu-aika · ovulacion ovulaatiolaskuri · ritmo-de-carrera juoksuvauhti · combustible polttoainelaskuri · consumo-electrico sahkonkulutus · pintura maalimenekki · metros-cuadrados neliolaskuri · ceramicos laattalaskuri · hormigon betonilaskuri

Decisiones: quedan libres `palkkalaskuri`, `nettopalkka`, `bruttopalkka` y `verolaskuri` para la calculadora local de sueldo neto de Finlandia. `tyoaikalaskuri` y no `tyotunnit`, que ya es la página de horas del motor. En tasa-efectiva el resultado se llama «efektiivinen vuosikorko» y la FAQ aclara que la «todellinen vuosikorko» de las ofertas suma los gastos del préstamo.

## Checks

- `npx tsx scripts/check_universales.ts`: 41 universales, 4497 casos probados, 0 fallas (solo fi sobre el motor). Cada id corrido también por separado, todos en verde.
- `npx tsx scripts/gen_idiomas_universales.ts --check`: index al día.
- `npx tsc --noEmit -p .`: 0 errores.
- `npx tsx scripts/check_eol.ts`: TODO OK (LF).
- `npx tsx scripts/check_textos_paises.ts zz-fi`: 35 textos, 0 avisos.

## Pendientes y riesgos

- Sin revisión de un hablante nativo. Dudas marcadas: «verranto» frente a «ristiin kertominen» (regla de tres), «lisäys» frente a «myyntilisä» (markup), las etiquetas «Ikä päivänä» y «Paluu alkuperäiseen», los h1 «Korkoa korolle -laskuri» y «Laskettu aika -laskuri» (guion de compuesto, correcto en finés), y tres rangos escritos «X tai Y» (8 tai 10 tuntia, 15 tai 20 %, 12 tai 15 cm).
- Choca con `claude/mundo-trad-nb`, sv, da y pl solo en las líneas generadas de los `index.ts`: se resuelve corriendo `gen_idiomas_universales` después de mergear.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
