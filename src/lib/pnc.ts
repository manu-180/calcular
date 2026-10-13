// Motor de las pensiones no contributivas. Funciones puras, sin estado ni fetch.
//
// ⚠️ ENCUADRE — leer antes de tocar esto. Esto NO otorga ni liquida un beneficio: aplica las
// normas publicadas a los datos que declara el usuario. El otorgamiento depende de una evaluación
// socioeconómica y —en la pensión por discapacidad— de un Certificado Único de Discapacidad y de
// auditorías del organismo. Acá se responde cuánto se paga y qué requisitos pide la norma.
//
// LAS TRES COSAS QUE NADIE PUBLICA JUNTAS:
//   1. Ninguno de estos montos existe como número propio: los cuatro son una proporción del haber
//      mínimo del SIPA (70%, 80% o 100%). Suben todos los meses con la movilidad, sin resolución
//      propia. Por eso una nota con «la PNC es $X» vale treinta días y esta página no.
//   2. El bono extraordinario NO es proporcional: son los mismos $70.000 para todos, así que
//      comprime la brecha. La pensión del 70% cobra el 70% del haber mínimo, pero termina
//      cobrando el 74,3% de lo que cobra un jubilado de la mínima.
//   3. Desde la Ley 27.793 se puede trabajar registrado y seguir cobrando la pensión por
//      discapacidad, mientras los ingresos netos no lleguen a dos SMVM. Ese tope tampoco se
//      publica como número: se deriva del salario mínimo, que cambia casi todos los meses.

import { PRESTACIONES_PNC, type ClavePnc, type PrestacionPnc } from "@/data/pnc";
import { bonoVigente, prestacionesVigentes } from "@/data/prestaciones";
import { smvmVigente } from "@/lib/desempleo";

const r2 = (n: number) => Math.round(n * 100) / 100;

export type MontoPnc = {
  prestacion: PrestacionPnc;
  /** El haber liquidado: proporción × haber mínimo garantizado. */
  haber: number;
  /** Bono extraordinario del mes que le corresponde (Dec. 824/2026, arts. 3 y 4). */
  bono: number;
  /** Haber + bono: lo que efectivamente se deposita este mes. */
  total: number;
  /** Qué porcentaje representa el total frente al total que cobra un jubilado de la mínima. */
  proporcionSobreMinimaConBono: number;
};

/** El total que cobra este mes quien está en el haber mínimo, bono incluido. */
export function totalMinimaConBono(): number {
  return r2(prestacionesVigentes().haberMinimo + bonoVigente().monto);
}

/**
 * El bono que le toca a un haber, según el Decreto 824/2026: completo si el haber no supera la
 * mínima, parcial hasta llegar al tope, y cero de ahí para arriba. Todas las prestaciones no
 * contributivas caen en el primer tramo, pero la regla se aplica igual y no se asume.
 */
export function bonoDeHaber(haber: number): number {
  const tope = totalMinimaConBono();
  if (haber <= prestacionesVigentes().haberMinimo) return bonoVigente().monto;
  if (haber >= tope) return 0;
  return r2(tope - haber);
}

/** El monto liquidado de una prestación no contributiva en el mes vigente. */
export function montoDe(prestacion: PrestacionPnc): MontoPnc {
  const haber = r2(prestacionesVigentes().haberMinimo * prestacion.proporcionHaberMinimo);
  const bono = bonoDeHaber(haber);
  const total = r2(haber + bono);
  return {
    prestacion,
    haber,
    bono,
    total,
    proporcionSobreMinimaConBono: total / totalMinimaConBono(),
  };
}

/** Los cuatro montos del mes, en el orden en que se muestran. */
export function montosVigentes(): MontoPnc[] {
  return PRESTACIONES_PNC.map(montoDe);
}

export function prestacionPorClave(clave: ClavePnc): PrestacionPnc {
  const p = PRESTACIONES_PNC.find((x) => x.clave === clave);
  if (!p) throw new Error(`Prestación no contributiva desconocida: ${clave}`);
  return p;
}

/**
 * El tope de ingresos por trabajo compatible con la pensión por discapacidad: dos salarios
 * mínimos vitales y móviles vigentes (art. 7 de la Ley 27.793). Se deriva de la escala del SMVM,
 * no de un monto publicado.
 */
export function topeIngresosCompatibles(prestacion: PrestacionPnc): number | null {
  if (prestacion.topeIngresosEnSmvm === null) return null;
  return r2(smvmVigente().mes.mensual * prestacion.topeIngresosEnSmvm);
}

export type SituacionPnc = {
  /** Qué prestación está consultando. */
  clave: ClavePnc;
  /** Si ya cobra una jubilación, pensión o retiro (contributivo o no). */
  cobraOtroBeneficio: boolean;
  /** Ingresos netos mensuales por trabajo registrado o monotributo. 0 = no trabaja. */
  ingresosPorTrabajo: number;
};

export type ObservacionPnc = {
  tono: "ok" | "atencion" | "bloqueante";
  texto: string;
};

export type ResultadoPnc = {
  monto: MontoPnc;
  topeIngresos: number | null;
  /** Cuánto más se puede ganar antes de perder la pensión. `null` si no hay tope publicado. */
  margenDeIngresos: number | null;
  /** Ingresos + pensión, para ver el total del hogar cuando la prestación es compatible. */
  totalConIngresos: number;
  observaciones: ObservacionPnc[];
};

/**
 * Aplica las reglas a la situación declarada. No decide si corresponde el beneficio —eso es del
 * organismo—: marca los bloqueos que la norma escribe de forma objetiva (tener otro beneficio,
 * superar el tope de ingresos) y devuelve el monto que se liquida.
 */
export function evaluarSituacion(s: SituacionPnc): ResultadoPnc {
  const prestacion = prestacionPorClave(s.clave);
  const monto = montoDe(prestacion);
  const topeIngresos = topeIngresosCompatibles(prestacion);
  const ingresos = Number.isFinite(s.ingresosPorTrabajo) ? Math.max(0, s.ingresosPorTrabajo) : 0;

  const observaciones: ObservacionPnc[] = [];

  if (s.cobraOtroBeneficio) {
    observaciones.push({
      tono: "bloqueante",
      texto:
        "Todas las prestaciones no contributivas son incompatibles con otra jubilación, pensión o retiro, sea contributivo o no. Cobrar dos al mismo tiempo hace caducar la pensión y ANSES reclama lo percibido de más.",
    });
  }

  if (topeIngresos !== null) {
    if (ingresos >= topeIngresos) {
      observaciones.push({
        tono: "bloqueante",
        texto:
          "Tus ingresos alcanzan o superan los dos salarios mínimos: el artículo 7 de la Ley 27.793 dispone la suspensión automática de la pensión mientras dure esa situación. No es una baja definitiva: cuando los ingresos vuelven a estar por debajo del tope, se puede pedir la rehabilitación inmediata.",
      });
    } else if (ingresos > 0) {
      observaciones.push({
        tono: "ok",
        texto:
          "Podés trabajar registrado y seguir cobrando la pensión: desde la Ley 27.793 el vínculo laboral formal ya no la da de baja por sí solo, mientras los ingresos netos no lleguen al tope de dos salarios mínimos.",
      });
    }
  } else if (ingresos > 0) {
    observaciones.push({
      tono: "atencion",
      texto:
        "Esta prestación no tiene un tope de ingresos publicado en pesos: la norma exige no poseer bienes, ingresos ni recursos que permitan la subsistencia, y eso lo determina la evaluación socioeconómica del organismo, caso por caso.",
    });
  }

  return {
    monto,
    topeIngresos,
    margenDeIngresos: topeIngresos === null ? null : r2(Math.max(0, topeIngresos - ingresos)),
    totalConIngresos: r2(ingresos + monto.total),
    observaciones,
  };
}
