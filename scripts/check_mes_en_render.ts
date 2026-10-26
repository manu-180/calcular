// Falla si algo que depende de la fecha de hoy (el mes vigente de ANSES, el SMVM, la escala de un
// convenio, new Date()) se evalúa a nivel de módulo en calcular.ar. Un módulo se evalúa una vez por
// instancia del servidor y Fluid Compute reutiliza instancias durante horas: lo que se elige ahí
// queda congelado y la revalidación de 1 h regenera la página con el mes viejo. La elección va
// dentro de la función que renderiza. Uso suelto: `npx tsx scripts/check_mes_en_render.ts <filtro>`.
//
// Análisis estático simple: parte de unas funciones semilla, arma qué funciones de src/ las llaman
// (transitivo, resolviendo cada llamada por archivo e imports) y marca toda llamada a una de ellas que
// esté fuera de cualquier función.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, posix, relative } from "node:path";
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
const relsSrc = new Set(todas.map((f) => f.rel));

// Cada función se identifica por archivo y nombre («src/x.ts#f»), no solo por nombre: hay muchas
// funciones homónimas (resolver(), textosDe(), grilla()) y mezclarlas hacía que, por ejemplo, el
// resolver() de los diccionarios heredara el reloj del resolver() de sueldo-en-el-mundo/mundo-ar.tsx.
// Una llamada se resuelve en el archivo donde está: primero una función de ese archivo, después el
// import (siguiendo re-exports). Lo que no se puede resolver así (métodos `obj.f()`, funciones que
// llegan por parámetro, imports que no apuntan a una función) sigue con el criterio viejo, por
// nombre: el check no se afloja donde no puede probar a quién se llama.
type Clave = string;
const clave = (rel: string, nombre: string): Clave => `${rel}#${nombre}`;
const nombreDe = (c: Clave) => c.slice(c.lastIndexOf("#") + 1);

type Importado = { desde: string | null; nombre: string };
type Modulo = {
  funciones: Set<string>;
  importaciones: Map<string, Importado>;
  exportaLocal: Map<string, string>;
  reexporta: Map<string, Importado>;
  reexportaTodo: (string | null)[];
};

/** Archivo de src/ al que apunta un import, o null si es externo (un paquete, css, json). */
function resolverModulo(desde: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = `src/${spec.slice(2)}`;
  else if (spec.startsWith(".")) base = posix.normalize(posix.join(posix.dirname(desde), spec));
  else return null;
  for (const c of [base, `${base}.ts`, `${base}.tsx`, `${base}/index.ts`, `${base}/index.tsx`]) if (relsSrc.has(c)) return c;
  return null;
}

const modulos = new Map<string, Modulo>();
const porNombre = new Map<string, Set<Clave>>();

function nombreDuenio(n: ts.Node): string | null {
  if (ts.isFunctionDeclaration(n) && n.name) return n.name.text;
  if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer && (ts.isArrowFunction(n.initializer) || ts.isFunctionExpression(n.initializer))) return n.name.text;
  return null;
}

function tieneModificador(s: ts.Node, k: ts.SyntaxKind): boolean {
  return ts.canHaveModifiers(s) && (ts.getModifiers(s) ?? []).some((x) => x.kind === k);
}

for (const { rel, sf } of todas) {
  const m: Modulo = { funciones: new Set(), importaciones: new Map(), exportaLocal: new Map(), reexporta: new Map(), reexportaTodo: [] };
  modulos.set(rel, m);
  const juntar = (n: ts.Node) => {
    const nombre = nombreDuenio(n);
    if (nombre) {
      m.funciones.add(nombre);
      if (!porNombre.has(nombre)) porNombre.set(nombre, new Set());
      porNombre.get(nombre)!.add(clave(rel, nombre));
    }
    ts.forEachChild(n, juntar);
  };
  juntar(sf);
  for (const s of sf.statements) {
    const exportada = tieneModificador(s, ts.SyntaxKind.ExportKeyword);
    if (ts.isImportDeclaration(s) && ts.isStringLiteral(s.moduleSpecifier) && s.importClause) {
      const desde = resolverModulo(rel, s.moduleSpecifier.text);
      const c = s.importClause;
      if (c.name) m.importaciones.set(c.name.text, { desde, nombre: "default" });
      if (c.namedBindings && ts.isNamespaceImport(c.namedBindings)) m.importaciones.set(c.namedBindings.name.text, { desde, nombre: "*" });
      if (c.namedBindings && ts.isNamedImports(c.namedBindings)) {
        for (const e of c.namedBindings.elements) m.importaciones.set(e.name.text, { desde, nombre: (e.propertyName ?? e.name).text });
      }
    } else if (ts.isExportDeclaration(s)) {
      const desde = s.moduleSpecifier && ts.isStringLiteral(s.moduleSpecifier) ? resolverModulo(rel, s.moduleSpecifier.text) : undefined;
      if (!s.exportClause) {
        if (desde !== undefined) m.reexportaTodo.push(desde);
      } else if (ts.isNamedExports(s.exportClause)) {
        for (const e of s.exportClause.elements) {
          const original = (e.propertyName ?? e.name).text;
          if (desde === undefined) m.exportaLocal.set(e.name.text, original);
          else m.reexporta.set(e.name.text, { desde, nombre: original });
        }
      }
    } else if (ts.isExportAssignment(s) && ts.isIdentifier(s.expression)) {
      m.exportaLocal.set("default", s.expression.text);
    } else if (ts.isFunctionDeclaration(s) && s.name && exportada) {
      m.exportaLocal.set(tieneModificador(s, ts.SyntaxKind.DefaultKeyword) ? "default" : s.name.text, s.name.text);
    } else if (ts.isVariableStatement(s) && exportada) {
      for (const d of s.declarationList.declarations) if (ts.isIdentifier(d.name)) m.exportaLocal.set(d.name.text, d.name.text);
    }
  }
}

/** Funciones a las que apunta el export `nombre` de `rel`, o null si no es una función de src/ identificable. */
function resolverExport(rel: string, nombre: string, visto = new Set<string>()): Set<Clave> | null {
  const k = `${rel}>${nombre}`;
  if (visto.has(k)) return null;
  visto.add(k);
  const m = modulos.get(rel);
  if (!m) return null;
  const local = m.exportaLocal.get(nombre);
  if (local !== undefined) {
    if (m.funciones.has(local)) return new Set([clave(rel, local)]);
    const imp = m.importaciones.get(local);
    if (imp?.desde && imp.nombre !== "*") return resolverExport(imp.desde, imp.nombre, visto);
    return null;
  }
  const re = m.reexporta.get(nombre);
  if (re) return re.desde ? resolverExport(re.desde, re.nombre, visto) : null;
  if (nombre === "default") return null;
  for (const d of m.reexportaTodo) {
    if (!d) continue;
    const r = resolverExport(d, nombre, visto);
    if (r) return r;
  }
  return null;
}

/** A quién llama `e` desde `rel`: funciones concretas, un nombre suelto (criterio viejo) o nada de src/. */
type Destino = { claves: Set<Clave> } | { nombre: string } | null;
function destino(rel: string, e: ts.Expression): Destino {
  const m = modulos.get(rel)!;
  if (ts.isIdentifier(e)) {
    const n = e.text;
    if (m.funciones.has(n)) return { claves: new Set([clave(rel, n)]) };
    const imp = m.importaciones.get(n);
    if (imp) {
      if (!imp.desde) return null; // un paquete externo: no es código de src/
      if (imp.nombre === "*") return { nombre: n };
      const r = resolverExport(imp.desde, imp.nombre);
      return r ? { claves: r } : { nombre: imp.nombre };
    }
    return { nombre: n };
  }
  if (ts.isPropertyAccessExpression(e)) {
    const obj = e.expression;
    if (ts.isIdentifier(obj)) {
      const imp = m.importaciones.get(obj.text);
      if (imp && imp.nombre === "*") {
        if (!imp.desde) return null;
        const r = resolverExport(imp.desde, e.name.text);
        if (r) return { claves: r };
      }
    }
    return { nombre: e.name.text };
  }
  return null;
}

// Fase 1: qué llama cada función con nombre (declaración, o const = flecha).
const llamadas = new Map<Clave, Destino[]>();
const lee = new Set<Clave>();

function recolectar(rel: string, n: ts.Node, dueno: Clave | null) {
  const propio = nombreDuenio(n);
  const nuevoDueno = propio ? clave(rel, propio) : dueno;
  if (nuevoDueno) {
    if (ts.isCallExpression(n)) {
      const d = destino(rel, n.expression);
      if (d) {
        if (!llamadas.has(nuevoDueno)) llamadas.set(nuevoDueno, []);
        llamadas.get(nuevoDueno)!.push(d);
      }
    }
    if (leeElReloj(n)) lee.add(nuevoDueno);
  }
  ts.forEachChild(n, (h) => recolectar(rel, h, nuevoDueno));
}
for (const { rel, sf } of todas) recolectar(rel, sf, null);

// Fase 2: cierre transitivo. Las semillas y las excepciones valen por nombre.
const dependen = new Set<Clave>();
const porque = new Map<Clave, string>();
for (const [nombre, claves] of porNombre) {
  if (EXCEPCIONES.has(nombre)) continue;
  for (const c of claves) {
    if (lee.has(c)) porque.set(c, "lee el reloj");
    if (lee.has(c) || SEMILLAS.has(nombre)) dependen.add(c);
  }
}

/** La función dependiente a la que lleva un destino (o el nombre, si es una semilla sin definición en src/). */
function dependiente(d: Destino): Clave | null {
  if (!d) return null;
  if ("claves" in d) {
    for (const c of d.claves) if (dependen.has(c)) return c;
    return null;
  }
  if (EXCEPCIONES.has(d.nombre)) return null;
  for (const c of porNombre.get(d.nombre) ?? []) if (dependen.has(c)) return c;
  return SEMILLAS.has(d.nombre) ? d.nombre : null;
}

for (let cambio = true; cambio; ) {
  cambio = false;
  for (const [fn, destinos] of llamadas) {
    if (dependen.has(fn) || EXCEPCIONES.has(nombreDe(fn))) continue;
    for (const d of destinos) {
      const causa = dependiente(d);
      if (causa) {
        dependen.add(fn);
        porque.set(fn, causa);
        cambio = true;
        break;
      }
    }
  }
}

function cadena(desde: Clave): string {
  const pasos: string[] = [];
  for (let f = porque.get(desde); f && pasos.length < 6; f = porque.get(f)) pasos.push(f === "lee el reloj" ? f : `${nombreDe(f)}()`);
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
        const causa = dependiente(destino(rel, n.expression));
        if (causa) que = `${nombreDe(causa)}()${cadena(causa)}`;
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
