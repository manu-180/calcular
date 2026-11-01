// Prueba a mano de los detectores de Egipto contra las fuentes reales:
//   npx tsx scripts/paises/eg/probar_detectores.ts
import { detectores } from "../../../src/paises/eg/fuentes";
import { crearHttpReal } from "../../datos-paises/lib/http";

async function main() {
  const http = crearHttpReal(120_000);
  for (const d of detectores) {
    try {
      const r = await d.traer(http);
      if (r === null) console.log(`⚠️  ${d.id}: null (forma inesperada o fuente caída)`);
      else if (d.carril === "serie") console.log(`✅ ${d.id}: ${r.length} puntos, último ${JSON.stringify(r.at(-1))}`);
      else console.log(`✅ ${d.id}: ${r.length} hallazgos ${JSON.stringify(r.slice(0, 3))}`);
    } catch (err) {
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
}

main();
