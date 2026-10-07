// Corre los detectores de Ecuador contra la red real e imprime los hallazgos de cada uno.
// Uso: npx tsx scripts/paises/ec/probar_detectores.ts [--muestra]
import type { Http, OpcionesHttp } from "../../../src/motor/tipos";
import { detectores, parsearFeedRo } from "../../../src/paises/ec/fuentes";

const NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

async function pedir(url: string, o?: OpcionesHttp): Promise<Response> {
  const r = await fetch(url, { headers: { ...(o?.userAgentNavegador ? { "user-agent": NAVEGADOR } : {}), ...(o?.encabezados ?? {}) } });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r;
}

const http: Http = {
  json: async (url, o) => (await pedir(url, o)).json(),
  texto: async (url, o) => (await pedir(url, o)).text(),
};

// Ítem real del feed (Suplemento 187, 18/12/2025, el del SBU 2026) para comprobar que el filtro lo atrapa.
const MUESTRA_RO = `<rss><channel><item><title>Suplemento No. 187</title><link>https://www.registroficial.gob.ec/suplemento-no-187/</link><pubDate>Thu, 18 Dec 2025 15:00:00 +0000</pubDate><content:encoded><![CDATA[<p>DECRETOS:<br>PRESIDENCIA DE LA REPÚBLICA:<br>247 Se designa al señor Byron Washington Borja Carrera como Gobernador de la provincia del Carchi.<br>ACUERDO:<br>MINISTERIO DEL TRABAJO:<br>MDT-2025-195 Se fija el salario básico unificado del trabajador en general para el año 2026</p>]]></content:encoded></item></channel></rss>`;

async function main() {
  if (process.argv.includes("--muestra")) {
    console.log(JSON.stringify(parsearFeedRo(MUESTRA_RO), null, 2));
    return;
  }
  for (const d of detectores) {
    const t0 = Date.now();
    try {
      const r = await d.traer(http);
      const ms = Date.now() - t0;
      if (r === null) {
        console.log(`❌ ${d.id}: devolvió null (${ms} ms)`);
        continue;
      }
      const h = r as { titulo: string; url: string; fecha: string }[];
      console.log(`✅ ${d.id}: ${h.length} hallazgos (${ms} ms)`);
      for (const x of h.slice(0, 5)) console.log(`   ${x.fecha} ${x.titulo.slice(0, 140)} ${x.url}`);
    } catch (err) {
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
