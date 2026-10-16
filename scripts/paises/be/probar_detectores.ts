// Draait de detectoren van België tegen de echte bronnen, met dezelfde HTTP-client als de cron, en
// toont wat ze teruggeven. Schrijft niets weg.
// Gebruik: npx tsx scripts/paises/be/probar_detectores.ts
import { detectores } from "../../../src/paises/be/fuentes";
import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";

async function main() {
  const base = crearHttpReal();
  for (const d of detectores) {
    const registro: LlamadaHttp[] = [];
    try {
      const r = await d.traer(httpParaDetector(base, d, registro));
      const samenvatting = r === null ? "null (onverwachte vorm)" : d.carril === "serie" ? JSON.stringify(r.slice(-3)) : JSON.stringify(r.slice(0, 3));
      console.log(`${d.id}: ${Array.isArray(r) ? r.length : 0} → ${samenvatting}`);
    } catch (e) {
      console.log(`${d.id}: FOUT ${(e as Error).message}`);
    }
  }
}

void main();
