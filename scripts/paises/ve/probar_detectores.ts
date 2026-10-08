// Corre los detectores de Venezuela contra la red real con el Http del cron (tlsTolerante incluido)
// y revisa los puntos con las bandas del motor. Uso: npx tsx scripts/paises/ve/probar_detectores.ts
import { revisarPuntos } from "../../../src/motor/bandas";
import type { PaisDefinido } from "../../../src/motor/tipos";
import { fechaEnZona } from "../../../src/motor/vigencia";
import { detectores } from "../../../src/paises/ve/fuentes";
import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";

async function main() {
  const hoy = fechaEnZona(new Date(), "America/Caracas");
  const pais = (await import("../../../src/paises/ve")).default as unknown as PaisDefinido;
  const base = crearHttpReal();
  for (const d of detectores) {
    const registro: LlamadaHttp[] = [];
    const t0 = Date.now();
    try {
      const r = await d.traer(httpParaDetector(base, d, registro));
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
        console.log(`OK ${d.id}: ${(r as unknown[]).length} hallazgos (${ms} ms)`);
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
