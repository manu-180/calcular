// Muestra el contenido resuelto (marcadores ya reemplazados) de las calculadoras locales de no.
//   npx tsx scripts/paises/no/ver_textos.ts [slug]
import { crearRegistro } from "../../../src/motor/registro";
import no from "../../../src/paises/no";

const registro = crearRegistro([no]);
const filtro = process.argv[2];
for (const entrada of no.calculadoras) {
  if ("universal" in entrada) continue;
  const slug = entrada.definicion.slug;
  if (filtro && slug !== filtro) continue;
  const p = registro.pagina("no", slug, "2026-10-24", "interno");
  if (!p) {
    console.log(`\n### ${slug}: sin página`, registro.publicabilidad("no", slug, "2026-10-24", "interno"));
    continue;
  }
  const c = p.contenido;
  console.log(`\n### ${slug} (${c.title.length}/${c.description.length})\nH1: ${c.h1}\nTITLE: ${c.title}\nDESC: ${c.description}`);
  for (const t of [...c.intro, ...c.comoSeCalcula, ...(c.ejemplo ?? [])]) console.log(`- ${t}`);
  for (const f of c.faq ?? []) console.log(`? ${f.pregunta}\n  ${f.respuesta}`);
  for (const g of c.glosario ?? []) console.log(`* ${g.termino}: ${g.definicion}`);
}
