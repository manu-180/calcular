// Muestra title, description e intro con los marcadores resueltos, para leerlos como en la página.
// Uso: TSX_DISABLE_CACHE=1 npx tsx scripts/paises/ee/mirar_textos.ts
import { rellenarContenido } from "../../../src/motor/registro";
import type { FechaISO, Unidad } from "../../../src/motor/tipos";
import ee from "../../../src/paises/ee";
import datos from "../../../src/paises/ee/datos.json";
import series from "../../../src/paises/ee/series.json";

const ultimoThi = series.series[0].puntos.at(-1) as unknown as [FechaISO, number];
const valores: Record<string, never> = {};
const unidades: Record<string, Unidad> = { "ee.thi": "numero" };
const usados: { id: string; desde: FechaISO }[] = [{ id: "ee.thi", desde: ultimoThi[0] }];
(valores as Record<string, unknown>)["ee.thi"] = ultimoThi[1];
for (const d of datos.datos) {
  (valores as Record<string, unknown>)[d.id] = d.tramos[0].valor;
  unidades[d.id] = d.unidad as Unidad;
  usados.push({ id: d.id, desde: d.tramos[0].desde as FechaISO });
}

for (const c of ee.calculadoras) {
  const r = rellenarContenido(c.contenido, { valores, usados, unidades, locale: ee.mercado.locale, anio: 2026 } as never);
  console.log(`\n# ${c.definicion.slug}\n${r.title.length}: ${r.title}\n${r.description.length}: ${r.description}\n${r.intro[0]}\n${r.faq[0].respuesta}`);
}
