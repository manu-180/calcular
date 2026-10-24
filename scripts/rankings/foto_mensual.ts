// Foto mensual de los rankings: guarda los puestos de hoy en src/motor/rankings/historial/AAAA-MM.json
// y reescribe historial/indice.ts. La página compara contra la foto más nueva de un mes anterior al de
// la grilla, así que alcanza con correrlo una vez por mes (idealmente el día 1) y commitear los dos
// archivos. Si la foto del mes ya existe no la pisa, salvo con --forzar.
//   npx tsx scripts/rankings/foto_mensual.ts            (mes de la grilla)
//   npx tsx scripts/rankings/foto_mensual.ts --forzar
import "../sin-server-only";
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { construirInformeMundo } from "../../src/lib/mundo/grilla";
import { todosLosRankings } from "../../src/motor/rankings/calculo";
import { fotoDe, RE_MES } from "../../src/motor/rankings/historial";

const DIR = path.join(process.cwd(), "src", "motor", "rankings", "historial");
const forzar = process.argv.includes("--forzar");

export function escribirIndice(dir: string = DIR): string[] {
  const meses = readdirSync(dir)
    .map((f) => f.match(/^(\d{4}-\d{2})\.json$/)?.[1])
    .filter((m): m is string => !!m && RE_MES.test(m))
    .sort();
  const nombre = (m: string) => `f${m.replace("-", "_")}`;
  const texto = [
    "// Lo reescribe scripts/rankings/foto_mensual.ts: no editar a mano.",
    'import type { FotoMensual } from "../historial";',
    ...meses.map((m) => `import ${nombre(m)} from "./${m}.json";`),
    "",
    `export const FOTOS: readonly FotoMensual[] = [${meses.map((m) => `${nombre(m)} as FotoMensual`).join(", ")}];`,
    "",
  ].join("\n");
  writeFileSync(path.join(dir, "indice.ts"), texto);
  return meses;
}

function main() {
  const { grilla } = construirInformeMundo();
  if (!grilla.paises.length || !grilla.generadoEl) {
    console.error("❌ la grilla salió vacía: no se guarda ninguna foto");
    process.exit(1);
  }
  const mes = grilla.generadoEl.slice(0, 7);
  const archivo = path.join(DIR, `${mes}.json`);
  if (existsSync(archivo) && !forzar) {
    console.log(`La foto de ${mes} ya existe (${path.relative(process.cwd(), archivo)}). Nada que hacer; --forzar la rehace.`);
  } else {
    const foto = fotoDe(todosLosRankings(grilla), mes, grilla.generadoEl, grilla.paises.length);
    writeFileSync(archivo, JSON.stringify(foto, null, 2) + "\n");
    console.log(`✅ foto ${mes}: ${foto.paises} países, tomada el ${foto.tomadaEl}`);
  }
  const meses = escribirIndice();
  console.log(`historial/indice.ts con ${meses.length} foto(s): ${meses.join(", ")}`);
}

if (process.argv[1] && path.resolve(process.argv[1]).endsWith(path.join("rankings", "foto_mensual.ts"))) main();
