// Detector diario de oportunidades: corre las mismas reglas que las tarjetas de /dashboard sobre los
// últimos 30 días de Argentina y deja la mejor en .oportunidad-actual.json para el agente.
// Lo corre .github/workflows/oportunidades.yml; a mano: envkit run -- npx tsx scripts/medicion/oportunidades.ts
// El repo es público: el log dice sólo la familia, nunca el contenido de la oportunidad.

import "../sin-server-only";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { aOportunidad, elegir, type Oportunidad, type Registro } from "../../src/lib/medicion/oportunidades";
import { cargarPanel } from "../../src/lib/panel/datos";
import { candidatas } from "../../src/lib/panel/lecturas";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function salida(hay: boolean) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `hay=${hay}\n`);
}

async function main() {
  const datos = await cargarPanel("30d", "ar");
  if (datos.sinDatos) {
    console.log("Sin datos en el período: no se elige nada.");
    salida(false);
    return;
  }

  const registro = JSON.parse(readFileSync(path.join(raiz, "docs/medicion/oportunidades.json"), "utf8")) as Registro;
  const oportunidades = candidatas(datos)
    .map(aOportunidad)
    .filter((o): o is Oportunidad => o !== null);
  const elegida = elegir(oportunidades, registro, new Date());

  console.log(`${oportunidades.length} oportunidades accionables; elegida: ${elegida?.familia ?? "ninguna"}`);
  if (elegida) writeFileSync(path.join(raiz, ".oportunidad-actual.json"), `${JSON.stringify(elegida, null, 2)}\n`);
  salida(elegida !== null);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  });
