// mapa-contenido.ts — mapa rápido de todas las páginas del sitio para escanear
// COBERTURA y CANIBALIZACIÓN antes de construir un pilar SEO nuevo.
//
// Por qué existe (kaizen s61, regla 2-2): antes de cada pilar de blog hay que
// chequear a mano si una página propia ya cubre la query (evitar canibalizar las
// páginas-herramienta que ya rankean). Eso se hacía grepeando `metadata.title` /
// canonical en muchos archivos, una y otra vez. Esto lo resuelve en una orden:
//
//   npx -y tsx scripts/mapa-contenido.ts            → todas las rutas + su title
//   npx -y tsx scripts/mapa-contenido.ts aguinaldo  → solo las que mencionan "aguinaldo"
//   npx -y tsx scripts/mapa-contenido.ts --largos   → solo title > 60 o description > 155
//
// Las columnas t/d son los largos del title y la description literales: Google corta el title
// cerca de los 60 caracteres y la description cerca de los 155 (docs/seo/auditoria-2026-10-06.md).
//
// Read-only, NO es un check del moat (no entra a check-all): es una ayuda del Turno.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), "src", "app");

// Recolecta todos los page.tsx bajo src/app.
function paginas(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...paginas(full));
    } else if (entry === "page.tsx") {
      out.push(full);
    }
  }
  return out;
}

// Ruta pública a partir del path del archivo (src/app/x/y/page.tsx → /x/y).
function ruta(file: string): string {
  const rel = relative(APP_DIR, file).replace(/[/\\]page\.tsx$/, "");
  if (rel === "" || rel === "page.tsx") return "/";
  return "/" + rel.split(sep).join("/");
}

// Title de la metadata. Cubre tres formas: literal directo (`title: "..."`), variable
// (`title: titulo` + `const titulo = "..."`), y devuelve "" si no la encuentra.
function title(src: string): string {
  const lit = src.match(/title:\s*\n?\s*["'`]([^"'`]+)["'`]/);
  if (lit) return lit[1].trim();
  const viaVar = src.match(/title:\s*([A-Za-z_$][\w$]*)\s*,/);
  if (viaVar) {
    const def = src.match(
      new RegExp(`const\\s+${viaVar[1]}\\s*[:=][^"'\`]*["'\`]([^"'\`]+)["'\`]`)
    );
    if (def) return def[1].trim();
  }
  return "";
}

function descripcion(src: string): string {
  const m = src.match(/export const metadata[\s\S]*?description:\s*\n?\s*["'`]([^"'`]+)["'`]/);
  return m ? m[1].trim() : "";
}

// Canonical declarado (alternates.canonical), si existe.
function canonical(src: string): string {
  const m = src.match(/canonical:\s*["'`]([^"'`]+)["'`]/);
  return m ? m[1] : "";
}

const soloLargos = process.argv.includes("--largos");
const filtro = (process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "").toLowerCase();

const filas = paginas(APP_DIR)
  .map((f) => {
    const src = readFileSync(f, "utf8");
    return { ruta: ruta(f), title: title(src), descripcion: descripcion(src), canonical: canonical(src) };
  })
  .filter((r) => !r.ruta.includes("[")) // omite rutas dinámicas (programáticas)
  .filter(
    (r) =>
      !filtro ||
      r.ruta.toLowerCase().includes(filtro) ||
      r.title.toLowerCase().includes(filtro)
  )
  .filter((r) => !soloLargos || r.title.length > 60 || r.descripcion.length > 155)
  .sort((a, b) => a.ruta.localeCompare(b.ruta));

const anchoRuta = Math.max(4, ...filas.map((r) => r.ruta.length));

console.log(`\nMapa de contenido · ${filas.length} páginas${filtro ? ` · filtro "${filtro}"` : ""}${soloLargos ? " · solo largos" : ""}\n`);
for (const r of filas) {
  const largos = `t${String(r.title.length).padStart(3)} d${String(r.descripcion.length).padStart(3)}`;
  console.log(`${r.ruta.padEnd(anchoRuta)}  ${largos}  ${r.title || "(sin title literal)"}`);
}
console.log(
  `\nUso: para descartar canibalización antes de un pilar nuevo, filtrá por el tema` +
    `\n(p. ej. "vacaciones") y revisá si una página-herramienta ya apunta a esa query.\n`
);
