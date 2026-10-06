// Verificación del Informe de actualización de crédito laboral (producto pago).
// Correr con: npx tsx scripts/check_informe_credito_laboral.ts
//
// Dos promesas que no se pueden romper:
//   1. Cada rubro del informe da EXACTAMENTE lo mismo que la calculadora web para ese crédito,
//      recorriendo el camino real (estado de la calculadora → datos guardados → JSON de la metadata
//      del pago → `validar` → informe), y los totales son la suma de los rubros.
//   2. `validar` corre sobre input hostil: ante cualquier cosa que no sea exactamente lo esperado
//      devuelve null, y nunca deja pasar campos de más ni texto.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TASA_PURA_ANUAL } from "../src/data/actualizacion-creditos";
import { actualizarCreditoLaboral } from "../src/lib/actualizacion-creditos";
import { PRIMER_PERIODO, ULTIMO_PERIODO, indiceDe, sumarMeses, variacionMensual } from "../src/lib/inflacion";
import { MAX_RUBROS, MESES_PAGO_FUTURO, datosDeLaCalculadora, prefill, type Datos } from "../src/lib/prefill/credito-laboral";
import { PISO_ART_55, PRECIO_INFORME_REFERENCIA, armarInforme, casoEjemplo } from "../src/app/informes/credito-laboral/_modelo";
import { PRODUCTOS } from "../src/lib/mp";
import { parseDecimal, parseMonto } from "../src/lib/formato";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const cerca = (a: number, b: number, tol = 0.005) => Math.abs(a - b) <= tol;

// ===========================================================================
// 0 · La calculadora sigue llamando al motor como el informe cree que lo hace
// ===========================================================================
{
  const fuente = readFileSync(join(__dirname, "..", "src", "components", "CalculadoraActualizacionCreditos.tsx"), "utf8");
  for (const linea of [
    "monto: parseMonto(monto),",
    "cuotaLitisPct: parseDecimal(cuotaLitisPct),",
    "datosDeLaCalculadora({ monto, desde, hasta, cuotaLitisPct })",
    "recordarDatosCompra(SLUG_INFORME, datosCompra)",
    "<CreditoInformeCTA",
  ]) {
    check(`la calculadora web contiene «${linea}»`, fuente.includes(linea));
  }
  check("el precio de referencia es el del catálogo", PRODUCTOS["informe-credito-laboral"].precio === PRECIO_INFORME_REFERENCIA);
}

// ===========================================================================
// 1 · Mismo crédito, mismos números (calculadora web vs. informe)
// ===========================================================================
type Estado = { monto: string; desde: string; hasta: string; cuotaLitisPct: string };

// Réplica literal de lo que hace CalculadoraActualizacionCreditos con su estado.
function web(e: Estado) {
  return actualizarCreditoLaboral({
    monto: parseMonto(e.monto),
    desde: e.desde,
    hasta: e.hasta,
    cuotaLitisPct: parseDecimal(e.cuotaLitisPct),
  });
}

function viaje(e: Estado) {
  return prefill.validar(JSON.parse(JSON.stringify(datosDeLaCalculadora(e))));
}

const U = ULTIMO_PERIODO;
const CASOS: [string, Estado][] = [
  ["valor por defecto de la calculadora", { monto: "3000000", desde: sumarMeses(U, -24), hasta: U, cuotaLitisPct: "0" }],
  ["despido de hace 6 meses", { monto: "8500000", desde: sumarMeses(U, -6), hasta: U, cuotaLitisPct: "0" }],
  ["con cuota litis del 20%", { monto: "1250000.5", desde: sumarMeses(U, -40), hasta: U, cuotaLitisPct: "20" }],
  ["cuota litis escrita por encima del tope", { monto: "900000", desde: sumarMeses(U, -12), hasta: U, cuotaLitisPct: "35" }],
  ["cuota litis negativa", { monto: "900000", desde: sumarMeses(U, -12), hasta: U, cuotaLitisPct: "-5" }],
  ["pago posterior al último IPC", { monto: "2000000", desde: sumarMeses(U, -18), hasta: sumarMeses(U, 4), cuotaLitisPct: "10" }],
  ["primer mes de la serie", { monto: "100000", desde: PRIMER_PERIODO, hasta: U, cuotaLitisPct: "0" }],
  ["pago el mismo mes", { monto: "500000", desde: U, hasta: U, cuotaLitisPct: "0" }],
  ["crédito chico", { monto: "1", desde: sumarMeses(U, -3), hasta: U, cuotaLitisPct: "0" }],
];

for (const [nombre, e] of CASOS) {
  const w = web(e);
  const d = viaje(e);
  check(`${nombre}: la web calcula`, w !== null);
  check(`${nombre}: los datos sobreviven el viaje y validan`, d !== null, d);
  if (!d || !w) continue;
  const inf = armarInforme(d);
  check(`${nombre}: el informe se arma`, inf !== null);
  if (!inf) continue;
  check(`${nombre}: el rubro es idéntico al resultado de la web`, JSON.stringify(inf.filas[0].r) === JSON.stringify(w), {
    web: w.total,
    informe: inf.filas[0].r.total,
  });
  check(`${nombre}: total, neto y cuota litis coinciden`, inf.total === w.total && inf.neto === w.neto && inf.cuotaLitis === w.cuotaLitis);
  check(`${nombre}: piso del art. 55 = 67% del total`, cerca(inf.piso55, w.total * 0.67));
  const usada = inf.coeficientes.find((f) => f.periodo === e.desde);
  check(`${nombre}: la tabla de índices trae el mismo coeficiente que el rubro`, usada !== undefined && cerca(usada.coeficiente, w.coeficiente, 1e-12) && usada.usado);
  check(`${nombre}: la tabla termina en el último índice usado`, inf.coeficientes[inf.coeficientes.length - 1]?.periodo === w.hastaIpc);
}

// Varios rubros: cada uno es la calculadora con su fecha, y los totales son la suma.
{
  const ej = casoEjemplo();
  const inf = armarInforme(ej);
  check("caso de ejemplo: se arma", inf !== null);
  check("caso de ejemplo: valida", prefill.validar(JSON.parse(JSON.stringify(ej))) !== null);
  if (inf) {
    let total = 0;
    let capAct = 0;
    let interes = 0;
    let ok = true;
    for (const [i, rubro] of ej.rubros.entries()) {
      const w = actualizarCreditoLaboral({ monto: rubro.monto, desde: rubro.desde, hasta: ej.hasta, cuotaLitisPct: ej.litis })!;
      ok &&= JSON.stringify(inf.filas[i].r) === JSON.stringify(w);
      total += w.total;
      capAct += w.capitalActualizado;
      interes += w.interesPuro;
    }
    check("varios rubros: cada fila es la calculadora con su propia fecha", ok);
    check("varios rubros: total = suma de rubros", cerca(inf.total, total));
    check("varios rubros: capital actualizado + interés = total", cerca(inf.capitalActualizado + inf.interes, inf.total));
    check("varios rubros: capital histórico = suma de montos", cerca(inf.capital, ej.rubros.reduce((a, r) => a + r.monto, 0)));
    check("varios rubros: interés = suma de intereses", cerca(inf.interes, interes) && cerca(inf.capitalActualizado, capAct));
    const meses = inf.coeficientes.length;
    const esperado = ej.rubros.reduce((min, r) => (r.desde < min ? r.desde : min), ej.rubros[0].desde);
    check("varios rubros: la tabla de índices arranca en el primer mes exigible", inf.coeficientes[0]?.periodo === esperado, inf.coeficientes[0]);
    check("varios rubros: la tabla no saltea meses", meses === new Set(inf.coeficientes.map((f) => f.periodo)).size && meses >= 24);
    check(
      "varios rubros: cada coeficiente de la tabla es índice final ÷ índice del mes",
      inf.coeficientes.every((f) => cerca(f.coeficiente, indiceDe(inf.hastaIpc)! / indiceDe(f.periodo)!, 1e-12)),
    );
    const mensual = variacionMensual(ULTIMO_PERIODO);
    check(
      "costo de un mes de demora = IPC del último mes + 3%/12 (la misma cuenta que la página)",
      mensual === null ? inf.costoMensualPct === null : cerca(inf.costoMensualPct!, mensual + (TASA_PURA_ANUAL / 12) * 100, 1e-9),
    );
  }
  check("el piso del art. 55 es 67%", PISO_ART_55 === 0.67);
}

{
  const d: Datos = { rubros: [{ concepto: "antiguedad", monto: 1000, desde: sumarMeses(U, 1) }], hasta: sumarMeses(U, 2), litis: 0 };
  check("un rubro exigible después del último IPC no tiene índice: ni validar ni el informe inventan", prefill.validar(d) === null && armarInforme(d) === null);
}

// ===========================================================================
// 2 · validar contra input hostil
// ===========================================================================
const base = { rubros: [{ concepto: "antiguedad", monto: 1_000_000, desde: sumarMeses(U, -12) }], hasta: U, litis: 0 };
const v = (raw: unknown) => prefill.validar(raw);

check("válido: el caso base pasa", v(base) !== null);
check("válido: litis ausente = 0", v({ rubros: base.rubros, hasta: U })?.litis === 0);
check(`válido: ${MAX_RUBROS} rubros es el tope y pasa`, v({ ...base, rubros: Array(MAX_RUBROS).fill(base.rubros[0]) }) !== null);
check(`válido: pago ${MESES_PAGO_FUTURO} meses después del último IPC`, v({ ...base, hasta: sumarMeses(U, MESES_PAGO_FUTURO) }) !== null);

const rubro = base.rubros[0];
const hostiles: [string, unknown][] = [
  ["null", null],
  ["undefined", undefined],
  ["un string", "rubros"],
  ["un número", 42],
  ["un array", [base]],
  ["sin rubros", { ...base, rubros: undefined }],
  ["rubros vacío", { ...base, rubros: [] }],
  [`${MAX_RUBROS + 1} rubros`, { ...base, rubros: Array(MAX_RUBROS + 1).fill(rubro) }],
  ["10.000 rubros", { ...base, rubros: Array(10_000).fill(rubro) }],
  ["rubros como objeto", { ...base, rubros: { 0: rubro, length: 1 } }],
  ["rubro null", { ...base, rubros: [null] }],
  ["rubro string", { ...base, rubros: ["antiguedad"] }],
  ["concepto inexistente", { ...base, rubros: [{ ...rubro, concepto: "bono" }] }],
  ["concepto con HTML", { ...base, rubros: [{ ...rubro, concepto: "<img src=x onerror=alert(1)>" }] }],
  ["concepto ausente", { ...base, rubros: [{ monto: 1, desde: rubro.desde }] }],
  ["monto 0", { ...base, rubros: [{ ...rubro, monto: 0 }] }],
  ["monto negativo", { ...base, rubros: [{ ...rubro, monto: -1 }] }],
  ["monto string", { ...base, rubros: [{ ...rubro, monto: "1000" }] }],
  ["monto NaN", { ...base, rubros: [{ ...rubro, monto: NaN }] }],
  ["monto Infinity", { ...base, rubros: [{ ...rubro, monto: Infinity }] }],
  ["monto absurdo", { ...base, rubros: [{ ...rubro, monto: 1e15 }] }],
  ["desde anterior a la serie", { ...base, rubros: [{ ...rubro, desde: "2016-11" }] }],
  ["desde mal formado", { ...base, rubros: [{ ...rubro, desde: "2025-13" }] }],
  ["desde con día", { ...base, rubros: [{ ...rubro, desde: "2025-01-15" }] }],
  ["desde número", { ...base, rubros: [{ ...rubro, desde: 202501 }] }],
  ["desde con script", { ...base, rubros: [{ ...rubro, desde: "2025-01<script>" }] }],
  ["desde posterior al pago", { ...base, rubros: [{ ...rubro, desde: U }], hasta: sumarMeses(U, -1) }],
  ["hasta ausente", { rubros: base.rubros }],
  ["hasta mal formado", { ...base, hasta: "ayer" }],
  ["hasta antes de la serie", { ...base, hasta: "2010-01" }],
  ["hasta demasiado lejos", { ...base, hasta: sumarMeses(U, MESES_PAGO_FUTURO + 1) }],
  ["litis negativa", { ...base, litis: -1 }],
  ["litis por encima del 20", { ...base, litis: 21 }],
  ["litis string", { ...base, litis: "10" }],
  ["litis booleana", { ...base, litis: true }],
];
for (const [nombre, raw] of hostiles) check(`hostil: ${nombre} → null`, v(raw) === null, v(raw));

{
  const contaminado = JSON.parse(`{"__proto__":{"rubros":[{"concepto":"antiguedad","monto":1,"desde":"${rubro.desde}"}],"hasta":"${U}"},"x":1}`);
  check("hostil: rubros y hasta sólo dentro de __proto__ → null", v(contaminado) === null);
  const heredado = Object.create({ rubros: base.rubros, hasta: U });
  check("hostil: rubros y hasta heredados del prototipo → null", v(heredado) === null);
  const rubroHeredado = Object.create({ concepto: "antiguedad", monto: 1, desde: rubro.desde });
  check("hostil: campos del rubro heredados del prototipo → null", v({ ...base, rubros: [rubroHeredado] }) === null);
}

{
  const sucio = {
    ...base,
    rubros: [{ ...rubro, etiqueta: "<script>alert(1)</script>", actor: "Juan Pérez" }],
    autos: "Pérez c/ Empresa S.A.",
    expediente: "12345/2025",
    email: "alguien@example.com",
    extra: "x".repeat(100_000),
  };
  const r = v(sucio);
  check("campos de más: sólo quedan rubros, hasta y litis", r !== null && Object.keys(r).sort().join() === "hasta,litis,rubros", r && Object.keys(r));
  check("campos de más: cada rubro sólo tiene concepto, monto y desde", r !== null && Object.keys(r.rubros[0]).sort().join() === "concepto,desde,monto");
  check("campos de más: no se cuela ningún texto personal", r !== null && !/script|Pérez|@|12345/.test(JSON.stringify(r)));
  const lleno = v({ rubros: Array(MAX_RUBROS).fill({ concepto: "horas-extras", monto: 99_999_999_999.99, desde: rubro.desde }), hasta: U, litis: 19.5 });
  check("el JSON canónico más largo entra holgado en la metadata (2048)", lleno !== null && JSON.stringify(lleno).length < 1400, lleno && JSON.stringify(lleno).length);
}

// Bug viejo: la calculadora leía el monto con Number(), y «3.000.000» (como lo escribe cualquiera acá) daba $0.
check(
  "un monto escrito con puntos de miles se lee entero",
  datosDeLaCalculadora({ monto: "3.000.000", desde: PRIMER_PERIODO, hasta: ULTIMO_PERIODO, cuotaLitisPct: "" }).rubros[0].monto === 3_000_000,
);

// La cuota litis es un porcentaje: «12.5» y «12,5» son 12,5 % en la calculadora, en validar y al reabrir el informe.
for (const escrito of ["12.5", "12,5"]) {
  const d = prefill.validar(datosDeLaCalculadora({ monto: "1000000", desde: sumarMeses(ULTIMO_PERIODO, -12), hasta: ULTIMO_PERIODO, cuotaLitisPct: escrito }));
  const reabierto = d ? parseDecimal(d.litis.toLocaleString("es-AR", { maximumFractionDigits: 2 })) : NaN;
  check(`cuota litis «${escrito}» viaja y vuelve como 12,5 %`, d?.litis === 12.5 && reabierto === 12.5, { litis: d?.litis, reabierto });
}

if (fallas) {
  console.error(`\n${fallas} chequeo(s) fallaron`);
  process.exit(1);
}
console.log("\nTodo OK: el informe calcula lo mismo que la web, rubro por rubro, y validar no deja pasar basura.");
