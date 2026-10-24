// Inventario de las calculadoras de sueldo neto del registro (o de las que se pasen por id): campos con
// su tipo, valor por defecto y opciones, y filas de resultado con la destacada marcada. Sirve para
// escribir un adaptador de src/motor/mundo/adaptadores.ts sin abrir 45 archivos.
//   npx tsx scripts/mundo/inventario.ts [id ...]
import { registro } from "../../src/paises";
import { mercadoVisible } from "../../src/motor/registro";
const ids = process.argv.slice(2);
for (const p of registro.paises) {
  for (const e of p.calculadoras) {
    const d = e.definicion;
    if (ids.length ? !ids.includes(d.id) : d.concepto !== "sueldo-neto") continue;
    console.log(`\n### ${p.mercado.codigo} ${d.id} slug=${d.slug} estado=${d.estado} mercado=${p.mercado.estado} visible=${mercadoVisible(p, "produccion")} moneda=${p.mercado.monedas[0]} trad=${e.traduccion ? "si" : "no"}`);
    for (const c of d.campos) {
      const extra: string[] = [];
      if ("porDefecto" in c && c.porDefecto !== undefined) extra.push(`def=${JSON.stringify(c.porDefecto)}`);
      if (c.tipo === "opcion") extra.push(`ops=${c.opciones.map((o) => o.valor).join("|")}`);
      if (c.visibleSi) extra.push(`vis=${JSON.stringify(c.visibleSi)}`);
      if (c.requerido === false) extra.push("opcional");
      if ("min" in c && c.min !== undefined) extra.push(`min=${c.min}`);
      if ("max" in c && c.max !== undefined) extra.push(`max=${c.max}`);
      if (c.tipo === "opcion-dato") extra.push(`dato=${c.dato}`);
      console.log(`  campo ${c.id} [${c.tipo}] "${c.etiqueta}" ${extra.join(" ")}`);
    }
    for (const f of d.resultado) console.log(`  res ${f.clave} [${f.formato}]${f.destacada ? " *DEST*" : ""} "${f.etiqueta}"`);
  }
}
