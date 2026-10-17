import type { FechaISO } from "@/motor/tipos";

function bisiesto(anio: number): boolean {
  return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
}

const DIAS_MES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function diasDelMes(anio: number, mes: number): number {
  return mes === 2 && bisiesto(anio) ? 29 : DIAS_MES[mes - 1];
}

function partes(f: string): [number, number, number] {
  return [Number(f.slice(0, 4)), Number(f.slice(5, 7)), Number(f.slice(8, 10))];
}

function armar(a: number, m: number, d: number): FechaISO {
  return `${a}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` as FechaISO;
}

// calcular() no puede usar Date: la aritmética de fechas va a mano.
export function sumarMeses(f: string, meses: number): FechaISO {
  const [a, m, d] = partes(f);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return armar(anio, mes, Math.min(d, diasDelMes(anio, mes)));
}

function diaJuliano(f: string): number {
  const [a, m, d] = partes(f);
  const y = m <= 2 ? a - 1 : a;
  const mm = m <= 2 ? m + 12 : m;
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (mm + 1)) + d - Math.floor(y / 100) + Math.floor(Math.floor(y / 100) / 4) - 1524;
}

export function diasEntre(desde: string, hasta: string): number {
  return diaJuliano(hasta) - diaJuliano(desde);
}

// Meses completos de servicio entre el primer día y el último día trabajado, los dos incluidos.
export function mesesCompletos(desde: string, hasta: string): number {
  let meses = 0;
  while (sumarMeses(desde, meses + 1) <= armarSiguiente(hasta)) meses++;
  return meses;
}

function armarSiguiente(f: string): FechaISO {
  const [a, m, d] = partes(f);
  if (d < diasDelMes(a, m)) return armar(a, m, d + 1);
  if (m < 12) return armar(a, m + 1, 1);
  return armar(a + 1, 1, 1);
}
