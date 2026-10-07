// Corre los detectores de Perú contra la red real y muestra lo que devuelven, sin escribir nada.
// Uso: npx tsx scripts/paises/pe/probar_detectores.ts [id-del-detector]
import { detectores } from "../../../src/paises/pe/fuentes";
import type { Http, OpcionesHttp } from "../../../src/motor/tipos";

const UA_NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

async function pedir(url: string, opciones?: OpcionesHttp): Promise<Response> {
  const r = await fetch(url, {
    headers: { ...(opciones?.userAgentNavegador ? { "User-Agent": UA_NAVEGADOR, "Accept-Language": "es-PE,es;q=0.9" } : {}), ...opciones?.encabezados },
    signal: AbortSignal.timeout(180_000),
  });
  if (!r.ok) throw new Error(`${url} respondió ${r.status}`);
  return r;
}

const http: Http = {
  async json(url, opciones) {
    return (await pedir(url, opciones)).json();
  },
  async texto(url, opciones) {
    return (await pedir(url, opciones)).text();
  },
};

async function main() {
  const filtro = process.argv[2];
  let fallas = 0;
  for (const d of detectores) {
    if (filtro && d.id !== filtro) continue;
    const t0 = Date.now();
    try {
      const r = await d.traer(http);
      const ms = Date.now() - t0;
      if (r === null) {
        fallas++;
        console.log(`❌ ${d.id}: devolvió null (${ms} ms)`);
      } else if (d.carril === "serie") {
        const fuera = (r as { fecha: string; valor: number }[]).filter((p) => p.valor < d.banda.min || p.valor > d.banda.max);
        const ultimos = (r as { fecha: string; valor: number }[]).slice(-3).map((p) => `${p.fecha}=${p.valor}`).join(", ");
        console.log(`${fuera.length ? "❌" : "✅"} ${d.id}: ${r.length} puntos, últimos ${ultimos}${fuera.length ? `, ${fuera.length} fuera de banda` : ""} (${ms} ms)`);
        if (fuera.length) fallas++;
      } else {
        console.log(`✅ ${d.id}: ${r.length} hallazgos (${ms} ms)`);
        for (const h of r as { titulo: string; url: string; fecha: string }[]) console.log(`   ${h.fecha} ${h.titulo.slice(0, 90)} ${h.url}`);
      }
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
  process.exit(fallas ? 1 : 0);
}

main();
