// Falla si hay rayas («—» y «–») en texto que ve una persona: strings, templates y texto JSX.
// Manuel no escribe con rayas (docs/GUIA-REDACCION.md). Los comentarios no son nodos del AST, así
// que quedan afuera sin regex frágiles. Uso suelto: `npx tsx scripts/check_guiones.ts <filtro>`.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

const RAIZ = join(__dirname, "..");
const DIRS = ["src"];
const RAYA = /[–—]/;
// Una raya sola es el «sin dato» de una celda de tabla, no redacción.
const SOLO_RAYA = /^["'`]?\s*[–—]\s*["'`]?$/;
// Citas textuales de la norma: la raya es puntuación de la ley y cambiarla sería citar mal.
// Se identifican por archivo y comienzo del string; si la norma cambia, se actualiza acá.
const CITAS_LITERALES: [string, string][] = [
  ["src/data/caducidad-instancia.ts", "ARTÍCULO 46. — Impulso de oficio"],
  ["src/data/caducidad-instancia.ts", "ARTÍCULO 46. — Impulso del proceso"],
  ["src/data/caducidad-instancia.ts", "En los casos que versen sobre la materia"],
  ["src/data/quebrantos.ts", "El quebranto impositivo sufrido"],
  ["src/data/quebrantos.ts", "Los quebrantos considerados de naturaleza"],
  ["src/data/aportes-obligatorios.ts", "Los socios de sociedades de cualquier tipo"],
  ["src/data/empleador-sin-art.ts", "Si el empleador omitiera"],
  ["src/data/multas-arca.ts", "Se considerará que existe error excusable"],
  ["src/data/rimi.ts", "Podrán ser beneficiarios del Régimen"],
  ["src/data/venta-inmuebles.ts", "Las operaciones detalladas en el apartado 5"],
  ["src/data/deduccion-alquiler.ts", "Locatarios y locadores pueden deducir"],
  ["src/data/garantia-82.ts", "Las jubilaciones otorgadas por el Régimen Previsional Especial"],
  ["src/data/garantia-82.ts", "Facúltase a la ADMINISTRACIÓN NACIONAL"],
];
const esCita = (rel: string, texto: string) =>
  CITAS_LITERALES.some(([f, inicio]) => f === rel && texto.replace(/^["'`]/, "").startsWith(inicio));

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return archivos(p);
    return /\.(tsx?)$/.test(n) ? [p] : [];
  });
}

const filtro = process.argv[2];
const porArchivo = new Map<string, number>();
const muestras: string[] = [];

for (const f of DIRS.flatMap((d) => archivos(join(RAIZ, d)))) {
  const rel = relative(RAIZ, f).replace(/\\/g, "/");
  if (filtro && !rel.includes(filtro)) continue;
  const fuente = ts.createSourceFile(f, readFileSync(f, "utf8"), ts.ScriptTarget.Latest, true, f.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const visitar = (n: ts.Node) => {
    if (
      ts.isStringLiteral(n) ||
      ts.isNoSubstitutionTemplateLiteral(n) ||
      ts.isTemplateHead(n) ||
      ts.isTemplateMiddle(n) ||
      ts.isTemplateTail(n) ||
      ts.isJsxText(n)
    ) {
      const texto = n.getText(fuente);
      if (RAYA.test(texto) && !SOLO_RAYA.test(texto) && !esCita(rel, texto)) {
        porArchivo.set(rel, (porArchivo.get(rel) ?? 0) + (texto.match(/[–—]/g)?.length ?? 0));
        if (muestras.length < 15) {
          const { line } = fuente.getLineAndCharacterOfPosition(n.getStart(fuente));
          muestras.push(`${rel}:${line + 1}: ${texto.trim().slice(0, 110)}`);
        }
      }
    }
    ts.forEachChild(n, visitar);
  };
  visitar(fuente);
}

const total = [...porArchivo.values()].reduce((a, b) => a + b, 0);
if (!total) {
  console.log("OK   cero rayas en texto visible");
  process.exit(0);
}
console.error(`FAIL ${total} raya(s) en texto visible, en ${porArchivo.size} archivo(s)`);
[...porArchivo.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40).forEach(([f, n]) => console.error(`  ${String(n).padStart(4)}  ${f}`));
console.error("Muestras:");
muestras.forEach((m) => console.error("  " + m));
process.exit(1);
