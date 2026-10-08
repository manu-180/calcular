// Corre los detectores de Uruguay contra la red real y revisa los puntos con las bandas del motor.
// Uso: npx tsx scripts/paises/uy/probar_detectores.ts [--solo <id>]
import https from "node:https";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { Http, OpcionesHttp, PaisDefinido } from "../../../src/motor/tipos";
import { fechaEnZona } from "../../../src/motor/vigencia";
import { detectores } from "../../../src/paises/uy/fuentes";

const NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
let pedidos = 0;

function encabezados(o?: OpcionesHttp): Record<string, string> {
  return { ...(o?.userAgentNavegador ? { "user-agent": NAVEGADOR } : {}), ...(o?.encabezados ?? {}) };
}

// fetch de Node no deja aflojar la verificación TLS por pedido; para tlsTolerante se usa https.
function textoTolerante(url: string, o?: OpcionesHttp): Promise<string> {
  return new Promise((resolver, rechazar) => {
    https
      .get(url, { headers: encabezados(o), rejectUnauthorized: false }, (r) => {
        if ((r.statusCode ?? 0) >= 400) return rechazar(new Error(`${url}: HTTP ${r.statusCode}`));
        const partes: Buffer[] = [];
        r.on("data", (c: Buffer) => partes.push(c));
        r.on("end", () => resolver(Buffer.concat(partes).toString("utf8")));
      })
      .on("error", rechazar);
  });
}

async function texto(url: string, o?: OpcionesHttp): Promise<string> {
  pedidos++;
  if (o?.tlsTolerante) return textoTolerante(url, o);
  const r = await fetch(url, { headers: encabezados(o) });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r.text();
}

const http: Http = {
  json: async (url, o) => JSON.parse(await texto(url, o)),
  texto,
};

async function main() {
  const i = process.argv.indexOf("--solo");
  const solo = i > 0 ? process.argv[i + 1] : null;
  const hoy = fechaEnZona(new Date(), "America/Montevideo");
  const pais = (await import("../../../src/paises/uy")).default as unknown as PaisDefinido;
  for (const d of detectores) {
    if (solo && d.id !== solo) continue;
    const t0 = Date.now();
    const antes = pedidos;
    try {
      const r = await d.traer(http);
      const ms = Date.now() - t0;
      if (r === null) {
        console.log(`❌ ${d.id}: devolvió null (${ms} ms, ${pedidos - antes} pedidos)`);
        continue;
      }
      if (d.carril === "serie") {
        const serie = pais.series.find((s) => s.id === d.serie);
        const puntos = r as { fecha: string; valor: number }[];
        const rev = revisarPuntos(serie ?? { id: d.serie, puntos: [] }, puntos as never, d.banda, hoy);
        console.log(`✅ ${d.id}: ${puntos.length} puntos (${puntos[0]?.fecha} ${puntos[0]?.valor} a ${puntos[puntos.length - 1]?.fecha} ${puntos[puntos.length - 1]?.valor}), ${rev.aceptados.length} nuevos, ${rev.rechazos.length} rechazos (${ms} ms)`);
        for (const x of rev.rechazos) console.log(`   rechazo: ${x}`);
      } else {
        const h = r as { titulo: string; url: string; fecha: string }[];
        console.log(`✅ ${d.id}: ${h.length} hallazgos (${ms} ms, ${pedidos - antes} pedidos)`);
        for (const x of h.slice(0, 8)) console.log(`   ${x.fecha} ${x.titulo.slice(0, 110)} ${x.url}`);
      }
    } catch (err) {
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
