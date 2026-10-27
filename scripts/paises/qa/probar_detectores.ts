import { crearHttpReal, httpParaDetector } from "../../datos-paises/lib/http";
import { detectores } from "../../../src/paises/qa/fuentes";

async function main() {
  for (const d of detectores) {
    try {
      const http = httpParaDetector(crearHttpReal(120_000), d, []);
      const r = await d.traer(http);
      if (r === null) console.log(d.id, "-> null");
      else if (d.carril === "serie") console.log(d.id, "->", r.length, "puntos, últimos", JSON.stringify(r.slice(-3)));
      else console.log(d.id, "->", JSON.stringify(r));
    } catch (e) {
      console.log(d.id, "ERROR", (e as Error).message);
    }
  }
}

void main();
