// Corre los detectores de Malta contra el feed real de legislation.mt y muestra qué devuelven.
//   npx tsx scripts/paises/mt/probar-detectores.ts
import type { Http } from "@/motor/tipos";
import { detectores } from "@/paises/mt/fuentes";

const http: Http = {
  async json(url) {
    return (await fetch(url)).json();
  },
  async texto(url, opciones) {
    const r = await fetch(url, { headers: opciones?.userAgentNavegador ? { "user-agent": "Mozilla/5.0" } : {} });
    return r.text();
  },
};

async function main() {
  for (const d of detectores) {
    const r = await d.traer(http);
    console.log(`${d.id}: ${r === null ? "null (fuente caída o cambiada)" : `${r.length} hallazgos`}`);
    for (const h of (r ?? []).slice(0, 3)) console.log(`   ${h.fecha} ${h.titulo.slice(0, 100)}`);
  }
}

void main();
