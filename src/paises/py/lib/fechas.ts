import { diasEntre, sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

function partes(f: FechaISO): [number, number, number] {
  const [a, m, d] = f.split("-").map(Number);
  return [a, m, d];
}

export function fecha(anio: number, mes: number, dia: number): FechaISO {
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0 ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

// El día se recorta al último del mes (31/1 + 1 mes = 28 o 29/2), como cuenta la gente un mes de servicio.
export function sumarMeses(f: FechaISO, meses: number): FechaISO {
  const [a, m, d] = partes(f);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return fecha(anio, mes, Math.min(d, diasDelMes(anio, mes)));
}

export function aniosCumplidos(desde: FechaISO, hasta: FechaISO): number {
  let anios = 0;
  while (sumarMeses(desde, (anios + 1) * 12) <= hasta) anios++;
  return anios;
}

export function mayor(a: FechaISO, b: FechaISO): FechaISO {
  return a > b ? a : b;
}

export function diasInclusive(desde: FechaISO, hasta: FechaISO): number {
  return diasEntre(desde, hasta) + 1;
}

// El último día trabajado cuenta entero: quien entra el 1/3 y sale el 28/2 del año siguiente
// completó un año. Todas las antigüedades se miden hasta el día siguiente al egreso.
export function finDeServicio(egreso: FechaISO): FechaISO {
  return sumarDias(egreso, 1);
}

export interface Antiguedad {
  anios: number;
  meses: number;
  dias: number;
  // true si pasó del aniversario de los años cumplidos, aunque sea un día
  conFraccion: boolean;
}

export function antiguedad(ingreso: FechaISO, egreso: FechaISO): Antiguedad {
  const fin = finDeServicio(egreso);
  const anios = aniosCumplidos(ingreso, fin);
  let meses = 0;
  while (sumarMeses(ingreso, anios * 12 + meses + 1) <= fin) meses++;
  const dias = diasEntre(sumarMeses(ingreso, anios * 12 + meses), fin);
  return { anios, meses, dias, conFraccion: meses > 0 || dias > 0 };
}
