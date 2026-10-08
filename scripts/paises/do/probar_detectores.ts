// Corre los detectores de República Dominicana contra la red real y revisa los puntos con las bandas
// del motor. Uso: npx tsx scripts/paises/do/probar_detectores.ts
import { revisarPuntos } from "../../../src/motor/bandas";
import type { Http, OpcionesHttp, PaisDefinido } from "../../../src/motor/tipos";
import { fechaEnZona } from "../../../src/motor/vigencia";
import { detectores } from "../../../src/paises/do/fuentes";

const NAVEGADOR = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const PROPIO = "CalcularYa/datos-paises (+https://calcularya.com)";

async function pedir(url: string, o?: OpcionesHttp): Promise<Response> {
  const r = await fetch(url, { headers: { "user-agent": o?.userAgentNavegador ? NAVEGADOR : PROPIO, ...(o?.encabezados ?? {}) } });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  return r;
}

const http: Http = {
  json: async (url, o) => (await pedir(url, o)).json(),
  texto: async (url, o) => (await pedir(url, o)).text(),
};

async function main() {
  const hoy = fechaEnZona(new Date(), "America/Santo_Domingo");
  const pais = (await import("../../../src/paises/do")).default as unknown as PaisDefinido;
  for (const d of detectores) {
    const t0 = Date.now();
    try {
      const r = await d.traer(http);
      const ms = Date.now() - t0;
      if (r === null) {
        console.log(`FALLA ${d.id}: devolvió null (${ms} ms)`);
        continue;
      }
      if (d.carril === "serie") {
        const serie = pais.series.find((s) => s.id === d.serie);
        const puntos = r as { fecha: string; valor: number }[];
        const rev = revisarPuntos(serie ?? { id: d.serie, puntos: [] }, puntos as never, d.banda, hoy);
        console.log(`OK ${d.id}: ${puntos.map((p) => `${p.fecha}=${p.valor}`).join(", ")}; ${rev.aceptados.length} nuevos, ${rev.rechazos.length} rechazos (${ms} ms)`);
        for (const x of rev.rechazos) console.log(`   rechazo: ${x}`);
      } else {
        const h = r as { titulo: string; url: string; fecha: string }[];
        console.log(`OK ${d.id}: ${h.length} hallazgos (${ms} ms)`);
        for (const x of h.slice(0, 6)) console.log(`   ${x.fecha} ${x.titulo.slice(0, 100)} ${x.url}`);
      }
    } catch (err) {
      console.log(`FALLA ${d.id}: ${(err as Error).message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
