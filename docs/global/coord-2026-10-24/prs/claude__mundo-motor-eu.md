# Motor europeo: polaco, sueco, danés, noruego y finés (pl, sv, da, nb, fi)

## Qué incluye

Los cinco idiomas quedan listos para que un agente de país solo escriba el país (ADR 0002, D9).

- `IDIOMAS` suma pl, sv, da, nb y fi. Están cableados en motor y mensajes de error (`src/motor/textos.ts`),
  calculadora, sitio, inicio, legales, compartir, embed, «Tu sueldo en el mundo» (con sus slugs en
  `SLUG_MUNDO`), gramática de países y unidades.
- Venta completa en los cinco (`src/lib/pagos/textos/{pl,sv,da,nb,fi}.ts`, `IDIOMAS_VENTA`): 23 familias,
  `informe-calculo` incluida, más informes, planillas y mails.
- Registro: un solo registro informal por idioma, `trato: "tu"`, solo `base`. pl con Ty implícito,
  sv, da y nb con du, fi con sinä implícito. La justificación está en el ADR.
- `GRAMATICA.fi`: genitivo y caso de lugar, por tabla (compuestos, plurales, adesivo) y por regla
  (gradación consonántica y armonía vocálica). Se agregó `da`, que faltaba en `GRAMATICA`.
- Unidades: nb, y fi con partitivo después de un número distinto de 1. Los separadores del mensaje de
  miles en fi van en partitivo.
- Checks:
  - `reglas_idioma`: registro formal de nb y fi.
  - `check_universales`: mercados de prueba nb-NO y fi-FI (Suomi, Malta y San Vicente) y reglas completas.
  - `check_ofertas_intl`: TRATOS de los cinco idiomas.
  - `check_i18n`: «Tema» y «Rosa» quedan permitidos en sv, da y nb.
  - `check_motor`: espera las ocho ediciones de zz.
- Ediciones internas `zz-pl`, `zz-sv`, `zz-da`, `zz-nb` y `zz-fi`, con locale `<idioma>-001` como `zz-ja`.
- Puesta al día con main (merge `e53f728b`):
  - Privacidad nueva en los legales de pl, sv, da y nb: la IP ya no va con el país, más localStorage,
    el código del link compartido y el bloque de cómo contamos visitas.
  - `informe-calculo` en pl, sv y da.
  - Diccionarios nuevos de compartir, embed y mundo en los cinco idiomas.
- Docs: ADR 0002, D9 (registro, gramática, formato, slugs, reglas y prueba) y una sección en
  `docs/global/ESTADO.md`. Los comentarios que citaban `docs/global/IDIOMAS-EU.md`, que nunca existió,
  ahora apuntan a D9.

## Puesta al día con main bb530d7a (24/10 a la tarde)

Hecha en `claude/mundo-motor-eu-al-dia` (la rama estaba tomada por otro worktree al empezar) y
después llevada a `claude/mundo-motor-eu` por fast-forward: las dos quedan en `e371d144`.

- Merge de `origin/main` bb530d7a sin conflictos (`213aa08a`).
- Diccionarios nuevos de main completados en pl, sv, da, nb y fi, con el registro de D9 (solo `base`):
  - `src/motor/i18n/calendario.ts` (calendario laboral y fiscal).
  - `src/motor/i18n/horas.ts` y `conArticulo` de `src/motor/horas/productos.ts` (sv, da y nb con
    artículo indefinido, «en iPhone 17», y frases en orden V2; pl y fi en nominativo).
  - `src/motor/i18n/rankings.ts` (posición en aposición: «Zetaland, miejsce 27 z 41»).
  - `src/motor/i18n/sueldos.ts` (35 ocupaciones; en pl y fi {ocupacion} en nominativo tras dos
    puntos). `pl:pagina.colMediana` va a `IGUALES` de check_sueldos («Mediana» igual que en español).
  - `src/motor/i18n/afiliados.ts`.
- Slugs nuevos en `SLUG_CALENDARIO`, `SLUG_HORAS`, `SLUG_RANKINGS` (y `SLUGS_RANKING` con slug propio
  por idioma) y `SLUG_SUELDOS`, con sus carpetas en `src/app/(intl)/intl/[mercado]/` (página, og, .ics
  y evento donde corresponde). Lista completa en D9.
- Carpetas de «Tu sueldo en el mundo» que el motor no había creado: `wynagrodzenie-na-swiecie`,
  `lon-i-varlden`, `lon-i-verden`, `lonn-i-verden`, `palkka-maailmalla` (`[[...c]]/page.tsx` y
  `og/route.tsx`, como `gehalt-weltweit`).
- El día de liberación fiscal en rankings usa el nombre que ya tenía «Tu sueldo en el mundo» en cada
  idioma (skattefrihetsdagen en sv). Para revisar con un nativo: la prensa sueca podría usar otro
  nombre (Skattebetalarnas Förening).
- D9 y `docs/global/ESTADO.md` actualizados.

Checks después de la puesta al día:
- tsc OK; check_i18n TODO OK (39033 textos en 15 idiomas × 3 tratos); check_motor 2288 pruebas;
  check_universales 41 universales, 3996 casos; gen_idiomas_universales --check al día;
  check_fronteras 7609 archivos; check_eol OK; check_textos_paises zz-pl/sv/da/nb/fi 35 textos y 0
  avisos cada uno.
- check_calendario TODO OK (91 fechas en 20 ediciones); check_horas OK (32 países, 1 aviso de AR);
  check_rankings TODO OK (3 rankings, 43 países, 120 ediciones); check_sueldos 19605 pasadas y 0
  fallas; check_mundo TODO OK; check_embed TODO OK (63 mercados).
- check-all: 151 de 155 suites verdes. Fallan check_hreflang (900, todas del clúster de inflación),
  check_ofertas_intl (15, cl UF), check_mes_en_render (11 páginas de (ar)) y check_panel_sql (sin
  base): las cuatro fallan igual en main (commit 50664aa2 de main lo anota). Ninguna es de este frente.

Ramas actualizadas con este motor (merge de `claude/mundo-motor-eu`, gen_idiomas_universales sin
cambios, tsc y check_universales OK): `claude/mundo-trad-pl` (`2bac523c`, conflictos en
IDIOMAS_VENTA y TRATOS resueltos con la lista del motor), `claude/mundo-trad-sv` (`9987effa`),
`claude/mundo-trad-da` (`7fc4cdb2`), y `claude/pais-pl` (ver su PR).

## De qué depende

De nada sin mergear. La rama tiene mergeado `origin/main` bb530d7a.

**Las 41 universales en estos idiomas no están en este PR.** Las escriben las ramas
`claude/mundo-trad-<idioma>`, que crean solo `textos/<idioma>.ts` y `contenido/<idioma>.ts`, y
después hay que correr `npx tsx scripts/gen_idiomas_universales.ts`. Hasta que entren, las ediciones
zz y cualquier mercado de estos idiomas no tienen universales (`universales: "todas"` toma cero).
Ningún check de este PR exige las universales traducidas.

## Checks corridos

- `npx tsc --noEmit -p .`: OK, sin errores.
- `npx tsx scripts/check_i18n.ts`: TODO OK, 25248 textos en 15 idiomas × 3 tratos.
- `npx tsx scripts/check_motor.ts`: TODO OK, 2288 pruebas. Con `--generar-cargadores` no hay cambios.
- `npx tsx scripts/check_universales.ts`: 41 universales, 3996 casos ✓. Todavía no hay casos en los
  idiomas nuevos porque no tienen textos.
- `npx tsx scripts/check_ofertas_intl.ts`: 15 fallas, todas de Chile (`cl/sueldo-liquido` y
  `cl/finiquito`). Difieren la planilla con datos y la calculadora en el tope en UF (3707987 contra
  3708942). Es ajeno a este frente: no se tocó nada de cl ni del cálculo, y parece una serie de UF que
  depende de la fecha. No lo confirmé contra main. Fuera de eso, los 48608 textos de venta están OK.
- `npx tsx scripts/check_textos_paises.ts zz-pl` (y zz-sv, zz-da, zz-nb, zz-fi): TODO OK, 35 textos y
  0 avisos en cada uno.
- `npx tsx scripts/gen_idiomas_universales.ts --check`: index al día ✓.
- `npx tsx scripts/check_fronteras.ts`: TODO OK, 7521 archivos.
- `npx tsx scripts/check_eol.ts`: TODO OK, 8184 archivos en LF.
- Extra:
  - `check_mundo`: TODO OK, con 43 países.
  - `check_hreflang`: 900 fallas, todas en calculadoras de inflación de países ya publicados (kw, sg,
    hk, my, ph…). Parece una serie vencida y es ajeno a este frente. Las ediciones zz son internas.

## Pasos saltados

- `npm run build` y `check-all` no se corrieron: no hay país nuevo publicado y el brief de motor no lo pide.
- Sin credenciales: nada de Supabase, Vercel ni PayPal (este frente no lo necesita).

## Pendientes y riesgos

- Universales en pl, sv, da, nb y fi (ramas mundo-trad).
- Revisión de un hablante nativo sobre una muestra de cada idioma antes del primer país. Lo que más
  conviene mirar:
  - La gramática finesa en frases con nombre de país.
  - Los nombres de producto de la venta en fi y nb (lopputili, sluttoppgjør, indeksitarkistuskirje).
- `GRAMATICA.fi` cubre los nombres probables por tabla y por regla. Un país con declinación irregular
  que no esté en la tabla puede salir mal y se agrega a la tabla.
- Con «Yhdistyneet arabiemiirikunnat», el primer título candidato en fi pasa de 60 caracteres y se usa
  el segundo (elegirTitulo).
- Choques esperables al mergear con ramas de países:
  - `src/paises/index.ts`, por las ediciones zz.
  - Las listas por idioma en scripts (TRATOS, PRUEBA, REGISTRO).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
