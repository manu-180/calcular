// Verificación del Informe de actualización por inflación (producto pago).
// Correr con: npx tsx scripts/check_informe_inflacion.ts
//
// Tres promesas que no se pueden romper:
//   1. El informe da EXACTAMENTE los mismos números que la calculadora web para el mismo caso,
//      recorriendo el camino real: estado de la calculadora → datos guardados → JSON en la metadata
//      del pago → `validar` → informe. Si difieren, la persona manda una carta con una cifra y la
//      web le muestra otra.
//   2. La carta dice esos mismos números, en todos los casos y en los dos tratos.
//   3. `validar` corre sobre input hostil: ante cualquier cosa que no sea exactamente lo esperado
//      devuelve null, y nunca deja pasar campos de más ni texto.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { formatARS, formatPctFijo } from "../src/lib/formato";
import {
  actualizarMonto,
  indiceDe,
  mesesEntre,
  PRIMER_PERIODO,
  sueldoVsInflacion,
  sumarMeses,
  ULTIMO_PERIODO,
} from "../src/lib/inflacion";
import { CASOS, datosDeLaCalculadora, prefill, type EstadoCalculadora } from "../src/lib/prefill/inflacion";
import { armarInforme, CASO_EJEMPLO, MAX_MESES_DETALLE } from "../src/app/informes/inflacion/_modelo";
import { armarCarta, cartaEnTexto, PERSONALES_VACIOS } from "../src/components/informe-inflacion/carta";

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
  const fuente = readFileSync(join(__dirname, "..", "src", "components", "CalculadoraInflacion.tsx"), "utf8");
  for (const linea of [
    "actualizarMonto(monto, desde, hasta)",
    "sueldoVsInflacion(sueldoAntes, periodoSueldo, sueldoHoy)",
    "datosDeLaCalculadora({ modo, monto, desde, hasta, caso })",
    "datosDeLaCalculadora({ modo, sueldoAntes, periodoSueldo, sueldoHoy, caso })",
    "recordarDatosCompra(SLUG_INFORME, datosCompra)",
  ]) {
    check(`la calculadora web contiene «${linea}»`, fuente.includes(linea));
  }
}

const viaje = (e: EstadoCalculadora) => prefill.validar(JSON.parse(JSON.stringify(datosDeLaCalculadora(e))));
const cerca = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

// ===========================================================================
// 1 · Modo «actualizar un monto»: mismo caso, mismos números
// ===========================================================================
const U = ULTIMO_PERIODO;
const CASOS_MONTO: [string, EstadoCalculadora & { modo: "monto" }][] = [
  ["12 meses hasta el último dato", { modo: "monto", monto: 350_000, desde: sumarMeses(U, -12), hasta: U, caso: "honorarios" }],
  ["1 mes", { modo: "monto", monto: 100_000, desde: sumarMeses(U, -1), hasta: U, caso: "precio" }],
  ["24 meses justos (tope del detalle)", { modo: "monto", monto: 1_234_567.89, desde: sumarMeses(U, -MAX_MESES_DETALLE), hasta: U, caso: "deuda-presto" }],
  ["25 meses (pasa a año por año)", { modo: "monto", monto: 80_000, desde: sumarMeses(U, -25), hasta: U, caso: "deuda-debo" }],
  ["desde el primer mes de la serie", { modo: "monto", monto: 10_000, desde: PRIMER_PERIODO, hasta: U, caso: "sueldo" }],
  ["llegada a un mes que no es el último", { modo: "monto", monto: 500_000, desde: "2023-03", hasta: "2024-07", caso: "precio" }],
  ["desde diciembre (borde de año)", { modo: "monto", monto: 45_500, desde: "2022-12", hasta: "2025-12", caso: "honorarios" }],
  ["monto enorme", { modo: "monto", monto: 99_999_999_999, desde: "2019-05", hasta: U, caso: "precio" }],
];

for (const [nombre, e] of CASOS_MONTO) {
  const web = actualizarMonto(e.monto, e.desde, e.hasta);
  const d = viaje(e);
  check(`${nombre}: los datos sobreviven el viaje y validan`, d !== null, d);
  if (!d || !web) continue;
  check(`${nombre}: llegar al último mes se guarda como «último dato»`, (e.hasta === U) === (d.hasta === null));
  const inf = armarInforme(d);
  check(`${nombre}: el informe se arma`, inf !== null);
  if (!inf) continue;
  check(`${nombre}: resultado idéntico al de la calculadora web`, JSON.stringify(inf.act) === JSON.stringify(web), { web, inf: inf.act });
  check(`${nombre}: los índices de la fórmula son los de la serie`, inf.indiceDesde === indiceDe(e.desde) && inf.indiceHasta === indiceDe(e.hasta));
  const ultima = inf.filas[inf.filas.length - 1];
  check(`${nombre}: la última fila termina en el mes de llegada y repite la cifra`, ultima?.periodo === e.hasta && ultima.montoActualizado === web.montoActualizado);
  const meses = mesesEntre(e.desde, e.hasta);
  check(`${nombre}: ${meses > MAX_MESES_DETALLE ? "año por año" : "mes a mes"}`, inf.porAnio === meses > MAX_MESES_DETALLE);
  if (!inf.porAnio) check(`${nombre}: una fila por mes`, inf.filas.length === meses, inf.filas.length);
  const filasOk = inf.filas.every((f) => {
    const w = actualizarMonto(e.monto, e.desde, f.periodo)!;
    return f.montoActualizado === w.montoActualizado && f.acumulada === w.variacionPct;
  });
  check(`${nombre}: cada fila coincide con la calculadora llevada a ese mes`, filasOk);
  const encadenado = inf.filas.reduce((a, f) => a * (1 + f.variacion / 100), 1);
  check(`${nombre}: los tramos encadenados dan la inflación total`, cerca(encadenado, web.factor));
  const tramosContiguos = inf.filas.every((f, i) => f.desde === (i === 0 ? e.desde : inf.filas[i - 1].periodo));
  check(`${nombre}: los tramos son contiguos, sin huecos ni solapes`, tramosContiguos);

  for (const caso of CASOS) {
    for (const trato of ["vos", "usted"] as const) {
      const c = armarCarta(caso, inf, { ...PERSONALES_VACIOS, trato, destinatario: "Ana", remitente: "Juan" }, "2026-10-06");
      const texto = cartaEnTexto(c, "6 de octubre de 2026");
      const W = formatARS(web.montoActualizado, 0);
      const X = formatARS(e.monto, 0);
      const Z = formatPctFijo(web.variacionPct, 1);
      check(`${nombre} · carta ${caso} (${trato}): dice el monto de hoy, el original y la inflación`, texto.includes(W) && texto.includes(X) && texto.includes(Z), texto);
      check(`${nombre} · carta ${caso} (${trato}): firma y destinatario`, texto.includes("Juan") && texto.includes("Ana"));
      if (caso === "deuda-presto" || caso === "deuda-debo") {
        check(`${nombre} · carta ${caso} (${trato}): es una propuesta, no una exigencia`, /propon/i.test(texto) && !/deb[eé]s pagar|est[aá]s obligad/i.test(texto));
      }
    }
  }
}

// ===========================================================================
// 2 · Modo «tu sueldo vs. la inflación»
// ===========================================================================
const CASOS_SUELDO: [string, EstadoCalculadora & { modo: "sueldo" }][] = [
  ["perdió contra la inflación", { modo: "sueldo", sueldoAntes: 800_000, periodoSueldo: sumarMeses(U, -12), sueldoHoy: 950_000, caso: "sueldo" }],
  ["le ganó a la inflación", { modo: "sueldo", sueldoAntes: 800_000, periodoSueldo: sumarMeses(U, -12), sueldoHoy: 2_000_000, caso: "sueldo" }],
  ["mismo sueldo nominal hace 3 años", { modo: "sueldo", sueldoAntes: 300_000, periodoSueldo: sumarMeses(U, -36), sueldoHoy: 300_000, caso: "sueldo" }],
];
for (const [nombre, e] of CASOS_SUELDO) {
  const web = sueldoVsInflacion(e.sueldoAntes, e.periodoSueldo, e.sueldoHoy)!;
  const d = viaje(e);
  check(`${nombre}: valida y llega hasta el último dato`, d !== null && d.hasta === null && d.actual === e.sueldoHoy);
  const inf = d ? armarInforme(d) : null;
  const b = inf?.brecha;
  check(`${nombre}: el informe tiene la comparación`, !!b);
  if (!inf || !b) continue;
  check(
    `${nombre}: equivalente, diferencia y poder de compra idénticos a la web`,
    b.equivalente === web.sueldoEquivalente && b.diferencia === web.diferencia && b.diferenciaRealPct === web.diferenciaRealPct && b.gana === web.gana,
    { web, b },
  );
  check(`${nombre}: el monto actualizado es el mismo que el equivalente`, inf.act.montoActualizado === web.sueldoEquivalente);
  if (!b.gana) check(`${nombre}: subir el % necesario empata exacto`, cerca(e.sueldoHoy * (1 + b.aumentoNecesarioPct / 100), web.sueldoEquivalente));
  const texto = cartaEnTexto(armarCarta("sueldo", inf, PERSONALES_VACIOS, null), "");
  check(`${nombre}: la carta dice lo que cobra hoy`, texto.includes(formatARS(e.sueldoHoy, 0)));
  if (!b.gana) check(`${nombre}: la carta dice cuánto falta por mes`, texto.includes(formatARS(-web.diferencia, 0)));
}

{
  const d = prefill.validar(CASO_EJEMPLO);
  check("caso de ejemplo de la landing: valida y arma", d !== null && armarInforme(d) !== null);
}

// ===========================================================================
// 3 · Lo que no tiene informe
// ===========================================================================
check("deflactar (llegada anterior al origen) → sin informe", viaje({ modo: "monto", monto: 1000, desde: "2024-05", hasta: "2023-05", caso: "precio" }) === null);
check("mismo mes de origen y de llegada → sin informe", viaje({ modo: "monto", monto: 1000, desde: "2024-05", hasta: "2024-05", caso: "precio" }) === null);
check("origen en el último mes y llegada «último» → sin informe", prefill.validar({ monto: 1000, desde: U, hasta: null, caso: "precio" }) === null);

// ===========================================================================
// 4 · validar contra input hostil
// ===========================================================================
const base = { monto: 100_000, desde: "2024-01", hasta: null, actual: null, caso: "precio" };
const v = (raw: unknown) => prefill.validar(raw);
check("válido: el caso base pasa", v(base) !== null);
check("válido: sin caso y sin sueldo actual = precio", v({ monto: 10, desde: "2024-01" })?.caso === "precio");
check("válido: sin caso y con sueldo actual = sueldo", v({ monto: 10, desde: "2024-01", actual: 20 })?.caso === "sueldo");
check("válido: hasta ausente = último dato", v({ monto: 10, desde: "2024-01" })?.hasta === null);

const hostiles: [string, unknown][] = [
  ["null", null],
  ["undefined", undefined],
  ["un string", "monto"],
  ["un array", [base]],
  ["sin monto", { ...base, monto: undefined }],
  ["monto 0", { ...base, monto: 0 }],
  ["monto negativo", { ...base, monto: -1 }],
  ["monto como string", { ...base, monto: "100000" }],
  ["monto NaN", { ...base, monto: NaN }],
  ["monto Infinity", { ...base, monto: Infinity }],
  ["monto absurdo", { ...base, monto: 1e15 }],
  ["sin desde", { ...base, desde: undefined }],
  ["desde con formato raro", { ...base, desde: "2024-1" }],
  ["desde mes 13", { ...base, desde: "2024-13" }],
  ["desde antes de la serie", { ...base, desde: "2015-01" }],
  ["desde en el futuro", { ...base, desde: "2099-01" }],
  ["desde numérico", { ...base, desde: 202401 }],
  ["desde con HTML", { ...base, desde: "<script>alert(1)</script>" }],
  ["desde larguísimo", { ...base, desde: "2024-01".repeat(5000) }],
  ["hasta inexistente", { ...base, hasta: "2099-12" }],
  ["hasta con basura", { ...base, hasta: "ayer" }],
  ["hasta booleano", { ...base, hasta: true }],
  ["actual 0", { ...base, actual: 0 }],
  ["actual negativo", { ...base, actual: -5 }],
  ["actual como string", { ...base, actual: "900000" }],
  ["actual absurdo", { ...base, actual: 1e15 }],
  ["caso inexistente", { ...base, caso: "alquiler" }],
  ["caso con mayúsculas", { ...base, caso: "Sueldo" }],
  ["caso null", { ...base, caso: null }],
  ["caso con HTML", { ...base, caso: "<img src=x onerror=alert(1)>" }],
];
for (const [nombre, raw] of hostiles) check(`hostil: ${nombre} → null`, v(raw) === null, v(raw));

{
  const contaminado = JSON.parse('{"__proto__":{"monto":1000,"desde":"2024-01"},"x":1}');
  check("hostil: monto y desde sólo dentro de __proto__ → null", v(contaminado) === null);
  const heredado = Object.create({ monto: 1000, desde: "2024-01" });
  check("hostil: monto y desde heredados del prototipo → null", v(heredado) === null);
}

{
  const sucio = {
    ...base,
    nombre: "<script>alert(1)</script>",
    destinatario: "Jefe",
    email: "alguien@example.com",
    cuit: "20-12345678-9",
    extra: "x".repeat(100_000),
  };
  const r = v(sucio);
  check(
    "campos de más: el resultado sólo tiene monto, desde, hasta, actual y caso",
    r !== null && Object.keys(r).sort().join() === "actual,caso,desde,hasta,monto",
    r && Object.keys(r),
  );
  check("campos de más: no se cuela ningún texto en el resultado", r !== null && !/script|Jefe|@|20-/.test(JSON.stringify(r)));
  const peor = v({ monto: 99_999_999_999.99, desde: PRIMER_PERIODO, hasta: sumarMeses(U, -1), actual: 99_999_999_999.99, caso: "deuda-presto" });
  check("el JSON canónico entra holgado en la metadata (2048)", peor !== null && JSON.stringify(peor).length < 300, peor && JSON.stringify(peor).length);
}

if (fallas) {
  console.error(`\n${fallas} chequeo(s) fallaron`);
  process.exit(1);
}
console.log("\nTodo OK: el informe y la carta dicen lo mismo que la web, y validar no deja pasar basura.");
