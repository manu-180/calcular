// Corre los detectores de Armenia contra las fuentes reales: TSX_DISABLE_CACHE=1 npx tsx scripts/paises/am/probar_detectores.ts
import { detectores } from "../../../src/paises/am/fuentes";
import type { Http } from "../../../src/motor/tipos";

const http: Http = {
  async json(url) {
    return (await fetch(url)).json();
  },
  async texto(url) {
    const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 Chrome/120" } });
    if (!r.ok) throw new Error(`${url}: ${r.status}`);
    return r.text();
  },
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function main() {
  for (const d of detectores) {
    try {
      const salida = await d.traer(http);
      if (d.carril === "serie") {
        const ultimo = salida && salida[salida.length - 1];
        console.log(d.id, salida ? `${salida.length} puntos, ultimo ${JSON.stringify(ultimo)}` : "null");
      } else {
        console.log(d.id, salida === null ? "null" : `${salida.length} hallazgos`);
      }
    } catch (e) {
      console.log(d.id, "ERROR", (e as Error).message);
    }
  }
}

void main();
