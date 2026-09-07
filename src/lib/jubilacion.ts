// Motor previsional: movilidad mensual, bono proporcional y actualización de un haber en el tiempo.
//
// ⚠️ ENCUADRE — leer antes de tocar esto. Esto NO liquida un beneficio ni reemplaza a ANSES:
// reproduce con la norma en la mano cómo se mueve un haber mes a mes. El importe que se cobra puede
// diferir por descuentos (obra social, PAMI, cuotas, embargos), por prestaciones de otros regímenes
// (cajas provinciales, moratorias con cuota, regímenes especiales) o por topes propios del beneficio.
//
// LA REGLA (Decreto 274/2024): la movilidad de un mes es la variación del IPC del INDEC de DOS
// MESES ANTES, redondeada a dos decimales en porcentaje, y se aplica sobre el haber del mes previo.
// Está verificada contra la serie oficial de ANSES en scripts/gen_jubilaciones.ts (aborta si un mes
// no cierra al centavo) y en scripts/check_jubilaciones.ts.

import { HABER_MINIMO_SERIE, HABER_MINIMO_ULTIMO, type MesJubilacion } from "@/data/jubilaciones";
import { IPC_SERIE } from "@/data/ipc-serie";

const r2 = (n: number) => Math.round(n * 100) / 100;

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "2026-08" → "agosto 2026". */
export function etiquetaPeriodo(periodo: string): string {
  const [anio, mes] = periodo.split("-");
  return `${MESES[Number(mes) - 1]} ${anio}`;
}

/** Corre `n` meses sobre un período "YYYY-MM" (n negativo va hacia atrás). */
export function sumarMeses(periodo: string, n: number): string {
  const [anio, mes] = periodo.split("-").map(Number);
  const d = new Date(Date.UTC(anio, mes - 1 + n, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

const ipc = new Map(IPC_SERIE.map(([p, v]) => [p, v]));

/**
 * Movilidad que corresponde al mes `periodo`, en % con 2 decimales: la variación del IPC de dos
 * meses antes. Devuelve null si todavía no se publicó ese IPC — nunca estima.
 */
export function movilidadDe(periodo: string): number | null {
  const pIpc = sumarMeses(periodo, -2);
  const actual = ipc.get(pIpc);
  const previo = ipc.get(sumarMeses(pIpc, -1));
  if (actual === undefined || previo === undefined) return null;
  return Math.round((actual / previo - 1) * 100 * 100) / 100;
}

/** Busca un mes de la serie oficial. null si ese período no está publicado. */
export function mesDeSerie(periodo: string): MesJubilacion | null {
  return HABER_MINIMO_SERIE.find((m) => m.periodo === periodo) ?? null;
}

export type ProyeccionMes = {
  periodo: string;
  haberMinimo: number;
  movilidad: number;
  /** El IPC cuya variación fija esta movilidad (dos meses antes). */
  ipcDe: string;
  /**
   * "oficial" = el valor está en la serie de ANSES o en la resolución ya publicada.
   * "determinado" = la resolución todavía no salió, pero el IPC que la fija YA se publicó, así que
   * el valor está determinado por la norma. No es un pronóstico.
   */
  origen: "oficial" | "determinado";
};

/**
 * El primer mes cuyo haber todavía NO tiene resolución publicada pero YA está determinado por la
 * norma, porque el IPC que lo fija salió. null si no hay ninguno (el IPC nuevo todavía no salió).
 *
 * Es el corazón del producto: entre que el INDEC publica el IPC (~día 12) y que ANSES dicta la
 * resolución (~fin de mes) hay ~3 semanas en las que el número ya existe y nadie lo publica.
 */
export function proximoMesDeterminado(): ProyeccionMes | null {
  const siguiente = sumarMeses(HABER_MINIMO_ULTIMO.periodo, 1);
  const mov = movilidadDe(siguiente);
  if (mov === null) return null;
  return {
    periodo: siguiente,
    haberMinimo: r2(HABER_MINIMO_ULTIMO.haberMinimo * (1 + mov / 100)),
    movilidad: mov,
    ipcDe: sumarMeses(siguiente, -2),
    origen: "determinado",
  };
}

export type ResultadoBono = {
  /** Importe del bono que corresponde a ese haber, ya prorrateado. 0 = no le toca. */
  bono: number;
  /** Haber + bono. */
  total: number;
  /** Tope hasta el que el bono completa: haber mínimo + bono máximo. */
  tope: number;
  /** "completo" | "parcial" | "sin-bono" — para explicar el resultado, no para decorar. */
  tramo: "completo" | "parcial" | "sin-bono";
};

/**
 * Liquida el bono extraordinario sobre un haber (Decreto 824/2026, arts. 3 y 4).
 *
 * El tramo "parcial" es lo que casi nadie explica: quien cobra por encima del mínimo NO recibe los
 * $70.000 completos, sino lo justo para llegar a mínimo + bono. Entre el mínimo y ese tope, todos
 * terminan cobrando exactamente lo mismo.
 */
export function calcularBono(
  haber: number,
  haberMinimo: number,
  bonoMaximo: number,
): ResultadoBono | null {
  if (!Number.isFinite(haber) || haber < 0) return null;
  if (!Number.isFinite(haberMinimo) || haberMinimo <= 0) return null;
  if (!Number.isFinite(bonoMaximo) || bonoMaximo < 0) return null;

  const tope = r2(haberMinimo + bonoMaximo);

  if (haber <= haberMinimo) {
    return { bono: bonoMaximo, total: r2(haber + bonoMaximo), tope, tramo: "completo" };
  }
  if (haber >= tope) {
    return { bono: 0, total: r2(haber), tope, tramo: "sin-bono" };
  }
  const bono = r2(tope - haber);
  return { bono, total: tope, tramo: "parcial", tope };
}

export type PasoActualizacion = {
  periodo: string;
  movilidad: number;
  haber: number;
};

export type ResultadoActualizacion = {
  desde: string;
  hasta: string;
  haberInicial: number;
  haberFinal: number;
  /** Cuánto se multiplicó el haber en el tramo (1,25 = subió 25%). */
  coeficiente: number;
  /** Variación acumulada del IPC en el mismo tramo, en %. null si falta algún IPC. */
  inflacionAcumulada: number | null;
  /** Poder de compra: >0 el haber le ganó a la inflación, <0 perdió. En %. null si falta IPC. */
  brechaReal: number | null;
  pasos: PasoActualizacion[];
};

/**
 * Actualiza un haber desde un mes hasta otro aplicando la movilidad mes a mes, y lo compara contra
 * la inflación del mismo tramo.
 *
 * Devuelve null si algún mes del tramo no tiene movilidad conocida — no completa huecos.
 */
export function actualizarHaber(
  haberInicial: number,
  desde: string,
  hasta: string,
): ResultadoActualizacion | null {
  if (!Number.isFinite(haberInicial) || haberInicial <= 0) return null;
  if (desde >= hasta) return null;

  const pasos: PasoActualizacion[] = [];
  let haber = haberInicial;
  let periodo = desde;

  // Guarda contra un `hasta` absurdo: como mucho, 10 años de pasos.
  for (let i = 0; i < 120 && periodo !== hasta; i++) {
    periodo = sumarMeses(periodo, 1);
    const mes = mesDeSerie(periodo);
    const mov = mes?.movilidad ?? movilidadDe(periodo);
    if (mov === null || mov === undefined) return null;
    haber = r2(haber * (1 + mov / 100));
    pasos.push({ periodo, movilidad: mov, haber });
  }
  if (periodo !== hasta) return null;

  const ipcDesde = ipc.get(desde);
  const ipcHasta = ipc.get(hasta);
  const inflacionAcumulada =
    ipcDesde !== undefined && ipcHasta !== undefined ? (ipcHasta / ipcDesde - 1) * 100 : null;

  const coeficiente = haber / haberInicial;
  const brechaReal =
    inflacionAcumulada === null
      ? null
      : (coeficiente / (1 + inflacionAcumulada / 100) - 1) * 100;

  return {
    desde,
    hasta,
    haberInicial: r2(haberInicial),
    haberFinal: haber,
    coeficiente,
    inflacionAcumulada,
    brechaReal,
    pasos,
  };
}

/** Variación interanual del haber mínimo en un período dado, en %. null si no hay 12 meses atrás. */
export function varInteranualHaber(periodo: string): number | null {
  const i = HABER_MINIMO_SERIE.findIndex((m) => m.periodo === periodo);
  if (i < 12) return null;
  return (HABER_MINIMO_SERIE[i].haberMinimo / HABER_MINIMO_SERIE[i - 12].haberMinimo - 1) * 100;
}
