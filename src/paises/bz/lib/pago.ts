import type { FechaISO } from "@/motor/tipos";

// La Labour Act mide casi todo en semanas de salario. La semana ordinaria es de 45 horas (sección 116)
// y un año tiene 52 semanas (sección 185), así que un sueldo mensual vale 12 / 52 de semana por mes.
export const SEMANAS_POR_ANIO = 52;
export const MESES_POR_ANIO = 12;

export const BASES_PAGO = [
  { valor: "hora", etiqueta: "Per hour" },
  { valor: "semana", etiqueta: "Per week" },
  { valor: "mes", etiqueta: "Per month" },
] as const;

export function semanalDesdeMensual(mensual: number): number {
  return (mensual * MESES_POR_ANIO) / SEMANAS_POR_ANIO;
}

export function semanalDesde(monto: number, base: string, horasSemana: number): number {
  if (base === "hora") return monto * horasSemana;
  if (base === "mes") return semanalDesdeMensual(monto);
  return monto;
}

function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) return anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

export function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return `${anio}-${String(mes).padStart(2, "0")}-${String(Math.min(d, diasDelMes(anio, mes))).padStart(2, "0")}` as FechaISO;
}

// Años completos de servicio entre dos fechas (aniversarios cumplidos).
export function aniosCompletos(inicio: FechaISO, fin: FechaISO): number {
  let n = 0;
  while (sumarMeses(inicio, (n + 1) * 12) <= fin) n++;
  return n;
}

export function mesesCompletos(inicio: FechaISO, fin: FechaISO): number {
  let n = 0;
  while (sumarMeses(inicio, n + 1) <= fin) n++;
  return n;
}

export type TramoAviso = "none" | "short" | "medium" | "long" | "senior";

// Sección 37(2): más de 2 semanas hasta 6 meses, hasta 2 años, hasta 5 años, más de 5 años.
export function tramoDeAviso(inicio: FechaISO, fin: FechaISO, diasMinimos: number): TramoAviso {
  const dias = Math.round((Date.parse(`${fin}T00:00:00Z`) - Date.parse(`${inicio}T00:00:00Z`)) / 86_400_000);
  if (dias <= diasMinimos) return "none";
  if (fin <= sumarMeses(inicio, 6)) return "short";
  if (fin <= sumarMeses(inicio, 24)) return "medium";
  if (fin <= sumarMeses(inicio, 60)) return "long";
  return "senior";
}
