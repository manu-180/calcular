/**
 * Genera private/planilla-monotributo-2026.xlsx — control de facturación y categoría para
 * monotributistas.
 *
 * INVARIANTE: las categorías salen de src/data/monotributo.ts (la tabla de ARCA que usa la
 * calculadora gratis) y la regla de encuadre de src/lib/monotributo.ts (categoriaPorParametros:
 * manda el MAYOR de los parámetros, Ley 24.977, Anexo, art. 9). scripts/check_planilla_monotributo.ts
 * evalúa las fórmulas del archivo y las compara contra ese motor.
 *
 * Uso: npx -y tsx scripts/gen_planilla_monotributo.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { CATEGORIAS, RECATEGORIZACION, VIGENCIA, ventanaRecategorizacion } from "../src/data/monotributo";
import {
  BORDE,
  S,
  bandaSeccion,
  celdaEtiqueta,
  celdaInput,
  celdaResultado,
  desplegable,
  hojaFuentes,
  nota,
  relleno,
  titulo,
} from "./gen_planilla_estilos";

export const ARCHIVO_MONOTRIBUTO = "planilla-monotributo-2026.xlsx";

export const HOJAS_MONO = {
  instrucciones: "Instrucciones",
  control: "Mi monotributo",
  categorias: "Categorías 2026",
} as const;

export const ACTIVIDADES = { servicios: "Servicios", venta: "Venta de cosas muebles" } as const;

export const CELDAS_MONO = {
  actividad: "B5",
  categoriaActual: "B6",
  dependencia: "B7",
  primeraFilaMes: 11, // B11:B22 facturación de los 12 meses
  superficie: "B25",
  energia: "B26",
  alquileres: "B27",
  precioUnitario: "B28",
  facturacion12: "B31",
  promedioMensual: "B32",
  catIngresos: "B33",
  catSuperficie: "B34",
  catEnergia: "B35",
  catAlquileres: "B36",
  categoria: "B37",
  manda: "B38",
  tope: "B39",
  margen: "B40",
  cuota: "B41",
  cuotaActual: "B42",
  movimiento: "B43",
  diferencia: "B44",
  precioControl: "B45",
} as const;

const CAT = HOJAS_MONO.categorias;
const FILA_CAT_INI = 3;
const FILA_CAT_FIN = FILA_CAT_INI + CATEGORIAS.length - 1;
const N = CATEGORIAS.length;
// Columnas de la hoja de categorías (el Control las busca por letra).
const COL = {
  cat: "A",
  ingresos: "B",
  superficie: "C",
  energia: "D",
  alquileres: "E",
  precio: "F",
  impServ: "G",
  impVenta: "H",
  sipa: "I",
  os: "J",
  totServ: "K",
  totVenta: "L",
} as const;
const rango = (col: string) => `'${CAT}'!$${col}$${FILA_CAT_INI}:$${col}$${FILA_CAT_FIN}`;

const MESES_ES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/** Los 12 meses que evalúa la próxima recategorización, según la misma función que usa el sitio. */
export function mesesEvaluados(hoy = new Date()): string[] {
  const v = ventanaRecategorizacion(hoy);
  const inicio = v.mes - 1; // 0-based: la ventana de agosto arranca en agosto del año anterior
  return Array.from({ length: 12 }, (_, i) => {
    const m = (inicio + i) % 12;
    const anio = v.anio - 1 + Math.floor((inicio + i) / 12);
    return `${MESES_ES[m]} ${anio}`;
  });
}

// ─── Instrucciones ───────────────────────────────────────────────────────────

function buildInstrucciones(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_MONO.instrucciones, { properties: { tabColor: { argb: "FFF57C00" } } });
  ws.columns = [{ width: 4 }, { width: 104 }];
  titulo(ws, "A1:B1", "Cómo usar esta planilla", "FFF57C00");
  const v = ventanaRecategorizacion();
  const pasos: [string, string][] = [
    ["1", "Andá a la hoja «Mi monotributo». Elegí tu actividad, tu categoría actual y si además trabajás en relación de dependencia."],
    ["2", `Cargá lo que facturaste cada mes en la tabla amarilla. Viene armada con los 12 meses que se evalúan en la próxima recategorización (${v.textoMes}); si querés mirar otro período, cambiá los nombres de los meses.`],
    ["3", "Si tenés local, completá superficie, energía y alquileres. No son opcionales para ARCA: la categoría la define el MAYOR de los parámetros, no solo la facturación."],
    ["4", "Las celdas verdes te dicen qué categoría te corresponde, qué parámetro la define, cuánto margen te queda antes de saltar a la siguiente y cuánto vas a pagar por mes."],
    ["5", "La hoja «Categorías 2026» es la tabla oficial de ARCA. «Fuentes» tiene los links y la fecha en que se verificó."],
  ];
  pasos.forEach(([n, t], i) => {
    const r = 3 + i;
    const nc = ws.getCell(r, 1);
    nc.value = n;
    nc.font = { bold: true, color: { argb: "FFFFFFFF" } };
    nc.fill = relleno("FFF57C00");
    nc.alignment = { horizontal: "center", vertical: "middle" };
    const tc = ws.getCell(r, 2);
    tc.value = t;
    tc.alignment = { wrapText: true, vertical: "middle", indent: 1 };
    ws.getRow(r).height = 34;
  });

  let r = 3 + pasos.length + 1;
  bandaSeccion(ws, `A${r}:B${r}`, "LO QUE TENÉS QUE SABER");
  r++;
  const claves = [
    "La recategorización es dos veces por año, en febrero y en agosto, y el trámite se puede hacer hasta el día 5. En cada una se evalúan los últimos 12 meses de actividad.",
    "Ley 24.977, Anexo, art. 9: estás bien categorizado cuando te encuadrás en la categoría que corresponde al MAYOR valor de tus parámetros —ingresos brutos, superficie, energía o alquileres—. Por eso la planilla calcula la categoría por cada uno y se queda con la más alta.",
    `Si cualquiera de los parámetros supera el máximo de la categoría ${CATEGORIAS[N - 1].cat}, quedás excluido del régimen. En venta de cosas muebles, también si el precio unitario de venta supera el máximo que fija ARCA.`,
    "Si además trabajás en relación de dependencia, tu empleo ya aporta jubilación y obra social: pagás solo el impuesto integrado.",
    `Las categorías se actualizan dos veces por año por inflación. Esta planilla tiene la tabla vigente desde el ${VIGENCIA.desde}; la próxima actualización es en ${VIGENCIA.proximaActualizacion} y te llega por mail sin costo.`,
  ];
  for (const t of claves) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 36;
    r++;
  }
  r++;
  nota(ws, `A${r}:B${r}`, "Da los mismos números que la calculadora gratis de calcular.ar/monotributo: misma tabla oficial, misma regla. Antes de publicar cada versión, una verificación automática recalcula este archivo y lo compara contra la calculadora. Si alguna vez difieren, escribinos.");
  ws.getRow(r).height = 32;
}

// ─── Categorías ──────────────────────────────────────────────────────────────

function buildCategorias(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(CAT, { properties: { tabColor: { argb: "FF1565C0" } } });
  ws.columns = [{ width: 8 }, ...Array.from({ length: 11 }, () => ({ width: 17 }))];
  titulo(ws, "A1:L1", `Categorías del Monotributo — vigentes desde el ${VIGENCIA.desde} (ARCA)`, "FF1565C0");
  const headers = [
    "Cat.", "Ingresos brutos anuales", "Superficie (m²)", "Energía anual (kW)", "Alquileres anuales",
    "Precio unitario máx.", "Impuesto · servicios", "Impuesto · venta", "Jubilación (SIPA)",
    "Obra social", "Total · servicios", "Total · venta",
  ];
  headers.forEach((h, i) => {
    const c = ws.getCell(2, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: "center", wrapText: true };
  });
  ws.getRow(2).height = 32;
  CATEGORIAS.forEach((c, i) => {
    const r = FILA_CAT_INI + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const vals = [
      c.cat, c.ingresosBrutosMax, c.superficieM2, c.energiaKw, c.alquileresMax, c.precioUnitarioMax,
      c.impuestoServicios, c.impuestoVenta, c.sipa, c.obraSocial, c.totalServicios, c.totalVenta,
    ];
    vals.forEach((v, j) => {
      const cell = ws.getCell(r, j + 1);
      cell.value = v;
      cell.fill = fill;
      cell.border = BORDE;
      if (j === 0) {
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center" };
      } else {
        cell.numFmt = j === 2 || j === 3 ? "#,##0" : '"$"#,##0.00';
        cell.alignment = { horizontal: "right" };
      }
    });
  });
  nota(ws, `A${FILA_CAT_FIN + 2}:L${FILA_CAT_FIN + 2}`, `Tabla oficial de ARCA (${VIGENCIA.fuenteUrl}), verificada el ${VIGENCIA.consultadoEl}. La columna «Cat.» la usa la hoja «Mi monotributo»: no la borres.`);
  ws.views = [{ state: "frozen", xSplit: 1, ySplit: 2 }];
}

// ─── Mi monotributo ──────────────────────────────────────────────────────────

function buildControl(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_MONO.control, { properties: { tabColor: { argb: "FF1B5E20" } } });
  ws.columns = [{ width: 50 }, { width: 34 }, { width: 4 }, { width: 12 }, { width: 12 }];
  titulo(ws, "A1:B1", "Mi monotributo — facturación, categoría y cuota", "FF1B5E20");
  ws.mergeCells("A2:B2");
  const sub = ws.getCell("A2");
  sub.value = `Tabla de ARCA vigente desde el ${VIGENCIA.desde} · Regla del art. 9 del Anexo de la Ley 24.977`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  const C = CELDAS_MONO;
  bandaSeccion(ws, "A4:B4", "TUS DATOS");
  celdaEtiqueta(ws, "A5", "Actividad principal");
  celdaInput(ws, C.actividad, ACTIVIDADES.servicios).dataValidation = desplegable(Object.values(ACTIVIDADES), "Elegí una actividad de la lista.");
  celdaEtiqueta(ws, "A6", "Tu categoría actual");
  celdaInput(ws, C.categoriaActual, "C").dataValidation = desplegable(CATEGORIAS.map((c) => c.cat), "Elegí una categoría de la A a la K.");
  celdaEtiqueta(ws, "A7", "¿Trabajás además en relación de dependencia?");
  celdaInput(ws, C.dependencia, "No").dataValidation = desplegable(["Sí", "No"], "Elegí Sí o No.");

  bandaSeccion(ws, "A9:B9", "FACTURACIÓN DE LOS ÚLTIMOS 12 MESES");
  celdaEtiqueta(ws, "A10", "Mes");
  celdaEtiqueta(ws, "B10", "Facturado");
  const meses = mesesEvaluados();
  const fin = C.primeraFilaMes + 11;
  meses.forEach((m, i) => {
    const r = C.primeraFilaMes + i;
    const et = celdaInput(ws, `A${r}`, m);
    et.font = { bold: false };
    const v = ws.getCell(`B${r}`);
    v.fill = S.input;
    v.border = BORDE;
    v.numFmt = '"$"#,##0.00';
    v.dataValidation = { type: "decimal", operator: "greaterThanOrEqual", showErrorMessage: true, formulae: [0], error: "Ingresá un importe (0 o más)." };
  });

  bandaSeccion(ws, "A24:B24", "SI TENÉS LOCAL O VENDÉS COSAS (si no, dejalo en 0)");
  const fisicos: [string, string, string][] = [
    [C.superficie, "Superficie afectada a la actividad (m²)", "#,##0"],
    [C.energia, "Energía eléctrica consumida en los últimos 12 meses (kW)", "#,##0"],
    [C.alquileres, "Alquileres devengados en los últimos 12 meses", '"$"#,##0.00'],
    [C.precioUnitario, "Precio unitario de venta más alto (solo venta de cosas)", '"$"#,##0.00'],
  ];
  for (const [ref, etq, fmt] of fisicos) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, etq);
    const c = celdaInput(ws, ref, 0);
    c.numFmt = fmt;
    c.alignment = { horizontal: "right" };
  }

  // ── Auxiliares ocultos (columna D): índice 1..11 de categoría por cada parámetro, 99 = excluido.
  const idx = (valor: string, col: string) =>
    `IF(${valor}>INDEX(${rango(col)},${N}),99,COUNTIF(${rango(col)},"<"&${valor})+1)`;
  ws.getCell("D33").value = { formula: idx(C.facturacion12, COL.ingresos) };
  ws.getCell("D34").value = { formula: idx(`MAX(${C.superficie},0)`, COL.superficie) };
  ws.getCell("D35").value = { formula: idx(`MAX(${C.energia},0)`, COL.energia) };
  ws.getCell("D36").value = { formula: idx(`MAX(${C.alquileres},0)`, COL.alquileres) };
  ws.getCell("D37").value = { formula: "MAX(D33:D36)" };
  ws.getCell("D42").value = { formula: `MATCH(${C.categoriaActual},${rango(COL.cat)},0)` };
  ws.getColumn("D").hidden = true;
  ws.getColumn("E").hidden = true;

  const cat = (celdaIdx: string) => `IF(${celdaIdx}>${N},"Excluido",INDEX(${rango(COL.cat)},${celdaIdx}))`;
  const cuota = (celdaIdx: string) =>
    `IF(${C.actividad}="${ACTIVIDADES.venta}",INDEX(${rango(COL.impVenta)},${celdaIdx}),INDEX(${rango(COL.impServ)},${celdaIdx}))` +
    `+IF(${C.dependencia}="Sí",0,INDEX(${rango(COL.sipa)},${celdaIdx})+INDEX(${rango(COL.os)},${celdaIdx}))`;

  bandaSeccion(ws, "A30:B30", "RESULTADO");
  celdaResultado(ws, 31, "Facturación de los últimos 12 meses", `SUM(B${C.primeraFilaMes}:B${fin})`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 32, "Promedio mensual", `ROUND(${C.facturacion12}/12,2)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 33, "Categoría según facturación", cat("D33"), { formato: "@" });
  celdaResultado(ws, 34, "Categoría según superficie", cat("D34"), { formato: "@" });
  celdaResultado(ws, 35, "Categoría según energía", cat("D35"), { formato: "@" });
  celdaResultado(ws, 36, "Categoría según alquileres", cat("D36"), { formato: "@" });
  celdaResultado(ws, 37, "CATEGORÍA QUE TE CORRESPONDE", `IF(D37>${N},"Excluido del régimen",INDEX(${rango(COL.cat)},D37))`, { total: true, formato: "@" });
  celdaResultado(
    ws,
    38,
    "Qué parámetro la define",
    `IF(D37>${N},IF(D33>${N},"La facturación",IF(D34>${N},"La superficie",IF(D35>${N},"La energía","Los alquileres"))),IF(D37=D33,"La facturación",IF(D37=D34,"La superficie",IF(D37=D35,"La energía","Los alquileres"))))`,
    { formato: "@" },
  );
  celdaResultado(ws, 39, "Tope de facturación de esa categoría", `IF(D37>${N},0,INDEX(${rango(COL.ingresos)},D37))`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 40, "Margen para seguir facturando sin cambiar de categoría", `IF(D37>${N},0,ROUND(${C.tope}-${C.facturacion12},2))`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 41, "CUOTA MENSUAL QUE TE CORRESPONDE", `IF(D37>${N},0,ROUND(${cuota("D37")},2))`, { total: true, formato: '"$"#,##0.00' });
  celdaResultado(ws, 42, "Cuota de tu categoría actual", `IFERROR(ROUND(${cuota("D42")},2),0)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 43, "¿Qué pasa en la recategorización?", `IF(D37>${N},"Quedás excluido: tenés que pasar al régimen general",IF(D37>D42,"Subís de categoría",IF(D37<D42,"Bajás de categoría","Te mantenés en la misma")))`, { formato: "@" });
  celdaResultado(ws, 44, "Diferencia de cuota por mes", `IF(D37>${N},0,ROUND(${C.cuota}-${C.cuotaActual},2))`, { formato: '"$"#,##0.00' });
  celdaResultado(
    ws,
    45,
    "Precio unitario de venta",
    `IF(AND(${C.actividad}="${ACTIVIDADES.venta}",${C.precioUnitario}>INDEX(${rango(COL.precio)},1)),"Supera el máximo de ARCA: es causal de exclusión","Dentro del máximo")`,
    { formato: "@" },
  );

  nota(ws, "A47:B47", `* Recategorización: ${RECATEGORIZACION.periodoEvaluado}, en febrero y agosto (hasta el día 5). Fuente: ${RECATEGORIZACION.fuenteUrl}`);
  nota(ws, "A48:B48", "* Si desarrollás la actividad en tu casa, cuentan solo la superficie y la energía afectadas a la actividad, y la parte proporcional del alquiler (Ley 24.977, Anexo, art. 9).");
  ws.getRow(47).height = 28;
  ws.getRow(48).height = 28;
  ws.views = [{ state: "frozen", ySplit: 4 }];
}

// ─── Main ────────────────────────────────────────────────────────────────────

export async function generarPlanillaMonotributo(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = "Planilla de control de Monotributo 2026";
  wb.subject = "Facturación de 12 meses, categoría, margen y cuota del Monotributo";
  wb.keywords = "monotributo, recategorización, categoría, facturación, ARCA, planilla";

  buildInstrucciones(wb);
  buildControl(wb);
  buildCategorias(wb);
  hojaFuentes(
    wb,
    [
      { nombre: "ARCA — Categorías del Monotributo (montos y parámetros vigentes)", url: VIGENCIA.fuenteUrl },
      { nombre: "ARCA — Recategorización", url: RECATEGORIZACION.fuenteUrl },
      {
        nombre: "Ley 24.977 — Régimen Simplificado (texto actualizado, art. 9 del Anexo: la categoría la define el mayor de los parámetros)",
        url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/50000-54999/51609/texact.htm",
      },
    ],
    VIGENCIA.consultadoEl,
    [],
    "Planilla de calcular.ar. Las actualizaciones del año están incluidas en el precio: cuando ARCA actualiza las categorías (febrero y agosto), regeneramos la planilla y el mismo enlace de descarga te baja la versión al día.",
  );

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salida = path.join(dir, ARCHIVO_MONOTRIBUTO);
  await wb.xlsx.writeFile(salida);
  return salida;
}

if (process.argv[1] && /gen_planilla_monotributo\.ts$/.test(process.argv[1])) {
  generarPlanillaMonotributo()
    .then((salida) => console.log(`Planilla Monotributo generada: ${salida}`))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
