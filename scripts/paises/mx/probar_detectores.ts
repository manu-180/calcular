// Corre los detectores de México contra la red real, con un Http mínimo sobre fetch, y verifica cada
// serie contra su banda. Uso: npx tsx scripts/paises/mx/probar_detectores.ts
import { detectores } from "../../../src/paises/mx/fuentes";
import type { Http } from "../../../src/motor/tipos";

// La API del DOF corta conexiones cuando recibe varias seguidas: reintentar con espera.
async function pedir(url: string): Promise<Response> {
  let ultimo: unknown;
  for (let i = 0; i < 6; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": "calcularya-detector/1.0" }, signal: AbortSignal.timeout(60_000) });
      if (r.ok) return r;
      ultimo = new Error(`HTTP ${r.status}`);
    } catch (err) {
      ultimo = err;
    }
    await new Promise((res) => setTimeout(res, 3000 * (i + 1)));
  }
  throw ultimo;
}

const http: Http = {
  async json(url) {
    return (await pedir(url)).json();
  },
  async texto(url) {
    return (await pedir(url)).text();
  },
};

async function main() {
  let fallas = 0;
  for (const d of detectores) {
    const inicio = Date.now();
    try {
      const r = await d.traer(http);
      const ms = Date.now() - inicio;
      if (r === null) {
        fallas++;
        console.log(`❌ ${d.id}: devolvió null (${ms} ms)`);
        continue;
      }
      if (d.carril === "serie") {
        const pts = r as { fecha: string; valor: number }[];
        const fuera = pts.filter((p) => p.valor < d.banda.min || p.valor > d.banda.max);
        let saltoMax = 0;
        for (let i = 1; i < pts.length; i++) saltoMax = Math.max(saltoMax, Math.abs(pts[i].valor / pts[i - 1].valor - 1));
        const ok = pts.length > 0 && fuera.length === 0 && saltoMax <= d.banda.saltoRelativoMax;
        if (!ok) fallas++;
        const ultimo = pts[pts.length - 1];
        console.log(`${ok ? "✅" : "❌"} ${d.id}: ${pts.length} puntos, último ${ultimo?.fecha} = ${ultimo?.valor}, salto máximo ${(saltoMax * 100).toFixed(3)} % (${ms} ms)`);
      } else {
        const hs = r as { titulo: string; fecha: string }[];
        console.log(`✅ ${d.id}: ${hs.length} hallazgos en los últimos 3 días${hs.length ? `: ${hs.map((h) => `${h.fecha} ${h.titulo.slice(0, 80)}`).join(" | ")}` : ""} (${ms} ms)`);
      }
    } catch (err) {
      fallas++;
      console.log(`❌ ${d.id}: ${(err as Error).message}`);
    }
  }
  console.log(fallas ? `${fallas} FALLAS` : `TODO OK: ${detectores.length} detectores`);
  process.exit(fallas ? 1 : 0);
}

main();
