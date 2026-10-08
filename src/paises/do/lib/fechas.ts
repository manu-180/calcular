import { diasEntre, sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

function diasDelMes(anio: number, mes: number): number {
  return [31, anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
}

export function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  const dia = Math.min(d, diasDelMes(anio, mes));
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

export interface Antiguedad {
  anios: number;
  meses: number;
  dias: number;
}

// Tiempo entre dos fechas como lo cuenta el Ministerio de Trabajo: del 15/3/2024 al 20/11/2026 son
// 2 años, 8 meses y 5 días.
export function antiguedad(inicio: FechaISO, termino: FechaISO): Antiguedad {
  let anios = 0;
  while (sumarMeses(inicio, (anios + 1) * 12) <= termino) anios++;
  const aniversario = sumarMeses(inicio, anios * 12);
  let meses = 0;
  while (meses < 12 && sumarMeses(aniversario, meses + 1) <= termino) meses++;
  return { anios, meses, dias: diasEntre(sumarMeses(aniversario, meses), termino) };
}

export function textoAntiguedad(a: Antiguedad): string {
  return `${a.anios} ${a.anios === 1 ? "año" : "años"}, ${a.meses} ${a.meses === 1 ? "mes" : "meses"} y ${a.dias} ${a.dias === 1 ? "día" : "días"}`;
}

// Meses trabajados en el año calendario de `fecha`, contando el día de ingreso y el de salida: meses
// completos más los días sueltos sobre 30. Del 1/1 al 31/12 da 12; del 16/7 al 31/12, 5 meses y 16 días.
export function mesesEnElAnio(fecha: FechaISO, ingreso: FechaISO | null, salida: FechaISO | null): number {
  const anio = Number(fecha.slice(0, 4));
  const inicioAnio = `${anio}-01-01` as FechaISO;
  const finAnio = `${anio}-12-31` as FechaISO;
  const desde = ingreso && ingreso > inicioAnio ? ingreso : inicioAnio;
  const hasta = salida && salida < finAnio ? salida : finAnio;
  if (hasta < desde) return 0;
  const finExclusivo = sumarDias(hasta, 1);
  let meses = 0;
  while (meses < 12 && sumarMeses(desde, meses + 1) <= finExclusivo) meses++;
  return Math.min(12, meses + diasEntre(sumarMeses(desde, meses), finExclusivo) / 30);
}
