// Corre los detectores de Bután contra los sitios reales: TSX_DISABLE_CACHE=1 npx tsx scripts/paises/bt/probar_detectores.ts
import type { Http } from "@/motor/tipos";
import { detectores } from "../../../src/paises/bt/fuentes";

const http = {
  async texto(url: string) {
    const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.text();
  },
} as unknown as Http;

async function main() {
  for (const d of detectores) {
    const r = await d.traer(http);
    console.log(d.id, r === null ? "NULL (la página cambió de forma)" : `${r.length} hallazgos`, JSON.stringify(r));
  }
}

void main();
