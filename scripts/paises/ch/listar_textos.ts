// Lista campos, opciones, ayudas, filas y tablas de cada calculadora local de ch, para traducirlas en
// las ediciones (ch-fr, ch-it). No escribe nada.
// Uso: npx tsx scripts/paises/ch/listar_textos.ts
import ch from "../../../src/paises/ch";

for (const e of ch.calculadoras) {
  const d = e.definicion;
  if (!d.id.startsWith("ch.")) continue;
  console.log(`\n## ${d.id} (${d.slug})`);
  for (const c of d.campos) {
    const op = c.tipo === "opcion" ? ` | opciones: ${c.opciones.map((o) => `${o.valor}=${o.etiqueta}`).join(" ; ")}` : "";
    console.log(`campo ${c.id}: ${c.etiqueta}${c.ayuda ? ` | ayuda: ${c.ayuda}` : ""}${op}`);
  }
  for (const f of d.resultado) console.log(`fila ${f.clave}: ${f.etiqueta}${f.ayuda ? ` | ayuda: ${f.ayuda}` : ""}`);
  for (const t of d.tablas ?? []) console.log(`tabla ${t.clave}: ${t.titulo}`);
}
