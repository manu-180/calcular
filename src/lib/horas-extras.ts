import { APORTES } from "@/data/sueldo";
import {
  DESCANSOS_MINIMOS,
  DIVISOR_USUAL_48,
  JORNADA_LEGAL_SEMANAL,
  RECARGOS,
  SEMANAS_POR_MES,
  TOPES_DECRETO_484,
} from "@/data/horas-extras";

// Cuánto se cobra por las horas extras y —lo que cambió el 6/3/2026— cuántas horas de franco
// equivalen si se compensan con banco de horas en vez de pagarse.
//
//   · Valor de la hora normal: remuneración mensual normal y habitual dividida por las horas
//     mensuales de la jornada. El divisor NO es un número legal: la ley fija la jornada por semana
//     (48, art. 196 → Ley 11.544) y pasar de semanal a mensual es aritmética. Acá se usa el
//     promedio real —jornada × 52/12, o sea 208 para una jornada de 48— y se muestra al lado el
//     divisor 200 que usan muchísimas liquidaciones y convenios para esa misma jornada, porque la
//     diferencia entre uno y otro es plata y el recibo o el CCT son los que mandan. Un divisor más
//     chico da una hora más cara: 200 paga ~4% más que 208.
//   · Recargo (art. 201): 50% sobre el salario habitual en días comunes y 100% los sábados después
//     de las 13, los domingos y los feriados. La Ley 27.802 no lo tocó.
//   · Tope (Decreto 484/2000, art. 1º): 30 horas mensuales y 200 anuales sin autorización
//     administrativa previa. Sigue vigente y también le corre al banco de horas: la hora extra
//     existe antes de que se decida cómo se compensa.
//   · Banco de horas (art. 197 bis, texto del art. 42 de la Ley 27.802): la norma NO dice si el
//     franco compensatorio es de una hora o de una hora y media por cada hora extra. Sólo exige que
//     el régimen asegure «en todo momento la protección, beneficio e interés del trabajador». Por
//     eso se devuelven las DOS lecturas —1:1 y con el recargo del art. 201— en vez de fingir que la
//     discusión está cerrada. La misma regla de honestidad que ya usa /tiempo-parcial.
//   · Aportes: las horas extras son remuneración, así que va el 17% (11% SIPA + 3% obra social +
//     3% PAMI). Y como el aguinaldo es el 50% de la MEJOR remuneración mensual del semestre
//     (art. 122 LCT), si el mes con extras resulta el mejor, la mitad de esas extras se cobra otra
//     vez en el SAC. Ese arrastre no lo muestra ninguna calculadora.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoHorasExtras = {
  /** Horas mensuales equivalentes a la jornada declarada (jornada × 52/12). */
  horasMensuales: number;
  /** Valor de la hora normal con el divisor promedio. */
  valorHora: number;
  /**
   * Valor de la hora con el divisor 200 que usan muchas liquidaciones. Sólo tiene sentido para la
   * jornada de 48 horas: en cualquier otra es null.
   */
  valorHoraDivisor200: number | null;
  /** Diferencia por hora entre los dos divisores (positiva = el 200 paga más). */
  diferenciaPorDivisor: number;
  /** Horas extras cargadas. */
  horasComunes: number;
  horasAgravadas: number;
  totalHoras: number;
  /** Importe de cada tramo, ya con el recargo del art. 201. */
  importeComunes: number;
  importeAgravadas: number;
  /** Lo que suman las extras del mes, bruto. */
  totalBruto: number;
  /** Lo que valdrían esas mismas horas sin ningún recargo (para ver cuánto pesa el art. 201). */
  totalSinRecargo: number;
  /** Cuánto agrega el recargo. */
  aporteDelRecargo: number;
  /** El mismo total, calculado con el divisor 200 (null si la jornada no es de 48). */
  totalBrutoDivisor200: number | null;
  aportes: { jubilacion: number; obraSocial: number; pami: number; total: number };
  /** Lo que queda en el bolsillo por las extras. */
  neto: number;
  /** Arrastre al aguinaldo si este resulta el mejor mes del semestre (art. 122 LCT). */
  impactoAguinaldo: number;
  banco: {
    /** Francos si se compensa hora por hora. */
    horasSimple: number;
    /** Francos si el franco arrastra el recargo del art. 201. */
    horasConRecargo: number;
    /** Diferencia entre las dos lecturas, en horas. */
    diferencia: number;
    /** Esa diferencia valuada en plata. */
    diferenciaEnPesos: number;
  };
  topes: {
    mensual: number;
    anual: number;
    /** Horas que todavía entran este mes antes de tocar el tope. */
    margenMensual: number;
    /** Horas que todavía entran en el año, contando las ya hechas. */
    margenAnual: number;
    superaMensual: boolean;
    superaAnual: boolean;
  };
  avisos: Aviso[];
};

const redondearHoras = (n: number) => Math.round(n * 100) / 100;

export function calcularHorasExtras(params: {
  /** Remuneración mensual normal y habitual, bruta. */
  sueldoMensual: number;
  /** Jornada semanal en horas (la legal son 48; el convenio puede fijar menos). */
  jornadaSemanal: number;
  /** Horas extras del mes en días comunes (recargo 50%). */
  horasComunes: number;
  /** Horas extras del mes en sábado después de las 13, domingo o feriado (recargo 100%). */
  horasAgravadas: number;
  /** Horas extras ya hechas en lo que va del año calendario, sin contar las de este mes. */
  horasAcumuladasAnio?: number;
}): ResultadoHorasExtras {
  const sueldo = Math.max(0, params.sueldoMensual || 0);
  const jornada = Math.max(1, params.jornadaSemanal || JORNADA_LEGAL_SEMANAL);
  const horasComunes = Math.max(0, params.horasComunes || 0);
  const horasAgravadas = Math.max(0, params.horasAgravadas || 0);
  const acumuladas = Math.max(0, params.horasAcumuladasAnio || 0);

  const horasMensuales = jornada * SEMANAS_POR_MES;
  const valorHora = sueldo / horasMensuales;

  const esJornadaLegal = jornada === JORNADA_LEGAL_SEMANAL;
  const valorHoraDivisor200 = esJornadaLegal ? sueldo / DIVISOR_USUAL_48 : null;
  const diferenciaPorDivisor =
    valorHoraDivisor200 === null ? 0 : valorHoraDivisor200 - valorHora;

  const importeComunes = horasComunes * valorHora * (1 + RECARGOS.comun);
  const importeAgravadas = horasAgravadas * valorHora * (1 + RECARGOS.agravado);
  const totalBruto = importeComunes + importeAgravadas;

  const totalHoras = horasComunes + horasAgravadas;
  const totalSinRecargo = totalHoras * valorHora;
  const aporteDelRecargo = totalBruto - totalSinRecargo;

  const totalBrutoDivisor200 =
    valorHoraDivisor200 === null
      ? null
      : horasComunes * valorHoraDivisor200 * (1 + RECARGOS.comun) +
        horasAgravadas * valorHoraDivisor200 * (1 + RECARGOS.agravado);

  const jubilacion = totalBruto * APORTES.jubilacion;
  const obraSocial = totalBruto * APORTES.obraSocial;
  const pami = totalBruto * APORTES.pami;
  const totalAportes = jubilacion + obraSocial + pami;
  const neto = totalBruto - totalAportes;

  // Art. 122 LCT: el SAC es el 50% de la mayor remuneración mensual devengada del semestre. Si el
  // mes con extras es el mejor, la mitad de esas extras vuelve a cobrarse en el aguinaldo.
  const impactoAguinaldo = totalBruto / 2;

  // Banco de horas: la norma no fija la equivalencia. Las dos lecturas posibles.
  const horasSimple = totalHoras;
  const horasConRecargo =
    horasComunes * (1 + RECARGOS.comun) + horasAgravadas * (1 + RECARGOS.agravado);

  const margenMensual = TOPES_DECRETO_484.mensual - totalHoras;
  const margenAnual = TOPES_DECRETO_484.anual - (acumuladas + totalHoras);

  const avisos: Aviso[] = [];

  if (sueldo <= 0 || totalHoras <= 0) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Cargá tu remuneración mensual bruta y las horas extras del mes para ver el cálculo completo.",
    });
  }

  if (margenMensual < 0) {
    avisos.push({
      tono: "bloqueante",
      texto: `Con ${redondearHoras(totalHoras)} horas extras en el mes se supera el tope de ${
        TOPES_DECRETO_484.mensual
      } horas mensuales del artículo 1º del ${TOPES_DECRETO_484.norma}. Ese tope no lo tocó la reforma de 2026: por encima hace falta autorización administrativa. Las horas trabajadas por encima del tope igual se pagan (el propio art. 201 dice «medie o no autorización del organismo administrativo competente»), pero el exceso es una infracción del empleador, no una deuda que se le perdone.`,
    });
  } else if (totalHoras > 0) {
    avisos.push({
      tono: "ok",
      texto: `Quedan ${redondearHoras(margenMensual)} horas extras antes de tocar el tope mensual de ${
        TOPES_DECRETO_484.mensual
      } (${TOPES_DECRETO_484.norma}).`,
    });
  }

  if (margenAnual < 0) {
    avisos.push({
      tono: "bloqueante",
      texto: `Sumando las ${redondearHoras(acumuladas)} horas ya hechas este año, se pasa el tope anual de ${
        TOPES_DECRETO_484.anual
      } horas del ${TOPES_DECRETO_484.norma}. Es el segundo tope, independiente del mensual: se puede estar dentro de las 30 de un mes y aun así haber excedido el año.`,
    });
  }

  if (totalHoras > 0) {
    avisos.push({
      tono: "atencion",
      texto: `Desde el 6 de marzo de 2026 estas horas pueden compensarse con francos en vez de pagarse, pero sólo si hay un acuerdo escrito con los cinco requisitos del art. 197 bis. Antes de esa fecha, el banco de horas sólo podía nacer de un convenio colectivo: uno a uno con el empleador no era posible.`,
    });
    avisos.push({
      tono: "atencion",
      texto: `Cuántas horas de franco corresponden por cada hora extra no lo dice la ley. Si el franco fuera hora por hora, el trabajador pierde el recargo del art. 201, que es la única razón por la que la hora extra vale más. El artículo exige que el régimen asegure «en todo momento la protección, beneficio e interés del trabajador». Por eso acá están los dos números: ${redondearHoras(
        horasSimple,
      )} horas de franco en la lectura 1:1 y ${redondearHoras(
        horasConRecargo,
      )} si el franco arrastra el recargo.`,
    });
  }

  avisos.push({
    tono: "ok",
    texto:
      "No estás obligado a hacerlas. El art. 203 sólo obliga en casos de peligro, accidente ocurrido o inminente, fuerza mayor o exigencias excepcionales; y el nuevo art. 197 bis exige que el acuerdo de compensación consigne expresamente «la naturaleza voluntaria de la prestación de horas extras».",
  });

  avisos.push({
    tono: "atencion",
    texto: `Los descansos mínimos no se negocian: ${DESCANSOS_MINIMOS.entreJornadas} horas entre el cese de una jornada y el comienzo de la otra, y ${DESCANSOS_MINIMOS.semanal} horas de descanso semanal. El art. 198, con el texto de la Ley 27.802, los escribió con número por primera vez en el articulado, y el art. 197 bis manda respetarlos aunque haya acuerdo.`,
  });

  if (esJornadaLegal) {
    avisos.push({
      tono: "atencion",
      texto: `El divisor del valor hora no está en ninguna ley. Acá se usa el promedio real (${JORNADA_LEGAL_SEMANAL} × 52/12 = ${redondearHoras(
        horasMensuales,
      )} horas por mes); muchas liquidaciones y convenios usan ${DIVISOR_USUAL_48}, que da una hora más cara. Si tu recibo o tu convenio fijan un divisor, ese es el que manda: el número de acá es para controlar, no para reemplazarlo.`,
    });
  } else {
    avisos.push({
      tono: "atencion",
      texto: `Con una jornada de ${jornada} horas semanales, el valor hora se calcula sobre ${redondearHoras(
        horasMensuales,
      )} horas mensuales (${jornada} × 52/12). El divisor no es un número legal: si tu convenio fija otro, manda el del convenio.`,
    });
  }

  if (totalBruto > 0) {
    avisos.push({
      tono: "ok",
      texto:
        "Las horas extras son remuneración: pagan el 17% de aportes y entran en la base del aguinaldo, que es el 50% de la mejor remuneración mensual del semestre (art. 122 LCT). Si este resulta tu mejor mes, la mitad de estas extras se vuelve a cobrar en el SAC.",
    });
  }

  return {
    horasMensuales,
    valorHora,
    valorHoraDivisor200,
    diferenciaPorDivisor,
    horasComunes,
    horasAgravadas,
    totalHoras,
    importeComunes,
    importeAgravadas,
    totalBruto,
    totalSinRecargo,
    aporteDelRecargo,
    totalBrutoDivisor200,
    aportes: { jubilacion, obraSocial, pami, total: totalAportes },
    neto,
    impactoAguinaldo,
    banco: {
      horasSimple,
      horasConRecargo,
      diferencia: horasConRecargo - horasSimple,
      diferenciaEnPesos: (horasConRecargo - horasSimple) * valorHora,
    },
    topes: {
      mensual: TOPES_DECRETO_484.mensual,
      anual: TOPES_DECRETO_484.anual,
      margenMensual,
      margenAnual,
      superaMensual: margenMensual < 0,
      superaAnual: margenAnual < 0,
    },
    avisos,
  };
}
