// Escribe src/data/vigencias.ts: qué mes rige hoy cada dato que el sitio elige por fecha.
//
// POR QUÉ EXISTE: las páginas son estáticas y eligen el dato vigente AL COMPILAR (src/lib/hoy.ts).
// El día 1 el mes cambia, pero nada del repo cambió, así que nadie redeploya y el sitio seguiría
// mostrando el mes anterior. Este archivo es el cambio: el workflow datos-vivos lo reescribe en cada
// corrida y, si el mes (o cualquier dato elegido por fecha) cambió, hay diff → commit → Vercel
// redeploya. Además deja en git la historia de cuándo entró en vigencia cada cosa.
//
// USO: npx -y tsx scripts/datos-vivos/vigencias.ts

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { periodoActualAR, periodoDeMes, vigenteEn } from "../../src/lib/hoy";
import { BONO_VIGENTE, PRESTACIONES_VIGENTES } from "../../src/data/prestaciones";
import { ASIGNACIONES_VIGENTES } from "../../src/data/asignaciones";
import { MESES_UOCRA } from "../../src/data/convenios/uocra";
import { MESES_COMERCIO } from "../../src/data/convenios/comercio";
import { MESES_CAMIONEROS } from "../../src/data/convenios/camioneros";

const vigencias = {
  mes: periodoActualAR(),
  previsional: `${PRESTACIONES_VIGENTES.periodo} · ${PRESTACIONES_VIGENTES.resolucion} · ${BONO_VIGENTE.norma}`,
  asignaciones: `${ASIGNACIONES_VIGENTES.periodo} · ${ASIGNACIONES_VIGENTES.resolucion}`,
  uocra: vigenteEn(MESES_UOCRA, periodoDeMes).id,
  comercio: vigenteEn(MESES_COMERCIO, periodoDeMes).id,
  camioneros: vigenteEn(MESES_CAMIONEROS, periodoDeMes).id,
};

const cuerpo = Object.entries(vigencias)
  .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
  .join("\n");

writeFileSync(
  resolve(import.meta.dirname, "..", "..", "src", "data", "vigencias.ts"),
  `// GENERADO por scripts/datos-vivos/vigencias.ts — NO editar a mano.
// Qué dato rige en el último build publicado. Si cambia (el día 1, o cuando entra un mes cargado por
// adelantado), el workflow datos-vivos lo commitea y eso es lo que dispara el redeploy.
export const VIGENCIAS_PUBLICADAS = {
${cuerpo}
} as const;
`,
);
console.log(`✓ vigencias: ${Object.entries(vigencias).map(([k, v]) => `${k}=${v}`).join(" · ")}`);
