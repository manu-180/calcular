import { IPC_SERIE } from "@/data/ipc-serie";

// Toda la lógica trabaja sobre períodos "YYYY-MM" de la serie oficial del IPC Nacional
// (INDEC, base diciembre 2016 = 100) embebida en build time — la API es demasiado lenta
// para consultarla desde el navegador.

export type Periodo = string; // "YYYY-MM"

const INDICE = new Map<string, number>(IPC_SERIE.map(([p, v]) => [p, v]));

export const PRIMER_PERIODO: Periodo = IPC_SERIE[0][0];
export const ULTIMO_PERIODO: Periodo = IPC_SERIE[IPC_SERIE.length - 1][0];

export const MESES_LARGOS = [
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

export function nombrePeriodo(p: Periodo): string {
  const [anio, mes] = p.split("-");
  return `${MESES_LARGOS[Number(mes) - 1]} de ${anio}`;
}

export function nombreMes(p: Periodo): string {
  return MESES_LARGOS[Number(p.split("-")[1]) - 1];
}

export function periodoDe(anio: number, mes: number): Periodo {
  return `${anio}-${String(mes).padStart(2, "0")}`;
}

export function sumarMeses(p: Periodo, n: number): Periodo {
  const [anio, mes] = p.split("-").map(Number);
  const total = anio * 12 + (mes - 1) + n;
  return periodoDe(Math.floor(total / 12), (total % 12) + 1);
}

export function indiceDe(p: Periodo): number | null {
  return INDICE.get(p) ?? null;
}

export function existePeriodo(p: Periodo): boolean {
  return INDICE.has(p);
}

// Variación % entre dos períodos de la serie (positiva si los precios subieron).
export function inflacionEntre(desde: Periodo, hasta: Periodo): number | null {
  const a = indiceDe(desde);
  const b = indiceDe(hasta);
  if (a === null || b === null) return null;
  return (b / a - 1) * 100;
}

export type MontoActualizado = {
  factor: number;
  montoActualizado: number;
  variacionPct: number; // inflación acumulada entre desde y hasta
};

// Cuánto vale en `hasta` un monto expresado en plata de `desde`.
// Si desde > hasta, deflacta (factor < 1): también es una pregunta válida.
export function actualizarMonto(
  monto: number,
  desde: Periodo,
  hasta: Periodo
): MontoActualizado | null {
  const a = indiceDe(desde);
  const b = indiceDe(hasta);
  if (a === null || b === null) return null;
  if (!Number.isFinite(monto) || monto <= 0) return null;
  const factor = b / a;
  return { factor, montoActualizado: monto * factor, variacionPct: (factor - 1) * 100 };
}

// Variación mensual de un período contra el mes anterior, en %.
export function variacionMensual(p: Periodo): number | null {
  return inflacionEntre(sumarMeses(p, -1), p);
}

// Variación contra el mismo mes del año anterior, en %.
export function variacionInteranual(p: Periodo): number | null {
  return inflacionEntre(sumarMeses(p, -12), p);
}

export type InflacionAnual = {
  pct: number;
  completa: boolean; // false si el año todavía no terminó (acumulado parcial)
  hastaPeriodo: Periodo; // último mes incluido en el acumulado
};

// Inflación acumulada de un año calendario: diciembre del año anterior → diciembre
// del año (o el último mes disponible, marcado como parcial).
export function inflacionAcumuladaAnio(anio: number): InflacionAnual | null {
  const base = periodoDe(anio - 1, 12);
  if (!existePeriodo(base)) return null;
  const diciembre = periodoDe(anio, 12);
  const hastaPeriodo = existePeriodo(diciembre)
    ? diciembre
    : [...INDICE.keys()].filter((p) => p.startsWith(`${anio}-`)).sort().at(-1);
  if (!hastaPeriodo) return null;
  const pct = inflacionEntre(base, hastaPeriodo);
  if (pct === null) return null;
  return { pct, completa: hastaPeriodo === diciembre, hastaPeriodo };
}

export type FilaMensual = {
  periodo: Periodo;
  indice: number;
  mensualPct: number | null;
  acumuladaAnioPct: number | null; // desde diciembre del año anterior
  interanualPct: number | null;
};

// Tabla mes a mes de un año calendario (solo los meses publicados).
export function tablaAnio(anio: number): FilaMensual[] {
  const base = periodoDe(anio - 1, 12);
  const filas: FilaMensual[] = [];
  for (let mes = 1; mes <= 12; mes++) {
    const p = periodoDe(anio, mes);
    const indice = indiceDe(p);
    if (indice === null) continue;
    filas.push({
      periodo: p,
      indice,
      mensualPct: variacionMensual(p),
      acumuladaAnioPct: inflacionEntre(base, p),
      interanualPct: variacionInteranual(p),
    });
  }
  return filas;
}

// Años con datos publicados (completos o en curso). La serie arranca en dic-2016,
// que solo sirve de base: el primer año listado es 2017.
export function aniosDisponibles(): number[] {
  const anios = new Set<number>();
  for (const [p] of IPC_SERIE) anios.add(Number(p.slice(0, 4)));
  return [...anios].filter((a) => a >= 2017).sort((a, b) => a - b);
}

// Últimos n períodos publicados, del más viejo al más nuevo.
export function ultimosPeriodos(n: number): FilaMensual[] {
  return IPC_SERIE.slice(-n).map(([p, indice]) => ({
    periodo: p,
    indice,
    mensualPct: variacionMensual(p),
    acumuladaAnioPct: inflacionEntre(periodoDe(Number(p.slice(0, 4)) - 1, 12), p),
    interanualPct: variacionInteranual(p),
  }));
}

export type SueldoVsInflacion = {
  sueldoEquivalente: number; // lo que deberías cobrar hoy para empatar la inflación
  inflacionPct: number; // inflación acumulada del período
  diferencia: number; // sueldoHoy - sueldoEquivalente (en $ de hoy)
  diferenciaRealPct: number; // poder de compra ganado (+) o perdido (-)
  gana: boolean;
  hastaPeriodo: Periodo;
};

// Compara el sueldo actual contra el sueldo pasado ajustado por IPC hasta el último
// dato publicado. diferenciaRealPct = variación real del poder de compra.
export function sueldoVsInflacion(
  sueldoAntes: number,
  periodoAntes: Periodo,
  sueldoHoy: number
): SueldoVsInflacion | null {
  if (!Number.isFinite(sueldoAntes) || sueldoAntes <= 0) return null;
  if (!Number.isFinite(sueldoHoy) || sueldoHoy <= 0) return null;
  const act = actualizarMonto(sueldoAntes, periodoAntes, ULTIMO_PERIODO);
  if (!act) return null;
  const diferenciaRealPct = (sueldoHoy / act.montoActualizado - 1) * 100;
  return {
    sueldoEquivalente: act.montoActualizado,
    inflacionPct: act.variacionPct,
    diferencia: sueldoHoy - act.montoActualizado,
    diferenciaRealPct,
    gana: diferenciaRealPct >= 0,
    hastaPeriodo: ULTIMO_PERIODO,
  };
}

// ——— Ajuste de alquiler por IPC ———
//
// Convención: un ajuste con efecto en el mes M se calcula con la variación del IPC
// de los N meses calendario completos anteriores a M:
//   factor = índice(M-1) / índice(M-1-N)
// Es la lectura más directa de "ajuste trimestral/cuatrimestral/semestral por IPC".
// La letra exacta del contrato manda: algunos toman el último índice PUBLICADO al
// momento del ajuste (corre ~1 mes atrás por la demora de publicación del INDEC).

export type AjusteAlquiler = {
  n: number;
  periodoEfecto: Periodo; // mes desde el que rige el nuevo alquiler
  variacionPct: number; // IPC del período aplicado
  alquilerNuevo: number;
};

export type ProximoAjuste = {
  periodoEfecto: Periodo;
  // Período del IPC que falta publicar para poder calcularlo (null si ya se puede,
  // caso que no ocurre: si se pudiera, sería un ajuste más, no "próximo").
  esperandoIpcDe: Periodo;
  // Estimación proyectando la última variación mensual conocida para los meses faltantes.
  estimado: { variacionPct: number; alquilerNuevo: number; mensualUsadaPct: number } | null;
};

export type ResultadoAlquiler = {
  ajustes: AjusteAlquiler[];
  alquilerVigente: number;
  vigenteDesde: Periodo; // inicio del contrato o último ajuste aplicado
  proximo: ProximoAjuste | null;
};

export function ajustesAlquiler(params: {
  alquilerInicial: number;
  periodoInicio: Periodo; // primer mes del contrato (paga el valor inicial)
  cadaMeses: number;
  maxAjustes?: number;
}): ResultadoAlquiler | null {
  const { alquilerInicial, periodoInicio, cadaMeses } = params;
  const maxAjustes = params.maxAjustes ?? 24;
  if (!Number.isFinite(alquilerInicial) || alquilerInicial <= 0) return null;
  if (!Number.isInteger(cadaMeses) || cadaMeses < 1) return null;
  if (!existePeriodo(sumarMeses(periodoInicio, -1))) return null; // necesitamos el índice base

  const ajustes: AjusteAlquiler[] = [];
  let alquiler = alquilerInicial;
  let proximo: ProximoAjuste | null = null;

  for (let k = 1; k <= maxAjustes; k++) {
    const periodoEfecto = sumarMeses(periodoInicio, k * cadaMeses);
    const hastaIpc = sumarMeses(periodoEfecto, -1);
    const desdeIpc = sumarMeses(hastaIpc, -cadaMeses);
    const variacionPct = inflacionEntre(desdeIpc, hastaIpc);

    if (variacionPct === null) {
      // Falta publicar el IPC: este es el próximo ajuste. Estimamos proyectando la
      // última variación mensual conocida sobre los meses que faltan.
      const mensual = variacionMensual(ULTIMO_PERIODO);
      let estimado: ProximoAjuste["estimado"] = null;
      const idxDesde = indiceDe(desdeIpc);
      const idxUltimo = indiceDe(ULTIMO_PERIODO);
      if (mensual !== null && idxDesde !== null && idxUltimo !== null) {
        const mesesFaltantes = mesesEntre(ULTIMO_PERIODO, hastaIpc);
        if (mesesFaltantes > 0 && mesesFaltantes <= 12) {
          const idxProyectado = idxUltimo * Math.pow(1 + mensual / 100, mesesFaltantes);
          const factorEst = idxProyectado / idxDesde;
          estimado = {
            variacionPct: (factorEst - 1) * 100,
            alquilerNuevo: alquiler * factorEst,
            mensualUsadaPct: mensual,
          };
        }
      }
      proximo = { periodoEfecto, esperandoIpcDe: sumarMeses(ULTIMO_PERIODO, 1), estimado };
      break;
    }

    alquiler = alquiler * (1 + variacionPct / 100);
    ajustes.push({ n: k, periodoEfecto, variacionPct, alquilerNuevo: alquiler });
  }

  const vigenteDesde = ajustes.length
    ? ajustes[ajustes.length - 1].periodoEfecto
    : periodoInicio;
  return { ajustes, alquilerVigente: alquiler, vigenteDesde, proximo };
}

// Meses de diferencia entre dos períodos (b - a).
export function mesesEntre(a: Periodo, b: Periodo): number {
  const [ay, am] = a.split("-").map(Number);
  const [by, bm] = b.split("-").map(Number);
  return (by - ay) * 12 + (bm - am);
}
