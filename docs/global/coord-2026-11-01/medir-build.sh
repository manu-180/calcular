#!/usr/bin/env bash
# Uso: medir-build.sh <heapMB> <cpus> <etiqueta>. Corre el build de producción en tanda-wt y mide el pico.
H=$1; C=$2; E=$3; cd /c/MANU/tanda-wt
rm -f /c/MANU/coord/mem.stop; cp /dev/null /c/MANU/coord/mem.log
(pwsh -NoProfile -File "C:\MANU\coord\medir.ps1" &)
export TSX_DISABLE_CACHE=1 NEXT_PUBLIC_SITIO_INTL_URL=https://calcularya.com BUILD_CPUS=$C
s=$(date +%s); node --max-old-space-size=$H node_modules/next/dist/bin/next build --webpack > /c/MANU/coord/build-$E.log 2>&1; x=$?
touch /c/MANU/coord/mem.stop; sleep 8
echo "$E heap=$H cpus=$C exit=$x $(( $(date +%s)-s ))s $(tail -1 /c/MANU/coord/mem.log)"
grep -E "Compiled|heap out of memory|Allocation failed" /c/MANU/coord/build-$E.log | head -3 | cut -c1-160
cp /c/MANU/coord/mem.log /c/MANU/coord/mem-$E.log
