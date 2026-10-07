// Cuenta rayas («—» y «–») en texto que ve una persona: strings, templates y texto JSX. Los
// comentarios no son nodos del AST, así que quedan afuera sin regex frágiles. Se llama contar_ y
// no check_ a propósito: check-all.ts levanta todo check_*.ts y esto falla hasta que termine la
// reescritura de la guía (docs/GUIA-REDACCION.md). Cuando dé cero, renombrar a check_guiones.ts.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

const RAIZ = join(__dirname, "..");
const DIRS = ["src"];
const RAYA = /[–—]/;
// Una raya sola es el «sin dato» de una celda de tabla, no redacción.
const SOLO_RAYA = /^["'`]?\s*[–—]\s*["'`]?$/;

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
      if (RAYA.test(texto) && !SOLO_RAYA.test(texto)) {
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
