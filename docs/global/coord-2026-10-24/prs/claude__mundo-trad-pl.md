# universales: las 41 calculadoras universales en polaco (pl)

## Qué incluye

- `src/motor/universales/<id>/textos/pl.ts` (`textosPl`) y `contenido/pl.ts` (`contenidoPl`) para las 41 universales, más el cableado de los `index.ts` hecho con `npx tsx scripts/gen_idiomas_universales.ts`.
- Nada del núcleo del motor (tipos, i18n, ventas, gramática, checks): eso ya está en `claude/mundo-motor-eu`. Los mercados de prueba polacos de `scripts/check_universales.ts` (pl PLN y vc con «Saint Vincent i Grenadyny») ya venían en esa rama, así que no hubo que sumarlos.
- Un export nuevo: `dias-entre-fechas/textos/pl.ts` exporta `duracionPl` (lata, miesiące, dni con plurales one/few/many) y `edad` lo usa, igual que el inglés con `duracionEn`.
- Las universales importan dos utilidades del motor que ya existían: `pluralPl` (`src/motor/i18n/plural.ts`) para «2 płytki / 5 płytek», «124 miesiące», y `GRAMATICA.pl.en` (`src/motor/i18n/gramatica.ts`) para «w Polsce» en IVA y propina. check_fronteras pasa.

## Depende de

`claude/mundo-motor-eu` (sin mergear). La rama sale de `origin/claude/mundo-motor-eu` en 63ef6301. Hay que mergear el motor primero.
Mergeé `origin/main` (f228b37c) como pide el brief común. Los dos conflictos (`scripts/check_ofertas_intl.ts` y `src/lib/pagos/textos/index.ts`) los resolví tomando la resolución del merge local e53f728b de `claude/mundo-motor-eu`, que mergeó exactamente el mismo `origin/main`: fuera de `src/motor/universales` el árbol queda idéntico al del motor, así que no hay cambios propios en el núcleo.

## Registro y estilo

- Registro «ty» en minúscula (twój, wpisz, policz), el mismo que el diccionario del sitio en polaco y el de los calculadores de los bancos y portales polacos. Ninguna forma Pan/Pani (la regla de reglas_idioma.ts pasa en todas).
- Sin formas de pasado con género en segunda persona («zainwestowałeś»): se reescribieron en impersonal o con participio, para que el texto sirva a cualquier lector.
- Vocabulario de Polonia: kredyt hipoteczny, rata kredytu, wkład własny, RRSO, kwota netto y brutto, stawka VAT, marża y narzut, procent składany, poduszka finansowa, próg rentowności, dni robocze, nadgodziny, trzynastka, OC i AC.
- Las menciones a instituciones o reglas polacas (ZUS, PUE ZUS, IKE/IKZE/PPK, WIBOR/WIRON, Kodeks pracy, skala/liniowy/ryczałt, podatek Belki) solo salen con `ctx.pais === "PL"`; para otro país en polaco va la versión neutra. El impuesto Belka se nombra sin tasa (no es un dato verificado de este frente). La tasa de VAT sale del dato del país (`{{tasa}}`).
- Salud (imc, calorias, fecha-de-parto, ovulacion): informativo, sin diagnósticos, con la oración de que no zastępuje konsultacji z lekarzem (o położną / dietetykiem). Ovulacion aclara que no es un método anticonceptivo.
- Los números de los ejemplos se calculan con `montoEjemplo`, las funciones de cada definición y `formatearMonto`/`formatearNumero`. El ejemplo de promedio usa la escala escolar polaca (oceny 4, 5 y 3 con wagi 3, 2 y 1) calculada en el contenido. Con decimales se usa el genitivo singular («6,48 litra», «7,5 godziny»), como pide la gramática.
- Sin rayas, sin emojis, sin exclamaciones.

## Slugs (ASCII, sin ą ę ł ó ś ż, todos distintos)

ahorro-retiro kalkulator-emerytalny · alquilar-o-comprar kalkulator-kupic-czy-wynajac · aumento-de-sueldo kalkulator-podwyzki · calorias kalkulator-kalorii · ceramicos kalkulator-plytek · combustible kalkulator-kosztow-przejazdu · consumo-electrico kalkulator-zuzycia-pradu · conversor-sueldo kalkulator-stawki-godzinowej · costo-de-un-auto kalkulator-kosztow-samochodu · descuento kalkulator-rabatu · dias-entre-fechas kalkulator-dni-miedzy-datami · dividir-gastos kalkulator-podzialu-kosztow · edad kalkulator-wieku · fecha-de-parto kalkulator-ciazy · fondo-de-emergencia kalkulator-poduszki-finansowej · hipoteca kalkulator-kredytu-hipotecznego · horas-trabajadas kalkulator-godzin-pracy · hormigon kalkulator-betonu · imc kalkulator-bmi · interes-compuesto kalkulator-procentu-skladanego · interes-simple kalkulator-odsetek-prostych · iva kalkulator-vat · margen-de-ganancia kalkulator-marzy · meta-de-ahorro kalkulator-oszczednosci · metros-cuadrados kalkulator-metrow-kwadratowych · ovulacion kalkulator-owulacji · pintura kalkulator-farby · porcentaje kalkulator-procentowy · prestamo kalkulator-kredytowy · presupuesto kalkulator-budzetu-domowego · promedio kalkulator-sredniej-wazonej · propina kalkulator-napiwku · punto-de-equilibrio kalkulator-progu-rentownosci · regla-de-tres kalkulator-proporcji · rendimiento-inversion kalkulator-roi · ritmo-de-carrera kalkulator-tempa-biegu · sumar-dias kalkulator-dat · tarifa-freelance kalkulator-stawki-freelancera · tarjeta-de-credito kalkulator-karty-kredytowej · tasa-efectiva kalkulator-oprocentowania-efektywnego · variacion-porcentual kalkulator-zmiany-procentowej

Decisiones: «kalkulator-odsetek-prostych» y no «kalkulator-odsetek», para dejar libre ese slug a una calculadora local de odsetki ustawowe; «kalkulator-emerytalny» para los ahorros propios, y si el agente de `pl` hace una de la emerytura de ZUS puede usar «kalkulator-emerytury-zus»; tasa-efectiva es «oprocentowanie efektywne» y no RRSO (RRSO incluye comisiones y se menciona aparte); «kalkulator-wynagrodzen» (brutto netto) queda libre para la calculadora local de sueldo.

## Checks

- `npx tsx scripts/check_universales.ts`: 41 universales, 4330 casos probados, 0 fallas. También corrí cada id por separado mientras escribía, todos en verde.
- `npx tsx scripts/gen_idiomas_universales.ts --check`: index al día.
- `npx tsx scripts/check_eol.ts`: todos los archivos en LF, OK.
- `npx tsx scripts/check_fronteras.ts`: 7598 archivos sin cruces de frontera.
- `npx tsc --noEmit -p .`: ninguno en universales. Antes del merge con main había 3 errores, todos del núcleo en obra de la rama base: falta `da` en `GRAMATICA` (`src/motor/i18n/gramatica.ts:310`), y `src/motor/i18n/nb.ts` e `inicio/nb.ts` usan un `GRAMATICA.nb` que todavía no existe. Después del merge con `origin/main` son 10: a esos 3 se suman 7 porque main trajo diccionarios nuevos que exigen todos los idiomas y pl, sv y da todavía no los tienen (`"informe-calculo"` en `src/lib/pagos/textos/{pl,sv,da}.ts`, y las entradas por idioma de `src/motor/i18n/compartir.ts`, `embed.ts`, `mundo.ts` y `src/motor/mundo/rutas.ts`). Los mismos 10 están en el merge e53f728b del motor, porque el árbol fuera de universales es idéntico. Se arreglan en `claude/mundo-motor-eu`; este frente no toca el núcleo.
- `npx tsx scripts/check_i18n.ts` no llega a correr por la misma causa (`src/motor/i18n/da.ts` llama a `GRAMATICA.da.para`, que no existe). Es del núcleo, no de este frente.

## Pendientes y riesgos

- Al mergear con las ramas de los otros idiomas (sv, da, nb, fi) los `index.ts` de las universales van a chocar. Se resuelve corriendo `npx tsx scripts/gen_idiomas_universales.ts` después del merge.
- Si `claude/mundo-motor-eu` se mergea con otra resolución de `origin/main`, el merge de esta rama con el motor puede pedir repetirla en esos dos archivos.
- Ningún país polaco publicado todavía (ni `zz-pl`). El agente de `pl` puede pisar un slug con `ctx.slug` si investiga otra búsqueda.
- No hay datos oficiales en este PR (las universales no los usan, salvo la tasa de VAT que pone cada país). Sin credenciales: no hizo falta ninguna.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
