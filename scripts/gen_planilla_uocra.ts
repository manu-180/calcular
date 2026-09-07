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

const ESC = "Escala 2026";

// Layout de la hoja Escala. El Liquidador y scripts/check_planilla_uocra.ts leen estas
// mismas coordenadas: si cambian acá, cambian en los dos lados o el check se pone rojo.
const FILA_HEADER = 2;
const FILA_JORNAL_INI = 3;
const COMBOS = CATEGORIAS_UOCRA.length * ZONAS_UOCRA.length; // 5 × 4 = 20
const FILA_JORNAL_FIN = FILA_JORNAL_INI + COMBOS - 1;
const FILA_SNR_INI = FILA_JORNAL_FIN + 2; // una fila de aire entre bloques
const FILA_SNR_FIN = FILA_SNR_INI + COMBOS - 1;
const COL_MES_INI = 4; // D
const COL_MES_FIN = COL_MES_INI + MESES_UOCRA.length - 1;

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
    ["4", "La hoja «Escala 2026» tiene los jornales oficiales por categoría y zona, mes por mes. Es de donde el Liquidador saca los valores."],
    ["5", "La hoja «Fuentes» tiene el link a cada acuerdo paritario firmado y la fecha en que se verificó. Si alguien te discute un número, ahí está el PDF."],
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
    `Próxima paritaria: ${UOCRA_PROXIMA_PARITARIA}. Cuando se firme y publique la escala, actualizamos la planilla y te llega la versión nueva por email.`,
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
    ...MESES_UOCRA.map(() => ({ width: 15 })),
  ];

  titulo(ws, `A1:${L_MES_FIN}1`, "Escala oficial UOCRA 2026 — CCT 76/75 (jornales y sumas no remunerativas)", "FF1565C0");

  const headers = ["Clave", "Categoría", "Zona", ...MESES_UOCRA.map((m) => m.etiqueta)];
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
    valor: (cat: (typeof CATEGORIAS_UOCRA)[number], zonaId: string, mes: (typeof MESES_UOCRA)[number]) => number;
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

      MESES_UOCRA.forEach((mes, j) => {
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
    `Agosto 2026 no tiene suma no remunerativa: el acuerdo del 19/5/2026 la absorbió al jornal. Verificado el ${UOCRA_FUENTES.consultadoEl} contra los acuerdos firmados (ver hoja Fuentes).`,
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
    [7, "Mes a liquidar", MESES_UOCRA.at(-1)!.etiqueta, desplegable(MESES_UOCRA.map((m) => m.etiqueta), "Elegí un mes de la lista.")],
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
  hojaFuentes(
    wb,
    [
      UOCRA_FUENTES.acuerdoTramo1,
      UOCRA_FUENTES.acuerdoTramo2,
      UOCRA_FUENTES.anexoTramo2,
      UOCRA_FUENTES.cct,
      UOCRA_FUENTES.ley22250,
      UOCRA_FUENTES.uocra,
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
      console.log(`   Hojas: Instrucciones | ${ESC} | Liquidador | Fuentes`);
      console.log(`   ${MESES_UOCRA.length} meses: ${MESES_UOCRA.map((m) => m.etiqueta).join(" · ")}`);
      console.log(`   ${COMBOS} combinaciones categoría × zona`);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
