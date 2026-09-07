import {
  DEROGACION_ISO,
  MESES_MINIMOS_CLIENTELA,
  MOTIVOS,
  PORCENTAJE_CLIENTELA,
  type MotivoDisolucion,
} from "@/data/viajantes";
import {
  antiguedadEntre,
  calcularIndemnizacion,
  type Antiguedad,
  type ResultadoIndemnizacion,
} from "@/lib/indemnizacion";

/**
 * Indemnización por clientela del art. 14 de la Ley 14.546, y la liquidación que la rodea.
 *
 * DOS DECISIONES QUE VALE LA PENA DEJAR ESCRITAS:
 *
 * 1. **El art. 245 no se reimplementa acá.** La cuenta sale de `calcularIndemnizacion`, la misma
 *    que usan /indemnizacion y /indemnizacion-por-fallecimiento. Si esta página calculara su
 *    propia base, calcular.ar podría publicar dos importes distintos para el mismo sueldo y la
 *    misma antigüedad (regla de s85).
 *
 * 2. **El despido del art. 14 es HIPOTÉTICO.** La norma manda calcular «lo que le hubiere
 *    correspondido en caso de despido intempestivo e injustificado», sin importar cómo terminó
 *    de verdad el contrato: por eso el hipotético se computa SIEMPRE sin preaviso otorgado
 *    («intempestivo») y sin causa («injustificado»), aunque el motivo real sea una renuncia.
 *
 * Y LA QUE NO SE TOMA: el art. 14 no enumera los rubros de ese despido hipotético. Se devuelven
 * las dos lecturas —`estricta` (25% del art. 245) y `amplia` (25% del art. 245 más el preaviso
 * omitido y la integración del mes, con sus SAC)— y la página muestra ambas. Elegir una y
 * publicarla como la única sería inventar una certeza que la ley no da.
 */
export type ResultadoViajante = {
  antiguedad: Antiguedad;
  motivo: MotivoDisolucion;
  /** ¿El motivo genera las indemnizaciones por despido de los arts. 232, 233 y 245? */
  conIndemnizacionDespido: boolean;
  /** El despido intempestivo e injustificado del art. 14 (siempre, sea cual sea el motivo real). */
  hipotetico: ResultadoIndemnizacion;
  /** Lo indemnizatorio que se cobra de verdad: 0 si el motivo no lo genera. */
  cobraIndemnizatorio: number;
  /** SAC proporcional + vacaciones no gozadas con su SAC: corresponde cualquiera sea el motivo. */
  liquidacionFinal: number;
  clientela: {
    corresponde: boolean;
    /** Por qué no corresponde, cuando no corresponde. */
    motivoRechazo: "antiguedad" | "derogada" | null;
    /** Lectura estricta: 25% de la indemnización por antigüedad del art. 245. */
    estricta: number;
    /** Lectura amplia: 25% del art. 245 más preaviso omitido e integración, con sus SAC. */
    amplia: number;
    /** La base sobre la que se aplicó cada porcentaje (para poder mostrar la cuenta). */
    baseEstricta: number;
    baseAmplia: number;
  };
  /** Total a cobrar con la lectura estricta / amplia de la clientela. */
  totalEstricto: number;
  totalAmplio: number;
  /** ¿La disolución cae con la Ley 14.546 todavía vigente? (art. 198 de la Ley 27.802) */
  vigenteAlEgreso: boolean;
};

export function calcularViajante(params: {
  ingresoISO: string;
  egresoISO: string;
  mejorRemuneracion: number;
  motivo: MotivoDisolucion;
  preavisoOtorgado: boolean;
  topeCCT?: number;
}): ResultadoViajante | null {
  const { ingresoISO, egresoISO, mejorRemuneracion, motivo, preavisoOtorgado, topeCCT } = params;
  if (!ingresoISO || !egresoISO || egresoISO <= ingresoISO || !(mejorRemuneracion > 0)) return null;

  // El despido hipotético del art. 14: intempestivo (sin preaviso) e injustificado (sin causa).
  const hipotetico = calcularIndemnizacion({
    ingresoISO,
    despidoISO: egresoISO,
    mejorRemuneracion,
    preavisoOtorgado: false,
    topeCCT,
  });
  // La liquidación real, que sólo difiere del hipotético en si el preaviso se otorgó.
  const real = calcularIndemnizacion({
    ingresoISO,
    despidoISO: egresoISO,
    mejorRemuneracion,
    preavisoOtorgado,
    topeCCT,
  });
  if (!hipotetico || !real) return null;

  const antiguedad = antiguedadEntre(ingresoISO, egresoISO);
  const info = MOTIVOS.find((m) => m.id === motivo)!;

  // Art. 198 de la Ley 27.802: el estatuto rige hasta el 31/12/2026 inclusive.
  const vigenteAlEgreso = egresoISO < DEROGACION_ISO;
  // Art. 14: «una vez transcurrido un año de vigencia» del contrato.
  const tieneAntiguedad = antiguedad.totalMeses >= MESES_MINIMOS_CLIENTELA;

  const baseEstricta = hipotetico.indemnizacionAntiguedad;
  const baseAmplia =
    hipotetico.indemnizacionAntiguedad +
    (hipotetico.preaviso ? hipotetico.preaviso.monto + hipotetico.preaviso.sac : 0) +
    (hipotetico.integracion ? hipotetico.integracion.monto + hipotetico.integracion.sac : 0);

  const corresponde = tieneAntiguedad && vigenteAlEgreso;
  const clientela = {
    corresponde,
    motivoRechazo: corresponde
      ? null
      : !tieneAntiguedad
        ? ("antiguedad" as const)
        : ("derogada" as const),
    estricta: corresponde ? baseEstricta * PORCENTAJE_CLIENTELA : 0,
    amplia: corresponde ? baseAmplia * PORCENTAJE_CLIENTELA : 0,
    baseEstricta,
    baseAmplia,
  };

  const cobraIndemnizatorio = info.conIndemnizacionDespido ? real.totalIndemnizatorio : 0;
  const liquidacionFinal = real.totalLiquidacionFinal;

  return {
    antiguedad,
    motivo,
    conIndemnizacionDespido: info.conIndemnizacionDespido,
    hipotetico,
    cobraIndemnizatorio,
    liquidacionFinal,
    clientela,
    totalEstricto: cobraIndemnizatorio + liquidacionFinal + clientela.estricta,
    totalAmplio: cobraIndemnizatorio + liquidacionFinal + clientela.amplia,
    vigenteAlEgreso,
  };
}
