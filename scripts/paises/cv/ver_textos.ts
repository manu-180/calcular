// Imprime los textos de Cabo Verde con los marcadores resueltos, como los ve la página.
// Uso: npx tsx scripts/paises/cv/ver_textos.ts [slug]
import { rellenarContenido, resolverValores } from "../../../src/motor/registro";
import type { Unidad } from "../../../src/motor/tipos";
import { hoyEn } from "../../../src/motor/vigencia";
import pais from "../../../src/paises/cv/index";

const unidades: Record<string, Unidad> = {};
for (const d of pais.datos) unidades[d.id] = d.unidad;
const hoy = hoyEn(pais.mercado);
const slug = process.argv[2];

for (const { definicion, contenido } of pais.calculadoras) {
  if (slug && definicion.slug !== slug) continue;
  const r = resolverValores(pais, definicion, hoy);
  if (!r.ok) {
    console.log(`${definicion.slug}: no se puede resolver (${r.motivos.join("; ")})`);
    continue;
  }
  const c = rellenarContenido(contenido, { valores: r.valores, usados: r.usados, unidades, locale: pais.mercado.locale, simbolos: pais.mercado.simbolos });
  console.log(`\n## ${definicion.slug}\n${c.title}\n${c.description}`);
  for (const t of [...c.intro, ...c.comoSeCalcula, ...(c.ejemplo ?? [])]) console.log(`- ${t}`);
  for (const f of c.faq) console.log(`? ${f.pregunta}\n  ${f.respuesta}`);
  for (const g of c.glosario) console.log(`· ${g.termino}: ${g.definicion}`);
}
