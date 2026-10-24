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
- La carga del link (`mercado.tasa.ISO.ventaja`) se calcula en el centro de una franja de bruto de
  razón `RAZON_FRANJA` (1,25), no en el sueldo: así cada carga cubre ±10 % de sueldos. Redondear solo
  la tasa no alcanza (picos y tramos empinados). El día no viaja: sale de la tasa (`diaDeCarga`). La
  página muestra la tasa y el día de la carga, no los exactos. check_mundo prueba el ±10 % con la grilla
  real: si falla, se agranda la franja.
- `decodificarCarga` solo acepta la forma canónica y pide la grilla; el duelo manda con 308 a la
  canónica (`normalizarCarga`) y da 404 a lo inválido; la OG da 404 a parámetros que no son `c` ni
  `formato`. Nunca `decodeURIComponent` sobre el path (tiraba con `%`).
- «Por mes» es el sueldo del recibo: anual = mes × `pagas` del país (de `pagasAnuales` del adaptador;
  12 si no dice). El traspaso guarda el bruto ANUAL y la edición principal (`ca-fr` → `ca`).
- Un umbral de la ley que se cobra sobre todo el sueldo (MX, PY, HK) baja el neto de golpe: la grilla
  lo guarda como escalón (dos puntos a menos de `ESCALON_LEY`) y `validarPuntos` acepta ahí una caída
  de hasta 15 %; entre puntos alejados la tolerancia sigue en 0,1 %. check_mundo falla si la
  interpolación pasa 1 % en el medio de un tramo.
- `PAISES_PUENTE` (rutas.ts) es lo que promete el link de cada calculadora («más de N países»):
  check_mundo falla si la grilla no lo supera.
- La OG lee la bandera del disco (`public/banderas`, sumada al trace en `next.config.ts`), nunca de
  `req.url`.
