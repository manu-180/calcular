// Corre los detectores de Georgia contra las fuentes reales y muestra lo que devuelven.
// Uso: TSX_DISABLE_CACHE=1 npx tsx scripts/paises/ge/probar_detectores.ts
import { detectores } from "@/paises/ge/fuentes";
import type { Http } from "@/motor/tipos";

const http: Http = {
  async json(url, op) {
    return (await fetch(url, { headers: { ...op?.encabezados } })).json();
  },
  async texto(url, op) {
    return (await fetch(url, { headers: { ...op?.encabezados } })).text();
  },
};

async function main(): Promise<void> {
  for (const d of detectores) {
    try {
      const r = await d.traer(http);
      if (r === null) console.log(`${d.id}: null`);
      else console.log(`${d.id}: ${JSON.stringify(r).slice(0, 200)}`);
    } catch (err) {
      console.log(`${d.id}: error ${String(err)}`);
    }
  }
}

void main();
