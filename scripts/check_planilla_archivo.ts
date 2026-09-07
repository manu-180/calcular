// Verificación del ARCHIVO .xlsx que realmente se le entrega al comprador.
//
// POR QUÉ EXISTE (16/8/2026 — incidente real, la primera venta del imperio):
// `check_planilla_comercio.ts` ya verificaba la planilla… pero verificaba una RÉPLICA en
// TypeScript de las fórmulas del generador contra los datos vivos. Nunca abría el .xlsx.
// Resultado: el 30/7 la circular ACUERDO 07/2026 corrigió julio y sumó ago–dic, calcular.ar
// se actualizó, el check siguió dando 31/31 verde… y el archivo servido por
// `/api/planilla-comercio/download` se quedó 6 semanas en la versión del 15/6. La compradora
// del 8/8 pagó por "datos oficiales verificados" y recibió el básico de julio equivocado.
//
// La lección: se estaba verificando la receta, no la torta que está en la vidriera.
// Este check abre el .xlsx REAL, byte por byte del que se descarga, y lo compara contra
// MESES_COMERCIO. Si alguien toca la escala y no regenera la planilla, el árbol se pone rojo
// y el deploy no sale. El bug pasa de "posible y silencioso" a IMPOSIBLE.
//
// Correr con: npx tsx scripts/check_planilla_archivo.ts  (o vía scripts/check-all.ts)

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync } from "node:fs";
import { CATEGORIAS_COMERCIO, MESES_COMERCIO } from "../src/data/convenios/comercio";

// El mismo archivo que streamea src/app/api/planilla-comercio/download/route.ts.
const ARCHIVO = path.join(process.cwd(), "private", "planilla-comercio-2026.xlsx");
const HOJA = /^Escala/;

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// Las celdas de la escala son números planos, pero exceljs devuelve {result} si alguna
// quedara como fórmula. Normalizamos ambas formas.
function num(v: unknown): number | null {
  if (typeof v === "number") return v;
  if (v && typeof v === "object" && "result" in (v as object)) {
    const r = (v as { result?: unknown }).result;
    return typeof r === "number" ? r : null;
  }
  return null;
}

function texto(v: unknown): string {
  return v == null ? "" : String(v).trim();
}

async function main(): Promise<void> {
  if (!existsSync(ARCHIVO)) {
    console.error(`FAIL falta el entregable: ${ARCHIVO}`);
    console.error("\n1 FALLAS");
    process.exit(1);
  }

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ARCHIVO);
  const hoja = wb.worksheets.find((w) => HOJA.test(w.name));

  check(`el .xlsx entregable tiene hoja de escala (encontré "${hoja?.name ?? "—"}")`, !!hoja);
  if (!hoja) {
    console.error(`\n${fallas} FALLAS`);
    process.exit(1);
  }

  // ── Índice del archivo: fila de encabezado + fila por etiqueta de la primera columna ──
  let filaEncabezado = -1;
  const mesesArchivo: string[] = [];
  const filaPorEtiqueta = new Map<string, number>();

  hoja.eachRow((row, i) => {
    const vals = (row.values as unknown[]).slice(1);
    const primera = texto(vals[0]);
    if (filaEncabezado === -1 && /^categor/i.test(primera)) {
      filaEncabezado = i;
      vals.slice(1).forEach((v) => {
        const t = texto(v);
        if (t) mesesArchivo.push(t);
      });
      return;
    }
    if (filaEncabezado !== -1 && primera) filaPorEtiqueta.set(primera, i);
  });

  check("la hoja tiene fila de encabezado con los meses", filaEncabezado !== -1);
  if (filaEncabezado === -1) {
    console.error(`\n${fallas} FALLAS`);
    process.exit(1);
  }

  // ── 1. Cobertura de meses: el archivo trae TODOS los meses publicados en el sitio ──
  const mesesEsperados = MESES_COMERCIO.map((m) => m.etiqueta);
  const faltantes = mesesEsperados.filter((m) => !mesesArchivo.includes(m));
  const sobrantes = mesesArchivo.filter((m) => !mesesEsperados.includes(m));

  check(
    `el archivo cubre los ${mesesEsperados.length} meses publicados en calcular.ar`,
    faltantes.length === 0,
    faltantes.length ? { faltanEnElArchivo: faltantes, pista: "regenerá: npx -y tsx scripts/gen_planilla_todas.ts (también corre solo en el prebuild)" } : undefined,
  );
  check("el archivo no trae meses que el sitio ya no publica", sobrantes.length === 0, sobrantes.length ? { sobran: sobrantes } : undefined);

  // ── 2. Cada básico del archivo == el básico vivo del sitio ──
  // Es el chequeo que habría atajado el incidente: julio decía 1.233.585 y el oficial es 1.137.023.
  let comparados = 0;
  const discrepancias: Array<Record<string, unknown>> = [];

  for (const cat of CATEGORIAS_COMERCIO) {
    const fila = filaPorEtiqueta.get(cat.nombre);
    if (fila === undefined) {
      discrepancias.push({ categoria: cat.nombre, problema: "no está en el archivo" });
      continue;
    }
    for (const mes of MESES_COMERCIO) {
      const col = mesesArchivo.indexOf(mes.etiqueta);
      if (col === -1) continue; // ya reportado como mes faltante
      const enArchivo = num(hoja.getRow(fila).getCell(col + 2).value); // +1 categoría, +1 base-1
      const enSitio = mes.basicos[cat.id];
      comparados++;
      if (enArchivo === null || Math.abs(enArchivo - enSitio) > 0.5) {
        if (discrepancias.length < 5) {
          discrepancias.push({
            categoria: cat.nombre,
            mes: mes.etiqueta,
            enElArchivoQueSeVende: enArchivo,
            enCalcularAr: enSitio,
          });
        }
      }
    }
  }

  // El "comparados > 0" NO es decorativo: si los encabezados del archivo no matchean con los
  // del sitio (justo lo que pasó en el incidente, donde el archivo decía "Básico julio" y el
  // sitio "Julio 2026"), el loop no compara NADA y este check pasaría en verde habiendo
  // verificado cero. Un verde vacuo es peor que un rojo: miente.
  check(
    `los ${comparados} básicos del .xlsx coinciden con la escala viva de calcular.ar`,
    comparados > 0 && discrepancias.length === 0,
    discrepancias.length
      ? { primeras: discrepancias, pista: "el archivo entregable quedó viejo: npx -y tsx scripts/gen_planilla_todas.ts (corre solo en el prebuild)" }
      : comparados === 0
        ? { problema: "no se comparó ni un básico — los encabezados del archivo no coinciden con los del sitio" }
        : undefined,
  );

  // ── 3. Sumas no remunerativas y asignación extraordinaria por mes ──
  // El incidente también las tocó: la versión vieja daba por hecho que los $120.000 se
  // incorporaban al básico en julio (no pasó) y desconocía el bono de $25.000.
  for (const [etiqueta, leer] of [
    ["Sumas no remunerativas", (m: (typeof MESES_COMERCIO)[number]) => m.noRemunerativo],
    ["Asignación extraordinaria", (m: (typeof MESES_COMERCIO)[number]) => m.asignacionExtraordinaria ?? 0],
  ] as const) {
    const fila = filaPorEtiqueta.get(etiqueta);
    if (fila === undefined) {
      check(`el archivo tiene la fila "${etiqueta}"`, false);
      continue;
    }
    const malas = MESES_COMERCIO.map((mes) => {
      const col = mesesArchivo.indexOf(mes.etiqueta);
      if (col === -1) return null;
      const enArchivo = num(hoja.getRow(fila).getCell(col + 2).value);
      const enSitio = leer(mes);
      return enArchivo === null || Math.abs(enArchivo - enSitio) > 0.5
        ? { mes: mes.etiqueta, enElArchivo: enArchivo, enCalcularAr: enSitio }
        : null;
    }).filter(Boolean);

    check(`"${etiqueta}" coincide mes a mes con calcular.ar`, malas.length === 0, malas.length ? malas.slice(0, 3) : undefined);
  }

  console.log(fallas === 0 ? "\nTODO OK" : `\n${fallas} FALLAS`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("FAIL error leyendo el entregable", e);
  console.error("\n1 FALLAS");
  process.exit(1);
});
