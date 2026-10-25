# Integración de los motores de idioma: arreglos + eu (pl sv da nb fi) + ar + id tr bn th + uk uz ru ro cs el + hu he, en una sola rama

Rama: `claude/mundo-idiomas-integrado` (sale de origin/main 777a00d3 y tiene mergeado origin/main 0bc82fc1).

**Reemplaza a los PR individuales de todas las ramas de abajo.** Manuel puede mergear solo este y cerrar
los otros (arreglos, motor-eu, trad-pl/sv/da/nb/fi, motor-ar, trad-ar, motor-id, motor-tr, motor-bn,
motor-th, motor-uk, motor-uz, motor-ru, motor-ro, motor-cs, motor-el, motor-hu, motor-he): cada una está
mergeada entera (`git branch --no-merged` no lista ninguna) con `git merge --no-ff`, así que su historia
queda y los cuerpos de PR de cada rama siguen valiendo como descripción de lo que trae cada idioma.

## Ramas incluidas (último commit de cada una)

| Grupo | Rama | Último commit |
|---|---|---|
| 1 | claude/mundo-arreglos-2026-10-24 | 968dade2 check_panel_sql: las tablas y funciones de «Sueldos reales» entran en las reglas estáticas |
| 2 | claude/mundo-motor-eu | e371d144 motor eu: D9 y estado con las páginas que trajo main |
| 2 | claude/mundo-trad-pl | 2bac523c Merge claude/mundo-motor-eu en claude/mundo-trad-pl |
| 2 | claude/mundo-trad-sv | 9987effa Merge claude/mundo-motor-eu en claude/mundo-trad-sv |
| 2 | claude/mundo-trad-da | 7fc4cdb2 Merge claude/mundo-motor-eu en claude/mundo-trad-da |
| 2 | claude/mundo-trad-nb | 9f8c32a4 universales nb: imc, calorias, ... hormigon |
| 2 | claude/mundo-trad-fi | 6fcbbbd1 universales fi: imc, calorias, ... hormigon |
| 3 | claude/mundo-motor-ar | 7d9ed77b motor ar: D10 y estado con las páginas que trajo main |
| 3 | claude/mundo-trad-ar | 88bc6692 universales ar: cargadores regenerados con las 41 universales en árabe |
| 4 | claude/mundo-motor-id | c2186ba6 motor id: calendario, horas de trabajo, rankings, sueldos reales y afiliados en indonesio |
| 4 | claude/mundo-motor-tr | 2ab6593a motor tr: calendario, horas de trabajo, rankings, sueldos reales y afiliados en turco |
| 4 | claude/mundo-motor-bn | 6955756d motor bn: ADR 0002 D14 con las rutas de rankings, horas, calendario y sueldos reales |
| 4 | claude/mundo-motor-th | b6a07ac4 motor th: D13 y estado con las páginas que trajo main |
| 5 | claude/mundo-motor-uk | 77abd933 motor uk: ADR 0002 D15 y estado |
| 5 | claude/mundo-motor-uz | d5bef51d motor uz: ADR 0002 D16 y estado |
| 5 | claude/mundo-motor-ru | 8c8e8683 motor ru: ADR 0002 D17 y estado |
| 5 | claude/mundo-motor-ro | abdbf938 motor ro: ADR 0002 D18 y estado |
| 5 | claude/mundo-motor-cs | 9601eb6b motor cs: ADR 0002 D19 y estado |
| 5 | claude/mundo-motor-el | 629378ca motor el: cargadores de las universales en griego y descripción del embebible dentro de 160 |
| 6 | claude/mundo-motor-hu | 710b3fb6 motor hu: la raya de los nombres de Intl va escapada en las claves de esetekHu |
| 6 | claude/mundo-motor-he | 4388c295 motor he: ADR 0002 D22 y estado |
| fin | origin/main | 0bc82fc1 Pendientes de calcular: SMVM en horas, fechas de pago, BE/NL, hreflang... (#92) |

Quedan 28 idiomas en `IDIOMAS` (los 10 de main más pl, sv, da, nb, fi, ar, id, tr, bn, th, uk, uz, ru,
ro, cs, el, hu, he), con su edición interna zz-* registrada en `PAISES`.

## Conflictos resueltos (una sola vez)

- Listas de idiomas y `Record<Idioma>` (IDIOMAS, IDIOMAS_VENTA, DICCIONARIOS de venta, legales, sitio,
  mundo, calendario, horas, rankings, sueldos, afiliados, compartir, embed, GRAMATICA, rutas de cada
  sección, productos de horas, textos-inicio, `src/paises/index.ts` con todas las zz-*): se juntaron
  las entradas de los dos lados, en el orden de llegada.
- Generados: `src/motor/universales/*/index.ts` (gen_idiomas_universales) y `cargadores.ts`
  (check_motor --generar-cargadores) se regeneraron después de cada merge y de cada grupo.
- `src/motor/formato.ts`: un solo `aLatino` con los dígitos arábigo-índicos, persas (con ٫ y ٬ como
  separadores del locale), bengalíes y tailandeses; `parsearNumero` y `sugerenciaMiles` usan además el
  signo menos de Unicode (eu) y los puntos del símbolo de moneda (arreglos); las unidades del tailandés
  (ล้าน, แสน...) y del CJK conviven; `OpcionesParseo` con los 3 decimales de arreglos; el sugerido
  vuelve en bengalí si se escribió así; `mayusculaInicial`/`minusculaInicial` del turco.
- `nombreDeUnidad` y `src/motor/i18n/unidades.ts`: `Formas = FormasUnidad | FormasAr | FormasHe`.
  FormasUnidad (uno, pocos, muchos, otros) la comparten pl, uk, ru, ro y cs, con la categoría de
  Intl.PluralRules del locale; el dual se distingue por `"dos" in formas` y, dentro, el árabe (con
  pocos/muchos) del hebreo. Ojo: la versión de motor-he usaba `"pocos" in formas` para detectar el
  árabe, que con el polaco y los eslavos habría tomado formaAr; quedó corregido.
- `src/motor/i18n/plural.ts`: quedan todas las funciones de todos los idiomas (pl, uk, ru, ro, cs, el;
  eu, ar y he traen las suyas en sus archivos); los imports de mundo.ts, calendario.ts y check_motor se
  juntaron en uno por módulo.
- Buscador: `cuantosResultados` con Intl.PluralRules del lang de la página cuando hay
  `resultadosPocos` (la versión de cs, que sirve para uk, ru y cs) y la forma con «de» del rumano
  (`resultadosDe`); un solo `resultadosPocos` y un solo `resultadosDe` en los dos tipos de textos.
  `normalizar` suma la ı turca, los apóstrofos uzbekos (oʻ, gʻ, ʼ), el cirílico, el griego (con la
  sigma final como σ) y, además, hebreo, árabe, bengalí y tailandés, que antes quedaban vacíos.
- `src/motor/mundo/inferir.ts`: las palabras de período (anual/mensual) de tr, uz, uk, ru, ro, cs, el,
  hu y he en los mismos arreglos.
- `src/motor/ancho.ts`: un solo `SIN_ANCHO` (marcas Mn/Me del tailandés + ZWJ/ZWNJ del bengalí) dentro
  de `anchoDe`.
- OG: las de calendario y sueldos usan `TextoOg` (RTL de he) sobre las cejas ya en mayúscula del
  locale (tr). Las fuentes CJK y de respaldo se mergearon sin choque.
- Informe vivo y Oferta: `<bdi>` de RTL, minúscula del locale, `puntoFinal` del bengalí y la coma por
  idioma juntos.
- `scripts/check_universales.ts`: `REGLAS_COMPLETAS` pasa a ser todos los idiomas salvo los siete
  latinos del principio (era la línea que chocaba en cada motor). `check_ofertas_intl`: lang+dir del
  mail, sin el título del producto de muestra y con los espacios colapsados.
- `scripts/check_panel_sql.ts`: queda la versión de main (#85); `src/motor/mapa.ts` y `registro.ts`:
  la fecha por clúster de main (#92) en lugar de `fechasDesde` de arreglos (la función sigue y
  check_hreflang la prueba). Las dos versiones pasaban; se prefirió la de main.
- ADR 0002: D9 a D22 en orden (se movió D13 tailandés antes de D14 bengalí). ESTADO.md: una entrada
  de la integración y las secciones de los motores juntas, en el orden del ADR.
- Arreglo pedido por el país rumano: «micro» en `PREFIJOS_RO` de `scripts/reglas_idioma.ts`
  («microîntreprindere» ya pasa).

## Checks

Después de cada grupo (gen_idiomas_universales, check_motor --generar-cargadores, tsc, check_i18n,
check_motor, check_universales), siempre con tsc en 0:

| Después de | check_motor | check_i18n | check_universales |
|---|---|---|---|
| arreglos | 2309 | 32562 textos, 10 idiomas | 4163 casos |
| eu + trad | 2527 | 43377, 15 idiomas | 6167 |
| ar + trad-ar | 2585 | 45564, 16 idiomas | 6835 |
| id, tr, bn, th | 2810 | 54192, 20 idiomas | 8338 |
| uk, uz, ru, ro, cs, el | 3141 | 67341, 26 idiomas | 11678 |
| hu, he | 3264 | 71700, 28 idiomas | 12680 |

Al final, además: check_ofertas_intl TODO OK, check_hreflang 9150 páginas OK, check_eol 10257
archivos en LF, check_fronteras 9197 archivos OK, gen_idiomas_universales --check al día.

CHECKALL

## Cómo sumar los motores que vengan (por ejemplo claude/mundo-motor-sr, en curso)

hu y he ya están adentro (grupo 6). Para un motor nuevo, o si hu/he/cualquiera de las ramas de arriba
suma commits después de esta integración:

1. `git checkout claude/mundo-idiomas-integrado && git merge --no-ff claude/mundo-motor-<x>`.
2. Los conflictos van a ser los mismos de siempre y se resuelven igual: en las listas de idiomas y los
   `Record<Idioma>`, juntar las entradas; en los `index.ts` de las universales y `cargadores.ts`, tomar
   cualquiera de los dos lados y regenerar; en `nombreDeUnidad`, `FormasUnidad`, `cuantosResultados`,
   `normalizar` del buscador, `aLatino` e `inferir.ts`, quedarse con la versión de esta rama y sumarle lo
   del idioma nuevo (su alfabeto, sus dígitos, sus palabras de período); en `REGLAS_COMPLETAS` de
   check_universales, quedarse con esta rama (ya incluye cualquier idioma nuevo); imports repetidos,
   uno por módulo.
3. `npx tsx scripts/gen_idiomas_universales.ts`, `npx tsx scripts/check_motor.ts --generar-cargadores`,
   `npx tsc --noEmit -p .`, check_i18n, check_universales, check_ofertas_intl; commit.
4. La D siguiente del ADR (D23 en adelante) va al final de la sección 2, y su entrada de ESTADO.md
   después de la del hebreo.

Lo mejor es que los motores nuevos salgan de esta rama (o la mergeen al empezar) en lugar de origin/main:
así no vuelven a chocar.

## Pendientes y riesgos

- Sin push (403) y sin credenciales: no hay PR abierto ni deploy; este cuerpo es el PR.
- Las ramas de país (pais-pl, pais-se, pais-ro, pais-ua, pais-cz, etc.) siguen sobre su motor: al
  mergearlas sobre esta rama van a chocar solo en `src/paises/index.ts` y en los cargadores (regenerar).
- Revisión nativa de cada idioma pendiente, como dice cada PR de motor.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
