import { APORTES } from "@/data/sueldo";
import {
  DIAS_TRABAJO_POR_DIA_DESCANSO,
  DIVISOR_DIA,
  DIVISOR_VACACIONES,
  PERIODO_PRUEBA,
  PREAVISO_ANTERIOR_DIAS,
  VIGENCIA_REFORMA_ISO,
} from "@/data/periodo-prueba";
import { diasInclusivos } from "@/lib/aguinaldo";
import {
  diasDelMesTrabajados,
  mesesCompletos,
  semestreDe,
} from "@/lib/liquidacion";
import { diasHabiles } from "@/lib/vacaciones";

// Liquidación final de un despido DENTRO del período de prueba, con el texto vigente.
//
// El número que cambió: hasta el 5/3/2026, el art. 231 inc. b) daba QUINCE días de preaviso al
// trabajador en período de prueba, y omitirlo obligaba a pagar la indemnización sustitutiva del
// art. 232 (quince días de sueldo). El art. 48 de la Ley 27.802 borró esa mención de la escala y
// la reemplazó por su contraria: «Para el supuesto en que el trabajador se encuentre en período de
// prueba no se requerirá la obligación de preaviso». Por eso el cálculo se hace DOS veces —con el
// texto vigente y con el anterior— y la diferencia se muestra: es exactamente lo que se perdió, y
// sigue siendo lo que corresponde para un despido ocurrido antes del 6/3/2026 (la reforma no es
// retroactiva).
//
// Lo que sí se cobra, contra el prejuicio de que «en el período de prueba no te dan nada»: el
// art. 92 bis (vi) manda computar el período de prueba como tiempo de servicio a todos los efectos
// laborales y de la seguridad social, y los arts. 123 y 156 dicen «por cualquier causa». Entonces:
//   · Días trabajados del mes (art. 74), a razón de sueldo ÷ 30.
//   · SAC proporcional (art. 123): la doceava parte de lo devengado en la fracción del semestre.
//     Se calcula como sueldo ÷ 2 × días del semestre trabajados ÷ días del semestre, que es la
//     misma fórmula que usa /aguinaldo — dos páginas no pueden publicar dos importes distintos.
//   · Vacaciones proporcionales: con menos de la mitad de los días hábiles del año trabajados
//     —que es siempre el caso dentro de los seis meses— rige la licencia proporcional del art. 153
//     (un día por cada veinte de trabajo efectivo), pagada al valor del art. 155 (sueldo ÷ 25).
//   · SAC sobre esas vacaciones: la doceava parte del renglón anterior.
//
// Lo que NO se cobra: indemnización por antigüedad (art. 92 bis), preaviso (art. 231 vigente) e
// integración del mes de despido (art. 233, que la excluye expresamente desde 2004).

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoPeriodoPrueba = {
  /** Meses completos entre el ingreso y el egreso. */
  mesesTrabajados: number;
  /** Días corridos trabajados, ambos extremos incluidos. */
  diasTrabajadosTotales: number;
  /** Tope del período de prueba aplicado (6, 8 o 12 meses según lo elegido). */
  topeMeses: number;
  /** true si el egreso cae dentro del período de prueba. */
  dentroDePrueba: boolean;
  /** true si el despido ocurrió el 6/3/2026 o después (rige el texto nuevo). */
  rigeTextoNuevo: boolean;
  /** Valor del día normal (sueldo ÷ 30). */
  valorDia: number;
  /** Valor del día de vacaciones (sueldo ÷ 25, art. 155). */
  valorDiaVacaciones: number;
  /** Días del mes del despido efectivamente trabajados. */
  diasDelMes: number;
  /** Importe de esos días. */
  sueldoDelMes: number;
  sac: { diasSemestre: number; diasTrabajadosSemestre: number; importe: number };
  vacaciones: {
    diasHabilesTrabajados: number;
    dias: number;
    importe: number;
    /** SAC sobre las vacaciones proporcionales. */
    sacSobreVacaciones: number;
  };
  /** Subtotal sin preaviso: los conceptos que se cobran con cualquiera de los dos textos. */
  totalSinPreaviso: number;
  /** Preaviso que efectivamente corresponde según la fecha del despido (0 desde el 6/3/2026). */
  preavisoQueCorresponde: number;
  /** Lo que hay que cobrar en total, con la norma que rige por fecha. */
  totalACobrar: number;
  /** Cuánto habría sido el mismo caso con el texto anterior (subtotal + 15 días). */
  totalTextoAnterior: number;
  /** Los 15 días de sueldo que el art. 48 de la 27.802 borró. */
  diferencia: number;
  aportes: { total: number };
  avisos: Aviso[];
};

/** Meses completos entre dos fechas ISO. */
export function calcularPeriodoPrueba(params: {
  /** Remuneración mensual bruta. */
  sueldoMensual: number;
  /** Fecha de ingreso (ISO). */
  ingresoISO: string;
  /** Fecha de terminación del contrato (ISO). */
  egresoISO: string;
  /** Tope del período de prueba aplicable: 6 (base), 8 o 12 (ampliado por convenio). */
  topeMeses?: number;
}): ResultadoPeriodoPrueba {
  const sueldo = Math.max(0, params.sueldoMensual || 0);
  const ingresoISO = params.ingresoISO;
  const egresoISO = params.egresoISO;
  const topeMeses = params.topeMeses ?? PERIODO_PRUEBA.mesesBase;

  const fechasValidas =
    /^\d{4}-\d{2}-\d{2}$/.test(ingresoISO) &&
    /^\d{4}-\d{2}-\d{2}$/.test(egresoISO) &&
    egresoISO >= ingresoISO;

  const avisos: Aviso[] = [];

  if (!fechasValidas) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Cargá una fecha de ingreso y una de terminación válidas (la salida no puede ser anterior al ingreso).",
    });
  }

  const desde = fechasValidas ? ingresoISO : egresoISO;
  const mesesTrabajados = fechasValidas ? mesesCompletos(desde, egresoISO) : 0;
  const diasTrabajadosTotales = fechasValidas ? diasInclusivos(desde, egresoISO) : 0;
  const dentroDePrueba = fechasValidas && mesesTrabajados < topeMeses;
  const rigeTextoNuevo = egresoISO >= VIGENCIA_REFORMA_ISO;

  const valorDia = sueldo / DIVISOR_DIA;
  const valorDiaVacaciones = sueldo / DIVISOR_VACACIONES;

  // 1. Días trabajados del mes del despido.
  const diasDelMes = fechasValidas ? diasDelMesTrabajados(desde, egresoISO) : 0;
  const sueldoDelMes = diasDelMes * valorDia;

  // 2. SAC proporcional (art. 123), con la misma fórmula que /aguinaldo.
  const sem = semestreDe(egresoISO);
  const diasSemestre = diasInclusivos(sem.inicioISO, sem.finISO);
  const inicioComputo = desde > sem.inicioISO ? desde : sem.inicioISO;
  const diasTrabajadosSemestre = fechasValidas
    ? Math.min(diasInclusivos(inicioComputo, egresoISO), diasSemestre)
    : 0;
  const sacImporte = ((sueldo / 2) * diasTrabajadosSemestre) / diasSemestre;

  // 3. Vacaciones proporcionales (arts. 153 y 156): un día cada 20 de trabajo efectivo.
  const diasHabilesTrabajados = fechasValidas ? diasHabiles(desde, egresoISO) : 0;
  const diasVacaciones = Math.floor(diasHabilesTrabajados / DIAS_TRABAJO_POR_DIA_DESCANSO);
  const vacacionesImporte = diasVacaciones * valorDiaVacaciones;
  const sacSobreVacaciones = vacacionesImporte / 12;

  const totalSinPreaviso = sueldoDelMes + sacImporte + vacacionesImporte + sacSobreVacaciones;

  // 4. Lo que cambió: el preaviso de 15 días del texto anterior. Sigue rigiendo para los despidos
  //    ocurridos antes del 6/3/2026 — la reforma no es retroactiva.
  const preavisoAnterior = PREAVISO_ANTERIOR_DIAS * valorDia;
  const preavisoQueCorresponde = rigeTextoNuevo ? 0 : preavisoAnterior;
  const totalACobrar = totalSinPreaviso + preavisoQueCorresponde;
  const totalTextoAnterior = totalSinPreaviso + preavisoAnterior;

  const aportesTotal =
    (sueldoDelMes + sacImporte) *
    (APORTES.jubilacion + APORTES.obraSocial + APORTES.pami);

  if (fechasValidas && !dentroDePrueba) {
    avisos.push({
      tono: "bloqueante",
      texto: `Con ${mesesTrabajados} meses completos, el contrato ya salió del período de prueba de ${topeMeses} meses: corresponde la indemnización por antigüedad del art. 245, el preaviso del art. 231 y la integración del mes. Este cálculo no aplica — usá la calculadora de indemnización por despido.`,
    });
  }

  if (fechasValidas && dentroDePrueba) {
    if (rigeTextoNuevo) {
      avisos.push({
        tono: "bloqueante",
        texto: `El preaviso de ${PREAVISO_ANTERIOR_DIAS} días YA NO CORRESPONDE. El art. 48 de la Ley 27.802 reescribió el inciso b) del art. 231 y le agregó: «Para el supuesto en que el trabajador se encuentre en período de prueba no se requerirá la obligación de preaviso». Antes del 6 de marzo de 2026 eran ${PREAVISO_ANTERIOR_DIAS} días de sueldo, o sea ${preavisoAnterior.toLocaleString(
          "es-AR",
          { style: "currency", currency: "ARS", maximumFractionDigits: 2 },
        )} en tu caso. Casi toda la información que circula sigue publicando la regla vieja.`,
      });
    } else {
      avisos.push({
        tono: "ok",
        texto: `Tu contrato terminó ANTES del 6 de marzo de 2026, así que te rige el texto anterior del art. 231: te corresponden ${PREAVISO_ANTERIOR_DIAS} días de preaviso, o su indemnización sustitutiva (art. 232) si no te lo dieron. La reforma no es retroactiva.`,
      });
    }

    avisos.push({
      tono: "ok",
      texto:
        "Que no te digan que «en el período de prueba no te corresponde nada». El art. 92 bis dice que el período de prueba se computa como tiempo de servicio a todos los efectos laborales y de la seguridad social, y los arts. 123 y 156 hablan de extinción «por cualquier causa»: el aguinaldo proporcional y las vacaciones proporcionales se cobran igual.",
    });

    avisos.push({
      tono: "atencion",
      texto:
        "La integración del mes de despido no corresponde: el art. 233 la excluye expresamente cuando la extinción se produce durante el período de prueba. Eso rige desde 2004 y no lo cambió la reforma.",
    });

    if (diasVacaciones === 0 && diasHabilesTrabajados > 0) {
      avisos.push({
        tono: "atencion",
        texto: `Todavía no se llegó al primer día de vacaciones: el art. 153 da un día por cada ${DIAS_TRABAJO_POR_DIA_DESCANSO} días hábiles de trabajo efectivo, y van ${diasHabilesTrabajados}.`,
      });
    }

    avisos.push({
      tono: "atencion",
      texto:
        "Si el empleador no te registró desde el primer día, el propio art. 92 bis dice que «se considerará que ha renunciado al período de prueba»: en ese caso el despido se liquida como uno común, con indemnización por antigüedad y preaviso. Lo mismo si ya te había contratado antes usando el período de prueba: no se puede usar dos veces con el mismo trabajador.",
    });
  }

  return {
    mesesTrabajados,
    diasTrabajadosTotales,
    topeMeses,
    dentroDePrueba,
    rigeTextoNuevo,
    valorDia,
    valorDiaVacaciones,
    diasDelMes,
    sueldoDelMes,
    sac: { diasSemestre, diasTrabajadosSemestre, importe: sacImporte },
    vacaciones: {
      diasHabilesTrabajados,
      dias: diasVacaciones,
      importe: vacacionesImporte,
      sacSobreVacaciones,
    },
    totalSinPreaviso,
    preavisoQueCorresponde,
    totalACobrar,
    totalTextoAnterior,
    diferencia: preavisoAnterior,
    aportes: { total: aportesTotal },
    avisos,
  };
}
