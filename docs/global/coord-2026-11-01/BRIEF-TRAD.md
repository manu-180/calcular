# Brief de traducción de las 41 universales a un idioma nuevo

Leé primero y seguí: `C:\MANU\coord\BRIEF-COMUN.md`, `C:\MANU\coord\BRIEF-MOTOR.md` (el punto 6 es tu
alcance) y `docs/global/RECETA-UNIVERSAL.md`.

- Rama nueva `claude/mundo-trad-<idioma>` basada en la rama local del motor de ese idioma (te la dice
  el encargo): `git checkout -b claude/mundo-trad-<idioma> <rama del motor>`. Si la rama local del
  motor no existe, usá `origin/<rama del motor>`. No mergees main: no hace falta.
- Otro agente puede seguir trabajando el núcleo del idioma en la rama del motor: vos no tocás nada
  del núcleo (i18n, venta, tipos). Si un error de `tsc` viene del núcleo a medio armar, anotalo y seguí.
- Creá SOLO `src/motor/universales/<id>/textos/<idioma>.ts` (`export const textos<Idioma>`) y
  `src/motor/universales/<id>/contenido/<idioma>.ts` (`export const contenido<Idioma>`) para las 41
  universales (`ls src/motor/universales`), con el modelo de las existentes (en.ts, de.ts y la rama
  `claude/mundo-trad-sv`, ya terminada, como ejemplo de un idioma nuevo). Después
  `npx tsx scripts/gen_idiomas_universales.ts` para el cableado.
- Textos nativos del país principal del idioma, con su vocabulario real, no traducidos palabra por
  palabra; el registro es el que eligió el motor (miralo en `src/motor/i18n/<idioma>.ts`). Si el idioma
  se usa en varios países, textos neutrales de país (sin nombrar organismos de uno solo).
- Slugs: lo que la gente busca en ese idioma, kebab-case ASCII (transliterado si hace falta), sin
  repetirse entre universales. Los números de los ejemplos se calculan, no se tipean. Plurales con las
  utilidades del motor. Salud: informativo, con la oración de que no reemplaza la consulta profesional.
- Si `check_universales` no tiene un mercado de prueba del idioma, sumalo con un cambio mínimo en
  `scripts/check_universales.ts` y anotalo.
- Podés repartir universales en forks (subagentes) para ir más rápido, revisando muestras y
  commiteando vos.
- Commiteá cada 8 a 10 universales.

Verificación: `npx tsc --noEmit -p .`, `npx tsx scripts/check_universales.ts` (y por id),
`npx tsx scripts/gen_idiomas_universales.ts --check`, `npx tsx scripts/check_eol.ts`. Al terminar
escribí el cuerpo del PR en `C:\MANU\coord\prs\claude__mundo-trad-<idioma>.md` (dice de qué rama
depende) y devolvé el retorno breve en español.
