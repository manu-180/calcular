// Corre una calculadora de Panamá con los datos del repo a una fecha y muestra lo que devuelve, para
// recalcular a mano un caso antes de escribirlo en <slug>.casos.ts.
// Uso: npx tsx scripts/paises/pa/probar_calculadora.ts <slug> <AAAA-MM-DD> '<entrada JSON>'
import { readFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { crearContexto } from "../../../src/motor/calculo";
import { resolverValores } from "../../../src/motor/registro";
import type { ArchivoDatos, ArchivoSeries, DefinicionCalculadora, FechaISO } from "../../../src/motor/tipos";
import { mercado } from "../../../src/paises/pa/mercado";

const [slug, fecha, json] = process.argv.slice(2);
const dir = path.join(__dirname, "../../../src/paises/pa");
const datos = JSON.parse(readFileSync(path.join(dir, "datos.json"), "utf8")) as ArchivoDatos;
const series = JSON.parse(readFileSync(path.join(dir, "series.json"), "utf8")) as ArchivoSeries;

async function main() {
  const def = ((await import(pathToFileURL(path.join(dir, "calculadoras", `${slug}.ts`)).href)) as { default: DefinicionCalculadora }).default;
  const r = resolverValores({ datos: datos.datos, series: series.series }, def, fecha as FechaISO);
  if (!r.ok) throw new Error(r.motivos.join("; "));
  const contexto = crearContexto(mercado, fecha as FechaISO, def);
  console.log(def.calcular(JSON.parse(json) as never, r.valores as never, contexto));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

