// Corre los detectores de lv contra la red real y muestra qué devuelven, sin escribir nada.
//   TSX_DISABLE_CACHE=1 npx tsx scripts/paises/lv/probar_detectores.ts
import { detectores } from "../../../src/paises/lv/fuentes";
import type { Http } from "../../../src/motor/tipos";

const http: Http = {
  async json(url) {
    const r = await fetch(url, { headers: { Accept: "application/json" } });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  },
  async texto(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.text();
  },
  async postJson(url, cuerpo) {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  },
};

async function main() {
  for (const d of detectores) {
    try {
      const r = await d.traer(http);
      if (r === null) console.log(`null ${d.id}: forma inesperada`);
      else console.log(`ok ${d.id}: ${r.length} resultados, último ${JSON.stringify(r.at(-1) ?? null)}`);
    } catch (e) {
      console.log(`error ${d.id}: ${String(e)}`);
    }
  }
}

void main();
