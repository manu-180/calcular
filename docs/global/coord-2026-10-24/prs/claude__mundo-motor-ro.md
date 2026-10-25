# motor ro: rumano para Rumania y Moldavia (núcleo, sitio, venta, páginas globales y 41 universales)

## Qué incluye

Rama `claude/mundo-motor-ro`, basada en `origin/main` (7d190a68). No depende de ningún motor sin mergear.

- **Núcleo.** `ro` en `IDIOMAS`. Textos y errores del motor, calculadora, sitio (`src/motor/i18n/ro.ts`), inicio y legales.
- **Plurales.** `src/motor/i18n/plural.ts` trae `formaRo`, `pluralRo` y `deRo`, con Intl.PluralRules("ro"): «1 an», «2 ani», «20 de ani», «101 ani», «1.000 de lei».
  - `FormasUnidad` suma `pocos` y `muchos`, y `formatearValorUnidad` elige la forma por categoría.
- **Gramática del país.** `GRAMATICA.ro` arma el genitivo con artículo enclítico: «României», «Mexicului», «Statelor Unite ale Americii», «Arabiei Saudite».
  - Los nombres que no se declinan van con «din X».
  - El lugar es «în X» y el destino «pentru X».
- **Reglas de texto.** En `scripts/reglas_idioma.ts` se atrapan:
  - ş y ţ con cedilla;
  - â e î fuera de la norma de la Academia, y «sînt»;
  - comillas que no son „”;
  - palabras comunes sin diacríticos;
  - el «tu» y la 2.ª persona del singular, los posesivos de «voi» y «dvs.».
- **Buscador.** El contador lleva la forma con «de» («20 de rezultate»).
- **Páginas globales.** Cada una con sus carpetas de rutas y su OG (Noto Sans de respaldo):
  - «Tu sueldo en el mundo» (`salariu-in-lume`);
  - rankings (`clasamentul-tarilor`, con los tres rankings);
  - horas de trabajo (`cate-ore-de-munca`);
  - calendario (`calendar-salarial`);
  - sueldos reales (`salarii-reale`).
- **Diccionarios chicos.** Compartir, embed y afiliados en rumano. `inferir.ts` reconoce los períodos en rumano.
- **Venta.** Diccionario completo en `src/lib/pagos/textos/ro.ts`, con `ro` en `IDIOMAS_VENTA`.
- **Universales.** Las 41, en `textos/ro.ts` y `contenido/ro.ts`, con slugs ASCII y cableadas. Cargadores regenerados.
- **Edición de prueba.** `zz-ro` (Zetalandia, `ro-001`), con `estado: "interno"`.
- **Mercados de prueba en check_universales.** ro-RO con RON, ro-MD con MDL, «Saint Vincent și Grenadinele» y «Statele Unite ale Americii».
- **Documentación.** ADR 0002, entrada D18, y una sección en `docs/global/ESTADO.md`.

## Decisiones

- **Registro.** Es el de ANAF SPV, BCR e ING Home'Bank: «dumneavoastră» implícito, con imperativo y presente de 2.ª del plural.
  - Los botones también van en 2.ª del plural («Calculați»).
  - Se descartó «Calculează», porque coincide con la 2.ª del singular y mezclaría personas en la misma pantalla.
  - Se descartó «Calculare», porque suena a menú de software.
  - Los mercados van con `trato: "usted"`.
- **Textos neutrales entre Rumania y Moldavia.** No se nombran organismos de un solo país (ANAF, SFS, BNR, BNM, ROBOR, rovinietă). Las cifras legales salen del dato del país.
- **Moneda de Moldavia.** En ro-MD Intl escribe el leu moldavo como «L». El mercado `md` tendrá que fijar `simbolos: { MDL: "MDL" }`.

## Checks corridos

- `npx tsc --noEmit -p .`: sin errores.
- `check_i18n`: TODO OK, 30408 textos en 11 idiomas × 3 tratos.
- `check_motor`: TODO OK, 2332 pruebas. Suma casos de parseo ro-RO y ro-MD, plurales y gramática rumana.
- `check_universales`: 41 universales, 4664 casos probados, sin fallas.
- `check_ofertas_intl`: 15 fallas, todas de cl (UF). Ya fallaban en main y están arregladas en `claude/mundo-arreglos-2026-10-24`. No hay ninguna de ro.
- `check_textos_paises zz-ro`: TODO OK, 35 textos.
- `gen_idiomas_universales --check`: index al día.
- `check_fronteras`: TODO OK, 7659 archivos.
- `check_eol`: TODO OK.
- `check_calendario`: TODO OK, 91 fechas en 20 ediciones.
- `check_horas`: OK, 32 países. Tiene 1 aviso ajeno (una serie de AR vence el 31/10).
- `check_rankings`: TODO OK, 3 rankings, 344 filas, 43 países.
- `check_mundo`: TODO OK.
- `check_sueldos`: 15438 pasadas, 0 fallas.
- `check_embed`: TODO OK, 59 mercados.

## Pasos saltados

- No se corrieron `check-all` ni `npm run build`, porque el brief del motor no los pide.
- Nada de esto necesitó credenciales.

## Pendientes

- Los países `ro` y `md` en sí (BRIEF-PAIS), con datos verificados en fuentes oficiales.
- La revisión de un hablante nativo sobre una muestra de páginas.

## Riesgos al mergear

Hay choques esperables con `claude/mundo-motor-eu`, `-uk` y `-ru`:

- `src/motor/i18n/plural.ts`: todas las ramas lo crean, así que hay que dejar las funciones de todos los idiomas juntas.
- `FormasUnidad` en `unidades.ts` y `nombreDeUnidad` en `formato.ts`: es el mismo cambio en todas.
- `cuantosResultados` del buscador: tienen que convivir `resultadosPocos` (eslavos) y `resultadosDe` (rumano).
- La lista de `IDIOMAS`, los `Record<Idioma>`, `src/paises/index.ts` y los cargadores: hay que regenerarlos.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
