// ¿Cuántas páginas de calcularya cambian de un día al otro?
//
// Cada página prerenderizada que se regenera por `revalidate` es una escritura ISR que Vercel cobra,
// cambie o no su contenido. Este script mide cuántas cambiarían de verdad: resuelve los valores de
// cada calculadora publicable en dos fechas y compara. Lo que sale igual se está regenerando (y
// pagando) para escribir el mismo HTML.
//
// Uso: npx tsx scripts/medir_dia_a_dia.ts [desde] [hasta]   (por defecto hoy y mañana)
import { registro } from "../src/paises";
import { resolverValores } from "../src/motor/registro";
import { sumarDias } from "../src/motor/vigencia";
import { hoyEn } from "../src/motor/vigencia";
import type { CodigoMercado, FechaISO } from "../src/motor/tipos";

const MODO = "produccion" as const;

// La huella de lo que la página muestra: el valor de cada dato y el tramo del que salió. Si no se
// mueve, el HTML tampoco (salvo las secciones que imprimen el día: calendario, grilla de mundo y la
// foto de sueldos, que se miden aparte porque cambian siempre).
function huella(codigo: CodigoMercado, slug: string, fecha: FechaISO): string {
  const pais = registro.pais(codigo);
  if (!pais) return "sin-pais";
  const entrada = registro.calculadorasPublicables(codigo, fecha, MODO).find((c) => c.definicion.slug === slug);
  if (!entrada) return "no-publicable";
  const r = resolverValores(pais, entrada.definicion, fecha);
  if (!r.ok) return `no-resuelve:${r.motivos.sort().join("|")}`;
  return Object.entries(r.valores)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([id, v]) => `${id}=${JSON.stringify(v)}`)
    .join(";");
}

function main() {
  const mercados = registro.mercados(MODO);
  const desde = (process.argv[2] as FechaISO) || hoyEn(mercados[0]);
  const hasta = (process.argv[3] as FechaISO) || sumarDias(desde, 1);

  let total = 0;
  let distintas = 0;
  let aparecen = 0;
  let desaparecen = 0;
  const ejemplos: string[] = [];
  const porMercado = new Map<string, number>();

  for (const m of mercados) {
    const antes = new Set(registro.calculadorasPublicables(m.codigo, desde, MODO).map((c) => c.definicion.slug));
    const despues = new Set(registro.calculadorasPublicables(m.codigo, hasta, MODO).map((c) => c.definicion.slug));
    for (const slug of despues) if (!antes.has(slug)) aparecen++;
    for (const slug of antes) if (!despues.has(slug)) desaparecen++;

    for (const slug of antes) {
      total++;
      if (huella(m.codigo, slug, desde) !== huella(m.codigo, slug, hasta)) {
        distintas++;
        porMercado.set(m.codigo, (porMercado.get(m.codigo) ?? 0) + 1);
        if (ejemplos.length < 15) ejemplos.push(`${m.codigo}/${slug}`);
      }
    }
  }

  console.log(`fechas comparadas: ${desde} -> ${hasta}`);
  console.log(`mercados: ${mercados.length}`);
  console.log(`paginas de calculadora publicadas el ${desde}: ${total}`);
  console.log(`cambian de contenido al dia siguiente: ${distintas} (${((distintas / total) * 100).toFixed(2)}%)`);
  console.log(`empiezan a publicarse: ${aparecen}   dejan de publicarse: ${desaparecen}`);
  if (ejemplos.length) console.log(`ejemplos: ${ejemplos.join(", ")}`);
  if (porMercado.size) {
    const top = [...porMercado.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
    console.log(`mercados con cambios: ${porMercado.size} -> ${top.map(([c, n]) => `${c}:${n}`).join(" ")}`);
  }
}

main();
