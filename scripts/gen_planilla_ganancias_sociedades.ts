/**
 * Genera private/planilla-ganancias-sociedades-2026.xlsx — el impuesto a las ganancias de una
 * sociedad (art. 73 LIG), con la escala que de verdad le toca y sus quebrantos actualizados.
 *
 * INVARIANTE: ni un número se escribe a mano.
 *   · la escala año por año sale de src/data/ganancias-sociedades.ts (la misma que usa la
 *     calculadora gratis de /ganancias-sociedades, derivada del IPC de octubre y cotejada
 *     contra los PDF de ARCA);
 *   · el 7% de los dividendos, de ALICUOTA_DIVIDENDOS del mismo archivo;
 *   · la actualización de quebrantos replica src/lib/quebrantos.ts (art. 25, 11º párrafo, con la
 *     fecha de corte del art. 190 de la Ley 27.802 y los cinco años del 9º párrafo);
 *   · la serie del IPC, de src/data/ipc-serie.ts.
 * scripts/check_planilla_ganancias_sociedades.ts evalúa las fórmulas del archivo con
 * HyperFormula y las compara contra esos motores.
 *
 * LO QUE LA PLANILLA NO HACE, a propósito: no arma la declaración jurada ni calcula anticipos,
 * retenciones o percepciones. El art. 73 da el impuesto determinado; lo que se ingresa con la DDJJ
 * sale de restarle los pagos a cuenta del período, que no están en ninguna fuente de este repo.
 *
 * Uso: npx -y tsx scripts/gen_planilla_ganancias_sociedades.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import {
  ALICUOTA_DIVIDENDOS,
  ANIOS_SOLO_ARCA,
  ESCALA_LEY_27630,
  GANANCIAS_SOCIEDADES_FUENTES,
  ULTIMO_ANIO_ESCALA,
  escalasDisponibles,
} from "../src/data/ganancias-sociedades";
import { ANIOS_DE_VIDA, PRIMER_INICIO_ACTUALIZABLE, QUEBRANTOS_FUENTES } from "../src/data/quebrantos";
import { IPC_DESCARGADO_EL, IPC_SERIE } from "../src/data/ipc-serie";
import {
  ARS_FMT_DEC,
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

export const ARCHIVO_SOCIEDADES = "planilla-ganancias-sociedades-2026.xlsx";

export const HOJAS_SOC = {
  instrucciones: "Instrucciones",
  liquidador: "Mi sociedad",
  escalas: "Escalas",
  quebrantos: "Quebrantos",
  ipc: "IPC",
} as const;

export const MESES_SOC = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
] as const;

/** Celdas del liquidador. Las amarillas son entrada; las verdes, fórmula. */
export const CELDAS_SOC = {
  mesCierre: "B5",
  anioCierre: "B6",
  ganancia: "B9",
  quebrantos: "B10",
  distribuido: "B11",
  mesInicio: "B14",
  anioInicio: "B15",
  escala: "B16",
  tramo: "B17",
  quebrantoComputado: "B20",
  base: "B21",
  impuesto: "B22",
  efectiva: "B23",
  marginal: "B24",
  despuesImpuesto: "B25",
  dividendos: "B28",
  retencion: "B29",
  enMano: "B30",
  cargaTotal: "B31",
  cargaEfectiva: "B32",
  impuestoInicio: "B35",
  impuestoCierre: "B36",
  diferenciaTabla: "B37",
  avisoTabla: "B38",
} as const;

/** Primera y última fila de los seis quebrantos que entran en la hoja. */
export const QUEBRANTO_F0 = 5;
export const QUEBRANTOS_FILAS = 6;
export const QUEBRANTO_FIN = QUEBRANTO_F0 + QUEBRANTOS_FILAS - 1;
export const FILA_TOTAL_QUEBRANTOS = QUEBRANTO_FIN + 2;
/** Columnas de entrada de cada quebranto: mes y año de cierre de origen, y el monto. */
export const COL_QUEBRANTO = { mes: "B", anio: "C", monto: "D", computable: "I" } as const;

const ESCALAS = escalasDisponibles();
const VERDE = "FF1B5E20";
const AZUL = "FF1565C0";
const GRIS = "FF37474F";
const NARANJA = "FFF57C00";

// ─── Rangos de la hoja Escalas ───────────────────────────────────────────────

const ESC = HOJAS_SOC.escalas;
const ESC_F0 = 3;
const ESC_FIN = ESC_F0 + ESCALAS.length - 1;
/** Columnas: año de inicio, límite del 25%, límite del 30%, fijo del 30%, fijo del 35%, origen, coeficiente. */
const E_COL = { anio: "A", l1: "B", l2: "C", fijo30: "D", fijo35: "E", origen: "F", coef: "G" } as const;
const rangoEsc = (col: string) => `'${ESC}'!$${col}$${ESC_F0}:$${col}$${ESC_FIN}`;
/** Los doce meses viven en la hoja Escalas: las otras hojas los leen con INDEX (no es un desplegable). */
const MES_F0 = ESC_F0;
const RANGO_MESES = `'${ESC}'!$J$${MES_F0}:$J$${MES_F0 + 11}`;

// ─── Rangos de la hoja IPC ───────────────────────────────────────────────────

const IPC_H = HOJAS_SOC.ipc;
const IPC_F0 = 5;
/** La serie se extiende hasta diciembre del año siguiente al último con escala: un ejercicio que
 *  cierra más adelante necesita su mes para el coeficiente, y esos meses se cargan a mano. */
const ULTIMO_ANIO_IPC = ULTIMO_ANIO_ESCALA + 1;
const PERIODOS_IPC = (() => {
  const salida: string[] = [];
  let [anio, mes] = IPC_SERIE[0][0].split("-").map(Number);
  while (anio < ULTIMO_ANIO_IPC || (anio === ULTIMO_ANIO_IPC && mes <= 12)) {
    salida.push(`${anio}-${String(mes).padStart(2, "0")}`);
    mes++;
    if (mes > 12) {
      mes = 1;
      anio++;
    }
  }
  return salida;
})();
const IPC_FIN = IPC_F0 + PERIODOS_IPC.length - 1;
const R_IPC_CLAVE = `'${IPC_H}'!$B$${IPC_F0}:$B$${IPC_FIN}`;
const R_IPC_INDICE = `'${IPC_H}'!$C$${IPC_F0}:$C$${IPC_FIN}`;
/** Último índice publicado por el INDEC: el tope cuando el mes pedido todavía no salió. */
const C_ULTIMO_INDICE = `'${IPC_H}'!$H$3`;
const ULTIMO_PERIODO_IPC = IPC_SERIE.at(-1)![0];
const ULTIMO_INDICE_IPC = IPC_SERIE.at(-1)![1];

/** El índice del mes `clave`. Si ese mes todavía no se publicó ni se cargó a mano, usa el último
 *  publicado y la hoja lo avisa: igual que `indiceConTope` de src/lib/quebrantos.ts, nunca extrapola. */
function ipcDe(clave: string): string {
  const busca = `INDEX(${R_IPC_INDICE},MATCH(${clave},${R_IPC_CLAVE},0))`;
  return `IFERROR(IF(${busca}="",${C_ULTIMO_INDICE},${busca}),${C_ULTIMO_INDICE})`;
}

const nombrePeriodo = (clave: string) => {
  const [a, m] = clave.split("-").map(Number);
  return `${MESES_SOC[m - 1]} de ${a}`;
};

// El año de inicio decide la escala, y el art. 190 mira el año de inicio del ejercicio del
// quebranto: las dos condiciones se comparan por AÑO, así que la fecha de corte tiene que caer en
// enero. Si algún día cambia a otro mes, la comparación de abajo deja de ser válida y esto avisa.
const ANIO_CORTE_QUEBRANTOS = Number(PRIMER_INICIO_ACTUALIZABLE.slice(0, 4));
if (!PRIMER_INICIO_ACTUALIZABLE.endsWith("-01")) {
  throw new Error(
    `PRIMER_INICIO_ACTUALIZABLE es ${PRIMER_INICIO_ACTUALIZABLE}: la planilla compara el año de inicio y asume que el corte es en enero.`,
  );
}

// ─── Instrucciones ───────────────────────────────────────────────────────────

function buildInstrucciones(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_SOC.instrucciones, { properties: { tabColor: { argb: NARANJA } } });
  ws.columns = [{ width: 4 }, { width: 104 }];
  titulo(ws, "A1:B1", "Cómo usar esta planilla", NARANJA);

  const pasos: [string, string][] = [
    ["1", "Andá a la hoja «Mi sociedad». Elegí el mes y el año de CIERRE del ejercicio que estás liquidando: la planilla deduce sola en qué año empezó, que es el año que elige la escala."],
    ["2", "Cargá la ganancia neta imponible del ejercicio, antes de computar quebrantos de años anteriores."],
    ["3", "Si la sociedad arrastra quebrantos, cargalos en la hoja «Quebrantos»: mes y año de cierre del ejercicio en que se originó cada uno, y el monto. La hoja los actualiza por IPC cuando corresponde y el total vuelve solo al liquidador. Si preferís poner el número a mano, escribilo encima de la celda amarilla de quebrantos."],
    ["4", "Elegí qué parte de lo que queda después del impuesto se reparte a socios personas humanas: ahí aparece la retención del 7% y la carga total entre sociedad y socios."],
    ["5", "La última sección te muestra cuánto cambia el impuesto si se usa la tabla del año de cierre en vez de la del año de inicio. Es el error más caro de esta liquidación."],
  ];
  pasos.forEach(([n, t], i) => {
    const r = 3 + i;
    const nc = ws.getCell(r, 1);
    nc.value = n;
    nc.font = { bold: true, color: { argb: "FFFFFFFF" } };
    nc.fill = relleno(NARANJA);
    nc.alignment = { horizontal: "center", vertical: "middle" };
    const tc = ws.getCell(r, 2);
    tc.value = t;
    tc.alignment = { wrapText: true, vertical: "middle", indent: 1 };
    ws.getRow(r).height = 46;
  });

  let r = 3 + pasos.length + 1;
  bandaSeccion(ws, `A${r}:B${r}`, "LO QUE TENÉS QUE SABER");
  r++;
  const claves = [
    "La escala la elige el año en que el ejercicio SE INICIA, no el del cierre. El art. 73 dice que los montos ajustados «resultarán de aplicación para los ejercicios fiscales que se inicien con posterioridad a cada actualización». Una sociedad que cierra el 30 de junio empezó su ejercicio en julio del año anterior: liquida con la tabla de ese año, que tiene tramos más chicos.",
    "Los tramos se actualizan solos, sin decreto: son los montos de la Ley 27.630 multiplicados por el IPC de octubre del año anterior sobre el de octubre de 2020. La hoja «Escalas» los trae año por año, y coinciden al centavo con los que publica ARCA.",
    "El 35% es la alícuota del último peso, no la de toda la ganancia. La alícuota efectiva de la hoja «Mi sociedad» es la que de verdad se paga.",
    `Cuando la sociedad reparte dividendos a socios personas humanas, les retiene un ${Math.round(ALICUOTA_DIVIDENDOS * 100)}% más (art. 73, último párrafo). Para los residentes no inscriptos en el impuesto, esa retención es pago único y definitivo.`,
    `Un quebranto se actualiza por IPC sólo si su ejercicio SE INICIÓ desde el 1/1/${ANIO_CORTE_QUEBRANTOS} (art. 190 de la Ley 27.802), y vive ${ANIOS_DE_VIDA} ejercicios desde el de origen. La hoja «Quebrantos» aplica las dos condiciones y te dice por qué, caso por caso.`,
    "Esta planilla da el IMPUESTO DETERMINADO. Lo que se ingresa con la declaración jurada es eso menos los anticipos, las retenciones y las percepciones del período: esa resta la hacés con tus papeles, la planilla no la inventa.",
  ];
  for (const t of claves) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 48;
    r++;
  }
  r++;
  nota(
    ws,
    `A${r}:B${r}`,
    `Da los mismos números que la calculadora gratis de calcular.ar/ganancias-sociedades: misma escala, misma regla del año de inicio. Antes de publicar cada versión, una verificación automática recalcula este archivo y lo compara contra esa calculadora. La hoja «Fuentes» tiene los links oficiales y la fecha en que se verificaron. Esta planilla es informativa y no reemplaza a un contador.`,
  );
  ws.getRow(r).height = 46;
}

// ─── Escalas ─────────────────────────────────────────────────────────────────

function buildEscalas(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(ESC, { properties: { tabColor: { argb: AZUL } } });
  ws.columns = [
    { width: 22 }, { width: 24 }, { width: 24 }, { width: 24 }, { width: 24 },
    { width: 24 }, { width: 14 }, { width: 3 }, { width: 5 }, { width: 14 },
  ];
  titulo(ws, "A1:G1", "Escala del art. 73 — un año de INICIO de ejercicio por fila", AZUL);

  const headers = [
    "Ejercicios iniciados en",
    "25% hasta",
    "30% hasta",
    "Importe fijo del tramo del 30%",
    "Importe fijo del tramo del 35%",
    "Origen",
    "Coeficiente",
  ];
  headers.forEach((h, i) => {
    const c = ws.getCell(2, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: "center", wrapText: true };
  });
  ws.getRow(2).height = 34;

  ESCALAS.forEach((e, i) => {
    const r = ESC_F0 + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const origen = e.origen === "ley" ? "Ley 27.630" : e.origen === "arca" ? "publicada por ARCA" : "ley × IPC oct./oct. 2020";
    const vals: (string | number | null)[] = [
      e.anio, e.tramos[0].hasta, e.tramos[1].hasta, e.tramos[1].fijo, e.tramos[2].fijo, origen, e.coeficiente,
    ];
    vals.forEach((v, j) => {
      const c = ws.getCell(r, j + 1);
      c.value = v;
      c.fill = fill;
      c.border = BORDE;
      if (j === 0) {
        c.font = { bold: true };
        c.alignment = { horizontal: "center" };
      } else if (j === 5) {
        c.alignment = { horizontal: "left", indent: 1 };
      } else if (j === 6) {
        c.numFmt = "0.0000";
        c.alignment = { horizontal: "right" };
      } else {
        c.numFmt = ARS_FMT_DEC;
        c.alignment = { horizontal: "right" };
      }
    });
  });

  // Los doce meses, para que «Mi sociedad» y «Quebrantos» puedan escribir «julio de 2025».
  ws.getCell(`I${MES_F0 - 1}`).value = "Mes";
  ws.getCell(`I${MES_F0 - 1}`).font = { bold: true, size: 9 };
  ws.getCell(`J${MES_F0 - 1}`).value = "Nombre";
  ws.getCell(`J${MES_F0 - 1}`).font = { bold: true, size: 9 };
  MESES_SOC.forEach((m, i) => {
    const r = MES_F0 + i;
    ws.getCell(`I${r}`).value = i + 1;
    ws.getCell(`I${r}`).alignment = { horizontal: "center" };
    const c = ws.getCell(`J${r}`);
    c.value = m;
    c.fill = S.label;
    c.border = BORDE;
  });

  let r = ESC_FIN + 2;
  nota(
    ws,
    `A${r}:G${r}`,
    `La Ley 27.630 fijó los tramos en $${ESCALA_LEY_27630[0].hasta!.toLocaleString("es-AR")} y $${ESCALA_LEY_27630[1].hasta!.toLocaleString("es-AR")} para los ejercicios iniciados en 2021. Cada año se toma esa escala y se multiplica por el IPC de octubre del año anterior sobre el de octubre de 2020, con toda la precisión y redondeando al centavo recién al final. Así salen al centavo los montos que publica ARCA de 2023 a ${ULTIMO_ANIO_ESCALA}.`,
  );
  ws.getRow(r).height = 44;
  r++;
  nota(
    ws,
    `A${r}:G${r}`,
    `${ANIOS_SOLO_ARCA.join(", ")}: se publica la escala tal como la publicó ARCA, porque con la serie actual del INDEC la cuenta da unos $634 más en el primer tramo. Cuando el INDEC publique el IPC de octubre de ${ULTIMO_ANIO_ESCALA}, la escala de los ejercicios iniciados en ${ULTIMO_ANIO_ESCALA + 1} llega sola en la versión nueva de la planilla, al mismo enlace y sin pagar de nuevo.`,
  );
  ws.getRow(r).height = 44;
  r++;
  nota(ws, `A${r}:G${r}`, "La hoja «Mi sociedad» busca en esta tabla por el año de la columna A: no borres ni reordenes las filas.");

  ws.views = [{ state: "frozen", xSplit: 1, ySplit: 2 }];
}

// ─── IPC ─────────────────────────────────────────────────────────────────────

function buildIpc(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(IPC_H, { properties: { tabColor: { argb: AZUL } } });
  ws.columns = [
    { width: 26 }, { width: 14 }, { width: 16 }, { width: 18 }, { width: 30 }, { width: 18 }, { width: 3 }, { width: 18 },
  ];
  titulo(ws, "A1:F1", "IPC Nacional del INDEC — nivel general (base diciembre 2016 = 100)", AZUL);
  ws.mergeCells("A2:F2");
  const sub = ws.getCell("A2");
  sub.value = `Serie oficial descargada el ${IPC_DESCARGADO_EL}. Último dato publicado: ${nombrePeriodo(ULTIMO_PERIODO_IPC)}. Si ya salió un mes que acá no está, cargá su variación en la columna amarilla y el coeficiente de los quebrantos se recalcula solo.`;
  sub.font = { italic: true, size: 9, color: { argb: "FF555555" } };
  sub.alignment = { wrapText: true, vertical: "top" };
  ws.getRow(2).height = 32;

  ws.getCell("H2").value = "Último mes publicado";
  ws.getCell("H2").font = { bold: true, size: 9 };
  ws.getCell("H3").value = ULTIMO_INDICE_IPC;
  ws.getCell("H3").numFmt = "0.000";
  ws.getCell("H3").fill = S.output;
  ws.getCell("H3").border = BORDE;
  ws.getCell("H4").value = nombrePeriodo(ULTIMO_PERIODO_IPC);
  ws.getCell("H4").font = { italic: true, size: 9, color: { argb: "FF555555" } };

  ["Período", "Clave (año-mes)", "Índice", "Variación del mes", "¿Salió y no está? Cargá el % del mes", "Origen"].forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(4).height = 34;

  const publicados = new Map(IPC_SERIE.map(([p, v]) => [p, v]));
  PERIODOS_IPC.forEach((p, i) => {
    const r = IPC_F0 + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const pc = ws.getCell(`A${r}`);
    pc.value = nombrePeriodo(p);
    pc.fill = fill;
    pc.border = BORDE;
    const kc = ws.getCell(`B${r}`);
    kc.value = p;
    kc.fill = fill;
    kc.border = BORDE;
    kc.alignment = { horizontal: "center" };
    const ic = ws.getCell(`C${r}`);
    const vc = ws.getCell(`D${r}`);
    const cc = ws.getCell(`E${r}`);
    const oc = ws.getCell(`F${r}`);
    const valor = publicados.get(p);
    if (valor !== undefined) {
      ic.value = valor;
      vc.value = i === 0 ? null : { formula: `IF(C${r - 1}="","",C${r}/C${r - 1}-1)` };
      cc.fill = S.label;
      oc.value = "INDEC";
    } else {
      // Un mes sin publicar queda vacío hasta que se carga su variación: vacío, el coeficiente usa
      // el último índice publicado, como hace la calculadora del sitio.
      ic.value = { formula: `IF(OR(E${r}="",C${r - 1}=""),"",C${r - 1}*(1+E${r}/100))` };
      vc.value = { formula: `IF(C${r}="","",C${r}/C${r - 1}-1)` };
      cc.fill = S.input;
      cc.numFmt = "0.0";
      cc.dataValidation = {
        type: "decimal",
        operator: "between",
        allowBlank: true,
        showErrorMessage: true,
        formulae: [-50, 100],
        error: "Cargá la variación del mes como número: por ejemplo 2,1 para 2,1%.",
      };
      oc.value = { formula: `IF(E${r}="","","Cargado por vos")` };
    }
    ic.numFmt = "0.000";
    ic.alignment = { horizontal: "right" };
    vc.numFmt = "0.0%";
    vc.alignment = { horizontal: "right" };
    for (const c of [ic, vc, cc, oc]) {
      if (c !== cc) c.fill = fill;
      c.border = BORDE;
    }
  });

  nota(
    ws,
    `A${IPC_FIN + 2}:F${IPC_FIN + 2}`,
    `La columna «Clave» la usa la hoja «Quebrantos» para buscar el índice de cada mes: no la toques. Mientras un mes no esté publicado ni cargado, el coeficiente usa el índice de ${nombrePeriodo(ULTIMO_PERIODO_IPC)} y queda incompleto hacia abajo.`,
  );
  ws.getRow(IPC_FIN + 2).height = 32;
  ws.views = [{ state: "frozen", xSplit: 2, ySplit: 4 }];
}

// ─── Quebrantos ──────────────────────────────────────────────────────────────

function buildQuebrantos(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_SOC.quebrantos, { properties: { tabColor: { argb: "FF6A1B9A" } } });
  ws.columns = [
    { width: 4 }, { width: 16 }, { width: 10 }, { width: 22 }, { width: 22 },
    { width: 30 }, { width: 13 }, { width: 13 }, { width: 24 }, { width: 62 },
  ];
  titulo(ws, "A1:J1", "Quebrantos de ejercicios anteriores, actualizados por IPC", "FF6A1B9A");
  ws.mergeCells("A2:J2");
  const sub = ws.getCell("A2");
  sub.value = `Art. 25 de la Ley de Ganancias, undécimo párrafo (texto del art. 190 de la Ley 27.802): el quebranto se actualiza por la variación del IPC entre el mes de cierre del ejercicio en que se originó y el mes de cierre del que se liquida, siempre que su ejercicio SE HAYA INICIADO desde el 1/1/${ANIO_CORTE_QUEBRANTOS}. Vive ${ANIOS_DE_VIDA} ejercicios desde el de origen.`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.alignment = { wrapText: true, vertical: "top" };
  ws.getRow(2).height = 46;

  const headers = [
    "#", "Mes de cierre del ejercicio de origen", "Año", "Monto del quebranto",
    "Ese ejercicio se inició en", "¿Se actualiza?", "Ejercicios transcurridos", "Coeficiente",
    "Computable en este ejercicio", "Qué pasa con este quebranto",
  ];
  headers.forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF8E24AA");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(4).height = 42;

  const L = HOJAS_SOC.liquidador;
  const claveLiquidado = `'${L}'!$D$6`;
  const ordinalLiquidado = `'${L}'!$D$7`;
  const anioCierreLiquidado = `'${L}'!${CELDAS_SOC.anioCierre}`;

  for (let i = 0; i < QUEBRANTOS_FILAS; i++) {
    const r = QUEBRANTO_F0 + i;
    const monto = `D${r}`;
    const nc = ws.getCell(`A${r}`);
    nc.value = i + 1;
    nc.fill = S.label;
    nc.border = BORDE;
    nc.alignment = { horizontal: "center" };

    const mes = celdaInput(ws, `B${r}`, MESES_SOC[11]);
    mes.dataValidation = desplegable([...MESES_SOC], "Elegí el mes de cierre del ejercicio en que se originó el quebranto.");
    const anio = celdaInput(ws, `C${r}`, "");
    anio.alignment = { horizontal: "center" };
    anio.dataValidation = {
      type: "whole",
      operator: "between",
      allowBlank: true,
      showErrorMessage: true,
      formulae: [2000, 2100],
      error: "Ingresá el año de cierre del ejercicio de origen (por ejemplo 2025).",
    };
    const m = celdaInput(ws, `D${r}`, "");
    m.numFmt = ARS_FMT_DEC;
    m.alignment = { horizontal: "right" };
    m.dataValidation = {
      type: "decimal",
      operator: "greaterThanOrEqual",
      allowBlank: true,
      showErrorMessage: true,
      formulae: [0],
      error: "Ingresá el monto del quebranto (0 o más).",
    };

    // Auxiliares ocultos: la cuenta del art. 25 paso por paso, igual que src/lib/quebrantos.ts.
    const aux: [string, string][] = [
      [`K${r}`, `IFERROR(MATCH(B${r},${RANGO_MESES},0),0)`],
      [`L${r}`, `IF(K${r}=12,C${r},C${r}-1)`],
      [`M${r}`, `C${r}&"-"&IF(K${r}<10,"0","")&K${r}`],
      [`N${r}`, `L${r}>=${ANIO_CORTE_QUEBRANTOS}`],
      [`O${r}`, `${anioCierreLiquidado}-C${r}`],
      [`P${r}`, `O${r}>${ANIOS_DE_VIDA}`],
      [`Q${r}`, `C${r}*12+K${r}`],
      [`R${r}`, `${ordinalLiquidado}>Q${r}`],
    ];
    for (const [ref, formula] of aux) ws.getCell(ref).value = { formula };

    const salida: [string, string, string][] = [
      [`E${r}`, `IF(${monto}<=0,"",INDEX(${RANGO_MESES},IF(K${r}=12,1,K${r}+1))&" de "&L${r})`, "@"],
      [
        `F${r}`,
        `IF(${monto}<=0,"",IF(NOT(R${r}),"Revisá el cierre: es posterior al que liquidás",IF(P${r},"No: ya está vencido",IF(N${r},"Sí: por IPC","No: el ejercicio se inició antes del 1/1/" & ${ANIO_CORTE_QUEBRANTOS}))))`,
        "@",
      ],
      [`G${r}`, `IF(OR(${monto}<=0,NOT(R${r})),"",O${r})`, "0"],
      [
        `H${r}`,
        `IF(OR(${monto}<=0,NOT(R${r}),NOT(N${r}),P${r}),1,(${ipcDe(claveLiquidado)})/(${ipcDe(`M${r}`)}))`,
        "0.0000",
      ],
      [`I${r}`, `IF(OR(${monto}<=0,NOT(R${r}),P${r}),0,ROUND(${monto}*H${r},2))`, ARS_FMT_DEC],
      [
        `J${r}`,
        `IF(${monto}<=0,"",IF(NOT(R${r}),"El ejercicio de origen cierra después del que estás liquidando: no se puede computar acá.",IF(P${r},"Pasaron más de ${ANIOS_DE_VIDA} ejercicios desde el de origen: el art. 25 ya no lo deja deducir.",IF(NOT(N${r}),"Se computa por su valor nominal. El art. 190 puso la fecha de corte en el INICIO del ejercicio, no en el cierre.",IF(O${r}=${ANIOS_DE_VIDA},"Último ejercicio en el que se puede computar: los ${ANIOS_DE_VIDA} años del art. 25 se agotan acá.","Se actualiza por IPC entre el cierre de origen y el cierre que estás liquidando.")))))`,
        "@",
      ],
    ];
    for (const [ref, formula, fmt] of salida) {
      const c = ws.getCell(ref);
      c.value = { formula };
      c.fill = S.output;
      c.border = BORDE;
      c.numFmt = fmt;
      c.alignment = fmt === "@" ? { wrapText: true, vertical: "top", indent: 1 } : { horizontal: "right" };
    }
    ws.getRow(r).height = 32;
  }

  for (const col of ["K", "L", "M", "N", "O", "P", "Q", "R"]) ws.getColumn(col).hidden = true;

  const t = FILA_TOTAL_QUEBRANTOS;
  const et = ws.getCell(`A${t}`);
  ws.mergeCells(`A${t}:H${t}`);
  et.value = "Total computable en el ejercicio que liquidás";
  et.font = { bold: true };
  et.fill = S.total;
  et.border = BORDE;
  et.alignment = { horizontal: "right", indent: 1 };
  const tv = ws.getCell(`I${t}`);
  tv.value = { formula: `SUM(I${QUEBRANTO_F0}:I${QUEBRANTO_FIN})` };
  tv.font = { bold: true };
  tv.fill = S.total;
  tv.border = BORDE;
  tv.numFmt = ARS_FMT_DEC;
  tv.alignment = { horizontal: "right" };

  nota(
    ws,
    `A${t + 2}:J${t + 2}`,
    `Este total va solo a la celda «Quebrantos de ejercicios anteriores» de la hoja «Mi sociedad». El liquidador no computa más quebranto que la ganancia del ejercicio: el resto sigue vivo para los ejercicios que vienen, dentro de los ${ANIOS_DE_VIDA} años.`,
  );
  ws.getRow(t + 2).height = 32;
  nota(
    ws,
    `A${t + 3}:J${t + 3}`,
    "Esta hoja actualiza y ordena; no decide la compensación. Los quebrantos que el art. 25 llama «de naturaleza específica» (rentas financieras, enajenación de acciones y monedas digitales, derivados que no sean de cobertura, plataforma continental y fuente extranjera) sólo se compensan contra ganancias de su misma fuente y tipo de operación.",
  );
  ws.getRow(t + 3).height = 46;
  ws.views = [{ state: "frozen", xSplit: 1, ySplit: 4 }];
}

// ─── Mi sociedad ─────────────────────────────────────────────────────────────

function buildLiquidador(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_SOC.liquidador, { properties: { tabColor: { argb: VERDE } } });
  ws.columns = [{ width: 62 }, { width: 30 }, { width: 3 }, { width: 16 }];
  titulo(ws, "A1:B1", "Mi sociedad — impuesto determinado del art. 73", VERDE);
  ws.mergeCells("A2:B2");
  const sub = ws.getCell("A2");
  sub.value = `Escala de la Ley 27.630 ajustada por IPC · la tabla la elige el año de INICIO del ejercicio · dividendos al ${Math.round(ALICUOTA_DIVIDENDOS * 100)}%`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  const C = CELDAS_SOC;
  const Q = HOJAS_SOC.quebrantos;

  bandaSeccion(ws, "A4:B4", "EL EJERCICIO QUE LIQUIDÁS");
  celdaEtiqueta(ws, "A5", "Mes de cierre del ejercicio");
  const mes = celdaInput(ws, C.mesCierre, MESES_SOC[11]);
  mes.dataValidation = desplegable([...MESES_SOC], "Elegí el mes en que cierra el ejercicio.");
  celdaEtiqueta(ws, "A6", "Año de cierre del ejercicio");
  const anio = celdaInput(ws, C.anioCierre, ULTIMO_ANIO_ESCALA);
  anio.alignment = { horizontal: "right" };
  anio.dataValidation = {
    type: "whole",
    operator: "between",
    showErrorMessage: true,
    formulae: [2021, 2100],
    error: "Ingresá el año en que cierra el ejercicio (por ejemplo 2026).",
  };

  bandaSeccion(ws, "A8:B8", "LO QUE DECLARÁS");
  celdaEtiqueta(ws, "A9", "Ganancia neta imponible del ejercicio (antes de quebrantos)");
  const g = celdaInput(ws, C.ganancia, 500_000_000);
  g.numFmt = ARS_FMT_DEC;
  g.alignment = { horizontal: "right" };
  g.dataValidation = {
    type: "decimal",
    operator: "greaterThanOrEqual",
    showErrorMessage: true,
    formulae: [0],
    error: "Ingresá la ganancia neta imponible (0 o más). Si el ejercicio dio pérdida, cargala en la hoja «Quebrantos» del año que viene.",
  };
  celdaEtiqueta(ws, "A10", "Quebrantos de ejercicios anteriores (viene de la hoja «Quebrantos»)");
  const q = celdaInput(ws, C.quebrantos, 0);
  q.value = { formula: `'${Q}'!$I$${FILA_TOTAL_QUEBRANTOS}` };
  q.numFmt = ARS_FMT_DEC;
  q.alignment = { horizontal: "right" };
  celdaEtiqueta(ws, "A11", "Parte de lo que queda que se reparte a socios personas humanas");
  const d = celdaInput(ws, C.distribuido, 0);
  d.numFmt = "0%";
  d.alignment = { horizontal: "right" };
  d.dataValidation = {
    type: "decimal",
    operator: "between",
    showErrorMessage: true,
    formulae: [0, 1],
    error: "Ingresá un porcentaje entre 0% y 100%.",
  };

  // Auxiliares ocultos: el mes de cierre como número, el año de inicio como índice de la tabla de
  // escalas, y las claves que usa la hoja Quebrantos.
  ws.getCell("D5").value = { formula: `IFERROR(MATCH(${C.mesCierre},${RANGO_MESES},0),0)` };
  ws.getCell("D6").value = { formula: `${C.anioCierre}&"-"&IF($D$5<10,"0","")&$D$5` };
  ws.getCell("D7").value = { formula: `${C.anioCierre}*12+$D$5` };
  ws.getCell("D15").value = { formula: `IFERROR(MATCH(${C.anioInicio},${rangoEsc(E_COL.anio)},0),0)` };
  ws.getCell("D16").value = { formula: `IFERROR(MATCH(${C.anioCierre},${rangoEsc(E_COL.anio)},0),0)` };
  ws.getColumn("D").hidden = true;

  const idx = "$D$15";
  const idxCierre = "$D$16";
  const esc = (col: string, i: string) => `INDEX(${rangoEsc(col)},${i})`;
  /** El impuesto del art. 73 con la escala de la fila `i`: fijo del tramo más la alícuota del excedente. */
  const impuestoCon = (base: string, i: string) =>
    `IF(${i}=0,0,IF(${base}<=${esc(E_COL.l1, i)},ROUND(${base}*0.25,2),` +
    `IF(${base}<=${esc(E_COL.l2, i)},ROUND(${esc(E_COL.fijo30, i)}+(${base}-${esc(E_COL.l1, i)})*0.3,2),` +
    `ROUND(${esc(E_COL.fijo35, i)}+(${base}-${esc(E_COL.l2, i)})*0.35,2))))`;

  bandaSeccion(ws, "A13:B13", "EL EJERCICIO Y LA ESCALA QUE LE TOCA");
  celdaResultado(ws, 14, "El ejercicio empezó en", `IFERROR(INDEX(${RANGO_MESES},IF($D$5=12,1,$D$5+1))&" de "&${C.anioInicio},"")`, { formato: "@" });
  celdaResultado(ws, 15, "Año de INICIO del ejercicio (el que elige la tabla)", `IF($D$5=12,${C.anioCierre},${C.anioCierre}-1)`, { total: true, formato: "0" });
  celdaResultado(
    ws,
    16,
    "Escala que se aplica",
    `IF(${idx}=0,"La escala de los ejercicios iniciados en "&${C.anioInicio}&" no está en esta planilla","Ejercicios iniciados en "&${C.anioInicio}&" · "&${esc(E_COL.origen, idx)})`,
    { formato: "@" },
  );
  celdaResultado(
    ws,
    17,
    "Tramo en el que cae la sociedad",
    `IF(${idx}=0,"—",IF(${C.base}<=${esc(E_COL.l1, idx)},"25%",IF(${C.base}<=${esc(E_COL.l2, idx)},"30%","35%")))`,
    { formato: "@" },
  );

  // Todo importe se cierra al centavo con ROUND, como en el resto de los generadores: la DDJJ se
  // presenta en centavos. Si el check acusa un desvío de centavos sobre miles de millones, mirar
  // primero el evaluador: HyperFormula resuelve `2000000000-626567197.85` como 1373432802,2 y Excel
  // como 1373432802,15. Hay un caso que lo deja escrito en check_planilla_ganancias_sociedades.ts.
  bandaSeccion(ws, "A19:B19", "EL IMPUESTO DE LA SOCIEDAD");
  celdaResultado(ws, 20, "Quebranto computado en este ejercicio", `MIN(MAX(${C.quebrantos},0),MAX(${C.ganancia},0))`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 21, "Ganancia neta sujeta a impuesto", `ROUND(MAX(${C.ganancia},0)-${C.quebrantoComputado},2)`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 22, "IMPUESTO DETERMINADO", impuestoCon(C.base, idx), { total: true, formato: ARS_FMT_DEC });
  celdaResultado(ws, 23, "Alícuota efectiva (lo que de verdad paga)", `IF(${C.base}>0,${C.impuesto}/${C.base},0)`, { formato: "0.00%" });
  celdaResultado(
    ws,
    24,
    "Alícuota del último peso (marginal)",
    `IF(${idx}=0,0,IF(${C.base}<=${esc(E_COL.l1, idx)},0.25,IF(${C.base}<=${esc(E_COL.l2, idx)},0.3,0.35)))`,
    { formato: "0%" },
  );
  celdaResultado(ws, 25, "Ganancia después del impuesto", `ROUND(${C.base}-${C.impuesto},2)`, { formato: ARS_FMT_DEC });

  bandaSeccion(ws, "A27:B27", "SI LA SOCIEDAD REPARTE DIVIDENDOS");
  celdaResultado(ws, 28, "Dividendos repartidos a socios personas humanas", `ROUND(${C.despuesImpuesto}*MIN(1,MAX(0,${C.distribuido})),2)`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 29, `Retención del ${Math.round(ALICUOTA_DIVIDENDOS * 100)}% que practica la sociedad`, `ROUND(${C.dividendos}*${ALICUOTA_DIVIDENDOS},2)`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 30, "Lo que les queda a los socios en mano", `ROUND(${C.dividendos}-${C.retencion},2)`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 31, "CARGA TOTAL (sociedad + socios)", `ROUND(${C.impuesto}+${C.retencion},2)`, { total: true, formato: ARS_FMT_DEC });
  celdaResultado(ws, 32, "Carga total sobre la ganancia", `IF(${C.base}>0,${C.cargaTotal}/${C.base},0)`, { formato: "0.00%" });

  bandaSeccion(ws, "A34:B34", "EL ERROR MÁS CARO: EQUIVOCARSE DE TABLA");
  celdaResultado(ws, 35, "Impuesto con la escala del año de inicio (la que corresponde)", C.impuesto, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 36, "Impuesto si usaras la escala del año de cierre", impuestoCon(C.base, idxCierre), { formato: ARS_FMT_DEC });
  celdaResultado(ws, 37, "DIFERENCIA que te ahorrarías de más (y ARCA te reclamaría)", `IF(OR(${idx}=0,${idxCierre}=0),0,ROUND(${C.impuestoInicio}-${C.impuestoCierre},2))`, { total: true, formato: ARS_FMT_DEC });
  celdaResultado(
    ws,
    38,
    "Qué significa",
    `IF($D$5=12,"Cerrás en diciembre: el ejercicio empieza y cierra el mismo año, así que no hay dos tablas posibles.",` +
      `IF(${idxCierre}=0,"La escala de "&${C.anioCierre}&" todavía no existe: el INDEC no publicó el IPC de octubre de "&(${C.anioCierre}-1)&".",` +
      `IF(${C.diferenciaTabla}=0,"Las dos tablas dan el mismo impuesto para esta ganancia.",` +
      `"Manda el año de INICIO ("&${C.anioInicio}&"). Usar la tabla de "&${C.anioCierre}&" declararía de menos la diferencia de arriba.")))`,
    { formato: "@" },
  );

  nota(
    ws,
    "A40:B40",
    "* Esta planilla da el IMPUESTO DETERMINADO. Lo que se ingresa con la declaración jurada es eso menos los anticipos, las retenciones y las percepciones del período: ARCA lo dice así — «al importe resultante se le deberán restar, de corresponder, los anticipos y pagos a cuenta ingresados y las percepciones y retenciones sufridas durante el período».",
  );
  ws.getRow(40).height = 46;
  nota(
    ws,
    "A41:B41",
    "* La escala alcanza a las SA (también unipersonales), SAS, SRL y sociedades en comandita, y a asociaciones, fundaciones, cooperativas, mutuales y fideicomisos del país sin otro tratamiento. Las rentas de casinos, máquinas de apuestas y juegos de azar por plataformas digitales no usan la escala: pagan el 41,5%.",
  );
  ws.getRow(41).height = 46;
  nota(ws, "A42:B42", "* Las celdas amarillas son las que completás vos; las verdes las calcula la planilla sola.");
  ws.views = [{ state: "frozen", ySplit: 3 }];
}

// ─── Main ────────────────────────────────────────────────────────────────────

export async function generarPlanillaGananciasSociedades(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = "Planilla de Ganancias de sociedades 2026";
  wb.subject = "Impuesto a las ganancias de sociedades (art. 73 LIG): escala por año de inicio, dividendos y quebrantos actualizados";
  wb.keywords = "ganancias, sociedades, art. 73, sa, sas, srl, dividendos, quebrantos, arca, planilla";

  buildInstrucciones(wb);
  buildLiquidador(wb);
  buildEscalas(wb);
  buildQuebrantos(wb);
  buildIpc(wb);
  hojaFuentes(
    wb,
    [
      ...GANANCIAS_SOCIEDADES_FUENTES.lista.map((f) => ({ nombre: f.nombre, url: f.url })),
      { nombre: QUEBRANTOS_FUENTES.lista[0].nombre, url: QUEBRANTOS_FUENTES.lista[0].url },
      { nombre: QUEBRANTOS_FUENTES.lista[1].nombre, url: QUEBRANTOS_FUENTES.lista[1].url },
    ],
    GANANCIAS_SOCIEDADES_FUENTES.consultadoEl,
    [],
    `Planilla de calcular.ar. Las actualizaciones están incluidas en el precio: cuando el INDEC publica el IPC de octubre y aparece la escala de los ejercicios que se inician el año siguiente, regeneramos la planilla y el mismo enlace de descarga te baja la versión al día. La serie del IPC de esta versión llega hasta ${nombrePeriodo(ULTIMO_PERIODO_IPC)}.`,
  );

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salida = path.join(dir, ARCHIVO_SOCIEDADES);
  await wb.xlsx.writeFile(salida);
  return salida;
}

if (process.argv[1] && /gen_planilla_ganancias_sociedades\.ts$/.test(process.argv[1])) {
  generarPlanillaGananciasSociedades()
    .then((salida) => console.log(`Planilla Ganancias de sociedades generada: ${salida}`))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
