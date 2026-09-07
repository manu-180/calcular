// Verificación de la continuidad de la obra social al cortarse el trabajo o el sueldo.
// Correr con: npx tsx scripts/check_obra_social_continuidad.ts
//
// LOS CUATRO CHECKS QUE IMPORTAN:
//
//   1. **El piso del inciso a) es un MAYOR ESTRICTO y se mide en FECHAS.** «Más de tres (3) meses»
//      de desempeño continuado: con tres justos no hay cobertura, y con tres meses y un día sí. Las
//      dos formas naturales de escribirlo fallan en direcciones opuestas — `meses >= 3` le promete
//      cobertura a quien no la tiene, `meses > 3` (meses enteros) se la niega durante casi un mes
//      entero a quien sí la tiene—, así que el borde se prueba por los dos lados.
//   2. **La enfermedad se DERIVA, no se tabula.** El inciso b) remite al plazo de conservación del
//      empleo, que arranca cuando se agota la licencia paga del art. 208. La respuesta va de 15 a
//      24 meses; un "un año" fijo sería una respuesta incorrecta para las cuatro combinaciones.
//   3. **Quién paga es parte del resultado, no un adorno.** Cuatro supuestos siguen «sin obligación
//      de efectuar aportes» y cuatro sólo con aporte + contribución. Confundirlos cambia la
//      decisión de una persona sin trabajo.
//   4. **Los supuestos sin plazo cerrado devuelven null, a propósito.** En la licencia sin goce, la
//      temporada y la excedencia la ley no fija fecha de corte: dura lo que dure. Inventar una
//      fecha ahí sería publicar una certeza que la norma no da.

import {
  CONTINUIDAD_FUENTES,
  CONTINUIDAD_TEXTOS,
  EXTINCION,
  SUPUESTOS,
  SUSPENSION_MESES_SIN_APORTE,
} from "../src/data/obra-social-continuidad";
import { CONSERVACION_EMPLEO_MESES, PLAZOS_ART_208 } from "../src/data/enfermedad";
import {
  calcularContinuidad,
  mesesEntre,
  sumarMeses,
  type EntradaContinuidad,
} from "../src/lib/obra-social-continuidad";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const base: EntradaContinuidad = {
  supuesto: "extincion",
  hechoISO: "2026-09-05",
  ingresoISO: "2024-03-01",
  cargasDeFamilia: false,
};

// ===========================================================================
// 1 · Aritmética de fechas
// ===========================================================================

check("sumarMeses respeta el día", sumarMeses("2026-09-05", 3) === "2026-12-05");
check("sumarMeses cruza el año", sumarMeses("2026-11-20", 3) === "2027-02-20");
check("sumarMeses clampea el día al mes destino (31/1 + 1 = 28/2)", sumarMeses("2027-01-31", 1) === "2027-02-28");
check("sumarMeses clampea también en año bisiesto (31/1 + 1 = 29/2)", sumarMeses("2028-01-31", 1) === "2028-02-29");
check("mesesEntre cuenta meses enteros", mesesEntre("2026-01-10", "2026-04-10") === 3);
check("mesesEntre no cuenta el mes incompleto", mesesEntre("2026-01-10", "2026-04-09") === 2);
check("mesesEntre nunca es negativo", mesesEntre("2026-04-10", "2026-01-10") === 0);

// ===========================================================================
// 2 · El piso del inciso a): un MAYOR estricto
// ===========================================================================

const tresJustos = calcularContinuidad({ ...base, ingresoISO: "2026-06-05", hechoISO: "2026-09-05" });
check(
  "tres meses justos NO alcanzan: la norma dice «más de tres»",
  tresJustos?.bloqueadoPorAntiguedad === true && tresJustos?.hastaISO === null,
  tresJustos,
);
const tresYUnDia = calcularContinuidad({ ...base, ingresoISO: "2026-06-04", hechoISO: "2026-09-05" });
check(
  "tres meses y UN DÍA sí alcanzan — el piso se mide en fechas, no en meses enteros",
  tresYUnDia?.bloqueadoPorAntiguedad === false && tresYUnDia?.hastaISO === "2026-12-05",
  tresYUnDia,
);
const casiCuatro = calcularContinuidad({ ...base, ingresoISO: "2026-05-20", hechoISO: "2026-09-05" });
check(
  "tres meses y medio también: exigir cuatro meses redondos negaría un mes de cobertura real",
  casiCuatro?.bloqueadoPorAntiguedad === false,
  casiCuatro,
);
check(
  "con el piso incumplido no hay ningún mes de cobertura",
  tresJustos?.mesesSinAporte === 0,
);
check(
  "y en la extinción no queda opción paga: se termina la calidad de beneficiario",
  tresJustos?.hayOpcionPaga === false,
);

// ===========================================================================
// 3 · Extinción del contrato
// ===========================================================================

const ext = calcularContinuidad(base);
check("extinción: tres meses desde el distracto", ext?.hastaISO === "2026-12-05", ext?.hastaISO);
check("extinción: sin obligación de aportar", ext?.mesesSinAporte === EXTINCION.mesesCobertura);
check("extinción: no hay opción de continuar pagando", ext?.hayOpcionPaga === false);
check(
  "el plazo se cuenta del distracto, no del fin de mes (28/2 → 28/5)",
  calcularContinuidad({ ...base, hechoISO: "2027-02-28" })?.hastaISO === "2027-05-28",
);
check("los tres meses del inciso a) son tres", EXTINCION.mesesCobertura === 3);
check("y el piso de desempeño son tres", EXTINCION.mesesDesempenoMinimo === 3);

// ===========================================================================
// 4 · Fallecimiento: mismo plazo, mismas condiciones, más la opción
// ===========================================================================

const muerte = calcularContinuidad({ ...base, supuesto: "fallecimiento" });
check("fallecimiento: mismo plazo que el inciso a)", muerte?.hastaISO === ext?.hastaISO);
check("fallecimiento: vencido el plazo, el grupo familiar puede optar pagando", muerte?.hayOpcionPaga === true);
check(
  "fallecimiento: arrastra también el requisito de más de tres meses del titular",
  calcularContinuidad({ ...base, supuesto: "fallecimiento", ingresoISO: "2026-08-01" })
    ?.bloqueadoPorAntiguedad === true,
);

// ===========================================================================
// 5 · Enfermedad inculpable: la derivación 208 + 211
// ===========================================================================

const casos = [
  { antiguedad: "2024-03-01", cargas: false, meses: PLAZOS_ART_208.sinCargas.hasta5 },
  { antiguedad: "2024-03-01", cargas: true, meses: PLAZOS_ART_208.conCargas.hasta5 },
  { antiguedad: "2015-03-01", cargas: false, meses: PLAZOS_ART_208.sinCargas.mas5 },
  { antiguedad: "2015-03-01", cargas: true, meses: PLAZOS_ART_208.conCargas.mas5 },
];

for (const c of casos) {
  const r = calcularContinuidad({
    ...base,
    supuesto: "enfermedad",
    ingresoISO: c.antiguedad,
    cargasDeFamilia: c.cargas,
  });
  check(
    `enfermedad · ingreso ${c.antiguedad}${c.cargas ? " con cargas" : ""}: ${c.meses} meses de licencia paga`,
    r?.mesesLicenciaPaga === c.meses,
    r?.mesesLicenciaPaga,
  );
  check(
    `enfermedad · ese caso suma ${c.meses} + ${CONSERVACION_EMPLEO_MESES} meses de cobertura`,
    r?.mesesSinAporte === c.meses + CONSERVACION_EMPLEO_MESES,
    r?.mesesSinAporte,
  );
  check(
    `enfermedad · la fecha final es el hecho + ${c.meses + CONSERVACION_EMPLEO_MESES} meses`,
    r?.hastaISO === sumarMeses(base.hechoISO, c.meses + CONSERVACION_EMPLEO_MESES),
    r?.hastaISO,
  );
}

check(
  "enfermedad: la respuesta NUNCA es «un año» a secas — el mínimo ya son 15 meses",
  (calcularContinuidad({ ...base, supuesto: "enfermedad" })?.mesesSinAporte ?? 0) >
    CONSERVACION_EMPLEO_MESES,
);
check(
  "enfermedad: nunca hay que pagar (el inciso b) dice «sin obligación de efectuar aportes»)",
  calcularContinuidad({ ...base, supuesto: "enfermedad" })?.hayOpcionPaga === false,
);
check(
  "enfermedad: el piso de tres meses del inciso a) NO se le aplica",
  calcularContinuidad({ ...base, supuesto: "enfermedad", ingresoISO: "2026-08-15" })
    ?.bloqueadoPorAntiguedad === false,
);

// ===========================================================================
// 6 · Suspensión, licencia, temporada y excedencia
// ===========================================================================

const susp = calcularContinuidad({ ...base, supuesto: "suspension" });
check("suspensión: tres meses gratis", susp?.mesesSinAporte === SUSPENSION_MESES_SIN_APORTE);
check("suspensión: fecha = hecho + 3 meses", susp?.hastaISO === "2026-12-05", susp?.hastaISO);
check("suspensión: después hay opción paga", susp?.hayOpcionPaga === true);

for (const id of ["licencia", "temporada", "excedencia"] as const) {
  const r = calcularContinuidad({ ...base, supuesto: id });
  check(`${id}: no hay meses gratis`, r?.mesesSinAporte === 0, r?.mesesSinAporte);
  check(`${id}: hay opción paga desde el día uno`, r?.hayOpcionPaga === true);
  check(`${id}: la ley no fija fecha de corte, así que no se inventa una`, r?.hastaISO === null);
}

// ===========================================================================
// 7 · Entradas inválidas
// ===========================================================================

check("ingreso posterior al hecho devuelve null", calcularContinuidad({ ...base, ingresoISO: "2027-01-01" }) === null);
check("fecha mal formada devuelve null", calcularContinuidad({ ...base, hechoISO: "05/09/2026" }) === null);
check("fecha vacía devuelve null", calcularContinuidad({ ...base, hechoISO: "" }) === null);

// ===========================================================================
// 8 · Los textos siguen siendo citas, y están los ocho supuestos
// ===========================================================================

check("hay siete supuestos operativos listados (el f) derogado va aparte)", SUPUESTOS.length === 7);
check(
  "cada supuesto declara su inciso y su costo",
  SUPUESTOS.every(
    (s) => s.inciso.startsWith("art. 10 inc.") && ["sin-aporte", "aporte-y-contribucion"].includes(s.costo),
  ),
);
check(
  "cuatro supuestos arrancan sin obligación de aportar",
  SUPUESTOS.filter((s) => s.costo === "sin-aporte").length === 4,
);
check(
  "la cita del inciso a) conserva el «más de tres (3) meses»",
  SUPUESTOS[0].texto.includes("más de tres (3) meses") &&
    SUPUESTOS[0].texto.includes("sin obligación de efectuar aportes"),
);
check(
  "la cita del inciso b) remite al plazo de conservación del empleo",
  SUPUESTOS.find((s) => s.id === "enfermedad")!.texto.includes(
    "plazo de conservación del empleo sin percepción de remuneración",
  ),
);
check(
  "las citas de los supuestos onerosos nombran la contribución del empleador",
  SUPUESTOS.filter((s) => s.costo === "aporte-y-contribucion").every((s) =>
    s.texto.includes("contribución a cargo del empleador"),
  ),
);
check(
  "el inciso f) derogado se guarda textual (servicio militar obligatorio)",
  CONTINUIDAD_TEXTOS.incisoFDerogado.includes("servicio militar obligatorio"),
);
check(
  "el art. 211 citado dice «un (1) año contado desde el vencimiento»",
  CONTINUIDAD_TEXTOS.art211.includes("un (1) año contado desde el vencimiento"),
);
check(
  "las fuentes son InfoLEG y son dos leyes distintas",
  CONTINUIDAD_FUENTES.lista.length === 2 &&
    CONTINUIDAD_FUENTES.lista.every((f) => f.url.includes("infoleg.gob.ar")),
);

if (fallas > 0) {
  console.error(`\n❌ ${fallas} check(s) fallaron`);
  process.exit(1);
}
console.log("\n✅ Todos los checks de continuidad de la obra social OK (Ley 23.660 art. 10 · LCT arts. 208 y 211)");
