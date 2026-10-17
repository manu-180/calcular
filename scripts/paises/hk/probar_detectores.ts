// Corre los detectores de Hong Kong contra las fuentes reales, con el mismo cliente HTTP del cron, y
// muestra lo que devuelven. No escribe nada.
// Uso: npx tsx scripts/paises/hk/probar_detectores.ts
import { detectores } from "../../../src/paises/hk/fuentes";
import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";

async function main() {
  const base = crearHttpReal();
  for (const d of detectores) {
    const registro: LlamadaHttp[] = [];
    try {
      const r = await d.traer(httpParaDetector(base, d, registro));
      const resumen = r === null ? "null (forma inesperada)" : d.carril === "serie" ? JSON.stringify(r.slice(-3)) : JSON.stringify(r.slice(0, 3));
      console.log(`${d.id}: ${Array.isArray(r) ? r.length : 0} → ${resumen}`);
    } catch (e) {
      console.log(`${d.id}: ERROR ${(e as Error).message}`);
    }
  }
}

void main();
