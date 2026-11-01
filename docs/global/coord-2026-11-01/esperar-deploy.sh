#!/usr/bin/env bash
# Espera el estado del deploy de Vercel de un commit. Uso: esperar-deploy.sh <sha>
S=$1
for i in $(seq 1 80); do
  R=$(bash /c/MANU/coord/ghapi.sh GET "/repos/manu-180/calcular/commits/$S/status" | python -c "
import json,sys
d=json.load(sys.stdin);print(d['state']);[print(c['context'],c['state'],(c.get('description') or '')[:80]) for c in d['statuses']]")
  case "$(echo "$R" | head -1)" in success|failure|error) echo "$R"; exit 0;; esac
  sleep 30
done
echo "tiempo agotado"; echo "$R"
