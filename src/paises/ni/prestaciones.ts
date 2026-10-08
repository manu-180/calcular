import { aplicarEscala, porcentaje } from "@/motor/calculo";
import type { FechaISO, FilaEscala } from "@/motor/tipos";
import { diasEntre } from "@/motor/vigencia";

// Lo proporcional se cuenta sobre 365 días calendario: un período con 29 de febrero se topea en 365
// para que el año completo dé el 100 %.
export const DIAS_ANIO = 365;
// Salario diario = mensual / 30: es la práctica de las planillas; el Código no fija el divisor.
export const DIAS_MES = 30;
export const ANIOS_A_UN_MES = 3;

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

// El Código no dice cuándo empieza el año del décimo tercer mes. Se usa el de costumbre: del 1 de
// diciembre al 30 de noviembre, porque se paga en los primeros diez días de diciembre (art. 95).
export function corteAguinaldo(hoy: FechaISO): FechaISO {
  return fecha(partes(hoy)[0], 11, 30);
}

export function inicioPeriodoAguinaldo(corte: FechaISO): FechaISO {
  const [a, m] = partes(corte);
  return fecha(m === 12 ? a : a - 1, 12, 1);
}

export interface Periodo {
  desde: FechaISO;
  dias: number;
}

export function periodoAguinaldo(ingreso: FechaISO, corte: FechaISO): Periodo {
  const inicio = inicioPeriodoAguinaldo(corte);
  const desde = ingreso > inicio ? ingreso : inicio;
  return { desde, dias: Math.min(DIAS_ANIO, diasInclusivos(desde, corte)) };
}

function sumarAnios(f: FechaISO, anios: number): FechaISO {
  const [a, m, d] = partes(f);
  const destino = a + anios;
  const bisiesto = destino % 4 === 0 && (destino % 100 !== 0 || destino % 400 === 0);
  return fecha(destino, m, m === 2 && d === 29 && !bisiesto ? 28 : d);
}

export interface Antiguedad {
  completos: number;
  ultimoAniversario: FechaISO;
  diasDelAnioEnCurso: number;
  anios: number;
}

export function antiguedad(ingreso: FechaISO, salida: FechaISO): Antiguedad {
  let completos = 0;
  while (sumarAnios(ingreso, completos + 1) <= salida) completos++;
  const ultimoAniversario = sumarAnios(ingreso, completos);
  const diasDelAnioEnCurso = Math.min(DIAS_ANIO, diasInclusivos(ultimoAniversario, salida));
  // Si el último día es la víspera del aniversario, ese año ya está completo.
  if (diasDelAnioEnCurso === DIAS_ANIO) return { completos: completos + 1, ultimoAniversario, diasDelAnioEnCurso: 0, anios: completos + 1 };
  return { completos, ultimoAniversario, diasDelAnioEnCurso, anios: completos + diasDelAnioEnCurso / DIAS_ANIO };
}

export interface ReglaIndemnizacion {
  mesesPorAnio: number;
  diasDesdeCuarto: number;
  minimoMeses: number;
  topeMeses: number;
}

// Art. 45: un mes por cada uno de los tres primeros años y veinte días por año desde el cuarto; las
// fracciones de año se pagan proporcionales.
export function mesesIndemnizacion(anios: number, r: ReglaIndemnizacion, conMinimo: boolean): number {
  const primeros = Math.min(anios, ANIOS_A_UN_MES) * r.mesesPorAnio;
  const siguientes = (Math.max(0, anios - ANIOS_A_UN_MES) * r.diasDesdeCuarto) / DIAS_MES;
  const sinLimites = primeros + siguientes;
  return Math.min(r.topeMeses, conMinimo ? Math.max(r.minimoMeses, sinLimites) : sinLimites);
}

export interface IrSalarial {
  inss: number;
  netoMensual: number;
  rentaNetaAnual: number;
  irAnual: number;
  irMensual: number;
}

// Reglamento de la Ley 822 (Decreto 01-2013, art. 19): salario bruto menos INSS, por doce, tarifa del
// art. 23 y el resultado entre doce.
export function irSalarial(bruto: number, tasaInss: number, escala: readonly FilaEscala[], redondear: (n: number) => number): IrSalarial {
  const inss = redondear(porcentaje(bruto, tasaInss));
  const netoMensual = redondear(bruto - inss);
  const rentaNetaAnual = redondear(netoMensual * 12);
  const irAnual = redondear(aplicarEscala(escala, rentaNetaAnual));
  return { inss, netoMensual, rentaNetaAnual, irAnual, irMensual: redondear(irAnual / 12) };
}
