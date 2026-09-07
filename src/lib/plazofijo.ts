import { UVA } from "@/data/plazofijo";

const DIAS_ANIO = 365;
const DIAS_MES = 30;

// Interés simple de un plazo fijo tradicional: capital × TNA × días / 365.
export function interesPlazoFijo(capital: number, tnaPct: number, dias: number): number {
  return (capital * (tnaPct / 100) * dias) / DIAS_ANIO;
}

// Factor de crecimiento de un período (1 + tasa efectiva del período).
export function factorPeriodo(tnaPct: number, dias: number): number {
  return 1 + ((tnaPct / 100) * dias) / DIAS_ANIO;
}

// Tasa efectiva mensual (período de 30 días), en %.
export function tem(tnaPct: number): number {
  return ((tnaPct / 100) * DIAS_MES * 100) / DIAS_ANIO;
}

// Tasa efectiva anual si se renovara el plazo todo el año (interés compuesto), en %.
export function tea(tnaPct: number, dias: number): number {
  return (Math.pow(factorPeriodo(tnaPct, dias), DIAS_ANIO / dias) - 1) * 100;
}

export type PeriodoRenovacion = {
  n: number; // número de período (1 = el plazo fijo original)
  diasAcumulados: number;
  capital: number; // capital al vencimiento de ese período
  interesDelPeriodo: number;
};

export type ResultadoPlazoFijo = {
  // Plazo fijo original (sin renovar)
  interes: number;
  total: number;
  tasaEfectivaPeriodoPct: number;
  temPct: number;
  teaPct: number;
  // Con renovaciones (si renovaciones = 0, coincide con el original)
  renovaciones: number;
  diasTotales: number;
  periodos: PeriodoRenovacion[];
  totalFinal: number;
  interesTotal: number;
  rendimientoTotalPct: number;
  // Comparación contra la inflación estimada (sobre diasTotales)
  inflacionPeriodoPct: number;
  poderCompraFinal: number; // totalFinal expresado en plata de hoy
  resultadoRealPct: number; // ganancia/pérdida real de poder de compra
  leGanaALaInflacion: boolean;
  // Alternativa UVA sobre el mismo horizonte (null si no llega al plazo mínimo)
  uva: { total: number; interesAdicional: number; tnaAdicionalPct: number } | null;
};

export function calcularPlazoFijo(params: {
  capital: number;
  dias: number;
  tnaPct: number;
  renovaciones?: number;
  inflacionMensualPct: number;
  uvaTnaAdicionalPct?: number;
}): ResultadoPlazoFijo | null {
  const { capital, dias, tnaPct, inflacionMensualPct } = params;
  const renovaciones = Math.max(0, Math.floor(params.renovaciones ?? 0));
  if (!Number.isFinite(capital) || capital <= 0) return null;
  if (!Number.isFinite(dias) || dias < 1) return null;
  if (!Number.isFinite(tnaPct) || tnaPct < 0) return null;

  const interes = interesPlazoFijo(capital, tnaPct, dias);
  const total = capital + interes;
  const factor = factorPeriodo(tnaPct, dias);

  const periodos: PeriodoRenovacion[] = [];
  let acumulado = capital;
  for (let n = 1; n <= renovaciones + 1; n++) {
    const interesDelPeriodo = interesPlazoFijo(acumulado, tnaPct, dias);
    acumulado += interesDelPeriodo;
    periodos.push({ n, diasAcumulados: n * dias, capital: acumulado, interesDelPeriodo });
  }
  const diasTotales = dias * (renovaciones + 1);
  const totalFinal = acumulado;

  // Inflación del período total, componiendo la mensual estimada (mes = 30 días,
  // la misma convención que usa el propio plazo fijo).
  const factorInflacion = Math.pow(1 + inflacionMensualPct / 100, diasTotales / DIAS_MES);
  const poderCompraFinal = totalFinal / factorInflacion;
  const resultadoRealPct = (poderCompraFinal / capital - 1) * 100;

  // Plazo fijo UVA sobre el mismo horizonte: el capital sigue a la inflación
  // estimada y suma la tasa adicional del banco (interés simple sobre el período).
  let uva: ResultadoPlazoFijo["uva"] = null;
  if (diasTotales >= UVA.plazoMinimoDias) {
    const tnaAdicionalPct = params.uvaTnaAdicionalPct ?? UVA.tnaAdicionalDefaultPct;
    const capitalAjustado = capital * factorInflacion;
    const interesAdicional = interesPlazoFijo(capitalAjustado, tnaAdicionalPct, diasTotales);
    uva = { total: capitalAjustado + interesAdicional, interesAdicional, tnaAdicionalPct };
  }

  return {
    interes,
    total,
    tasaEfectivaPeriodoPct: (factor - 1) * 100,
    temPct: tem(tnaPct),
    teaPct: tea(tnaPct, dias),
    renovaciones,
    diasTotales,
    periodos,
    totalFinal,
    interesTotal: totalFinal - capital,
    rendimientoTotalPct: (totalFinal / capital - 1) * 100,
    inflacionPeriodoPct: (factorInflacion - 1) * 100,
    poderCompraFinal,
    resultadoRealPct,
    leGanaALaInflacion: resultadoRealPct >= 0,
    uva,
  };
}
