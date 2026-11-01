// Corre los detectores de me contra las fuentes reales e imprime lo que traen.
// Uso: TSX_DISABLE_CACHE=1 npx tsx scripts/paises/me/probar_detectores.ts
import type { Http } from "../../../src/motor/tipos";
import { detectores } from "../../../src/paises/me/fuentes";

const http: Http = {
  async json(url) {
    const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  },
  async texto(url) {
    const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.text();
  },
};

async function main() {
  for (const d of detectores) {
    try {
      const r = await d.traer(http);
      if (r === null) console.log(`${d.id}: null`);
      else if (d.carril === "serie") console.log(`${d.id}: ${r.length} puntos, último ${JSON.stringify(r[r.length - 1])}`);
      else console.log(`${d.id}: ${r.length} hallazgos ${JSON.stringify(r)}`);
    } catch (e) {
      console.log(`${d.id}: ERROR ${String(e)}`);
    }
  }
}

void main();
