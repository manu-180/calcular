// Prueba real de los detectores de Islandia contra las fuentes: imprime qué trae cada uno.
// Uso: TSX_DISABLE_CACHE=1 npx tsx scripts/paises/is/probar_detectores.ts
import { detectores } from "../../../src/paises/is/fuentes";
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
  async postJson(url, cuerpo) {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  },
};

async function main(): Promise<void> {
  let fallas = 0;
  for (const d of detectores) {
    try {
      const salida = await d.traer(http);
      if (salida === null) {
        fallas++;
        console.log(`NULL  ${d.id}`);
      } else {
        console.log(`OK    ${d.id}: ${salida.length} ${JSON.stringify(salida[salida.length - 1] ?? null)}`);
      }
    } catch (e) {
      fallas++;
      console.log(`ERROR ${d.id}: ${String(e)}`);
    }
  }
  console.log(`${detectores.length - fallas} de ${detectores.length} detectores respondieron`);
}

void main();
