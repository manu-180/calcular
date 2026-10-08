import { diasEntre, sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function diasDelMes(anio: number, mes: number): number {
  return [31, anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
}

export function fecha(anio: number, mes: number, dia: number): FechaISO {
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

export function partes(f: FechaISO): [number, number, number] {
  const [a, m, d] = f.split("-").map(Number);
  return [a, m, d];
}

export function sumarMeses(f: FechaISO, meses: number): FechaISO {
  const [a, m, d] = partes(f);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return fecha(anio, mes, Math.min(d, diasDelMes(anio, mes)));
}

export interface Tiempo {
  anios: number;
  meses: number;
  dias: number;
}

// Tiempo trabajado del primer al último día, los dos incluidos: del 1/1 al 31/12 es un año justo.
export function tiempoTrabajado(inicio: FechaISO, ultimoDia: FechaISO): Tiempo {
  const fin = sumarDias(ultimoDia, 1);
  let anios = 0;
  while (sumarMeses(inicio, (anios + 1) * 12) <= fin) anios++;
  const aniversario = sumarMeses(inicio, anios * 12);
  let meses = 0;
  while (meses < 12 && sumarMeses(aniversario, meses + 1) <= fin) meses++;
  return { anios, meses, dias: diasEntre(sumarMeses(aniversario, meses), fin) };
}

// Los beneficios que se pagan por doceavas (décimos, vacaciones) cuentan el mes como treinta días.
export function enMeses(t: Tiempo): number {
  return t.anios * 12 + t.meses + t.dias / 30;
}

export function textoTiempo(t: Tiempo): string {
  const p = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;
  return `${p(t.anios, "año", "años")}, ${p(t.meses, "mes", "meses")} y ${p(t.dias, "día", "días")}`;
}

export function fechaLarga(f: FechaISO): string {
  const [a, m, d] = partes(f);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}

export interface Periodo {
  inicio: FechaISO;
  fin: FechaISO;
}

// Período anual que empieza el día 1 del mes indicado y contiene la fecha dada.
export function periodoQueContiene(f: FechaISO, mesInicio: number): Periodo {
  const [a, m] = partes(f);
  const anio = m >= mesInicio ? a : a - 1;
  const inicio = fecha(anio, mesInicio, 1);
  return { inicio, fin: sumarDias(sumarMeses(inicio, 12), -1) };
}

export function maxFecha(a: FechaISO, b: FechaISO): FechaISO {
  return a > b ? a : b;
}
