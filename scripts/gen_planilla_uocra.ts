/**
 * Genera private/planilla-uocra-2026.xlsx — el producto pago de UOCRA (CCT 76/75).
 *
 * INVARIANTE QUE NO SE PUEDE ROMPER: la escala NO se escribe a mano acá. Sale de
 * src/data/convenios/uocra.ts, la misma fuente que alimenta la calculadora gratis de
 * /convenios/uocra. Es imposible que el archivo que se vende diga un número distinto del
 * que el sitio muestra gratis — y esa coincidencia es todo el argumento de venta.
 *
 * El 8/8/2026 la primera compradora recibió un .xlsx de Comercio con la escala de seis
 * semanas antes porque el archivo se generaba a mano en otro proyecto y nadie lo regeneró.
 * Por eso este generador vive DENTRO de calcular-ar, escribe directo a private/ y
 * scripts/check_planilla_uocra.ts abre el archivo resultante y lo compara contra los datos
 * vivos: si queda viejo, el árbol se pone rojo.
 *
 * Uso: npx -y tsx scripts/gen_planilla_uocra.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { mkdirSync, existsSync } from "node:fs";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_APORTES_REMUNERATIVO,
  UOCRA_APORTES_SNR,
  UOCRA_APORTE_SOLIDARIO,
  UOCRA_ASISTENCIA_PERFECTA,
  UOCRA_FUENTES,
  UOCRA_HOMOLOGACIONES,
  UOCRA_HORAS_MES_PROMEDIO,
  UOCRA_HORAS_SEMANALES,
  UOCRA_PROXIMA_PARITARIA,
  ZONAS_UOCRA,
  type CategoriaUocraId,
} from "../src/data/convenios/uocra";
import {
  MESES_UOCRA_HISTORICO,
  UOCRA_FUENTES_HISTORICO,
  UOCRA_HISTORICO_CONSULTADO_EL,
} from "../src/data/convenios/uocra-historico";
import { textoProximaParitaria } from "../src/lib/convenios";
import {
  ARS_FMT,
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

const ESC = "Escalas";
export const HOJA_DIFERENCIAS_UOCRA = "Diferencias";

// La escala del archivo arranca en junio 2024 para poder reclamar diferencias salariales; la
// calculadora del sitio sigue usando sólo MESES_UOCRA.
const MESES = [...MESES_UOCRA_HISTORICO, ...MESES_UOCRA];

// Coordenadas del Liquidador que lee src/lib/prefill/uocra.ts para entregar la planilla con los
// datos de la calculadora. scripts/check_prefill_planillas.ts compara las dos copias.
export const HOJA_LIQUIDADOR_UOCRA = "Liquidador";
export const CELDAS_UOCRA = {
  categoria: "B5",
  zona: "B6",
  mes: "B7",
  horas: "B8",
  asistencia: "B9",
  solidario: "B10",
  bruto: "B19",
  neto: "B21",
} as const;

// Layout de la hoja Escala. El Liquidador y scripts/check_planilla_uocra.ts leen estas
// mismas coordenadas: si cambian acá, cambian en los dos lados o el check se pone rojo.
const FILA_HEADER = 2;
const FILA_JORNAL_INI = 3;
const COMBOS = CATEGORIAS_UOCRA.length * ZONAS_UOCRA.length; // 5 × 4 = 20
const FILA_JORNAL_FIN = FILA_JORNAL_INI + COMBOS - 1;
const FILA_SNR_INI = FILA_JORNAL_FIN + 2; // una fila de aire entre bloques
const FILA_SNR_FIN = FILA_SNR_INI + COMBOS - 1;
const COL_MES_INI = 4; // D
const COL_MES_FIN = COL_MES_INI + MESES.length - 1;

function letraCol(n: number): string {
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

const L_MES_INI = letraCol(COL_MES_INI);
const L_MES_FIN = letraCol(COL_MES_FIN);
const COL_LISTA_MESES_LIQ = "G";

// Con 30 meses la lista en línea pasa los 255 caracteres que acepta Excel, así que el desplegable
// lee una columna de la MISMA hoja. Apuntarlo a otra hoja (la fila de encabezados de «Escalas»)
// dejaba el desplegable vacío en Google Sheets y en Excel del celular: una compradora no pudo
// elegir junio 2024 (21/10/2026). check_planilla_uocra_diferencias.ts lo vigila.
// Cada celda lleva su propio mensaje: con dos validaciones idénticas exceljs las junta en un solo
// rango (B8:B9) y Google Sheets, al importar, corre una fila la lista de la segunda celda.
function desplegableMeses(hoja: string, col: string, filaIni: number, error = "Elegí un mes de la lista."): ExcelJS.DataValidation {
  return {
    type: "list",
    allowBlank: false,
    formulae: [`'${hoja}'!${col}${filaIni}:${col}${filaIni + MESES.length - 1}`],
    showErrorMessage: true,
    error,
  };
}

// Todas las combinaciones categoría × zona, en el orden en que se escriben las filas.
const COMBINACIONES = CATEGORIAS_UOCRA.flatMap((cat) =>
  ZONAS_UOCRA.map((zona) => ({ cat, zona })),
);

// ─── Hoja 1: INSTRUCCIONES ───────────────────────────────────────────────────

function buildInstrucciones(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet("Instrucciones", { properties: { tabColor: { argb: "FFF57C00" } } });
  ws.columns = [{ width: 4 }, { width: 104 }];

  titulo(ws, "A1:B1", "Cómo usar esta planilla", "FFF57C00");

  const pasos: [string, string][] = [
    ["1", "Andá a la hoja «Liquidador» (la segunda pestaña, abajo a la izquierda)."],
    ["2", "Completá solo las celdas amarillas: categoría, zona, mes, horas trabajadas, asistencia perfecta y aporte solidario. Las demás se calculan solas."],
    ["3", "Las celdas verdes son el resultado: básico, asistencia perfecta, suma no remunerativa, bruto y neto estimado. No las toques ni las pises con números."],
    ["4", `La hoja «Diferencias» calcula lo que se le debe a un trabajador mal registrado o mal pagado: elegís la categoría que le corresponde, la que figura en el recibo (o cargás lo que cobró) y el período, desde ${MESES[0].etiqueta}. Suma sueldo, suma no remunerativa, aguinaldo y fondo de cese.`],
    ["5", `La hoja «${ESC}» tiene los jornales oficiales por categoría y zona, mes por mes, de ${MESES[0].etiqueta} a ${MESES.at(-1)!.etiqueta}. Es de donde salen todos los valores.`],
    ["6", "La hoja «Fuentes» tiene el link a cada acuerdo paritario firmado y la fecha en que se verificó. Si alguien te discute un número, ahí está el PDF."],
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

  bandaSeccion(ws, `A${r}:B${r}`, "LO QUE TENÉS QUE SABER DE ESTE CONVENIO");
  r++;
  const claves: string[] = [
    `Jornada del CCT 76/75: máximo ${UOCRA_HORAS_SEMANALES} horas semanales (9 por día). Un mes completo son ${UOCRA_HORAS_MES_PROMEDIO.toFixed(2)} horas (${UOCRA_HORAS_SEMANALES} × 52 ÷ 12). Ese es el valor que viene puesto por defecto.`,
    `Asistencia perfecta (art. 52): ${UOCRA_ASISTENCIA_PERFECTA * 100}% sobre el básico, por quincena. No se pierde por vacaciones, licencias, feriados ni suspensiones por lluvia.`,
    "Suma no remunerativa (SNR): monto fijo por categoría y zona, se paga 50% con cada quincena y solo descuenta el 3% de obra social.",
    "En agosto de 2026 la SNR se absorbió al jornal: por eso ese mes figura en cero. No es un dato faltante, es el dato correcto.",
    "En la construcción NO hay adicional por antigüedad (Ley 22.250). En lugar de indemnización por despido está el fondo de cese laboral: 12% de la remuneración el primer año, 8% después. No es un descuento del sueldo del trabajador.",
    `Aportes del trabajador: ${UOCRA_APORTES_REMUNERATIVO * 100}% sobre lo remunerativo (11% jubilación + 3% PAMI + 3% obra social) más ${UOCRA_APORTE_SOLIDARIO * 100}% de aporte solidario donde corresponde. La SNR solo aporta ${UOCRA_APORTES_SNR * 100}% de obra social.`,
    `${textoProximaParitaria(UOCRA_PROXIMA_PARITARIA, new Date().toISOString().slice(0, 10))} Cuando se firme y publique la escala, actualizamos la planilla y te llega la versión nueva por email.`,
  ];
  for (const t of claves) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 32;
    r++;
  }

  r++;
  nota(
    ws,
    `A${r}:B${r}`,
    "El neto que calcula esta planilla es estimado: no incluye Ganancias (aplica recién en sueldos altos), embargos ni descuentos particulares del recibo. Para un recibo oficial, consultá con tu contador.",
  );
  r += 2;
  nota(
    ws,
    `A${r}:B${r}`,
    "Esta planilla da exactamente los mismos números que la calculadora gratuita de calcular.ar/convenios/uocra — es la misma escala verificada, la misma fórmula. Si alguna vez difieren, escribinos y lo corregimos.",
  );
}

// ─── Hoja 2: ESCALA 2026 ─────────────────────────────────────────────────────
// A = Clave de búsqueda ("J|Categoría|Zona" para jornal, "S|..." para SNR), B = Categoría,
// C = Zona, D.. = un mes por columna. El Liquidador entra con INDEX/MATCH sobre la clave,
// así que agregar un mes es agregar una columna: ninguna fórmula queda apuntando a un rango
// viejo, y agregar una zona o categoría solo alarga los dos bloques.

function buildEscala(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(ESC, { properties: { tabColor: { argb: "FF1565C0" } } });
  ws.columns = [
    { width: 34 },
    { width: 24 },
    { width: 16 },
    ...MESES.map(() => ({ width: 15 })),
  ];

  titulo(ws, `A1:${L_MES_FIN}1`, `Escala oficial UOCRA ${MESES[0].etiqueta} a ${MESES.at(-1)!.etiqueta} — CCT 76/75 (jornales y sumas no remunerativas)`, "FF1565C0");

  const headers = ["Clave", "Categoría", "Zona", ...MESES.map((m) => m.etiqueta)];
  headers.forEach((h, i) => {
    const c = ws.getCell(FILA_HEADER, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: "center" };
  });
  ws.getRow(FILA_HEADER).height = 22;

  const bloques: Array<{
    inicio: number;
    prefijo: "J" | "S";
    valor: (cat: (typeof CATEGORIAS_UOCRA)[number], zonaId: string, mes: (typeof MESES)[number]) => number;
  }> = [
    {
      inicio: FILA_JORNAL_INI,
      prefijo: "J",
      valor: (cat, zonaId, mes) =>
        cat.mensual
          ? mes.serenoMensual[zonaId as keyof typeof mes.serenoMensual]
          : mes.jornales[cat.id as Exclude<CategoriaUocraId, "sereno">][
              zonaId as keyof (typeof mes.jornales)["oficial"]
            ],
    },
    {
      inicio: FILA_SNR_INI,
      prefijo: "S",
      valor: (cat, zonaId, mes) => mes.snr[cat.id][zonaId as keyof (typeof mes.snr)["oficial"]],
    },
  ];

  for (const bloque of bloques) {
    COMBINACIONES.forEach(({ cat, zona }, i) => {
      const r = bloque.inicio + i;
      const fill = i % 2 === 0 ? S.white : S.cebra;

      const clave = ws.getCell(r, 1);
      clave.value = `${bloque.prefijo}|${cat.nombre}|${zona.nombre}`;
      clave.fill = fill;
      clave.border = BORDE;
      clave.font = { size: 9, color: { argb: "FF9E9E9E" } };

      const cc = ws.getCell(r, 2);
      cc.value = cat.nombre;
      cc.fill = fill;
      cc.border = BORDE;

      const zc = ws.getCell(r, 3);
      zc.value = zona.nombre;
      zc.fill = fill;
      zc.border = BORDE;

      MESES.forEach((mes, j) => {
        const c = ws.getCell(r, COL_MES_INI + j);
        c.value = bloque.valor(cat, zona.id, mes);
        c.numFmt = ARS_FMT;
        c.fill = fill;
        c.border = BORDE;
        c.alignment = { horizontal: "right" };
      });
    });
  }

  // Rótulos de bloque, en la fila de aire.
  const rotulo = ws.getCell(FILA_SNR_INI - 1, 1);
  rotulo.value = "SUMA NO REMUNERATIVA (mensual, por categoría y zona)";
  rotulo.font = { bold: true, size: 10, color: { argb: "FF1B5E20" } };
  ws.mergeCells(FILA_SNR_INI - 1, 1, FILA_SNR_INI - 1, COL_MES_FIN);

  let r = FILA_SNR_FIN + 2;
  nota(
    ws,
    `A${r}:${L_MES_FIN}${r}`,
    "Jornales por hora, salvo el Sereno, que cobra sueldo mensual fijo (art. 12 del CCT: jornada de vigilancia de 12 horas). El adicional por zona desfavorable ya está incluido en cada valor.",
  );
  r++;
  nota(
    ws,
    `A${r}:${L_MES_FIN}${r}`,
    `Agosto 2026 no tiene suma no remunerativa: el acuerdo del 19/5/2026 la absorbió al jornal. Abril a noviembre 2026 verificado el ${UOCRA_FUENTES.consultadoEl}; ${MESES[0].etiqueta} a marzo 2026, el ${UOCRA_HISTORICO_CONSULTADO_EL}, contra los acuerdos firmados (ver hoja Fuentes). Julio 2024 y abril 2025 repiten el mes anterior porque no hubo acuerdo para esos meses.`,
  );
  r++;
  nota(ws, `A${r}:${L_MES_FIN}${r}`, "La columna «Clave» la usa el Liquidador para buscar los valores. No la borres ni la edites.");

  ws.views = [{ state: "frozen", xSplit: 3, ySplit: FILA_HEADER }];
}

// ─── Hoja 3: LIQUIDADOR ──────────────────────────────────────────────────────

function buildLiquidador(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet("Liquidador", { properties: { tabColor: { argb: "FF1B5E20" } } });
  ws.columns = [{ width: 36 }, { width: 26 }, { width: 4 }, { width: 18 }, { width: 18 }];

  titulo(ws, "A1:B1", "Liquidación de sueldos — UOCRA (construcción)", "FF1B5E20");

  ws.mergeCells("A2:B2");
  const sub = ws.getCell("A2");
  sub.value = `CCT 76/75 · Escalas oficiales UOCRA-CAMARCO · Verificadas el ${UOCRA_FUENTES.consultadoEl}`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  bandaSeccion(ws, "A4:B4", "DATOS DEL TRABAJADOR");

  const inputs: Array<[number, string, string | number, ExcelJS.DataValidation | null]> = [
    [5, "Categoría", "Oficial", desplegable(CATEGORIAS_UOCRA.map((c) => c.nombre), "Elegí una categoría de la lista.")],
    [6, "Zona", "Zona A", desplegable(ZONAS_UOCRA.map((z) => z.nombre), "Elegí una zona de la lista.")],
    [7, "Mes a liquidar", MESES_UOCRA.at(-1)!.etiqueta, desplegableMeses("Liquidador", COL_LISTA_MESES_LIQ, 5)],
    [8, "Horas trabajadas en el mes", Number(UOCRA_HORAS_MES_PROMEDIO.toFixed(2)), {
      type: "decimal",
      operator: "between",
      showErrorMessage: true,
      formulae: [1, 300],
      error: "Ingresá las horas del mes (entre 1 y 300). Mes completo = 190,67.",
    }],
    [9, "¿Cobró asistencia perfecta?", "Sí", desplegable(["Sí", "No"], "Elegí Sí o No.")],
    [10, "¿Aporte solidario / cuota sindical 2%?", "Sí", desplegable(["Sí", "No"], "Elegí Sí o No.")],
  ];

  for (const [fila, etiqueta, valor, validacion] of inputs) {
    celdaEtiqueta(ws, `A${fila}`, etiqueta);
    const c = celdaInput(ws, `B${fila}`, valor);
    if (typeof valor === "number") {
      c.numFmt = "0.00";
      c.alignment = { horizontal: "right" };
    }
    if (validacion) c.dataValidation = validacion;
  }

  // Lista de meses para el desplegable de B7, en una columna oculta de esta misma hoja.
  MESES.forEach((m, i) => {
    ws.getCell(`${COL_LISTA_MESES_LIQ}${5 + i}`).value = m.etiqueta;
  });
  ws.getColumn(COL_LISTA_MESES_LIQ).hidden = true;

  // ── Auxiliares ocultos (columna D) ──
  // D5: columna del mes dentro de la grilla de la Escala.
  ws.getCell("D5").value = {
    formula: `MATCH(B7,'${ESC}'!$${L_MES_INI}$${FILA_HEADER}:$${L_MES_FIN}$${FILA_HEADER},0)`,
  };
  // D6/D7: jornal por hora (o sueldo mensual del sereno) del combo categoría+zona elegido.
  ws.getCell("D6").value = { formula: 'CONCATENATE("J|",B5,"|",B6)' };
  ws.getCell("D7").value = {
    formula: `INDEX('${ESC}'!$${L_MES_INI}$${FILA_JORNAL_INI}:$${L_MES_FIN}$${FILA_JORNAL_FIN},MATCH(D6,'${ESC}'!$A$${FILA_JORNAL_INI}:$A$${FILA_JORNAL_FIN},0),D5)`,
  };
  // D8/D9: suma no remunerativa del mismo combo y mes.
  ws.getCell("D8").value = { formula: 'CONCATENATE("S|",B5,"|",B6)' };
  ws.getCell("D9").value = {
    formula: `INDEX('${ESC}'!$${L_MES_INI}$${FILA_SNR_INI}:$${L_MES_FIN}$${FILA_SNR_FIN},MATCH(D8,'${ESC}'!$A$${FILA_SNR_INI}:$A$${FILA_SNR_FIN},0),D5)`,
  };
  // D10: el sereno cobra por mes, no por hora (art. 12) → las horas no lo multiplican.
  const serenoNombre = CATEGORIAS_UOCRA.find((c) => c.mensual)!.nombre;
  ws.getCell("D10").value = { formula: `IF(B5="${serenoNombre}",1,0)` };
  ws.getColumn("D").hidden = true;
  ws.getColumn("E").hidden = true;

  ws.getRow(11).height = 6;
  bandaSeccion(ws, "A12:B12", "LIQUIDACIÓN DEL MES");

  celdaResultado(ws, 13, "Jornal por hora", '=IF(D10=1,"—",D7)');
  celdaResultado(ws, 14, "Horas del mes", '=IF(D10=1,"—",B8)', { formato: "0.00" });
  celdaResultado(ws, 15, "Básico del mes", "=IF(D10=1,D7,D7*B8)");
  celdaResultado(ws, 16, `Asistencia perfecta (${UOCRA_ASISTENCIA_PERFECTA * 100}%)`, `=IF(B9="Sí",B15*${UOCRA_ASISTENCIA_PERFECTA},0)`);
  celdaResultado(ws, 17, "Total remunerativo", "=B15+B16");
  celdaResultado(ws, 18, "Suma no remunerativa", "=D9");
  celdaResultado(ws, 19, "TOTAL BRUTO", "=B17+B18", { total: true });
  celdaResultado(
    ws,
    20,
    "Aportes del trabajador",
    `=-(B17*(${UOCRA_APORTES_REMUNERATIVO}+IF(B10="Sí",${UOCRA_APORTE_SOLIDARIO},0))+B18*${UOCRA_APORTES_SNR})`,
  );
  celdaResultado(ws, 21, "NETO ESTIMADO", "=B19+B20", { total: true });

  ws.getRow(22).height = 6;
  bandaSeccion(ws, "A23:B23", "COSTO PARA EL EMPLEADOR (referencia)");
  celdaResultado(ws, 24, "Fondo de cese laboral · 1er año (12%)", "=B17*0.12");
  celdaResultado(ws, 25, "Fondo de cese laboral · desde el 2do año (8%)", "=B17*0.08");

  nota(
    ws,
    "A27:B27",
    `* Aportes = ${UOCRA_APORTES_REMUNERATIVO * 100}% (11% jubilación + 3% PAMI + 3% obra social) sobre lo remunerativo, más ${UOCRA_APORTE_SOLIDARIO * 100}% de aporte solidario si corresponde. La suma no remunerativa solo aporta ${UOCRA_APORTES_SNR * 100}% de obra social.`,
  );
  nota(
    ws,
    "A28:B28",
    "* El neto es estimado: no incluye Ganancias, embargos ni descuentos particulares del recibo.",
  );
  nota(
    ws,
    "A29:B29",
    "* El fondo de cese laboral (Ley 22.250) lo deposita el empleador a nombre del trabajador. No es un descuento del sueldo: figura acá como referencia del costo laboral.",
  );
  nota(
    ws,
    "A30:B30",
    "* En la construcción no hay adicional por antigüedad: el régimen de la Ley 22.250 lo reemplaza por el fondo de cese.",
  );

  ws.views = [{ state: "frozen", ySplit: 4 }];
}

// ─── Hoja 4: DIFERENCIAS SALARIALES ──────────────────────────────────────────
// Para el trabajador registrado en una categoría inferior (o pagado por debajo de la escala) que
// reclama lo adeudado. Una fila por mes de la escala; las filas fuera del período elegido quedan
// a la vista pero no suman. scripts/check_planilla_uocra.ts replica estas fórmulas.

export const OTRO_COBRADO = "Otro: cargo lo cobrado";
export const CELDAS_DIFERENCIAS = {
  corresponde: "B5",
  registrada: "B6",
  zona: "B7",
  desde: "B8",
  hasta: "B9",
  asistencia: "B10",
  horas: "B11",
  antiguedad: "B12",
  meses: "I5",
  sueldo: "I6",
  snr: "I7",
  sac: "I8",
  fondoCese: "I9",
  total: "I10",
} as const;
export const FILA_DIF_INI = 16;

function semestreDe(m: (typeof MESES)[number]): { clave: string; etiqueta: string } {
  const s = m.mes <= 6 ? 1 : 2;
  return { clave: `${m.anio}-${s}`, etiqueta: `${s === 1 ? "1er" : "2do"} semestre ${m.anio}` };
}

function buildDiferencias(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJA_DIFERENCIAS_UOCRA, { properties: { tabColor: { argb: "FFB71C1C" } } });
  ws.columns = [
    { width: 40 }, { width: 24 }, { width: 13 }, { width: 16 }, { width: 14 },
    { width: 16 }, { width: 14 }, { width: 16 }, { width: 18 }, { width: 14 }, { width: 9 },
  ];

  titulo(ws, "A1:K1", "Diferencias salariales — UOCRA (CCT 76/75)", "FFB71C1C");
  ws.mergeCells("A2:K2");
  const sub = ws.getCell("A2");
  sub.value = `Lo que le correspondía cobrar contra lo que cobró, mes por mes, con las escalas oficiales de ${MESES[0].etiqueta} a ${MESES.at(-1)!.etiqueta}. Completá las celdas amarillas.`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center", wrapText: true };
  ws.getRow(2).height = 28;

  bandaSeccion(ws, "A4:B4", "DATOS DEL RECLAMO");
  const cats = CATEGORIAS_UOCRA.map((c) => c.nombre);
  const hoy = new Date();
  const mesActual = MESES.find((m) => m.anio === hoy.getFullYear() && m.mes === hoy.getMonth() + 1) ?? MESES.at(-1)!;
  const inputs: Array<[string, string, string | number, ExcelJS.DataValidation]> = [
    [CELDAS_DIFERENCIAS.corresponde, "Categoría que le corresponde", "Oficial", desplegable(cats, "Elegí una categoría.")],
    [CELDAS_DIFERENCIAS.registrada, "Categoría con la que figura en el recibo", "Ayudante", desplegable([...cats, OTRO_COBRADO], "Elegí una categoría o la opción de cargar lo cobrado.")],
    [CELDAS_DIFERENCIAS.zona, "Zona", "Zona A", desplegable(ZONAS_UOCRA.map((zz) => zz.nombre), "Elegí una zona.")],
    [CELDAS_DIFERENCIAS.desde, "Desde", MESES[0].etiqueta, desplegableMeses(HOJA_DIFERENCIAS_UOCRA, "A", FILA_DIF_INI, "Elegí el primer mes del reclamo.")],
    [CELDAS_DIFERENCIAS.hasta, "Hasta", mesActual.etiqueta, desplegableMeses(HOJA_DIFERENCIAS_UOCRA, "A", FILA_DIF_INI, "Elegí el último mes del reclamo.")],
    [CELDAS_DIFERENCIAS.asistencia, "¿Le corresponde asistencia perfecta?", "Sí", desplegable(["Sí", "No"], "Elegí Sí o No.")],
    [CELDAS_DIFERENCIAS.horas, "Horas por mes (mes completo = 190,67)", Number(UOCRA_HORAS_MES_PROMEDIO.toFixed(2)), {
      type: "decimal", operator: "between", showErrorMessage: true, formulae: [0, 300],
      error: "Ingresá las horas del mes (entre 0 y 300).",
    }],
    [CELDAS_DIFERENCIAS.antiguedad, "Meses que llevaba trabajando al empezar el período", 12, {
      type: "whole", operator: "between", showErrorMessage: true, formulae: [0, 600],
      error: "Ingresá un número de meses.",
    }],
  ];
  for (const [ref, etiqueta, valor, val] of inputs) {
    celdaEtiqueta(ws, ref.replace("B", "A"), etiqueta);
    const c = celdaInput(ws, ref, valor);
    c.dataValidation = val;
    if (typeof valor === "number") c.alignment = { horizontal: "right" };
  }
  ws.getCell(CELDAS_DIFERENCIAS.horas).numFmt = "0.00";

  const hdr = `'${ESC}'!$${L_MES_INI}$${FILA_HEADER}:$${L_MES_FIN}$${FILA_HEADER}`;
  const escJ = `'${ESC}'!$${L_MES_INI}$${FILA_JORNAL_INI}:$${L_MES_FIN}$${FILA_JORNAL_FIN}`;
  const keyJ = `'${ESC}'!$A$${FILA_JORNAL_INI}:$A$${FILA_JORNAL_FIN}`;
  const escS = `'${ESC}'!$${L_MES_INI}$${FILA_SNR_INI}:$${L_MES_FIN}$${FILA_SNR_FIN}`;
  const keyS = `'${ESC}'!$A$${FILA_SNR_INI}:$A$${FILA_SNR_FIN}`;
  const serenoNombre = CATEGORIAS_UOCRA.find((c) => c.mensual)!.nombre;
  const { corresponde, registrada, zona, desde, hasta, asistencia, horas, antiguedad } = CELDAS_DIFERENCIAS;
  const abs = (ref: string) => ref.replace(/^([A-Z]+)(\d+)$/, "$$$1$$$2");

  // Auxiliares ocultos en P: índices del período, claves de búsqueda y modos.
  const aux: Array<[string, string]> = [
    ["P5", `MATCH(${abs(desde)},${hdr},0)`],
    ["P6", `MATCH(${abs(hasta)},${hdr},0)`],
    ["P7", `CONCATENATE("J|",${abs(corresponde)},"|",${abs(zona)})`],
    ["P8", `CONCATENATE("S|",${abs(corresponde)},"|",${abs(zona)})`],
    ["P9", `CONCATENATE("J|",${abs(registrada)},"|",${abs(zona)})`],
    ["P10", `CONCATENATE("S|",${abs(registrada)},"|",${abs(zona)})`],
    ["P11", `IF(${abs(corresponde)}="${serenoNombre}",1,0)`],
    ["P12", `IF(${abs(registrada)}="${serenoNombre}",1,0)`],
    ["P13", `IF(${abs(registrada)}="${OTRO_COBRADO}",1,0)`],
    ["P14", `1+IF(${abs(asistencia)}="Sí",${UOCRA_ASISTENCIA_PERFECTA},0)`],
  ];
  for (const [ref, f] of aux) ws.getCell(ref).value = { formula: f };
  for (const col of ["M", "N", "O", "P", "Q"]) ws.getColumn(col).hidden = true;

  const filaHdr = FILA_DIF_INI - 1;
  const encabezados = [
    "Mes", "Horas trabajadas", "Jornal que corresponde", "Sueldo que corresponde", "No remunerativo que corresponde",
    "Sueldo cobrado", "No remunerativo cobrado", "Diferencia de sueldo", "Diferencia no remunerativa", "Fondo de cese", "¿Entra?",
  ];
  encabezados.forEach((h, i) => {
    const c = ws.getCell(filaHdr, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    c.fill = relleno("FFC62828");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(filaHdr).height = 42;

  const filaFin = FILA_DIF_INI + MESES.length - 1;
  MESES.forEach((m, j) => {
    const r = FILA_DIF_INI + j;
    const col = j + 1;
    const fill = j % 2 === 0 ? S.white : S.cebra;
    const jornalReg = `INDEX(${escJ},MATCH($P$9,${keyJ},0),${col})`;
    const formulas: Record<string, string> = {
      C: `INDEX(${escJ},MATCH($P$7,${keyJ},0),${col})`,
      D: `IF($P$11=1,C${r},C${r}*B${r})*$P$14`,
      E: `INDEX(${escS},MATCH($P$8,${keyS},0),${col})`,
      F: `IF($P$13=1,0,IF($P$12=1,${jornalReg},${jornalReg}*B${r})*$P$14)`,
      G: `IF($P$13=1,0,INDEX(${escS},MATCH($P$10,${keyS},0),${col}))`,
      H: `IF(Q${r}=1,D${r}-F${r},0)`,
      I: `IF(Q${r}=1,E${r}-G${r},0)`,
      J: `H${r}*IF(${abs(antiguedad)}+O${r}-$P$5<12,0.12,0.08)`,
      K: `IF(Q${r}=1,"Sí","—")`,
      M: `IF(Q${r}=1,D${r},0)`,
      N: `IF(Q${r}=1,F${r},0)`,
      Q: `IF(AND(O${r}>=$P$5,O${r}<=$P$6),1,0)`,
    };
    const a = ws.getCell(`A${r}`);
    a.value = m.etiqueta;
    a.fill = fill;
    a.border = BORDE;
    const b = celdaInput(ws, `B${r}`, 0);
    b.value = { formula: abs(horas) };
    b.numFmt = "0.00";
    b.alignment = { horizontal: "right" };
    for (const [colL, f] of Object.entries(formulas)) {
      const c = ws.getCell(`${colL}${r}`);
      c.value = { formula: f };
      if ("CDEFGHIJ".includes(colL)) {
        c.numFmt = ARS_FMT;
        c.border = BORDE;
        c.alignment = { horizontal: "right" };
        c.fill = colL === "F" || colL === "G" ? S.input : colL >= "H" ? S.output : fill;
      }
      if (colL === "K") {
        c.border = BORDE;
        c.fill = fill;
        c.alignment = { horizontal: "center" };
      }
    }
    ws.getCell(`O${r}`).value = col;
  });

  // Aguinaldo: Ley 23.041, 50% de la mejor remuneración mensual del semestre, proporcional a los
  // meses del período que caen en él. La suma no remunerativa no entra.
  let r = filaFin + 2;
  bandaSeccion(ws, `A${r}:H${r}`, "AGUINALDO (SAC) POR SEMESTRE");
  r++;
  ["Semestre", "Meses en el período", "Mejor sueldo que corresponde", "Mejor sueldo cobrado", "SAC que corresponde", "SAC cobrado", "", "Diferencia de SAC"].forEach((h, i) => {
    if (!h) return;
    const c = ws.getCell(r, i + 1);
    c.value = h;
    c.font = { bold: true, size: 10 };
    c.fill = S.label;
    c.border = BORDE;
    c.alignment = { horizontal: "center", wrapText: true };
  });
  ws.getRow(r).height = 30;
  const semestres = [...new Map(MESES.map((m) => [semestreDe(m).clave, semestreDe(m)])).values()];
  const sacIni = r + 1;
  const rngQ = `$Q$${FILA_DIF_INI}:$Q$${filaFin}`;
  for (const s of semestres) {
    r++;
    // Los meses de un semestre son filas contiguas: MAX sobre su rango fijo anda en cualquier Excel.
    const idx = MESES.map((m, j) => (semestreDe(m).clave === s.clave ? FILA_DIF_INI + j : -1)).filter((x) => x > 0);
    const [a0, a1] = [idx[0], idx.at(-1)!];
    ws.getCell(`A${r}`).value = s.etiqueta;
    const f: Record<string, string> = {
      B: `SUM(Q${a0}:Q${a1})`,
      C: `MAX(M${a0}:M${a1})`,
      D: `MAX(N${a0}:N${a1})`,
      E: `C${r}/2*B${r}/6`,
      F: `D${r}/2*B${r}/6`,
      H: `E${r}-F${r}`,
    };
    for (const [colL, fx] of Object.entries(f)) {
      const c = ws.getCell(`${colL}${r}`);
      c.value = { formula: fx };
      c.numFmt = colL === "B" ? "0" : ARS_FMT;
      c.border = BORDE;
      c.alignment = { horizontal: "right" };
      c.fill = colL === "H" ? S.output : S.white;
    }
    ws.getCell(`A${r}`).border = BORDE;
  }
  const sacFin = r;

  bandaSeccion(ws, "D4:I4", "RESULTADO DEL RECLAMO");
  const resultado: Array<[string, string, string, boolean]> = [
    [CELDAS_DIFERENCIAS.meses, "Meses incluidos", `SUM(${rngQ})`, false],
    [CELDAS_DIFERENCIAS.sueldo, "Diferencias de sueldo (remunerativo)", `SUM(H${FILA_DIF_INI}:H${filaFin})`, false],
    [CELDAS_DIFERENCIAS.snr, "Diferencias de suma no remunerativa", `SUM(I${FILA_DIF_INI}:I${filaFin})`, false],
    [CELDAS_DIFERENCIAS.sac, "Diferencias de aguinaldo (SAC)", `SUM(H${sacIni}:H${sacFin})`, false],
    [CELDAS_DIFERENCIAS.fondoCese, "Diferencias de fondo de cese laboral", `SUM(J${FILA_DIF_INI}:J${filaFin})`, false],
    [CELDAS_DIFERENCIAS.total, "TOTAL ADEUDADO (sin intereses)", `I6+I7+I8+I9`, true],
  ];
  for (const [ref, etiqueta, f, total] of resultado) {
    const fila = Number(ref.slice(1));
    ws.mergeCells(`D${fila}:H${fila}`);
    const l = ws.getCell(`D${fila}`);
    l.value = etiqueta;
    l.fill = total ? S.total : S.output;
    l.border = BORDE;
    l.alignment = { horizontal: "left", indent: 1 };
    if (total) l.font = { bold: true };
    const v = ws.getCell(ref);
    v.value = { formula: f };
    v.numFmt = ref === CELDAS_DIFERENCIAS.meses ? "0" : ARS_FMT;
    v.fill = total ? S.total : S.output;
    v.border = BORDE;
    v.alignment = { horizontal: "right" };
    if (total) v.font = { bold: true, size: 12 };
  }

  r = sacFin + 2;
  const notas = [
    "Cómo se calcula: sueldo = jornal de la escala × horas del mes (el sereno cobra mensual), más 20% de asistencia perfecta si corresponde (art. 52 CCT 76/75). Si tenés los recibos, pisá las columnas amarillas «Sueldo cobrado» y «No remunerativo cobrado» con lo que dice cada uno: es la forma más precisa. Si cobró algo y no figura, elegí «" + OTRO_COBRADO + "» y cargá los montos.",
    "Horas: si en algún mes trabajó menos (o más) que el mes completo, cambiá las horas de esa fila. Las horas extra no están incluidas: van al 50% o 100% según el día.",
    "Aguinaldo: 50% de la mejor remuneración mensual de cada semestre (Ley 23.041), proporcional a los meses del período. La suma no remunerativa no lo integra.",
    "Fondo de cese laboral (Ley 22.250): el empleador debía depositar 12% de la remuneración durante el primer año de la relación y 8% después. Acá se calcula sobre las diferencias de sueldo de cada mes.",
    "No incluye: intereses ni actualización (los fija el juzgado según la tasa de cada jurisdicción), las multas por registración deficiente (Ley 24.013 y Ley 25.323), indemnizaciones, vacaciones, horas extra ni los aportes que no se ingresaron. Eso lo calcula el abogado o el perito contador.",
    "Es una herramienta de cálculo con las escalas oficiales, no asesoramiento legal. Para presentar un reclamo, llevá esta hoja a un abogado laboralista: le ahorra la parte más larga del trabajo.",
  ];
  for (const t of notas) {
    nota(ws, `A${r}:K${r}`, t);
    ws.getRow(r).height = 30;
    r++;
  }

}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function generarPlanillaUocra(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = "Planilla de sueldos UOCRA 2026 — CCT 76/75";
  wb.subject = "Liquidación de sueldos de la construcción según los acuerdos paritarios oficiales";
  wb.keywords = "uocra, construcción, sueldo, cct 76/75, jornal, planilla, liquidación";

  buildInstrucciones(wb);
  buildEscala(wb);
  buildLiquidador(wb);
  buildDiferencias(wb);
  hojaFuentes(
    wb,
    [
      UOCRA_FUENTES.acuerdoTramo1,
      UOCRA_FUENTES.acuerdoTramo2,
      UOCRA_FUENTES.anexoTramo2,
      UOCRA_FUENTES.cct,
      UOCRA_FUENTES.ley22250,
      UOCRA_FUENTES.uocra,
      ...UOCRA_FUENTES_HISTORICO,
    ],
    UOCRA_FUENTES.consultadoEl,
    [UOCRA_HOMOLOGACIONES.tramo1, UOCRA_HOMOLOGACIONES.tramo2],
  );

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salida = path.join(dir, "planilla-uocra-2026.xlsx");
  await wb.xlsx.writeFile(salida);
  return salida;
}

// Solo corre como script; importado por gen_planilla_todas.ts no hace nada.
if (process.argv[1] && /gen_planilla_uocra\.ts$/.test(process.argv[1])) {
  generarPlanillaUocra()
    .then((salida) => {
      console.log(`Planilla UOCRA generada: ${salida}`);
      console.log(`   Hojas: Instrucciones | ${ESC} | Liquidador | ${HOJA_DIFERENCIAS_UOCRA} | Fuentes`);
      console.log(`   ${MESES.length} meses: ${MESES[0].etiqueta} a ${MESES.at(-1)!.etiqueta}`);
      console.log(`   ${COMBOS} combinaciones categoría × zona`);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
