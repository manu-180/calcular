// Prueba los detectores de mw contra las fuentes reales y contra las mismas respuestas alteradas.
// Correr desde la raíz del repo: npx tsx scripts/paises/mw/probar_detectores.ts [id del detector...]
import { detectores } from "../../../src/paises/mw/fuentes";
import type { Http } from "../../../src/motor/tipos";
import { crearHttpReal } from "../../datos-paises/lib/http";

const red = crearHttpReal(90_000);
// Cada fuente se pide una sola vez: labour.gov.mw corta la segunda conexión seguida.
const memo = new Map<string, Promise<unknown>>();
function una<T>(clave: string, pedir: () => Promise<T>): Promise<T> {
  if (!memo.has(clave)) memo.set(clave, pedir());
  return memo.get(clave) as Promise<T>;
}
const real: Http = {
  texto: (url, o) => una(`t ${url}`, () => red.texto(url, o)),
  json: (url, o) => una(`j ${url}`, () => red.json(url, o)),
  postJson: (url, cuerpo, o) => una(`p ${url} ${JSON.stringify(cuerpo)}`, () => red.postJson!(url, cuerpo, o)),
};

// Un Http que pasa todo por la red real y deja cambiar el texto o el JSON antes de devolverlo.
function alterado(cambiar: (url: string, cuerpo: string) => string): Http {
  return {
    texto: async (url, o) => cambiar(url, await real.texto(url, o)),
    json: async (url, o) => JSON.parse(cambiar(url, JSON.stringify(await real.json(url, o)))),
    postJson: async (url, cuerpo, o) => JSON.parse(cambiar(url, JSON.stringify(await real.postJson!(url, cuerpo, o)))),
  };
}

const PRUEBAS: Record<string, (url: string, cuerpo: string) => string> = {
  "mw.usd-rbm": (_u, c) => c.replace(/id="exhangeRateDate">\s*[^<]+/, 'id="exhangeRateDate">28-October-2026 ').replace(/(<strong>\s*USD\s*<\/strong>\s*<\/td>\s*<td>\s*[\d.]+\s*<\/td>\s*<td>\s*)[\d.]+/, "$12500.0000"),
  "mw.mra-avisos": (_u, c) => c.replace(/"formatted_created_at":"[^"]+"/, '"formatted_created_at":"05 Nov 2026"').replace(/"downloadFilename":"[^"]+"/, '"downloadFilename":"NEW TAX MEASURES 2027"'),
  "mw.mra-paye-calculator": (_u, c) => c.replace("570,500.00", "600,000.00"),
  "mw.mra-wht": (_u, c) => c.replace(/20%/g, "25%"),
  "mw.mra-fbt": (_u, c) => c.replace("Fringe Benefit Tax is 30%", "Fringe Benefit Tax is 35%"),
  "mw.mra-tevet": (_u, c) => c.replace("1% of the basic annual payroll", "2% of the basic annual payroll"),
  "mw.mra-presumptive": (_u, c) => c.replace("K225,000.00", "K250,000.00"),
  "mw.labour-documentos": (_u, c) => c.replace('href="/images/documents/employment-act.pdf"', 'href="/images/documents/employment-act.pdf"><a href="/images/documents/Employment-Amendment-Act-2026.pdf"'),
};

async function main() {
  const solo = process.argv.slice(2);
  for (const d of detectores.filter((x) => solo.length === 0 || solo.includes(x.id))) {
    if (d.metodo === "manual") {
      console.log(`${d.id}: manual, no consulta la fuente`);
      continue;
    }
    const conReal = await d.traer(real).catch((e: Error) => `error: ${e.message}`);
    const cambio = PRUEBAS[d.id];
    const conCambio = cambio ? await d.traer(alterado(cambio)).catch((e: Error) => `error: ${e.message}`) : "sin prueba";
    console.log(`${d.id}\n  real:     ${JSON.stringify(conReal)}\n  alterado: ${JSON.stringify(conCambio)}`);
  }
}

main();
