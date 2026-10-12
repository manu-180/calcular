import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { diasEntre, sumarDias } from "@/motor/vigencia";

// Salario diario = mensual / 30: así lo calcula el acuerdo de salario mínimo (jornada = mensual / 30)
// y el reglamento del décimo cuarto (artículo 7, «en base a treinta días»).
export const DIAS_MES = 30;
// Los proporcionales se cuentan en días calendario sobre 365; un período con 29 de febrero se topea
// en 365 para que el año completo dé el 100 %.
export const DIAS_ANIO = 365;

function fecha(anio: number, mes: number, dia: number): FechaISO {
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

function partes(f: FechaISO): [number, number, number] {
  const [a, m, d] = f.split("-").map(Number);
  return [a, m, d];
}

function diasDelMes(anio: number, mes: number): number {
  return [31, anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
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

// La fecha de salida es el último día trabajado: se cuenta hasta el día siguiente para que del 1/1
// al 31/12 dé un año justo.
export function tiempoTrabajado(ingreso: FechaISO, salida: FechaISO): Tiempo {
  const fin = sumarDias(salida, 1);
  let anios = 0;
  while (sumarMeses(ingreso, (anios + 1) * 12) <= fin) anios++;
  const base = sumarMeses(ingreso, anios * 12);
  let meses = 0;
  while (meses < 12 && sumarMeses(base, meses + 1) <= fin) meses++;
  return { anios, meses, dias: diasEntre(sumarMeses(base, meses), fin) };
}

export function textoTiempo(t: Tiempo): string {
  const partesTexto: string[] = [];
  if (t.anios) partesTexto.push(`${t.anios} ${t.anios === 1 ? "año" : "años"}`);
  if (t.meses) partesTexto.push(`${t.meses} ${t.meses === 1 ? "mes" : "meses"}`);
  if (t.dias || partesTexto.length === 0) partesTexto.push(`${t.dias} ${t.dias === 1 ? "día" : "días"}`);
  return partesTexto.join(", ");
}

export function validarFechas(ingreso: FechaISO, salida: FechaISO, campo = "fechaSalida") {
  if (salida < ingreso) throw new ErrorEntrada("La fecha de salida tiene que ser igual o posterior a la de ingreso.", campo);
}

const mesesExactos = (t: Tiempo, meses: number) => t.anios * 12 + t.meses === meses && t.dias === 0;
const totalMeses = (t: Tiempo) => t.anios * 12 + t.meses;

// Art. 116: «de tres a seis meses», «de seis meses a un año», «de uno a dos años» y «más de dos años».
// Los límites exactos (3, 6, 12 y 24 meses) quedan en el tramo de abajo, salvo el de 3 meses, que ya
// entra en «de tres a seis».
export function tramoPreaviso(t: Tiempo): "menos-de-3-meses" | "3-a-6-meses" | "6-a-12-meses" | "1-a-2-anios" | "mas-de-2-anios" {
  const m = totalMeses(t);
  if (m < 3) return "menos-de-3-meses";
  if (m < 6 || mesesExactos(t, 6)) return "3-a-6-meses";
  if (m < 12 || mesesExactos(t, 12)) return "6-a-12-meses";
  if (m < 24 || mesesExactos(t, 24)) return "1-a-2-anios";
  return "mas-de-2-anios";
}

export interface Cesantia {
  dias: number;
  meses: number;
  topada: boolean;
}

// Art. 120: de 3 a 6 meses, 10 días; más de 6 meses y menos de un año, 20 días; desde el año, un mes
// de salario por año y la fracción en proporción (meses y días sobre 360, el año de 12 meses de 30).
export function cesantia(t: Tiempo, menosDeUnAnio: Readonly<Record<string, number>>, topeMeses: number): Cesantia {
  const m = totalMeses(t);
  if (m < 3) return { dias: 0, meses: 0, topada: false };
  if (t.anios === 0) {
    const dias = m < 6 || mesesExactos(t, 6) ? menosDeUnAnio["3-a-6-meses"] : menosDeUnAnio["6-a-12-meses"];
    return { dias, meses: dias / DIAS_MES, topada: false };
  }
  const meses = t.anios + (t.meses * DIAS_MES + t.dias) / 360;
  const topada = meses > topeMeses;
  const pagados = Math.min(meses, topeMeses);
  return { dias: pagados * DIAS_MES, meses: pagados, topada };
}

function inicioPeriodo(corte: FechaISO, mesInicio: number): FechaISO {
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
  return { desde, dias: Math.min(DIAS_ANIO, diasEntre(desde, corte) + 1) };
}

export const MES_INICIO_DECIMO_CUARTO = 7;
export const MES_INICIO_DECIMO_TERCERO = 1;

// El décimo cuarto se paga en junio por el año que cierra el 30 de junio (reglamento, artículos 2 y 5).
export function corteDecimoCuarto(hoy: FechaISO): FechaISO {
  const [a, m] = partes(hoy);
  return fecha(m <= 6 ? a : a + 1, 6, 30);
}

export function corteDecimoTercero(hoy: FechaISO): FechaISO {
  const [a] = partes(hoy);
  return fecha(a, 12, 31);
}

function sumarAnios(f: FechaISO, anios: number): FechaISO {
  return sumarMeses(f, anios * 12);
}

export function ultimoAniversario(ingreso: FechaISO, hasta: FechaISO): { anios: number; fecha: FechaISO } {
  let anios = 0;
  while (sumarAnios(ingreso, anios + 1) <= hasta) anios++;
  return { anios, fecha: sumarAnios(ingreso, anios) };
}

export function salarioDiario(mensual: number): number {
  return mensual / DIAS_MES;
}

// Décimo tercero (enero a diciembre) y décimo cuarto (julio a junio): ante renuncia o despido se pagan
// en proporción a los días del período en curso (Decreto 112-82 art. 13; reglamento del décimo cuarto art. 9).
export function decimoProporcional(salario: number, porcentajeLey: number, ingreso: FechaISO, salida: FechaISO, mesInicio: number): Periodo & { monto: number } {
  const p = periodoTrabajado(ingreso, salida, mesInicio);
  return { ...p, monto: (((salario * porcentajeLey) / 100) * p.dias) / DIAS_ANIO };
}

const FILA_MAXIMA_VACACIONES = 4;

// Días proporcionales del año de servicio en curso, con la fila del año que se estaba por cumplir
// (art. 346), en días calendario sobre 365 como la calculadora de vacaciones.
export function vacacionesProporcionales(tabla: Readonly<Record<string, number>>, ingreso: FechaISO, salida: FechaISO): { anios: number; dias: number } {
  const aniversario = ultimoAniversario(ingreso, salida);
  const fila = String(Math.min(aniversario.anios + 1, FILA_MAXIMA_VACACIONES));
  const transcurridos = Math.min(DIAS_ANIO, diasEntre(aniversario.fecha, salida) + 1);
  return { anios: aniversario.anios, dias: ((tabla[fila] ?? 0) * transcurridos) / DIAS_ANIO };
}

export function diasVacacionesPorAnio(tabla: Readonly<Record<string, number>>, anios: number): number {
  return anios < 1 ? 0 : (tabla[String(Math.min(anios, FILA_MAXIMA_VACACIONES))] ?? 0);
}
