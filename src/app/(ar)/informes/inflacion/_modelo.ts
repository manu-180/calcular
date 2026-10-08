// Todo número del informe sale de acá, y acá todo sale de `actualizarMonto` / `sueldoVsInflacion`:
// el mismo motor que usa la calculadora web. Si el informe y la web dieran distinto, la persona
// llega a pedir el aumento con dos cifras para el mismo caso: eso lo vigila
// scripts/check_informe_inflacion.ts.

import {
  actualizarMonto,
  indiceDe,
  mesesEntre,
  nombrePeriodo,
  sueldoVsInflacion,
  sumarMeses,
  ULTIMO_PERIODO,
  type MontoActualizado,
  type Periodo,
} from "@/lib/inflacion";
import { hastaEfectivo, type Caso, type Datos } from "@/lib/prefill/inflacion";

export const SLUG_INFORME = "informe-inflacion";
export const RUTA_LANDING_INFORME = "/informes/inflacion";
/** Sólo para pintar el precio donde no se puede leer el catálogo (componentes de cliente).
 *  El cobro y la validación del pago leen SIEMPRE el precio de src/lib/mp.ts. */
export const PRECIO_INFORME_REFERENCIA = 3900;

/** Hasta cuántos meses la tabla va mes a mes; más largo, va año por año para entrar en la hoja. */
export const MAX_MESES_DETALLE = 24;

export const NOMBRE_CASO: Record<Caso, string> = {
  sueldo: "Pedir un aumento de sueldo",
  honorarios: "Actualizar mis honorarios",
  precio: "Actualizar un precio o presupuesto",
  "deuda-presto": "Cobrar una plata que presté",
  "deuda-debo": "Devolver una plata que me prestaron",
};

export const NOMBRE_CASO_CORTO: Record<Caso, string> = {
  sueldo: "Aumento de sueldo",
  honorarios: "Honorarios",
  precio: "Precio o presupuesto",
  "deuda-presto": "Presté plata",
  "deuda-debo": "Debo plata",
};

export const esDeuda = (c: Caso) => c === "deuda-presto" || c === "deuda-debo";

export type Fila = {
  /** Último mes del tramo. */
  periodo: Periodo;
  /** Primer mes del tramo (el mes anterior, en la tabla mes a mes). */
  desde: Periodo;
  indice: number;
  /** Inflación del tramo, en %. */
  variacion: number;
  /** Inflación acumulada desde el mes de origen hasta el fin del tramo, en %. */
  acumulada: number;
  montoActualizado: number;
};

export type Brecha = {
  actual: number;
  /** Lo que habría que cobrar para empatar la inflación. */
  equivalente: number;
  /** actual − equivalente, en pesos del mes de llegada. */
  diferencia: number;
  /** Poder de compra ganado (+) o perdido (−), en %. */
  diferenciaRealPct: number;
  /** Cuánto tendría que subir lo de hoy para empatar, en % (0 si ya empata o gana). */
  aumentoNecesarioPct: number;
  gana: boolean;
};

export type Informe = {
  /** El monto original, tal cual lo cargó la persona. */
  monto: number;
  desde: Periodo;
  hasta: Periodo;
  /** El mes de llegada es el último publicado y se mueve solo con cada IPC nuevo. */
  hastaEsUltimo: boolean;
  indiceDesde: number;
  indiceHasta: number;
  act: MontoActualizado;
  meses: number;
  porAnio: boolean;
  filas: Fila[];
  brecha: Brecha | null;
  /** El IPC que todavía no salió, y cuándo suele publicarse. */
  proximo: { periodo: Periodo; publicaEn: Periodo };
};

function fila(monto: number, origen: Periodo, tramoDesde: Periodo, p: Periodo): Fila | null {
  const a = actualizarMonto(monto, origen, p);
  const tramo = actualizarMonto(1, tramoDesde, p);
  const indice = indiceDe(p);
  if (!a || !tramo || indice === null) return null;
  return {
    periodo: p,
    desde: tramoDesde,
    indice,
    variacion: tramo.variacionPct,
    acumulada: a.variacionPct,
    montoActualizado: a.montoActualizado,
  };
}

function hitosPorAnio(desde: Periodo, hasta: Periodo): Periodo[] {
  const hitos: Periodo[] = [];
  let anio = Number(desde.slice(0, 4));
  for (;;) {
    const dic = `${anio}-12`;
    if (dic > desde && dic < hasta) hitos.push(dic);
    if (dic >= hasta) break;
    anio++;
  }
  hitos.push(hasta);
  return hitos;
}

export function armarInforme(d: Datos): Informe | null {
  const hasta = hastaEfectivo(d);
  const act = actualizarMonto(d.monto, d.desde, hasta);
  const indiceDesde = indiceDe(d.desde);
  const indiceHasta = indiceDe(hasta);
  if (!act || indiceDesde === null || indiceHasta === null || d.desde >= hasta) return null;

  const meses = mesesEntre(d.desde, hasta);
  const porAnio = meses > MAX_MESES_DETALLE;
  const filas: Fila[] = [];
  if (porAnio) {
    let previo = d.desde;
    for (const h of hitosPorAnio(d.desde, hasta)) {
      const f = fila(d.monto, d.desde, previo, h);
      if (f) filas.push(f);
      previo = h;
    }
  } else {
    for (let i = 1; i <= meses; i++) {
      const p = sumarMeses(d.desde, i);
      const f = fila(d.monto, d.desde, sumarMeses(p, -1), p);
      if (f) filas.push(f);
    }
  }

  return {
    monto: d.monto,
    desde: d.desde,
    hasta,
    hastaEsUltimo: hasta === ULTIMO_PERIODO,
    indiceDesde,
    indiceHasta,
    act,
    meses,
    porAnio,
    filas,
    brecha: d.actual === null ? null : brecha(d.monto, d.desde, hasta, d.actual),
    proximo: { periodo: sumarMeses(ULTIMO_PERIODO, 1), publicaEn: sumarMeses(ULTIMO_PERIODO, 2) },
  };
}

// Contra el último IPC es literalmente la cuenta de la pestaña «Tu sueldo vs. la inflación».
// Contra otro mes (sólo si la persona lo cambia en la entrega) es la misma fórmula.
function brecha(monto: number, desde: Periodo, hasta: Periodo, actual: number): Brecha | null {
  let equivalente: number;
  let diferenciaRealPct: number;
  if (hasta === ULTIMO_PERIODO) {
    const s = sueldoVsInflacion(monto, desde, actual);
    if (!s) return null;
    equivalente = s.sueldoEquivalente;
    diferenciaRealPct = s.diferenciaRealPct;
  } else {
    const a = actualizarMonto(monto, desde, hasta);
    if (!a || !(actual > 0)) return null;
    equivalente = a.montoActualizado;
    diferenciaRealPct = (actual / a.montoActualizado - 1) * 100;
  }
  const gana = diferenciaRealPct >= 0;
  return {
    actual,
    equivalente,
    diferencia: actual - equivalente,
    diferenciaRealPct,
    aumentoNecesarioPct: gana ? 0 : (equivalente / actual - 1) * 100,
    gana,
  };
}

/** «agosto de 2026» */
export const mesTxt = nombrePeriodo;

/** «ago 2026», para la tabla. */
export function mesCorto(p: Periodo): string {
  const m = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"][Number(p.slice(5, 7)) - 1];
  return `${m} ${p.slice(0, 4)}`;
}


/** Caso de ejemplo de la landing: honorarios fijados hace un año, con números de verdad. */
export const CASO_EJEMPLO: Datos = {
  monto: 350_000,
  desde: sumarMeses(ULTIMO_PERIODO, -12),
  hasta: null,
  actual: null,
  caso: "honorarios",
};
