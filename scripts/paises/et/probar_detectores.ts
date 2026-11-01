// Corre los detectores de Etiopía contra las fuentes reales. Uso: npx tsx scripts/paises/et/probar_detectores.ts
import { detectores } from "../../../src/paises/et/fuentes";
import type { Http } from "../../../src/motor/tipos";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";
const http: Http = {
  async json(url, op) {
    const r = await fetch(url, { headers: op?.userAgentNavegador ? { "user-agent": UA } : {} });
    return r.ok ? r.json() : null;
  },
  async texto(url, op) {
    const r = await fetch(url, { headers: op?.userAgentNavegador ? { "user-agent": UA } : {} });
    return r.ok ? r.text() : "";
  },
};

async function main() {
  for (const d of detectores) {
  try {
    const r = await d.traer(http);
    console.log(d.id, d.carril, JSON.stringify(r)?.slice(0, 300));
  } catch (e) {
    console.log(d.id, "ERROR", (e as Error).message);
  }
  }
}

void main();
