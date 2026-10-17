// Falla si algo que depende de la fecha de hoy (el mes vigente de ANSES, el SMVM, la escala de un
// convenio, new Date()) se evalúa a nivel de módulo en calcular.ar. Un módulo se evalúa una vez por
// instancia del servidor y Fluid Compute reutiliza instancias durante horas: lo que se elige ahí
// queda congelado y la revalidación de 1 h regenera la página con el mes viejo. La elección va
// dentro de la función que renderiza. Uso suelto: `npx tsx scripts/check_mes_en_render.ts <filtro>`.
//
// Análisis estático simple: parte de unas funciones semilla, arma por nombre qué funciones de src/
// las llaman (transitivo) y marca toda llamada a una de ellas que esté fuera de cualquier función.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

const RAIZ = join(__dirname, "..");
const DIRS_REVISADAS = ["src/app/(ar)", "src/components", "src/data", "src/lib"];

const SEMILLAS = new Set([
  "hoyAR",
  "hoyDelBuild",
  "periodoActualAR",
  "vigenteEn",
  "smvmVigente",
  "mesVigente",
  "prestacionesVigentes",
  "bonoVigente",
  "resolucionProxima",
  "mesPrevisionalSinBono",
  "asignacionesVigentes",
  "asignacionesProximas",
  "asignacionesMesAnterior",
  "escalaVigente",
  "vigenciaCasas",
]);

// Funciones que por nombre parecen depender de la fecha pero reciben el dato por parámetro o no lo
// toman de hoy. Cada una con su motivo.
const EXCEPCIONES = new Map<string, string>([
  ["anio", "etiqueta de año (no de mes) de los productos y textos de calcularya; cambia una vez por año"],
  ["hace", "datos de ejemplo del dashboard: la antigüedad relativa de unas filas de muestra no es un dato vigente"],
]);

const esFuncion = (n: ts.Node) =>
  ts.isFunctionDeclaration(n) ||
  ts.isFunctionExpression(n) ||
  ts.isArrowFunction(n) ||
  ts.isMethodDeclaration(n) ||
  ts.isConstructorDeclaration(n) ||
  ts.isGetAccessorDeclaration(n) ||
  ts.isSetAccessorDeclaration(n);

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return n === "node_modules" ? [] : archivos(p);
    return /\.tsx?$/.test(n) ? [p] : [];
  });
}

function nombreLlamado(e: ts.Expression): string | null {
  if (ts.isIdentifier(e)) return e.text;
  if (ts.isPropertyAccessExpression(e)) return e.name.text;
  return null;
}

/** "ahora" sin argumentos: new Date() y Date.now(). */
function leeElReloj(n: ts.Node): boolean {
  if (ts.isNewExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === "Date") return (n.arguments?.length ?? 0) === 0;
  if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression)) {
    const { expression: obj, name } = n.expression;
    return ts.isIdentifier(obj) && obj.text === "Date" && name.text === "now";
  }
  return false;
}

type Fuente = { rel: string; sf: ts.SourceFile };

const todas: Fuente[] = archivos(join(RAIZ, "src")).map((f) => ({
  rel: relative(RAIZ, f).replace(/\\/g, "/"),
  sf: ts.createSourceFile(f, readFileSync(f, "utf8"), ts.ScriptTarget.Latest, true, f.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS),
}));

// Fase 1: qué llama cada función con nombre (declaración, o const = flecha).
const llamadas = new Map<string, Set<string>>();
const lee = new Set<string>();

function recolectar(n: ts.Node, dueno: string | null) {
  let nuevoDueno = dueno;
  if (ts.isFunctionDeclaration(n) && n.name) nuevoDueno = n.name.text;
  else if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer && (ts.isArrowFunction(n.initializer) || ts.isFunctionExpression(n.initializer))) nuevoDueno = n.name.text;
  if (nuevoDueno) {
    if (ts.isCallExpression(n)) {
      const nombre = nombreLlamado(n.expression);
      if (nombre) {
        if (!llamadas.has(nuevoDueno)) llamadas.set(nuevoDueno, new Set());
        llamadas.get(nuevoDueno)!.add(nombre);
      }
    }
    if (leeElReloj(n)) lee.add(nuevoDueno);
  }
  ts.forEachChild(n, (h) => recolectar(h, nuevoDueno));
}
for (const { sf } of todas) recolectar(sf, null);

// Fase 2: cierre transitivo.
const dependen = new Set<string>([...SEMILLAS, ...lee].filter((f) => !EXCEPCIONES.has(f)));
const porque = new Map<string, string>([...dependen].filter((f) => lee.has(f)).map((f) => [f, "lee el reloj"]));
for (let cambio = true; cambio; ) {
  cambio = false;
  for (const [fn, llamados] of llamadas) {
    if (dependen.has(fn) || EXCEPCIONES.has(fn)) continue;
    const causa = [...llamados].find((c) => dependen.has(c));
    if (causa) {
      dependen.add(fn);
      porque.set(fn, causa);
      cambio = true;
    }
  }
}

function cadena(nombre: string): string {
  const pasos: string[] = [];
  for (let f = porque.get(nombre); f && pasos.length < 6; f = porque.get(f)) pasos.push(f === "lee el reloj" ? f : `${f}()`);
  return pasos.length ? ` [vía ${pasos.join(" > ")}]` : "";
}

// Fase 3: llamadas a nivel de módulo en las carpetas revisadas.
const filtro = process.argv[2];
const hallazgos: string[] = [];
let revisados = 0;

for (const { rel, sf } of todas) {
  if (!DIRS_REVISADAS.some((d) => rel.startsWith(d + "/"))) continue;
  if (filtro && !rel.includes(filtro)) continue;
  revisados++;
  const visitar = (n: ts.Node, enFuncion: boolean, declaracion: string) => {
    if (!enFuncion) {
      let que: string | null = null;
      if (ts.isCallExpression(n)) {
        const nombre = nombreLlamado(n.expression);
        if (nombre && dependen.has(nombre)) que = `${nombre}()${cadena(nombre)}`;
      }
      if (!que && leeElReloj(n)) que = "la hora actual (new Date() / Date.now())";
      if (que) {
        const { line } = sf.getLineAndCharacterOfPosition(n.getStart(sf));
        hallazgos.push(`${rel}:${line + 1}  ${que} a nivel de módulo${declaracion ? ` (en ${declaracion})` : ""}`);
      }
    }
    ts.forEachChild(n, (h) => visitar(h, enFuncion || esFuncion(n), declaracion));
  };
  for (const sentencia of sf.statements) {
    const declaracion = ts.isVariableStatement(sentencia)
      ? sentencia.declarationList.declarations.map((d) => d.name.getText(sf)).join(", ")
      : "";
    visitar(sentencia, false, declaracion);
  }
}

if (revisados === 0) {
  console.error("check_mes_en_render: no revisó ningún archivo, revisar DIRS_REVISADAS.");
  process.exit(1);
}

if (hallazgos.length) {
  console.error(`check_mes_en_render: ${hallazgos.length} evaluación(es) que fijan la fecha al cargar el módulo:\n`);
  for (const h of hallazgos) console.error(`  ${h}`);
  console.error("\nMové la elección adentro de la función que renderiza (o convertí la constante en una función).");
  process.exit(1);
}

console.log(`check_mes_en_render: ${revisados} archivos, ${dependen.size} funciones que dependen de hoy, ninguna evaluada a nivel de módulo.`);
