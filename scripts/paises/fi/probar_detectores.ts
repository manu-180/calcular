// Corre los detectores de fi contra la red real y muestra qué devuelven, sin escribir nada.
//   npx tsx scripts/paises/fi/probar_detectores.ts
import { detectores } from "../../../src/paises/fi/fuentes";
import type { Http, OpcionesHttp } from "../../../src/motor/tipos";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";

function cabeceras(o?: OpcionesHttp): Record<string, string> {
  return { ...(o?.userAgentNavegador ? { "User-Agent": UA } : {}), ...(o?.encabezados ?? {}) };
}

const http: Http = {
  async json(url, o) {
    const r = await fetch(url, { headers: { Accept: "application/json", ...cabeceras(o) } });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  },
  async texto(url, o) {
    const r = await fetch(url, { headers: cabeceras(o) });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.text();
  },
  async postJson(url, cuerpo, o) {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", ...cabeceras(o) }, body: JSON.stringify(cuerpo) });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.json();
  },
};

async function main() {
  for (const d of detectores) {
    try {
      const r = await d.traer(http);
      if (r === null) console.log(`❌ ${d.id}: null (forma inesperada)`);
      else if (d.carril === "serie") {
        const p = r as readonly { fecha: string; valor: number }[];
        console.log(`✅ ${d.id}: ${p.length} puntos, último ${p.at(-1)?.fecha} = ${p.at(-1)?.valor}`);
      } else console.log(`✅ ${d.id}: ${r.length} hallazgos${r.length ? ` (${(r as readonly { titulo: string }[]).map((h) => h.titulo).join(" | ")})` : ""}`);
    } catch (e) {
      console.log(`❌ ${d.id}: ${(e as Error).message}`);
    }
  }
}

void main();
