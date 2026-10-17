// Corre los detectores de Canadá contra la red real, sin escribir nada: muestra cuántos puntos o
// hallazgos trae cada uno y el último valor. Uso: npx tsx scripts/paises/ca/probar-detectores.ts
import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";
import { detectores } from "../../../src/paises/ca/fuentes";

async function main() {
  const base = crearHttpReal();
  for (const d of detectores) {
    const registro: LlamadaHttp[] = [];
    try {
      const r = await d.traer(httpParaDetector(base, d, registro));
      if (r === null) console.log(`${d.id}: null (forma inesperada)`);
      else console.log(`${d.id}: ${r.length} ${d.carril === "serie" ? "puntos" : "hallazgos"}; último ${JSON.stringify(r[r.length - 1] ?? null)}`);
    } catch (e) {
      console.log(`${d.id}: error ${e instanceof Error ? e.message : String(e)}`);
    }
  }
}

main();
