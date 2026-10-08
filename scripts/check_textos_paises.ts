// Textos de los países (docs/GUIA-REDACCION.md): sin rayas, sin emojis, sin muletillas de robot,
// trato según el mercado (nada de voseo argentino en un mercado de tú o usted, nada de tú en uno de
// usted) y largo de title (60) y description (160) ya con los marcadores {{ }} resueltos.
// Revisa strings de .ts/.tsx (con el AST, así no mira comentarios ni imports) y valores de los JSON.
// Uso: npx tsx scripts/check_textos_paises.ts [mercado]. PAISES_TOLERANTE=1 baja a aviso el largo de
// un title o description que depende del valor del día; raya, voseo y demás siguen rojos.
import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { marcadoresDe, rellenarContenido, resolverValores } from "../src/motor/registro";
import type { Trato, Unidad } from "../src/motor/tipos";
import { hoyEn } from "../src/motor/vigencia";
import { archivosBajo, cargarPaises, DIR_PAISES, rel } from "./paises_comun";

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;
const RAYA = /[–—]/;
const GUION_PAUSA = /[a-záéíóúñ)] - [a-záéíóúñ(]/i;
const EMOJI = /\p{Extended_Pictographic}/u;
const MULETILLAS = [
  "cabe destacar",
  "es importante mencionar",
  "es importante destacar",
  "en este sentido",
  "a continuación",
  "asimismo",
  "no obstante",
  "en resumen",
  "sin lugar a dudas",
  "te contamos",
  "le contamos",
];
const PROSA = /[\sA-ZÁÉÍÓÚÑ¿¡]|[áéíóúñ]/;
const CLAVES_NO_TEXTO = new Set(["id", "url", "desde", "hasta", "fecha", "verificadoEl", "estado", "tipo", "unidad", "region", "regiones", "mercado", "nivel", "aplicaA", "frecuencia", "proximaRevision"]);

const PALABRA = /[a-záéíóúüñ]+/gi;
// Formas del voseo rioplatense. Las terminadas en -ás/-és/-ís se detectan por patrón; estas son
// palabras de todo el español que terminan igual y no son voseo.
const NO_VOSEO = new Set([
  "además", "atrás", "detrás", "jamás", "quizás", "demás", "más", "compás", "tomás", "goiás", "mamás", "papás", "sofás", "satanás",
  "interés", "después", "través", "inglés", "francés", "portugués", "holandés", "japonés", "irlandés", "escocés", "cortés", "marqués",
  "estrés", "revés", "ciempiés", "bebés", "cafés", "comités", "vaupés", "moisés", "andrés", "inés", "ginés", "bufés", "clichés", "chalés",
  "país", "maíz", "raíz", "anís", "parís", "lis", "adiós", "dieciséis", "veintiséis", "seis",
]);
const IMPERATIVO_VOS = new Set([
  "calculá", "ingresá", "completá", "revisá", "mirá", "fijate", "tené", "poné", "hacé", "decí", "elegí", "escribí", "pedí", "salí", "vení",
  "consultá", "descargá", "cargá", "indicá", "seleccioná", "probá", "usá", "sumá", "restá", "tocá", "averiguá", "guardá", "compará", "simulá",
  "presioná", "andá", "leé", "sabé", "mové", "volvé", "acordate", "anotate", "registrate", "enterate", "olvidate", "suscribite", "contá",
  "pagá", "cobrá", "sacá", "dejá", "llamá", "esperá", "agregá", "cambiá", "buscá", "abrí", "recibí", "viví", "compartí", "imprimí",
]);
const PRONOMBRES_VOS = new Set(["vos", "sos"]);
// «estás» y el futuro («recibirás», «podrás») son iguales en tú y en vos. Se aceptan aunque así se
// escape algún presente voseante con raíz en -ar/-er/-ir («comparás»): el imperativo, que es lo que
// más aparece en una calculadora, lo sigue atrapando IMPERATIVO_VOS.
const FUTURO_O_TU = /^(?:estás|estés|harás|dirás|sabrás|habrás|cabrás)$|(?:arás|erás|irás|drás)$/;
const FORMAS_TU = new Set(["tú", "tu", "tus", "te", "ti", "contigo", "tienes", "puedes", "debes", "quieres", "sabes", "necesitas", "eres", "estás", "cobras", "ganas", "trabajas", "recibes", "pagas"]);
const FORMAS_TU_EN_VOS = new Set(["tienes", "puedes", "debes", "quieres", "sabes", "eres"]);

function problemasDeTrato(texto: string, trato: Trato): string[] {
  const p: string[] = [];
  for (const m of texto.matchAll(PALABRA)) {
    const w = m[0].toLowerCase();
    if (trato !== "vos") {
      const voseo = PRONOMBRES_VOS.has(w) || IMPERATIVO_VOS.has(w) || (/(?:ás|és|ís)$/.test(w) && w.length > 3 && !NO_VOSEO.has(w) && !FUTURO_O_TU.test(w));
      if (voseo) p.push(`voseo «${m[0]}» en un mercado de ${trato}`);
    }
    if (trato === "usted" && FORMAS_TU.has(w)) p.push(`«${m[0]}» es de tú y el mercado es de usted`);
    if (trato === "vos" && FORMAS_TU_EN_VOS.has(w)) p.push(`«${m[0]}» es de tú y el mercado es de vos`);
    if (trato === "tu" && w === "usted") p.push(`«usted» en un mercado de tú`);
    if (/(?:áis|éis)$/.test(w) && w !== "dieciséis" && w !== "veintiséis") p.push(`«${m[0]}» es de vosotros (España)`);
  }
  return p;
}

function problemasDeTexto(texto: string, trato: Trato): string[] {
  const p: string[] = [];
  if (RAYA.test(texto)) p.push("raya («—» o «–»): usá paréntesis o dos oraciones");
  if (GUION_PAUSA.test(texto)) p.push("guion como pausa ( - ): usá paréntesis o dos oraciones");
  if (EMOJI.test(texto)) p.push("emoji");
  const bajo = texto.toLowerCase();
  for (const mul of MULETILLAS) if (bajo.includes(mul)) p.push(`muletilla «${mul}»`);
  return [...p, ...problemasDeTrato(texto, trato)];
}

function textosTs(archivo: string): { texto: string; linea: number }[] {
  const fuente = readFileSync(archivo, "utf8");
  const sf = ts.createSourceFile(archivo, fuente, ts.ScriptTarget.Latest, true, archivo.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const salida: { texto: string; linea: number }[] = [];
  const linea = (n: ts.Node) => sf.getLineAndCharacterOfPosition(n.getStart()).line + 1;
  const visitar = (n: ts.Node) => {
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) return;
    if (ts.isPropertyAssignment(n) && (ts.isStringLiteral(n.name) || ts.isIdentifier(n.name)) && CLAVES_NO_TEXTO.has(n.name.text)) return;
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      if (!(ts.isPropertyAssignment(n.parent) && n.parent.name === n) && !ts.isLiteralTypeNode(n.parent)) salida.push({ texto: n.text, linea: linea(n) });
    } else if (ts.isTemplateExpression(n)) {
      salida.push({ texto: [n.head.text, ...n.templateSpans.map((s) => s.literal.text)].join(" "), linea: linea(n) });
    } else if (ts.isJsxText(n) && n.text.trim()) {
      salida.push({ texto: n.text, linea: linea(n) });
    }
    ts.forEachChild(n, visitar);
  };
  visitar(sf);
  return salida;
}

function textosJson(valor: unknown, ruta: string, salida: { texto: string; linea: string }[]) {
  if (typeof valor === "string") salida.push({ texto: valor, linea: ruta });
  else if (Array.isArray(valor)) valor.forEach((v, i) => textosJson(v, `${ruta}[${i}]`, salida));
  else if (valor && typeof valor === "object") {
    for (const [k, v] of Object.entries(valor)) if (!CLAVES_NO_TEXTO.has(k)) textosJson(v, ruta ? `${ruta}.${k}` : k, salida);
  }
}

async function main() {
  const filtro = process.argv[2];
  const tolerante = process.env.PAISES_TOLERANTE === "1";
  const fallas: string[] = [];
  const avisos: string[] = [];
  let revisados = 0;
  for (const { carpeta, pais } of await cargarPaises()) {
    if (filtro && carpeta !== filtro) continue;
    if (!pais) continue;
    const trato = pais.mercado.trato;
    const dir = path.join(DIR_PAISES, carpeta);
    for (const archivo of archivosBajo(dir, /\.(tsx?|json)$/)) {
      if (/\.casos\.ts$/.test(archivo)) continue;
      const lista: { texto: string; linea: number | string }[] = archivo.endsWith(".json") ? [] : textosTs(archivo);
      if (archivo.endsWith(".json")) {
        const salida: { texto: string; linea: string }[] = [];
        textosJson(JSON.parse(readFileSync(archivo, "utf8")), "", salida);
        lista.push(...salida);
      }
      for (const { texto, linea } of lista) {
        if (!PROSA.test(texto)) continue;
        revisados++;
        for (const p of problemasDeTexto(texto, trato)) fallas.push(`${rel(archivo)}:${linea}: ${p} en «${texto.trim().slice(0, 70)}»`);
      }
    }
    const unidades: Record<string, Unidad> = {};
    for (const d of pais.datos) unidades[d.id] = d.unidad;
    for (const s of pais.series) unidades[s.id] = s.unidad;
    const hoy = hoyEn(pais.mercado);
    for (const { definicion, contenido } of pais.calculadoras) {
      const r = resolverValores(pais, definicion, hoy);
      const c = r.ok ? rellenarContenido(contenido, { valores: r.valores, usados: r.usados, unidades, locale: pais.mercado.locale }) : contenido;
      // Un title con {{ }} cambia de largo con el valor del día: con PAISES_TOLERANTE=1 eso es aviso.
      // Sin marcadores el largo es estructura y sigue rojo.
      const delDia = (t: string) => tolerante && marcadoresDe(t).length > 0;
      if (c.title.length > MAX_TITLE) (delDia(contenido.title) ? avisos : fallas).push(`${definicion.id}: title de ${c.title.length} caracteres (máximo ${MAX_TITLE}): «${c.title}»`);
      if (c.description.length > MAX_DESCRIPTION) (delDia(contenido.description) ? avisos : fallas).push(`${definicion.id}: description de ${c.description.length} caracteres (máximo ${MAX_DESCRIPTION})`);
    }
  }
  for (const a of avisos) console.log(`⚠️  ${a}`);
  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS` : `TODO OK: ${revisados} textos revisados, ${avisos.length} avisos`);
  process.exit(fallas.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
