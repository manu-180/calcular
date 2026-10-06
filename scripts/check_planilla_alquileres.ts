// Verificación de la PLANILLA de alquileres: abre el .xlsx que se entrega, evalúa sus fórmulas con
// HyperFormula y compara contra ajustesAlquiler(), el motor de la calculadora gratis de
// /inflacion/alquiler. Lo que compra el dueño y lo que ve gratis el inquilino tienen que dar el
// mismo número, o el aviso de aumento que manda la planilla abre una discusión en vez de cerrarla.
//
// Además: la serie del IPC del archivo == src/data/ipc-serie.ts, la otra convención de meses y el
// «otro índice» contra una réplica directa, el corte por fin de contrato, recibo, aviso, tablero,
// celdas protegidas, cero errores de fórmula, y el prefill (validar con input hostil + aplicar).
//
// Correr con: npx tsx scripts/check_planilla_alquileres.ts  (o vía scripts/check-all.ts)

import ExcelJS from "exceljs";
import path from "node:path";
import os from "node:os";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { DetailedCellError } from "hyperformula";
import { IPC_SERIE } from "../src/data/ipc-serie";
import {
  ajustesAlquiler,
  indiceDe,
  MESES_LARGOS,
  mesesEntre,
  nombrePeriodo,
  sumarMeses,
  ULTIMO_PERIODO,
  type Periodo,
} from "../src/lib/inflacion";
import { AVISO_CON_DATOS, PLANILLA_ALQ, hojaContrato, prefill, duracionPara } from "../src/lib/prefill/alquileres";
import { abrirLibro, type LibroEvaluable } from "./evaluar_xlsx";
import { CELDAS_RECIBO } from "./gen_planilla_alquileres";

const ARCHIVO = path.join(process.cwd(), "private", PLANILLA_ALQ.archivo);
const H = PLANILLA_ALQ.hojas;
const C = PLANILLA_ALQ.celdas;
const O = PLANILLA_ALQ.opciones;
const F0 = PLANILLA_ALQ.filaCronograma0;

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const igual = (a: unknown, b: number, tol = 0.005) => typeof a === "number" && Math.abs(a - b) < tol;
const vacio = (v: unknown) => v === "" || v === null;
const miles = (n: number) => Math.round(n).toLocaleString("es-AR", { maximumFractionDigits: 0 });

type Contrato = {
  monto: number;
  inicio: Periodo;
  cada: number;
  duracion: number;
  convencion?: "completos" | "publicados";
  otros?: number[];
};

function cargarContrato(libro: LibroEvaluable, hoja: string, c: Contrato) {
  const [anio, mes] = c.inicio.split("-").map(Number);
  const carga: Record<string, string | number | null> = {
    [C.mes]: MESES_LARGOS[mes - 1],
    [C.anio]: anio,
    [C.duracion]: c.duracion,
    [C.alquiler]: c.monto,
    [C.indice]: c.otros ? O.indiceOtro : O.indiceIpc,
    [C.cada]: c.cada,
    [C.convencion]: c.convencion === "publicados" ? O.convPublicados : O.convCompletos,
  };
  for (let k = 1; k <= PLANILLA_ALQ.kmax; k++) carga[`F${F0 + k}`] = c.otros && k <= c.otros.length ? c.otros[k - 1] : null;
  libro.cargar(hoja, carga);
}

/** Lo que la planilla debería mostrar para un contrato, calculado sin la planilla. */
type Esperado = {
  ajustes: { rige: Periodo; variacion: number; alquiler: number }[];
  proximo: Periodo | null;
  estimado: number | null;
};

function esperadoCalculadora(c: Contrato): Esperado | null {
  const r = ajustesAlquiler({ alquilerInicial: c.monto, periodoInicio: c.inicio, cadaMeses: c.cada });
  if (!r) return null;
  const kc = Math.min(Math.floor((c.duracion - 1) / c.cada), PLANILLA_ALQ.kmax);
  const ajustes = r.ajustes.slice(0, kc).map((a) => ({ rige: a.periodoEfecto, variacion: a.variacionPct / 100, alquiler: a.alquilerNuevo }));
  const cortado = r.ajustes.length >= kc;
  return {
    ajustes,
    proximo: cortado ? null : (r.proximo?.periodoEfecto ?? null),
    estimado: cortado ? null : (r.proximo?.estimado?.alquilerNuevo ?? null),
  };
}

// Réplica directa para lo que la calculadora no modela: la convención «últimos publicados» (los
// meses corren uno atrás) y el «otro índice» con el % cargado a mano.
function esperadoReplica(c: Contrato): Esperado {
  const kc = Math.min(Math.floor((c.duracion - 1) / c.cada), PLANILLA_ALQ.kmax);
  const atraso = c.convencion === "publicados" ? 1 : 0;
  const ajustes: Esperado["ajustes"] = [];
  let alquiler = c.monto;
  for (let k = 1; k <= kc; k++) {
    const rige = sumarMeses(c.inicio, k * c.cada);
    let variacion: number | null;
    if (c.otros) variacion = k <= c.otros.length ? c.otros[k - 1] / 100 : null;
    else {
      const hasta = indiceDe(sumarMeses(rige, -1 - atraso));
      const desde = indiceDe(sumarMeses(rige, -1 - atraso - c.cada));
      variacion = hasta !== null && desde !== null ? hasta / desde - 1 : null;
    }
    if (variacion === null) break;
    alquiler *= 1 + variacion;
    ajustes.push({ rige, variacion, alquiler });
  }
  const proximo = ajustes.length < kc ? sumarMeses(c.inicio, (ajustes.length + 1) * c.cada) : null;
  return { ajustes, proximo, estimado: null };
}

function comparar(libro: LibroEvaluable, hoja: string, c: Contrato, e: Esperado, conEstimado: boolean): string[] {
  const mal: string[] = [];
  const dif = (campo: string, archivo: unknown, esperado: unknown) => mal.push(`${campo}: archivo ${JSON.stringify(archivo)} ≠ ${JSON.stringify(esperado)}`);

  e.ajustes.forEach((a, i) => {
    const r = F0 + i + 1;
    const g = libro.valor(hoja, `G${r}`);
    if (!igual(g, a.alquiler)) dif(`ajuste ${i + 1} alquiler`, g, a.alquiler);
    const v = libro.valor(hoja, `E${r}`);
    if (!igual(v, a.variacion, 1e-9)) dif(`ajuste ${i + 1} variación`, v, a.variacion);
    const b = libro.valor(hoja, `B${r}`);
    if (b !== nombrePeriodo(a.rige)) dif(`ajuste ${i + 1} rige`, b, nombrePeriodo(a.rige));
  });
  const siguiente = libro.valor(hoja, `G${F0 + e.ajustes.length + 1}`);
  if (!vacio(siguiente)) dif("fila posterior al último ajuste", siguiente, "");

  const vigente = e.ajustes.at(-1)?.alquiler ?? c.monto;
  if (!igual(libro.valor(hoja, "B17"), vigente)) dif("alquiler vigente", libro.valor(hoja, "B17"), vigente);
  const desde = e.ajustes.at(-1)?.rige ?? c.inicio;
  if (libro.valor(hoja, "B18") !== nombrePeriodo(desde)) dif("rige desde", libro.valor(hoja, "B18"), nombrePeriodo(desde));
  if (libro.valor(hoja, "B19") !== e.ajustes.length) dif("ajustes aplicados", libro.valor(hoja, "B19"), e.ajustes.length);
  const prox = e.proximo ? nombrePeriodo(e.proximo) : "No quedan ajustes antes de que termine";
  if (libro.valor(hoja, "B21") !== prox) dif("próximo ajuste", libro.valor(hoja, "B21"), prox);
  if (conEstimado) {
    const est = libro.valor(hoja, "B22");
    if (e.estimado === null ? !vacio(est) : !igual(est, e.estimado)) dif("estimado", est, e.estimado);
  }
  return mal;
}

function erroresDeFormula(libro: LibroEvaluable): string[] {
  const errores: string[] = [];
  libro.hojas.forEach((hoja) => {
    const id = libro.hf.getSheetId(hoja)!;
    libro.hf.getSheetValues(id).forEach((fila, r) =>
      fila.forEach((v, c) => {
        if (v instanceof DetailedCellError) errores.push(`${hoja}!R${r + 1}C${c + 1}: ${v.value} ${v.message}`);
      }),
    );
  });
  return errores;
}

async function main() {
  check("el archivo entregable existe", existsSync(ARCHIVO), ARCHIVO);
  if (!existsSync(ARCHIVO)) process.exit(1);
  const libro = await abrirLibro(ARCHIVO);

  const esperadas = [H.inicio, H.tablero, ...Array.from({ length: PLANILLA_ALQ.contratos }, (_, i) => hojaContrato(i + 1)), H.recibo, H.aviso, H.ipc, "Fuentes"];
  check("tiene las hojas prometidas, en orden", JSON.stringify(libro.hojas) === JSON.stringify(esperadas), libro.hojas);

  // 1. IPC: la serie del archivo == la del sitio, y el último mes es el mismo.
  const malIpc = IPC_SERIE.filter(([, v], i) => libro.crudo(H.ipc, `D${5 + i}`) !== v);
  check(`serie del IPC del archivo == src/data/ipc-serie.ts (${IPC_SERIE.length} meses)`, malIpc.length === 0, malIpc.slice(0, 3));
  check("último IPC del archivo == ULTIMO_PERIODO", libro.valor(H.ipc, "J4") === nombrePeriodo(ULTIMO_PERIODO), libro.valor(H.ipc, "J4"));

  // 2. Estado inicial: el ejemplo de Contrato 1 == calculadora, y ninguna celda con error.
  check("sin errores de fórmula en el archivo tal como se entrega", erroresDeFormula(libro).length === 0, erroresDeFormula(libro).slice(0, 5));
  const ejemplo: Contrato = { monto: 500000, inicio: sumarMeses(ULTIMO_PERIODO, -11), cada: 3, duracion: 24 };
  const eEj = esperadoCalculadora(ejemplo)!;
  const malEj = comparar(libro, hojaContrato(1), ejemplo, eEj, true);
  check("el ejemplo de «Contrato 1» da lo mismo que la calculadora", malEj.length === 0, malEj);
  check("el ejemplo tiene al menos un ajuste aplicado (si no, el aviso sale vacío)", eEj.ajustes.length >= 1);

  // 3. MATRIZ contra la calculadora.
  const inicios: Periodo[] = ["2017-01", "2019-07", "2022-03", "2024-01", "2024-11", sumarMeses(ULTIMO_PERIODO, -11), sumarMeses(ULTIMO_PERIODO, -4), sumarMeses(ULTIMO_PERIODO, -2), ULTIMO_PERIODO, sumarMeses(ULTIMO_PERIODO, 1)];
  const cadas = [1, 2, 3, 4, 6, 12];
  const montos = [1, 350000, 1234567.89];
  const duraciones = [24, 36, 60];
  let casos = 0;
  const malMatriz: string[] = [];
  for (const inicio of inicios)
    for (const cada of cadas)
      for (const monto of montos)
        for (const duracion of duraciones) {
          // La calculadora corta en 24 ajustes: con más, la planilla sigue y no hay contra qué comparar.
          const r = ajustesAlquiler({ alquilerInicial: monto, periodoInicio: inicio, cadaMeses: cada });
          if (!r || r.ajustes.length >= 24) continue;
          const c: Contrato = { monto, inicio, cada, duracion };
          const hoja = hojaContrato(1 + (casos % PLANILLA_ALQ.contratos));
          cargarContrato(libro, hoja, c);
          casos++;
          const mal = comparar(libro, hoja, c, esperadoCalculadora(c)!, true);
          if (mal.length) malMatriz.push(`${hoja} ${inicio} cada ${cada} $${monto} ${duracion}m → ${mal.slice(0, 2).join(" | ")}`);
        }
  check(`cronograma, vigente, próximo y estimado == ajustesAlquiler() en ${casos} contratos (las 6 hojas)`, malMatriz.length === 0, malMatriz.slice(0, 5));

  // 4. Convención «últimos publicados» y «otro índice» contra la réplica.
  const malOtros: string[] = [];
  const especiales: Contrato[] = [
    { monto: 400000, inicio: "2024-05", cada: 4, duracion: 36, convencion: "publicados" },
    { monto: 400000, inicio: "2017-02", cada: 6, duracion: 60, convencion: "publicados" },
    { monto: 250000, inicio: sumarMeses(ULTIMO_PERIODO, -9), cada: 3, duracion: 24, convencion: "publicados" },
    { monto: 600000, inicio: "2025-01", cada: 4, duracion: 36, otros: [9.32, 8.1, 7.45] },
    { monto: 600000, inicio: "2025-01", cada: 6, duracion: 24, otros: [15.13, -1.5, 3] },
    { monto: 600000, inicio: "2025-01", cada: 3, duracion: 24, otros: [] },
  ];
  for (const c of especiales) {
    cargarContrato(libro, hojaContrato(2), c);
    const mal = comparar(libro, hojaContrato(2), c, esperadoReplica(c), false);
    if (mal.length) malOtros.push(`${JSON.stringify(c)} → ${mal.slice(0, 2).join(" | ")}`);
  }
  check("«últimos publicados» y «otro índice» == réplica directa", malOtros.length === 0, malOtros);

  // 5. Fin de contrato: 7 meses ajustando cada 3 → sólo 2 ajustes, aunque haya IPC para más.
  const corto: Contrato = { monto: 300000, inicio: "2023-01", cada: 3, duracion: 7 };
  cargarContrato(libro, hojaContrato(3), corto);
  check("un contrato de 7 meses trimestral tiene 2 ajustes y no anuncia un tercero", libro.valor(hojaContrato(3), "B19") === 2 && libro.valor(hojaContrato(3), "B21") === "No quedan ajustes antes de que termine", [libro.valor(hojaContrato(3), "B19"), libro.valor(hojaContrato(3), "B21")]);
  check("el contrato terminado lo dice en «Qué hacer»", String(libro.valor(hojaContrato(3), "B24")).startsWith("No quedan ajustes: el contrato termina en julio de 2023"), libro.valor(hojaContrato(3), "B24"));

  // 6. Contrato vacío: no muestra nada raro ni errores.
  libro.cargar(hojaContrato(6), { [C.mes]: null, [C.anio]: null, [C.alquiler]: null });
  check("un contrato vacío pide completar los datos", String(libro.valor(hojaContrato(6), "B24")).startsWith("Completá las celdas amarillas"), libro.valor(hojaContrato(6), "B24"));
  check("un contrato vacío figura «Sin cargar» en el tablero", String(libro.valor(H.tablero, "H10")).startsWith("Sin cargar"), libro.valor(H.tablero, "H10"));

  // 7. Tablero == hoja de cada contrato.
  const base: Contrato = { monto: 500000, inicio: sumarMeses(ULTIMO_PERIODO, -7), cada: 4, duracion: 24 };
  cargarContrato(libro, hojaContrato(1), base);
  libro.cargar(hojaContrato(1), { [C.propiedad]: "Lavalle 500, 2° A", [C.inquilino]: "Ana Pérez", [C.propietario]: "Juan Díaz" });
  const eBase = esperadoCalculadora(base)!;
  const vigBase = eBase.ajustes.at(-1)?.alquiler ?? base.monto;
  check("el tablero muestra el alquiler vigente del Contrato 1", igual(libro.valor(H.tablero, "D5"), vigBase), [libro.valor(H.tablero, "D5"), vigBase]);
  check("el tablero muestra propiedad e inquilino", libro.valor(H.tablero, "B5") === "Lavalle 500, 2° A" && libro.valor(H.tablero, "C5") === "Ana Pérez");
  check("el tablero muestra el próximo ajuste", libro.valor(H.tablero, "F5") === (eBase.proximo ? nombrePeriodo(eBase.proximo) : "No quedan ajustes antes de que termine"), libro.valor(H.tablero, "F5"));

  // 8. Recibo: el importe del mes es el alquiler que regía ese mes.
  const R = CELDAS_RECIBO;
  const malRecibo: string[] = [];
  for (let k = 0; k < 8; k++) {
    const mes = sumarMeses(base.inicio, k);
    const [a, m] = mes.split("-").map(Number);
    libro.cargar(H.recibo, { [R.contrato]: hojaContrato(1), [R.mes]: MESES_LARGOS[m - 1], [R.anio]: a, [R.expensas]: 45000, [R.otros]: 0 });
    const n = Math.floor(k / base.cada);
    const esperado = n === 0 ? base.monto : eBase.ajustes[n - 1]?.alquiler;
    const archivo = libro.valor(H.recibo, R.alquiler);
    if (esperado === undefined) {
      if (!vacio(archivo) || !String(libro.valor(H.recibo, R.estado)).startsWith("Todavía no se puede calcular")) malRecibo.push(`${mes}: debía avisar que falta el índice, dio ${JSON.stringify(archivo)}`);
      continue;
    }
    if (!igual(archivo, esperado)) malRecibo.push(`${mes}: alquiler ${JSON.stringify(archivo)} ≠ ${esperado}`);
    if (!igual(libro.valor(H.recibo, R.total), esperado + 45000)) malRecibo.push(`${mes}: total ${JSON.stringify(libro.valor(H.recibo, R.total))}`);
    const frase = String(libro.valor(H.recibo, R.frase));
    const sumaTxt = `la suma de $ ${miles(esperado + 45000)} por el alquiler de ${nombrePeriodo(mes)} del inmueble de Lavalle 500, 2° A`;
    if (!frase.startsWith("Recibí de Ana Pérez ") || !frase.includes(sumaTxt)) malRecibo.push(`${mes}: frase «${frase}» no contiene «${sumaTxt}»`);
  }
  check("recibo: alquiler, total y texto del mes == calculadora en 8 meses seguidos", malRecibo.length === 0, malRecibo);
  libro.cargar(H.recibo, { [R.mes]: MESES_LARGOS[0], [R.anio]: 2020 });
  check("recibo de un mes anterior al contrato: avisa y no inventa un importe", vacio(libro.valor(H.recibo, R.alquiler)) && String(libro.valor(H.recibo, R.estado)).startsWith("Ese mes está fuera del contrato"), libro.valor(H.recibo, R.estado));
  libro.cargar(H.recibo, { [R.contrato]: hojaContrato(6) });
  check("recibo de un contrato vacío: pide completarlo", String(libro.valor(H.recibo, R.estado)).startsWith("Ese contrato está vacío"), libro.valor(H.recibo, R.estado));

  // 9. Aviso de aumento: el último ajuste, con los montos y la cuenta en el texto.
  libro.cargar(H.aviso, { B4: hojaContrato(1) });
  const ult = eBase.ajustes.at(-1);
  if (ult) {
    const ant = eBase.ajustes.length >= 2 ? eBase.ajustes.at(-2)!.alquiler : base.monto;
    const pct = (ult.variacion * 100).toFixed(2).replace(".", ",");
    const msj = String(libro.valor(H.aviso, "A17"));
    const wa = String(libro.valor(H.aviso, "A33"));
    const hasta = sumarMeses(ult.rige, -1);
    const desdeIpc = sumarMeses(hasta, -base.cada);
    const factor = (indiceDe(hasta)! / indiceDe(desdeIpc)!).toFixed(4).replace(".", ",");
    check("aviso: anterior, nuevo y variación == calculadora", igual(libro.valor(H.aviso, "B8"), ant) && igual(libro.valor(H.aviso, "B9"), ult.alquiler) && igual(libro.valor(H.aviso, "B10"), ult.variacion, 1e-9));
    const frases = [
      "Hola, Ana Pérez:",
      `Desde ${nombrePeriodo(ult.rige)}, el alquiler pasa de $ ${miles(ant)} a $ ${miles(ult.alquiler)} por mes: un aumento de ${pct}%.`,
      `el IPC de ${nombrePeriodo(hasta)} es ${indiceDe(hasta)!.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      `Dividiendo uno por el otro da ${factor}`,
      "Saludos,\nJuan Díaz",
    ];
    const faltan = frases.filter((f) => !msj.includes(f));
    check("aviso: el mensaje trae saludo, montos, la cuenta del IPC y la firma", faltan.length === 0, { faltan, msj });
    check("aviso: la versión de WhatsApp trae el monto nuevo y el %", wa.includes(`$ ${miles(ult.alquiler)} por mes (+${pct}%`), wa);
  } else check("el contrato del aviso tiene un ajuste para probar", false);
  libro.cargar(H.aviso, { B4: hojaContrato(6) });
  check("aviso de un contrato vacío: pide elegir uno con datos", String(libro.valor(H.aviso, "A17")).startsWith("Elegí un contrato"), libro.valor(H.aviso, "A17"));

  // 10. IPC cargado a mano: un mes nuevo destraba el ajuste que lo esperaba.
  const iNuevo = IPC_SERIE.length;
  const filaNuevo = 5 + iNuevo;
  const sinIpc: Contrato = { monto: 100000, inicio: sumarMeses(ULTIMO_PERIODO, -1), cada: 3, duracion: 24 };
  cargarContrato(libro, hojaContrato(4), sinIpc);
  const antes = libro.valor(hojaContrato(4), "B19");
  libro.cargar(H.ipc, { [`F${filaNuevo}`]: 2, [`F${filaNuevo + 1}`]: 2.5 });
  const ultimoIdx = IPC_SERIE.at(-1)![1];
  check("cargar el % de un mes nuevo agrega su índice", igual(libro.valor(H.ipc, `D${filaNuevo}`), ultimoIdx * 1.02, 1e-6) && libro.valor(H.ipc, "J4") === nombrePeriodo(sumarMeses(ULTIMO_PERIODO, 2)));
  check("y el ajuste que esperaba ese IPC se aplica", antes === 0 && libro.valor(hojaContrato(4), "B19") === 1, [antes, libro.valor(hojaContrato(4), "B19")]);
  // El ajuste rige en ULTIMO+2 y usa el IPC de ULTIMO-2 a ULTIMO+1 (el primero de los cargados a mano).
  const esperadoManual = (100000 * (ultimoIdx * 1.02)) / indiceDe(sumarMeses(ULTIMO_PERIODO, -2))!;
  check("con el índice cargado a mano, el monto es la cuenta exacta", igual(libro.valor(hojaContrato(4), "B17"), esperadoManual), [libro.valor(hojaContrato(4), "B17"), esperadoManual]);
  libro.cargar(H.ipc, { [`F${filaNuevo}`]: null, [`F${filaNuevo + 1}`]: null });
  check("sin errores de fórmula después de toda la matriz", erroresDeFormula(libro).length === 0, erroresDeFormula(libro).slice(0, 5));

  // 11. Protección: las celdas amarillas se pueden editar, las fórmulas no.
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ARCHIVO);
  const ws1 = wb.getWorksheet(hojaContrato(1))!;
  const protegida = (ws: ExcelJS.Worksheet) => Boolean((ws as unknown as { sheetProtection?: { sheet?: boolean } }).sheetProtection?.sheet);
  check("las hojas de contratos, tablero, recibo, aviso e IPC están protegidas", [H.tablero, hojaContrato(1), hojaContrato(6), H.recibo, H.aviso, H.ipc].every((h) => protegida(wb.getWorksheet(h)!)));
  const inputsLibres = Object.values(C).every((ref) => ws1.getCell(ref).protection?.locked === false) && ws1.getCell(`F${F0 + 1}`).protection?.locked === false;
  check("los datos del contrato y el % a mano no están bloqueados", inputsLibres);
  check("las fórmulas del resultado y del cronograma sí están bloqueadas", ["B17", "B24", `G${F0 + 1}`, `E${F0 + 1}`].every((ref) => ws1.getCell(ref).protection?.locked !== false));

  // 12. Prefill: validar con input hostil.
  const v = prefill.validar;
  const hostiles: [string, unknown][] = [
    ["null", null],
    ["string", "500000"],
    ["array", [500000, "2026-01", 3]],
    ["monto negativo", { alquilerInicial: -1, inicio: "2026-01", cadaMeses: 3 }],
    ["monto cero", { alquilerInicial: 0, inicio: "2026-01", cadaMeses: 3 }],
    ["monto NaN", { alquilerInicial: NaN, inicio: "2026-01", cadaMeses: 3 }],
    ["monto Infinity", { alquilerInicial: Infinity, inicio: "2026-01", cadaMeses: 3 }],
    ["monto string", { alquilerInicial: "500000", inicio: "2026-01", cadaMeses: 3 }],
    ["monto gigante", { alquilerInicial: 1e15, inicio: "2026-01", cadaMeses: 3 }],
    ["inicio con fórmula", { alquilerInicial: 1000, inicio: "=HYPERLINK(\"x\")", cadaMeses: 3 }],
    ["inicio mes 13", { alquilerInicial: 1000, inicio: "2026-13", cadaMeses: 3 }],
    ["inicio mes 00", { alquilerInicial: 1000, inicio: "2026-00", cadaMeses: 3 }],
    ["inicio 2016", { alquilerInicial: 1000, inicio: "2016-12", cadaMeses: 3 }],
    ["inicio con sufijo", { alquilerInicial: 1000, inicio: "2026-01x", cadaMeses: 3 }],
    ["inicio número", { alquilerInicial: 1000, inicio: 202601, cadaMeses: 3 }],
    ["cada 0", { alquilerInicial: 1000, inicio: "2026-01", cadaMeses: 0 }],
    ["cada 13", { alquilerInicial: 1000, inicio: "2026-01", cadaMeses: 13 }],
    ["cada decimal", { alquilerInicial: 1000, inicio: "2026-01", cadaMeses: 3.5 }],
    ["cada string", { alquilerInicial: 1000, inicio: "2026-01", cadaMeses: "3" }],
    ["sin campos", {}],
  ];
  const pasaron = hostiles.filter(([, raw]) => v(raw) !== null).map(([n]) => n);
  check(`validar rechaza ${hostiles.length} entradas hostiles`, pasaron.length === 0, pasaron);
  const ok = v({ alquilerInicial: 432100.555, inicio: "2025-10", cadaMeses: 4, extra: "<script>" });
  const largo = (atras: number) => v({ alquilerInicial: 1000, inicio: sumarMeses(ULTIMO_PERIODO, -atras), cadaMeses: 3 });
  check("validar rechaza un contrato que no llega a hoy dentro de la duración máxima (sale la genérica)", largo(PLANILLA_ALQ.duracionMax) === null);
  check("validar acepta el contrato más largo que todavía entra", largo(PLANILLA_ALQ.duracionMax - 2) !== null);
  check("validar acepta lo que manda la calculadora y descarta campos de más", JSON.stringify(ok) === JSON.stringify({ alquilerInicial: 432100.56, inicio: "2025-10", cadaMeses: 4 }), ok);

  // 13. Prefill: aplicar sobre el archivo real y abrirlo como lo abriría el comprador.
  const datos = { alquilerInicial: 720000, inicio: sumarMeses(ULTIMO_PERIODO, -13), cadaMeses: 4 };
  const wbP = new ExcelJS.Workbook();
  await wbP.xlsx.readFile(ARCHIVO);
  prefill.aplicar!(wbP, datos);
  const tmp = mkdtempSync(path.join(os.tmpdir(), "alq-"));
  const rutaP = path.join(tmp, "prefill.xlsx");
  await wbP.xlsx.writeFile(rutaP);
  const libroP = await abrirLibro(rutaP);
  const cP: Contrato = { monto: datos.alquilerInicial, inicio: datos.inicio, cada: datos.cadaMeses, duracion: duracionPara(datos.inicio) };
  const malP = comparar(libroP, hojaContrato(1), cP, esperadoCalculadora(cP)!, true);
  check("el archivo con prefill trae el contrato de la calculadora y da lo mismo que ella", malP.length === 0, malP);
  check("el prefill cambia el texto de ejemplo del contrato 1", libroP.crudo(hojaContrato(1), "A2") === AVISO_CON_DATOS, libroP.crudo(hojaContrato(1), "A2"));
  check("el prefill borra los datos de ejemplo", vacio(libroP.crudo(hojaContrato(1), C.propiedad)) && vacio(libroP.crudo(hojaContrato(1), C.inquilino)));
  check("el prefill deja el contrato vigente hasta hoy", mesesEntre(datos.inicio, ULTIMO_PERIODO) < cP.duracion, cP.duracion);
  check("el archivo con prefill no tiene errores de fórmula", erroresDeFormula(libroP).length === 0, erroresDeFormula(libroP).slice(0, 3));
  rmSync(tmp, { recursive: true, force: true });

  console.log(`\n${fallas === 0 ? "✅" : "❌"} planilla de alquileres: ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
