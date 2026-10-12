// Imprime los textos de las calculadoras de Paraguay con los marcadores {{ }} ya resueltos, para leerlos
// como los ve la persona (por ejemplo, «dividido 30 días» o «el 100 del promedio» se notan acá).
// Uso: npx tsx scripts/paises/py/ver_contenido.ts [id-de-calculadora...]
import path from "node:path";
import { rellenarContenido, resolverValores } from "../../../src/motor/registro";
import type { PaisDefinido, Unidad } from "../../../src/motor/tipos";
import { hoyEn } from "../../../src/motor/vigencia";
import { importar } from "../../paises_comun";

async function main() {
  const pais = await importar<PaisDefinido>(path.resolve(__dirname, "../../../src/paises/py/index.ts"));
  const filtro = new Set(process.argv.slice(2));
  const unidades: Record<string, Unidad> = {};
  for (const d of pais.datos) unidades[d.id] = d.unidad;
  for (const s of pais.series) unidades[s.id] = s.unidad;
  const hoy = hoyEn(pais.mercado);
  for (const { definicion, contenido } of pais.calculadoras) {
    if (filtro.size && !filtro.has(definicion.id)) continue;
    const r = resolverValores(pais, definicion, hoy);
    if (!r.ok) {
      console.log(`## ${definicion.id}: no se puede resolver hoy`);
      continue;
    }
    const c = rellenarContenido(contenido, { valores: r.valores, usados: r.usados, unidades, locale: pais.mercado.locale });
    console.log(`## ${definicion.id}\n${c.title}\n${c.description}`);
    for (const t of [...c.intro, ...c.comoSeCalcula, ...(c.ejemplo ?? [])]) console.log(`- ${t}`);
    for (const f of c.faq) console.log(`? ${f.pregunta}\n  ${f.respuesta}`);
    for (const g of c.glosario) console.log(`· ${g.termino}: ${g.definicion}`);
    console.log("");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
