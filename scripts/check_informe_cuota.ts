// Verificación del Informe de cuota alimentaria (producto pago).
// Correr con: npx tsx scripts/check_informe_cuota.ts
//
// Dos promesas que no se pueden romper:
//   1. El informe da EXACTAMENTE los mismos números que la calculadora web para el mismo caso,
//      recorriendo el camino real: estado de la calculadora → datos guardados → JSON en la metadata
//      del pago → `validar` → informe. Si difieren, la persona llega a la mediación con dos cifras.
//   2. `validar` corre sobre input hostil (lo manda el navegador y vuelve de MercadoPago): ante
//      cualquier cosa que no sea exactamente lo esperado devuelve null, y nunca deja pasar campos
//      de más ni texto.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CANASTA_CRIANZA, CANASTA_CRIANZA_ULTIMO } from "../src/data/canasta-crianza";
import { calcularCuotaAlimentaria, type HijoInput, type ResultadoCuota } from "../src/lib/cuota-alimentaria";
import { MAX_HIJOS_INFORME, datosDeLaCalculadora, ingresoOtroInformado, prefill, type TramoHijo } from "../src/lib/prefill/cuota";
import { MESES_EVOLUCION, armarInforme, CASO_EJEMPLO } from "../src/app/informes/cuota-alimentaria/_modelo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// ===========================================================================
// 0 · La calculadora sigue llamando al motor como el informe cree que lo hace
// ===========================================================================
{
  const fuente = readFileSync(join(__dirname, "..", "src", "components", "CalculadoraCuotaAlimentaria.tsx"), "utf8");
  for (const linea of [
    "hijos: hijos.map((tramo) => ({ tramo }))",
    "ingresoAlimentante: ingreso,",
    "const otro = useMemo(() => ingresoOtroInformado(informaOtro, otroInput), [informaOtro, otroInput]);",
    "ingresoOtro: otro,",
    "cuidadoLoEjerceElOtro: !cuidadoCompartido,",
    "datosDeLaCalculadora({ hijos, ingreso, informaOtro, otroInput, cuidadoCompartido })",
  ]) {
    check(`la calculadora web contiene «${linea}»`, fuente.includes(linea));
  }
}

// ===========================================================================
// 1 · Mismo caso, mismos números (calculadora web vs. informe)
// ===========================================================================
type Estado = {
  hijos: TramoHijo[];
  ingreso: number;
  informaOtro: boolean;
  /** Lo que la persona escribió en el campo, tal cual. */
  otroInput: string;
  cuidadoCompartido: boolean;
};

// Réplica literal de lo que hace CalculadoraCuotaAlimentaria con su estado.
function web(e: Estado, mes = CANASTA_CRIANZA_ULTIMO): ResultadoCuota | null {
  return calcularCuotaAlimentaria({
    hijos: e.hijos.map((tramo) => ({ tramo }) as HijoInput),
    ingresoAlimentante: e.ingreso,
    ingresoOtro: ingresoOtroInformado(e.informaOtro, e.otroInput),
    cuidadoLoEjerceElOtro: !e.cuidadoCompartido,
    mes,
  });
}

// El viaje real: localStorage → form → metadata del pago (texto JSON) → validar.
function viaje(e: Estado) {
  const texto = JSON.stringify(datosDeLaCalculadora(e));
  return prefill.validar(JSON.parse(texto));
}

const CASOS: [string, Estado][] = [
  ["1 hijo 6-12, con ingreso del otro", { hijos: ["6-a-12"], ingreso: 1_500_000, informaOtro: true, otroInput: "900000", cuidadoCompartido: false }],
  ["1 hijo menor de 1, sin ingreso del otro", { hijos: ["menor-1"], ingreso: 800_000, informaOtro: false, otroInput: "0", cuidadoCompartido: false }],
  ["1 hijo 1-3, el otro gana 0", { hijos: ["1-a-3"], ingreso: 1_200_000, informaOtro: true, otroInput: "0", cuidadoCompartido: false }],
  ["2 hijos 6-12 y 1-3, cuidado compartido", { hijos: ["6-a-12", "1-a-3"], ingreso: 2_300_000, informaOtro: true, otroInput: "2100000", cuidadoCompartido: true }],
  ["2 hijos 4-5 y 4-5, iguales ingresos", { hijos: ["4-a-5", "4-a-5"], ingreso: 1_000_000, informaOtro: true, otroInput: "1000000", cuidadoCompartido: false }],
  ["3 hijos de tres tramos, sin ingreso del otro", { hijos: ["menor-1", "4-a-5", "6-a-12"], ingreso: 3_750_000.5, informaOtro: false, otroInput: "500000", cuidadoCompartido: false }],
  ["3 hijos con uno de 13+", { hijos: ["6-a-12", "mayor-12", "1-a-3"], ingreso: 1_850_000, informaOtro: true, otroInput: "640000", cuidadoCompartido: false }],
  ["3 hijos, el otro gana más", { hijos: ["1-a-3", "1-a-3", "menor-1"], ingreso: 700_000, informaOtro: true, otroInput: "2900000", cuidadoCompartido: true }],
  ["tildó que sabe el ingreso del otro pero dejó el campo vacío", { hijos: ["6-a-12"], ingreso: 1_500_000, informaOtro: true, otroInput: "", cuidadoCompartido: false }],
  ["campo del otro con espacios", { hijos: ["1-a-3"], ingreso: 900_000, informaOtro: true, otroInput: "   ", cuidadoCompartido: false }],
  ["caso de ejemplo de la landing", { hijos: [...CASO_EJEMPLO.hijos], ingreso: CASO_EJEMPLO.ingreso, informaOtro: true, otroInput: String(CASO_EJEMPLO.otro ?? 0), cuidadoCompartido: CASO_EJEMPLO.compartido }],
];

for (const [nombre, e] of CASOS) {
  const w = web(e);
  const d = viaje(e);
  check(`${nombre}: los datos sobreviven el viaje y validan`, d !== null, d);
  if (!d || !w) {
    check(`${nombre}: la web calcula`, w !== null);
    continue;
  }
  const inf = armarInforme(d);
  check(`${nombre}: el informe se arma`, inf !== null);
  if (!inf) continue;
  check(`${nombre}: resultado idéntico al de la calculadora web`, JSON.stringify(inf.r) === JSON.stringify(w), {
    web: w,
    informe: inf.r,
  });
  const sumaHijos = inf.r.detalle.reduce((a, h) => a + h.total, 0);
  check(`${nombre}: la tabla por hijo suma el total`, Math.abs(sumaHijos - inf.r.costoTotal) < 0.05, sumaHijos);
  if (inf.r.cuotaEstimada !== null && inf.aporteDelOtro !== null) {
    check(
      `${nombre}: cuota + parte del otro = costo total`,
      Math.abs(inf.r.cuotaEstimada + inf.aporteDelOtro - inf.r.costoTotal) < 0.02,
    );
  }
  const ultima = inf.evolucion[inf.evolucion.length - 1];
  check(`${nombre}: la evolución termina en el mes del informe`, ultima?.periodo === CANASTA_CRIANZA_ULTIMO.periodo);
  check(
    `${nombre}: la última fila de la evolución repite la cifra del informe`,
    ultima?.costoTotal === w.costoTotal && ultima?.referencia === (w.cuotaEstimada ?? w.refMitad),
  );
  check(`${nombre}: la evolución tiene ${MESES_EVOLUCION} meses`, inf.evolucion.length === MESES_EVOLUCION, inf.evolucion.length);
  // Cada fila de la evolución también es "lo que la calculadora daría con ese mes".
  const filasOk = inf.evolucion.every((f) => {
    const mes = CANASTA_CRIANZA.find((m) => m.periodo === f.periodo)!;
    const wm = web(e, mes)!;
    return f.costoTotal === wm.costoTotal && f.referencia === (wm.cuotaEstimada ?? wm.refMitad);
  });
  check(`${nombre}: cada mes de la evolución coincide con la calculadora en ese mes`, filasOk);
}

{
  const e: Estado = { hijos: ["mayor-12", "mayor-12"], ingreso: 1_000_000, informaOtro: true, otroInput: "1", cuidadoCompartido: false };
  const d = viaje(e);
  check("todos de 13+: los datos validan (el tramo existe)", d !== null);
  check("todos de 13+: ni la web ni el informe inventan un número", web(e) === null && d !== null && armarInforme(d) === null);
}

{
  const vacio: Estado = { hijos: ["6-a-12"], ingreso: 1_500_000, informaOtro: true, otroInput: "", cuidadoCompartido: false };
  check("campo del otro vacío: viaja como no informado (null), nunca como $0", viaje(vacio)?.otro === null, viaje(vacio));
  check("campo del otro vacío: la web tampoco reparte (paridad)", web(vacio)?.cuotaEstimada === null);
  const cero: Estado = { ...vacio, otroInput: "0" };
  check("un 0 escrito sí cuenta como «no tiene ingresos»", viaje(cero)?.otro === 0 && web(cero)?.cuotaEstimada !== null);
}

// ===========================================================================
// 2 · validar contra input hostil
// ===========================================================================
const base = { hijos: ["6-a-12"], ingreso: 1_000_000, otro: 500_000, compartido: false };
const v = (raw: unknown) => prefill.validar(raw);

check("válido: el caso base pasa", v(base) !== null);
check("válido: otro ausente = no informado", v({ hijos: ["1-a-3"], ingreso: 10 })?.otro === null);
check("válido: compartido ausente = false", v({ hijos: ["1-a-3"], ingreso: 10 })?.compartido === false);
check(`válido: ${MAX_HIJOS_INFORME} hijos es el tope y pasa`, v({ ...base, hijos: Array(MAX_HIJOS_INFORME).fill("4-a-5") }) !== null);

const hostiles: [string, unknown][] = [
  ["null", null],
  ["undefined", undefined],
  ["un string", "hijos"],
  ["un número", 42],
  ["un array", [base]],
  ["sin hijos", { ...base, hijos: undefined }],
  ["hijos vacío", { ...base, hijos: [] }],
  [`${MAX_HIJOS_INFORME + 1} hijos`, { ...base, hijos: Array(MAX_HIJOS_INFORME + 1).fill("6-a-12") }],
  ["10.000 hijos", { ...base, hijos: Array(10_000).fill("6-a-12") }],
  ["hijos como string", { ...base, hijos: "6-a-12" }],
  ["hijos como objeto", { ...base, hijos: { 0: "6-a-12", length: 1 } }],
  ["tramo inexistente", { ...base, hijos: ["13-a-18"] }],
  ["tramo con mayúsculas", { ...base, hijos: ["6-A-12"] }],
  ["tramo numérico", { ...base, hijos: [6] }],
  ["tramo null", { ...base, hijos: [null] }],
  ["tramo con HTML", { ...base, hijos: ["<img src=x onerror=alert(1)>"] }],
  ["tramo con script", { ...base, hijos: ["6-a-12<script>alert(1)</script>"] }],
  ["tramo larguísimo", { ...base, hijos: ["6-a-12".repeat(5000)] }],
  ["ingreso 0", { ...base, ingreso: 0 }],
  ["ingreso negativo", { ...base, ingreso: -1 }],
  ["ingreso como string", { ...base, ingreso: "1000000" }],
  ["ingreso con HTML", { ...base, ingreso: "<b>1</b>" }],
  ["ingreso NaN", { ...base, ingreso: NaN }],
  ["ingreso Infinity", { ...base, ingreso: Infinity }],
  ["ingreso absurdo", { ...base, ingreso: 1e15 }],
  ["ingreso null", { ...base, ingreso: null }],
  ["otro negativo", { ...base, otro: -5 }],
  ["otro como string", { ...base, otro: "500000" }],
  ["otro absurdo", { ...base, otro: 1e15 }],
  ["otro booleano", { ...base, otro: true }],
  ["compartido como string", { ...base, compartido: "true" }],
  ["compartido como número", { ...base, compartido: 1 }],
];
for (const [nombre, raw] of hostiles) check(`hostil: ${nombre} → null`, v(raw) === null, v(raw));

{
  // Lo que llega de JSON.parse: claves raras como propiedades propias.
  const contaminado = JSON.parse('{"__proto__":{"hijos":["6-a-12"],"ingreso":1000},"x":1}');
  check("hostil: hijos e ingreso sólo dentro de __proto__ → null", v(contaminado) === null);
  const heredado = Object.create({ hijos: ["6-a-12"], ingreso: 1_000_000 });
  check("hostil: hijos e ingreso heredados del prototipo → null", v(heredado) === null);
}

{
  const sucio = {
    ...base,
    nombre: "<script>alert(1)</script>",
    email: "alguien@example.com",
    dni: "12345678",
    extra: "x".repeat(100_000),
  };
  const r = v(sucio);
  check("campos de más: el resultado sólo tiene hijos, ingreso, otro y compartido", r !== null && Object.keys(r).sort().join() === "compartido,hijos,ingreso,otro", r && Object.keys(r));
  check("campos de más: no se cuela ningún texto en el resultado", r !== null && !JSON.stringify(r).includes("script") && !JSON.stringify(r).includes("@"));
  check("el JSON canónico entra holgado en la metadata (2048)", JSON.stringify(v({ ...base, hijos: Array(MAX_HIJOS_INFORME).fill("mayor-12"), ingreso: 9_999_999_999.99, otro: 9_999_999_999.99 })).length < 400);
}

if (fallas) {
  console.error(`\n${fallas} chequeo(s) fallaron`);
  process.exit(1);
}
console.log("\nTodo OK: el informe calcula lo mismo que la web y validar no deja pasar basura.");
