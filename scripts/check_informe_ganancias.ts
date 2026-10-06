// Verificación del Informe de Ganancias 2026 (producto pago).
// Correr con: npx tsx scripts/check_informe_ganancias.ts
//
// Tres promesas:
//   1. El informe da EXACTAMENTE la misma retención que la calculadora de /ganancias para el mismo
//      caso, recorriendo el camino real: campos → datos → JSON en la metadata → `validar` → informe.
//   2. Lo deducible de cada gasto es lo que dan los motores de las calculadoras de deducciones, y
//      «cuánto te devuelve» es impuesto sin − impuesto con, del mismo motor de /ganancias.
//   3. `validar` corre sobre input hostil: ante cualquier cosa rara devuelve null y nunca deja pasar
//      campos de más ni texto.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { calcularRetencionMensual } from "../src/lib/ganancias";
import { calcularDeduccionAlquiler } from "../src/lib/deduccion-alquiler";
import { calcularDeduccionDomestica } from "../src/lib/deduccion-domestica";
import { calcularDeduccionesGenerales } from "../src/lib/deducciones-generales";
import { DEDUCCIONES, ESCALA_GANANCIAS } from "../src/data/ganancias";
import { TOPE_DEDUCCION_ALQUILER } from "../src/data/deduccion-alquiler";
import { TOPE_DEDUCCION_ANUAL } from "../src/data/deduccion-domestica";
import { TOPE_INTERESES_HIPOTECARIOS, TOPE_SEGUROS_VIGENTE } from "../src/data/deducciones-generales";
import { formatARS, parseDecimal, parseMonto } from "../src/lib/formato";
import { MAX_HIJOS, datosDeLaCalculadora, entradaDelMotor, prefill, type CamposCalculadora } from "../src/lib/prefill/ganancias";
import {
  CASO_EJEMPLO,
  GASTOS_EJEMPLO,
  GASTOS_VACIOS,
  ORDEN_DEDUCCIONES,
  TOPE_EDUCACION,
  armarInforme,
  type Gastos,
} from "../src/app/informes/ganancias/_modelo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const cerca = (a: number, b: number, tol = 0.01) => Math.abs(a - b) <= tol;

// ===========================================================================
// 0 · La calculadora sigue llamando al motor como el informe cree que lo hace
// ===========================================================================
{
  const fuente = readFileSync(join(__dirname, "..", "src", "components", "CalculadoraGanancias.tsx"), "utf8");
  for (const linea of [
    "datosDeLaCalculadora({ brutoInput, conyuge, hijosInput, sindicalInput, otrasInput })",
    "return calcularRetencionMensual(entradaDelMotor(datos));",
    "const totalAnual = filas ? filas[11].retencionAcumulada : 0;",
    "prefill.validar(datos)",
    "recordarDatosCompra(SLUG_INFORME, datosCompra)",
  ]) {
    check(`la calculadora web contiene «${linea}»`, fuente.includes(linea));
  }
  const pagina = readFileSync(join(__dirname, "..", "src", "app", "ganancias", "page.tsx"), "utf8");
  check("la página de /ganancias le pasa el precio del catálogo a la calculadora", pagina.includes('productoPorSlug("informe-ganancias")?.precio'));
}

// ===========================================================================
// 1 · Mismo caso, misma retención (calculadora web vs. informe)
// ===========================================================================
// Réplica literal de cómo la calculadora traducía sus campos ANTES de compartir la función: si
// alguien cambia `datosDeLaCalculadora`, esto lo detecta.
function webOriginal(c: CamposCalculadora) {
  const bruto = parseMonto(c.brutoInput);
  if (bruto <= 0) return null;
  return calcularRetencionMensual({
    brutoMensual: bruto,
    conyuge: c.conyuge,
    hijos: Math.max(0, Math.floor(parseMonto(c.hijosInput))),
    sindicalPct: Math.min(Math.max(0, parseDecimal(c.sindicalInput)), 100) / 100,
    otrasDeduccionesAnual: Math.max(0, parseMonto(c.otrasInput)) * 12,
  });
}

function viaje(c: CamposCalculadora) {
  return prefill.validar(JSON.parse(JSON.stringify(datosDeLaCalculadora(c))));
}

const CASOS: [string, CamposCalculadora][] = [
  ["soltero 4.500.000", { brutoInput: "4.500.000", conyuge: false, hijosInput: "", sindicalInput: "", otrasInput: "" }],
  ["casado con 2 hijos 6.000.000", { brutoInput: "6000000", conyuge: true, hijosInput: "2", sindicalInput: "", otrasInput: "" }],
  ["con sindical 2,5% y otras deducciones", { brutoInput: "5.250.000,50", conyuge: false, hijosInput: "1", sindicalInput: "2,5", otrasInput: "150.000" }],
  ["sueldo arriba del tope SIPA", { brutoInput: "12.000.000", conyuge: false, hijosInput: "0", sindicalInput: "", otrasInput: "" }],
  ["sueldo altísimo, tramo 35%", { brutoInput: "40.000.000", conyuge: true, hijosInput: "3", sindicalInput: "1", otrasInput: "500000" }],
  ["hijos con texto raro", { brutoInput: "7.000.000", conyuge: false, hijosInput: "2,7", sindicalInput: "0", otrasInput: "" }],
  ["sindical arriba de 100", { brutoInput: "5.000.000", conyuge: false, hijosInput: "", sindicalInput: "150", otrasInput: "" }],
];

for (const [nombre, c] of CASOS) {
  const w = webOriginal(c)!;
  const d = viaje(c);
  check(`${nombre}: los datos sobreviven el viaje y validan`, d !== null, d);
  if (!d) continue;
  const enCalculadora = calcularRetencionMensual(entradaDelMotor(datosDeLaCalculadora(c)));
  check(`${nombre}: la calculadora actual da lo mismo que la original`, JSON.stringify(enCalculadora) === JSON.stringify(w));
  const inf = armarInforme(d);
  check(`${nombre}: el informe se arma`, inf !== null);
  if (!inf) continue;
  check(`${nombre}: las 12 filas son idénticas a las de la calculadora`, JSON.stringify(inf.filas) === JSON.stringify(w));
  check(`${nombre}: el total del año es el de la calculadora`, inf.total === w[11].retencionAcumulada);
  check(`${nombre}: mes común, junio y diciembre salen de la tabla`, inf.mesComun === w[0].retencionMes && inf.junio === w[5].retencionMes && inf.diciembre === w[11].retencionMes);
  const sumaMeses = w.reduce((s, f) => s + f.retencionMes, 0);
  check(`${nombre}: la suma de los meses da el total`, cerca(sumaMeses, inf.total, 0.05), [sumaMeses, inf.total]);
  const sinSac = calcularRetencionMensual({ ...entradaDelMotor(d), incluirSAC: false })[11].retencionAcumulada;
  check(`${nombre}: el costo del aguinaldo es total con SAC − sin SAC`, cerca(inf.costoAguinaldo, Math.max(0, inf.total - sinSac)));
  const tramo = [...ESCALA_GANANCIAS].reverse().find((t) => w[11].gniExtrapolada > t.desde);
  check(`${nombre}: el tramo marginal es el de la escala para la GNI anual`, inf.alicuotaMarginal === (tramo?.alicuota ?? 0), [inf.alicuotaMarginal, tramo]);
  const con100k = calcularRetencionMensual(entradaDelMotor(d, 1_200_000))[11].retencionAcumulada;
  check(`${nombre}: «cada $100.000 por mes» es el motor corrido dos veces`, cerca(inf.porCada100k, Math.max(0, inf.total - con100k)));
}

{
  const d = prefill.validar({ bruto: 2_000_000 });
  const inf = d ? armarInforme(d) : null;
  check("sueldo que no paga: el informe lo sabe (paga = false, total 0)", inf !== null && !inf.paga && inf.total === 0);
}

// ===========================================================================
// 2 · Deducciones: mismos motores, y el ahorro es sin − con
// ===========================================================================
const GASTOS_LLENOS: Gastos = {
  alquilerMensual: 900_000,
  titularInmueble: false,
  domesticaMensual: 650_000,
  domesticaHoras: 20,
  prepagaMensual: 320_000,
  honorariosAnual: 1_800_000,
  educacionMensual: 250_000,
  seguroVidaMensual: 40_000,
  seguroRetiroMensual: 90_000,
  donacionesAnual: 300_000,
  hipotecario: true,
};

for (const [nombre, d, g] of [
  ["ejemplo de la landing", CASO_EJEMPLO, GASTOS_EJEMPLO],
  ["todo cargado, 6.000.000 casado", { bruto: 6_000_000, conyuge: true, hijos: 2, sindical: 0.02, otras: 50_000 }, GASTOS_LLENOS],
  ["todo cargado, 15.000.000", { bruto: 15_000_000, conyuge: false, hijos: 0, sindical: 0, otras: 0 }, GASTOS_LLENOS],
  ["titular de inmueble", { bruto: 6_000_000, conyuge: false, hijos: 0, sindical: 0, otras: 0 }, { ...GASTOS_LLENOS, titularInmueble: true }],
] as const) {
  const inf = armarInforme(d, g)!;
  const familia = { conyuge: d.conyuge, hijos: d.hijos };
  const alq = calcularDeduccionAlquiler({ alquilerMensual: g.alquilerMensual, mesesPagados: 12, brutoMensual: d.bruto, ...familia, titularDeInmueble: g.titularInmueble, computarDiezPorCiento: false });
  const dom = g.domesticaMensual > 0
    ? calcularDeduccionDomestica({ sueldoMensual: g.domesticaMensual, mesesTrabajados: 12, incluirAguinaldo: true, horasSemanales: g.domesticaHoras, condicion: "activo-mayor-18", brutoMensualEmpleador: d.bruto, ...familia }).deduccionAplicada
    : 0;
  const gen = calcularDeduccionesGenerales({
    brutoMensual: d.bruto, ...familia,
    prepagaAnual: g.prepagaMensual * 12, honorariosFacturadosAnual: g.honorariosAnual, honorariosReintegradosAnual: 0,
    seguroVidaAnual: g.seguroVidaMensual * 12, seguroRetiroAnual: g.seguroRetiroMensual * 12, donacionesAnual: g.donacionesAnual,
    interesesHipotecariosAnual: g.hipotecario ? TOPE_INTERESES_HIPOTECARIOS : 0,
  });
  const esperado: Record<string, number> = {
    alquiler: alq.deduccionIncH,
    domestica: dom,
    educacion: Math.min(g.educacionMensual * 12, TOPE_EDUCACION),
  };
  for (const l of gen.lineas) esperado[l.id] = l.deducible;

  const base = calcularRetencionMensual(entradaDelMotor(d))[11].retencionAcumulada;
  check(`${nombre}: el total sin deducciones es el del motor`, inf.total === base);
  for (const o of inf.oportunidades) {
    check(`${nombre} · ${o.id}: lo deducible es lo que da su motor`, cerca(o.deducible, esperado[o.id]), [o.deducible, esperado[o.id]]);
    const con = calcularRetencionMensual(entradaDelMotor(d, o.deducible))[11].retencionAcumulada;
    check(`${nombre} · ${o.id}: lo que devuelve es sin − con`, cerca(o.ahorro, o.deducible > 0 ? Math.max(0, base - con) : 0));
    check(`${nombre} · ${o.id}: nunca devuelve más de lo deducido ni del impuesto`, o.ahorro <= o.deducible + 0.01 && o.ahorro <= base + 0.01);
    check(`${nombre} · ${o.id}: con lo que paga no supera el techo`, o.deducible <= o.techo + 0.01, [o.deducible, o.techo]);
  }
  const totalDeducible = inf.oportunidades.reduce((s, o) => s + o.deducible, 0);
  const conTodo = calcularRetencionMensual(entradaDelMotor(d, totalDeducible));
  check(`${nombre}: las filas «con tus deducciones» son el motor con todo junto`, JSON.stringify(inf.filasCon) === JSON.stringify(conTodo));
  check(`${nombre}: el ahorro total es sin − con, todo junto`, cerca(inf.ahorroTotal, Math.max(0, base - conTodo[11].retencionAcumulada)));
  const sumaSueltas = inf.oportunidades.reduce((s, o) => s + o.ahorro, 0);
  check(`${nombre}: juntas devuelven a lo sumo la suma de cada una (los tramos bajan)`, inf.ahorroTotal <= sumaSueltas + 0.01);
  check(`${nombre}: el techo total no supera el impuesto del año`, inf.ahorroTechoTotal <= inf.total + 0.01);
  if (g.titularInmueble) check(`${nombre}: titular de inmueble no deduce alquiler ni tiene techo`, inf.oportunidades[0].deducible === 0 && inf.oportunidades[0].techo === 0);
}

{
  const inf = armarInforme(CASO_EJEMPLO)!;
  const techo = (id: string) => inf.oportunidades.find((o) => o.id === id)!.techo;
  check("techo del alquiler = ganancia no imponible", techo("alquiler") === TOPE_DEDUCCION_ALQUILER && TOPE_DEDUCCION_ALQUILER === DEDUCCIONES.mni);
  check("techo de casas particulares = ganancia no imponible", techo("domestica") === TOPE_DEDUCCION_ANUAL);
  check("techo de educación = 40% de la ganancia no imponible (art. 85 inc. j)", cerca(TOPE_EDUCACION, DEDUCCIONES.mni * 0.4) && techo("educacion") === TOPE_EDUCACION);
  check("techo de seguros = tope 2026 publicado por ARCA ($753.472,14)", techo("seguroVida") === TOPE_SEGUROS_VIGENTE && TOPE_SEGUROS_VIGENTE === 753_472.14);
  check("techo hipotecario = $20.000", techo("hipotecario") === 20_000);
  check("sin gastos no hay columna «con tus deducciones»", inf.filasCon === null && inf.ahorroTotal === 0);
  check("las nueve deducciones están, en orden", inf.oportunidades.map((o) => o.id).join() === ORDEN_DEDUCCIONES.join());
  const conConyuge = calcularRetencionMensual(entradaDelMotor({ ...CASO_EJEMPLO, conyuge: true }))[11].retencionAcumulada;
  check("carga de cónyuge: sin − con, del motor", cerca(inf.cargas.conyuge ?? -1, inf.total - conConyuge));
  console.log(`     ejemplo: total ${formatARS(inf.total, 0)} · tramo ${inf.alicuotaMarginal * 100}% · cada 100k/mes ${formatARS(inf.porCada100k, 0)}`);
}

{
  const inf = armarInforme(CASO_EJEMPLO, GASTOS_VACIOS);
  check("gastos vacíos: todo lo deducible en 0", inf !== null && inf.oportunidades.every((o) => o.deducible === 0 && o.ahorro === 0));
}

// ===========================================================================
// 3 · validar contra input hostil
// ===========================================================================
const base = { bruto: 5_000_000, conyuge: false, hijos: 1, sindical: 0.02, otras: 100_000 };
const v = (raw: unknown) => prefill.validar(raw);

check("válido: el caso base pasa", v(base) !== null);
check("válido: sólo el bruto alcanza (el resto con default)", JSON.stringify(v({ bruto: 10 })) === JSON.stringify({ bruto: 10, conyuge: false, hijos: 0, sindical: 0, otras: 0 }));
check(`válido: ${MAX_HIJOS} hijos es el tope y pasa`, v({ ...base, hijos: MAX_HIJOS }) !== null);

const hostiles: [string, unknown][] = [
  ["null", null],
  ["undefined", undefined],
  ["un string", "bruto"],
  ["un número", 42],
  ["un array", [base]],
  ["sin bruto", { ...base, bruto: undefined }],
  ["bruto 0", { ...base, bruto: 0 }],
  ["bruto negativo", { ...base, bruto: -1 }],
  ["bruto como string", { ...base, bruto: "5000000" }],
  ["bruto con HTML", { ...base, bruto: "<b>1</b>" }],
  ["bruto NaN", { ...base, bruto: NaN }],
  ["bruto Infinity", { ...base, bruto: Infinity }],
  ["bruto absurdo", { ...base, bruto: 1e15 }],
  ["conyuge como string", { ...base, conyuge: "true" }],
  ["conyuge como número", { ...base, conyuge: 1 }],
  ["hijos decimal", { ...base, hijos: 1.5 }],
  ["hijos negativo", { ...base, hijos: -1 }],
  [`hijos ${MAX_HIJOS + 1}`, { ...base, hijos: MAX_HIJOS + 1 }],
  ["hijos como string", { ...base, hijos: "2" }],
  ["hijos como array", { ...base, hijos: [1, 2] }],
  ["sindical > 1", { ...base, sindical: 1.5 }],
  ["sindical negativa", { ...base, sindical: -0.1 }],
  ["sindical como string", { ...base, sindical: "2%" }],
  ["otras negativas", { ...base, otras: -5 }],
  ["otras absurdas", { ...base, otras: 1e15 }],
  ["otras como string", { ...base, otras: "100000" }],
  ["otras null", { ...base, otras: null }],
];
for (const [nombre, raw] of hostiles) check(`hostil: ${nombre} → null`, v(raw) === null, v(raw));

{
  const contaminado = JSON.parse('{"__proto__":{"bruto":5000000},"x":1}');
  check("hostil: bruto sólo dentro de __proto__ → null", v(contaminado) === null);
  const heredado = Object.create({ bruto: 5_000_000 });
  check("hostil: bruto heredado del prototipo → null", v(heredado) === null);
}

{
  const sucio = { ...base, nombre: "<script>alert(1)</script>", email: "alguien@example.com", cuit: "20-12345678-9", alquiler: 900000, extra: "x".repeat(100_000) };
  const r = v(sucio);
  check("campos de más: el resultado sólo tiene bruto, conyuge, hijos, sindical y otras", r !== null && Object.keys(r).sort().join() === "bruto,conyuge,hijos,otras,sindical", r && Object.keys(r));
  check("campos de más: no se cuela texto ni gastos", r !== null && !/script|@|20-|alquiler/.test(JSON.stringify(r)));
  const largo = JSON.stringify(v({ bruto: 9_999_999_999.99, conyuge: true, hijos: MAX_HIJOS, sindical: 0.123456789, otras: 9_999_999_999.99 }));
  check("el JSON canónico entra holgado en la metadata (2048)", largo.length < 200, largo.length);
}

if (fallas) {
  console.error(`\n${fallas} chequeo(s) fallaron`);
  process.exit(1);
}
console.log("\nTodo OK: el informe calcula lo mismo que la calculadora, las deducciones salen de sus motores y validar no deja pasar basura.");
