// Corre los detectores de Moçambique contra las fuentes reales y muestra lo que traen, sin escribir
// nada. Uso: npx tsx scripts/paises/mz/probar_detectores.ts
import type { Http } from "../../../src/motor/tipos";
import { detectores } from "../../../src/paises/mz/fuentes";

const http: Http = {
  async json(url) {
    const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
    return r.json();
  },
  async texto(url) {
    const r = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
    return r.text();
  },
};

async function main(): Promise<void> {
  for (const d of detectores) {
    try {
      const r = await d.traer(http);
      if (r === null) console.log(`❌ ${d.id}: null (formato inesperado)`);
      else if (d.carril === "serie") {
        const puntos = r as readonly { fecha: string; valor: number }[];
        const fuera = puntos.filter((p) => p.valor < d.banda.min || p.valor > d.banda.max);
        const ultimo = puntos.at(-1);
        console.log(`${fuera.length ? "⚠️" : "✅"} ${d.id}: ${puntos.length} puntos, último ${ultimo?.fecha} = ${ultimo?.valor}${fuera.length ? `, ${fuera.length} fuera de banda` : ""}`);
      } else console.log(`✅ ${d.id}: ${r.length} hallazgos`);
    } catch (e) {
      console.log(`❌ ${d.id}: ${(e as Error).message}`);
    }
  }
}

void main();
