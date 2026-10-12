import { aplicarEscala } from "@/motor/calculo";
import type { FechaISO, FilaEscala } from "@/motor/tipos";
import { diasEntre } from "@/motor/vigencia";

// Las prestaciones proporcionales se cuentan sobre 365 días: un período con 29 de febrero se topea
// en 365 para que el año completo dé el 100 %.
export const DIAS_ANIO = 365;
// Vacaciones y horas extra: salario diario = mensual / 30 (práctica de liquidación; el Código no fija
// el divisor). El mínimo mensual no sale de acá: se usa el que publica el acuerdo, que no es diario × 30.
export const DIAS_MES = 30;

export const MES_INICIO_AGUINALDO = 12;
export const MES_INICIO_BONO_14 = 7;

function fecha(anio: number, mes: number, dia: number): FechaISO {
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

function partes(f: FechaISO): [number, number, number] {
  const [a, m, d] = f.split("-").map(Number);
  return [a, m, d];
}

export function diasInclusivos(desde: FechaISO, hasta: FechaISO): number {
  return diasEntre(desde, hasta) + 1;
}

export function inicioPeriodo(corte: FechaISO, mesInicio: number): FechaISO {
  const [a, m] = partes(corte);
  return fecha(m >= mesInicio ? a : a - 1, mesInicio, 1);
}

export interface Periodo {
  desde: FechaISO;
  dias: number;
}

export function periodoTrabajado(ingreso: FechaISO, corte: FechaISO, mesInicio: number): Periodo {
  const inicio = inicioPeriodo(corte, mesInicio);
  const desde = ingreso > inicio ? ingreso : inicio;
  return { desde, dias: Math.min(DIAS_ANIO, diasInclusivos(desde, corte)) };
}

// Fin del período que se paga en la próxima fecha de pago (o la que acaba de pasar, si todavía es el
// mes de pago): Bono 14 se paga en julio por el período que cierra el 30 de junio; el aguinaldo, en
// diciembre y enero por el que cierra el 30 de noviembre.
export function corteBono14(hoy: FechaISO): FechaISO {
  const [a, m] = partes(hoy);
  return fecha(m <= 7 ? a : a + 1, 6, 30);
}

export function corteAguinaldo(hoy: FechaISO): FechaISO {
  const [a, m] = partes(hoy);
  return fecha(m === 1 ? a - 1 : a, 11, 30);
}

function sumarAnios(f: FechaISO, anios: number): FechaISO {
  const [a, m, d] = partes(f);
  const destino = a + anios;
  const bisiesto = destino % 4 === 0 && (destino % 100 !== 0 || destino % 400 === 0);
  return fecha(destino, m, m === 2 && d === 29 && !bisiesto ? 28 : d);
}

// Suma meses de calendario. Si el día no existe en el mes de destino (31 de enero más un mes), se
// toma el último día de ese mes.
export function sumarMeses(f: FechaISO, meses: number): FechaISO {
  const [a, m, d] = partes(f);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  const bisiesto = anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0);
  const ultimo = [31, bisiesto ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
  return fecha(anio, mes, Math.min(d, ultimo));
}

export function aniosCumplidos(ingreso: FechaISO, hasta: FechaISO): number {
  let anios = 0;
  while (sumarAnios(ingreso, anios + 1) <= hasta) anios++;
  return anios;
}

export function ultimoAniversario(ingreso: FechaISO, hasta: FechaISO): FechaISO {
  let anios = 0;
  while (sumarAnios(ingreso, anios + 1) <= hasta) anios++;
  return sumarAnios(ingreso, anios);
}

export interface Isr {
  rentaNeta: number;
  deducciones: number;
  imponible: number;
  anual: number;
}

export function isrAnual(rentaNeta: number, deducciones: number, escala: readonly FilaEscala[], redondear: (n: number) => number): Isr {
  const imponible = redondear(Math.max(0, rentaNeta - deducciones));
  return { rentaNeta: redondear(rentaNeta), deducciones: redondear(deducciones), imponible, anual: redondear(aplicarEscala(escala, imponible)) };
}
