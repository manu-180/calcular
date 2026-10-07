// Agrega a series.json los días que el BCN ya publicó y todavía no están cargados. El BCN publica por
// adelantado el valor de cada día del mes (en 2026, todo el año). El cron no puede leer esta fuente
// (ver src/paises/ni/fuentes.ts), así que esto se corre a mano cuando el BCN publica meses nuevos.
// Uso: npx tsx scripts/paises/ni/tipo_cambio_bcn.ts 2027-01 [2027-02 ...]   (sin --escribir, solo muestra)
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { agregarPuntos } from "../../datos-paises/lib/series-json";
import type { PuntoSerie } from "../../../src/motor/tipos";
import { mesBcn } from "./bcn";

const ARCHIVO = path.join(__dirname, "../../../src/paises/ni/series.json");
const SERIE = "ni.tipo-cambio";
const BANDA = { min: 30, max: 45, saltoRelativoMax: 0.05 };

async function main() {
  const escribir = process.argv.includes("--escribir");
  const meses = process.argv.slice(2).filter((a) => /^\d{4}-\d{2}$/.test(a));
  if (meses.length === 0) throw new Error("Pasá al menos un mes AAAA-MM.");
  const texto = readFileSync(ARCHIVO, "utf8");
  const cargados = (JSON.parse(texto) as { series: { id: string; puntos: [string, number][] }[] }).series.find((s) => s.id === SERIE)?.puntos ?? [];
  let anterior = cargados.at(-1)?.[1] ?? null;
  const nuevos: PuntoSerie[] = [];
  for (const m of meses) {
    const [a, mes] = m.split("-").map(Number);
    const puntos = await mesBcn(a, mes);
    if (!puntos) {
      console.log(`${m}: el BCN no devolvió valores (¿todavía no publicó ese mes?)`);
      continue;
    }
    for (const p of puntos) {
      if (cargados.some(([f]) => f === p.fecha)) continue;
      if (p.valor < BANDA.min || p.valor > BANDA.max) throw new Error(`${p.fecha} = ${p.valor} fuera de la banda`);
      if (anterior !== null && Math.abs(p.valor / anterior - 1) > BANDA.saltoRelativoMax) throw new Error(`${p.fecha} = ${p.valor}: salto mayor al ${BANDA.saltoRelativoMax * 100} %`);
      anterior = p.valor;
      nuevos.push(p);
    }
    console.log(`${m}: ${puntos.length} días, valores ${[...new Set(puntos.map((p) => p.valor))].join(", ")}`);
  }
  console.log(`${nuevos.length} puntos nuevos`);
  if (escribir && nuevos.length) {
    const r = agregarPuntos(texto, new Map([[SERIE, nuevos]]));
    writeFileSync(ARCHIVO, r.texto);
    console.log(`series.json: ${r.agregados} agregados (${r.modo}). Actualizá fuente.verificadoEl a mano.`);
  }
}

main().catch((err) => {
  console.error((err as Error).message);
  process.exit(1);
});
