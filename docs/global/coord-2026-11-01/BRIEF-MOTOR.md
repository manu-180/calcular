# Brief de frente de motor de idioma (calcularya, vigente desde el 31/10/2026)

Leé primero `C:\MANU\coord\BRIEF-COMUN.md`. Un idioma entra al sistema cuando tiene todos sus diccionarios
completos (lo obliga TypeScript). Un frente de motor deja el idioma listo para que un agente de país solo
escriba el país.

Modelo: el último idioma que entró a main (`hu`, húngaro; `he` si tu idioma tiene RTL; `uk`/`ru` para
cirílico y plurales eslavos). Buscá dónde aparece: `git grep -l '\bhu\b' -- src scripts | head -60` y
`ls src/motor/i18n`. Leé `.claude/rules/build-vercel.md`: **una ruta por sección, no una carpeta por idioma**:
los slugs de mundo, rankings, horas, sueldos y calendario se suman a `src/motor/secciones.ts` y `next.config.ts`
los reescribe; nunca crees carpetas por idioma en `src/app/(intl)/intl/[mercado]/` (si tu rama vieja las tiene,
sacalas). Leé también `.claude/rules/{mundo,rankings,horas,sueldos,calendario,embed,compartir,hreflang}.md`.

## Qué incluye

1. `IDIOMAS` en `src/motor/tipos.ts`, textos del motor y errores, formato y parseo de números, plurales, unidades,
   gramática del nombre del país, calculadora.
2. Sitio, inicio, legales, compartir, embed, afiliados y todos los diccionarios por idioma de las secciones globales.
3. Venta: `src/lib/pagos/textos/<idioma>.ts` completo y alta en `IDIOMAS_VENTA`.
4. Reglas de texto en `scripts/reglas_idioma.ts`, casos en `check_motor`, mercados de prueba en `check_universales`.
5. Las 41 universales: `src/motor/universales/<id>/textos/<idioma>.ts` y `contenido/<idioma>.ts`, cableadas con
   `TSX_DISABLE_CACHE=1 npx tsx scripts/gen_idiomas_universales.ts`. Podés repartirlas en forks, revisá muestras y commiteá vos.
6. Edición interna de prueba `src/paises/zz-<idioma>/`, registrada en `PAISES` con `estado: "interno"` (esto sí se commitea).
7. Entrada D nueva en `docs/adr/0002-mundo.md` (mirá el último número en main) y sección en `docs/global/ESTADO.md`.

Un solo registro por idioma, el de los bancos y webs de servicios del país; justificalo en el ADR.

## Verificación

Con `TSX_DISABLE_CACHE=1`: `tsc --noEmit -p .`, `check_i18n`, `check_motor` (con `--generar-cargadores`), `check_universales`,
`check_ofertas_intl`, `check_textos_paises zz-<idioma>`, `gen_idiomas_universales --check`, `check_fronteras`, `check_eol`,
`check_calendario`, `check_horas`, `check_rankings`, `check_mundo`, `check_sueldos`, `check_embed`, `check_guiones`.

Commiteá y pusheá cada bloque. Un PR lo abre el coordinador; vos dejá la rama en verde y devolvé el retorno breve.
