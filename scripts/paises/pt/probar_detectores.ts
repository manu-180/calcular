// Corre os detetores de Portugal contra as fontes reais, com o mesmo cliente HTTP do cron, e mostra o
// que devolvem. Não escreve nada.
// Uso: npx tsx scripts/paises/pt/probar_detectores.ts
import { detectores } from "../../../src/paises/pt/fuentes";
import { crearHttpReal, httpParaDetector, type LlamadaHttp } from "../../datos-paises/lib/http";

async function main() {
  const base = crearHttpReal();
  for (const d of detectores) {
    const registro: LlamadaHttp[] = [];
    try {
      const r = await d.traer(httpParaDetector(base, d, registro));
      const resumo = r === null ? "null (forma inesperada)" : d.carril === "serie" ? JSON.stringify(r.slice(-3)) : JSON.stringify(r.slice(0, 3));
      console.log(`${d.id}: ${Array.isArray(r) ? r.length : 0} → ${resumo}`);
    } catch (e) {
      console.log(`${d.id}: ERRO ${(e as Error).message}`);
    }
  }
}

void main();
