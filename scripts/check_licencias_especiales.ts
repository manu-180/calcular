// Verificación del calendario de feriados y de las licencias especiales del art. 158 LCT.
// Correr con: npx tsx scripts/check_licencias_especiales.ts
//
// LOS DOS ANCLAS:
//   1. El calendario de 2026 se DERIVA de la Ley 27.399 (fechas fijas + computus de Pascua + la
//      regla de traslado del art. 6) y acá se cruza contra el calendario oficial publicado por la
//      Jefatura de Gabinete: Güemes al lunes 15/6 y Soberanía al lunes 23/11. Si alguien toca la
//      regla de traslado o el computus, los dos caminos dejan de coincidir.
//   2. El art. 160 se prueba con un caso real y no con una afirmación: un fallecimiento de hermano
//      un domingo tiene que estirar la licencia hasta el primer día hábil, y un matrimonio que
//      arranca sábado NO, porque el inciso b) queda fuera del artículo.

import {
  DIVISOR_DIA_COMUN,
  DIVISOR_DIA_LICENCIA,
  LICENCIAS_ESPECIALES,
  LICENCIAS_ESPECIALES_FUENTES,
} from "../src/data/licencias-especiales";
import { FERIADOS_FUENTES, TURISTICOS_POR_ANIO } from "../src/data/feriados";
import { calendarioDe, domingoDePascua, esHabil, feriadoDe, trasladar } from "../src/lib/feriados";
import { parseFechaISO } from "../src/lib/licencias";
import { calcularLicenciaEspecial } from "../src/lib/licencias-especiales";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const casi = (a: number, b: number, tol = 0.01) => Math.abs(a - b) <= tol;
const iso = (d: Date) => d.toISOString().slice(0, 10);

// ===========================================================================
// 1 · Computus: las fechas móviles de Semana Santa y Carnaval
// ===========================================================================
// Fechas de Pascua verificadas contra el calendario gregoriano.
const PASCUAS: Record<number, string> = {
  2024: "2024-03-31",
  2025: "2025-04-20",
  2026: "2026-04-05",
  2027: "2027-03-28",
  2028: "2028-04-16",
};
for (const [anio, esperado] of Object.entries(PASCUAS)) {
  check(`Pascua ${anio} = ${esperado}`, iso(domingoDePascua(Number(anio))) === esperado, {
    calculado: iso(domingoDePascua(Number(anio))),
  });
}

// ===========================================================================
// 2 · La regla de traslado del art. 6
// ===========================================================================
const casosTraslado: [string, string | null][] = [
  ["2026-06-17", "2026-06-15"], // miércoles → lunes anterior
  ["2026-11-20", "2026-11-23"], // viernes → lunes siguiente
  ["2026-08-17", "2026-08-17"], // lunes → queda
  ["2026-10-12", "2026-10-12"], // lunes → queda
  ["2025-03-25", "2025-03-24"], // martes → lunes anterior
  ["2026-06-20", null], // sábado → lo decide la Jefatura, no se deriva
];
for (const [origen, esperado] of casosTraslado) {
  const r = trasladar(parseFechaISO(origen)!);
  const obtenido = r ? iso(r.fecha) : null;
  check(`traslado de ${origen} → ${esperado ?? "sin resolver"}`, obtenido === esperado, { obtenido });
}

// ===========================================================================
// 3 · ANCLA — el calendario derivado de 2026 contra el oficial
// ===========================================================================
const C26 = calendarioDe(2026);
check("2026 tiene el calendario completo (hay resolución de días turísticos)", C26.completo);
check("2026 no tiene trasladables sin resolver", C26.sinResolver.length === 0, C26.sinResolver);

const esperados2026: [string, string][] = [
  ["2026-01-01", "Año Nuevo"],
  ["2026-02-16", "Lunes de Carnaval"],
  ["2026-02-17", "Martes de Carnaval"],
  ["2026-03-23", "Día no laborable con fines turísticos"],
  ["2026-03-24", "Día Nacional de la Memoria por la Verdad y la Justicia"],
  ["2026-04-02", "Día del Veterano y de los Caídos en la Guerra de Malvinas"],
  ["2026-04-03", "Viernes Santo"],
  ["2026-05-01", "Día del Trabajo"],
  ["2026-05-25", "Día de la Revolución de Mayo"],
  ["2026-06-15", "Paso a la Inmortalidad del General Martín Miguel de Güemes"],
  ["2026-06-20", "Paso a la Inmortalidad del General Manuel Belgrano"],
  ["2026-07-09", "Día de la Independencia"],
  ["2026-07-10", "Día no laborable con fines turísticos"],
  ["2026-08-17", "Paso a la Inmortalidad del General José de San Martín"],
  ["2026-10-12", "Día del Respeto a la Diversidad Cultural"],
  ["2026-11-23", "Día de la Soberanía Nacional"],
  ["2026-12-07", "Día no laborable con fines turísticos"],
  ["2026-12-08", "Día de la Inmaculada Concepción de María"],
  ["2026-12-25", "Navidad"],
];
for (const [fecha, nombre] of esperados2026) {
  check(
    `2026 · ${fecha} es ${nombre}`,
    C26.feriados.some((f) => f.fecha === fecha && f.nombre === nombre),
    C26.feriados.filter((f) => f.fecha === fecha),
  );
}
check(
  "2026 · el Jueves Santo (2/4) coincide con el feriado de Malvinas",
  C26.feriados.filter((f) => f.fecha === "2026-04-02").length === 2,
);
check(
  "2026 · los trasladados guardan su fecha de origen",
  C26.feriados.find((f) => f.fecha === "2026-06-15")?.fechaOriginal === "2026-06-17" &&
    C26.feriados.find((f) => f.fecha === "2026-11-23")?.fechaOriginal === "2026-11-20",
);
check(
  "2026 · los tres días turísticos caen lunes o viernes, como exige el art. 7",
  TURISTICOS_POR_ANIO[2026].fechas.every((f) => [1, 5].includes(parseFechaISO(f)!.getUTCDay())),
);
check("2026 · son exactamente 3 días turísticos (tope del art. 7)", TURISTICOS_POR_ANIO[2026].fechas.length === 3);

// Un año sin resolución de turísticos tiene que declararse incompleto, no inventar fechas.
const C27 = calendarioDe(2027);
check(
  "2027 se declara incompleto mientras no salga la resolución de turísticos",
  C27.completo === false || TURISTICOS_POR_ANIO[2027] !== undefined,
);
check("2027 igual deriva sus feriados de la ley", C27.feriados.length >= 15);

// ===========================================================================
// 4 · Días hábiles
// ===========================================================================
check("un domingo no es hábil", !esHabil(parseFechaISO("2026-08-16")!, true));
check("el 25 de mayo no es hábil", !esHabil(parseFechaISO("2026-05-25")!, true));
check("el día turístico del 10/7 no es hábil", !esHabil(parseFechaISO("2026-07-10")!, true));
check("un martes común es hábil", esHabil(parseFechaISO("2026-08-18")!, true));
check(
  "el sábado depende de la jornada declarada",
  esHabil(parseFechaISO("2026-08-15")!, true) && !esHabil(parseFechaISO("2026-08-15")!, false),
);

// ===========================================================================
// 5 · Los cinco incisos del art. 158
// ===========================================================================
check("están los 5 incisos", LICENCIAS_ESPECIALES.length === 5);
const porCausa = Object.fromEntries(LICENCIAS_ESPECIALES.map((l) => [l.causa, l]));
check("nacimiento: 2 días (inc. a)", porCausa["nacimiento"].dias === 2);
check("matrimonio: 10 días (inc. b)", porCausa["matrimonio"].dias === 10);
check("fallecimiento de cónyuge, hijo o padres: 3 días (inc. c)", porCausa["fallecimiento-directo"].dias === 3);
check("fallecimiento de hermano: 1 día (inc. d)", porCausa["fallecimiento-hermano"].dias === 1);
check("examen: 2 días por examen (inc. e)", porCausa["examen"].dias === 2);
check("examen: tope de 10 días por año calendario", porCausa["examen"].topeAnual?.dias === 10);
check(
  "el art. 160 alcanza sólo a los incisos a), c) y d)",
  LICENCIAS_ESPECIALES.filter((l) => l.garantizaDiaHabil)
    .map((l) => l.causa)
    .sort()
    .join(",") === "fallecimiento-directo,fallecimiento-hermano,nacimiento",
  LICENCIAS_ESPECIALES.map((l) => [l.causa, l.garantizaDiaHabil]),
);

// ===========================================================================
// 6 · ANCLA — el art. 160 aplicado a casos concretos
// ===========================================================================
// Domingo 16/8/2026: el lunes 17 es feriado (San Martín) y el martes 18 es hábil.
const hermanoDomingo = calcularLicenciaEspecial({
  causa: "fallecimiento-hermano",
  fechaInicio: "2026-08-16",
  sabadoEsHabil: false,
  brutoMensual: 0,
})!;
check(
  "hermano, domingo 16/8/2026: se estira hasta el martes 18 (el lunes 17 es feriado)",
  hermanoDomingo.diasTotales === 3 && hermanoDomingo.fin === "2026-08-18",
  { dias: hermanoDomingo.dias.map((d) => `${d.fecha} ${d.diaSemana} ${d.habil ? "hábil" : "no"}`) },
);
check(
  "hermano, domingo 16/8: cubre exactamente un día hábil, como manda el art. 160",
  hermanoDomingo.diasHabilesCubiertos === 1,
);
check(
  "hermano, domingo 16/8: los días agregados se marcan como tales",
  hermanoDomingo.dias.filter((d) => d.agregadoPorArt160).length === 2,
);

// Un fallecimiento un martes común no dispara nada: el tramo ya tiene días hábiles.
const directoMartes = calcularLicenciaEspecial({
  causa: "fallecimiento-directo",
  fechaInicio: "2026-08-18",
  sabadoEsHabil: false,
  brutoMensual: 0,
})!;
check(
  "cónyuge/hijo/padres, martes 18/8: 3 días corridos, sin extensión",
  directoMartes.diasTotales === 3 && directoMartes.fin === "2026-08-20",
);
check("cónyuge/hijo/padres, martes 18/8: reintegro el viernes 21", directoMartes.reintegro === "2026-08-21");

// El matrimonio NO tiene la garantía: 10 días corridos desde el sábado, sin estirar.
const matriSabado = calcularLicenciaEspecial({
  causa: "matrimonio",
  fechaInicio: "2026-08-15",
  sabadoEsHabil: false,
  brutoMensual: 0,
})!;
check(
  "matrimonio, sábado 15/8: 10 días corridos exactos, sin garantía de día hábil",
  matriSabado.diasTotales === 10 && matriSabado.fin === "2026-08-24",
);
check(
  "matrimonio: el aviso avisa que el inciso b) queda fuera del art. 160",
  matriSabado.avisos.some((a) => /SOLO a los incisos a\), c\) y d\)/.test(a.texto)),
);
check(
  "matrimonio: el aviso del art. 164 (vacaciones acumuladas) está",
  matriSabado.avisos.some((a) => /art\. 164/.test(a.texto)),
);

// ===========================================================================
// 7 · ANCLA — el salario del art. 159 → art. 155 inc. a (dividir por 25)
// ===========================================================================
const BRUTO = 1_500_000;
const matriPago = calcularLicenciaEspecial({
  causa: "matrimonio",
  fechaInicio: "2026-08-18",
  sabadoEsHabil: false,
  brutoMensual: BRUTO,
})!;
check("el divisor de la licencia es 25 y el del día común 30", DIVISOR_DIA_LICENCIA === 25 && DIVISOR_DIA_COMUN === 30);
check("valor día = bruto / 25", casi(matriPago.valorDia, BRUTO / 25), { valorDia: matriPago.valorDia });
check(
  "10 días de matrimonio = 40% del sueldo bruto, no 33,3%",
  casi(matriPago.totalLicencia, BRUTO * 0.4) && casi(matriPago.totalADiaComun, BRUTO / 3, 1),
  { total: matriPago.totalLicencia, aDiaComun: matriPago.totalADiaComun },
);
check(
  "el plus del art. 155 es exactamente el 20% del pago a día común",
  casi(matriPago.plusPorElArt155, matriPago.totalADiaComun * 0.2, 1),
  { plus: matriPago.plusPorElArt155 },
);
check(
  "sin sueldo declarado no se inventa un importe",
  matriSabado.valorDia === 0 && matriSabado.totalLicencia === 0,
);

// ===========================================================================
// 8 · Robustez y fuentes
// ===========================================================================
check(
  "una fecha inválida devuelve null en vez de romper",
  calcularLicenciaEspecial({
    causa: "nacimiento",
    fechaInicio: "2026-02-31",
    sabadoEsHabil: false,
    brutoMensual: 0,
  }) === null,
);
check(
  "todos los casos devuelven fin >= inicio y reintegro > fin",
  [hermanoDomingo, directoMartes, matriSabado, matriPago].every(
    (r) => r.fin >= r.inicio && r.reintegro > r.fin,
  ),
);
check("el reintegro siempre cae en día hábil", [hermanoDomingo, directoMartes, matriSabado].every(
  (r) => feriadoDe(r.reintegro) === null && parseFechaISO(r.reintegro)!.getUTCDay() !== 0,
));

for (const fuentes of [LICENCIAS_ESPECIALES_FUENTES, FERIADOS_FUENTES]) {
  check(
    "las fuentes son oficiales y tienen detalle",
    fuentes.lista.every(
      (f) =>
        /^https:\/\/(servicios\.infoleg\.gob\.ar|www\.boletinoficial\.gob\.ar|www\.argentina\.gob\.ar)\//.test(
          f.url,
        ) && f.detalle.length > 40,
    ),
    fuentes.lista.map((f) => f.url),
  );
  check("la fecha de consulta tiene formato AAAA-MM-DD", /^\d{4}-\d{2}-\d{2}$/.test(fuentes.consultadoEl));
}

console.log("");
if (fallas > 0) {
  console.error(`❌ ${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "Todos los checks de licencias especiales y feriados OK (calendario 2026 derivado y cruzado contra el oficial).",
);
