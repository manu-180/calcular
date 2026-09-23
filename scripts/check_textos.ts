// Las etiquetas de mes de los datos ya traen el año ("septiembre de 2026", "agosto 2026"). Pegarles
// " de 2026" a mano dio "septiembre de 2026 de 2026" en seis FAQ en vivo (y en el FAQPage de cada
// una) hasta el 23/9/2026. Este check busca el patrón en el código fuente.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const RAIZ = join(__dirname, "..", "src");
const PATRONES = [
  /\{MES[A-Z_]*\} de 20\d\d/,
  /\{(?:V|[A-Z_]+)\.vigencia\} de 20\d\d/,
  /de 20\d\d de 20\d\d/,
];

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return archivos(p);
    return /\.(tsx?|mdx?)$/.test(n) ? [p] : [];
  });
}

const hallazgos: string[] = [];
for (const f of archivos(RAIZ)) {
  readFileSync(f, "utf8")
    .split("\n")
    .forEach((linea, i) => {
      if (PATRONES.some((re) => re.test(linea))) hallazgos.push(`${f}:${i + 1}: ${linea.trim().slice(0, 120)}`);
    });
}

if (hallazgos.length) {
  console.error(`FAIL año duplicado en ${hallazgos.length} línea(s):`);
  hallazgos.forEach((h) => console.error("  " + h));
  process.exit(1);
}
console.log("OK   ninguna etiqueta de mes lleva el año pegado dos veces");
