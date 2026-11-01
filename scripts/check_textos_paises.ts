// Textos de los países (docs/GUIA-REDACCION.md) con las reglas del idioma de cada mercado
// (scripts/reglas_idioma.ts): rayas, emojis y, en español, muletillas y trato; en los demás idiomas,
// exclamaciones de vendedor y registro. Además, largo de title (60) y description (160) ya con los
// marcadores {{ }} resueltos.
// Revisa strings de .ts/.tsx (con el AST, así no mira comentarios ni imports) y valores de los JSON.
// Uso: npx tsx scripts/check_textos_paises.ts [mercado]. PAISES_TOLERANTE=1 baja a aviso el largo de
// un title o description que depende del valor del día; raya, voseo y demás siguen rojos.
import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { anchoVisual } from "../src/motor/ancho";
import { marcadoresDe, rellenarContenido, resolverValores } from "../src/motor/registro";
import type { Unidad } from "../src/motor/tipos";
import { hoyEn } from "../src/motor/vigencia";
import { archivosBajo, cargarPaises, DIR_PAISES, rel } from "./paises_comun";
import { problemasDeTexto } from "./reglas_idioma";

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;
const PROSA = /[\s\p{Lu}¿¡]|[áéíóúñàâçèêëîïôûùüäößãõœ]|[\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}\p{sc=Hangul}]/u;
const CLAVES_NO_TEXTO = new Set(["id", "url", "desde", "hasta", "fecha", "verificadoEl", "estado", "tipo", "unidad", "region", "regiones", "mercado", "nivel", "aplicaA", "frecuencia", "proximaRevision"]);

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
    const { idioma, trato } = pais.mercado;
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
        for (const p of problemasDeTexto(texto, idioma, trato, pais.mercado.locale)) fallas.push(`${rel(archivo)}:${linea}: ${p} en «${texto.trim().slice(0, 70)}»`);
      }
    }
    const unidades: Record<string, Unidad> = {};
    for (const d of pais.datos) unidades[d.id] = d.unidad;
    for (const s of pais.series) unidades[s.id] = s.unidad;
    const hoy = hoyEn(pais.mercado);
    for (const { definicion, contenido } of pais.calculadoras) {
      const r = resolverValores(pais, definicion, hoy);
      // Sin datos resueltos igual se rellena: {{anio}} se resuelve solo con la fecha y el resto queda como
      // está (sin ruido), así el largo se mide con el año puesto y no con el marcador.
      const anio = Number(hoy.slice(0, 4));
      const c = r.ok
        ? rellenarContenido(contenido, { valores: r.valores, usados: r.usados, unidades, locale: pais.mercado.locale, anio })
        : rellenarContenido(contenido, { valores: {}, usados: [], unidades, locale: pais.mercado.locale, anio, alFallar: () => {} });
      // Un title con {{ }} cambia de largo con el valor del día: con PAISES_TOLERANTE=1 eso es aviso.
      // Sin marcadores el largo es estructura y sigue rojo.
      const delDia = (t: string) => tolerante && marcadoresDe(t).length > 0;
      if (anchoVisual(c.title) > MAX_TITLE) (delDia(contenido.title) ? avisos : fallas).push(`${definicion.id}: title de ${anchoVisual(c.title)} de ancho (máximo ${MAX_TITLE}): «${c.title}»`);
      if (anchoVisual(c.description) > MAX_DESCRIPTION) (delDia(contenido.description) ? avisos : fallas).push(`${definicion.id}: description de ${anchoVisual(c.description)} de ancho (máximo ${MAX_DESCRIPTION})`);
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
