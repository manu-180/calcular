// Corre los detectores de series de México con el Http real del cron (scripts/datos-paises) para
// probar también sus encabezados y su manejo de respuestas. Uso: npx tsx scripts/paises/mx/probar_series_cron.ts
import { detectores } from "../../../src/paises/mx/fuentes";
import { crearHttpReal } from "../../datos-paises/lib/http";

async function main() {
  const http = crearHttpReal();
  let fallas = 0;
  for (const d of detectores) {
    if (d.carril !== "serie") continue;
    try {
      const r = await d.traer(http);
      if (!r || r.length === 0) throw new Error("sin puntos");
      const ultimo = r[r.length - 1];
      console.log(`✅ ${d.id}: ${r.length} puntos, último ${ultimo.fecha} = ${ultimo.valor}`);
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
  console.log(fallas ? `${fallas} FALLAS` : "TODO OK");
  if (fallas) process.exitCode = 1;
}

void main();
