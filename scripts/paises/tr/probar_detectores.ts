// Corre los detectores de Türkiye contra las fuentes reales y muestra lo que devuelven, sin escribir
// nada. Uso: npx tsx scripts/paises/tr/probar_detectores.ts
import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";
import { detectores } from "../../../src/paises/tr/fuentes";

async function main() {
  const base = crearHttpReal(60_000);
  for (const d of detectores) {
    const registro: LlamadaHttp[] = [];
    const http = httpParaDetector(base, d, registro);
    try {
      const r = await d.traer(http);
      const resumen = r === null ? "null (forma inesperada)" : JSON.stringify(r.slice(-3));
      console.log(`${d.id} [${d.carril}] -> ${resumen}`);
    } catch (e) {
      console.log(`${d.id} [${d.carril}] -> ERROR ${(e as Error).message}`);
    }
    for (const l of registro.filter((x) => !x.ok)) console.log(`   fallo ${l.url.slice(0, 90)}: ${l.error?.slice(0, 80)}`);
  }
}

main();
