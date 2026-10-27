// Corre los detectores de Ruanda contra las fuentes reales y muestra qué devuelve cada uno.
// Uso: npx tsx scripts/paises/rw/probar_detectores.ts
import { detectores } from "../../../src/paises/rw/fuentes";
import type { Http } from "../../../src/motor/tipos";
import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";

async function main() {
  const base = crearHttpReal();
  for (const d of detectores) {
    const registro: LlamadaHttp[] = [];
    try {
      const r = (await (d as { traer(http: Http): Promise<readonly unknown[] | null> }).traer(httpParaDetector(base, d, registro))) as readonly unknown[] | null;
      if (r === null) console.log(`✗ ${d.id}: null (fuente caída o cambiada)`);
      else if (d.carril === "serie") {
        const puntos = r as readonly { fecha: string; valor: number }[];
        console.log(`✓ ${d.id}: ${puntos.length} puntos, último ${JSON.stringify(puntos.at(-1))}`);
      } else console.log(`✓ ${d.id}: ${r.length} hallazgos ${r.length ? JSON.stringify(r) : ""}`);
    } catch (e) {
      console.log(`✗ ${d.id}: ${(e as Error).message}`);
    }
  }
}

main();
