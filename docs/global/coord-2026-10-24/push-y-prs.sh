#!/usr/bin/env bash
# Pushea las ramas locales claude/* de esta sesión y abre un PR contra main por cada cuerpo en prs/.
# Requiere una cuenta con permiso de escritura en manu-180/calcular y `gh auth login` (para los PR).
# Uso (Git Bash, desde la raíz del clon que tiene las ramas): bash docs/global/coord-2026-10-24/push-y-prs.sh [--solo-push]
# Nunca pushea main, nunca usa --force: si un push no es fast-forward, falla y sigue con la próxima rama.
set -u
DIR=$(cd "$(dirname "$0")" && pwd)
PRS="$DIR/prs"
cd "$(git rev-parse --show-toplevel)" || exit 1

for rama in $(git for-each-ref --format='%(refname:short)' refs/heads/claude/); do
  case "$rama" in
    claude/mundo-motor-eu-al-dia) continue ;;  # mismo commit que claude/mundo-motor-eu
  esac
  echo "== $rama"
  git push -u origin "refs/heads/$rama:refs/heads/$rama" || { echo "falló el push de $rama"; continue; }
  [ "${1:-}" = "--solo-push" ] && continue
  cuerpo="$PRS/$(echo "$rama" | sed 's#/#__#g').md"
  [ -f "$cuerpo" ] || { echo "sin cuerpo de PR (frente a medias): $rama"; continue; }
  if gh pr view "$rama" --repo manu-180/calcular >/dev/null 2>&1; then
    echo "ya tiene PR: $rama"
    continue
  fi
  titulo=$(head -1 "$cuerpo" | sed 's/^# *//')
  tail -n +2 "$cuerpo" > "${TMPDIR:-/tmp}/cuerpo-pr.md"
  gh pr create --repo manu-180/calcular --base main --head "$rama" --title "$titulo" --body-file "${TMPDIR:-/tmp}/cuerpo-pr.md"
done
