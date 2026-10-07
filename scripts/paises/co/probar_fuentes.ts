// Corre los detectores de Colombia contra la red real y muestra lo que traen.
// Uso: npx tsx scripts/paises/co/probar_fuentes.ts
import https from "node:https";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { FechaISO, Http, OpcionesHttp } from "../../../src/motor/tipos";
import pais from "../../../src/paises/co/index";
import { detectores } from "../../../src/paises/co/fuentes";

const UA_NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";

function pedir(url: string, opciones: OpcionesHttp = {}, saltos = 0): Promise<string> {
  return new Promise((resolver, rechazar) => {
    const req = https.get(
      url,
      {
        rejectUnauthorized: !opciones.tlsTolerante,
        headers: { "user-agent": opciones.userAgentNavegador ? UA_NAVEGADOR : "calcularya-detector", ...opciones.encabezados },
        timeout: 60_000,
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && saltos < 5) {
          res.resume();
          resolver(pedir(new URL(res.headers.location, url).href, opciones, saltos + 1));
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          rechazar(new Error(`HTTP ${res.statusCode} en ${url}`));
          return;
        }
        const partes: Buffer[] = [];
        res.on("data", (c: Buffer) => partes.push(c));
        res.on("end", () => resolver(Buffer.concat(partes).toString("utf8")));
      },
    );
    req.on("timeout", () => req.destroy(new Error(`tiempo agotado en ${url}`)));
    req.on("error", rechazar);
  });
}

const http: Http = {
  texto: (url, opciones) => pedir(url, opciones),
  json: async (url, opciones) => JSON.parse(await pedir(url, opciones)),
};

async function main() {
  let fallas = 0;
  for (const d of detectores) {
    try {
      if (d.carril === "serie") {
        const puntos = await d.traer(http);
        if (puntos === null) throw new Error("la fuente respondió con una forma inesperada (null)");
        const serie = pais.series.find((s) => s.id === d.serie);
        const ultimo = puntos[puntos.length - 1];
        const hoy = new Date().toISOString().slice(0, 10) as FechaISO;
        const rev = serie ? revisarPuntos(serie, puntos, d.banda, hoy) : { aceptados: [], rechazos: ["serie no encontrada"] };
        console.log(`✅ ${d.id}: ${puntos.length} puntos, último ${ultimo?.fecha} = ${ultimo?.valor}; bandas: ${rev.rechazos.length ? `RECHAZA (${rev.rechazos.join("; ")})` : `${rev.aceptados.length} puntos nuevos aceptados`}`);
      } else {
        const hallazgos = await d.traer(http);
        if (hallazgos === null) throw new Error("la fuente respondió con una forma inesperada (null)");
        console.log(`✅ ${d.id}: ${hallazgos.length} hallazgos${hallazgos.length ? `: ${hallazgos.map((h) => h.titulo).join(" | ")}` : ""}`);
      }
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
  process.exit(fallas ? 1 : 0);
}

main();
