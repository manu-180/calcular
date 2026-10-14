// Corre los detectores de Brasil contra las fuentes reales y muestra qué devuelven. No escribe nada.
// Uso: npx tsx scripts/paises/br/probar_detectores.ts
import { detectores } from "../../../src/paises/br/fuentes";
import type { Http, OpcionesHttp } from "../../../src/motor/tipos";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

function cabeceras(o?: OpcionesHttp, json = false): Record<string, string> {
  return { ...(o?.userAgentNavegador ? { "User-Agent": UA } : {}), ...(json ? { Accept: "application/json" } : {}), ...(o?.encabezados ?? {}) };
}

const http: Http = {
  async json(url, o) {
    const r = await fetch(url, { headers: cabeceras(o, true) });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  },
  async texto(url, o) {
    const r = await fetch(url, { headers: cabeceras(o) });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.text();
  },
};

async function main() {
  for (const d of detectores) {
    try {
      const r = await d.traer(http);
      const resumo = r === null ? "null (forma inesperada)" : d.carril === "serie" ? JSON.stringify(r.slice(-3)) : JSON.stringify(r);
      console.log(`${d.id}: ${Array.isArray(r) ? r.length : 0} → ${resumo}`);
    } catch (e) {
      console.log(`${d.id}: ERROR ${(e as Error).message}`);
    }
  }
}

void main();
