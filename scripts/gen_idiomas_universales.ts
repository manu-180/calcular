// Reescribe en cada src/motor/universales/<id>/index.ts los imports y los mapas `textos` y `contenido`
// según los archivos textos/<idioma>.ts y contenido/<idioma>.ts que existen. Los traductores de cada
// idioma solo crean esos archivos; el cableado lo hace este script, así no chocan en el index.
// Uso: npx tsx scripts/gen_idiomas_universales.ts [--check]
import fs from "node:fs";
import path from "node:path";

const RAIZ = path.resolve(import.meta.dirname, "..", "src", "motor", "universales");
const soloCheck = process.argv.includes("--check");
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

let cambiados = 0;
const fallas: string[] = [];
for (const id of fs.readdirSync(RAIZ)) {
  const dir = path.join(RAIZ, id);
  const index = path.join(dir, "index.ts");
  if (!fs.statSync(dir).isDirectory() || !fs.existsSync(index)) continue;
  const idiomas = (sub: string) =>
    fs.existsSync(path.join(dir, sub))
      ? fs.readdirSync(path.join(dir, sub)).filter((f) => /^[a-z]{2}\.ts$/.test(f)).map((f) => f.slice(0, 2)).sort()
      : [];
  const textos = idiomas("textos");
  const contenido = idiomas("contenido");
  const ambos = textos.filter((i) => contenido.includes(i));
  for (const i of textos) if (!contenido.includes(i)) fallas.push(`${id}: textos/${i}.ts sin contenido/${i}.ts`);
  for (const i of contenido) if (!textos.includes(i)) fallas.push(`${id}: contenido/${i}.ts sin textos/${i}.ts`);
  for (const i of ambos) {
    const t = fs.readFileSync(path.join(dir, "textos", `${i}.ts`), "utf8");
    const c = fs.readFileSync(path.join(dir, "contenido", `${i}.ts`), "utf8");
    if (!t.includes(`export const textos${cap(i)}`)) fallas.push(`${id}: textos/${i}.ts tiene que exportar textos${cap(i)}`);
    if (!c.includes(`export const contenido${cap(i)}`)) fallas.push(`${id}: contenido/${i}.ts tiene que exportar contenido${cap(i)}`);
  }

  const original = fs.readFileSync(index, "utf8");
  const sinImports = original
    .split("\n")
    .filter((l) => !/^import \{ (textos|contenido)[A-Z][a-z] \} from "\.\/(textos|contenido)\/[a-z]{2}";$/.test(l));
  const imports = ambos.flatMap((i) => [
    `import { contenido${cap(i)} } from "./contenido/${i}";`,
    `import { textos${cap(i)} } from "./textos/${i}";`,
  ]);
  const ultimoImport = sinImports.reduce((n, l, k) => (l.startsWith("import ") ? k : n), -1);
  const lineas = [...sinImports.slice(0, ultimoImport + 1), ...imports, ...sinImports.slice(ultimoImport + 1)];
  const cabecera = lineas.filter((l) => l.startsWith("import ")).sort((a, b) => {
    const da = a.match(/from "(.+)"/)?.[1] ?? "";
    const db = b.match(/from "(.+)"/)?.[1] ?? "";
    return da.localeCompare(db);
  });
  const cuerpo = lineas.filter((l) => !l.startsWith("import "));
  let nuevo = [...cabecera, ...cuerpo].join("\n");
  nuevo = nuevo
    .replace(/  textos: \{[^}]*\},/, `  textos: { ${ambos.map((i) => `${i}: textos${cap(i)}`).join(", ")} },`)
    .replace(/  contenido: \{[^}]*\},/, `  contenido: { ${ambos.map((i) => `${i}: contenido${cap(i)}`).join(", ")} },`);
  if (nuevo !== original) {
    cambiados++;
    if (soloCheck) fallas.push(`${id}: index.ts no está al día (correr sin --check)`);
    else fs.writeFileSync(index, nuevo);
  }
}

if (fallas.length) {
  console.error(`gen_idiomas_universales: ${fallas.length} fallas\n${fallas.map((f) => `  ✗ ${f}`).join("\n")}`);
  process.exit(1);
}
console.log(soloCheck ? "gen_idiomas_universales: index al día ✓" : `gen_idiomas_universales: ${cambiados} index reescritos ✓`);
