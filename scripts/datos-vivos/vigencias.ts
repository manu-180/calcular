// Escribe src/data/vigencias.ts: qué mes rige hoy cada dato que el sitio elige por fecha.
//
// POR QUÉ EXISTE: varias páginas eligen el dato vigente al cargar el módulo (const MES = vigenteEn(...)
// fuera del componente), y eso solo cambia con un deploy nuevo. Este archivo es el cambio: el workflow
// datos-vivos lo reescribe en cada corrida y, si el mes (o cualquier dato elegido por fecha) cambió,
// hay diff → commit → Vercel redeploya. Además deja en git la historia de cuándo entró en vigencia
// cada cosa. Sin Actions quedan dos redes: el revalidate de 1 h del layout de (ar) para lo que se
// elige en el render, y el cron /api/cron/datos-vivos, que llama a VERCEL_DEPLOY_HOOK_URL cuando el
// mes del build ya no es el de hoy.
//
// USO: npx -y tsx scripts/datos-vivos/vigencias.ts

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { periodoActualAR, periodoDeMes, vigenteEn } from "../../src/lib/hoy";
import { bonoVigente, prestacionesVigentes } from "../../src/data/prestaciones";
import { asignacionesVigentes } from "../../src/data/asignaciones";
import { MESES_UOCRA } from "../../src/data/convenios/uocra";
import { MESES_COMERCIO } from "../../src/data/convenios/comercio";
import { MESES_CAMIONEROS } from "../../src/data/convenios/camioneros";

const vigencias = {
  mes: periodoActualAR(),
  previsional: `${prestacionesVigentes().periodo} · ${prestacionesVigentes().resolucion} · ${bonoVigente().norma}`,
  asignaciones: `${asignacionesVigentes().periodo} · ${asignacionesVigentes().resolucion}`,
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
