// Corre los detectores de Tailandia contra las fuentes reales y muestra qué devuelve cada uno: una
// lista vacía es «sin cambios», null es «fuente caída o cambiada». Uso: npx tsx scripts/paises/th/probar-detectores.ts
import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";
import { detectores } from "../../../src/paises/th/fuentes";

async function main() {
  const base = crearHttpReal(90_000);
  let caidos = 0;
  for (const d of detectores) {
    const llamadas: LlamadaHttp[] = [];
    const inicio = Date.now();
    try {
      const r = await d.traer(httpParaDetector(base, d, llamadas));
      const ms = Date.now() - inicio;
      if (r === null) caidos++;
      const resumen = r === null ? "null (fuente caída o con otra forma)" : `${r.length} hallazgos${r.length ? `: ${JSON.stringify(r)}` : ""}`;
      console.log(`${d.id}  ${resumen}  ${ms} ms`);
    } catch (err) {
      caidos++;
      console.log(`${d.id}  error: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  console.log(caidos ? `${caidos} detectores sin respuesta útil` : "TODOS RESPONDEN");
}

void main();
