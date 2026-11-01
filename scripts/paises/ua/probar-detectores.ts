// Corre los detectores de ua contra las fuentes reales y muestra qué devuelven.
// Uso: npx tsx scripts/paises/ua/probar-detectores.ts
import { detectores } from "../../../src/paises/ua/fuentes";
import type { Http } from "../../../src/motor/tipos";

const http: Http = {
  async json(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  },
  async texto(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.text();
  },
};

async function main() {
for (const d of detectores) {
  try {
    const res = await d.traer(http);
    if (res === null) console.log(`❌ ${d.id}: null (forma inesperada)`);
    else if (d.carril === "serie") {
      const p = res as readonly { fecha: string; valor: number }[];
      console.log(`✅ ${d.id}: ${p.length} puntos, último ${p[p.length - 1]?.fecha} = ${p[p.length - 1]?.valor}`);
    } else console.log(`✅ ${d.id}: ${res.length} hallazgos`);
  } catch (e) {
    console.log(`⚠️  ${d.id}: ${(e as Error).message}`);
  }
}
}

void main();
