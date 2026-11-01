// Corre los detectores de Albania contra las fuentes reales y muestra lo que devuelven.
// Uso: TSX_DISABLE_CACHE=1 npx tsx scripts/paises/al/probar_detectores.ts
import { detectores } from "@/paises/al/fuentes";
import type { Http } from "@/motor/tipos";

const http: Http = {
  async json(url) {
    return (await fetch(url)).json();
  },
  async texto(url) {
    return (await fetch(url)).text();
  },
};

async function main(): Promise<void> {
  for (const d of detectores) {
    try {
      const r = await d.traer(http);
      if (r === null) console.log(`${d.id}: null`);
      else if (d.carril === "serie") {
        const p = r as readonly { fecha: string; valor: number }[];
        console.log(`${d.id}: ${p.length} puntos, últimos ${JSON.stringify(p.slice(-2))}`);
      } else {
        const h = r as readonly { titulo: string; fecha: string }[];
        console.log(`${d.id}: ${h.length} hallazgos, últimos ${JSON.stringify(h.slice(0, 2))}`);
      }
    } catch (err) {
      console.log(`${d.id}: error ${String(err)}`);
    }
  }
}

void main();
