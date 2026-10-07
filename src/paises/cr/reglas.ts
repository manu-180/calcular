import { ErrorEntrada } from "@/motor/calculo";
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

export function validarFechas(ingreso: FechaISO, salida: FechaISO) {
  if (salida < ingreso) throw new ErrorEntrada("La fecha de salida tiene que ser igual o posterior a la de ingreso.", "fechaSalida");
}

const masDeSeisMeses = (t: Tiempo) => t.meses > 6 || (t.meses === 6 && t.dias > 0);
const totalMeses = (t: Tiempo) => t.anios * 12 + t.meses;

export function tramoMenorAlAnio(t: Tiempo): "menos-de-3-meses" | "3-a-6-meses" | "6-a-12-meses" | null {
  if (t.anios > 0) return null;
  if (t.meses < 3) return "menos-de-3-meses";
  return masDeSeisMeses(t) ? "6-a-12-meses" : "3-a-6-meses";
}

// Art. 28: «después de un año» es más de un año; el año justo queda en el tramo de 15 días.
export function diasPreaviso(t: Tiempo, tabla: Readonly<Record<string, number>>): number {
  const tramo = tramoMenorAlAnio(t);
  if (tramo === "menos-de-3-meses") return 0;
  if (tramo) return tabla[tramo];
  if (t.anios === 1 && t.meses === 0 && t.dias === 0) return tabla["6-a-12-meses"];
  return tabla["mas-de-un-anio"];
}

export interface Cesantia {
  aniosComputables: number;
  aniosPagados: number;
  diasPorAnio: number;
  dias: number;
}

// Art. 29: con un año o más, cada año o fracción superior a seis meses cuenta como año; la fila de
// la tabla sale de esos años (la 13 vale para 13 y siguientes) y solo se pagan los últimos 8.
// El año justo (12 meses exactos) va por la tabla: los incisos 2 y 3 lo dejan afuera a los dos.
export function cesantia(
  t: Tiempo,
  menosDeUnAnio: Readonly<Record<string, number>>,
  porAnio: Readonly<Record<string, number>>,
  tope: number,
): Cesantia {
  const tramo = tramoMenorAlAnio(t);
  if (tramo === "menos-de-3-meses") return { aniosComputables: 0, aniosPagados: 0, diasPorAnio: 0, dias: 0 };
  if (tramo) return { aniosComputables: 0, aniosPagados: 0, diasPorAnio: 0, dias: menosDeUnAnio[tramo] };
  const aniosComputables = t.anios + (masDeSeisMeses(t) ? 1 : 0);
  const fila = String(Math.min(aniosComputables, 13));
  const diasPorAnio = porAnio[fila];
  const aniosPagados = Math.min(aniosComputables, tope);
  return { aniosComputables, aniosPagados, diasPorAnio, dias: diasPorAnio * aniosPagados };
}

export function inicioPeriodoAguinaldo(salida: FechaISO): FechaISO {
  const [a, m] = salida.split("-").map(Number);
  return (m === 12 ? `${a}-12-01` : `${a - 1}-12-01`) as FechaISO;
}

// Meses (con fracción en treintavos) trabajados dentro del período del aguinaldo.
export function mesesEnPeriodo(ingreso: FechaISO, salida: FechaISO): number {
  const inicio = inicioPeriodoAguinaldo(salida);
  const desde = ingreso > inicio ? ingreso : inicio;
  const t = tiempoTrabajado(desde, salida);
  return Math.min(12, t.anios * 12 + t.meses + t.dias / 30);
}

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

export function textoTiempo(t: Tiempo): string {
  return `${plural(t.anios, "año", "años")}, ${plural(t.meses, "mes", "meses")} y ${plural(t.dias, "día", "días")}`;
}

export const cumpleUnMes = (t: Tiempo) => totalMeses(t) >= 1;
