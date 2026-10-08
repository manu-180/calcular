// Corre los detectores de Chile contra la red real y revisa los puntos con las bandas del motor.
// Con --serie <id> imprime en JSON todos los puntos oficiales del año (para armar series.json).
// Uso: npx tsx scripts/paises/cl/probar_detectores.ts [--serie cl.uf|cl.utm]
import { revisarPuntos } from "../../../src/motor/bandas";
import type { Http, OpcionesHttp, PaisDefinido } from "../../../src/motor/tipos";
import { fechaEnZona } from "../../../src/motor/vigencia";
import { cruzar, detectores, parsearMindicador, parsearUfSii, parsearUtmSii } from "../../../src/paises/cl/fuentes";

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

async function volcarSerie(id: string) {
  const anio = Number(fechaEnZona(new Date(), "America/Santiago").slice(0, 4));
  const esUf = id === "cl.uf";
  const html = await http.texto(esUf ? `https://www.sii.cl/valores_y_fechas/uf/uf${anio}.htm` : `https://www.sii.cl/valores_y_fechas/utm/utm${anio}.htm`);
  const oficiales = esUf ? parsearUfSii(html, anio) : parsearUtmSii(html, anio);
  const cruce = parsearMindicador(await http.json(`https://mindicador.cl/api/${esUf ? "uf" : "utm"}/${anio}`)) ?? [];
  const { coinciden, difieren } = cruzar(oficiales, cruce);
  console.error(`${id}: ${oficiales.length} puntos SII, ${cruce.length} en mindicador, ${coinciden} coinciden, ${difieren.length} difieren`);
  for (const d of difieren) console.error(`  ${d}`);
  console.log(JSON.stringify(oficiales.map((p) => [p.fecha, p.valor])));
}

async function main() {
  const i = process.argv.indexOf("--serie");
  if (i > 0) return volcarSerie(process.argv[i + 1]);
  const hoy = fechaEnZona(new Date(), "America/Santiago");
  const pais = (await import("../../../src/paises/cl")).default as unknown as PaisDefinido;
  for (const d of detectores) {
    const t0 = Date.now();
    try {
      const r = await d.traer(http);
      const ms = Date.now() - t0;
      if (r === null) {
        console.log(`❌ ${d.id}: devolvió null (${ms} ms)`);
        continue;
      }
      if (d.carril === "serie") {
        const serie = pais.series.find((s) => s.id === d.serie);
        const puntos = r as { fecha: string; valor: number }[];
        const rev = revisarPuntos(serie ?? { id: d.serie, puntos: [] }, puntos as never, d.banda, hoy);
        console.log(`✅ ${d.id}: ${puntos.length} puntos (${puntos[0]?.fecha} a ${puntos[puntos.length - 1]?.fecha}), ${rev.aceptados.length} nuevos, ${rev.rechazos.length} rechazos (${ms} ms)`);
        for (const x of rev.rechazos) console.log(`   rechazo: ${x}`);
      } else {
        const h = r as { titulo: string; url: string; fecha: string }[];
        console.log(`✅ ${d.id}: ${h.length} hallazgos (${ms} ms)`);
        for (const x of h.slice(0, 5)) console.log(`   ${x.fecha} ${x.titulo.slice(0, 90)} ${x.url}`);
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
