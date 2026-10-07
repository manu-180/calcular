// Todo número del informe sale de acá, y acá todo sale de `calcularCuotaAlimentaria`: el mismo
// motor y la misma traducción de entradas que usa la calculadora web. Si el informe y la web
// dieran distinto, la persona llega a la mediación con dos cifras para el mismo caso: eso lo
// vigila scripts/check_informe_cuota.ts.

import {
  CANASTA_CRIANZA,
  CANASTA_CRIANZA_ULTIMO,
  TRAMOS_CRIANZA,
  type MesCrianza,
} from "@/data/canasta-crianza";
import { calcularCuotaAlimentaria, type EntradaCuota, type ResultadoCuota } from "@/lib/cuota-alimentaria";
import { varMensualIPC } from "@/lib/canasta-meses";
import type { Datos, TramoHijo } from "@/lib/prefill/cuota";

export const SLUG_INFORME = "informe-cuota-alimentaria";
export const RUTA_LANDING_INFORME = "/informes/cuota-alimentaria";
/** Sólo para pintar el precio donde no se puede leer el catálogo (componentes de cliente).
 *  El cobro y la validación del pago leen SIEMPRE el precio de src/lib/mp.ts. */
export const PRECIO_INFORME_REFERENCIA = 4900;

/** Cuántos meses publicados muestra la tabla de evolución. */
export const MESES_EVOLUCION = 6;

export function nombreTramo(t: TramoHijo): string {
  if (t === "mayor-12") return "13 años o más";
  return TRAMOS_CRIANZA.find((x) => x.id === t)?.nombre ?? t;
}

export function escolaridadTramo(t: TramoHijo): string {
  if (t === "mayor-12") return "Sin tramo oficial del INDEC";
  return TRAMOS_CRIANZA.find((x) => x.id === t)?.escolaridad ?? "";
}

/** La traducción exacta que hace CalculadoraCuotaAlimentaria de su estado al motor. */
export function entradaDelMotor(d: Datos, mes?: MesCrianza): EntradaCuota {
  return {
    hijos: d.hijos.map((tramo) => ({ tramo })),
    ingresoAlimentante: d.ingreso,
    ingresoOtro: d.otro,
    cuidadoLoEjerceElOtro: !d.compartido,
    ...(mes ? { mes } : {}),
  };
}

export type FilaEvolucion = {
  periodo: string;
  etiqueta: string;
  costoTotal: number;
  /** Cuota prorrateada, o la mitad del costo si no se informó el ingreso del otro. */
  referencia: number;
  varCanasta: number | null;
  varIPC: number | null;
};

export type Informe = {
  mes: MesCrianza;
  r: ResultadoCuota;
  /** Participación del otro progenitor en el costo, 0 a 1. null si no se informó su ingreso. */
  participacionOtro: number | null;
  /** Lo que queda del lado de quien convive: costo total menos la cuota. */
  aporteDelOtro: number | null;
  evolucion: FilaEvolucion[];
  /** Variación del costo total entre el primer y el último mes de la tabla, en %. */
  varPeriodo: number | null;
};

export function armarInforme(d: Datos, mes: MesCrianza = CANASTA_CRIANZA_ULTIMO): Informe | null {
  const r = calcularCuotaAlimentaria(entradaDelMotor(d, mes));
  if (!r) return null;

  const fin = CANASTA_CRIANZA.findIndex((m) => m.periodo === mes.periodo);
  const meses = CANASTA_CRIANZA.slice(Math.max(0, fin - MESES_EVOLUCION + 1), fin + 1);
  const evolucion: FilaEvolucion[] = [];
  for (const m of meses) {
    const rm = calcularCuotaAlimentaria(entradaDelMotor(d, m));
    if (!rm) continue;
    const previa = evolucion[evolucion.length - 1];
    const anterior = previa ?? anteriorDe(d, m);
    evolucion.push({
      periodo: m.periodo,
      etiqueta: m.etiqueta,
      costoTotal: rm.costoTotal,
      referencia: rm.cuotaEstimada ?? rm.refMitad,
      varCanasta: anterior ? (rm.costoTotal / anterior.costoTotal - 1) * 100 : null,
      varIPC: varMensualIPC(m.periodo),
    });
  }

  const primero = evolucion[0];
  const ultimo = evolucion[evolucion.length - 1];

  return {
    mes,
    r,
    participacionOtro: r.participacion === null ? null : Math.round((1 - r.participacion) * 10000) / 10000,
    aporteDelOtro: r.cuotaEstimada === null ? null : Math.round((r.costoTotal - r.cuotaEstimada) * 100) / 100,
    evolucion,
    varPeriodo:
      primero && ultimo && primero !== ultimo ? (ultimo.costoTotal / primero.costoTotal - 1) * 100 : null,
  };
}

// La primera fila de la tabla también muestra su variación: se la compara con el mes previo de la
// serie aunque ese mes no entre en la tabla.
function anteriorDe(d: Datos, m: MesCrianza): { costoTotal: number } | null {
  const i = CANASTA_CRIANZA.findIndex((x) => x.periodo === m.periodo);
  if (i <= 0) return null;
  return calcularCuotaAlimentaria(entradaDelMotor(d, CANASTA_CRIANZA[i - 1]));
}

/** Caso de ejemplo de la landing: una familia común, con números de verdad del último mes. */
export const CASO_EJEMPLO: Datos = {
  hijos: ["6-a-12", "1-a-3"],
  ingreso: 1_450_000,
  otro: 820_000,
  compartido: false,
};
