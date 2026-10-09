// Corre los detectores de Honduras contra la red real y revisa las series contra sus bandas.
// Uso: npx tsx scripts/paises/hn/probar_detectores.ts
import https from "node:https";
import zlib from "node:zlib";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { HallazgoNorma, Http, OpcionesHttp, PuntoSerie, Serie } from "../../../src/motor/tipos";
import { hoyEn } from "../../../src/motor/vigencia";
import { detectores } from "../../../src/paises/hn/fuentes";
import series from "../../../src/paises/hn/series.json";

const UA_NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";
const UA_PROPIO = "CalcularYa/datos-paises (+https://calcularya.com)";

function pedir(url: string, opciones: OpcionesHttp = {}, saltos = 5): Promise<string> {
  return new Promise((resolver, rechazar) => {
    const req = https.get(
      url,
      {
        rejectUnauthorized: !opciones.tlsTolerante,
        headers: {
          "user-agent": opciones.userAgentNavegador ? UA_NAVEGADOR : UA_PROPIO,
          accept: "application/json, text/html, application/xml, text/plain, */*",
          "accept-encoding": "gzip, deflate",
          ...opciones.encabezados,
        },
        timeout: 60_000,
      },
      (res) => {
        const status = res.statusCode ?? 0;
        if (status >= 300 && status < 400 && res.headers.location && saltos > 0) {
          res.resume();
          pedir(new URL(res.headers.location, url).toString(), opciones, saltos - 1).then(resolver, rechazar);
          return;
        }
        if (status < 200 || status >= 300) {
          res.resume();
          rechazar(new Error(`HTTP ${status}`));
          return;
        }
        const partes: Buffer[] = [];
        res.on("data", (c: Buffer) => partes.push(c));
        res.on("end", () => {
          const crudo = Buffer.concat(partes);
          const cod = String(res.headers["content-encoding"] ?? "");
          const buf = cod.includes("gzip") ? zlib.gunzipSync(crudo) : cod.includes("deflate") ? zlib.inflateSync(crudo) : crudo;
          resolver(buf.toString("utf8"));
        });
        res.on("error", rechazar);
      },
    );
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", rechazar);
  });
}

const http: Http = {
  texto: (url, o) => pedir(url, o),
  async json(url, o = {}) {
    return JSON.parse(await pedir(url, { ...o, encabezados: { accept: "application/json", ...o.encabezados } }));
  },
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
        const puntos = r as readonly PuntoSerie[];
        const serie = (series.series as unknown as Serie[]).find((s) => s.id === d.serie);
        if (!serie) throw new Error(`falta la serie ${d.serie}`);
        // Como el cron: solo se revisan contra la banda los puntos posteriores al último publicado;
        // los anteriores se comparan con series.json.
        const ultima = serie.puntos[serie.puntos.length - 1][0];
        const distintos = puntos.filter((p) => p.fecha <= ultima && serie.puntos.some(([f, v]) => f === p.fecha && Math.abs(v - p.valor) > 1e-9));
        if (distintos.length) console.log(`   ojo: ${distintos.length} punto(s) ya publicados difieren: ${distintos.slice(0, 3).map((p) => `${p.fecha} = ${p.valor}`).join(", ")}`);
        const { aceptados, rechazos } = revisarPuntos(serie, puntos.filter((p) => p.fecha > ultima), d.banda, hoyEn({ zonaHoraria: "America/Tegucigalpa" }));
        if (rechazos.length) fallas++;
        console.log(
          `${rechazos.length ? "❌" : "✅"} ${d.id}: ${puntos.slice(-5).map((p) => `${p.fecha} = ${p.valor}`).join(", ")}; ${aceptados.length} nuevos${rechazos.length ? `; ${rechazos.join("; ")}` : ""} (${ms} ms)`,
        );
      } else {
        const hs = r as readonly HallazgoNorma[];
        console.log(`✅ ${d.id}: ${hs.length} hallazgos${hs.length ? `: ${hs.map((h) => `${h.fecha} ${h.titulo}`).join(" | ")}` : ""} (${ms} ms)`);
      }
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
  console.log(fallas ? `${fallas} FALLAS` : `TODO OK: ${detectores.length} detectores`);
  process.exit(fallas ? 1 : 0);
}

main();
