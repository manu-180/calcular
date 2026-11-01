#!/usr/bin/env bash
# Equivalente a `gh run watch`: espera a que terminen los check-runs de un commit e imprime el resultado.
# Uso: esperar-ci.sh <sha> [minutos-max]
S=$1; MAX=${2:-90}
for i in $(seq 1 $((MAX*2))); do
  R=$(bash /c/MANU/coord/ghapi.sh GET "/repos/manu-180/calcular/commits/$S/check-runs" | python -c "
import json,sys
d=json.load(sys.stdin)['check_runs']
print('pendiente' if (not d or any(c['status']!='completed' for c in d)) else 'listo')
for c in d: print(c['name'],c['status'],c['conclusion'],c['html_url'])")
  if [ "$(echo "$R" | head -1)" = "listo" ]; then echo "$R"; exit 0; fi
  sleep 30
done
echo "tiempo agotado"; echo "$R"; exit 1
