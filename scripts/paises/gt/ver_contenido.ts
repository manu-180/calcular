// Muestra los textos de las calculadoras de Guatemala con los marcadores {{ }} ya resueltos a hoy, para
// revisar a ojo cómo se leen los valores formateados («2 meses», «4.83 %») antes de publicar.
// Uso: npx tsx scripts/paises/gt/ver_contenido.ts [slug]
import { rellenarContenido, resolverValores } from "../../../src/motor/registro";
import type { Unidad } from "../../../src/motor/tipos";
import { hoyEn } from "../../../src/motor/vigencia";
import pais from "../../../src/paises/gt";

const filtro = process.argv[2];
const unidades: Record<string, Unidad> = {};
for (const d of pais.datos) unidades[d.id] = d.unidad;
for (const s of pais.series) unidades[s.id] = s.unidad;
const hoy = hoyEn(pais.mercado);

for (const { definicion, contenido } of pais.calculadoras) {
  if (filtro && definicion.slug !== filtro) continue;
  const r = resolverValores(pais, definicion, hoy);
  if (!r.ok) {
    console.log(`\n## ${definicion.slug}: no se puede resolver a ${hoy}`);
    continue;
  }
  const c = rellenarContenido(contenido, { valores: r.valores, usados: r.usados, unidades, locale: pais.mercado.locale });
  console.log(`\n## ${definicion.slug} (${c.title.length}/${c.description.length})`);
  for (const t of [c.title, c.description, ...c.intro, ...c.comoSeCalcula, ...(c.ejemplo ?? [])]) console.log(`- ${t}`);
  for (const f of c.faq) console.log(`? ${f.pregunta}\n  ${f.respuesta}`);
}
