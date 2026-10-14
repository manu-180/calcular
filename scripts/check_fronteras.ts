// Fronteras de imports (ADR 0001, D1): lo internacional tiene que poder irse a otro proyecto tal cual.
// - Un país (src/paises/<m>, scripts/paises/<m>) solo importa de sí mismo, de src/motor y de react.
//   Una edición (src/paises/ca-fr) también importa de su país base (src/paises/ca), nunca al revés.
// - El motor no importa de ningún país ni de lo de Argentina (src/lib, src/data, src/app, src/components).
// - Argentina (src/lib, src/data, src/components y src/app fuera de (intl) y api) no importa
//   el interior de un país (src/paises/<m>/...). El registro src/paises y el motor sí, para hreflang.
// Se leen los imports con el AST de TypeScript: import, export from, import() y require().
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { archivosBajo, RAIZ, rel } from "./paises_comun";

const SRC = path.join(RAIZ, "src");
// Puentes hacia la capa de cobro intl (src/lib/pagos/*-intl, src/lib/prefill/intl*, src/lib/rastreo): viven
// bajo src/lib por compartir Supabase y PayPal con AR, pero no son código argentino. Solo estos archivos
// pueden cruzar, y solo a esos módulos; cualquier otro cruce sigue siendo falla.
const PUENTES_INTL: Record<string, RegExp> = {
  "src/motor/ui/Oferta.tsx": /^src\/lib\/(pagos\/[a-z-]*intl[a-z-]*|prefill\/intl(-cliente)?|rastreo)(\.tsx?)?$/,
  "scripts/paises/gen_planillas_intl.ts": /^src\/lib\/pagos\/[a-z-]*intl[a-z-]*(\.tsx?)?$/,
};
function puente(archivo: string, destino: string): boolean {
  const re = PUENTES_INTL[rel(archivo).split(path.sep).join("/")];
  return !!re && re.test(rel(destino).split(path.sep).join("/"));
}
const EXT = /\.(tsx?|mts|cts|jsx?)$/;
const PAQUETES_PAIS = new Set(["react"]);

function importsDe(archivo: string): { espec: string; linea: number }[] {
  const texto = readFileSync(archivo, "utf8");
  const sf = ts.createSourceFile(archivo, texto, ts.ScriptTarget.Latest, true, archivo.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const salida: { espec: string; linea: number }[] = [];
  const agregar = (n: ts.Node, lit: ts.Expression | undefined) => {
    if (lit && ts.isStringLiteralLike(lit)) salida.push({ espec: lit.text, linea: sf.getLineAndCharacterOfPosition(n.getStart()).line + 1 });
  };
  const visitar = (n: ts.Node) => {
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) agregar(n, n.moduleSpecifier);
    else if (ts.isImportEqualsDeclaration(n) && ts.isExternalModuleReference(n.moduleReference)) agregar(n, n.moduleReference.expression);
    else if (ts.isCallExpression(n) && (n.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(n.expression) && n.expression.text === "require"))) agregar(n, n.arguments[0]);
    else if (ts.isImportTypeNode(n) && ts.isLiteralTypeNode(n.argument)) agregar(n, n.argument.literal as ts.Expression);
    ts.forEachChild(n, visitar);
  };
  visitar(sf);
  return salida;
}

function resolver(desde: string, espec: string): { tipo: "local"; ruta: string } | { tipo: "paquete"; nombre: string } {
  if (espec.startsWith("@/")) return { tipo: "local", ruta: path.join(SRC, espec.slice(2)) };
  if (espec.startsWith(".")) return { tipo: "local", ruta: path.resolve(path.dirname(desde), espec) };
  const partes = espec.split("/");
  return { tipo: "paquete", nombre: espec.startsWith("@") ? partes.slice(0, 2).join("/") : partes[0] };
}

const dentro = (ruta: string, dir: string) => {
  const r = path.relative(dir, ruta);
  return r === "" || (!r.startsWith("..") && !path.isAbsolute(r));
};

function paisDe(ruta: string): string | null {
  for (const base of [path.join(SRC, "paises"), path.join(RAIZ, "scripts", "paises")]) {
    if (dentro(ruta, base)) {
      const primero = path.relative(base, ruta).split(path.sep)[0];
      return primero && !EXT.test(primero) ? primero : null;
    }
  }
  return null;
}

const AR = ["lib", "data", "app", "components"].map((d) => path.join(SRC, d));
const esAR = (ruta: string) => AR.some((d) => dentro(ruta, d));
const esIntlApp = (ruta: string) => dentro(ruta, path.join(SRC, "app", "(intl)")) || dentro(ruta, path.join(SRC, "app", "api"));

const fallas: string[] = [];
let revisados = 0;

const paisesYScripts = [...archivosBajo(path.join(SRC, "paises"), EXT), ...archivosBajo(path.join(RAIZ, "scripts", "paises"), EXT)];
for (const archivo of paisesYScripts) {
  revisados++;
  const propio = paisDe(archivo);
  for (const { espec, linea } of importsDe(archivo)) {
    const r = resolver(archivo, espec);
    const donde = `${rel(archivo)}:${linea} importa "${espec}"`;
    if (r.tipo === "paquete") {
      const enScripts = rel(archivo).startsWith("scripts/");
      if (propio && !enScripts && !PAQUETES_PAIS.has(r.nombre)) fallas.push(`${donde}: el código de un país en src solo usa el motor (y react en el cliente)`);
      continue;
    }
    if (propio === null) {
      if (esAR(r.ruta) && !puente(archivo, r.ruta)) fallas.push(`${donde}: el registro de países no importa código de Argentina`);
      continue;
    }
    const otro = paisDe(r.ruta);
    const deSuBase = otro !== null && propio.includes("-") && otro === propio.split("-")[0];
    if (otro !== null && otro !== propio && !deSuBase) fallas.push(`${donde}: un país no importa de otro país (${otro})`);
    // Los scripts de prueba de un país usan el mismo Http que el cron para probar sus detectores igual que en producción.
    else if (otro === null && !dentro(r.ruta, path.join(SRC, "motor")) && !(rel(archivo).startsWith("scripts/") && dentro(r.ruta, path.join(RAIZ, "scripts", "datos-paises", "lib")))) fallas.push(`${donde}: un país solo importa de su carpeta y de src/motor`);
  }
}

for (const archivo of archivosBajo(path.join(SRC, "motor"), EXT)) {
  revisados++;
  for (const { espec, linea } of importsDe(archivo)) {
    const r = resolver(archivo, espec);
    const donde = `${rel(archivo)}:${linea} importa "${espec}"`;
    if (r.tipo === "paquete") {
      if (r.nombre !== "react" && !espec.startsWith("node:")) fallas.push(`${donde}: el motor no suma dependencias`);
      continue;
    }
    if (dentro(r.ruta, path.join(SRC, "paises"))) fallas.push(`${donde}: el motor no importa de src/paises (recibe el registro como parámetro)`);
    else if (esAR(r.ruta) && !puente(archivo, r.ruta)) fallas.push(`${donde}: el motor no importa código de Argentina`);
    else if (!dentro(r.ruta, path.join(SRC, "motor")) && !puente(archivo, r.ruta)) fallas.push(`${donde}: el motor solo importa de src/motor`);
  }
}

for (const dir of AR) {
  for (const archivo of archivosBajo(dir, EXT)) {
    if (esIntlApp(archivo)) continue;
    revisados++;
    for (const { espec, linea } of importsDe(archivo)) {
      const r = resolver(archivo, espec);
      if (r.tipo !== "local") continue;
      if (paisDe(r.ruta) !== null) fallas.push(`${rel(archivo)}:${linea} importa "${espec}": Argentina no importa el interior de un país (usá el registro de src/paises)`);
    }
  }
}

if (!existsSync(path.join(SRC, "motor"))) fallas.push("no existe src/motor");
for (const f of fallas) console.error(`❌ ${f}`);
console.log(fallas.length ? `${fallas.length} FALLAS en ${revisados} archivos` : `TODO OK: ${revisados} archivos sin cruces de frontera`);
process.exit(fallas.length ? 1 : 0);
