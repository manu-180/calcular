import {
  ANIOS_CORTE_ESCALA,
  DEROGACION_ISO,
  MESES_ESPECIAL,
  MESES_FRACCION_ANIO,
  MESES_PISO_ANTIGUEDAD,
  MESES_PREAVISO,
  MESES_SUSTITUTIVA,
} from "@/data/periodistas";
import {
  antiguedadEntre,
  calcularIndemnizacion,
  type Antiguedad,
  type ResultadoIndemnizacion,
} from "@/lib/indemnizacion";

/**
 * Indemnizaciones del art. 43 de la Ley 12.908 (Estatuto del Periodista Profesional) y su
 * comparación contra el régimen general que queda cuando el estatuto se deroga, el 1/1/2027.
 *
 * DOS DECISIONES QUE VALE LA PENA DEJAR ESCRITAS:
 *
 * 1. **La columna de la LCT no se reimplementa acá**: sale de `calcularIndemnizacion`, el mismo
 *    motor de /indemnizacion (regla de s85). Lo único propio de esta página es la cuenta del
 *    estatuto, que tiene otra escala y otros pisos.
 *
 * 2. **El corte de los tres años del inc. b) está escrito como «menor o mayor tres años»** y no
 *    resuelve el día exacto del aniversario. Se aplica el tramo alto sólo cuando la antigüedad lo
 *    SUPERA, y se devuelve `enElCorte` para que la página avise en vez de tapar el hueco.
 */
export type ResultadoPeriodista = {
  antiguedad: Antiguedad;
  /** ¿El despido cae con el estatuto todavía vigente? (art. 197 de la Ley 27.802) */
  vigenteAlDespido: boolean;
  superaCorte: boolean;
  /** La antigüedad cae justo en el tercer aniversario: la ley dice «menor o mayor». */
  enElCorte: boolean;
  estatuto: {
    aniosComputables: number;
    /** inc. c): un mes por año o fracción mayor de 3 meses, piso de dos meses. */
    antiguedad: number;
    /** inc. b): 2 o 4 meses, sólo si no se preavisó. */
    sustitutiva: number;
    mesesSustitutiva: number;
    /** inc. d): seis meses, haya o no mediado preaviso. */
    especial: number;
    /** inc. a): plazo del preaviso, en meses (informativo). */
    mesesPreaviso: number;
    total: number;
  };
  /** El mismo caso liquidado con la Ley de Contrato de Trabajo. */
  lct: ResultadoIndemnizacion;
  lctTotal: number;
  /** Cuánto más paga el estatuto que la LCT (puede ser 0 si el estatuto ya no rige). */
  diferencia: number;
  /** Cuántas veces la indemnización de la LCT entra en la del estatuto (null si la LCT da 0). */
  vecesLct: number | null;
};

export function calcularPeriodista(params: {
  ingresoISO: string;
  despidoISO: string;
  base: number; // promedio de los últimos 6 meses (art. 43 inc. e)
  preavisoOtorgado: boolean;
  topeCCT?: number;
}): ResultadoPeriodista | null {
  const { ingresoISO, despidoISO, base, preavisoOtorgado, topeCCT } = params;
  if (!ingresoISO || !despidoISO || despidoISO <= ingresoISO || !(base > 0)) return null;

  const lct = calcularIndemnizacion({
    ingresoISO,
    despidoISO,
    mejorRemuneracion: base,
    preavisoOtorgado,
    topeCCT,
  });
  if (!lct) return null;

  const antiguedad = antiguedadEntre(ingresoISO, despidoISO);
  const mesesCorte = ANIOS_CORTE_ESCALA * 12;
  const superaCorte =
    antiguedad.totalMeses > mesesCorte ||
    (antiguedad.totalMeses === mesesCorte && antiguedad.dias > 0);
  const enElCorte = antiguedad.totalMeses === mesesCorte && antiguedad.dias === 0;

  // inc. c): un mes por año o fracción MAYOR de tres meses, nunca menos de dos meses.
  const fraccionSuma =
    antiguedad.meses > MESES_FRACCION_ANIO ||
    (antiguedad.meses === MESES_FRACCION_ANIO && antiguedad.dias > 0);
  const aniosComputables = Math.max(antiguedad.anios + (fraccionSuma ? 1 : 0), 1);
  const mesesAntiguedad = Math.max(aniosComputables, MESES_PISO_ANTIGUEDAD);

  const mesesSustitutiva = preavisoOtorgado
    ? 0
    : superaCorte
      ? MESES_SUSTITUTIVA.superaCorte
      : MESES_SUSTITUTIVA.hastaCorte;

  const vigenteAlDespido = despidoISO < DEROGACION_ISO;

  const estatuto = {
    aniosComputables,
    antiguedad: vigenteAlDespido ? mesesAntiguedad * base : 0,
    sustitutiva: vigenteAlDespido ? mesesSustitutiva * base : 0,
    mesesSustitutiva: vigenteAlDespido ? mesesSustitutiva : 0,
    especial: vigenteAlDespido ? MESES_ESPECIAL * base : 0,
    mesesPreaviso: superaCorte ? MESES_PREAVISO.superaCorte : MESES_PREAVISO.hastaCorte,
    total: 0,
  };
  estatuto.total = estatuto.antiguedad + estatuto.sustitutiva + estatuto.especial;

  const lctTotal = lct.totalIndemnizatorio;

  return {
    antiguedad,
    vigenteAlDespido,
    superaCorte,
    enElCorte,
    estatuto,
    lct,
    lctTotal,
    diferencia: estatuto.total - lctTotal,
    vecesLct: lctTotal > 0 ? estatuto.total / lctTotal : null,
  };
}
