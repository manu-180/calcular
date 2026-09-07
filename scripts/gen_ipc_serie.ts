// Regenera src/data/ipc-serie.ts desde la API oficial de series de tiempo de datos.gob.ar.
// Uso: npx -y tsx scripts/gen_ipc_serie.ts   (correr en cada redeploy mensual, ~día 12-15)
// OJO: la API puede tardar >30s — por eso la serie se embebe en build y NUNCA se fetchea client-side.

import { writeFileSync } from "node:fs";
import { join } from "node:path";

const API_URL =
  "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json&limit=1000";

// Períodos verificados a mano cuando la API de datos.gob.ar viene atrasada respecto del INDEC
// (publica el informe ~día 10-12 y la API tarda unos días más en reflejarlo).
// REGLA: solo cargar acá valores tomados de la planilla de series históricas del INDEC
// (https://www.indec.gob.ar/ftp/cuadros/economia/sh_ipc_MM_AA.xls, hoja "Índices IPC Cobertura
// Nacional", fila "Nivel general") y dejar la fuente + fecha en el comentario.
// Cuando la API alcanza al período, el script lo detecta, usa el dato de la API y avisa que
// se puede borrar la entrada.
const EXTRA_PERIODOS: ReadonlyArray<readonly [string, number]> = [
  // (vacío) — la API de datos.gob.ar está al día hasta junio 2026 (verificado 2026-07-29:
  // confirmó 11.607,3937 para mayo, idéntico al valor manual que estaba acá, y trajo junio).
];

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function nombrePeriodo(p: string): string {
  const [anio, mes] = p.split("-");
  return `${MESES[Number(mes) - 1]} ${anio}`;
}

async function main() {
  console.log("Descargando serie IPC (puede tardar hasta 90s)...");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 120_000);
  const res = await fetch(API_URL, { signal: ctrl.signal });
  clearTimeout(timer);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = (await res.json()) as { data: [string, number][] };

  const serie = json.data
    .filter(([fecha, valor]) => typeof valor === "number" && /^\d{4}-\d{2}-\d{2}$/.test(fecha))
    .map(([fecha, valor]) => [fecha.slice(0, 7), valor] as const)
    .map((par) => [par[0], par[1]] as [string, number]);

  // Anexar períodos manuales verificados que la API todavía no tiene.
  const ultimoApi = serie[serie.length - 1][0];
  for (const [periodo, valor] of EXTRA_PERIODOS) {
    if (periodo <= ultimoApi) {
      const deApi = serie.find(([p]) => p === periodo);
      console.log(
        `AVISO: la API ya tiene ${periodo} (${deApi?.[1]}) — borrar la entrada manual de EXTRA_PERIODOS` +
          (deApi && Math.abs(deApi[1] - valor) > 0.01
            ? ` ⚠️ DIFIERE del valor manual (${valor}): revisar`
            : ""),
      );
    } else {
      serie.push([periodo, valor]);
      console.log(`Anexado período manual verificado: ${periodo} = ${valor} (la API llega hasta ${ultimoApi})`);
    }
  }
  serie.sort((a, b) => a[0].localeCompare(b[0]));

  if (serie.length < 100) throw new Error(`Serie sospechosamente corta: ${serie.length} valores`);
  if (serie[0][0] !== "2016-12" || serie[0][1] !== 100) {
    throw new Error(`La serie no arranca en 2016-12=100: ${serie[0]}`);
  }

  const ultimo = serie[serie.length - 1];
  const hoy = new Date().toISOString().slice(0, 10);
  const filas = serie.map(([p, v]) => `  ["${p}", ${v}],`).join("\n");

  const contenido = `// Serie histórica del IPC Nacional (INDEC) — nivel general, base diciembre 2016 = 100.
// GENERADO por scripts/gen_ipc_serie.ts desde la API oficial de series de tiempo: NO editar a mano.
//   ${API_URL}
// Descargado el ${hoy}. Último período: ${nombrePeriodo(ultimo[0])} (índice ${ultimo[1]}).
// El INDEC publica cada mes ~día 10-15 del mes siguiente: regenerar en cada redeploy mensual.

// [período "YYYY-MM", índice]
export const IPC_SERIE: ReadonlyArray<readonly [string, number]> = [
${filas}
];

export const IPC_DESCARGADO_EL = "${hoy}";
`;

  const destino = join(import.meta.dirname, "..", "src", "data", "ipc-serie.ts");
  writeFileSync(destino, contenido, "utf8");
  console.log(`OK: ${serie.length} períodos (${serie[0][0]} → ${ultimo[0]}) → ${destino}`);
}

main().catch((e) => {
  console.error("ERROR:", e.message ?? e);
  process.exit(1);
});
