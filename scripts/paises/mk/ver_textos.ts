// Muestra los textos con los marcadores resueltos y marca los «ден..» o «ден.,» del símbolo con punto.
// Uso: TSX_DISABLE_CACHE=1 npx tsx scripts/paises/mk/ver_textos.ts [--todo]
import mk from "@/paises/mk";
import { rellenarContenido, resolverValores } from "@/motor/registro";

const todo = process.argv.includes("--todo");
let malos = 0;
for (const c of mk.calculadoras) {
  if (c.definicion.mercado !== "mk") continue;
  const res = resolverValores(mk, c.definicion, "2026-11-01");
  if (!res.ok) {
    console.log(`-- ${c.definicion.slug}: borrador o sin datos`);
    continue;
  }
  const unidades = Object.fromEntries([...mk.datos.map((d) => [d.id, d.unidad]), ...mk.series.map((s) => [s.id, s.unidad])]);
  const t = rellenarContenido(c.contenido, { valores: res.valores, usados: res.usados, unidades, locale: "mk-MK", anio: 2026 });
  const lineas = [t.h1, t.title, t.description, ...t.intro, ...t.comoSeCalcula, ...(t.ejemplo ?? []), ...t.faq.flatMap((f) => [f.pregunta, f.respuesta]), ...t.glosario.map((g) => g.definicion)];
  for (const l of lineas) if (/ден\.[.,;:]/.test(l)) { malos++; console.log(`MAL: ${l}`); }
  console.log(`\n== ${c.definicion.slug}\n${t.title}\n${t.description}\n${t.intro[0]}`);
  if (todo) console.log(lineas.join("\n"));
}
console.log(`\nden. con puntuación: ${malos}`);
