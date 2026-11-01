#!/usr/bin/env bash
# Registra mg en src/paises/index.ts solo para probar en local. Ese cambio nunca se commitea.
set -e
f="$(dirname "$0")/../../../src/paises/index.ts"
grep -q 'import mg from "./mg";' "$f" && exit 0
sed -i 's|^import sn from "./sn";|import sn from "./sn";\nimport mg from "./mg";|; s|\] as const;$|, mg] as const;|' "$f"
