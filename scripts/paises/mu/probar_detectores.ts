// Prueba a mano los detectores de Mauricio contra las fuentes reales, sin escribir nada:
//   npx tsx scripts/paises/mu/probar_detectores.ts
import { crearHttpReal } from "../../datos-paises/lib/http";
import { detectores } from "../../../src/paises/mu/fuentes";

async function main() {
  const http = crearHttpReal();
  for (const d of detectores) {
    try {
      const r = await d.traer(http);
      if (r === null) console.log(`NULL  ${d.id}`);
      else if (d.carril === "serie") {
        const puntos = r as readonly { fecha: string; valor: number }[];
        console.log(`OK    ${d.id}: ${puntos.length} puntos, último ${JSON.stringify(puntos.at(-1))}`);
      } else console.log(`OK    ${d.id}: ${JSON.stringify(r)}`);
    } catch (err) {
      console.log(`ERROR ${d.id}: ${(err as Error).message}`);
    }
  }
}

main();
