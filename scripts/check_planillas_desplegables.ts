// Recorre todas las planillas que se venden (private/*.xlsx y private/intl/<país>/*.xlsx) y verifica que
// sus desplegables funcionen en Google Sheets y en Excel del celular, no sólo en Excel de escritorio.
//
// Una lista que lee de OTRA hoja sale vacía allá; además exceljs borra los «$» de la fórmula y junta
// en un rango las celdas con validación idéntica, así que la segunda celda lee la lista corrida. El
// 21/10/2026 una compradora de UOCRA no pudo elegir el mes por eso.
//
// Correr con: npx tsx scripts/check_planillas_desplegables.ts  (o vía scripts/check-all.ts)

import fs from "node:fs";
import path from "node:path";
import ExcelJS from "exceljs";

const RAIZ = path.join(process.cwd(), "private");

type Modelo = Record<string, ExcelJS.DataValidation>;

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

function celdasDeLista(ws: ExcelJS.Worksheet, f: string): string[] | null {
  const m = f.match(/!\$?([A-Z]+)\$?(\d+):\$?([A-Z]+)\$?(\d+)$/);
  if (!m || m[1] !== m[3]) return null;
  const out: string[] = [];
  for (let r = Number(m[2]); r <= Number(m[4]); r++) out.push(String(ws.getCell(`${m[1]}${r}`).value ?? ""));
  return out;
}

async function revisar(archivo: string) {
  const nombre = path.relative(process.cwd(), archivo).replaceAll("\\", "/");
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(archivo);
  const cruzados: string[] = [];
  const largos: string[] = [];
  const fusionables: string[] = [];
  const vacias: string[] = [];
  let listas = 0;
  wb.eachSheet((ws) => {
    const modelo = (ws as unknown as { dataValidations: { model: Modelo } }).dataValidations.model;
    const vistas = new Map<string, string>();
    for (const [ref, v] of Object.entries(modelo)) {
      if (v.type !== "list") continue;
      listas++;
      const f = String(v.formulae?.[0] ?? "");
      if (f.startsWith('"')) {
        if (f.length > 255) largos.push(`${ws.name}!${ref} (${f.length})`);
        continue;
      }
      const hoja = f.match(/^'?(.+?)'?!/)?.[1];
      if (hoja && hoja !== ws.name) {
        cruzados.push(`${ws.name}!${ref} → ${f}`);
        continue;
      }
      const clave = `${f}|${v.error ?? ""}`;
      const otra = vistas.get(clave);
      if (otra) fusionables.push(`${ws.name}!${otra} y ${ref}`);
      else vistas.set(clave, ref);
      const valores = celdasDeLista(ws, f);
      if (!valores || valores.some((x) => x === "")) vacias.push(`${ws.name}!${ref} → ${f}`);
    }
  });
  check(`${nombre}: ningún desplegable lee su lista de otra hoja (${listas} desplegables)`, cruzados.length === 0, cruzados);
  check(`${nombre}: ninguna lista en línea pasa los 255 caracteres`, largos.length === 0, largos);
  check(`${nombre}: ningún par de desplegables con rango comparte validación (exceljs los fusionaría)`, fusionables.length === 0, fusionables);
  check(`${nombre}: toda lista con rango apunta a una columna sin celdas vacías`, vacias.length === 0, vacias);
}

async function main() {
  const archivos = fs.existsSync(RAIZ)
    ? fs
        .readdirSync(RAIZ, { recursive: true, encoding: "utf8" })
        .filter((f) => f.endsWith(".xlsx") && !path.basename(f).startsWith("~$"))
        .map((f) => path.join(RAIZ, f))
    : [];
  check("hay planillas para revisar", archivos.length > 0, RAIZ);
  for (const a of archivos) await revisar(a);

  if (fallas > 0) {
    console.error(`\n${fallas} falla(s) en los desplegables de las planillas`);
    process.exit(1);
  }
  console.log(`\nDesplegables OK en ${archivos.length} planillas`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
