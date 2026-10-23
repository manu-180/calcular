---
paths:
  - "src/motor/mundo/**"
  - "src/lib/mundo/**"
  - "scripts/mundo/**"
  - "scripts/check_mundo.ts"
  - "src/paises/*/calculadoras/*sueldo*.ts"
  - "src/paises/*/calculadoras/*salario*.ts"
  - "src/paises/*/calculadoras/*salaire*.ts"
  - "src/paises/*/calculadoras/*netto*.ts"
  - "src/paises/*/calculadoras/*take-home*.ts"
---

# «Tu sueldo en el mundo»: grilla de datos

Historia y porqués: `docs/decisiones/mundo.md`.

- `src/motor/mundo/**` no importa el registro, `src/lib` ni `server-only` (check_fronteras). La
  entrada para las páginas es `grillaMundo()` de `src/lib/mundo/grilla.ts`; el motor solo arma la
  grilla con lo que se le pasa.
- Un país entra por, en orden: `definicion.mundo` del país, `ADAPTADORES` del motor, inferencia. Los
  tres pasan por `validarPuntos`; nunca excluir en silencio (todo motivo va a `excluidos`).
- `ppa.json` sale solo de `npx tsx scripts/mundo/actualizar_ppa.ts` (Banco Mundial, PA.NUS.PRVT.PP).
  No se edita a mano. Una PPA de antes de 2019 o más de 3 años detrás de la más nueva de la tabla
  excluye al país.
- Argentina tiene PPA de 2021 en el Banco Mundial: `src/lib/mundo/ar.ts` la lleva al día con IPC del
  INDEC y CPI-U del BLS. Sin eso, AR queda con sueldos de ejemplo por debajo del mínimo.
- Una calculadora de sueldo neto cuyo neto no resta el impuesto a la renta (FR, SG, PY, CH) pasa la
  inferencia igual: necesita `impuesto` en el adaptador o `mundo: { excluir }`. Revisarlo en todo
  país nuevo que entre «inferido».
- `informeMundo()` vale hasta la próxima medianoche de alguna zona y al rehacerse solo corre los
  países cuyo día cambió. No memoizar por día UTC: Nueva Zelanda vería la tabla de ayer todo el día.
- Cambiar `BRUTOS_GRILLA` (contrato en `calculo.ts`) cambia los links y las OG compartidas: no se
  toca desde este frente.
