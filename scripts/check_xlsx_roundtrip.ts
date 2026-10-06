// Verificación del round-trip de exceljs sobre los entregables reales: la entrega personalizada
// (src/lib/prefill/servidor.ts) abre el .xlsx con `wb.xlsx.load`, le carga los datos del comprador
// y lo vuelve a escribir. Si ese viaje pierde una fórmula, un desplegable, un estilo o un ancho de
// columna, la persona paga y recibe una planilla peor que la genérica. Este check lo compara a
// nivel XML (lo que Excel lee de verdad) y evaluando las fórmulas de los dos archivos.
//
// Sólo los productos en ROUNDTRIP_VERIFICADO salen personalizados: un producto que no pasa acá
// se saca de esa lista y se entrega el genérico.
//
// Correr con: npx tsx scripts/check_xlsx_roundtrip.ts  (o vía scripts/check-all.ts)

import "./sin-server-only";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";
import JSZip from "jszip";
import { HyperFormula } from "hyperformula";
import { PRODUCTOS } from "../src/lib/mp";
import { ROUNDTRIP_VERIFICADO } from "../src/lib/prefill/servidor";
import { PREFILLS } from "../src/lib/prefill";

process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."));

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

type Xml = Record<string, string>;

async function partes(buf: Buffer | ArrayBuffer): Promise<Xml> {
  const zip = await JSZip.loadAsync(buf);
  const salida: Xml = {};
  for (const nombre of Object.keys(zip.files)) {
    if (!zip.files[nombre].dir) salida[nombre] = await zip.files[nombre].async("string");
  }
  return salida;
}

const todos = (xml: string, re: RegExp) => [...xml.matchAll(re)].map((m) => m[0]);
const attrs = (tag: string) =>
  Object.fromEntries([...tag.matchAll(/([\w:]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const ordenado = (o: Record<string, string>) => JSON.stringify(Object.keys(o).sort().map((k) => [k, o[k]]));

/** Celda → fórmula, a partir del XML de la hoja. */
function formulas(xml: string): Map<string, string> {
  const m = new Map<string, string>();
  for (const c of xml.matchAll(/<c r="([A-Z]+\d+)"[^>]*>([\s\S]*?)<\/c>/g)) {
    const f = c[2].match(/<f[^>]*>([\s\S]*?)<\/f>/);
    if (f) m.set(c[1], f[1]);
  }
  return m;
}

function validaciones(xml: string): string[] {
  return todos(xml, /<dataValidation [\s\S]*?<\/dataValidation>/g)
    .map((v) => {
      const a = attrs(v.slice(0, v.indexOf(">") + 1));
      const f1 = v.match(/<formula1>([\s\S]*?)<\/formula1>/)?.[1] ?? "";
      const f2 = v.match(/<formula2>([\s\S]*?)<\/formula2>/)?.[1] ?? "";
      // exceljs puede reagrupar el sqref ("A1 A2" ↔ "A1:A2"): se expande a celdas sueltas.
      const celdas = (a.sqref ?? "").split(/\s+/).flatMap(expandir).sort().join(",");
      delete a.sqref;
      return `${celdas}|${ordenado(a)}|${f1}|${f2}`;
    })
    .flatMap((v) => {
      const [celdas, ...resto] = v.split("|");
      return celdas.split(",").map((c) => `${c}|${resto.join("|")}`);
    })
    .sort();
}

function expandir(rango: string): string[] {
  if (!rango) return [];
  const [a, b] = rango.split(":");
  if (!b) return [a];
  const col = (s: string) => [...s.replace(/\d+/g, "")].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0);
  const fila = (s: string) => Number(s.replace(/[A-Z]+/g, ""));
  const letra = (n: number): string => (n > 26 ? letra(Math.floor((n - 1) / 26)) : "") + String.fromCharCode(65 + ((n - 1) % 26));
  const salida: string[] = [];
  for (let c = col(a); c <= col(b); c++) for (let f = fila(a); f <= fila(b); f++) salida.push(`${letra(c)}${f}`);
  return salida;
}

// exceljs junta columnas contiguas iguales en un solo <col min max>: se comparan columna por columna.
const columnas = (xml: string) =>
  todos(xml, /<col [^>]*\/>/g).flatMap((c) => {
    const { min, max, ...resto } = attrs(c);
    return Array.from({ length: Number(max) - Number(min) + 1 }, (_, i) => `${Number(min) + i}:${ordenado(resto)}`);
  });
const combinadas = (xml: string) => todos(xml, /<mergeCell [^>]*\/>/g).map((c) => attrs(c).ref).sort();
const unico = (xml: string, re: RegExp) => (xml.match(re)?.[0] ?? "").replace(/\s+/g, " ");

/** Estilo resuelto de cada celda leído con exceljs (fuente, relleno, bordes, formato, alineación). */
function estilos(wb: ExcelJS.Workbook): Map<string, string> {
  const m = new Map<string, string>();
  wb.eachSheet((ws) =>
    ws.eachRow({ includeEmpty: true }, (row) =>
      row.eachCell({ includeEmpty: true }, (cell) => {
        m.set(`${ws.name}!${cell.address}`, JSON.stringify({ s: cell.style, p: cell.protection ?? null }));
      }),
    ),
  );
  return m;
}

function evaluar(wb: ExcelJS.Workbook): Map<string, unknown> {
  const hojas: Record<string, (string | number | boolean | null)[][]> = {};
  wb.eachSheet((ws) => {
    const filas: (string | number | boolean | null)[][] = [];
    for (let r = 1; r <= ws.rowCount; r++) {
      const fila: (string | number | boolean | null)[] = [];
      for (let c = 1; c <= ws.columnCount; c++) {
        const cell = ws.getCell(r, c);
        const v = cell.isMerged && cell.master.address !== cell.address ? null : cell.value;
        if (v === null || v === undefined) fila.push(null);
        else if (typeof v === "number" || typeof v === "string" || typeof v === "boolean") fila.push(v);
        else if (v instanceof Date) fila.push(v.getTime());
        else if (typeof v === "object" && "formula" in v && v.formula) fila.push(`=${v.formula}`);
        else if (typeof v === "object" && "richText" in v) fila.push(v.richText.map((t) => t.text).join(""));
        else fila.push(null);
      }
      filas.push(fila);
    }
    hojas[ws.name] = filas;
  });
  const hf = HyperFormula.buildFromSheets(hojas, { licenseKey: "gpl-v3" });
  const m = new Map<string, unknown>();
  for (const [nombre, filas] of Object.entries(hojas)) {
    const id = hf.getSheetId(nombre)!;
    filas.forEach((fila, r) =>
      fila.forEach((_, c) => {
        const v = hf.getCellValue({ sheet: id, row: r, col: c });
        m.set(`${nombre}!${r},${c}`, typeof v === "object" && v !== null ? String((v as { type?: string }).type ?? v) : v);
      }),
    );
  }
  hf.destroy();
  return m;
}

function iguales<K, V>(a: Map<K, V>, b: Map<K, V>): [boolean, unknown] {
  if (a.size !== b.size) return [false, { antes: a.size, despues: b.size }];
  for (const [k, v] of a) if (b.get(k) !== v) return [false, { celda: k, antes: v, despues: b.get(k) }];
  return [true, null];
}

// Valores por defecto del estándar (OOXML): exceljs los escribe explícitos y Excel imprime igual.
// 4294967295 en los dpi es «sin especificar».
const DEFAULTS_IMPRESION: Record<string, string> = {
  firstPageNumber: "1",
  useFirstPageNumber: "1",
  copies: "1",
  scale: "100",
  horizontalDpi: "4294967295",
  verticalDpi: "4294967295",
};

async function verificar(slug: string, archivo: string) {
  const ruta = path.join("private", archivo);
  if (!existsSync(ruta)) {
    check(`${slug}: existe ${ruta} para probar el round-trip`, false, "corré el prebuild (scripts/gen_planilla_todas.ts)");
    return;
  }
  const original = readFileSync(ruta);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(original as unknown as ArrayBuffer);
  const reescrito = Buffer.from(await wb.xlsx.writeBuffer());

  const a = await partes(original);
  const b = await partes(reescrito);
  const faltan = Object.keys(a).filter((k) => !(k in b));
  check(`${slug}: no se pierde ninguna parte del paquete`, faltan.length === 0, faltan);

  const hojas = Object.keys(a).filter((k) => /^xl\/worksheets\/sheet\d+\.xml$/.test(k));
  check(`${slug}: tiene hojas`, hojas.length > 0);
  for (const h of hojas) {
    const x = a[h];
    const y = b[h] ?? "";
    const [fOk, fDet] = iguales(formulas(x), formulas(y));
    check(`${slug} ${h}: mismas fórmulas (${formulas(x).size})`, fOk, fDet);
    const va = validaciones(x);
    const vb = validaciones(y);
    check(`${slug} ${h}: mismos desplegables/validaciones (${va.length} celdas)`, JSON.stringify(va) === JSON.stringify(vb), {
      faltan: va.filter((v) => !vb.includes(v)).slice(0, 3),
      sobran: vb.filter((v) => !va.includes(v)).slice(0, 3),
    });
    check(`${slug} ${h}: mismos anchos de columna`, JSON.stringify(columnas(x)) === JSON.stringify(columnas(y)), { antes: columnas(x), despues: columnas(y) });
    check(`${slug} ${h}: mismas celdas combinadas`, JSON.stringify(combinadas(x)) === JSON.stringify(combinadas(y)));
    const impresion = (xml: string, base?: Record<string, string>) => {
      const a = attrs(unico(xml, /<pageSetup [^>]*\/>/));
      for (const [k, v] of Object.entries(DEFAULTS_IMPRESION)) if (a[k] === v && !(base && k in base)) delete a[k];
      return a;
    };
    const ia = impresion(x);
    check(`${slug} ${h}: configuración de impresión intacta`, ordenado(ia) === ordenado(impresion(y, ia)), { antes: ia, despues: impresion(y, ia) });
    for (const [nombre, re] of [
      ["paneles fijos", /<pane [^>]*\/>/],
      ["protección de hoja", /<sheetProtection [^>]*\/>/],
      ["márgenes", /<pageMargins [^>]*\/>/],
      ["formato condicional", /<conditionalFormatting[\s\S]*<\/conditionalFormatting>/],
    ] as const) {
      check(`${slug} ${h}: ${nombre} intacto`, unico(x, re) === unico(y, re), { antes: unico(x, re).slice(0, 160), despues: unico(y, re).slice(0, 160) });
    }
  }
  const nombres = (xml: string) => todos(xml ?? "", /<definedName [\s\S]*?<\/definedName>/g).sort();
  check(`${slug}: mismos nombres definidos`, JSON.stringify(nombres(a["xl/workbook.xml"])) === JSON.stringify(nombres(b["xl/workbook.xml"])));

  const wb2 = new ExcelJS.Workbook();
  await wb2.xlsx.load(reescrito as unknown as ArrayBuffer);
  const [eOk, eDet] = iguales(estilos(wb), estilos(wb2));
  check(`${slug}: mismos estilos celda por celda`, eOk, eDet);
  const [vOk, vDet] = iguales(evaluar(wb), evaluar(wb2));
  check(`${slug}: las fórmulas dan lo mismo evaluadas`, vOk, vDet);
}

async function main() {
  for (const slug of ROUNDTRIP_VERIFICADO) {
    const p = PRODUCTOS[slug];
    check(`${slug}: está en el catálogo como .xlsx`, !!p && p.entrega === "xlsx");
    if (p?.entrega === "xlsx") await verificar(slug, p.archivo);
  }
  // Un producto con `aplicar` fuera de la lista se entrega genérico sin aviso: se lo nombra acá.
  for (const p of Object.values(PRODUCTOS)) {
    if (p.entrega === "xlsx" && PREFILLS[p.slug]?.aplicar && !ROUNDTRIP_VERIFICADO.has(p.slug)) {
      console.warn(`AVISO ${p.slug} tiene aplicar() pero no está en ROUNDTRIP_VERIFICADO: sale genérico. Si este check pasa con él en la lista, se puede prender.`);
    }
  }
  check("un informe nunca está en la lista de round-trip", [...ROUNDTRIP_VERIFICADO].every((s) => PRODUCTOS[s]?.entrega === "xlsx"));
}

main()
  .catch((e) => {
    fallas++;
    console.error(e);
  })
  .finally(() => {
    console.log(fallas === 0 ? "\n✅ check_xlsx_roundtrip: todo OK" : `\n❌ check_xlsx_roundtrip: ${fallas} falla(s)`);
    process.exit(fallas === 0 ? 0 : 1);
  });
