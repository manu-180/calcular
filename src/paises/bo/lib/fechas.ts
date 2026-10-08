import { diasEntre, sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

function partes(f: FechaISO): [number, number, number] {
  const [a, m, d] = f.split("-").map(Number);
  return [a, m, d];
}

export function fecha(anio: number, mes: number, dia: number): FechaISO {
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

export function anioDe(f: FechaISO): number {
  return partes(f)[0];
}

function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0 ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

// El día se recorta al último del mes (31/1 + 1 mes = 28 o 29/2).
export function sumarMeses(f: FechaISO, meses: number): FechaISO {
  const [a, m, d] = partes(f);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return fecha(anio, mes, Math.min(d, diasDelMes(anio, mes)));
}

export function mayor(a: FechaISO, b: FechaISO): FechaISO {
  return a > b ? a : b;
}

export function menor(a: FechaISO, b: FechaISO): FechaISO {
  return a < b ? a : b;
}

export interface Tiempo {
  anios: number;
  meses: number;
  dias: number;
}

// Años, meses y días entre dos fechas, sin contar el día final. Es como cuenta el Ministerio de
// Trabajo la antigüedad en su ejercicio de beneficios sociales: del 21/07/2021 al 15/09/2023 da
// "2 años 1 mes 25 días".
export function tiempoEntre(desde: FechaISO, hasta: FechaISO): Tiempo {
  let anios = 0;
  while (sumarMeses(desde, (anios + 1) * 12) <= hasta) anios++;
  let meses = 0;
  while (sumarMeses(desde, anios * 12 + meses + 1) <= hasta) meses++;
  const dias = diasEntre(sumarMeses(desde, anios * 12 + meses), hasta);
  return { anios, meses, dias };
}

// Meses y días de un período contando el primer y el último día. Es como cuenta el Ministerio las
// duodécimas del aguinaldo: del 1 de enero al 15 de septiembre son 8 meses y 15 días.
export function mesesYDiasInclusive(desde: FechaISO, hasta: FechaISO): { meses: number; dias: number } {
  const t = tiempoEntre(desde, sumarDias(hasta, 1));
  return { meses: t.anios * 12 + t.meses, dias: t.dias };
}

export function textoTiempo(t: Tiempo): string {
  const a = `${t.anios} ${t.anios === 1 ? "año" : "años"}`;
  const m = `${t.meses} ${t.meses === 1 ? "mes" : "meses"}`;
  const d = `${t.dias} ${t.dias === 1 ? "día" : "días"}`;
  return `${a}, ${m} y ${d}`;
}

export function diasCorridosInclusive(desde: FechaISO, hasta: FechaISO): number {
  return diasEntre(desde, hasta) + 1;
}
