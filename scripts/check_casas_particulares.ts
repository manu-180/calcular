// Verificación de la escala de casas particulares (src/data/casas-particulares.ts + su motor).
// Correr con: npx tsx scripts/check_casas_particulares.ts
//
// ESTE ES EL CHECK MÁS IMPORTANTE DEL ARCHIVO: los importes son PLATA que alguien va a usar para
// exigir o para pagar un sueldo. Salen de los cinco ANEXOS de la Resolución CNTCP 6/2026, bajados
// del BORA y parseados por coordenadas. Los checks anclan cada número contra su anexo, verifican el
// orden de la escala (una categoría no puede pagar menos que la de abajo) y prueban la invariante
// que hace útil a la página: valor hora y mínimo mensual son dos pisos y se aplica el que más
// favorece.
//
// Y ancla las TRES cosas que esta resolución le puede romper a la página (15/9/2026, s115):
//
//   1. **El mes vigente se DERIVA de la fecha, no se escribe.** El sitio estuvo liquidando
//      septiembre con la escala de julio porque `vigenteEn` era una constante a mano que nadie
//      movió cuando salió la resolución. Se ancla que `mesVigente()` elige el último mes empezado.
//   2. **Septiembre y octubre NO son un porcentaje sobre el mes anterior:** el art. 7 y el art. 8
//      incorporan al básico el 25% y el 50% de la suma no remunerativa ANTES del aumento. La
//      derivación `(mes anterior + incorporación) × (1 + %)` se prueba contra los NUEVE valores
//      mensuales de cada anexo. Si alguien "simplifica" la incorporación, esto sale rojo.
//   3. **Noviembre y diciembre salen de los anexos rectificados por la Res. 7/2026** y reproducen
//      el 1,6% del articulado al centavo. El "Anexo 4" original (1,7%) era otro documento: se
//      ancla que ningún mensual de noviembre vuelva a salir con 1,7%.

import {
  CASAS_PARTICULARES_FUENTES,
  ESCALAS_POR_MES,
  ESCALA_VIGENTE,
  HORAS_EXTRAS,
  JORNADA,
  SAC,
  SEMANAS_POR_MES,
  SUMA_NO_REMUNERATIVA,
  VACACIONES,
  VACACIONES_PROPORCIONAL,
  VIGENCIA,
  ZONA_DESFAVORABLE,
  escalaDe,
  mesVigente,
  sumaNoRemunerativaPorHoras,
} from "../src/data/casas-particulares";
import {
  calcularCasasParticulares,
  categoriaPorId,
  descansoProporcional,
  diasDeVacaciones,
} from "../src/lib/casas-particulares";

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
// 1 · Los importes, uno por uno, contra el ANEXO IV de la Res. CNTCP 4/2026
// ===========================================================================
// El anexo del mes que se está liquidando HOY, transcripto acá a mano una segunda vez: si el data
// se edita por accidente, los dos no van a coincidir.
const ANEXO_DEL_MES: Record<string, Record<string, [number | null, number, number | null, number]>> = {
  // mesId: { categoría: [hora con retiro, hora sin retiro, mes con retiro, mes sin retiro] }
  "2026-08": {
    supervisor: [4523.11, 4920.89, 564246.7, 624313.9],
    "tareas-especificas": [4303.5, 4684.53, 526829.56, 582283.26],
    caseros: [null, 4072.38, null, 514903.51],
    "asistencia-personas": [4072.38, 4520.15, 514903.51, 569593.41],
    "tareas-generales": [3804.66, 4072.38, 466756.24, 514903.51],
  },
  "2026-09": {
    supervisor: [4645.33, 5049.58, 579493.14, 640641.55],
    "tareas-especificas": [4422.54, 4809.8, 541402.49, 597854.36],
    caseros: [null, 4185.94, null, 529261.78],
    "asistencia-personas": [4185.94, 4641.9, 529261.78, 584936.09],
    "tareas-generales": [3914.64, 4185.94, 480247.85, 529261.78],
  },
  "2026-10": {
    supervisor: [4805.82, 5215.59, 599514.52, 661702.46],
    "tareas-especificas": [4580.8, 4973.38, 560776.33, 618187.89],
    caseros: [null, 4337.53, null, 548429.23],
    "asistencia-personas": [4337.53, 4801.52, 548429.23, 605050.0],
    "tareas-generales": [4064.08, 4337.53, 498582.06, 548429.23],
  },
  "2026-11": {
    supervisor: [4923.44, 5339.08, 614186.76, 677369.7],
    "tareas-especificas": [4695.59, 5093.82, 574828.75, 633158.89],
    caseros: [null, 4447.11, null, 562284.09],
    "asistencia-personas": [4447.11, 4918.66, 562284.09, 619810.8],
    "tareas-generales": [4170.52, 4447.11, 511639.37, 562284.09],
  },
  "2026-12": {
    supervisor: [5002.21, 5424.5, 624013.75, 688207.61],
    "tareas-especificas": [4770.72, 5175.33, 584026.01, 643289.43],
    caseros: [null, 4518.27, null, 571280.64],
    "asistencia-personas": [4518.27, 4997.36, 571280.64, 629727.77],
    "tareas-generales": [4237.25, 4518.27, 519825.6, 571280.64],
  },
};

const ANEXO_IV = ANEXO_DEL_MES[VIGENCIA.mesId];

check("la escala tiene las 5 categorías del régimen", ESCALA_VIGENTE.length === 5, ESCALA_VIGENTE.length);
for (const [id, [hc, hs, mc, ms]] of Object.entries(ANEXO_IV)) {
  const c = categoriaPorId(id);
  check(`${id}: existe en la escala`, c !== null);
  if (!c) continue;
  check(`${id}: hora con retiro`, c.horaConRetiro === hc, c.horaConRetiro);
  check(`${id}: hora sin retiro`, c.horaSinRetiro === hs, c.horaSinRetiro);
  check(`${id}: mes con retiro`, c.mesConRetiro === mc, c.mesConRetiro);
  check(`${id}: mes sin retiro`, c.mesSinRetiro === ms, c.mesSinRetiro);
}

// ===========================================================================
// 1b · La serie completa: el mes vigente se DERIVA, y cada anexo se reproduce
// ===========================================================================
check("la serie tiene los 5 meses que publica la Res. 6/2026", ESCALAS_POR_MES.length === 5, ESCALAS_POR_MES.length);
check(
  "los meses están en orden cronológico y sin huecos",
  ESCALAS_POR_MES.every((m, i) => i === 0 || m.desdeISO > ESCALAS_POR_MES[i - 1].desdeISO),
);
check(
  "cada mes trae las 5 categorías",
  ESCALAS_POR_MES.every((m) => Object.keys(m.filas).length === 5),
);
check(
  "cada mes de la serie coincide con su anexo transcripto aparte",
  ESCALAS_POR_MES.every((m) =>
    escalaDe(m.id).every((c) => {
      const [hc, hs, mc, ms] = ANEXO_DEL_MES[m.id][c.id];
      return c.horaConRetiro === hc && c.horaSinRetiro === hs && c.mesConRetiro === mc && c.mesSinRetiro === ms;
    }),
  ),
);

// El mes vigente sale de la fecha. Se prueba con fechas fijas, no con "hoy": un check que depende
// del reloj prueba lo que pasa hoy y nada más.
check("el 15/8/2026 rige agosto", mesVigente(new Date("2026-08-15")).id === "2026-08");
check("el 1/9/2026 (primer día) ya rige septiembre", mesVigente(new Date("2026-09-01")).id === "2026-09");
check("el 31/8/2026 todavía rige agosto", mesVigente(new Date("2026-08-31")).id === "2026-08");
check("el 15/11/2026 rige noviembre", mesVigente(new Date("2026-11-15")).id === "2026-11");
check(
  "después de diciembre la serie no se cae: queda fija en el último mes publicado",
  mesVigente(new Date("2027-03-10")).id === "2026-12",
);
check(
  "antes del primer mes de la serie no devuelve undefined",
  mesVigente(new Date("2026-01-05")).id === "2026-08",
);
check(
  "VIGENCIA.vigenteEn es el mes derivado, no una constante suelta",
  VIGENCIA.vigenteEn === mesVigente().etiqueta && VIGENCIA.mesId === mesVigente().id,
);

// La derivación: (mes anterior + lo que se incorpora) × (1 + el % DEL ANEXO). Se prueba contra los
// nueve valores mensuales de cada anexo, al centavo.
for (let i = 1; i < ESCALAS_POR_MES.length; i++) {
  const previo = ESCALAS_POR_MES[i - 1];
  const mes = ESCALAS_POR_MES[i];
  const factor = 1 + mes.incrementoDelAnexo! / 100;
  let mensualesOk = 0;
  let mensualesTotal = 0;
  for (const cat of Object.keys(mes.filas)) {
    for (const idx of [2, 3] as const) {
      const antes = previo.filas[cat][idx];
      const ahora = mes.filas[cat][idx];
      if (antes === null || ahora === null) continue;
      mensualesTotal++;
      if (Math.abs((antes + mes.incorporaAlBasico) * factor - ahora) <= 0.02) mensualesOk++;
    }
  }
  check(
    `${mes.etiqueta}: los ${mensualesTotal} mensuales salen de (mes anterior + ${mes.incorporaAlBasico}) × ${factor}`,
    mensualesOk === mensualesTotal,
    `${mensualesOk}/${mensualesTotal}`,
  );
}

// Noviembre con los anexos rectificados (Res. 7/2026): articulado y anexo coinciden en 1,6%, y
// ningún mensual sale con el 1,7% del anexo equivocado que se había cargado.
const NOV = ESCALAS_POR_MES.find((m) => m.id === "2026-11")!;
const OCT = ESCALAS_POR_MES.find((m) => m.id === "2026-10")!;
check(
  "noviembre: articulado y anexo rectificado coinciden en 1,6%",
  NOV.incrementoDeclarado === 1.6 && NOV.incrementoDelAnexo === 1.6,
  [NOV.incrementoDeclarado, NOV.incrementoDelAnexo],
);
check(
  "noviembre: con el 1,7% del anexo equivocado NINGÚN mensual da",
  Object.keys(NOV.filas).every((cat) =>
    ([2, 3] as const).every((idx) => {
      const antes = OCT.filas[cat][idx];
      const ahora = NOV.filas[cat][idx];
      if (antes === null || ahora === null) return true;
      return Math.abs((antes + NOV.incorporaAlBasico) * 1.017 - ahora) > 0.02;
    }),
  ),
);
check(
  "diciembre no incorpora nada: el $20.000 queda absorbido en noviembre",
  ESCALAS_POR_MES.at(-1)!.incorporaAlBasico === 0,
);
check(
  "los tres tramos de incorporación suman el 100% de la suma",
  SUMA_NO_REMUNERATIVA.incorporacion.reduce((a, t) => a + t.porcentaje, 0) === 100,
);

// La suma no remunerativa del art. 6: tres tramos por horas semanales, no por categoría.
check("16 horas semanales o más → $20.000", sumaNoRemunerativaPorHoras(16) === 20000);
check("40 horas semanales → también $20.000", sumaNoRemunerativaPorHoras(40) === 20000);
check("15 horas semanales → $11.500", sumaNoRemunerativaPorHoras(15) === 11500);
check("12 horas semanales (el borde inferior del tramo) → $11.500", sumaNoRemunerativaPorHoras(12) === 11500);
check("11 horas semanales → $8.000", sumaNoRemunerativaPorHoras(11) === 8000);
check("0 horas → el tramo más bajo, no un error", sumaNoRemunerativaPorHoras(0) === 8000);
check(
  "la suma es POR ÚNICA VEZ y se paga con los salarios de agosto",
  SUMA_NO_REMUNERATIVA.pagaderaCon.includes("agosto de 2026"),
);

// ===========================================================================
// 2 · Invariantes de la escala (si un dato se carga mal, alguna de estas cae)
// ===========================================================================
check(
  "sin retiro siempre paga más que con retiro, en toda categoría",
  ESCALA_VIGENTE.every((c) => c.horaConRetiro === null || c.horaSinRetiro > c.horaConRetiro),
);
check(
  "el mínimo mensual sin retiro también supera al de con retiro",
  ESCALA_VIGENTE.every((c) => c.mesConRetiro === null || c.mesSinRetiro > c.mesConRetiro),
);
check(
  "todos los importes son positivos",
  ESCALA_VIGENTE.every(
    (c) =>
      c.horaSinRetiro > 0 &&
      c.mesSinRetiro > 0 &&
      (c.horaConRetiro === null || c.horaConRetiro > 0) &&
      (c.mesConRetiro === null || c.mesConRetiro > 0),
  ),
);
check(
  "caseros es la única categoría sin modalidad «con retiro»",
  ESCALA_VIGENTE.filter((c) => c.horaConRetiro === null).map((c) => c.id).join() === "caseros",
);
check(
  "supervisor/a es la categoría mejor paga",
  Math.max(...ESCALA_VIGENTE.map((c) => c.horaSinRetiro)) === categoriaPorId("supervisor")!.horaSinRetiro,
);
check(
  "tareas generales es el piso de la escala",
  Math.min(...ESCALA_VIGENTE.map((c) => c.horaSinRetiro)) === categoriaPorId("tareas-generales")!.horaSinRetiro,
);
// El anexo repite el mismo valor en dos lugares: el sin retiro de tareas generales es igual al con
// retiro de asistencia de personas y al de caseros. Si alguien "corrige" uno solo, esto lo detecta.
check(
  "el valor puente del anexo aparece en los tres lugares donde se repite",
  categoriaPorId("tareas-generales")!.horaSinRetiro ===
    categoriaPorId("asistencia-personas")!.horaConRetiro &&
    categoriaPorId("tareas-generales")!.horaSinRetiro === categoriaPorId("caseros")!.horaSinRetiro,
  [
    categoriaPorId("tareas-generales")!.horaSinRetiro,
    categoriaPorId("asistencia-personas")!.horaConRetiro,
    categoriaPorId("caseros")!.horaSinRetiro,
  ],
);

// ===========================================================================
// 3 · Reglas del régimen (Ley 26.844) contra el texto vigente
// ===========================================================================
check("jornada de 8 horas diarias y 48 semanales (art. 14.1.a)", JORNADA.horasDiarias === 8 && JORNADA.horasSemanales === 48);
check("con distribución desigual, el tope diario son 9 horas", JORNADA.horasDiariasMaximoDesigual === 9);
check("horas extras: 50% en días comunes (art. 25)", HORAS_EXTRAS.comunes === 50);
check("horas extras: 100% sábado 13h+, domingo y feriados", HORAS_EXTRAS.finDeSemanaYFeriados === 100);
check("aguinaldo: 50% de la MAYOR remuneración del semestre (art. 26)", SAC.porcentaje === 50 && SAC.base.includes("mayor"));
check("zona desfavorable: 31% (art. 7 Res. 4/2026, reproducido por los anexos de la 6/2026)", ZONA_DESFAVORABLE.porcentaje === 31);
check(
  "la zona desfavorable alcanza a las 6 jurisdicciones patagónicas",
  ZONA_DESFAVORABLE.provincias.length === 6 && ZONA_DESFAVORABLE.partidoBonaerense === "Patagones",
);
check(
  "vacaciones: 14/21/28/35 días por antigüedad (art. 29)",
  VACACIONES.map((v) => v.dias).join() === "14,21,28,35",
);
check("sin 6 meses: un día cada 20 trabajados (art. 30)", VACACIONES_PROPORCIONAL.diasTrabajadosPorDiaDeDescanso === 20);
check("las semanas por mes son 52/12, no 4", Math.abs(SEMANAS_POR_MES - 4.3333) < 0.001);

check("2 años de antigüedad → 14 días", diasDeVacaciones(2) === 14);
check("5 años → todavía 14 días (el tramo es «no exceda de 5»)", diasDeVacaciones(5) === 14);
check("7 años → 21 días", diasDeVacaciones(7) === 21);
check("15 años → 28 días", diasDeVacaciones(15) === 28);
check("25 años → 35 días", diasDeVacaciones(25) === 35);
check("60 días trabajados → 3 días de descanso", descansoProporcional(60) === 3);
check("19 días trabajados → 0 días", descansoProporcional(19) === 0);

// ===========================================================================
// 4 · El motor: los dos pisos y cuál manda
// ===========================================================================
const baseEntrada = {
  categoriaId: "tareas-generales",
  modalidad: "con-retiro" as const,
  horasSemanales: 48,
  zonaDesfavorable: false,
  horasExtrasComunes: 0,
  horasExtrasFinDeSemana: 0,
};

const completa = calcularCasasParticulares(baseEntrada)!;
check("48 h semanales es jornada completa", completa.jornadaCompleta);
check(
  "con jornada completa el básico nunca baja del mínimo mensual",
  completa.basico >= completa.minimoMensual,
  [completa.basico, completa.minimoMensual],
);
check(
  "las horas mensuales salen de 52/12",
  Math.abs(completa.horasMensuales - 48 * SEMANAS_POR_MES) < 0.01,
);

const media = calcularCasasParticulares({ ...baseEntrada, horasSemanales: 12 })!;
check("12 h semanales NO es jornada completa", !media.jornadaCompleta);
check("con jornada reducida el básico es la cuenta por hora", media.basico === media.porHoras);
check(
  "12 h semanales dan aproximadamente 52 horas al mes",
  Math.abs(media.horasMensuales - 52) < 0.1,
  media.horasMensuales,
);
check(
  "media jornada paga menos que la completa",
  media.total < completa.total,
);

// ===========================================================================
// 5 · Zona desfavorable, extras y aguinaldo
// ===========================================================================
const conZona = calcularCasasParticulares({ ...baseEntrada, zonaDesfavorable: true })!;
check(
  "la zona suma exactamente 31% sobre el valor hora",
  Math.abs(conZona.valorHora - completa.valorHora * 1.31) < 0.01,
  [conZona.valorHora, completa.valorHora],
);
check(
  "la zona suma exactamente 31% sobre el mínimo mensual",
  Math.abs(conZona.minimoMensual - completa.minimoMensual * 1.31) < 0.01,
);
check("el adicional por zona se informa por separado", conZona.adicionalZona > 0);
check("sin zona, el adicional informado es 0", completa.adicionalZona === 0);

const conExtras = calcularCasasParticulares({
  ...baseEntrada,
  horasExtrasComunes: 10,
  horasExtrasFinDeSemana: 5,
})!;
check(
  "10 extras comunes se pagan al 150% del valor hora",
  Math.abs(conExtras.extrasComunes - 10 * completa.valorHora * 1.5) < 0.01,
);
check(
  "5 extras de fin de semana se pagan al 200%",
  Math.abs(conExtras.extrasFinDeSemana - 5 * completa.valorHora * 2) < 0.01,
);
check("las extras suman al total", conExtras.total > completa.total);
check("el aguinaldo estimado es la mitad del total del mes", Math.abs(conExtras.aguinaldoEstimado - conExtras.total / 2) < 0.01);

// ===========================================================================
// 6 · Combinaciones inválidas devuelven null, no un número inventado
// ===========================================================================
check(
  "caseros con retiro no existe → null",
  calcularCasasParticulares({ ...baseEntrada, categoriaId: "caseros", modalidad: "con-retiro" }) === null,
);
check(
  "caseros sin retiro sí calcula",
  calcularCasasParticulares({ ...baseEntrada, categoriaId: "caseros", modalidad: "sin-retiro" }) !== null,
);
check("una categoría inexistente → null", calcularCasasParticulares({ ...baseEntrada, categoriaId: "chofer" }) === null);
check(
  "las horas se acotan a la jornada máxima",
  calcularCasasParticulares({ ...baseEntrada, horasSemanales: 200 })!.horasMensuales ===
    calcularCasasParticulares({ ...baseEntrada, horasSemanales: 48 })!.horasMensuales,
);
check(
  "horas negativas no producen un sueldo negativo",
  calcularCasasParticulares({ ...baseEntrada, horasSemanales: -10 })!.total >= 0,
);
check(
  "extras negativas no restan del sueldo",
  calcularCasasParticulares({ ...baseEntrada, horasExtrasComunes: -5 })!.extrasComunes === 0,
);

// ===========================================================================
// 7 · Vigencia y fuentes: la trazabilidad es parte del dato
// ===========================================================================
check("la vigencia declara la resolución de origen", VIGENCIA.resolucion.includes("6/2026"));
check("la vigencia declara la fecha del Boletín Oficial", VIGENCIA.boletinOficial.includes("2026"));
check(
  "todas las fuentes son oficiales",
  CASAS_PARTICULARES_FUENTES.lista.every((f) =>
    /^https:\/\/(www\.)?(boletinoficial|servicios\.infoleg|argentina)\.gob\.ar\//.test(f.url),
  ),
  CASAS_PARTICULARES_FUENTES.lista.map((f) => f.url),
);
check(
  "está citado el anexo con la escala, no sólo la resolución",
  CASAS_PARTICULARES_FUENTES.lista.some((f) => /Anexos? 1 a 5/.test(f.nombre)),
);
check(
  "está citada la Ley 26.844 con su texto actualizado",
  CASAS_PARTICULARES_FUENTES.lista.some((f) => f.nombre.includes("26.844") && f.url.endsWith("texact.htm")),
);
check("la fecha de consulta es una fecha ISO", /^\d{4}-\d{2}-\d{2}$/.test(CASAS_PARTICULARES_FUENTES.consultadoEl));

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(`Todos los checks de casas particulares OK (escala ${VIGENCIA.desde}).`);
}
