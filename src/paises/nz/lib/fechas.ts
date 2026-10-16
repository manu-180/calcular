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

// calcular() no puede usar Date: la aritmética de fechas va a mano. Un 29 de febrero que cae en
// un año no bisiesto pasa al 28.
export function sumarAnios(f: string, anios: number): FechaISO {
  const [a, m, d] = partes(f);
  const nuevo = a + anios;
  return armar(nuevo, m, Math.min(d, diasDelMes(nuevo, m)));
}

export function diaAnterior(f: string): FechaISO {
  const [a, m, d] = partes(f);
  if (d > 1) return armar(a, m, d - 1);
  if (m > 1) return armar(a, m - 1, diasDelMes(a, m - 1));
  return armar(a - 1, 12, 31);
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
