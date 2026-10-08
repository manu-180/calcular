// Corre los detectores de Panamá contra la red real y muestra lo que traen. Para cada detector de
// normas hace además una corrida de control con la fecha de corte en diciembre de 2025: tiene que
// encontrar el Decreto Ejecutivo 13 de 2025, así se sabe que el filtro no está vacío por error.
// Uso: npx tsx scripts/paises/pa/probar_fuentes.ts
import https from "node:https";
import type { Http, OpcionesHttp } from "../../../src/motor/tipos";
import { detectores } from "../../../src/paises/pa/fuentes";

const UA_NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";

function pedir(url: string, opciones: OpcionesHttp = {}, saltos = 0): Promise<string> {
  return new Promise((resolver, rechazar) => {
    const req = https.get(
      url,
      {
        rejectUnauthorized: !opciones.tlsTolerante,
        headers: { "user-agent": opciones.userAgentNavegador ? UA_NAVEGADOR : "calcularya-detector", ...opciones.encabezados },
        timeout: 90_000,
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
      if (d.carril !== "norma") continue;
      const hallazgos = await d.traer(http);
      if (hallazgos === null) throw new Error("la fuente respondió con una forma inesperada (null)");
      console.log(`✅ ${d.id}: ${hallazgos.length} hallazgos${hallazgos.length ? `: ${hallazgos.map((h) => h.titulo).join(" | ")}` : ""}`);

      const control = { ...d, url: d.url.replace(/after=[^&]+/, "after=2025-12-01T00:00:00") as typeof d.url };
      const viejos = await control.traer(http);
      if (!viejos?.some((h) => /13/.test(h.titulo) && /2025/.test(h.titulo))) throw new Error("el control no encontró el Decreto Ejecutivo 13 de 2025");
      console.log(`✅ ${d.id} (control desde 1/12/2025): ${viejos.map((h) => `${h.fecha} ${h.titulo}`).join(" | ")}`);
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
  process.exit(fallas ? 1 : 0);
}

main();
