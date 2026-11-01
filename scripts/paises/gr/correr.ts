// Corre una calculadora de gr con los datos del repo, para armar y revisar casos:
// npx tsx scripts/paises/gr/correr.ts <slug> '<json entrada>' ['<json entrada>' ...] [--fecha=AAAA-MM-DD]
import { crearContexto } from "../../../src/motor/calculo";
import { resolverValores } from "../../../src/motor/registro";
import type { FechaISO } from "../../../src/motor/tipos";
import pais from "../../../src/paises/gr";

const args = process.argv.slice(2);
const fecha = (args.find((a) => a.startsWith("--fecha="))?.slice(8) ?? "2026-10-24") as FechaISO;
const [slug, ...entradas] = args.filter((a) => !a.startsWith("--fecha="));
const c = pais.calculadoras.find((x) => x.definicion.slug === slug);
if (!c) throw new Error(`no está ${slug}`);
const r = resolverValores(pais, c.definicion, fecha);
if (!r.ok) {
  console.log(r.motivos);
  process.exit(1);
}
const ctx = crearContexto(pais.mercado, fecha, c.definicion);
for (const e of entradas) {
  try {
    const res = c.definicion.calcular(JSON.parse(e), r.valores as never, ctx) as Record<string, unknown>;
    const plano = Object.fromEntries(Object.entries(res).filter(([, v]) => typeof v !== "object" || Array.isArray(v)));
    console.log(e, "=>", JSON.stringify(plano));
  } catch (err) {
    console.log(e, "=> ERROR", (err as Error).message);
  }
}
