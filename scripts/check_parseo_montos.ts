// Falla si una calculadora AR vuelve a leer lo que tipea la persona con Number()/parseFloat()/parseInt()
// en vez de parseMonto()/parseDecimal(), y prueba los parsers con las formas en que se escribe en Argentina.
// Uso: npx tsx scripts/check_parseo_montos.ts
//
// El bug que cuida: Number("1.500.000") es NaN, entonces `Number(x) || 0` calcula en silencio con cero.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";
import {
  errorCantidad,
  errorMonto,
  MONTO_MAXIMO,
  parseDecimal,
  parseMonto,
  primerError,
} from "../src/lib/formato";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const igual = (nombre: string, obtenido: unknown, esperado: unknown) =>
  check(nombre, obtenido === esperado, { obtenido, esperado });

igual('parseMonto("1.500.000")', parseMonto("1.500.000"), 1_500_000);
igual('parseMonto("1.500.000,50")', parseMonto("1.500.000,50"), 1_500_000.5);
igual('parseMonto("$ 250.000")', parseMonto("$ 250.000"), 250_000);
igual('parseMonto("250000")', parseMonto("250000"), 250_000);
igual('parseMonto("0")', parseMonto("0"), 0);
igual('parseMonto("")', parseMonto(""), 0);
igual('parseMonto("1,5")', parseMonto("1,5"), 1.5);
igual('parseMonto("1,500,000")', parseMonto("1,500,000"), 1_500_000);
igual('parseMonto("  12.500  ")', parseMonto("  12.500  "), 12_500);
igual('parseMonto("abc")', parseMonto("abc"), 0);
igual('parseMonto("-5") no se lee como 5', parseMonto("-5"), 0);
igual('parseMonto("$ -250.000") no se lee como 250000', parseMonto("$ -250.000"), 0);
igual('primerError sin errores', primerError({ A: null, B: null }), null);
igual('primerError con etiqueta', primerError({ A: null, "Sueldo": "no puede ser negativo" }), "Sueldo: no puede ser negativo.");
igual('parseDecimal("7,5")', parseDecimal("7,5"), 7.5);
igual('parseDecimal("7.5")', parseDecimal("7.5"), 7.5);
igual('parseDecimal("")', parseDecimal(""), 0);

igual('errorMonto("-5") avisa', typeof errorMonto("-5"), "string");
igual('errorMonto("$ -250.000") avisa', typeof errorMonto("$ -250.000"), "string");
igual('errorMonto("-0") no avisa', errorMonto("-0"), null);
igual('errorMonto("1.500.000") no avisa', errorMonto("1.500.000"), null);
igual('errorMonto("") no avisa', errorMonto(""), null);
igual('errorMonto("1.500.000,50") no avisa', errorMonto("1.500.000,50"), null);
igual('errorMonto("$ 250.000") no avisa', errorMonto("$ 250.000"), null);
igual(
  "errorMonto en el tope exacto no avisa",
  errorMonto(String(MONTO_MAXIMO)),
  null,
);
igual(
  "errorMonto por encima del tope avisa",
  typeof errorMonto(String(MONTO_MAXIMO * 10)),
  "string",
);
igual('errorMonto("9" x 400) avisa', typeof errorMonto("9".repeat(400)), "string");
igual('errorCantidad("-3") avisa', typeof errorCantidad("-3"), "string");
igual('errorCantidad("7,5") no avisa', errorCantidad("7,5"), null);
igual('errorCantidad("48") no avisa', errorCantidad("48"), null);
igual('errorCantidad("999999999") avisa', typeof errorCantidad("999999999"), "string");

const MENSAJES = [errorMonto("-5"), errorMonto("9".repeat(400)), errorCantidad("-3")];
check(
  "los mensajes de error no llevan rayas ni emojis",
  MENSAJES.every((m) => m !== null && !/[–—]/.test(m) && !/\p{Extended_Pictographic}/u.test(m)),
  MENSAJES,
);

const RAIZ = join(__dirname, "..");
const SALTAR = [join("src", "app", "(intl)"), join("src", "app", "api"), join("src", "paises"), join("src", "motor")];

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return SALTAR.includes(relative(RAIZ, p)) ? [] : archivos(p);
    return n.endsWith(".tsx") ? [p] : [];
  });
}

const LECTORES = new Set(["Number", "parseFloat", "parseInt"]);

function raiz(expr: ts.Expression): ts.Expression {
  let e = expr;
  for (;;) {
    if (ts.isParenthesizedExpression(e) || ts.isNonNullExpression(e) || ts.isAsExpression(e)) e = e.expression;
    else if (ts.isCallExpression(e) && ts.isPropertyAccessExpression(e.expression)) e = e.expression.expression;
    else return e;
  }
}

const violaciones: string[] = [];
for (const archivo of archivos(join(RAIZ, "src"))) {
  const texto = readFileSync(archivo, "utf8");
  if (!texto.includes("useState")) continue;
  const fuente = ts.createSourceFile(archivo, texto, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const estadosTexto = new Set<string>();
  const visitarDecl = (n: ts.Node): void => {
    if (
      ts.isVariableDeclaration(n) &&
      ts.isArrayBindingPattern(n.name) &&
      n.initializer &&
      ts.isCallExpression(n.initializer) &&
      n.initializer.expression.getText(fuente) === "useState"
    ) {
      const primero = n.name.elements[0];
      const inicial = n.initializer.arguments[0];
      const esTexto =
        inicial !== undefined &&
        (ts.isStringLiteral(inicial) || ts.isNoSubstitutionTemplateLiteral(inicial) || ts.isTemplateExpression(inicial));
      if (esTexto && primero && ts.isBindingElement(primero) && ts.isIdentifier(primero.name)) {
        estadosTexto.add(primero.name.text);
      }
    }
    ts.forEachChild(n, visitarDecl);
  };
  visitarDecl(fuente);
  if (estadosTexto.size === 0) continue;

  const enInput = new Set<string>();
  const visitarInputs = (n: ts.Node): void => {
    if ((ts.isJsxOpeningElement(n) || ts.isJsxSelfClosingElement(n)) && n.tagName.getText(fuente) === "input") {
      let valor: string | null = null;
      let tipo = "text";
      for (const a of n.attributes.properties) {
        if (!ts.isJsxAttribute(a)) continue;
        const nombre = a.name.getText(fuente);
        const init = a.initializer;
        if (nombre === "value" && init && ts.isJsxExpression(init) && init.expression && ts.isIdentifier(init.expression)) {
          valor = init.expression.text;
        }
        if (nombre === "type" && init && ts.isStringLiteral(init)) tipo = init.text;
      }
      if (valor && ["text", "tel", "search"].includes(tipo)) enInput.add(valor);
    }
    ts.forEachChild(n, visitarInputs);
  };
  visitarInputs(fuente);

  const visitar = (n: ts.Node): void => {
    if (ts.isCallExpression(n) && ts.isIdentifier(n.expression) && LECTORES.has(n.expression.text)) {
      const arg = n.arguments[0];
      if (arg) {
        const base = raiz(arg);
        if (ts.isIdentifier(base) && estadosTexto.has(base.text) && enInput.has(base.text)) {
          const { line } = fuente.getLineAndCharacterOfPosition(n.getStart(fuente));
          violaciones.push(`${relative(RAIZ, archivo)}:${line + 1}  ${n.getText(fuente)}`);
        }
      }
    }
    ts.forEachChild(n, visitar);
  };
  visitar(fuente);
}

check(
  "ninguna calculadora lee un input de texto con Number()/parseFloat()/parseInt()",
  violaciones.length === 0,
  "\n  " + violaciones.join("\n  "),
);

if (fallas > 0) {
  console.error(`\n${fallas} falla(s)`);
  process.exit(1);
}
console.log("\nTodo OK");
