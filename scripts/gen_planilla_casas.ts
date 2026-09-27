/**
 * Genera private/planilla-casas-particulares-2026.xlsx — el producto pago para quien emplea
 * personal de casas particulares (Ley 26.844).
 *
 * INVARIANTE: ningún importe se escribe a mano acá. La escala sale de src/data/casas-particulares.ts
 * y los aportes de src/data/aportes-casas-particulares.ts, los mismos datos de las calculadoras
 * gratis. scripts/check_planilla_casas.ts abre el archivo, EVALÚA sus fórmulas y las compara con
 * los motores del sitio: si el archivo y la calculadora difieren en un centavo, el árbol se pone rojo.
 *
 * Uso: npx -y tsx scripts/gen_planilla_casas.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import {
  CASAS_PARTICULARES_FUENTES,
  ESCALAS_POR_MES,
  HORAS_EXTRAS,
  JORNADA,
  VACACIONES,
  VACACIONES_PROPORCIONAL,
  ZONA_DESFAVORABLE,
  escalaDe,
  mesVigente,
} from "../src/data/casas-particulares";
import {
  APORTES_FUENTES,
  CONDICIONES,
  RANGOS,
  REGLAS_APORTES,
  TABLA_APORTES,
  VIGENCIA_APORTES,
  type CondicionTrabajador,
} from "../src/data/aportes-casas-particulares";
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

export const ARCHIVO_CASAS = "planilla-casas-particulares-2026.xlsx";

// Coordenadas compartidas con scripts/check_planilla_casas.ts y con la landing: si se mueven
// acá, se mueven allá, o el check (que evalúa ESTAS celdas) se pone rojo.
export const HOJAS = {
  instrucciones: "Instrucciones",
  liquidador: "Liquidador",
  anual: "Pagos del año",
  recibo: "Recibo",
  escala: "Escala 2026",
  aportes: "Aportes ARCA",
} as const;

export const CELDAS = {
  mes: "B5",
  categoria: "B6",
  modalidad: "B7",
  horasSemanales: "B8",
  zona: "B9",
  extrasComunes: "B10",
  extrasFinde: "B11",
  condicion: "B12",
  chequeo: "B13",
  valorHora: "B15",
  minimoMensual: "B16",
  horasMensuales: "B17",
  porHoras: "B18",
  basico: "B19",
  montoExtrasComunes: "B20",
  montoExtrasFinde: "B21",
  total: "B22",
  aguinaldo: "B23",
  rango: "B26",
  arcaTotal: "B27",
  arcaArt: "B28",
  faltaObraSocial: "B29",
  faltaJubilacion: "B30",
  costoTotal: "B31",
} as const;

export const MODALIDADES = { "con-retiro": "Con retiro", "sin-retiro": "Sin retiro" } as const;

// Etiquetas propias para el desplegable: las de CONDICIONES llevan coma y Excel la toma como
// separador de opciones.
export const CONDICION_CORTA: Record<CondicionTrabajador, string> = {
  "activo-mayor-18": "Mayor de 18 años",
  "activo-menor-18": "De 16 o 17 años",
  jubilado: "Jubilado/a",
};

const ESC = HOJAS.escala;
const APO = HOJAS.aportes;
const FILA_HEADER = 2;
const FILA_INI = 3;
const COL_MES_INI = 5; // E
const MESES = ESCALAS_POR_MES;
const CATEGORIAS = escalaDe(MESES[0].id);

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
const L_MES_FIN = letraCol(COL_MES_INI + MESES.length - 1);

// Filas de la escala: categoría × modalidad × (hora | mes). La clave es lo que busca el Liquidador.
const FILAS_ESCALA = CATEGORIAS.flatMap((cat) =>
  (["con-retiro", "sin-retiro"] as const).flatMap((mod) =>
    (["H", "M"] as const).map((tipo) => ({ cat, mod, tipo })),
  ),
);
const FILA_ESC_FIN = FILA_INI + FILAS_ESCALA.length - 1;

const FILAS_APORTES = CONDICIONES.flatMap((cond) => RANGOS.map((rango) => ({ cond, rango })));
const FILA_APO_FIN = FILA_INI + FILAS_APORTES.length - 1;
const RANGO_16 = RANGOS.find((r) => r.id === "16-o-mas")!;
const RANGO_12 = RANGOS.find((r) => r.id === "12-a-16")!;
const RANGO_MENOS = RANGOS.find((r) => r.id === "menos-12")!;

const MESES_ANIO = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// ─── Instrucciones ───────────────────────────────────────────────────────────

function buildInstrucciones(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.instrucciones, { properties: { tabColor: { argb: "FFF57C00" } } });
  ws.columns = [{ width: 4 }, { width: 104 }];
  titulo(ws, "A1:B1", "Cómo usar esta planilla", "FFF57C00");

  const pasos: [string, string][] = [
    ["1", "Andá a la hoja «Liquidador». Completá solo las celdas amarillas: mes, categoría, modalidad, horas por semana, zona, horas extras y la condición de la persona que trabaja en tu casa."],
    ["2", "Las celdas verdes se calculan solas: el sueldo del mes, el aguinaldo que va generando y lo que tenés que pagarle a ARCA. No escribas encima de ellas."],
    ["3", "En «Pagos del año» anotá lo que pagaste cada mes. Te calcula el aguinaldo de junio y de diciembre con la regla de la ley (50% del mejor sueldo del semestre) y los días de vacaciones."],
    ["4", "La hoja «Recibo» se completa sola con el mes que liquidaste. Cargá los nombres una vez, imprimila por duplicado y que cada parte se quede con una copia firmada."],
    ["5", "«Escala 2026» y «Aportes ARCA» son las tablas oficiales de donde salen los números. «Fuentes» tiene el link a cada documento y la fecha en que se verificó."],
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
  bandaSeccion(ws, `A${r}:B${r}`, "LO QUE TENÉS QUE SABER DE ESTE RÉGIMEN");
  r++;
  const claves = [
    `Hay DOS pisos que conviven: un valor por hora y un mínimo mensual. Si trabaja la jornada completa (${JORNADA.horasSemanales} horas semanales), no puede cobrar menos que el mínimo mensual de su categoría. Con menos horas, se paga por hora. La planilla aplica el que corresponde.`,
    `Las horas extras se pagan con ${HORAS_EXTRAS.comunes}% de recargo en días comunes y ${HORAS_EXTRAS.finDeSemanaYFeriados}% los sábados después de las 13, los domingos y los feriados (${HORAS_EXTRAS.articulo}).`,
    `Zona desfavorable: ${ZONA_DESFAVORABLE.porcentaje}% sobre el mínimo de cada categoría desde el ${ZONA_DESFAVORABLE.desde}, en ${ZONA_DESFAVORABLE.provincias.join(", ")} y el partido de ${ZONA_DESFAVORABLE.partidoBonaerense}.`,
    "Aguinaldo: 50% de la mayor remuneración mensual del semestre (Ley 26.844, art. 26). Se paga en junio y en diciembre.",
    `Vacaciones según antigüedad al 31 de diciembre: ${VACACIONES.map((v) => `${v.dias} días (${v.detalle})`).join("; ")}. Con menos de 6 meses, un día de descanso cada ${VACACIONES_PROPORCIONAL.diasTrabajadosPorDiaDeDescanso} días trabajados.`,
    `${REGLAS_APORTES.cuandoSePaga}`,
    `Con menos de 16 horas semanales pagás en regla, pero la trabajadora puede quedar sin obra social y sin cómputo jubilatorio: la planilla te muestra cuánto falta para llegar al piso. ${REGLAS_APORTES.pisoJubilacion.split(". ").at(-1)}`,
    "Los importes de la escala son el MÍNIMO legal, no un tope: podés pagar más. Si pactaron un sueldo mayor, usá ese.",
    "Si la relación termina (renuncia o despido), la liquidación final tiene reglas propias: usá la calculadora gratis de calcular.ar/despido-empleada-domestica.",
  ];
  for (const t of claves) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 36;
    r++;
  }
  r++;
  nota(
    ws,
    `A${r}:B${r}`,
    "Esta planilla da exactamente los mismos números que las calculadoras gratuitas de calcular.ar/empleada-domestica y calcular.ar/aportes-empleada-domestica: misma escala oficial, misma fórmula. Antes de publicar cada versión, una verificación automática recalcula el archivo y lo compara contra esas calculadoras. Si alguna vez difieren, escribinos y lo corregimos.",
  );
  ws.getRow(r).height = 44;
}

// ─── Escala 2026 ─────────────────────────────────────────────────────────────

function buildEscala(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(ESC, { properties: { tabColor: { argb: "FF1565C0" } } });
  ws.columns = [{ width: 44 }, { width: 34 }, { width: 13 }, { width: 10 }, ...MESES.map(() => ({ width: 16 }))];
  titulo(ws, `A1:${L_MES_FIN}1`, "Escala oficial — Personal de Casas Particulares 2026 (Resolución CNTCP 6/2026)", "FF1565C0");

  ["Clave", "Categoría", "Modalidad", "Valor", ...MESES.map((m) => m.etiqueta)].forEach((h, i) => {
    const c = ws.getCell(FILA_HEADER, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: "center" };
  });

  FILAS_ESCALA.forEach(({ cat, mod, tipo }, i) => {
    const r = FILA_INI + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const modTxt = MODALIDADES[mod];
    const celdas: [number, string][] = [
      [1, `${tipo}|${cat.nombre}|${modTxt}`],
      [2, cat.nombre],
      [3, modTxt],
      [4, tipo === "H" ? "por hora" : "por mes"],
    ];
    for (const [col, v] of celdas) {
      const c = ws.getCell(r, col);
      c.value = v;
      c.fill = fill;
      c.border = BORDE;
      if (col === 1) c.font = { size: 9, color: { argb: "FF9E9E9E" } };
    }
    MESES.forEach((mes, j) => {
      const fila = escalaDe(mes.id).find((c) => c.id === cat.id)!;
      const valor =
        tipo === "H"
          ? mod === "con-retiro" ? fila.horaConRetiro : fila.horaSinRetiro
          : mod === "con-retiro" ? fila.mesConRetiro : fila.mesSinRetiro;
      const c = ws.getCell(r, COL_MES_INI + j);
      // Celda vacía (no "—") donde el anexo trae guion: el Liquidador la lee como 0 y avisa.
      if (valor !== null) c.value = valor;
      c.numFmt = '"$"#,##0.00';
      c.fill = fill;
      c.border = BORDE;
      c.alignment = { horizontal: "right" };
    });
  });

  let r = FILA_ESC_FIN + 2;
  nota(ws, `A${r}:${L_MES_FIN}${r}`, `Valores sin zona desfavorable. El adicional del ${ZONA_DESFAVORABLE.porcentaje}% lo aplica el Liquidador. Los caseros solo existen en la modalidad sin retiro (el anexo trae un guion en «con retiro»).`);
  r++;
  nota(ws, `A${r}:${L_MES_FIN}${r}`, `Importes transcriptos de los Anexos 1 a 5 de la Resolución CNTCP 6/2026 (B.O. 3/9/2026), verificados el ${CASAS_PARTICULARES_FUENTES.consultadoEl}. La columna «Clave» la usa el Liquidador: no la borres.`);
  ws.views = [{ state: "frozen", xSplit: 4, ySplit: FILA_HEADER }];
}

// ─── Aportes ARCA ────────────────────────────────────────────────────────────

function buildAportes(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(APO, { properties: { tabColor: { argb: "FF6A1B9A" } } });
  ws.columns = [{ width: 70 }, { width: 38 }, { width: 38 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 16 }];
  titulo(ws, "A1:G1", `Aportes, contribuciones y ART — valores de ${VIGENCIA_APORTES.mesVigente} (se pagan en ${VIGENCIA_APORTES.mesDeVencimiento})`, "FF6A1B9A");

  ["Clave", "Condición", "Horas semanales", "Total a pagar", "Obra social", "Jubilación (SIPA)", "ART"].forEach((h, i) => {
    const c = ws.getCell(FILA_HEADER, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF7B1FA2");
    c.border = BORDE;
    c.alignment = { horizontal: "center" };
  });

  FILAS_APORTES.forEach(({ cond, rango }, i) => {
    const r = FILA_INI + i;
    const fila = TABLA_APORTES[cond.id].find((f) => f.rango === rango.id)!;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const vals: (string | number | null)[] = [
      `${CONDICION_CORTA[cond.id]}|${rango.etiqueta}`,
      cond.etiqueta,
      rango.etiqueta,
      fila.total,
      fila.obraSocial,
      fila.sipa,
      fila.art,
    ];
    vals.forEach((v, j) => {
      const c = ws.getCell(r, j + 1);
      if (v !== null) c.value = v;
      c.fill = fill;
      c.border = BORDE;
      if (j === 0) c.font = { size: 9, color: { argb: "FF9E9E9E" } };
      if (j >= 3) {
        c.numFmt = '"$"#,##0.00';
        c.alignment = { horizontal: "right" };
      }
    });
  });

  let r = FILA_APO_FIN + 2;
  nota(ws, `A${r}:G${r}`, `Montos fijos por trabajador, de la tabla oficial de ARCA (${VIGENCIA_APORTES.archivoPdf}). Celda vacía = ese concepto no se paga en esa condición.`);
  r++;
  nota(ws, `A${r}:G${r}`, REGLAS_APORTES.cuandoSePaga);
  r++;
  nota(ws, `A${r}:G${r}`, REGLAS_APORTES.pisoObraSocial);
}

// ─── Liquidador ──────────────────────────────────────────────────────────────

function rangoEsc(col: string) {
  return `'${ESC}'!$${col}$${FILA_INI}:$${col}$${FILA_ESC_FIN}`;
}
function rangoApo(col: string) {
  return `'${APO}'!$${col}$${FILA_INI}:$${col}$${FILA_APO_FIN}`;
}

function buildLiquidador(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.liquidador, { properties: { tabColor: { argb: "FF1B5E20" } } });
  ws.columns = [{ width: 46 }, { width: 40 }, { width: 4 }, { width: 18 }, { width: 18 }];
  titulo(ws, "A1:B1", "Sueldo del mes — Personal de Casas Particulares", "FF1B5E20");
  ws.mergeCells("A2:B2");
  const sub = ws.getCell("A2");
  sub.value = `Ley 26.844 · Resolución CNTCP 6/2026 · Verificado el ${CASAS_PARTICULARES_FUENTES.consultadoEl}`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  bandaSeccion(ws, "A4:B4", "DATOS DEL MES");
  const tareasGenerales = CATEGORIAS.find((c) => c.id === "tareas-generales")!;
  const inputs: [string, string, string | number, ExcelJS.DataValidation][] = [
    [CELDAS.mes, "Mes a liquidar", mesVigente().etiqueta, desplegable(MESES.map((m) => m.etiqueta), "Elegí un mes de la lista.")],
    [CELDAS.categoria, "Categoría", tareasGenerales.nombre, desplegable(CATEGORIAS.map((c) => c.nombre), "Elegí una categoría de la lista.")],
    [CELDAS.modalidad, "Modalidad", MODALIDADES["con-retiro"], desplegable(Object.values(MODALIDADES), "Elegí Con retiro o Sin retiro.")],
    [CELDAS.horasSemanales, "Horas que trabaja por semana (en tu casa)", 20, {
      type: "decimal", operator: "between", showErrorMessage: true, formulae: [0, 48],
      error: "Ingresá las horas semanales (entre 0 y 48). Jornada completa = 48.",
    }],
    [CELDAS.zona, "¿Zona desfavorable (Patagonia)?", "No", desplegable(["Sí", "No"], "Elegí Sí o No.")],
    [CELDAS.extrasComunes, "Horas extras del mes en días comunes", 0, {
      type: "decimal", operator: "between", showErrorMessage: true, formulae: [0, 200], error: "Entre 0 y 200 horas.",
    }],
    [CELDAS.extrasFinde, "Horas extras sábado desde las 13, domingo o feriado", 0, {
      type: "decimal", operator: "between", showErrorMessage: true, formulae: [0, 200], error: "Entre 0 y 200 horas.",
    }],
    [CELDAS.condicion, "Condición de la trabajadora (para ARCA)", CONDICION_CORTA["activo-mayor-18"], desplegable(Object.values(CONDICION_CORTA), "Elegí una condición de la lista.")],
  ];
  for (const [ref, etiqueta, valor, validacion] of inputs) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, etiqueta);
    const c = celdaInput(ws, ref, valor);
    if (typeof valor === "number") {
      c.numFmt = "0.##";
      c.alignment = { horizontal: "right" };
    }
    c.dataValidation = validacion;
  }

  // ── Auxiliares ocultos (columna D) ──
  ws.getCell("D5").value = { formula: `MATCH(${CELDAS.mes},'${ESC}'!$${L_MES_INI}$${FILA_HEADER}:$${L_MES_FIN}$${FILA_HEADER},0)` };
  ws.getCell("D6").value = { formula: `CONCATENATE("H|",${CELDAS.categoria},"|",${CELDAS.modalidad})` };
  ws.getCell("D7").value = {
    formula: `IFERROR(INDEX('${ESC}'!$${L_MES_INI}$${FILA_INI}:$${L_MES_FIN}$${FILA_ESC_FIN},MATCH(D6,${rangoEsc("A")},0),D5),0)`,
  };
  ws.getCell("D8").value = { formula: `CONCATENATE("M|",${CELDAS.categoria},"|",${CELDAS.modalidad})` };
  ws.getCell("D9").value = {
    formula: `IFERROR(INDEX('${ESC}'!$${L_MES_INI}$${FILA_INI}:$${L_MES_FIN}$${FILA_ESC_FIN},MATCH(D8,${rangoEsc("A")},0),D5),0)`,
  };
  ws.getCell("D10").value = { formula: `IF(${CELDAS.zona}="Sí",${1 + ZONA_DESFAVORABLE.porcentaje / 100},1)` };
  ws.getCell("D11").value = { formula: `MIN(MAX(${CELDAS.horasSemanales},0),${JORNADA.horasSemanales})` };
  // Los rangos de ARCA se miran con las horas SIN tope, como en src/lib/aportes-casas-particulares.ts.
  ws.getCell("D12").value = {
    formula: `IF(MAX(${CELDAS.horasSemanales},0)>=16,"${RANGO_16.etiqueta}",IF(MAX(${CELDAS.horasSemanales},0)>=12,"${RANGO_12.etiqueta}","${RANGO_MENOS.etiqueta}"))`,
  };
  ws.getCell("D13").value = { formula: `CONCATENATE(${CELDAS.condicion},"|",D12)` };
  ws.getCell("D14").value = { formula: `CONCATENATE(${CELDAS.condicion},"|","${RANGO_16.etiqueta}")` };
  ws.getColumn("D").hidden = true;
  ws.getColumn("E").hidden = true;

  celdaEtiqueta(ws, "A13", "Chequeo");
  const chk = ws.getCell(CELDAS.chequeo);
  chk.value = { formula: `IF(D7=0,"Esa combinación no existe en la escala oficial: los caseros son siempre sin retiro.","OK")` };
  chk.border = BORDE;
  chk.font = { italic: true, color: { argb: "FF555555" } };

  bandaSeccion(ws, "A14:B14", "SUELDO DEL MES");
  celdaResultado(ws, 15, "Valor de la hora", `IF(D7=0,0,ROUND(D7*D10,2))`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 16, `Mínimo mensual (jornada completa de ${JORNADA.horasSemanales} h)`, `ROUND(D9*D10,2)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 17, "Horas trabajadas en el mes", `ROUND(D11*52/12,2)`, { formato: "0.00" });
  celdaResultado(ws, 18, "Sueldo por las horas trabajadas", `ROUND(${CELDAS.valorHora}*${CELDAS.horasMensuales},2)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 19, "Básico del mes", `IF(D11>=${JORNADA.horasSemanales},MAX(${CELDAS.porHoras},${CELDAS.minimoMensual}),${CELDAS.porHoras})`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 20, `Horas extras comunes (+${HORAS_EXTRAS.comunes}%)`, `ROUND(MAX(${CELDAS.extrasComunes},0)*${CELDAS.valorHora}*${1 + HORAS_EXTRAS.comunes / 100},2)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 21, `Horas extras fin de semana y feriados (+${HORAS_EXTRAS.finDeSemanaYFeriados}%)`, `ROUND(MAX(${CELDAS.extrasFinde},0)*${CELDAS.valorHora}*${1 + HORAS_EXTRAS.finDeSemanaYFeriados / 100},2)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 22, "TOTAL A PAGARLE ESTE MES", `ROUND(${CELDAS.basico}+${CELDAS.montoExtrasComunes}+${CELDAS.montoExtrasFinde},2)`, { total: true, formato: '"$"#,##0.00' });
  celdaResultado(ws, 23, "Aguinaldo que va generando (50%)", `ROUND(${CELDAS.total}/2,2)`, { formato: '"$"#,##0.00' });

  ws.getRow(24).height = 6;
  bandaSeccion(ws, "A25:B25", "LO QUE LE PAGÁS A ARCA (aportes, contribuciones y ART)");
  celdaResultado(ws, 26, "Rango de horas para ARCA", "D12", { formato: "@" });
  celdaResultado(ws, 27, "Pago mensual a ARCA por esta trabajadora", `IFERROR(INDEX(${rangoApo("D")},MATCH(D13,${rangoApo("A")},0)),0)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 28, "  · de eso, cuota de la ART", `IFERROR(INDEX(${rangoApo("G")},MATCH(D13,${rangoApo("A")},0)),0)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 29, "Falta para que tenga obra social", `MAX(0,ROUND(IFERROR(INDEX(${rangoApo("E")},MATCH(D14,${rangoApo("A")},0)),0)-IFERROR(INDEX(${rangoApo("E")},MATCH(D13,${rangoApo("A")},0)),0),2))`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 30, "Falta para que le compute la jubilación", `MAX(0,ROUND(IFERROR(INDEX(${rangoApo("F")},MATCH(D14,${rangoApo("A")},0)),0)-IFERROR(INDEX(${rangoApo("F")},MATCH(D13,${rangoApo("A")},0)),0),2))`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 31, "COSTO TOTAL DEL MES (sueldo + ARCA)", `ROUND(${CELDAS.total}+${CELDAS.arcaTotal},2)`, { total: true, formato: '"$"#,##0.00' });

  nota(ws, "A33:B33", "* Importes mínimos legales. Si pactaron un sueldo mayor, se paga el pactado.");
  nota(ws, "A34:B34", `* ${REGLAS_APORTES.cuandoSePaga}`);
  nota(ws, "A35:B35", "* «Falta para…» aparece con menos de 16 horas semanales: pagás en regla, pero sin completar esa diferencia la trabajadora no accede a la obra social y ese mes no le computa para jubilarse. La diferencia la puede pagar ella o la pueden acordar.");
  ws.getRow(35).height = 40;
  ws.views = [{ state: "frozen", ySplit: 4 }];
}

// ─── Pagos del año ───────────────────────────────────────────────────────────

export const ANUAL = {
  primeraFila: 4,
  aguinaldoJunio: "B17",
  aguinaldoDiciembre: "B18",
  totalSueldos: "B19",
  totalArca: "B20",
  antiguedad: "B23",
  diasVacaciones: "B24",
} as const;

function buildAnual(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.anual, { properties: { tabColor: { argb: "FF00838F" } } });
  ws.columns = [{ width: 42 }, { width: 22 }, { width: 22 }, { width: 40 }];
  titulo(ws, "A1:D1", "Pagos del año 2026 — aguinaldo y vacaciones", "FF00838F");

  ["Mes", "Sueldo pagado", "Pagado a ARCA", "Notas"].forEach((h, i) => {
    const c = ws.getCell(3, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF00838F");
    c.border = BORDE;
  });
  MESES_ANIO.forEach((m, i) => {
    const r = ANUAL.primeraFila + i;
    celdaEtiqueta(ws, `A${r}`, `${m} 2026`);
    for (const col of ["B", "C"]) {
      const c = ws.getCell(`${col}${r}`);
      c.fill = S.input;
      c.border = BORDE;
      c.numFmt = '"$"#,##0.00';
    }
    const n = ws.getCell(`D${r}`);
    n.fill = S.input;
    n.border = BORDE;
  });
  const fin = ANUAL.primeraFila + 11;
  const junio = ANUAL.primeraFila + 5;

  bandaSeccion(ws, "A16:B16", "AGUINALDO (Ley 26.844, art. 26)");
  celdaResultado(ws, 17, "Aguinaldo de junio (1er semestre)", `ROUND(MAX(B${ANUAL.primeraFila}:B${junio})/2,2)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 18, "Aguinaldo de diciembre (2do semestre)", `ROUND(MAX(B${junio + 1}:B${fin})/2,2)`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 19, "Total pagado en sueldos en el año", `SUM(B${ANUAL.primeraFila}:B${fin})`, { formato: '"$"#,##0.00' });
  celdaResultado(ws, 20, "Total pagado a ARCA en el año", `SUM(C${ANUAL.primeraFila}:C${fin})`, { formato: '"$"#,##0.00' });

  bandaSeccion(ws, "A22:B22", "VACACIONES (Ley 26.844, art. 29)");
  celdaEtiqueta(ws, "A23", "Antigüedad al 31 de diciembre (años)");
  const ant = celdaInput(ws, ANUAL.antiguedad, 1);
  ant.numFmt = "0.#";
  ant.alignment = { horizontal: "right" };
  ant.dataValidation = { type: "decimal", operator: "between", showErrorMessage: true, formulae: [0, 60], error: "Entre 0 y 60 años." };
  const [v5, v10, v20, vMas] = VACACIONES.map((v) => v.dias);
  celdaResultado(ws, 24, "Días de vacaciones que le corresponden", `IF(${ANUAL.antiguedad}<=5,${v5},IF(${ANUAL.antiguedad}<=10,${v10},IF(${ANUAL.antiguedad}<=20,${v20},${vMas})))`, { formato: "0" });

  nota(ws, "A26:D26", "* El aguinaldo es el 50% del MEJOR sueldo del semestre, no el promedio. Si trabajó solo una parte del semestre, corresponde en proporción al tiempo trabajado: para ese caso usá calcular.ar/aguinaldo.");
  ws.getRow(26).height = 30;
  nota(ws, "A27:D27", `* Con menos de 6 meses de antigüedad no hay licencia completa: corresponde un día de descanso cada ${VACACIONES_PROPORCIONAL.diasTrabajadosPorDiaDeDescanso} días trabajados (${VACACIONES_PROPORCIONAL.articulo}).`);
  ws.getRow(27).height = 30;
  ws.views = [{ state: "frozen", ySplit: 3 }];
}

// ─── Recibo ──────────────────────────────────────────────────────────────────

function buildRecibo(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.recibo, {
    properties: { tabColor: { argb: "FF455A64" } },
    pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 1 },
  });
  ws.columns = [{ width: 40 }, { width: 44 }];
  const L = `'${HOJAS.liquidador}'!`;
  titulo(ws, "A1:B1", "Recibo de sueldo — Personal de Casas Particulares", "FF455A64");
  nota(ws, "A2:B2", "Modelo para imprimir por duplicado: una copia firmada queda para cada parte. Las celdas amarillas se completan una sola vez.");

  const filas: [string, { input?: string | number; formula?: string; formato?: string }][] = [
    ["Empleador/a (nombre y apellido)", { input: "" }],
    ["CUIL/CUIT del empleador/a", { input: "" }],
    ["Trabajador/a (nombre y apellido)", { input: "" }],
    ["CUIL del trabajador/a", { input: "" }],
    ["Período", { formula: `${L}${CELDAS.mes}` }],
    ["Categoría", { formula: `${L}${CELDAS.categoria}` }],
    ["Modalidad", { formula: `${L}${CELDAS.modalidad}` }],
    ["Horas semanales", { formula: `${L}${CELDAS.horasSemanales}`, formato: "0.##" }],
    ["Básico", { formula: `${L}${CELDAS.basico}`, formato: '"$"#,##0.00' }],
    [`Horas extras comunes (+${HORAS_EXTRAS.comunes}%)`, { formula: `${L}${CELDAS.montoExtrasComunes}`, formato: '"$"#,##0.00' }],
    [`Horas extras fin de semana y feriados (+${HORAS_EXTRAS.finDeSemanaYFeriados}%)`, { formula: `${L}${CELDAS.montoExtrasFinde}`, formato: '"$"#,##0.00' }],
    ["TOTAL", { formula: `${L}${CELDAS.total}`, formato: '"$"#,##0.00' }],
    ["Fecha de pago", { input: "" }],
  ];
  filas.forEach(([etq, v], i) => {
    const r = 4 + i;
    celdaEtiqueta(ws, `A${r}`, etq);
    if (v.formula) {
      const c = ws.getCell(`B${r}`);
      c.value = { formula: v.formula };
      c.border = BORDE;
      c.fill = etq === "TOTAL" ? S.total : S.output;
      if (etq === "TOTAL") c.font = { bold: true };
      if (v.formato) c.numFmt = v.formato;
      c.alignment = { horizontal: v.formato ? "right" : "left", indent: v.formato ? 0 : 1 };
    } else {
      celdaInput(ws, `B${r}`, v.input ?? "");
    }
  });
  const r = 4 + filas.length + 2;
  ws.getCell(`A${r}`).value = "Recibí conforme el importe total indicado.";
  ws.getCell(`A${r}`).font = { italic: true };
  ws.getCell(`A${r + 3}`).value = "Firma del trabajador/a";
  ws.getCell(`B${r + 3}`).value = "Firma del empleador/a";
  for (const ref of [`A${r + 3}`, `B${r + 3}`]) {
    ws.getCell(ref).border = { top: { style: "thin", color: { argb: "FF455A64" } } };
    ws.getCell(ref).alignment = { horizontal: "center" };
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

export async function generarPlanillaCasas(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = "Planilla de sueldo de Casas Particulares 2026";
  wb.subject = "Sueldo, aguinaldo, vacaciones y aportes de personal de casas particulares (Ley 26.844)";
  wb.keywords = "empleada doméstica, casas particulares, sueldo, aguinaldo, ARCA, planilla";

  buildInstrucciones(wb);
  buildLiquidador(wb);
  buildAnual(wb);
  buildRecibo(wb);
  buildEscala(wb);
  buildAportes(wb);
  hojaFuentes(
    wb,
    [...CASAS_PARTICULARES_FUENTES.lista, ...APORTES_FUENTES.lista].map((f) => ({ nombre: f.nombre, url: f.url })),
    CASAS_PARTICULARES_FUENTES.consultadoEl,
    [],
    "Planilla de calcular.ar. Las actualizaciones del año están incluidas en el precio: cuando la Comisión Nacional de Trabajo en Casas Particulares fija una escala nueva, o ARCA publica la tabla de aportes del mes, regeneramos la planilla y el mismo enlace de descarga te baja la versión al día.",
  );

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salida = path.join(dir, ARCHIVO_CASAS);
  await wb.xlsx.writeFile(salida);
  return salida;
}

if (process.argv[1] && /gen_planilla_casas\.ts$/.test(process.argv[1])) {
  generarPlanillaCasas()
    .then((salida) => console.log(`Planilla Casas Particulares generada: ${salida}`))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
