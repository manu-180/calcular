// Verificación de la licencia por enfermedad inculpable (src/data/enfermedad.ts + src/lib/enfermedad.ts).
// Correr con: npx tsx scripts/check_enfermedad.ts
//
// LO QUE IMPORTA ACÁ NO SON MONTOS SINO PLAZOS Y FECHAS, y las fechas se corren un día con una
// facilidad brutal. Los checks fuertes son cuatro:
//   1. La tabla del art. 208 es exactamente 3/6 y 6/12, con el corte en los 5 años de antigüedad.
//   2. El plazo se mide en MESES DE CALENDARIO desde el inicio: una licencia que arranca el 1/2 no
//      tiene los mismos días corridos que una que arranca el 1/3. Se verifica contra años bisiestos.
//   3. El día de inicio cuenta como el día 1 del plazo, y el año de conservación del art. 211
//      arranca el día siguiente al último día pago — sin superponerse ni dejar un día suelto.
//   4. La recidiva RESTA del mismo plazo y nunca lo deja negativo (regla del art. 208).

import {
  AVISO_ART_209,
  CERTIFICADO_ART_210,
  CONSERVACION_EMPLEO_MESES,
  ENFERMEDAD_FUENTES,
  PLAZOS_ART_208,
  RECIDIVA_ANIOS,
} from "../src/data/enfermedad";
import {
  aniosDeAntiguedad,
  calcularEnfermedad,
  mesesDePlazo,
  mesesDeAntiguedadEnfermedad,
} from "../src/lib/enfermedad";
import { aISO, diasEntre, parseFechaISO, sumarDias, sumarMeses } from "../src/lib/licencias";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// ===========================================================================
// 1 · La tabla del art. 208 es la del texto vigente
// ===========================================================================
check("sin cargas: 3 meses hasta 5 años de antigüedad", PLAZOS_ART_208.sinCargas.hasta5 === 3);
check("sin cargas: 6 meses con más de 5 años", PLAZOS_ART_208.sinCargas.mas5 === 6);
check("con cargas: 6 meses hasta 5 años", PLAZOS_ART_208.conCargas.hasta5 === 6);
check("con cargas: 12 meses con más de 5 años", PLAZOS_ART_208.conCargas.mas5 === 12);
check("el corte de antigüedad son 5 años", PLAZOS_ART_208.corteAntiguedadAnios === 5);
check(
  "las cargas de familia duplican exactamente el plazo, en los dos tramos",
  PLAZOS_ART_208.conCargas.hasta5 === PLAZOS_ART_208.sinCargas.hasta5 * 2 &&
    PLAZOS_ART_208.conCargas.mas5 === PLAZOS_ART_208.sinCargas.mas5 * 2,
);
check("la recidiva se mide en 2 años (art. 208)", RECIDIVA_ANIOS === 2);
check("la conservación del empleo dura 12 meses (art. 211)", CONSERVACION_EMPLEO_MESES === 12);

// El texto NUEVO del art. 210 (Ley 27.802) es el hallazgo que justifica la página: si alguien lo
// revierte al texto viejo, este check cae.
check(
  "el certificado del art. 210 exige diagnóstico, tratamiento y días de reposo",
  ["diagnóstico", "tratamiento", "reposo"].every((r) =>
    CERTIFICADO_ART_210.requisitos.some((x) => x.includes(r)),
  ),
  CERTIFICADO_ART_210.requisitos,
);
check(
  "el art. 210 vigente exige firma digital (Ley 27.553)",
  CERTIFICADO_ART_210.firmaDigital && CERTIFICADO_ART_210.leyFirmaDigital === "Ley 27.553",
);
check(
  "el art. 210 citado es el texto según la Ley 27.802",
  CERTIFICADO_ART_210.articulo.includes("27.802"),
);
check("el aviso del art. 209 cita su texto vigente", AVISO_ART_209.articulo.includes("27.802"));

// ===========================================================================
// 2 · mesesDePlazo: los cuatro casos y los bordes del corte
// ===========================================================================
check("0 años sin cargas → 3 meses", mesesDePlazo(0, false) === 3);
check("4 años sin cargas → 3 meses", mesesDePlazo(4, false) === 3);
check("5 años sin cargas → 6 meses (el corte es inclusivo)", mesesDePlazo(5, false) === 6);
check("20 años sin cargas → 6 meses", mesesDePlazo(20, false) === 6);
check("4 años con cargas → 6 meses", mesesDePlazo(4, true) === 6);
check("5 años con cargas → 12 meses", mesesDePlazo(5, true) === 12);

// ===========================================================================
// 3 · Antigüedad: años y meses enteros, sin redondear para arriba
// ===========================================================================
const ing = parseFechaISO("2021-08-10")!;
check("el día del aniversario ya cuenta el año", aniosDeAntiguedad(ing, parseFechaISO("2026-08-10")!) === 5);
check("un día antes del aniversario todavía no", aniosDeAntiguedad(ing, parseFechaISO("2026-08-09")!) === 4);
check("meses enteros: 4 años y 11 meses son 59 meses", mesesDeAntiguedadEnfermedad(ing, parseFechaISO("2026-07-10")!) === 59);

// ===========================================================================
// 4 · El plazo se mide en meses de CALENDARIO, no en bloques de 30 días
// ===========================================================================
const base = { fechaIngreso: "2010-01-01", cargasDeFamilia: false, diasYaUsados: 0, brutoMensual: 0 };

const feb = calcularEnfermedad({ ...base, fechaInicio: "2026-02-01" })!;
const mar = calcularEnfermedad({ ...base, fechaInicio: "2026-03-01" })!;
check("6 meses desde el 1/2/2026 son 181 días corridos", feb.plazoDias === 181, feb.plazoDias);
check("6 meses desde el 1/3/2026 son 184 días corridos", mar.plazoDias === 184, mar.plazoDias);
check(
  "el plazo en días nunca se aparta de los meses de calendario",
  feb.plazoDias === diasEntre(parseFechaISO("2026-02-01")!, sumarMeses(parseFechaISO("2026-02-01")!, 6)),
);

const bisiesto = calcularEnfermedad({ ...base, fechaInicio: "2024-01-31" })!;
check(
  "31/1 + 3 meses cae el 30/4 (el mes corto no salta al siguiente)",
  aISO(sumarMeses(parseFechaISO("2024-01-31")!, 3)) === "2024-04-30",
);
check("bisiesto: el plazo se calcula sin romperse", bisiesto.plazoDias > 0);

// ===========================================================================
// 5 · El día de inicio cuenta como el día 1, y el art. 211 arranca al día siguiente
// ===========================================================================
const caso = calcularEnfermedad({
  fechaInicio: "2026-03-02",
  fechaIngreso: "2019-03-02",
  cargasDeFamilia: false,
  diasYaUsados: 0,
  brutoMensual: 1_000_000,
})!;
check("7 años de antigüedad sin cargas → 6 meses", caso.mesesPlazo === 6);
check("con 7 años, masDe5Anios es true", caso.masDe5Anios);
check(
  "el último día pago es inicio + plazo - 1 (el día de inicio cuenta)",
  aISO(caso.fin!) === aISO(sumarDias(caso.inicio, caso.diasDisponibles - 1)),
);
check("el último día pago del 2/3/2026 + 6 meses es el 1/9/2026", aISO(caso.fin!) === "2026-09-01", aISO(caso.fin!));
check(
  "la conservación del empleo arranca el día siguiente al último día pago",
  aISO(caso.conservacionDesde) === aISO(sumarDias(caso.fin!, 1)),
);
check(
  "la conservación dura exactamente 12 meses y no se pisa con el tramo pago",
  aISO(caso.conservacionHasta) === "2027-09-01",
  aISO(caso.conservacionHasta),
);
check(
  "el total pago sale de los días disponibles a razón de 30 por mes",
  Math.round(caso.totalPago) === Math.round((1_000_000 * caso.diasDisponibles) / 30),
);

// ===========================================================================
// 6 · La recidiva descuenta del MISMO plazo (la regla que nadie calcula)
// ===========================================================================
const conRecaida = calcularEnfermedad({
  fechaInicio: "2026-03-02",
  fechaIngreso: "2019-03-02",
  cargasDeFamilia: false,
  diasYaUsados: 45,
  brutoMensual: 0,
})!;
check("los días ya usados se restan del plazo", conRecaida.diasDisponibles === caso.plazoDias - 45);
check("la recaída adelanta el último día pago 45 días", aISO(conRecaida.fin!) === aISO(sumarDias(caso.fin!, -45)));
check(
  "y adelanta también el año de conservación (art. 211 cuenta desde el vencimiento)",
  aISO(conRecaida.conservacionDesde) === aISO(sumarDias(caso.conservacionDesde, -45)),
);

const agotado = calcularEnfermedad({
  fechaInicio: "2026-03-02",
  fechaIngreso: "2019-03-02",
  cargasDeFamilia: false,
  diasYaUsados: 9999,
  brutoMensual: 500_000,
})!;
check("un plazo agotado no da días negativos", agotado.diasDisponibles === 0);
check("con el plazo agotado no hay último día pago", agotado.fin === null);
check("con el plazo agotado el total pago es 0", agotado.totalPago === 0);
check(
  "con el plazo agotado la conservación arranca el día de inicio declarado",
  aISO(agotado.conservacionDesde) === "2026-03-02",
);
check(
  "el plazo agotado avisa como bloqueante",
  agotado.avisos.some((a) => a.tono === "bloqueante"),
);
check(
  "una recaída parcial avisa que el plazo no se reinicia",
  conRecaida.avisos.some((a) => a.texto.includes("recaída") || a.texto.includes("recidiva")),
);

// ===========================================================================
// 7 · Cargas de familia: el caso completo, contra el texto del artículo
// ===========================================================================
const conCargas = calcularEnfermedad({
  fechaInicio: "2026-03-02",
  fechaIngreso: "2019-03-02",
  cargasDeFamilia: true,
  diasYaUsados: 0,
  brutoMensual: 0,
})!;
check("7 años CON cargas → 12 meses", conCargas.mesesPlazo === 12);
check("el plazo con cargas es exactamente el doble en días", conCargas.plazoDias === 365 && caso.plazoDias === 184, [
  conCargas.plazoDias,
  caso.plazoDias,
]);
check("sin cargas se sugiere revisar el dato", caso.avisos.some((a) => a.texto.includes("cónyuge")));
check(
  "siempre se avisa que el sueldo no se congela (art. 208)",
  conCargas.avisos.some((a) => a.texto.includes("aumentos")),
);

// ===========================================================================
// 8 · Entradas inválidas: null, nunca un resultado inventado
// ===========================================================================
check(
  "fecha de ingreso posterior al inicio → null",
  calcularEnfermedad({ ...base, fechaInicio: "2020-01-01", fechaIngreso: "2026-01-01" }) === null,
);
check(
  "fecha inexistente → null",
  calcularEnfermedad({ ...base, fechaInicio: "2026-02-31" }) === null,
);
check("cadena vacía → null", calcularEnfermedad({ ...base, fechaInicio: "" }) === null);
check(
  "NaN en días usados no rompe el cálculo",
  calcularEnfermedad({ ...base, fechaInicio: "2026-03-02", diasYaUsados: NaN })!.diasConsumidos === 0,
);
check(
  "un bruto negativo no produce un total negativo",
  calcularEnfermedad({ ...base, fechaInicio: "2026-03-02", brutoMensual: -100 })!.totalPago === 0,
);

// ===========================================================================
// 9 · El aviso del corte de los 5 años sólo aparece cuando falta poco
// ===========================================================================
const casiCinco = calcularEnfermedad({
  fechaInicio: "2026-03-02",
  fechaIngreso: "2021-06-02",
  cargasDeFamilia: false,
  diasYaUsados: 0,
  brutoMensual: 0,
})!;
check("con 4 años y 9 meses avisa que falta poco para duplicar", casiCinco.avisos.some((a) => a.texto.includes("faltan")));
const reciente = calcularEnfermedad({
  fechaInicio: "2026-03-02",
  fechaIngreso: "2025-03-02",
  cargasDeFamilia: false,
  diasYaUsados: 0,
  brutoMensual: 0,
})!;
check("con 1 año de antigüedad NO se avisa del corte", !reciente.avisos.some((a) => a.texto.includes("faltan")));

// ===========================================================================
// 10 · Higiene de fuentes
// ===========================================================================
check(
  "todas las fuentes son oficiales",
  ENFERMEDAD_FUENTES.lista.every((f) =>
    /^https:\/\/(www\.)?(boletinoficial|servicios\.infoleg|infoleg|argentina)\.gob\.ar\//.test(f.url),
  ),
  ENFERMEDAD_FUENTES.lista.map((f) => f.url),
);
check(
  "las fuentes apuntan al texto ACTUALIZADO, no al original",
  ENFERMEDAD_FUENTES.lista.every((f) => !f.url.endsWith("norma.htm")),
);
check(
  "están citadas la LCT y la reforma 27.802",
  ["20.744", "27.802"].every((n) => ENFERMEDAD_FUENTES.lista.some((f) => f.nombre.includes(n))),
);
check("la fecha de consulta es una fecha ISO", /^\d{4}-\d{2}-\d{2}$/.test(ENFERMEDAD_FUENTES.consultadoEl));

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de licencia por enfermedad inculpable OK.");
}
