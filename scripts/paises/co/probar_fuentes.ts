// Corre los detectores de Colombia contra la red real con el mismo Http que usa el cron.
// Uso: npx tsx scripts/paises/co/probar_fuentes.ts
import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";
import { revisarPuntos } from "../../../src/motor/bandas";
import type { FechaISO } from "../../../src/motor/tipos";
import pais from "../../../src/paises/co/index";
import { detectores } from "../../../src/paises/co/fuentes";

async function main() {
  let fallas = 0;
  const base = crearHttpReal();
  for (const d of detectores) {
    const http = httpParaDetector(base, d, [] as LlamadaHttp[]);
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
