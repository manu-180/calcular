#!/usr/bin/env bash
# Ignored Build Step de calcular-ar en Vercel: exit 0 = no construir, exit 1 = construir.
# Vive en un archivo porque ignoreCommand de vercel.json no acepta más de 256 caracteres.
#
# Un build de calcular rearma 10.308 páginas: ~6 min de máquina de 4 núcleos que Vercel cobra.
# Por eso los previews son opt-in: una rama sólo construye si el commit dice [preview] en el
# mensaje (las ramas claude/** ya no construyen por vercel.json). Producción construye siempre
# que el push toque algo que no sea documentación, marketing, .github o .claude.
#
# Otra cosa que frena a producción y no pasa por este script: Vercel bloquea el deploy de un commit
# cuyo autor no es del equipo. Los merges a main tienen que quedar con autor manu-180 (ver
# .claude/rules/vercel-consumo.md).
if [ "$VERCEL_ENV" != "production" ]; then
  case "$VERCEL_GIT_COMMIT_MESSAGE" in
    *"[preview]"*) ;;
    *) exit 0 ;;
  esac
fi
base="${VERCEL_GIT_PREVIOUS_SHA:-}"
if [ -z "$base" ] || ! git cat-file -e "$base^{commit}" 2>/dev/null; then
  base=$(git rev-parse -q --verify HEAD^ 2>/dev/null) || exit 1
fi
if git diff --quiet "$base" HEAD -- . ':(exclude)*.md' ':(exclude)docs' ':(exclude)marketing' ':(exclude).github' ':(exclude).claude'; then
  exit 0
fi
exit 1
