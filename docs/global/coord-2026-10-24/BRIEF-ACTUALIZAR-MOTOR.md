# Brief: poner al día una rama de motor de idioma con main

Leé primero `C:\MANU\coord\BRIEF-COMUN.md` y `C:\MANU\coord\BRIEF-MOTOR.md`.

Main sigue avanzando mientras trabajamos (Manuel integra frentes nuevos). Entre el 24/10 a la mañana
(f228b37c) y la tarde (bb530d7a) entraron, entre otras cosas: calendario laboral y fiscal por edición
(.ics), índice «¿Cuántas horas de trabajo cuesta?», rankings de países con kit de prensa y datos
abiertos, «Sueldos reales» con aportes anónimos, afiliados, «Tu sueldo en el mundo» en calcular.ar y
medición de fugas. Varios traen diccionarios `Record<Idioma, ...>` y rutas por idioma que TypeScript
exige para cada idioma de `IDIOMAS`. La rama local `claude/mundo-motor-th` ya los resolvió para el
tailandés: usala de modelo (`git log claude/mundo-motor-th`, commits de calendario, horas, rankings y
sueldos).

Tu trabajo, en la rama de motor que te indica el encargo (rama local existente: hacé
`git checkout <rama>` en tu worktree; si la rama está tomada por otro worktree, `git worktree list`
te dice dónde, y en ese caso creá una rama nueva `<rama>-al-dia` desde ella):

1. `git fetch origin && git merge origin/main`. Resolvé conflictos sumando las entradas de los dos
   lados (listas por idioma, `Record`, `PAISES`) y regenerando lo generado
   (`npx tsx scripts/gen_idiomas_universales.ts`, `npx tsx scripts/check_motor.ts --generar-cargadores`).
2. Completá en cada idioma de la rama todo diccionario, ruta, slug y texto nuevo que exija main, con
   el registro y el vocabulario que ya eligió el motor (leé su entrada D en el ADR). Textos nativos,
   sin rayas ni emojis.
3. Corré la verificación de BRIEF-MOTOR más los checks nuevos de main que toquen idiomas
   (check_calendario, check_horas, check_rankings, check_sueldos, check_mundo, check_embed y lo que
   liste `scripts/check-all.ts`). Al final `npx tsx scripts/check-all.ts` en segundo plano.
4. Commiteá cada bloque. Actualizá el cuerpo del PR de la rama en `C:\MANU\coord\prs\` (agregá una
   sección «Puesta al día con main bb530d7a» o el commit que hayas mergeado).

Devolvé el retorno breve en español: rama, último commit, qué diccionarios completaste, checks.
