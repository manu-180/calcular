import { detectores } from "../../../src/paises/nl/fuentes";
import type { Http } from "../../../src/motor/tipos";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36";

const http: Http = {
  async json(url, opciones) {
    const r = await fetch(url, { headers: { "user-agent": UA, accept: "application/json", ...(opciones?.encabezados ?? {}) } });
    return r.json();
  },
  async texto(url, opciones) {
    const r = await fetch(url, { headers: { "user-agent": UA, ...(opciones?.encabezados ?? {}) } });
    return r.text();
  },
};

async function main() {
  for (const d of detectores) {
    const t0 = Date.now();
    try {
      const r = await d.traer(http);
      if (r === null) {
        console.log(`✘ ${d.id}: null`);
        continue;
      }
      const ultimos = r.slice(-2);
      console.log(`✔ ${d.id} (${d.carril}): ${r.length} resultados en ${Date.now() - t0} ms; últimos: ${JSON.stringify(ultimos).slice(0, 300)}`);
    } catch (e) {
      console.log(`✘ ${d.id}: ${(e as Error).message}`);
    }
  }
}

main();
