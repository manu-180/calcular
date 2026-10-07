// Corre los detectores de Paraguay contra la red real y revisa los puntos con las bandas del motor.
// No escribe nada. Pide con los mismos encabezados que el Http del cron (User-Agent de navegador si
// el detector lo pide, Accept amplio), porque el BCP rechaza clientes que no parecen un navegador.
// Uso: npx tsx scripts/paises/py/probar_detectores.ts [id-del-detector]
import https from "node:https";
import zlib from "node:zlib";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { Http, OpcionesHttp, PaisDefinido, PuntoSerie } from "../../../src/motor/tipos";
import { hoyEn } from "../../../src/motor/vigencia";

const UA_NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
const UA_PROPIO = "CalcularYa/datos-paises (+https://calcularya.com)";

function pedir(url: string, o: OpcionesHttp = {}, saltos = 5): Promise<string> {
  return new Promise((resolver, rechazar) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": o.userAgentNavegador ? UA_NAVEGADOR : UA_PROPIO,
          Accept: "application/json, text/html, application/xml, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "es-419,es;q=0.9",
          ...(o.encabezados ?? {}),
        },
        timeout: 30_000,
        rejectUnauthorized: !o.tlsTolerante,
      },
      (r) => {
        const status = r.statusCode ?? 0;
        if (status >= 300 && status < 400 && r.headers.location && saltos > 0) {
          r.resume();
          pedir(new URL(r.headers.location, url).toString(), o, saltos - 1).then(resolver, rechazar);
          return;
        }
        if (status < 200 || status >= 300) {
          r.resume();
          rechazar(new Error(`${url}: HTTP ${status}`));
          return;
        }
        const partes: Buffer[] = [];
        r.on("data", (c: Buffer) => partes.push(c));
        r.on("end", () => {
          const crudo = Buffer.concat(partes);
          const cod = String(r.headers["content-encoding"] ?? "");
          const buf = cod.includes("gzip") ? zlib.gunzipSync(crudo) : cod.includes("br") ? zlib.brotliDecompressSync(crudo) : cod.includes("deflate") ? zlib.inflateSync(crudo) : crudo;
          resolver(buf.toString("utf8"));
        });
        r.on("error", rechazar);
      },
    );
    req.on("timeout", () => req.destroy(new Error(`${url}: timeout`)));
    req.on("error", rechazar);
  });
}

const http: Http = {
  texto: (url, o) => pedir(url, o),
  json: async (url, o) => JSON.parse(await pedir(url, o)) as unknown,
};

async function main() {
  const filtro = process.argv[2];
  const pais = (await import("../../../src/paises/py")).default as unknown as PaisDefinido;
  const hoy = hoyEn(pais.mercado);
  let fallas = 0;
  for (const d of pais.detectores) {
    if (filtro && d.id !== filtro) continue;
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
        const puntos = r as PuntoSerie[];
        const serie = pais.series.find((s) => s.id === d.serie);
        const rev = revisarPuntos(serie ?? { id: d.serie, puntos: [] }, puntos as never, d.banda, hoy);
        console.log(`✅ ${d.id}: ${puntos.map((p) => `${p.fecha}=${p.valor}`).join(", ")}; ${rev.aceptados.length} nuevos, ${rev.rechazos.length} rechazos (${ms} ms)`);
        for (const x of rev.rechazos) console.log(`   rechazo: ${x}`);
      } else {
        const h = r as { titulo: string; url: string; fecha: string }[];
        console.log(`✅ ${d.id}: ${h.length} hallazgos (${ms} ms)`);
        for (const x of h.slice(0, 8)) console.log(`   ${x.fecha} ${x.titulo.slice(0, 110)} ${x.url}`);
      }
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
  process.exit(fallas ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
