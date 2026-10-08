// Corre los detectores de Bolivia contra la red real con el mismo Http del cron y revisa los puntos
// de las series con las bandas del motor. No escribe nada.
// Uso: npx tsx scripts/paises/bo/probar_detectores.ts [id-del-detector]
import { crearHttpReal } from "../../datos-paises/lib/http";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { PaisDefinido, PuntoSerie } from "../../../src/motor/tipos";
import { hoyEn } from "../../../src/motor/vigencia";

async function main() {
  const filtro = process.argv[2];
  const pais = (await import("../../../src/paises/bo")).default as unknown as PaisDefinido;
  const http = crearHttpReal(60_000);
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
        const rev = revisarPuntos(serie ?? { id: d.serie, puntos: [] }, puntos, d.banda, hoy);
        if (rev.rechazos.length) fallas++;
        console.log(`${rev.rechazos.length ? "❌" : "✅"} ${d.id}: ${puntos.map((p) => `${p.fecha}=${p.valor}`).join(", ")}; ${rev.aceptados.length} nuevos, ${rev.rechazos.length} rechazos (${ms} ms)`);
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
  console.log(fallas ? `${fallas} FALLAS` : "TODO OK");
  process.exit(fallas ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
