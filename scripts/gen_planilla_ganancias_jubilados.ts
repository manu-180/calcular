/**
 * Genera private/planilla-ganancias-jubilados-2026.xlsx: el método acumulado de la RG 4003 para
 * un jubilado o pensionado, con sus doce haberes reales y el control contra sus recibos.
 *
 * INVARIANTE: cada fórmula del archivo es el mismo cálculo que
 * src/lib/planilla-ganancias-jubilados.ts, que a su vez reusa la escala y las deducciones de
 * src/data/ganancias.ts, el aporte del art. 8 de src/lib/descuento-pami.ts y la deducción
 * específica de src/lib/ganancias-jubilados.ts (la misma que la calculadora gratis de
 * /ganancias-jubilados). scripts/check_planilla_ganancias_jubilados.ts evalúa el .xlsx con
 * HyperFormula y compara celda por celda contra ese motor.
 *
 * NINGÚN MONTO SE ESCRIBE ACÁ: los haberes mínimos salen de la serie de ANSES, la escala y las
 * deducciones del PDF de ARCA y las alícuotas de obra social de REGIMENES. Si se transcribiera un
 * número, el archivo envejecería sin que ningún check lo vea.
 *
 * Uso: npx -y tsx scripts/gen_planilla_ganancias_jubilados.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { DEDUCCIONES, ESCALA_GANANCIAS, GANANCIAS_FUENTES } from "../src/data/ganancias";
import { ANIO_JUBILADOS, JUBILADOS_FUENTES, MULTIPLICADOR_ESPECIFICA } from "../src/data/ganancias-jubilados";
import { REGIMENES, VIGENCIA_PAMI } from "../src/data/descuento-pami";
import { prestacionesVigentes } from "../src/data/prestaciones";
import { haberesMinimosProyectados } from "../src/lib/ganancias-jubilados";
import { MESES_DEL_ANIO, MESES_CON_AGUINALDO } from "../src/lib/planilla-ganancias-jubilados";
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

export const ARCHIVO_GANANCIAS_JUBILADOS = `planilla-ganancias-jubilados-${ANIO_JUBILADOS}.xlsx`;

export const HOJAS_JUB = {
  instrucciones: "Instrucciones",
  datos: "Mis datos",
  anio: "Mi año",
  minimos: "Haberes mínimos",
  escala: "Escala y deducciones",
} as const;

/** Primera y última fila de las tablas de doce meses: la misma en «Mi año» y en «Haberes mínimos»,
 *  así la fila de un mes es la misma en las dos hojas y la columna E se lee de un vistazo. */
export const FILA_MES_INI = 5;
export const FILA_MES_FIN = FILA_MES_INI + 11;
export const FILA_TOTALES = FILA_MES_FIN + 2;

/** Las celdas que el check busca por nombre: si el generador las mueve, el check las sigue. */
export const CELDAS_JUB = {
  regimen: "B5",
  conyuge: "B6",
  hijos: "B7",
  otrosIngresos: "B8",
  bienesPersonales: "B9",
  otrasDeducciones: "B10",
  especificaAnual: "B13",
  alternativaAnual: "B14",
  cargasFamilia: "B15",
  cualRige: "B16",
  porQue: "B17",
  brutoAnual: "B20",
  aportesAnual: "B21",
  deduccionDiciembre: "B22",
  gniAnual: "B23",
  impuestoAnual: "B24",
  alicuotaEfectiva: "B25",
  segunRecibos: "B28",
  segunPlanilla: "B29",
  diferencia: "B30",
  queSignifica: "B31",
} as const;

/** Columnas de «Mi año». R queda oculta: es el tramo de la escala que le toca a cada mes. */
export const COL_ANIO = {
  mes: "A",
  haber: "B",
  aguinaldo: "C",
  bono: "D",
  haberMinimo: "E",
  aporte: "F",
  brutoAcum: "G",
  aportesAcum: "H",
  deduccionAcum: "I",
  ganancia: "J",
  proyeccion: "K",
  impuesto: "L",
  retencionAcum: "M",
  retencionMes: "N",
  recibo: "O",
  diferencia: "P",
  tramo: "R",
} as const;

/** Filas de «Haberes mínimos» y de «Escala y deducciones» que las fórmulas referencian. */
export const FILAS_MINIMOS = { total: FILA_TOTALES } as const;
export const FILAS_ESCALA = {
  tramoIni: 5,
  tramoFin: 5 + ESCALA_GANANCIAS.length - 1,
  mni: 16,
  conyuge: 17,
  hijo: 18,
  especial: 19,
  mniMasEspecial: 20,
  multiplicador: 21,
  regimenIni: 25,
  regimenFin: 26,
  alicuotaBaja: 28,
  alicuotaAlta: 29,
  rigeEspecifica: 31,
} as const;

const REGIMENES_CON_APORTE = REGIMENES.filter((r) => r.tramos !== null);

// Referencias absolutas a otras hojas. Se arman una vez para que ninguna fórmula escriba el
// nombre de una hoja a mano.
const E = `'${HOJAS_JUB.escala}'`;
const M = `'${HOJAS_JUB.minimos}'`;
const D = `'${HOJAS_JUB.datos}'`;
const A = `'${HOJAS_JUB.anio}'`;

const REF = {
  alicuotaBaja: `${E}!$B$${FILAS_ESCALA.alicuotaBaja}`,
  alicuotaAlta: `${E}!$B$${FILAS_ESCALA.alicuotaAlta}`,
  rigeEspecifica: `${E}!$B$${FILAS_ESCALA.rigeEspecifica}`,
  multiplicador: `${E}!$B$${FILAS_ESCALA.multiplicador}`,
  mniMasEspecial: `${E}!$B$${FILAS_ESCALA.mniMasEspecial}`,
  conyugeMonto: `${E}!$B$${FILAS_ESCALA.conyuge}`,
  hijoMonto: `${E}!$B$${FILAS_ESCALA.hijo}`,
  especificaAnual: `${M}!$B$${FILAS_MINIMOS.total}`,
  desde: `${E}!$A$${FILAS_ESCALA.tramoIni}:$A$${FILAS_ESCALA.tramoFin}`,
  fijo: `${E}!$C$${FILAS_ESCALA.tramoIni}:$C$${FILAS_ESCALA.tramoFin}`,
  alicuota: `${E}!$D$${FILAS_ESCALA.tramoIni}:$D$${FILAS_ESCALA.tramoFin}`,
  excedente: `${E}!$E$${FILAS_ESCALA.tramoIni}:$E$${FILAS_ESCALA.tramoFin}`,
  cargas: `${D}!$${CELDAS_JUB.cargasFamilia}`,
  alternativa: `${D}!$${CELDAS_JUB.alternativaAnual}`,
  otrasDeducciones: `${D}!$${CELDAS_JUB.otrasDeducciones}`,
  regimenElegido: `${D}!$${CELDAS_JUB.regimen}`,
  conyugeSiNo: `${D}!$${CELDAS_JUB.conyuge}`,
  hijosCargados: `${D}!$${CELDAS_JUB.hijos}`,
  otrosIngresos: `${D}!$${CELDAS_JUB.otrosIngresos}`,
  bienesPersonales: `${D}!$${CELDAS_JUB.bienesPersonales}`,
} as const;

const SI = "Sí";
const NO = "No";

/** El aporte del art. 8 sobre una base: 3% hasta el haber mínimo y 6% sobre el excedente, con el
 *  mismo ROUND por tramo que hace `aporteSobre`. */
function aporteSobreBase(base: string, minimo: string): string {
  const bajo = `ROUND(MIN(${base},${minimo})*${REF.alicuotaBaja},2)`;
  const alto = `ROUND(MAX(0,${base}-${minimo})*${REF.alicuotaAlta},2)`;
  return `ROUND(${bajo}+${alto},2)`;
}

// ─── Instrucciones ───────────────────────────────────────────────────────────

function buildInstrucciones(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_JUB.instrucciones, { properties: { tabColor: { argb: "FF6A1B9A" } } });
  ws.columns = [{ width: 4 }, { width: 104 }];
  titulo(ws, "A1:B1", "Cómo usar esta planilla", "FF6A1B9A");

  const pasos: [string, string][] = [
    ["1", `Empezá por la hoja «${HOJAS_JUB.datos}». Elegí tu régimen (define el descuento de obra social), marcá si tenés cónyuge o hijos a cargo y contestá las dos preguntas que te pueden hacer perder la deducción de ocho haberes mínimos.`],
    ["2", `Pasá a la hoja «${HOJAS_JUB.anio}» y cargá en la columna amarilla el haber bruto de cada mes, el de tu recibo, sin el bono. Es el dato que esta planilla necesita y que ninguna calculadora puede adivinar: tu haber cambia todos los meses.`],
    ["3", "El aguinaldo de junio y de diciembre viene calculado como la mitad del mejor haber del semestre. Si tu recibo dice otro monto, escribilo encima: la celda es tuya."],
    ["4", "En la última columna amarilla cargá lo que cada recibo dice que te retuvieron de Ganancias. La planilla te muestra la diferencia contra lo que corresponde, mes por mes y en el total del año."],
    ["5", `Volvé a «${HOJAS_JUB.datos}»: ahí está el impuesto del año, qué deducción te rige y por qué, y el control contra tus recibos en tres renglones.`],
    ["6", `Cuando ANSES publique el haber mínimo de un mes nuevo, cargalo en la hoja «${HOJAS_JUB.minimos}» y toda la planilla se recalcula. También te llega la versión al día al mismo enlace de descarga, sin pagar de nuevo.`],
  ];
  pasos.forEach(([n, t], i) => {
    const r = 3 + i;
    const nc = ws.getCell(r, 1);
    nc.value = n;
    nc.font = { bold: true, color: { argb: "FFFFFFFF" } };
    nc.fill = relleno("FF6A1B9A");
    nc.alignment = { horizontal: "center", vertical: "middle" };
    const tc = ws.getCell(r, 2);
    tc.value = t;
    tc.alignment = { wrapText: true, vertical: "middle", indent: 1 };
    ws.getRow(r).height = 40;
  });

  let r = 3 + pasos.length + 1;
  bandaSeccion(ws, `A${r}:B${r}`, "LO QUE TENÉS QUE SABER");
  r++;
  const claves = [
    "Tu caja no estima el año: liquida mes a mes con el método acumulado. Cada mes suma todo lo que cobraste hasta ahí, resta los aportes y la parte de las deducciones que ya corrió, lleva ese resultado a año completo, le aplica la escala y retiene la diferencia contra lo que ya te retuvo. Esta planilla hace esa misma cuenta con tus doce haberes.",
    "La deducción de ocho haberes mínimos no es un número fijo del año repartido en doce. Es ocho veces la suma de los haberes mínimos de los meses que ya pasaron, y el haber mínimo sube todos los meses. Por eso crece mes a mes, y por eso la retención de enero no se parece a la de diciembre.",
    "Las cargas de familia se restan además de la específica: la ley dice que la específica reemplaza a los incisos a) y c) del art. 30, no al inciso b). Para que te las descuenten tenés que cargarlas en el SiRADIG.",
    "La específica se pierde en dos casos: si tenés otros ingresos gravados por más de la ganancia no imponible del año, o si pagás Bienes Personales por algo más que tu vivienda única. En esos casos volvés al no imponible más la deducción especial, y el impuesto sube.",
    "El aguinaldo paga Ganancias. La RG 4003 le manda al agente de retención sumar cada mes una doceava parte del aguinaldo, así que el reparto mes por mes de tu caja puede correr pesos de un mes a otro. El total del año es el mismo, y es el que esta planilla afirma.",
    "El bono extraordinario no paga Ganancias ni el aporte de obra social: los decretos que lo fijan lo declaran no remunerativo. Está en su propia columna, a la vista, y queda fuera de la cuenta.",
    `Los números son los de la calculadora gratis de calcular.ar/ganancias-jubilados: la misma escala, las mismas deducciones y la misma serie de haberes mínimos. La planilla agrega lo que la calculadora no puede hacer con un solo haber: tus doce meses reales, el método acumulado y la comparación contra tus recibos. Con un haber plano la diferencia del año son pesos, por el aguinaldo y por el haber mínimo de cada mes.`,
  ];
  for (const t of claves) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 58;
    r++;
  }
  r++;
  nota(
    ws,
    `A${r}:B${r}`,
    "Esta planilla es informativa y no reemplaza a un profesional. La retención la hace tu agente de retención (ANSES o tu caja) y puede tener datos que vos no cargaste. Antes de publicar cada versión, una verificación automática recalcula este archivo y lo compara contra el motor del sitio.",
  );
  ws.getRow(r).height = 46;
}

// ─── Escala y deducciones ────────────────────────────────────────────────────

function buildEscala(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_JUB.escala, { properties: { tabColor: { argb: "FF1565C0" } } });
  ws.columns = [{ width: 46 }, { width: 24 }, { width: 24 }, { width: 16 }, { width: 24 }];
  titulo(ws, "A1:E1", `Escala del art. 94 y deducciones del art. 30 (${ANIO_JUBILADOS})`, "FF1565C0");

  bandaSeccion(ws, "A3:E3", "ESCALA DEL ART. 94, VALORES ANUALES");
  ["Ganancia neta anual desde", "Hasta", "Pagan de fijo", "Más el porcentaje", "Sobre el excedente de"].forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: "center", wrapText: true };
  });
  ws.getRow(4).height = 32;
  ESCALA_GANANCIAS.forEach((t, i) => {
    const r = FILAS_ESCALA.tramoIni + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const vals: (number | string)[] = [t.desde, t.hasta ?? "sin tope", t.fijo, t.alicuota, t.excedenteSobre];
    vals.forEach((v, j) => {
      const c = ws.getCell(r, j + 1);
      c.value = v;
      c.fill = fill;
      c.border = BORDE;
      c.numFmt = j === 3 ? "0.0%" : typeof v === "number" ? ARS_FMT_DEC : "@";
      c.alignment = { horizontal: "right" };
    });
  });

  bandaSeccion(ws, `A${FILAS_ESCALA.mni - 1}:E${FILAS_ESCALA.mni - 1}`, "DEDUCCIONES DEL ART. 30, VALORES ANUALES");
  const deducciones: [number, string, number | string][] = [
    [FILAS_ESCALA.mni, "Ganancia no imponible (inc. a)", DEDUCCIONES.mni],
    [FILAS_ESCALA.conyuge, "Cónyuge a cargo (inc. b.1)", DEDUCCIONES.conyuge],
    [FILAS_ESCALA.hijo, "Cada hijo a cargo (inc. b.2)", DEDUCCIONES.hijo],
    [FILAS_ESCALA.especial, "Deducción especial (inc. c, apartado 2)", DEDUCCIONES.deduccionEspecialDependencia],
  ];
  for (const [fila, etiqueta, valor] of deducciones) {
    celdaEtiqueta(ws, `A${fila}`, etiqueta);
    const c = ws.getCell(`B${fila}`);
    c.value = valor;
    c.fill = S.label;
    c.border = BORDE;
    c.numFmt = ARS_FMT_DEC;
    c.alignment = { horizontal: "right" };
  }
  celdaResultado(ws, FILAS_ESCALA.mniMasEspecial, "No imponible más deducción especial", `B${FILAS_ESCALA.mni}+B${FILAS_ESCALA.especial}`, {
    total: true,
    formato: ARS_FMT_DEC,
  });
  celdaEtiqueta(ws, `A${FILAS_ESCALA.multiplicador}`, "Veces los haberes mínimos de la deducción específica");
  const mult = ws.getCell(`B${FILAS_ESCALA.multiplicador}`);
  mult.value = MULTIPLICADOR_ESPECIFICA;
  mult.fill = S.label;
  mult.border = BORDE;
  mult.alignment = { horizontal: "right" };

  bandaSeccion(ws, `A${FILAS_ESCALA.regimenIni - 2}:E${FILAS_ESCALA.regimenIni - 2}`, `APORTE DE OBRA SOCIAL (${VIGENCIA_PAMI.normaAlicuotas})`);
  ["Tu jubilación o pensión", "Hasta el haber mínimo", "Sobre el excedente"].forEach((h, i) => {
    const c = ws.getCell(FILAS_ESCALA.regimenIni - 1, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF546E7A");
    c.border = BORDE;
    c.alignment = { horizontal: "center", wrapText: true };
  });
  REGIMENES_CON_APORTE.forEach((reg, i) => {
    const r = FILAS_ESCALA.regimenIni + i;
    const vals: (string | number)[] = [reg.etiqueta, reg.tramos!.hastaMinimo, reg.tramos!.excedente];
    vals.forEach((v, j) => {
      const c = ws.getCell(r, j + 1);
      c.value = v;
      c.fill = i % 2 === 0 ? S.white : S.cebra;
      c.border = BORDE;
      if (j === 0) c.alignment = { wrapText: true, vertical: "middle", indent: 1 };
      else {
        c.numFmt = "0.0%";
        c.alignment = { horizontal: "right" };
      }
    });
    ws.getRow(r).height = 30;
  });

  const porRegimen = (col: string) =>
    `INDEX($${col}$${FILAS_ESCALA.regimenIni}:$${col}$${FILAS_ESCALA.regimenFin},MATCH(${REF.regimenElegido},$A$${FILAS_ESCALA.regimenIni}:$A$${FILAS_ESCALA.regimenFin},0))`;
  celdaResultado(ws, FILAS_ESCALA.alicuotaBaja, "La alícuota que te corresponde hasta el haber mínimo", porRegimen("B"), { formato: "0.0%" });
  celdaResultado(ws, FILAS_ESCALA.alicuotaAlta, "La que te corresponde sobre el excedente", porRegimen("C"), { formato: "0.0%" });
  celdaResultado(
    ws,
    FILAS_ESCALA.rigeEspecifica,
    "¿Te rige la deducción específica de ocho haberes mínimos?",
    `IF(AND(${REF.otrosIngresos}="${NO}",${REF.bienesPersonales}="${NO}",${REF.especificaAnual}>$B$${FILAS_ESCALA.mniMasEspecial}),"${SI}","${NO}")`,
    { total: true, formato: "@" },
  );

  const r = FILAS_ESCALA.rigeEspecifica + 2;
  nota(
    ws,
    `A${r}:E${r}`,
    `Escala y deducciones del período julio a diciembre de ${ANIO_JUBILADOS} (ARCA). Las alícuotas de obra social son las del art. 8 de la Ley 19.032, verificadas el ${VIGENCIA_PAMI.consultadoEl}. Los links están en la hoja Fuentes. No borres ninguna columna de esta hoja: la hoja «${HOJAS_JUB.anio}» las lee.`,
  );
  ws.getRow(r).height = 40;
  ws.views = [{ state: "frozen", ySplit: 4 }];
}

// ─── Haberes mínimos ─────────────────────────────────────────────────────────

function buildMinimos(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_JUB.minimos, { properties: { tabColor: { argb: "FF00897B" } } });
  ws.columns = [{ width: 16 }, { width: 24 }, { width: 14 }, { width: 24 }, { width: 32 }];
  titulo(ws, "A1:E1", `Haber mínimo garantizado de cada mes de ${ANIO_JUBILADOS} (ANSES)`, "FF00897B");

  ws.mergeCells("A2:E2");
  const sub = ws.getCell("A2");
  sub.value = `La deducción específica es ocho veces la suma de los haberes mínimos de los meses transcurridos. Los meses marcados como estimados repiten el último publicado: cuando ANSES fije el siguiente, cargalo en la celda amarilla y toda la planilla se recalcula.`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { wrapText: true, vertical: "top" };
  ws.getRow(2).height = 32;

  ["Mes", "Haber mínimo", "¿Publicado?", "Por ocho", "Deducción específica acumulada"].forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF00695C");
    c.border = BORDE;
    c.alignment = { horizontal: "center", wrapText: true };
  });
  ws.getRow(4).height = 32;

  const meses = haberesMinimosProyectados();
  meses.forEach((m, i) => {
    const r = FILA_MES_INI + i;
    const nombre = ws.getCell(`A${r}`);
    nombre.value = MESES_DEL_ANIO[i];
    nombre.fill = S.label;
    nombre.border = BORDE;
    nombre.alignment = { horizontal: "left", indent: 1 };
    nombre.font = { bold: true };

    celdaInput(ws, `B${r}`, m.haberMinimo).numFmt = ARS_FMT_DEC;
    ws.getCell(`B${r}`).alignment = { horizontal: "right" };

    const pub = ws.getCell(`C${r}`);
    pub.value = m.publicado ? "Sí" : "Estimado";
    pub.fill = m.publicado ? S.white : relleno("FFFFF3E0");
    pub.border = BORDE;
    pub.alignment = { horizontal: "center" };

    for (const [col, formula] of [
      ["D", `ROUND(B${r}*${REF.multiplicador},2)`],
      ["E", `ROUND(SUM($B$${FILA_MES_INI}:B${r})*${REF.multiplicador},2)`],
    ] as const) {
      const c = ws.getCell(`${col}${r}`);
      c.value = { formula };
      c.fill = S.output;
      c.border = BORDE;
      c.numFmt = ARS_FMT_DEC;
      c.alignment = { horizontal: "right" };
    }
  });

  celdaResultado(
    ws,
    FILAS_MINIMOS.total,
    `Deducción específica de todo ${ANIO_JUBILADOS}`,
    `ROUND(SUM(B${FILA_MES_INI}:B${FILA_MES_FIN})*${REF.multiplicador},2)`,
    { total: true, formato: ARS_FMT_DEC },
  );

  const r = FILAS_MINIMOS.total + 2;
  nota(
    ws,
    `A${r}:E${r}`,
    `Serie oficial del haber mínimo garantizado de ANSES. El último publicado es el de ${prestacionesVigentes().vigencia} (${prestacionesVigentes().resolucion}), verificado el ${JUBILADOS_FUENTES.consultadoEl}. Como el haber mínimo sube todos los meses, los meses estimados dejan la deducción un poco corta: tu impuesto real va a ser, si algo, un poco menor.`,
  );
  ws.getRow(r).height = 46;
  ws.views = [{ state: "frozen", xSplit: 1, ySplit: 4 }];
}

// ─── Mi año ──────────────────────────────────────────────────────────────────

function buildAnio(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_JUB.anio, { properties: { tabColor: { argb: "FF1B5E20" } } });
  ws.columns = [
    { width: 14 }, { width: 16 }, { width: 14 }, { width: 13 }, { width: 14 }, { width: 15 },
    { width: 18 }, { width: 16 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 },
    { width: 18 }, { width: 16 }, { width: 16 }, { width: 14 }, { width: 3 }, { width: 8 },
  ];
  titulo(ws, "A1:P1", `Mi año mes por mes: el método acumulado de la RG 4003 (${ANIO_JUBILADOS})`, "FF1B5E20");

  ws.mergeCells("A2:P2");
  const sub = ws.getCell("A2");
  sub.value =
    "Cargá en las columnas amarillas el haber bruto de cada recibo, el aguinaldo si tu recibo dice otro monto, el bono y lo que te retuvieron. Todo lo verde lo calcula la planilla.";
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { wrapText: true, vertical: "middle" };
  ws.getRow(2).height = 26;

  const cabeceras: [string, string][] = [
    [COL_ANIO.mes, "Mes"],
    [COL_ANIO.haber, "Haber bruto"],
    [COL_ANIO.aguinaldo, "Aguinaldo"],
    [COL_ANIO.bono, "Bono (no paga)"],
    [COL_ANIO.haberMinimo, "Haber mínimo"],
    [COL_ANIO.aporte, "Aporte obra social"],
    [COL_ANIO.brutoAcum, "Haberes acumulados"],
    [COL_ANIO.aportesAcum, "Aportes acumulados"],
    [COL_ANIO.deduccionAcum, "Deducción acumulada"],
    [COL_ANIO.ganancia, "Ganancia del período"],
    [COL_ANIO.proyeccion, "Proyección a todo el año"],
    [COL_ANIO.impuesto, "Impuesto del año proyectado"],
    [COL_ANIO.retencionAcum, "Retención acumulada"],
    [COL_ANIO.retencionMes, "Retención del mes"],
    [COL_ANIO.recibo, "Según tu recibo"],
    [COL_ANIO.diferencia, "Diferencia"],
  ];
  for (const [col, texto] of cabeceras) {
    const c = ws.getCell(`${col}4`);
    c.value = texto;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = S.header;
    c.border = BORDE;
    c.alignment = { horizontal: "center", wrapText: true, vertical: "middle" };
  }
  ws.getRow(4).height = 44;

  const entrada = (ref: string) => {
    const c = ws.getCell(ref);
    c.fill = S.input;
    c.border = BORDE;
    c.numFmt = ARS_FMT_DEC;
    c.alignment = { horizontal: "right" };
    c.dataValidation = {
      type: "decimal",
      operator: "greaterThanOrEqual",
      showErrorMessage: true,
      formulae: [0],
      error: "Ingresá un importe (0 o más).",
    };
    return c;
  };
  const salida = (ref: string, formula: string, opts: { total?: boolean } = {}) => {
    const c = ws.getCell(ref);
    c.value = { formula };
    c.fill = opts.total ? S.total : S.output;
    c.border = BORDE;
    c.numFmt = ARS_FMT_DEC;
    c.alignment = { horizontal: "right" };
    if (opts.total) c.font = { bold: true };
    return c;
  };

  for (let i = 0; i < 12; i++) {
    const r = FILA_MES_INI + i;
    const mes = i + 1;
    const anterior = r - 1;
    const primera = i === 0;

    const nombre = ws.getCell(`A${r}`);
    nombre.value = MESES_DEL_ANIO[i];
    nombre.fill = S.label;
    nombre.border = BORDE;
    nombre.font = { bold: true };
    nombre.alignment = { horizontal: "left", indent: 1 };

    entrada(`${COL_ANIO.haber}${r}`);

    // El aguinaldo de junio y diciembre nace calculado (la mitad del mejor haber del semestre) y
    // se puede pisar: es una sugerencia, no un dato nuestro. Los otros diez meses arrancan en cero.
    if ((MESES_CON_AGUINALDO as readonly number[]).includes(mes)) {
      const desde = mes === 6 ? FILA_MES_INI : FILA_MES_INI + 6;
      const hasta = mes === 6 ? FILA_MES_INI + 5 : FILA_MES_FIN;
      entrada(`${COL_ANIO.aguinaldo}${r}`).value = {
        formula: `ROUND(MAX($${COL_ANIO.haber}$${desde}:$${COL_ANIO.haber}$${hasta})/2,2)`,
      };
    } else {
      entrada(`${COL_ANIO.aguinaldo}${r}`).value = 0;
    }
    entrada(`${COL_ANIO.bono}${r}`).value = 0;

    salida(`${COL_ANIO.haberMinimo}${r}`, `${M}!$B$${FILA_MES_INI + i}`);

    const base = `${COL_ANIO.haber}${r}`;
    const sac = `${COL_ANIO.aguinaldo}${r}`;
    const minimo = `${COL_ANIO.haberMinimo}${r}`;
    salida(
      `${COL_ANIO.aporte}${r}`,
      `ROUND(${aporteSobreBase(base, minimo)}+IF(${sac}>0,${aporteSobreBase(sac, minimo)},0),2)`,
    );

    salida(
      `${COL_ANIO.brutoAcum}${r}`,
      primera ? `ROUND(${base}+${sac},2)` : `ROUND(${COL_ANIO.brutoAcum}${anterior}+${base}+${sac},2)`,
    );
    salida(
      `${COL_ANIO.aportesAcum}${r}`,
      primera
        ? `ROUND(${COL_ANIO.aporte}${r},2)`
        : `ROUND(${COL_ANIO.aportesAcum}${anterior}+${COL_ANIO.aporte}${r},2)`,
    );
    salida(
      `${COL_ANIO.deduccionAcum}${r}`,
      `IF(${REF.rigeEspecifica}="${SI}",` +
        `ROUND(${REF.multiplicador}*SUM($${COL_ANIO.haberMinimo}$${FILA_MES_INI}:${COL_ANIO.haberMinimo}${r})+${REF.cargas}*${mes}/12,2),` +
        `ROUND(${REF.alternativa}*${mes}/12,2))`,
    );
    salida(
      `${COL_ANIO.ganancia}${r}`,
      `ROUND(${COL_ANIO.brutoAcum}${r}-${COL_ANIO.aportesAcum}${r}-${COL_ANIO.deduccionAcum}${r}-${REF.otrasDeducciones}*${mes}/12,2)`,
    );
    salida(
      `${COL_ANIO.proyeccion}${r}`,
      `IF(${COL_ANIO.ganancia}${r}>0,ROUND(${COL_ANIO.ganancia}${r}*12/${mes},2),0)`,
    );

    // El tramo de la escala, en una columna oculta. COUNTIF cuenta los «desde» estrictamente
    // menores, que es exactamente el `gni > t.desde` de impuestoSegunEscala: una ganancia clavada
    // en el borde queda en el tramo de abajo, como en el motor. (La escala es continua, así que
    // ahí el impuesto sale casi igual de los dos lados; lo que se gana es que la planilla elija
    // el mismo tramo que el sitio, y por eso el check tiene los tres casos de cada borde.)
    const tramo = ws.getCell(`${COL_ANIO.tramo}${r}`);
    tramo.value = { formula: `MAX(1,COUNTIF(${REF.desde},"<"&${COL_ANIO.proyeccion}${r}))` };

    salida(
      `${COL_ANIO.impuesto}${r}`,
      `IF(${COL_ANIO.proyeccion}${r}<=0,0,ROUND(INDEX(${REF.fijo},${COL_ANIO.tramo}${r})+(${COL_ANIO.proyeccion}${r}-INDEX(${REF.excedente},${COL_ANIO.tramo}${r}))*INDEX(${REF.alicuota},${COL_ANIO.tramo}${r}),2))`,
    );
    salida(`${COL_ANIO.retencionAcum}${r}`, `ROUND(${COL_ANIO.impuesto}${r}*${mes}/12,2)`);
    salida(
      `${COL_ANIO.retencionMes}${r}`,
      primera
        ? `ROUND(MAX(0,${COL_ANIO.retencionAcum}${r}),2)`
        : `ROUND(MAX(0,${COL_ANIO.retencionAcum}${r}-${COL_ANIO.retencionAcum}${anterior}),2)`,
      { total: true },
    );

    entrada(`${COL_ANIO.recibo}${r}`).value = 0;
    salida(`${COL_ANIO.diferencia}${r}`, `ROUND(${COL_ANIO.recibo}${r}-${COL_ANIO.retencionMes}${r},2)`);
  }

  ws.getColumn(COL_ANIO.tramo).hidden = true;

  const totales = ws.getCell(`A${FILA_TOTALES}`);
  totales.value = "Todo el año";
  totales.fill = S.total;
  totales.border = BORDE;
  totales.font = { bold: true };
  totales.alignment = { horizontal: "left", indent: 1 };
  for (const col of [COL_ANIO.haber, COL_ANIO.aguinaldo, COL_ANIO.bono, COL_ANIO.aporte, COL_ANIO.retencionMes, COL_ANIO.recibo]) {
    salida(`${col}${FILA_TOTALES}`, `ROUND(SUM(${col}${FILA_MES_INI}:${col}${FILA_MES_FIN}),2)`, { total: true });
  }
  salida(
    `${COL_ANIO.diferencia}${FILA_TOTALES}`,
    `ROUND(${COL_ANIO.recibo}${FILA_TOTALES}-${COL_ANIO.retencionMes}${FILA_TOTALES},2)`,
    { total: true },
  );

  const r = FILA_TOTALES + 2;
  nota(
    ws,
    `A${r}:P${r}`,
    "La «Proyección a todo el año» es la ganancia del período llevada a doce meses: es sobre ella que corre la escala, y por eso el aguinaldo de junio hace saltar la retención de ese mes y bajar las de después. Tu caja reparte el aguinaldo en doceavas partes (RG 4003), así que puede correr pesos de un mes a otro. En diciembre las dos cuentas llegan al mismo total del año, que es el renglón que vale.",
  );
  ws.getRow(r).height = 56;
  ws.views = [{ state: "frozen", xSplit: 1, ySplit: 4 }];
}

// ─── Mis datos ───────────────────────────────────────────────────────────────

function buildDatos(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_JUB.datos, { properties: { tabColor: { argb: "FFF57C00" } } });
  ws.columns = [{ width: 58 }, { width: 26 }, { width: 4 }];
  titulo(ws, "A1:B1", `Ganancias de jubilados ${ANIO_JUBILADOS}: tu caso`, "FFF57C00");
  ws.mergeCells("A2:B2");
  const sub = ws.getCell("A2");
  sub.value = `Deducciones y escala de ARCA · Deducción específica del art. 30 · Aporte del art. 8 de la Ley 19.032`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  const C = CELDAS_JUB;
  bandaSeccion(ws, "A4:B4", "TUS DATOS");
  celdaEtiqueta(ws, "A5", "Tu jubilación o pensión");
  const regimen = celdaInput(ws, C.regimen, REGIMENES_CON_APORTE[0].etiqueta);
  regimen.dataValidation = desplegable(
    REGIMENES_CON_APORTE.map((r) => r.etiqueta),
    "Elegí una de las dos opciones de la lista.",
  );
  regimen.alignment = { wrapText: true, vertical: "middle", indent: 1 };
  ws.getRow(5).height = 34;

  celdaEtiqueta(ws, "A6", "¿Tenés cónyuge a cargo?");
  celdaInput(ws, C.conyuge, NO).dataValidation = desplegable([SI, NO], "Elegí Sí o No.");
  celdaEtiqueta(ws, "A7", "¿Cuántos hijos a cargo?");
  const hijos = celdaInput(ws, C.hijos, 0);
  hijos.alignment = { horizontal: "right" };
  hijos.dataValidation = {
    type: "whole",
    operator: "between",
    showErrorMessage: true,
    formulae: [0, 20],
    error: "Ingresá un número entero de 0 a 20.",
  };
  celdaEtiqueta(ws, "A8", "¿Tenés otros ingresos gravados por más de la ganancia no imponible del año?");
  celdaInput(ws, C.otrosIngresos, NO).dataValidation = desplegable([SI, NO], "Elegí Sí o No. Con Sí perdés la deducción específica.");
  ws.getRow(8).height = 30;
  celdaEtiqueta(ws, "A9", "¿Pagás Bienes Personales por algo más que tu vivienda única?");
  celdaInput(ws, C.bienesPersonales, NO).dataValidation = desplegable([SI, NO], "Elegí Sí o No. Con Sí perdés la deducción específica.");
  ws.getRow(9).height = 30;
  celdaEtiqueta(ws, "A10", "Otras deducciones que informás en el SiRADIG, en todo el año");
  const otras = celdaInput(ws, C.otrasDeducciones, 0);
  otras.numFmt = ARS_FMT_DEC;
  otras.alignment = { horizontal: "right" };
  ws.getRow(10).height = 30;

  bandaSeccion(ws, "A12:B12", "LA DEDUCCIÓN QUE TE RIGE");
  celdaResultado(ws, 13, `Deducción específica del año (${MULTIPLICADOR_ESPECIFICA} por la suma de los haberes mínimos)`, REF.especificaAnual, {
    formato: ARS_FMT_DEC,
  });
  celdaResultado(ws, 14, "No imponible más deducción especial más la doceava parte", `ROUND((${REF.mniMasEspecial}+$${C.cargasFamilia})*13/12,2)`, {
    formato: ARS_FMT_DEC,
  });
  celdaResultado(
    ws,
    15,
    "Cargas de familia (se restan además de la específica)",
    `ROUND(IF($${C.conyuge}="${SI}",${REF.conyugeMonto},0)+MAX(0,INT($${C.hijos}))*${REF.hijoMonto},2)`,
    { formato: ARS_FMT_DEC },
  );
  celdaResultado(
    ws,
    16,
    "La que te rige",
    `IF(${REF.rigeEspecifica}="${SI}","La deducción específica de ocho haberes mínimos","El no imponible más la deducción especial")`,
    { total: true, formato: "@" },
  );
  celdaResultado(
    ws,
    17,
    "Por qué",
    `IF(${REF.rigeEspecifica}="${SI}",` +
      `"Supera al no imponible más la deducción especial, no tenés otros ingresos por encima de la ganancia no imponible y no pagás Bienes Personales por algo más que tu vivienda única.",` +
      `IF($${C.otrosIngresos}="${SI}","Tus otros ingresos superan la ganancia no imponible del año: la ley te saca la deducción específica.",` +
      `IF($${C.bienesPersonales}="${SI}","Pagás Bienes Personales por algo más que tu vivienda única: la ley te saca la deducción específica.",` +
      `"Este año los ocho haberes mínimos no superan al no imponible más la deducción especial, así que rige el más alto de los dos.")))`,
    { formato: "@" },
  );
  ws.getCell(`B17`).alignment = { wrapText: true, vertical: "top" };
  ws.getRow(17).height = 60;

  bandaSeccion(ws, "A19:B19", "TU AÑO");
  const dic = FILA_MES_FIN;
  celdaResultado(ws, 20, "Haberes brutos del año (los doce más los dos aguinaldos)", `${A}!$${COL_ANIO.brutoAcum}$${dic}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 21, "Aporte de obra social del año (Ley 19.032)", `${A}!$${COL_ANIO.aportesAcum}$${dic}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 22, "Deducciones acumuladas en diciembre", `${A}!$${COL_ANIO.deduccionAcum}$${dic}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 23, "Ganancia sujeta a impuesto", `${A}!$${COL_ANIO.proyeccion}$${dic}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 24, "IMPUESTO DEL AÑO", `${A}!$${COL_ANIO.impuesto}$${dic}`, { total: true, formato: ARS_FMT_DEC });
  celdaResultado(
    ws,
    25,
    "Lo que el impuesto se lleva de tus haberes",
    `IF($${C.brutoAnual}>0,$${C.impuestoAnual}/$${C.brutoAnual},0)`,
    { formato: "0.00%" },
  );

  bandaSeccion(ws, "A27:B27", "CONTROL CONTRA TUS RECIBOS");
  celdaResultado(ws, 28, "Lo que dicen tus recibos que te retuvieron", `${A}!$${COL_ANIO.recibo}$${FILA_TOTALES}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 29, "Lo que corresponde según esta planilla", `${A}!$${COL_ANIO.retencionMes}$${FILA_TOTALES}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 30, "DIFERENCIA DEL AÑO", `ROUND($${C.segunRecibos}-$${C.segunPlanilla},2)`, { total: true, formato: ARS_FMT_DEC });
  celdaResultado(
    ws,
    31,
    "Qué significa",
    `IF($${C.segunRecibos}=0,"Cargá en la hoja «${HOJAS_JUB.anio}» lo que dice cada recibo y acá te aparece la diferencia.",` +
      `IF($${C.diferencia}>1,"Te retuvieron de más. La diferencia se reclama a tu agente de retención o se recupera en la declaración jurada.",` +
      `IF($${C.diferencia}<-1,"Te retuvieron de menos: es probable que falte informar algo en el SiRADIG o que venga un ajuste.",` +
      `"Lo retenido coincide con lo que corresponde.")))`,
    { formato: "@" },
  );
  ws.getCell("B31").alignment = { wrapText: true, vertical: "top" };
  ws.getRow(31).height = 56;

  nota(
    ws,
    "A33:B33",
    `Esta cuenta es la de la hoja «${HOJAS_JUB.anio}»: el método acumulado con tus doce haberes. La calculadora gratis de calcular.ar/ganancias-jubilados hace la estimación anual con un haber fijo, así que puede dar unos pesos de diferencia. Las dos usan la misma escala, las mismas deducciones y la misma serie de ANSES.`,
  );
  ws.getRow(33).height = 46;
  nota(
    ws,
    "A34:B34",
    "Para que te descuenten el cónyuge, los hijos y las otras deducciones tenés que informarlos en el formulario 572 web (SiRADIG) y elegir a ANSES o a tu caja como agente de retención. Si no los cargás, no te los descuentan.",
  );
  ws.getRow(34).height = 34;
  ws.views = [{ state: "frozen", ySplit: 4 }];
}

// ─── Main ────────────────────────────────────────────────────────────────────

export async function generarPlanillaGananciasJubilados(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = `Planilla de Ganancias para jubilados ${ANIO_JUBILADOS}`;
  wb.subject = "Retención mensual acumulada de Ganancias de un jubilado o pensionado, con el control contra sus recibos";
  wb.keywords = "ganancias, jubilados, pensionados, deducción específica, haberes mínimos, retención, SiRADIG, planilla";

  buildInstrucciones(wb);
  buildDatos(wb);
  buildAnio(wb);
  buildMinimos(wb);
  buildEscala(wb);
  hojaFuentes(
    wb,
    [
      ...JUBILADOS_FUENTES.lista.map((f) => ({ nombre: f.nombre, url: f.url })),
      { nombre: GANANCIAS_FUENTES.escala.nombre, url: GANANCIAS_FUENTES.escala.url },
      {
        nombre: "Ley 19.032 (INSSJP), art. 8: el aporte de obra social sobre el haber, texto actualizado",
        url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/16081/texact.htm",
      },
      {
        nombre: `${prestacionesVigentes().resolucion}: el haber mínimo garantizado vigente`,
        url: prestacionesVigentes().resolucionUrl,
      },
    ],
    JUBILADOS_FUENTES.consultadoEl,
    [],
    "Planilla de calcular.ar. Las actualizaciones del año están incluidas en el precio: cuando ANSES publica el haber mínimo de un mes nuevo o ARCA actualiza la escala y las deducciones, regeneramos la planilla y el mismo enlace de descarga te baja la versión al día.",
  );

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salida = path.join(dir, ARCHIVO_GANANCIAS_JUBILADOS);
  await wb.xlsx.writeFile(salida);
  return salida;
}

if (process.argv[1] && /gen_planilla_ganancias_jubilados\.ts$/.test(process.argv[1])) {
  generarPlanillaGananciasJubilados()
    .then((salida) => console.log(`Planilla de Ganancias para jubilados generada: ${salida}`))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
