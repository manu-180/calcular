// Verificación de la escala de casas particulares (src/data/casas-particulares.ts + su motor).
// Correr con: npx tsx scripts/check_casas_particulares.ts
//
// ESTE ES EL CHECK MÁS IMPORTANTE DEL ARCHIVO: los importes son PLATA que alguien va a usar para
// exigir o para pagar un sueldo. Salen del ANEXO IV de la Resolución CNTCP 4/2026 bajado del PDF
// oficial. Los checks anclan cada número contra el anexo, verifican el orden de la escala (una
// categoría no puede pagar menos que la de abajo) y prueban la invariante que hace útil a la
// página: valor hora y mínimo mensual son dos pisos y se aplica el que más favorece.

import {
  CASAS_PARTICULARES_FUENTES,
  ESCALA_VIGENTE,
  HORAS_EXTRAS,
  JORNADA,
  SAC,
  SEMANAS_POR_MES,
  VACACIONES,
  VACACIONES_PROPORCIONAL,
  VIGENCIA,
  ZONA_DESFAVORABLE,
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
const ANEXO_IV: Record<string, [number | null, number, number | null, number]> = {
  // id: [hora con retiro, hora sin retiro, mes con retiro, mes sin retiro]
  supervisor: [4438.77, 4829.13, 553725.91, 612673.11],
  "tareas-especificas": [4223.25, 4597.18, 517006.43, 571426.17],
  caseros: [null, 3996.45, null, 505302.76],
  "asistencia-personas": [3996.45, 4435.86, 505302.76, 558972.92],
  "tareas-generales": [3733.72, 3996.45, 458053.22, 505302.76],
};

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
  "el valor puente 3.996,45 aparece donde el anexo lo repite",
  categoriaPorId("tareas-generales")!.horaSinRetiro === 3996.45 &&
    categoriaPorId("asistencia-personas")!.horaConRetiro === 3996.45 &&
    categoriaPorId("caseros")!.horaSinRetiro === 3996.45,
);

// ===========================================================================
// 3 · Reglas del régimen (Ley 26.844) contra el texto vigente
// ===========================================================================
check("jornada de 8 horas diarias y 48 semanales (art. 14.1.a)", JORNADA.horasDiarias === 8 && JORNADA.horasSemanales === 48);
check("con distribución desigual, el tope diario son 9 horas", JORNADA.horasDiariasMaximoDesigual === 9);
check("horas extras: 50% en días comunes (art. 25)", HORAS_EXTRAS.comunes === 50);
check("horas extras: 100% sábado 13h+, domingo y feriados", HORAS_EXTRAS.finDeSemanaYFeriados === 100);
check("aguinaldo: 50% de la MAYOR remuneración del semestre (art. 26)", SAC.porcentaje === 50 && SAC.base.includes("mayor"));
check("zona desfavorable: 31% desde abril de 2026 (art. 7 Res. 4/2026)", ZONA_DESFAVORABLE.porcentaje === 31);
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
check("la vigencia declara la resolución de origen", VIGENCIA.resolucion.includes("4/2026"));
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
  CASAS_PARTICULARES_FUENTES.lista.some((f) => f.url.includes("res4-4")),
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
