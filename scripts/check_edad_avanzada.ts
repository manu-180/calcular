// Verificación de la Prestación por Edad Avanzada (src/data/edad-avanzada.ts + src/lib/edad-avanzada.ts).
// Correr con: npx tsx scripts/check_edad_avanzada.ts
//
// EL ANCLA QUE IMPORTA: acá no hay un solo monto escrito a mano. Todo se deriva de la PBU y del
// haber mínimo garantizado de `prestaciones.ts`, que se transcriben de la resolución mensual de
// ANSES. Y el invariante duro es el del art. 125: **el haber nunca puede quedar por debajo del
// mínimo garantizado**, dé lo que dé la fórmula del art. 34 bis. Si alguien toca el 70%, el 1,5%
// o el piso, este check sale rojo.
//
// El segundo ancla es el umbral derivado: `promedioParaSuperarElMinimo` tiene que ser el promedio
// exacto que hace que la fórmula toque el mínimo — se verifica ida y vuelta (se calcula el umbral
// y se lo mete en la fórmula: tiene que dar el mínimo clavado).

import {
  PEA,
  PEA_CARACTERES,
  peaFuentes,
  PEA_REQUISITOS,
} from "../src/data/edad-avanzada";
import { bonoVigente, prestacionesVigentes } from "../src/data/prestaciones";
import {
  evaluarPea,
  haberPea,
  pensionDerivada,
  promedioParaSuperarElMinimo,
  type SituacionPea,
} from "../src/lib/edad-avanzada";

const V = prestacionesVigentes();

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const casi = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol;

const base = (extra: Partial<SituacionPea> = {}): SituacionPea => ({
  edad: 70,
  aniosAportes: 10,
  aniosAnterioresAlSijp: 0,
  aniosEnLaVentana: 5,
  condicion: "dependencia",
  antiguedadAfiliacionAnios: 0,
  serviciosDomesticos: false,
  cobraOtroBeneficio: false,
  promedioRemuneraciones: 0,
  ...extra,
});

// ===========================================================================
// 1 · Parámetros contra el texto de la ley
// ===========================================================================
console.log("Parámetros del art. 34 bis:");
check("la edad mínima son 70 años (ap. 2 inc. a)", PEA.edadMinima === 70);
check(
  "10 años de servicios con aportes, 5 dentro de los 8 previos al cese (ap. 2 inc. b)",
  PEA.aniosServiciosConAportes === 10 &&
    PEA.aniosDentroDeLaVentana === 5 &&
    PEA.ventanaAniosAnteriores === 8,
);
check(
  "al autónomo se le exigen 5 años de antigüedad en la afiliación (ap. 2 inc. c)",
  PEA.antiguedadAfiliacionAutonomoAnios === 5,
);
check("el componente propio es el 70% de la PBU (ap. 3)", PEA.proporcionPbu === 0.7);
check(
  "la pensión por fallecimiento es el 70% de lo que le hubiera correspondido (ap. 5)",
  PEA.proporcionPensionDerivada === 0.7,
);
check(
  "PC y PAP pagan 1,5% por año sobre el promedio de 10 años, tope 35 (arts. 24 y 30 inc. b)",
  PEA.porcentajePorAnio === 0.015 && PEA.aniosDelPromedio === 10 && PEA.topeAniosPc === 35,
);
check(
  "la garantía del 82% del SMVM exige 30 años y por eso no alcanza a la PEA (art. 125 bis)",
  PEA.aniosQueExigeEl82 === 30 && PEA.aniosQueExigeEl82 > PEA.aniosServiciosConAportes,
);

// ===========================================================================
// 2 · EL ANCLA: el piso del art. 125 manda sobre la fórmula, siempre
// ===========================================================================
console.log("\nGarantía del haber mínimo (art. 125):");
const sinPromedio = haberPea(0, 10, 0);
check(
  "el 70% de la PBU está por debajo del haber mínimo (por eso la página existe)",
  sinPromedio.componentePbu < V.haberMinimo,
  { pbu70: sinPromedio.componentePbu, minimo: V.haberMinimo },
);
check(
  "el 70% de la PBU se deriva de la PBU vigente, no está escrito a mano",
  casi(sinPromedio.componentePbu, V.pbu * 0.7),
);
check(
  "sin promedio declarado el haber es exactamente el mínimo garantizado",
  casi(sinPromedio.haber, V.haberMinimo) && sinPromedio.mandaElPiso,
  sinPromedio,
);

// Barrido: con cualquier combinación razonable, el haber nunca baja del mínimo.
let violaciones = 0;
for (const promedio of [0, 100_000, 500_000, 1_000_000, 2_000_000, 10_000_000, 100_000_000]) {
  for (const anios of [0, 1, 5, 10, 20, 35, 45]) {
    for (const antes of [0, 1, 10, 40]) {
      const h = haberPea(promedio, anios, antes);
      if (h.haber < V.haberMinimo - 0.01) violaciones++;
      if (h.haber > V.haberMaximo + 0.01) violaciones++;
    }
  }
}
check(
  "en 147 combinaciones el haber nunca cae bajo el mínimo ni supera el máximo (arts. 125 y 17)",
  violaciones === 0,
  { violaciones },
);

// ===========================================================================
// 3 · Composición del haber: PC solo por años anteriores al SIJP
// ===========================================================================
console.log("\nComposición del haber (arts. 24 y 30 inc. b):");
const todoPost = haberPea(1_000_000, 10, 0);
check(
  "10 años todos posteriores al SIJP: PC = 0 y PAP = 1,5% × 10 × promedio",
  todoPost.componentePc === 0 && casi(todoPost.componentePap, 1_000_000 * 0.015 * 10),
  todoPost,
);
const mitad = haberPea(1_000_000, 10, 4);
check(
  "4 años anteriores y 6 posteriores reparten en PC y PAP sin cambiar el total de la fórmula",
  mitad.aniosPc === 4 &&
    mitad.aniosPap === 6 &&
    casi(mitad.haberFormula, todoPost.haberFormula),
  mitad,
);
// 45 años, TODOS anteriores al SIJP: la PC computa 35 y los 10 restantes se pierden — no se
// mudan a la PAP, que solo computa servicios posteriores (art. 30 inc. b).
const topeado = haberPea(1_000_000, 45, 45);
check(
  "la PC topea en 35 años aunque se declaren 45, y el excedente NO pasa a la PAP (arts. 24 y 30 inc. b)",
  topeado.aniosPc === PEA.topeAniosPc &&
    topeado.aniosPap === 0 &&
    casi(topeado.componentePc, 1_000_000 * 0.015 * PEA.topeAniosPc),
  topeado,
);
check(
  "el haber máximo del art. 17 acota la fórmula",
  haberPea(100_000_000, 35, 35).haber === V.haberMaximo,
);

// ===========================================================================
// 4 · El umbral derivado, verificado ida y vuelta
// ===========================================================================
console.log("\nUmbral de sueldo para que la fórmula supere el piso:");
const umbral = promedioParaSuperarElMinimo(10, 0);
check("con 10 años de aportes hay un umbral finito", umbral !== null && umbral > 0, umbral);
if (umbral !== null) {
  const enElUmbral = haberPea(umbral, 10, 0);
  check(
    "metiendo el umbral en la fórmula sale exactamente el haber mínimo (ida y vuelta)",
    casi(enElUmbral.haberFormula, V.haberMinimo, 0.05),
    { umbral, formula: enElUmbral.haberFormula, minimo: V.haberMinimo },
  );
  check(
    "un peso por encima del umbral hace que la fórmula supere el piso",
    haberPea(umbral + 1_000, 10, 0).haberFormula > V.haberMinimo,
  );
  const umbral20 = promedioParaSuperarElMinimo(20, 0);
  check(
    "con el doble de años de aportes el umbral es la mitad (el 1,5% es lineal)",
    umbral20 !== null && casi(umbral20, umbral / 2, 1),
    { umbral, umbral20 },
  );
}
check("sin años de aportes no hay umbral posible", promedioParaSuperarElMinimo(0, 0) === null);

// ===========================================================================
// 5 · Requisitos: cada uno bloquea por su cuenta
// ===========================================================================
console.log("\nRequisitos del art. 34 bis ap. 2 y de la cartilla de ANSES:");
check("el caso base (70 años, 10 aportes, 5 en la ventana) pasa", evaluarPea(base()).cumpleRequisitosObjetivos);
check("69 años no alcanza", !evaluarPea(base({ edad: 69 })).cumpleRequisitosObjetivos);
check(
  "9 años de aportes no alcanzan",
  !evaluarPea(base({ aniosAportes: 9, aniosEnLaVentana: 5 })).cumpleRequisitosObjetivos,
);
check(
  "10 años pero solo 4 en la ventana de 8: bloquea (el requisito que casi nadie enuncia)",
  !evaluarPea(base({ aniosEnLaVentana: 4 })).cumpleRequisitosObjetivos,
);
check(
  "autónomo con 4 años de antigüedad en la afiliación: bloquea",
  !evaluarPea(base({ condicion: "autonomo", antiguedadAfiliacionAnios: 4 }))
    .cumpleRequisitosObjetivos,
);
check(
  "autónomo con 5 años de antigüedad: pasa",
  evaluarPea(base({ condicion: "autonomo", antiguedadAfiliacionAnios: 5 }))
    .cumpleRequisitosObjetivos,
);
check(
  "servicio doméstico bloquea (requisito de la cartilla de ANSES, no de la ley)",
  !evaluarPea(base({ serviciosDomesticos: true })).cumpleRequisitosObjetivos,
);
check(
  "cobrar otro beneficio NO bloquea: hay derecho a optar (ap. 4)",
  evaluarPea(base({ cobraOtroBeneficio: true })).cumpleRequisitosObjetivos,
);
check(
  "cobrar otro beneficio deja una observación de atención",
  evaluarPea(base({ cobraOtroBeneficio: true })).observaciones.some((o) => o.tono === "atencion"),
);
check(
  "la antigüedad de afiliación NO se le exige al de relación de dependencia",
  evaluarPea(base({ condicion: "dependencia", antiguedadAfiliacionAnios: 0 }))
    .cumpleRequisitosObjetivos,
);
check(
  "los años en la ventana nunca superan al total declarado",
  evaluarPea(base({ aniosAportes: 10, aniosEnLaVentana: 99 })).cumpleRequisitosObjetivos,
);

// ===========================================================================
// 6 · Observaciones que llevan la información que no está en la SERP
// ===========================================================================
console.log("\nObservaciones:");
const r = evaluarPea(base());
check(
  "el caso base avisa que manda el piso, no la fórmula",
  r.observaciones.some((o) => o.texto.includes("piso") || o.texto.includes("mínimo garantizado")),
);
check(
  "el caso base avisa que no llega la garantía del 82% del SMVM",
  r.observaciones.some((o) => o.texto.includes("82%")),
);
check(
  "avisa que sin años anteriores al SIJP no hay prestación compensatoria",
  r.observaciones.some((o) => o.texto.includes("compensatoria")),
);
check("la edad faltante se informa", evaluarPea(base({ edad: 66 })).aniosParaLaEdad === 4);

// ===========================================================================
// 7 · Pensión derivada y bono
// ===========================================================================
console.log("\nPensión derivada y bono:");
check(
  "la pensión por fallecimiento es el 70% del haber (ap. 5)",
  casi(pensionDerivada(V.haberMinimo), V.haberMinimo * 0.7),
);
check(
  "quien cobra el mínimo se lleva el bono completo del mes",
  sinPromedio.bono === bonoVigente().monto,
  { bono: sinPromedio.bono, esperado: bonoVigente().monto },
);
check(
  "el total es haber + bono",
  casi(sinPromedio.total, sinPromedio.haber + sinPromedio.bono),
);
check(
  "un haber muy alto no cobra bono",
  haberPea(100_000_000, 35, 35).bono === 0,
);

// ===========================================================================
// 8 · Contenido: fuentes citadas y trazabilidad
// ===========================================================================
console.log("\nContenido y fuentes:");
check("hay al menos 6 requisitos documentados", PEA_REQUISITOS.length >= 6);
check(
  "cada requisito cita su norma",
  PEA_REQUISITOS.every((x) => x.norma.trim().length > 8),
);
check(
  "el requisito de servicio doméstico dice explícitamente que NO está en la ley",
  PEA_REQUISITOS.some((x) => x.texto.includes("NO está en el texto de la ley")),
);
check(
  "hay caracteres a favor y en contra, todos con norma",
  PEA_CARACTERES.some((c) => c.signo === "a favor") &&
    PEA_CARACTERES.some((c) => c.signo === "en contra") &&
    PEA_CARACTERES.every((c) => c.norma.trim().length > 8),
);
check(
  "se cita el texto actualizado de la Ley 24.241 en InfoLEG",
  peaFuentes().lista.some((f) => f.url.includes("infoleg.gob.ar") && f.url.includes("texact")),
);
check(
  "se cita la cartilla oficial de ANSES (el control cruzado del requisito extra)",
  peaFuentes().lista.some((f) => f.url.includes("anses.gob.ar") && f.url.includes("cartilla")),
);
check(
  "se cita la resolución del mes vigente",
  peaFuentes().lista.some((f) => f.url === V.resolucionUrl),
);
check(
  "la fecha de consulta tiene formato ISO",
  /^\d{4}-\d{2}-\d{2}$/.test(peaFuentes().consultadoEl),
);

console.log(
  fallas === 0
    ? `\nTodos los checks de la prestación por edad avanzada OK (haber ${V.vigencia}: piso ${V.haberMinimo}).`
    : `\n${fallas} check(s) fallaron.`,
);
process.exit(fallas === 0 ? 0 : 1);
