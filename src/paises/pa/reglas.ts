import { ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

function diasDelMes(anio: number, mes: number): number {
  return [31, anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
}

function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  const dia = Math.min(d, diasDelMes(anio, mes));
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

export interface Tiempo {
  anios: number;
  meses: number;
  dias: number;
}

// La fecha de salida es el último día trabajado: se cuenta hasta el día siguiente para que del
// 1/1 al 31/12 dé un año justo.
export function tiempoTrabajado(ingreso: FechaISO, salida: FechaISO): Tiempo {
  const fin = sumarDias(salida, 1);
  let anios = 0;
  while (sumarMeses(ingreso, (anios + 1) * 12) <= fin) anios++;
  const base = sumarMeses(ingreso, anios * 12);
  let meses = 0;
  while (meses < 12 && sumarMeses(base, meses + 1) <= fin) meses++;
  return { anios, meses, dias: diasEntre(sumarMeses(base, meses), fin) };
}

// Meses con fracción: los días sueltos cuentan en treintavos, como el mes comercial que usa el MITRADEL.
export const mesesConFraccion = (t: Tiempo) => t.anios * 12 + t.meses + t.dias / 30;

export function validarFechas(ingreso: FechaISO, salida: FechaISO) {
  if (salida < ingreso) throw new ErrorEntrada("La fecha de salida tiene que ser igual o posterior a la de ingreso.", "fechaSalida");
}

// Ley 44 de 1995 (promulgada el 14/8/1995): la escala del literal C del art. 225 vale solo para
// relaciones que empezaron desde entonces. Las anteriores combinan las escalas A y B por tramos.
export const INICIO_LEY_44: FechaISO = "1995-08-14";

export function validarIngresoLey44(ingreso: FechaISO) {
  if (ingreso < INICIO_LEY_44) {
    throw new ErrorEntrada(
      "Si empezaste a trabajar antes del 14 de agosto de 1995, la indemnización se calcula con otras escalas del artículo 225. Esta calculadora no las cubre.",
      "fechaIngreso",
    );
  }
}

// Art. 225, literal C: 3,4 semanas por cada uno de los primeros diez años y una por cada año
// posterior. Los años incompletos se pagan en proporción.
export function semanasIndemnizacion(anios: number, porAnioHasta10: number, porAnioDesde11: number): number {
  const primeros = Math.min(anios, 10);
  const resto = Math.max(anios - 10, 0);
  return primeros * porAnioHasta10 + resto * porAnioDesde11;
}

// El salario semanal sale del mensual: 12 meses entre 52 semanas (el MITRADEL divide el total de
// cinco años entre 260 semanas, que es lo mismo).
export const semanalDeMensual = (mensual: number) => (mensual * 12) / 52;

// Períodos del décimo: 16/12 al 15/4, 16/4 al 15/8 y 16/8 al 15/12.
export function inicioPeriodoDecimo(salida: FechaISO): FechaISO {
  const [a, m, d] = salida.split("-").map(Number);
  const md = m * 100 + d;
  if (md >= 416 && md <= 815) return `${a}-04-16` as FechaISO;
  if (md >= 816 && md <= 1215) return `${a}-08-16` as FechaISO;
  return (md >= 1216 ? `${a}-12-16` : `${a - 1}-12-16`) as FechaISO;
}

export function mesesEnPeriodoDecimo(ingreso: FechaISO, salida: FechaISO): number {
  const inicio = inicioPeriodoDecimo(salida);
  const desde = ingreso > inicio ? ingreso : inicio;
  return Math.min(4, mesesConFraccion(tiempoTrabajado(desde, salida)));
}

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

export function textoTiempo(t: Tiempo): string {
  return `${plural(t.anios, "año", "años")}, ${plural(t.meses, "mes", "meses")} y ${plural(t.dias, "día", "días")}`;
}
