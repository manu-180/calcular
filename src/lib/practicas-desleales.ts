import {
  DIAS_TRAMO_MORA,
  ESCALONES,
  MULTIPLICADOR_REINCIDENCIA,
  RECARGO_MORA,
  REDUCCION_POR_REPARAR,
  TOPE_CUOTAS,
  type EscalonInfraccion,
} from "@/data/practicas-desleales";
import { smvmVigente } from "@/lib/desempleo";

/**
 * MULTA POR PRÁCTICA DESLEAL — art. 55 de la Ley 23.551 (texto Ley 27.802) sobre la escala del
 * Anexo II de la Ley 25.212, art. 5º (texto Ley 26.941).
 *
 * EL DATO VIVO NO SE DUPLICA: el SMVM sale de `smvmVigente()`, el mismo que usa /desempleo. La
 * escala del Anexo II está escrita como porcentaje de ese valor «vigente al momento de la
 * constatación de la infracción», así que el importe se deriva y no envejece.
 *
 * LO QUE ESTA FUNCIÓN NO DECIDE:
 *   - En qué escalón cae cada práctica desleal. La ley sólo lo dice para las conductas del art. 20
 *     ter («serán consideradas infracciones muy graves»); para el resto lo califica el juez. Por
 *     eso el escalón es un INPUT, no algo que la función adivine.
 *   - Qué pasa cuando el tope del 20% de las cuotas queda por debajo del mínimo de la escala. La
 *     ley no lo resuelve: se devuelven los dos números y se muestra el choque.
 */

export type EntradaMulta = {
  escalon: EscalonInfraccion["id"];
  /** Trabajadores afectados (sólo pesa en los escalones que la ley calcula «por cada trabajador»). */
  trabajadores: number;
  /** Art. 55: prácticas múltiples o reincidencia → hasta el quíntuplo del máximo. */
  reincidencia: boolean;
  /** Recaudación de cuotas sindicales del mes de la infracción, para el tope del 20%. */
  cuotasDelMes?: number;
  /** Días de mora en cesar la medida, después del plazo que fijó la decisión judicial. */
  diasDeMora: number;
  /** ¿Se reparó dentro del plazo? El art. 55 permite reducir hasta el 50%. */
  reparadaEnPlazo: boolean;
  /** Permite fijar el SMVM a mano (por ejemplo, para una infracción constatada en otro mes). */
  smvmMensual?: number;
};

export type ResultadoMulta = {
  escalon: EscalonInfraccion;
  smvmMensual: number;
  smvmPeriodo: string;
  smvmVencido: boolean;
  trabajadoresComputados: number;
  /** Multa de la escala del Anexo II, antes de todo lo demás. */
  minimo: number;
  maximo: number;
  /** Máximo elevado al quíntuplo si hay reincidencia o prácticas múltiples. */
  maximoConReincidencia: number;
  /** Tope del art. 55: 20% de las cuotas del mes (null si no se cargó la recaudación). */
  topeCuotas: number | null;
  /** true si ese tope queda por debajo del mínimo de la escala: la ley no resuelve el choque. */
  topeChocaConElMinimo: boolean;
  /** Techo efectivo: el menor entre el máximo (con reincidencia) y el tope del 20%. */
  techoEfectivo: number;
  /** Tramos de 5 días de mora cumplidos y su recargo acumulado sobre el importe originario. */
  tramosDeMora: number;
  recargoMora: number;
  /** Piso y techo tras aplicar mora y, si corresponde, la reducción del 50%. */
  minimoFinal: number;
  maximoFinal: number;
};

export function calcularMultaPractica(e: EntradaMulta, hoy?: Date): ResultadoMulta {
  const escalon = ESCALONES.find((x) => x.id === e.escalon) ?? ESCALONES[0];
  const smvm = smvmVigente(hoy);
  const smvmMensual = e.smvmMensual && e.smvmMensual > 0 ? e.smvmMensual : smvm.mes.mensual;

  const trabajadores = escalon.porTrabajador ? Math.max(1, Math.floor(e.trabajadores || 1)) : 1;

  const minimo = smvmMensual * escalon.min * trabajadores;
  const maximo = smvmMensual * escalon.max * trabajadores;
  const maximoConReincidencia = e.reincidencia ? maximo * MULTIPLICADOR_REINCIDENCIA : maximo;

  const topeCuotas =
    e.cuotasDelMes && e.cuotasDelMes > 0 ? e.cuotasDelMes * TOPE_CUOTAS : null;
  const techoEfectivo =
    topeCuotas !== null ? Math.min(maximoConReincidencia, topeCuotas) : maximoConReincidencia;
  const topeChocaConElMinimo = topeCuotas !== null && topeCuotas < minimo;

  const tramosDeMora = Math.max(0, Math.floor((e.diasDeMora || 0) / DIAS_TRAMO_MORA));
  const recargoMora = tramosDeMora * RECARGO_MORA;

  const factorMora = 1 + recargoMora;
  const factorReduccion = e.reparadaEnPlazo ? 1 - REDUCCION_POR_REPARAR : 1;

  return {
    escalon,
    smvmMensual,
    smvmPeriodo: smvm.mes.periodo,
    smvmVencido: smvm.vencido,
    trabajadoresComputados: trabajadores,
    minimo,
    maximo,
    maximoConReincidencia,
    topeCuotas,
    topeChocaConElMinimo,
    techoEfectivo,
    tramosDeMora,
    recargoMora,
    minimoFinal: minimo * factorMora * factorReduccion,
    maximoFinal: techoEfectivo * factorMora * factorReduccion,
  };
}
