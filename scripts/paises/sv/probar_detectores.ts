// Corre los detectores de El Salvador contra la red real e imprime los hallazgos de cada uno.
// Uso: npx tsx scripts/paises/sv/probar_detectores.ts
import https from "node:https";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { Http, OpcionesHttp, PuntoSerie, Serie } from "../../../src/motor/tipos";
import { fechaEnZona } from "../../../src/motor/vigencia";
import { detectores, parsearFeedMh } from "../../../src/paises/sv/fuentes";
import series from "../../../src/paises/sv/series.json";

const hoy = fechaEnZona(new Date(), "America/El_Salvador");

const NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

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
  let fallas = 0;
  for (const d of detectores) {
    const t0 = Date.now();
    try {
      const r = await d.traer(http);
      const ms = Date.now() - t0;
      if (r === null) {
        fallas++;
        console.log(`❌ ${d.id}: devolvió null (${ms} ms)`);
        continue;
      }
      if (d.carril === "serie") {
        const serie = series.series.find((s) => s.id === d.serie)!;
        const puntos = r as PuntoSerie[];
        const rev = revisarPuntos(serie as unknown as Serie, puntos.filter((p) => p.fecha > serie.puntos[serie.puntos.length - 1][0]), d.banda, hoy);
        const iguales = puntos.filter((p) => serie.puntos.some(([f, v]) => f === p.fecha && v === p.valor)).length;
        console.log(`✅ ${d.id}: ${puntos.length} puntos (${puntos[0]?.fecha} a ${puntos[puntos.length - 1]?.fecha}, último ${puntos[puntos.length - 1]?.valor}); ${iguales} iguales a series.json; ${rev.aceptados.length} nuevos, ${rev.rechazos.length} rechazos (${ms} ms)`);
        for (const x of rev.rechazos) console.log(`   rechazo: ${x}`);
        continue;
      }
      const h = r as { titulo: string; url: string; fecha: string }[];
      console.log(`✅ ${d.id}: ${h.length} hallazgos (${ms} ms)`);
      for (const x of h.slice(0, 8)) console.log(`   ${x.fecha} ${x.titulo.slice(0, 130)} ${x.url}`);
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
  // El feed general de Hacienda trae solo las 10 entradas más nuevas. La búsqueda «retención» del mismo
  // feed sirve para comprobar que el filtro atrapa las notas de renta cuando aparecen.
  const muestra = parsearFeedMh(await texto("https://www.mh.gob.sv/?s=retenci%C3%B3n&feed=rss2"));
  console.log(`${muestra && muestra.length > 0 ? "✅" : "❌"} muestra del feed de Hacienda (búsqueda «retención»): ${muestra?.length ?? "null"} hallazgos`);
  for (const x of (muestra ?? []).slice(0, 3)) console.log(`   ${x.fecha} ${x.titulo.slice(0, 130)}`);
  if (!muestra || muestra.length === 0) fallas++;
  if (fallas > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
