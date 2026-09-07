import {
  MESES_PERIODO_PRUEBA_AGRARIO,
  MESES_PERIODO_PRUEBA_LCT,
  MESES_PISO_ART22,
  PORCENTAJE_SUSTITUTIVA_VACACIONES,
} from "@/data/trabajo-agrario";
import {
  antiguedadEntre,
  calcularIndemnizacion,
  nucleoArt245,
  type Antiguedad,
  type NucleoArt245,
  type ResultadoIndemnizacion,
} from "@/lib/indemnizacion";

// Extinción del contrato de trabajo agrario (Ley 26.727, texto según la Ley 27.802): qué cobra hoy
// un trabajador rural despedido, según sea permanente de prestación continua o temporario.
//
// LOS TRES NÚMEROS QUE ESTA PÁGINA PONE EN PESOS, y de dónde sale cada uno:
//
//   1. **Período de prueba de OCHO meses** (art. 16, texto del art. 113 de la Ley 27.802). No sale
//      del art. 92 bis de la LCT: la ley agraria lo escribe ella misma, y lo fija dos meses por
//      encima del piso urbano. La consecuencia práctica es la que casi nadie publica: un despido
//      en el mes 7 indemniza en la ciudad y NO indemniza en el campo. La calculadora avisa
//      explícitamente cuando el caso cae en esa franja de dos meses.
//   2. **Piso de DOS meses de sueldo** para la indemnización por antigüedad del permanente
//      (art. 22, INTACTO). Es el doble del piso del art. 245 de la LCT, y el artículo lo manda
//      calcular «tomando como base la mejor remuneración mensual, normal y habitual» — sin
//      mencionar el tope de convenio. Por eso el piso se calcula acá sobre la remuneración REAL,
//      no sobre la base topeada.
//   3. **10% de las remuneraciones devengadas** como indemnización sustitutiva de vacaciones del
//      temporario (art. 20, INTACTO).
//
// EL ART. 245 NO SE REIMPLEMENTA (regla de s85): sale de `nucleoArt245`, el mismo núcleo que usan
// /indemnizacion, /indemnizacion-por-fallecimiento y /despido-plazo-fijo. Dos páginas de
// calcular.ar no pueden publicar dos importes distintos para el mismo sueldo y la misma antigüedad.
//
// EL PERÍODO DE PRUEBA SE APAGA Y SE VUELVE A ENCENDER A MANO: se llama a `calcularIndemnizacion`
// con `sinPeriodoPrueba: true` —porque su período de prueba es el de seis meses del art. 92 bis, y
// acá son ocho— y después se anulan a mano los rubros que el período de prueba agrario excluye.
// Es la única forma de no duplicar la liquidación final ni el art. 233.
//
// LO QUE NO SE CALCULA, A PROPÓSITO: los daños y perjuicios del derecho común del art. 21
// derogado. No tenían fórmula legal —los fijaba el juez— y publicar un número sería fabricar un
// dato. Lo que sí es aritmética verificable, y es lo que se muestra, es la indemnización por
// antigüedad que el trabajador de temporada habría cobrado como permanente discontinuo, con la
// antigüedad computada «en función de los períodos efectivamente trabajados» que ordenaba ese
// mismo artículo.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ModalidadRural = "permanente" | "temporario";

export type ResultadoRuralPermanente = {
  modalidad: "permanente";
  antiguedad: Antiguedad;
  /** Período de prueba del art. 16: ocho meses, no seis. */
  enPeriodoPrueba: boolean;
  /** La franja de dos meses en la que un empleo urbano ya indemnizaría y el rural todavía no. */
  enLaFranjaDeLosDosMeses: boolean;
  /** Art. 245 de la LCT, sin el piso agrario. */
  art245: NucleoArt245;
  /** Piso del art. 22 de la Ley 26.727: dos meses de la mejor remuneración, sin tope de convenio. */
  pisoArt22: number;
  /** Si el piso agrario es el que manda (art. 245 quedó por debajo). */
  pisoAplicado: boolean;
  /** Lo que efectivamente se cobra por antigüedad: el mayor de los dos. */
  indemnizacionAntiguedad: number;
  /** Lo que agrega el piso del art. 22 por encima del art. 245. */
  loQueAgregaElPiso: number;
  preaviso: ResultadoIndemnizacion["preaviso"];
  integracion: ResultadoIndemnizacion["integracion"];
  liquidacionFinal: {
    sac: ResultadoIndemnizacion["sacProporcional"];
    vacaciones: ResultadoIndemnizacion["vacaciones"];
    total: number;
  };
  totalIndemnizatorio: number;
  totalGeneral: number;
  avisos: Aviso[];
};

export type ResultadoRuralTemporario = {
  modalidad: "temporario";
  antiguedad: Antiguedad;
  /** Art. 20: 10% del total de remuneraciones devengadas en el ciclo. */
  sustitutivaVacaciones: number;
  /** SAC proporcional del semestre en el que termina el ciclo (arts. 121 y 123 de la LCT). */
  sac: ResultadoIndemnizacion["sacProporcional"];
  /** Lo que cobra hoy al terminar la temporada. */
  totalGeneral: number;
  /**
   * Lo que le habría reconocido el art. 18 derogado si venía de varias temporadas: la
   * indemnización por antigüedad del art. 245 sobre los períodos efectivamente trabajados, con el
   * piso de dos meses del art. 22. `null` cuando el usuario no declara temporadas anteriores.
   */
  loQueReconociaElArt18: {
    mesesEfectivos: number;
    antiguedad: Antiguedad;
    art245: NucleoArt245;
    pisoArt22: number;
    monto: number;
  } | null;
  avisos: Aviso[];
};

export type ResultadoRural = ResultadoRuralPermanente | ResultadoRuralTemporario;

/** Arma una `Antiguedad` a partir de meses efectivamente trabajados (art. 21 derogado). */
function antiguedadDesdeMeses(mesesEfectivos: number): Antiguedad {
  const totalMeses = Math.max(0, Math.floor(mesesEfectivos));
  return {
    anios: Math.floor(totalMeses / 12),
    meses: totalMeses % 12,
    dias: 0,
    totalMeses,
  };
}

function semestreDe(iso: string): string {
  const [anio, mes] = iso.split("-");
  return `${anio}-${Number(mes) <= 6 ? "1" : "2"}`;
}

export function calcularDespidoRural(params: {
  modalidad: ModalidadRural;
  /** Inicio de la relación (o de la temporada, si es temporario). */
  ingresoISO: string;
  /** Fecha del despido o de la conclusión del ciclo. */
  egresoISO: string;
  /** Mejor remuneración mensual, normal y habitual (bruta). */
  mejorRemuneracion: number;
  /** Tope indemnizatorio del convenio, si se conoce. Sólo afecta al art. 245, nunca al piso del art. 22. */
  topeCCT?: number;
  /** Total de remuneraciones devengadas en el ciclo — sólo temporario (art. 20). */
  remuneracionesDevengadas?: number;
  /** Meses efectivamente trabajados sumando todas las temporadas — sólo temporario. */
  mesesEfectivos?: number;
}): ResultadoRural | null {
  const {
    modalidad,
    ingresoISO,
    egresoISO,
    mejorRemuneracion,
    topeCCT,
    remuneracionesDevengadas,
    mesesEfectivos,
  } = params;

  if (!ingresoISO || !egresoISO) return null;
  if (egresoISO <= ingresoISO) return null;
  if (!(mejorRemuneracion > 0)) return null;

  const antiguedad = antiguedadEntre(ingresoISO, egresoISO);

  // La liquidación base sale del mismo motor que /indemnizacion, con el período de prueba del
  // art. 92 bis apagado: el que rige acá es el de ocho meses del art. 16 de la Ley 26.727.
  const base = calcularIndemnizacion({
    ingresoISO,
    despidoISO: egresoISO,
    mejorRemuneracion,
    preavisoOtorgado: false,
    topeCCT,
    sinPeriodoPrueba: true,
  });
  if (!base) return null;

  if (modalidad === "temporario") {
    const devengadas = remuneracionesDevengadas && remuneracionesDevengadas > 0
      ? remuneracionesDevengadas
      : 0;
    const sustitutivaVacaciones = devengadas * PORCENTAJE_SUSTITUTIVA_VACACIONES;
    const avisos: Aviso[] = [];

    avisos.push({
      tono: "atencion",
      texto:
        "Al terminar la temporada, el contrato temporario se extingue por conclusión de la tarea: no hay indemnización por antigüedad ni preaviso. Lo que sí corresponde siempre es el SAC proporcional y el 10% del artículo 20 en concepto de vacaciones no gozadas.",
    });

    if (devengadas <= 0) {
      avisos.push({
        tono: "bloqueante",
        texto:
          "Cargá el total de remuneraciones devengadas en la temporada: el artículo 20 calcula la indemnización sustitutiva de vacaciones sobre ese total, no sobre el último sueldo.",
      });
    }

    if (semestreDe(ingresoISO) !== semestreDe(egresoISO)) {
      avisos.push({
        tono: "atencion",
        texto:
          "Tu temporada cruza el 30 de junio o el 31 de diciembre. El SAC se liquida por semestre (artículos 121 y 123 de la LCT), así que el importe de abajo es el del semestre en el que terminó el ciclo: el del semestre anterior tuvo que haberse pagado en su momento.",
      });
    }

    let loQueReconociaElArt18: ResultadoRuralTemporario["loQueReconociaElArt18"] = null;
    if (mesesEfectivos && mesesEfectivos > 0) {
      const antFicta = antiguedadDesdeMeses(mesesEfectivos);
      const art245 = nucleoArt245({
        ant: antFicta,
        mejorRemuneracion,
        enPeriodoPrueba: false,
        topeCCT,
      });
      const pisoArt22 = MESES_PISO_ART22 * mejorRemuneracion;
      loQueReconociaElArt18 = {
        mesesEfectivos: antFicta.totalMeses,
        antiguedad: antFicta,
        art245,
        pisoArt22,
        monto: Math.max(art245.monto, pisoArt22),
      };

      avisos.push({
        tono: "bloqueante",
        texto: `Hasta el 6 de marzo de 2026, el artículo 18 te consideraba «trabajador permanente discontinuo» por haber vuelto con el mismo empleador, y el artículo 21 computaba tu antigüedad «en función de los períodos efectivamente trabajados». Con esos ${antFicta.totalMeses} mes(es) habrías cobrado indemnización por antigüedad. El artículo 206 de la Ley 27.802 derogó los dos artículos, y el artículo 112 le agregó al artículo 17 que los sucesivos contratos «no modificará[n] la naturaleza temporaria del vínculo»: hoy seguís siendo temporario, temporada tras temporada.`,
      });
    }

    return {
      modalidad: "temporario",
      antiguedad,
      sustitutivaVacaciones,
      sac: base.sacProporcional,
      totalGeneral: base.sacProporcional.monto + sustitutivaVacaciones,
      loQueReconociaElArt18,
      avisos,
    };
  }

  // ── Permanente de prestación continua ──────────────────────────────────────────────────────
  const enPeriodoPrueba = antiguedad.totalMeses < MESES_PERIODO_PRUEBA_AGRARIO;
  const enLaFranjaDeLosDosMeses =
    antiguedad.totalMeses >= MESES_PERIODO_PRUEBA_LCT &&
    antiguedad.totalMeses < MESES_PERIODO_PRUEBA_AGRARIO;

  const art245 = nucleoArt245({ ant: antiguedad, mejorRemuneracion, enPeriodoPrueba, topeCCT });

  // Art. 22: sobre la mejor remuneración REAL. El artículo no menciona el tope de convenio.
  const pisoArt22 = enPeriodoPrueba ? 0 : MESES_PISO_ART22 * mejorRemuneracion;
  const pisoAplicado = !enPeriodoPrueba && pisoArt22 > art245.monto;
  const indemnizacionAntiguedad = enPeriodoPrueba ? 0 : Math.max(art245.monto, pisoArt22);

  // En período de prueba no hay preaviso (art. 231 inc. b), texto del art. 48 de la Ley 27.802)
  // ni integración del mes (art. 233, que la excluye expresamente).
  const preaviso = enPeriodoPrueba ? null : base.preaviso;
  const integracion = enPeriodoPrueba ? null : base.integracion;

  const liquidacionFinal = {
    sac: base.sacProporcional,
    vacaciones: base.vacaciones,
    total: base.sacProporcional.monto + base.vacaciones.monto + base.vacaciones.sac,
  };

  const totalIndemnizatorio =
    indemnizacionAntiguedad +
    (preaviso ? preaviso.monto + preaviso.sac : 0) +
    (integracion ? integracion.monto + integracion.sac : 0);

  const avisos: Aviso[] = [];

  if (enLaFranjaDeLosDosMeses) {
    avisos.push({
      tono: "bloqueante",
      texto: `Estás en la franja que abrió la reforma. Con ${antiguedad.totalMeses} meses de antigüedad, en un empleo urbano ya habrías salido del período de prueba —el artículo 92 bis de la LCT lo fija en ${MESES_PERIODO_PRUEBA_LCT} meses— y cobrarías indemnización por antigüedad y preaviso. En el campo no: desde el 6 de marzo de 2026 el artículo 16 de la Ley 26.727 fija el período de prueba rural en ${MESES_PERIODO_PRUEBA_AGRARIO} meses. Sólo te corresponde la liquidación final.`,
    });
  } else if (enPeriodoPrueba) {
    avisos.push({
      tono: "atencion",
      texto: `Con ${antiguedad.totalMeses} mes(es) de antigüedad estás dentro del período de prueba de ${MESES_PERIODO_PRUEBA_AGRARIO} meses del artículo 16. No corresponde indemnización por antigüedad, ni preaviso, ni integración del mes de despido: sólo el SAC proporcional y las vacaciones proporcionales, que se devengan igual.`,
    });
  } else {
    avisos.push({
      tono: "ok",
      texto: `Superaste los ${MESES_PERIODO_PRUEBA_AGRARIO} meses del período de prueba rural, así que el despido sin causa indemniza. La extinción se rige por el Título XII de la LCT, al que remite el propio artículo 16 de la Ley 26.727.`,
    });
  }

  if (pisoAplicado) {
    avisos.push({
      tono: "ok",
      texto: `Acá manda el piso del artículo 22 de la Ley 26.727, no el artículo 245 de la LCT: el trabajador rural permanente «en ningún caso» puede cobrar menos de ${MESES_PISO_ART22} meses de sueldo por antigüedad. Es el doble del piso de un mes que fija la LCT para el resto de los trabajadores, y ese artículo la reforma no lo tocó.`,
    });
  }

  if (!enPeriodoPrueba && art245.topeAplicado) {
    avisos.push({
      tono: "atencion",
      texto: `El tope de convenio recortó la base del artículo 245, pero no toca el piso del artículo 22: ese artículo manda calcular los ${MESES_PISO_ART22} meses «tomando como base la mejor remuneración mensual, normal y habitual», sin mencionar tope alguno. Por eso el piso de abajo está calculado sobre tu remuneración real.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "La Ley 26.727 no tiene preaviso propio: la palabra no aparece en su texto. El preaviso, la integración del mes y el artículo 245 salen de la Ley de Contrato de Trabajo, por el reenvío del artículo 16 al Título XII y por el artículo 2° inciso b).",
  });

  return {
    modalidad: "permanente",
    antiguedad,
    enPeriodoPrueba,
    enLaFranjaDeLosDosMeses,
    art245,
    pisoArt22,
    pisoAplicado,
    indemnizacionAntiguedad,
    loQueAgregaElPiso: Math.max(0, indemnizacionAntiguedad - art245.monto),
    preaviso,
    integracion,
    liquidacionFinal,
    totalIndemnizatorio,
    totalGeneral: totalIndemnizatorio + liquidacionFinal.total,
    avisos,
  };
}
