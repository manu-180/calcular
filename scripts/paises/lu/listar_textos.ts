// Lista campos, opciones, ayudas, filas y tablas de cada calculadora local de lu, para traducirlas en
// las ediciones (lu-de). No escribe nada.
// Uso: npx tsx scripts/paises/lu/listar_textos.ts
import lu from "../../../src/paises/lu";

for (const e of lu.calculadoras) {
  const d = e.definicion;
  if (!d.id.startsWith("lu.")) continue;
  console.log(`\n## ${d.id} (${d.slug})`);
  for (const c of d.campos) {
    const op = c.tipo === "opcion" ? ` | opciones: ${c.opciones.map((o) => `${o.valor}=${o.etiqueta}`).join(" ; ")}` : "";
    console.log(`campo ${c.id}: ${c.etiqueta}${c.ayuda ? ` | ayuda: ${c.ayuda}` : ""}${op}`);
  }
  for (const f of d.resultado) console.log(`fila ${f.clave}: ${f.etiqueta}${f.ayuda ? ` | ayuda: ${f.ayuda}` : ""}`);
  for (const t of d.tablas ?? []) console.log(`tabla ${t.clave}: ${t.titulo}`);
}
