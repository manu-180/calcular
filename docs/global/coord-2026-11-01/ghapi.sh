#!/usr/bin/env bash
# Uso: ghapi.sh METODO /ruta [json]. Toma el token de mnltecno de Git Credential Manager sin imprimirlo.
T=$(printf 'protocol=https\nhost=github.com\nusername=mnltecno\n\n' | git credential fill | sed -n 's/^password=//p')
if [ -n "${3:-}" ]; then
  curl -sS -X "$1" -H "Authorization: Bearer $T" -H "Accept: application/vnd.github+json" -H "Content-Type: application/json" "https://api.github.com$2" -d "$3"
else
  curl -sS -X "$1" -H "Authorization: Bearer $T" -H "Accept: application/vnd.github+json" "https://api.github.com$2"
fi
