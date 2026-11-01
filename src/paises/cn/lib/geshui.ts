import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Fila de la escala que corresponde a una base (los límites son «超过 X 至 Y 的部分»: Y queda en la fila).
export function filaDe(escala: readonly FilaEscala[], base: number): FilaEscala {
  return escala.find((f) => f.hasta === null || base <= f.hasta) ?? escala[escala.length - 1];
}

// Las tablas oficiales traen 速算扣除数; es la diferencia entre aplicar la tasa de la fila a toda la base
// y el impuesto por tramos, igual en cualquier punto de la fila.
export function susuanKouchu(escala: readonly FilaEscala[], base: number): number {
  const f = filaDe(escala, base);
  const punto = Math.max(base, f.desde);
  return Math.round((punto * f.tasa) / 100 - aplicarEscalaMarginal(escala, punto));
}

export function impuestoPorTramos(escala: readonly FilaEscala[], base: number): { impuesto: number; tasa: number; kouchu: number } {
  if (base <= 0) return { impuesto: 0, tasa: 0, kouchu: 0 };
  const f = filaDe(escala, base);
  return { impuesto: aplicarEscalaMarginal(escala, base), tasa: f.tasa, kouchu: susuanKouchu(escala, base) };
}

// 累计预扣法 (国家税务总局公告2018年第61号, 第六条): impuesto acumulado a la fecha menos lo ya retenido.
export function leijiYukou(
  escala: readonly FilaEscala[],
  mensual: { shouru: number; zhuanxiang: number; fujia: number; qita: number },
  jianchu: number,
  mes: number,
): { yingna: number; benyue: number; leijiSuode: number; tasa: number } {
  const suode = (m: number) => Math.max(0, m * (mensual.shouru - jianchu - mensual.zhuanxiang - mensual.fujia - mensual.qita));
  const hasta = (m: number) => (m <= 0 ? 0 : aplicarEscalaMarginal(escala, suode(m)));
  const yingna = hasta(mes);
  const leijiSuode = suode(mes);
  return { yingna, benyue: Math.max(0, yingna - hasta(mes - 1)), leijiSuode, tasa: leijiSuode > 0 ? filaDe(escala, leijiSuode).tasa : 0 };
}
