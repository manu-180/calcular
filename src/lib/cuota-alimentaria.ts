// Motor de estimación de cuota alimentaria a partir de la canasta de crianza del INDEC.
//
// ⚠️ ENCUADRE LEGAL — leer antes de tocar esto. Esto NO calcula "la cuota": la cuota la fija un
// juez o la acuerdan los progenitores. Lo que sí se puede estimar con datos
// oficiales es (a) cuánto CUESTA por mes criar a esos hijos, y (b) cómo se reparte ese costo
// entre los progenitores según su capacidad económica. Eso es exactamente lo que dice la ley:
//
//   · arts. 658 y 659 — ambos progenitores deben la manutención (vivienda, salud, educación,
//     esparcimiento, vestimenta, aprendizaje de un oficio), en proporción a sus posibilidades
//     económicas (659). De ahí el prorrateo por ingresos.
//   · art. 660 — las tareas cotidianas de cuidado que hace el progenitor conviviente TIENEN
//     VALOR ECONÓMICO y se computan como aporte a la manutención. Por eso el modelo separa
//     bienes/servicios de cuidado: el conviviente ya está aportando el segundo, en especie.
//   · art. 666 — sólo con cuidado personal compartido: si los recursos no son equivalentes, el
//     de más ingresos pasa una cuota para que el hijo tenga el mismo nivel de vida en los dos hogares.
//   · art. 663 — la obligación llega a los 21 años (25 si estudia y no puede mantenerse).
//
// Fuente de la numeración y del alcance: Ministerio de Justicia, "Los alimentos de los hijos"
// https://www.argentina.gob.ar/justicia/derechofacil/aplicalaley/los-alimentos-de-los-hijos
//
// LÍMITE DEL DATO: la canasta del INDEC llega hasta los 12 años inclusive. Para hijos más
// grandes no hay tramo oficial y este motor NO extrapola — devuelve el hijo marcado como
// `sinTramoOficial` para que la UI lo diga en vez de inventar un número.

import {
  CANASTA_CRIANZA_ULTIMO,
  type MesCrianza,
  type TramoCrianzaId,
} from "@/data/canasta-crianza";

export type HijoInput = {
  /** Tramo de edad del INDEC, o "mayor-12" cuando no hay dato oficial. */
  tramo: TramoCrianzaId | "mayor-12";
};

export type EntradaCuota = {
  hijos: HijoInput[];
  /** Ingreso neto mensual del progenitor que va a pagar la cuota (el alimentante). */
  ingresoAlimentante: number;
  /**
   * Ingreso neto mensual del otro progenitor. `null` = no se informa: sin este dato no se puede
   * prorratear por capacidad y sólo se devuelven las referencias de reparto (mitad / todo).
   */
  ingresoOtro: number | null;
  /**
   * true (default) = el cuidado cotidiano lo ejerce el OTRO progenitor, así que su aporte en
   * especie (art. 660) se computa de su lado. false = cuidado compartido con residencia
   * alternada: el componente cuidado se reparte entre los dos.
   */
  cuidadoLoEjerceElOtro?: boolean;
  /** Mes de la canasta a usar. Por defecto, el último publicado. */
  mes?: MesCrianza;
};

export type ResultadoCuota = {
  mesEtiqueta: string;
  /** Costo mensual de crianza de TODOS los hijos con tramo oficial. */
  costoTotal: number;
  costoBienes: number;
  costoCuidado: number;
  /** Cuántos hijos quedaron fuera del cálculo por no tener tramo oficial (>12 años). */
  hijosSinTramoOficial: number;
  /** Hijos efectivamente computados. */
  hijosComputados: number;
  /**
   * Proporción del costo que le toca al alimentante según su capacidad (art. 659).
   * null cuando no se informó el ingreso del otro progenitor.
   */
  participacion: number | null;
  /** Cuota estimada en dinero. null si no hay con qué prorratear. */
  cuotaEstimada: number | null;
  /** Qué porcentaje del ingreso neto del alimentante representa la cuota estimada. */
  pctIngreso: number | null;
  /** Referencias que no dependen del ingreso del otro: mitad del costo y costo completo. */
  refMitad: number;
  refTotal: number;
  /** Valor del cuidado que el otro progenitor aporta en especie (0 si es compartido). */
  aporteEnEspecieDelOtro: number;
  /** Detalle por hijo, en el orden en que se pasaron. */
  detalle: { tramo: HijoInput["tramo"]; bienes: number; cuidado: number; total: number }[];
};

const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Estima el costo de crianza y el reparto entre progenitores.
 * Devuelve null si no hay ningún hijo con tramo oficial o si el ingreso del alimentante no es
 * un número válido y positivo (sin ingreso no hay nada que prorratear ni con qué comparar).
 */
export function calcularCuotaAlimentaria(e: EntradaCuota): ResultadoCuota | null {
  const mes = e.mes ?? CANASTA_CRIANZA_ULTIMO;
  if (!Array.isArray(e.hijos) || e.hijos.length === 0) return null;
  if (!Number.isFinite(e.ingresoAlimentante) || e.ingresoAlimentante <= 0) return null;
  if (e.ingresoOtro !== null && (!Number.isFinite(e.ingresoOtro) || e.ingresoOtro < 0)) return null;

  const detalle = e.hijos.map((h) => {
    if (h.tramo === "mayor-12") return { tramo: h.tramo, bienes: 0, cuidado: 0, total: 0 };
    const v = mes.valores[h.tramo];
    return { tramo: h.tramo, bienes: v.bienes, cuidado: v.cuidado, total: v.total };
  });

  const computados = detalle.filter((d) => d.tramo !== "mayor-12");
  if (computados.length === 0) return null;

  const costoBienes = r2(computados.reduce((a, d) => a + d.bienes, 0));
  const costoCuidado = r2(computados.reduce((a, d) => a + d.cuidado, 0));
  const costoTotal = r2(costoBienes + costoCuidado);

  const cuidadoLoEjerceElOtro = e.cuidadoLoEjerceElOtro ?? true;
  // Con cuidado compartido y residencia alternada, cada uno presta la mitad del cuidado en
  // especie; el aporte "extra" del otro progenitor deja de ser todo el componente.
  const aporteEnEspecieDelOtro = r2(cuidadoLoEjerceElOtro ? costoCuidado : costoCuidado / 2);

  let participacion: number | null = null;
  let cuotaEstimada: number | null = null;
  let pctIngreso: number | null = null;

  if (e.ingresoOtro !== null) {
    const suma = e.ingresoAlimentante + e.ingresoOtro;
    // Si el otro progenitor declara 0 de ingreso, toda la capacidad económica está de un lado:
    // la participación es 1 (el costo completo), que es el límite correcto del modelo.
    participacion = suma > 0 ? e.ingresoAlimentante / suma : 1;
    cuotaEstimada = r2(costoTotal * participacion);
    pctIngreso = r2((cuotaEstimada / e.ingresoAlimentante) * 100);
  }

  return {
    mesEtiqueta: mes.etiqueta,
    costoTotal,
    costoBienes,
    costoCuidado,
    hijosSinTramoOficial: detalle.length - computados.length,
    hijosComputados: computados.length,
    participacion: participacion === null ? null : r2(participacion * 100) / 100,
    cuotaEstimada,
    pctIngreso,
    refMitad: r2(costoTotal / 2),
    refTotal: costoTotal,
    aporteEnEspecieDelOtro,
    detalle,
  };
}
