// Baja del Banco Mundial el factor de conversión PPA del consumo privado (PA.NUS.PRVT.PP, unidades de
// moneda local por dólar internacional) y escribe src/motor/mundo/ppa.json con el último año con dato
// de cada país. Es la única fuente de la conversión entre países de «Tu sueldo en el mundo».
//   npx tsx scripts/mundo/actualizar_ppa.ts
// El API devuelve también agregados (regiones, grupos de ingreso) con códigos que parecen ISO
// ("ZH", "XC", "1A"): se descartan con la lista de países del mismo API, donde region = "Aggregates".
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const INDICADOR = "PA.NUS.PRVT.PP";
const DESDE = 2018;
const HASTA = new Date().getUTCFullYear();
const URL_DATOS = `https://api.worldbank.org/v2/country/all/indicator/${INDICADOR}?format=json&per_page=20000&date=${DESDE}:${HASTA}`;
const URL_PAISES = "https://api.worldbank.org/v2/country?format=json&per_page=400";
const SALIDA = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "src", "motor", "mundo", "ppa.json");

interface FilaDato {
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number | null;
}
interface FilaPais {
  id: string;
  iso2Code: string;
  region: { id: string; value: string };
}

async function json<T>(url: string): Promise<T> {
  const r = await fetch(url, { headers: { accept: "application/json" } });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  const cuerpo = (await r.json()) as unknown;
  if (!Array.isArray(cuerpo) || cuerpo.length < 2 || !Array.isArray(cuerpo[1])) throw new Error(`${url}: respuesta inesperada ${JSON.stringify(cuerpo).slice(0, 300)}`);
  const [meta] = cuerpo as [{ pages: number }];
  if (meta.pages > 1) throw new Error(`${url}: vino paginado (${meta.pages} páginas); subí per_page`);
  return cuerpo[1] as T;
}

async function main() {
  const filasPais = await json<FilaPais[]>(URL_PAISES);
  const iso3aIso2 = new Map<string, string>();
  for (const p of filasPais) if (p.region.value !== "Aggregates" && /^[A-Z]{2}$/.test(p.iso2Code)) iso3aIso2.set(p.id, p.iso2Code);
  if (iso3aIso2.size < 180) throw new Error(`la lista de países trae solo ${iso3aIso2.size}: algo cambió en el API`);

  const filas = await json<FilaDato[]>(URL_DATOS);
  const paises: Record<string, { valor: number; anio: number }> = {};
  for (const f of filas) {
    const iso2 = iso3aIso2.get(f.countryiso3code);
    if (!iso2 || f.value === null || !(f.value > 0)) continue;
    const anio = Number(f.date);
    if (!paises[iso2] || anio > paises[iso2].anio) paises[iso2] = { valor: f.value, anio };
  }
  const n = Object.keys(paises).length;
  if (n < 150) throw new Error(`solo ${n} países con dato: no se pisa ppa.json`);
  for (const [iso, esperado] of [["US", 1], ["MX", null], ["DE", null]] as const) {
    if (!paises[iso]) throw new Error(`falta ${iso} en la respuesta`);
    if (esperado !== null && Math.abs(paises[iso].valor - esperado) > 1e-9) throw new Error(`${iso} debería valer ${esperado} y vale ${paises[iso].valor}`);
  }

  const ordenado = Object.fromEntries(Object.entries(paises).sort(([a], [b]) => a.localeCompare(b)));
  const salida = { consultadoEl: new Date().toISOString().slice(0, 10), fuente: { url: URL_DATOS }, paises: ordenado };
  writeFileSync(SALIDA, `${JSON.stringify(salida, null, 2)}\n`);
  const anios = Object.values(paises).reduce<Record<number, number>>((acc, p) => ((acc[p.anio] = (acc[p.anio] ?? 0) + 1), acc), {});
  console.log(`ppa.json: ${n} países · por año del último dato: ${Object.entries(anios).map(([a, c]) => `${a}=${c}`).join(" ")}`);
}

main().catch((err: unknown) => {
  console.error(`❌ ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
