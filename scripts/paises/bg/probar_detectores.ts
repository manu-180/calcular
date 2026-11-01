// Corre los detectores de Bulgaria contra las fuentes reales y muestra lo que devuelven.
// Uso: npx tsx scripts/paises/bg/probar_detectores.ts
import { detectores } from "@/paises/bg/fuentes";
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
      } else console.log(`${d.id}: ${JSON.stringify(r)}`);
    } catch (err) {
      console.log(`${d.id}: error ${String(err)}`);
    }
  }
}

void main();
