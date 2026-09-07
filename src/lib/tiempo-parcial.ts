import { APORTES } from "@/data/sueldo";
import {
  JORNADA_LEGAL_SEMANAL,
  RECARGOS,
  SEMANAS_POR_MES,
  TOPE_ANTERIOR,
} from "@/data/tiempo-parcial";

// Qué se cobra en un contrato a tiempo parcial con el art. 92 ter VIGENTE (texto del art. 27 de la
// Ley 27.802) y qué se habría cobrado con el texto anterior (Ley 26.474). No se inventa ningún
// monto: todo sale de la proporción que fija el inciso 1 y de reglas que ya viven en el repo.
//
//   · Piso legal del sueldo (inc. 1): la remuneración no puede ser inferior a la PROPORCIONAL de un
//     trabajador de tiempo completo de la misma categoría → sueldo completo × (horas pactadas /
//     jornada de la actividad). Es una proporción pura: no hace falta ningún divisor de valor hora.
//   · Valor de la hora: sueldo de jornada completa / (jornada semanal × 52/12). El divisor es
//     aritmética, no un número legal — por eso la página lo muestra y el convenio puede fijar otro.
//   · Horas suplementarias (inc. 2, permitidas desde el 6/3/2026): el art. 201 manda un recargo del
//     50% sobre el salario habitual en días comunes y del 100% los sábados después de las 13, los
//     domingos y los feriados, y usa exactamente el mismo término —"horas suplementarias"— que el
//     nuevo 92 ter. Como no hay reglamentación ni jurisprudencia todavía sobre las horas que van
//     entre la jornada pactada y la legal, el cálculo devuelve LAS DOS lecturas (valor simple y con
//     recargo) en vez de fingir que la discusión está cerrada.
//   · Aportes: 11% SIPA + 3% PAMI en proporción a la remuneración (inc. 3), y 3% de obra social
//     sobre el sueldo de un trabajador de TIEMPO COMPLETO de la categoría (inc. 4, que la reforma
//     no tocó). Ese es el número que no publica nadie.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoTiempoParcial = {
  /** Proporción de la jornada de la actividad que se pactó (0 a 1). */
  proporcion: number;
  /** El contrato encaja en la figura del art. 92 ter (jornada inferior a la de la actividad). */
  esTiempoParcial: boolean;
  /** Horas mensuales equivalentes a la jornada completa de la actividad. */
  horasMensualesJornada: number;
  /** Horas mensuales pactadas. */
  horasMensualesPactadas: number;
  /** Valor de la hora normal, derivado del sueldo de jornada completa. */
  valorHora: number;
  /** Piso legal del inciso 1: la remuneración proporcional. */
  sueldoProporcional: number;
  /** Horas suplementarias que todavía entran antes de tocar la jornada legal, por mes. */
  margenSuplementarias: number;
  /** Lo que se paga por las suplementarias si se les aplica el recargo del art. 201. */
  suplementariasConRecargo: number;
  /** Lo mismo, pero si se pagaran a valor simple (la otra lectura posible). */
  suplementariasSimples: number;
  /** Bruto del mes con recargo (la lectura literal del art. 201). */
  brutoConRecargo: number;
  /** Bruto del mes si las suplementarias se pagaran a valor simple. */
  brutoSimple: number;
  aportes: {
    jubilacion: number;
    pami: number;
    /** 3% sobre el sueldo de jornada COMPLETA (inc. 4). */
    obraSocial: number;
    /** Lo que sería ese 3% si se prorrateara como el resto: sirve para ver el sobrecosto. */
    obraSocialSiFueraProporcional: number;
    total: number;
  };
  /** Neto estimado sobre el bruto con recargo. */
  neto: number;
  /** Qué porcentaje del bruto se lleva el descuento total. */
  pesoAportes: number;
  anterior: {
    /** Con el texto viejo, ¿la jornada pactada superaba los 2/3? */
    superabaDosTercios: boolean;
    /** Lo que el empleador debía pagar con el texto viejo (jornada completa si superaba el tope). */
    sueldoQueCorrespondia: number;
    /** Diferencia contra lo que corresponde hoy. */
    diferencia: number;
    /** Horas semanales que era el tope viejo. */
    topeSemanalViejo: number;
  };
  avisos: Aviso[];
};

export function calcularTiempoParcial(params: {
  /** Sueldo mensual de un trabajador de JORNADA COMPLETA de la misma categoría. */
  sueldoJornadaCompleta: number;
  /** Jornada semanal completa de la actividad, en horas. */
  jornadaActividad: number;
  /** Horas semanales pactadas en el contrato a tiempo parcial. */
  horasPactadas: number;
  /** Horas suplementarias del mes en días comunes (recargo 50%). */
  suplementariasComunes: number;
  /** Horas suplementarias del mes en sábado después de las 13, domingo o feriado (recargo 100%). */
  suplementariasAgravadas: number;
}): ResultadoTiempoParcial {
  const sueldoCompleto = Math.max(0, params.sueldoJornadaCompleta || 0);
  const jornada = Math.max(1, params.jornadaActividad || JORNADA_LEGAL_SEMANAL);
  const pactadas = Math.max(0, params.horasPactadas || 0);
  const supComunes = Math.max(0, params.suplementariasComunes || 0);
  const supAgravadas = Math.max(0, params.suplementariasAgravadas || 0);

  const proporcion = pactadas / jornada;
  const esTiempoParcial = pactadas > 0 && pactadas < jornada;

  const horasMensualesJornada = jornada * SEMANAS_POR_MES;
  const horasMensualesPactadas = pactadas * SEMANAS_POR_MES;
  const valorHora = horasMensualesJornada > 0 ? sueldoCompleto / horasMensualesJornada : 0;

  const sueldoProporcional = sueldoCompleto * Math.min(proporcion, 1);

  // Techo del inciso 2: la jornada LEGAL (48 semanales), no la convencional.
  const horasMensualesLegales = JORNADA_LEGAL_SEMANAL * SEMANAS_POR_MES;
  const margenSuplementarias = Math.max(0, horasMensualesLegales - horasMensualesPactadas);

  const suplementariasSimples = (supComunes + supAgravadas) * valorHora;
  const suplementariasConRecargo =
    supComunes * valorHora * (1 + RECARGOS.comun) +
    supAgravadas * valorHora * (1 + RECARGOS.agravado);

  const brutoConRecargo = sueldoProporcional + suplementariasConRecargo;
  const brutoSimple = sueldoProporcional + suplementariasSimples;

  const jubilacion = brutoConRecargo * APORTES.jubilacion;
  const pami = brutoConRecargo * APORTES.pami;
  // Inciso 4: el aporte de obra social es el de un trabajador de tiempo completo de la categoría.
  const obraSocial = sueldoCompleto * APORTES.obraSocial;
  const obraSocialSiFueraProporcional = brutoConRecargo * APORTES.obraSocial;
  const totalAportes = jubilacion + pami + obraSocial;

  const neto = brutoConRecargo - totalAportes;
  const pesoAportes = brutoConRecargo > 0 ? totalAportes / brutoConRecargo : 0;

  const topeSemanalViejo = jornada * TOPE_ANTERIOR;
  const superabaDosTercios = pactadas > topeSemanalViejo;
  const sueldoQueCorrespondia = superabaDosTercios ? sueldoCompleto : sueldoProporcional;

  const avisos: Aviso[] = [];

  if (!esTiempoParcial) {
    avisos.push({
      tono: "bloqueante",
      texto:
        pactadas >= jornada
          ? `Con ${pactadas} horas semanales no hay contrato a tiempo parcial: el artículo 92 ter exige que las horas sean inferiores a la jornada legal o convencional de la actividad (${jornada} horas). Es una jornada completa y corresponde el sueldo completo de la categoría.`
          : "Cargá las horas semanales pactadas para ver el cálculo.",
    });
  }

  if (superabaDosTercios && esTiempoParcial) {
    avisos.push({
      tono: "bloqueante",
      texto: `Este es el caso que cambió de raíz: ${pactadas} horas semanales superan las ${topeSemanalViejo.toLocaleString(
        "es-AR",
        { maximumFractionDigits: 1 },
      )} que eran el tope de dos tercios. Hasta el 5 de marzo de 2026 el empleador tenía que pagar la remuneración de jornada COMPLETA por ese solo hecho; desde la reforma, no: se paga la proporcional. Casi toda la información que circula sigue publicando la regla vieja.`,
    });
  }

  if (supComunes + supAgravadas > 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "Hasta el 5 de marzo de 2026 estas horas estaban directamente prohibidas en un contrato a tiempo parcial (salvo el caso del art. 89) y hacerlas obligaba al empleador a pagar el mes completo. Hoy son válidas si son voluntarias.",
    });
  }

  const totalHorasMes = horasMensualesPactadas + supComunes + supAgravadas;
  if (totalHorasMes > horasMensualesLegales) {
    avisos.push({
      tono: "bloqueante",
      texto: `Entre la jornada pactada y las suplementarias se llega a ${totalHorasMes.toLocaleString(
        "es-AR",
        { maximumFractionDigits: 1 },
      )} horas en el mes, por encima de las ${horasMensualesLegales.toLocaleString("es-AR", {
        maximumFractionDigits: 1,
      })} que equivalen a la jornada legal de ${JORNADA_LEGAL_SEMANAL} horas semanales. El inciso 2 lo prohíbe expresamente: en exceso de la jornada legal no se pueden hacer horas extraordinarias, salvo el caso del artículo 89.`,
    });
  }

  if (jornada < JORNADA_LEGAL_SEMANAL && supComunes + supAgravadas > 0) {
    avisos.push({
      tono: "atencion",
      texto: `La jornada de tu actividad (${jornada} horas) es menor que la legal (${JORNADA_LEGAL_SEMANAL}). El artículo pone el techo en la jornada legal, pero tu convenio colectivo puede tener reglas propias sobre las horas que van entre una y otra: si las tiene, mandan las del convenio.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "Cuánto se paga la hora suplementaria de un contrato a tiempo parcial todavía no está resuelto. El artículo 201 manda un recargo del 50% (100% los sábados después de las 13, domingos y feriados) para las «horas suplementarias», que es el mismo término que usa el nuevo 92 ter; pero la reforma es de marzo de 2026 y no hay reglamentación ni jurisprudencia sobre las horas que van entre la jornada pactada y la legal. Por eso acá están los dos números.",
  });

  avisos.push({
    tono: "ok",
    texto: `El aporte de obra social no se prorratea: el inciso 4 dice que es el de un trabajador de tiempo completo de la categoría. Son ${(
      APORTES.obraSocial * 100
    ).toLocaleString("es-AR")}% del sueldo de jornada completa, no de lo que cobrás. La contrapartida es que la cobertura es la misma que la de un trabajador de jornada entera.`,
  });

  avisos.push({
    tono: "atencion",
    texto:
      "La reforma no es retroactiva: rige desde el 6 de marzo de 2026, «a partir de su publicación en el Boletín Oficial». Los períodos trabajados antes se siguen rigiendo por el texto anterior, con su tope de dos tercios y su sanción.",
  });

  return {
    proporcion,
    esTiempoParcial,
    horasMensualesJornada,
    horasMensualesPactadas,
    valorHora,
    sueldoProporcional,
    margenSuplementarias,
    suplementariasConRecargo,
    suplementariasSimples,
    brutoConRecargo,
    brutoSimple,
    aportes: {
      jubilacion,
      pami,
      obraSocial,
      obraSocialSiFueraProporcional,
      total: totalAportes,
    },
    neto,
    pesoAportes,
    anterior: {
      superabaDosTercios,
      sueldoQueCorrespondia,
      diferencia: sueldoQueCorrespondia - sueldoProporcional,
      topeSemanalViejo,
    },
    avisos,
  };
}
