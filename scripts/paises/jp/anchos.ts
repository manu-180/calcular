import { readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { anchoVisual } from "../../../src/motor/ancho";
import type { ContenidoCalculadora } from "../../../src/motor/tipos";

const dir = path.join(__dirname, "../../../src/paises/jp/contenido");
let fallas = 0;

async function main() {
  for (const archivo of readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
    const c = (await import(pathToFileURL(path.join(dir, archivo)).href)).default as ContenidoCalculadora;
    const t = anchoVisual(c.title);
    const d = anchoVisual(c.description);
    const mal = t > 60 || d < 70 || d > 160;
    if (mal) fallas++;
    console.log(`${mal ? "❌" : "✅"} ${archivo}: title ${t}, description ${d}`);
  }
  process.exit(fallas ? 1 : 0);
}

main();
