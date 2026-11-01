// Corre los detectores de China contra las fuentes reales y muestra lo que devuelve cada uno.
//   npx tsx scripts/paises/cn/probar-detectores.ts
import { crearHttpReal, httpParaDetector } from "../../datos-paises/lib/http";
import { detectores } from "../../../src/paises/cn/fuentes";

async function main() {
  const base = crearHttpReal();
  for (const d of detectores) {
    try {
      const r = await d.traer(httpParaDetector(base, d, []));
      console.log(`${d.id}: ${JSON.stringify(r)?.slice(0, 300)}`);
    } catch (e) {
      console.log(`${d.id}: ERROR ${(e as Error).message}`);
    }
  }
}

void main();
