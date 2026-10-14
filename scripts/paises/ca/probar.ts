// Corre calculadoras de Canadá con los datos del repo para armar ejemplos y casos.
// Uso: npx tsx scripts/paises/ca/probar.ts <slug> '<entrada JSON>' [AAAA-MM-DD]
//      npx tsx scripts/paises/ca/probar.ts --lote <archivo.json>   (lista de [slug, entrada, fecha?])
import { readFileSync } from "node:fs";
import { crearContexto, ErrorEntrada } from "../../../src/motor/calculo";
import { resolverValores } from "../../../src/motor/registro";
import type { Dato, DefinicionCalculadora, FechaISO, Serie } from "../../../src/motor/tipos";
import datos from "../../../src/paises/ca/datos.json";
import { mercado } from "../../../src/paises/ca/mercado";
import series from "../../../src/paises/ca/series.json";

const pais = { datos: datos.datos as unknown as Dato[], series: series.series as unknown as Serie[] };

async function correr(slug: string, entrada: unknown, fecha: string): Promise<unknown> {
  const def = (await import(`../../../src/paises/ca/calculadoras/${slug}.ts`)).default as DefinicionCalculadora;
  const r = resolverValores(pais, def, fecha as FechaISO);
  if (!r.ok) return { motivos: r.motivos };
  try {
    return def.calcular(entrada as never, r.valores as never, crearContexto(mercado, fecha as FechaISO, def));
  } catch (e) {
    return { error: e instanceof ErrorEntrada ? e.message : String(e) };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const lote: [string, unknown, string?][] =
    args[0] === "--lote" ? JSON.parse(readFileSync(args[1], "utf8")) : [[args[0], JSON.parse(args[1]), args[2]]];
  for (const [slug, entrada, fecha = "2026-10-14"] of lote) {
    const salida = (await correr(slug, entrada, fecha)) as Record<string, unknown>;
    if (salida && typeof salida === "object") delete salida.observaciones;
    console.log(`${slug} ${JSON.stringify(entrada)} => ${JSON.stringify(salida)}`);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
