// Muestra el contenido de Egipto con los marcadores ya resueltos, para leerlo como lo verá la gente:
//   npx tsx scripts/paises/eg/ver_textos.ts [slug]
import { writeFileSync } from "node:fs";
import { rellenarContenido, resolverValores } from "../../../src/motor/registro";
import type { Unidad } from "../../../src/motor/tipos";
import { hoyEn } from "../../../src/motor/vigencia";
import eg from "../../../src/paises/eg";

const filtro = process.argv[2];
const unidades: Record<string, Unidad> = {};
for (const d of eg.datos) unidades[d.id] = d.unidad;
for (const s of eg.series) unidades[s.id] = s.unidad;
const hoy = hoyEn(eg.mercado);
const lineas: string[] = [];
for (const { definicion, contenido } of eg.calculadoras) {
  if (filtro && definicion.slug !== filtro) continue;
  const r = resolverValores(eg, definicion, hoy);
  if (!r.ok) {
    lineas.push(`## ${definicion.slug} (no publicable)`);
    continue;
  }
  const c = rellenarContenido(contenido, { valores: r.valores, usados: r.usados, unidades, locale: eg.mercado.locale });
  lineas.push(`## ${definicion.slug}`, c.title, c.description, ...c.comoSeCalcula, ...c.faq.map((f) => `${f.pregunta} ${f.respuesta}`), "");
}
const salida = process.env.SALIDA ?? "textos-eg.txt";
writeFileSync(salida, lineas.join("\n"), "utf8");
console.log(`escrito ${salida}`);
