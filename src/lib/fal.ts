import {
  ALICUOTAS,
  MESES_ANTIGUEDAD_MINIMA,
  PERIODOS_CARENCIA,
  TOPE_COMISION_ANUAL,
} from "@/data/fal";

// Fondo de Asistencia Laboral (Título II de la Ley 27.802 + Decreto 408/2026): cuánto aporta un
// empleador por mes desde el 1/11/2026, desde cuándo el fondo responde y cuánto de una
// indemnización llega a cubrir.
//
// LO QUE ESTA CALCULADORA HACE Y LO QUE NO:
//
//   · **Hace** la aritmética que está escrita en la ley: la alícuota del art. 60 sobre la base de
//     contribuciones patronales, la reducción equivalente del art. 76 (que es lo que convierte al
//     aporte en una detracción y no en un costo nuevo), el corrimiento de la carencia del art. 65
//     con el cómputo del art. 15 del decreto, y el tope de comisión del art. 71 leído como lo
//     define el art. 20 del decreto: global, integral y anual sobre el total de activos.
//
//   · **No hace** —y no puede— la proyección de rendimientos. El fondo se instrumenta como fondo
//     común de inversión o fideicomiso financiero (art. 5 del decreto) y su rendimiento depende del
//     vehículo que elija cada empleador. No hay un número legal, así que acá se acumulan sólo los
//     aportes. Inventar una tasa sería fabricar un dato.
//
// LA REGLA QUE MÁS CAMBIA EL RESULTADO Y CASI NO SE PUBLICA: el art. 76 sólo alcanza a las
// relaciones NO comprendidas en el RIFL. Para un empleador con beneficios del RIFL vigentes, el
// aporte al FAL es plata adicional; para el resto, sale de la contribución patronal que ya pagaba.
// Es una diferencia de 100% del costo, y depende de un solo dato.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type TipoEmpleador = "pyme" | "grande";
export type EscenarioAlicuota = "vigente" | "maxima";

export type ResultadoFal = {
  /** Alícuota aplicada, en %. */
  alicuota: number;
  /** La otra alícuota del mismo tipo de empleador, para contrastar los dos escenarios. */
  alicuotaAlternativa: number;
  contribucionMensual: number;
  contribucionAnual: number;
  /** Reducción de contribuciones patronales del art. 76: igual al aporte, salvo RIFL. */
  reduccionPatronal: number;
  /** Lo que el FAL suma realmente al costo laboral del mes. Cero salvo RIFL. */
  costoNetoMensual: number;
  /** Mes (YYYY-MM) de la primera contribución integrada en ARCA. */
  primerPeriodo: string;
  /** Último período de la carencia (YYYY-MM): el sexto completo y consecutivo. */
  ultimoPeriodoCarencia: string;
  /** Primer mes (YYYY-MM) en que el fondo puede responder por una extinción. */
  desdeCuandoResponde: string;
  /** Aportes acumulados al cerrar la carencia, sin rendimientos. */
  acumuladoEnCarencia: number;
  /** Aportes acumulados a los 12 meses, sin rendimientos. */
  acumuladoAlAnio: number;
  /** Cota superior de la comisión anual (art. 71 y art. 20 del decreto) sobre el acumulado al año. */
  comisionAnualMaxima: number;
  /**
   * El caso concreto: cuánto cubre el fondo de una indemnización del art. 245 (un sueldo por año
   * de antigüedad). `null` si no se cargó el caso.
   */
  caso: {
    indemnizacion: number;
    /** Meses de aporte necesarios para juntar esa indemnización, sin contar rendimientos. */
    mesesParaCubrirla: number;
    /** Porcentaje de la indemnización cubierto por el acumulado al cerrar la carencia. */
    cubiertoEnCarencia: number;
    /** Si el trabajador llega a los 12 meses de registración que exige el art. 58. */
    cumpleAntiguedadMinima: boolean;
  } | null;
  avisos: Aviso[];
};

/** Suma `n` meses a un período "YYYY-MM". */
function sumarMeses(periodo: string, n: number): string {
  const [a, m] = periodo.split("-").map(Number);
  const total = a * 12 + (m - 1) + n;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return `${anio}-${String(mes).padStart(2, "0")}`;
}

const MESES_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

/** "2027-05" → "mayo de 2027". */
export function periodoEnPalabras(periodo: string): string {
  const [a, m] = periodo.split("-").map(Number);
  return `${MESES_ES[m - 1]} de ${a}`;
}

export function calcularFal(params: {
  tipoEmpleador: TipoEmpleador;
  /** Masa salarial mensual bruta que sirve de base a las contribuciones patronales al SIPA. */
  masaSalarialMensual: number;
  escenario: EscenarioAlicuota;
  /** Si las relaciones están alcanzadas por el RIFL: sin reducción del art. 76. */
  enRifl: boolean;
  /** Período "YYYY-MM" de la primera contribución integrada en ARCA. */
  primerPeriodo: string;
  /** Mejor remuneración mensual, normal y habitual de un trabajador (opcional, para el caso). */
  mejorRemuneracion?: number;
  /** Años de antigüedad de ese trabajador (opcional, para el caso). */
  aniosAntiguedad?: number;
}): ResultadoFal | null {
  const {
    tipoEmpleador,
    masaSalarialMensual,
    escenario,
    enRifl,
    primerPeriodo,
    mejorRemuneracion,
    aniosAntiguedad,
  } = params;

  if (!(masaSalarialMensual > 0)) return null;
  if (!/^\d{4}-\d{2}$/.test(primerPeriodo)) return null;

  const alicuota = ALICUOTAS[escenario === "maxima" ? "maximas" : "vigentes"][tipoEmpleador];
  const alicuotaAlternativa =
    ALICUOTAS[escenario === "maxima" ? "vigentes" : "maximas"][tipoEmpleador];

  const contribucionMensual = masaSalarialMensual * (alicuota / 100);
  const contribucionAnual = contribucionMensual * 12;

  // Art. 76 + art. 24 del decreto: la alícuota del FAL se DETRAE de la contribución patronal, salvo
  // que la relación esté alcanzada por el RIFL.
  const reduccionPatronal = enRifl ? 0 : contribucionMensual;
  const costoNetoMensual = contribucionMensual - reduccionPatronal;

  // Art. 65 + art. 15 del decreto: seis períodos completos y consecutivos desde el mes de la
  // primera contribución integrada. El sexto es `primerPeriodo + 5`; el fondo responde desde el
  // siguiente.
  const ultimoPeriodoCarencia = sumarMeses(primerPeriodo, PERIODOS_CARENCIA - 1);
  const desdeCuandoResponde = sumarMeses(primerPeriodo, PERIODOS_CARENCIA);

  const acumuladoEnCarencia = contribucionMensual * PERIODOS_CARENCIA;
  const acumuladoAlAnio = contribucionAnual;
  const comisionAnualMaxima = acumuladoAlAnio * (TOPE_COMISION_ANUAL / 100);

  let caso: ResultadoFal["caso"] = null;
  if (mejorRemuneracion && mejorRemuneracion > 0 && aniosAntiguedad && aniosAntiguedad > 0) {
    // Art. 245: un mes de sueldo por año de antigüedad. Acá se usa la forma simple —años enteros—
    // porque el objetivo es dimensionar la contingencia, no liquidar un despido: para eso está
    // /indemnizacion, que aplica el artículo completo con fracciones y tope de convenio.
    const indemnizacion = mejorRemuneracion * aniosAntiguedad;
    caso = {
      indemnizacion,
      mesesParaCubrirla: indemnizacion / contribucionMensual,
      cubiertoEnCarencia: (acumuladoEnCarencia / indemnizacion) * 100,
      cumpleAntiguedadMinima: aniosAntiguedad * 12 >= MESES_ANTIGUEDAD_MINIMA,
    };
  }

  const avisos: Aviso[] = [];

  if (enRifl) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Marcaste que las relaciones están alcanzadas por el RIFL. El artículo 76 excluye expresamente ese caso de la reducción de contribuciones patronales «mientras persista sus efectos», así que acá el aporte al Fondo SÍ es plata adicional: no se detrae de nada. Es la única situación en la que el FAL aumenta el costo laboral.",
    });
  } else {
    avisos.push({
      tono: "ok",
      texto:
        "El aporte al Fondo no se suma al costo laboral: el artículo 76 da una reducción de contribuciones patronales «equivalente», y el artículo 24 del Decreto 408/2026 explica que se instrumenta detrayendo la alícuota del FAL de la que ya se paga. La plata cambia de destino, no de bolsillo: deja de ir a la seguridad social y va a una cuenta del propio empleador, inembargable y con rendimientos exentos de Ganancias.",
    });
  }

  if (escenario === "maxima") {
    avisos.push({
      tono: "atencion",
      texto: `Estás viendo el escenario del techo (${alicuota}%). No es la alícuota vigente: el segundo párrafo del artículo 60 permite llegar hasta ahí, pero sólo si lo dispone el Poder Ejecutivo «atendiendo al cumplimiento de las metas asociadas a las políticas de equilibrio fiscal» y con la aprobación previa de la Comisión Bicameral de Control de Fondos de la Seguridad Social. Hoy la alícuota que rige es ${alicuotaAlternativa}%.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto: `El fondo no responde durante los primeros ${PERIODOS_CARENCIA} períodos. Con la primera contribución integrada en ${periodoEnPalabras(primerPeriodo)}, la carencia cierra con el período de ${periodoEnPalabras(ultimoPeriodoCarencia)} y el fondo puede empezar a responder por extinciones desde ${periodoEnPalabras(desdeCuandoResponde)}. Hasta entonces, cada indemnización se paga íntegramente del bolsillo del empleador. Y eso pasa siempre: el fondo asiste, no reemplaza.`,
  });

  avisos.push({
    tono: "bloqueante",
    texto:
      "El Fondo no cambia lo que cobra el trabajador. El último párrafo del artículo 58 lo dice sin vueltas: «El presente régimen no modifica, sustituye, ni altera el régimen indemnizatorio», y el artículo 64 agrega que la insuficiencia de la cuenta «no limita, reduce, altera ni condiciona la responsabilidad del empleador por el pago íntegro». El obligado sigue siendo el empleador; la administradora es un tercero ajeno a esa relación (artículo 68).",
  });

  if (caso && !caso.cumpleAntiguedadMinima) {
    avisos.push({
      tono: "bloqueante",
      texto: `Con menos de ${MESES_ANTIGUEDAD_MINIMA} meses de registración no hay cobertura: el artículo 58 la limita a «trabajadores registrados con una antelación no menor a doce (12) meses de la fecha de la extinción». La indemnización se paga igual, pero no se puede pagar con la cuenta del Fondo.`,
    });
  }

  avisos.push({
    tono: "atencion",
    texto:
      "Los importes de arriba son sólo aportes: no incluyen rendimientos. El Fondo se instrumenta como fondo común de inversión o fideicomiso financiero (artículo 5 del Decreto 408/2026) y su rendimiento depende del vehículo que elija cada empleador, así que no hay un número legal que publicar. Lo que sí tiene número es el costo: la comisión de la entidad no puede superar el 1% anual sobre el total de activos administrados, y ese tope es global, integral y comprende a cualquier otro interviniente.",
  });

  return {
    alicuota,
    alicuotaAlternativa,
    contribucionMensual,
    contribucionAnual,
    reduccionPatronal,
    costoNetoMensual,
    primerPeriodo,
    ultimoPeriodoCarencia,
    desdeCuandoResponde,
    acumuladoEnCarencia,
    acumuladoAlAnio,
    comisionAnualMaxima,
    caso,
    avisos,
  };
}
