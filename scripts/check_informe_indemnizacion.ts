// Verificación del Informe de liquidación final por despido (producto pago).
// Correr con: npx tsx scripts/check_informe_indemnizacion.ts
//
// Dos promesas que no se pueden romper:
//   1. El informe da EXACTAMENTE los mismos números que la calculadora web para el mismo caso,
//      recorriendo el camino real: estado de la calculadora → datos guardados → JSON en la metadata
//      del pago → `validar` → informe. Si difieren, la persona llega al SECLO con dos cifras.
//   2. `validar` corre sobre input hostil (lo manda el navegador y vuelve de MercadoPago): ante
//      cualquier cosa que no sea exactamente lo esperado devuelve null, y nunca deja pasar campos
//      de más ni texto.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { calcularIndemnizacion, tratamientoGanancias, type ResultadoIndemnizacion } from "../src/lib/indemnizacion";
import { diasDelMesTrabajados } from "../src/lib/liquidacion";
import { sumarDiasHabiles } from "../src/lib/certificado-trabajo";
import { parseMonto } from "../src/lib/formato";
import { DIVISOR_DIA } from "../src/data/indemnizacion";
import { datosDeLaCalculadora, prefill, topeInformado } from "../src/lib/prefill/indemnizacion";
import { CASO_EJEMPLO, armarInforme, comparar } from "../src/app/informes/indemnizacion/_modelo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const cerca = (a: number, b: number, tol = 0.01) => Math.abs(a - b) < tol;

// ===========================================================================
// 0 · La calculadora sigue llamando al motor como el informe cree que lo hace
// ===========================================================================
{
  const fuente = readFileSync(join(__dirname, "..", "src", "components", "CalculadoraIndemnizacion.tsx"), "utf8");
  for (const linea of [
    "const sueldo = useMemo(() => parseMonto(sueldoInput), [sueldoInput]);",
    "const tope = useMemo(() => parseMonto(topeInput), [topeInput]);",
    "mejorRemuneracion: sueldo,",
    "preavisoOtorgado,",
    "topeCCT: conoceTope && tope > 0 ? tope : undefined,",
    "datosDeLaCalculadora({ sueldo, ingresoISO, despidoISO, preavisoOtorgado, conoceTope, topeInput })",
    "recordarDatosCompra(SLUG_INFORME, datosCompra)",
    "<OfertaInformeIndemnizacion r={resultado} precio={precioInforme} />",
  ]) {
    check(`la calculadora web contiene «${linea}»`, fuente.includes(linea));
  }
}

// ===========================================================================
// 1 · Mismo caso, mismos números (calculadora web vs. informe)
// ===========================================================================
type Estado = {
  sueldoInput: string;
  ingresoISO: string;
  despidoISO: string;
  preavisoOtorgado: boolean;
  conoceTope: boolean;
  topeInput: string;
};

// Réplica literal de lo que hace CalculadoraIndemnizacion con su estado.
function web(e: Estado): ResultadoIndemnizacion | null {
  const sueldo = parseMonto(e.sueldoInput);
  const tope = parseMonto(e.topeInput);
  const fechasInvertidas = Boolean(e.ingresoISO && e.despidoISO && e.despidoISO <= e.ingresoISO);
  return sueldo > 0 && e.ingresoISO && e.despidoISO && !fechasInvertidas
    ? calcularIndemnizacion({
        ingresoISO: e.ingresoISO,
        despidoISO: e.despidoISO,
        mejorRemuneracion: sueldo,
        preavisoOtorgado: e.preavisoOtorgado,
        topeCCT: e.conoceTope && tope > 0 ? tope : undefined,
      })
    : null;
}

// El viaje real: localStorage → form → metadata del pago (texto JSON) → validar.
function viaje(e: Estado) {
  const d = datosDeLaCalculadora({
    sueldo: parseMonto(e.sueldoInput),
    ingresoISO: e.ingresoISO,
    despidoISO: e.despidoISO,
    preavisoOtorgado: e.preavisoOtorgado,
    conoceTope: e.conoceTope,
    topeInput: e.topeInput,
  });
  return prefill.validar(JSON.parse(JSON.stringify(d)));
}

const E = (p: Partial<Estado>): Estado => ({
  sueldoInput: "1.500.000",
  ingresoISO: "2020-02-10",
  despidoISO: "2026-09-14",
  preavisoOtorgado: false,
  conoceTope: false,
  topeInput: "",
  ...p,
});

const CASOS: [string, Estado][] = [
  ["6 años, sin preaviso, a mitad de mes", E({})],
  ["con preaviso otorgado", E({ preavisoOtorgado: true })],
  ["despido el último día del mes (sin integración)", E({ despidoISO: "2026-09-30" })],
  ["justo 5 años: 1 mes de preaviso", E({ ingresoISO: "2021-09-14", despidoISO: "2026-09-14" })],
  ["5 años y un día: 2 meses de preaviso", E({ ingresoISO: "2021-09-13", despidoISO: "2026-09-14" })],
  ["fracción de exactamente 3 meses: no suma", E({ ingresoISO: "2023-06-14", despidoISO: "2026-09-14" })],
  ["fracción de 3 meses y un día: suma", E({ ingresoISO: "2023-06-13", despidoISO: "2026-09-14" })],
  ["período de prueba (4 meses)", E({ ingresoISO: "2026-05-04", despidoISO: "2026-09-14" })],
  ["tope que se aplica", E({ conoceTope: true, topeInput: "1.000.000" })],
  ["tope bajísimo: manda el piso del 67%", E({ conoceTope: true, topeInput: "300.000" })],
  ["tope mayor al sueldo: no se aplica", E({ conoceTope: true, topeInput: "9.000.000" })],
  ["tildó el tope pero dejó el campo vacío", E({ conoceTope: true, topeInput: "" })],
  ["tope escrito sin tildar: no cuenta", E({ conoceTope: false, topeInput: "500000" })],
  ["sueldo con decimales", E({ sueldoInput: "1.234.567,89" })],
  ["despido en el primer semestre", E({ despidoISO: "2026-03-17" })],
  ["ingreso este año, después del período de prueba", E({ ingresoISO: "2026-01-12", despidoISO: "2026-08-20" })],
  ["ingreso un 31, despido en febrero", E({ ingresoISO: "2018-01-31", despidoISO: "2026-02-27" })],
  ["30 años de antigüedad", E({ ingresoISO: "1996-04-01", despidoISO: "2026-10-05", sueldoInput: "4.800.000" })],
  ["caso de ejemplo de la landing", E({ sueldoInput: String(CASO_EJEMPLO.sueldo), ingresoISO: CASO_EJEMPLO.ingreso, despidoISO: CASO_EJEMPLO.despido, preavisoOtorgado: CASO_EJEMPLO.preaviso })],
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

  check(`${nombre}: resultado idéntico al de la calculadora web`, JSON.stringify(inf.r) === JSON.stringify(w), { web: w, informe: inf.r });
  check(`${nombre}: Ganancias idéntico a la web`, JSON.stringify(inf.g) === JSON.stringify(tratamientoGanancias(w)));
  check(`${nombre}: el subtotal sin días del mes es el «Total estimado» de la web`, inf.totalCalculadora === w.totalGeneral);

  const suma = inf.rubros.reduce((a, r) => a + r.monto, 0);
  check(`${nombre}: los rubros suman el total`, cerca(suma, inf.total), { suma, total: inf.total });
  check(`${nombre}: indemnización + liquidación = total`, cerca(inf.totalIndemnizacion + inf.totalLiquidacion, inf.total));
  const sumaInd = inf.rubros.filter((r) => r.grupo === "indemnizacion").reduce((a, r) => a + r.monto, 0);
  check(`${nombre}: el subtotal de indemnización es el del motor`, cerca(sumaInd, w.totalIndemnizatorio));

  const dias = diasDelMesTrabajados(d.ingreso, d.despido);
  check(`${nombre}: días del mes con la regla de /renuncia`, inf.diasMes.dias === dias && cerca(inf.diasMes.monto, (d.sueldo / DIVISOR_DIA) * dias));
  check(`${nombre}: total = web + días del mes`, cerca(inf.total, w.totalGeneral + inf.diasMes.monto));

  check(`${nombre}: sin antigüedad en período de prueba, con antigüedad fuera`, inf.rubros.some((r) => r.clave === "antiguedad") === !w.enPeriodoPrueba);
  check(`${nombre}: preaviso en el informe sólo si la web lo calcula`, inf.rubros.some((r) => r.clave === "preaviso") === (w.preaviso !== null));
  check(`${nombre}: integración en el informe sólo si la web la calcula`, inf.rubros.some((r) => r.clave === "integracion") === (w.integracion !== null));
  check(`${nombre}: ningún rubro negativo ni NaN`, inf.rubros.every((r) => Number.isFinite(r.monto) && r.monto >= 0));

  const pago = inf.plazos.find((p) => p.clave === "pago");
  check(`${nombre}: el plazo de pago son 4 hábiles del calendario del sitio`, pago?.fecha === sumarDiasHabiles(d.despido, 4)?.vence, pago);
  check(`${nombre}: desempleo sólo fuera del período de prueba`, inf.plazos.some((p) => p.clave === "desempleo") === !w.enPeriodoPrueba);
}

{
  const e = E({});
  const d = viaje(e)!;
  const otro = armarInforme(d, { sueldoMes: 1_200_000 })!;
  check("sueldo del mes distinto: sólo cambian los días del mes", otro.totalCalculadora === web(e)!.totalGeneral && cerca(otro.diasMes.monto, (1_200_000 / DIVISOR_DIA) * otro.diasMes.dias));
  const fechaJul = armarInforme({ ...d, despido: "2026-07-03" })!;
  check("despido 3/7/2026 (9/7 feriado y 10/7 día no laborable): el pago vence el lunes 13/7", fechaJul.plazos.find((p) => p.clave === "pago")?.fecha === "2026-07-13", fechaJul.plazos[0]);
  const viejo = armarInforme({ ...d, ingreso: "2015-01-05", despido: "2025-11-20" })!;
  check("despido anterior a la Ley 27.802: el certificado no inventa una fecha", viejo.plazos.find((p) => p.clave === "certificado")?.fecha === null);
  check("despido posterior: el certificado tiene fecha", (armarInforme(d)!.plazos.find((p) => p.clave === "certificado")?.fecha ?? null) !== null);
}

{
  check("tope vacío: viaja como no informado (null)", topeInformado(true, "") === null && topeInformado(true, "0") === null);
  check("tope sin tildar: null", topeInformado(false, "1000") === null);
  check("tope tildado y escrito: viaja", topeInformado(true, "1.000.000") === 1_000_000);
  const inv = E({ ingresoISO: "2026-09-14", despidoISO: "2020-02-10" });
  check("fechas invertidas: ni la web ni el informe calculan", web(inv) === null && viaje(inv) === null);
}

// ===========================================================================
// 2 · Lo que ofrecen vs. la ley
// ===========================================================================
{
  const inf = armarInforme(viaje(E({}))!)!;
  check("sin nada cargado: no hay comparación", comparar(inf, {}, null) === null);
  const ant = inf.rubros.find((r) => r.clave === "antiguedad")!;
  const c1 = comparar(inf, { antiguedad: ant.monto - 100_000 }, null)!;
  check("un rubro cargado: compara sólo ese rubro", c1.porRubro && cerca(c1.diferencia, 100_000) && cerca(c1.leyComparable, ant.monto));
  const c2 = comparar(inf, {}, inf.total - 50_000)!;
  check("sólo el total: compara contra el total", !c2.porRubro && cerca(c2.diferencia, 50_000));
  const c3 = comparar(inf, { antiguedad: ant.monto }, 1)!;
  check("rubros cargados mandan sobre el total", c3.porRubro && cerca(c3.diferencia, 0));
  check("monto negativo o NaN no se compara", comparar(inf, { antiguedad: -5, preaviso: NaN }, null) === null);
}

// ===========================================================================
// 3 · validar contra input hostil
// ===========================================================================
const base = { sueldo: 1_000_000, ingreso: "2020-01-01", despido: "2026-09-14", preaviso: false, tope: null };
const v = (raw: unknown) => prefill.validar(raw);

check("válido: el caso base pasa", v(base) !== null);
check("válido: tope ausente = no informado", v({ sueldo: 10, ingreso: "2020-01-01", despido: "2026-01-01" })?.tope === null);
check("válido: preaviso ausente = false", v({ sueldo: 10, ingreso: "2020-01-01", despido: "2026-01-01" })?.preaviso === false);
check("válido: tope numérico pasa", v({ ...base, tope: 800_000 })?.tope === 800_000);

const hostiles: [string, unknown][] = [
  ["null", null],
  ["undefined", undefined],
  ["un string", "sueldo"],
  ["un número", 42],
  ["un array", [base]],
  ["sin sueldo", { ...base, sueldo: undefined }],
  ["sueldo 0", { ...base, sueldo: 0 }],
  ["sueldo negativo", { ...base, sueldo: -1 }],
  ["sueldo como string", { ...base, sueldo: "1000000" }],
  ["sueldo con HTML", { ...base, sueldo: "<b>1</b>" }],
  ["sueldo NaN", { ...base, sueldo: NaN }],
  ["sueldo Infinity", { ...base, sueldo: Infinity }],
  ["sueldo absurdo", { ...base, sueldo: 1e15 }],
  ["sin ingreso", { ...base, ingreso: undefined }],
  ["ingreso con otro formato", { ...base, ingreso: "01/01/2020" }],
  ["ingreso con hora", { ...base, ingreso: "2020-01-01T00:00:00Z" }],
  ["ingreso imposible (31/2)", { ...base, ingreso: "2020-02-31" }],
  ["mes 13", { ...base, ingreso: "2020-13-01" }],
  ["año 1800", { ...base, ingreso: "1800-01-01" }],
  ["año 9999", { ...base, despido: "9999-01-01" }],
  ["ingreso numérico", { ...base, ingreso: 20200101 }],
  ["ingreso con script", { ...base, ingreso: "2020-01-01<script>alert(1)</script>" }],
  ["despido igual al ingreso", { ...base, despido: base.ingreso }],
  ["despido anterior al ingreso", { ...base, despido: "2019-12-31" }],
  ["preaviso como string", { ...base, preaviso: "true" }],
  ["preaviso como número", { ...base, preaviso: 1 }],
  ["tope 0", { ...base, tope: 0 }],
  ["tope negativo", { ...base, tope: -5 }],
  ["tope como string", { ...base, tope: "500000" }],
  ["tope absurdo", { ...base, tope: 1e15 }],
  ["tope booleano", { ...base, tope: true }],
];
for (const [nombre, raw] of hostiles) check(`hostil: ${nombre} → null`, v(raw) === null, v(raw));

{
  const contaminado = JSON.parse('{"__proto__":{"sueldo":1000,"ingreso":"2020-01-01","despido":"2026-01-01"},"x":1}');
  check("hostil: campos sólo dentro de __proto__ → null", v(contaminado) === null);
  const heredado = Object.create({ sueldo: 1_000_000, ingreso: "2020-01-01", despido: "2026-01-01" });
  check("hostil: campos heredados del prototipo → null", v(heredado) === null);
}

{
  const sucio = {
    ...base,
    nombre: "<script>alert(1)</script>",
    empresa: "ACME SA",
    cuit: "30-12345678-9",
    email: "alguien@example.com",
    ofrecido: 12345,
    extra: "x".repeat(100_000),
  };
  const r = v(sucio);
  check("campos de más: el resultado sólo tiene sueldo, fechas, preaviso y tope", r !== null && Object.keys(r).sort().join() === "despido,ingreso,preaviso,sueldo,tope", r && Object.keys(r));
  check("campos de más: no se cuela ningún texto en el resultado", r !== null && !/script|@|ACME|30-/.test(JSON.stringify(r)));
  check("el JSON canónico entra holgado en la metadata (2048)", JSON.stringify(v({ ...base, sueldo: 9_999_999_999.99, tope: 9_999_999_999.99 })).length < 200);
}

if (fallas) {
  console.error(`\n${fallas} chequeo(s) fallaron`);
  process.exit(1);
}
console.log("\nTodo OK: el informe calcula lo mismo que la web y validar no deja pasar basura.");
