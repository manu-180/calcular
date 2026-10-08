import { ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

export const CAMPO_MONEDA = {
  id: "moneda",
  tipo: "opcion",
  etiqueta: "En qué moneda está tu salario",
  opciones: [
    { valor: "VES", etiqueta: "Bolívares (Bs.)" },
    { valor: "USD", etiqueta: "Dólares ($)" },
  ],
  porDefecto: "USD",
} as const;

export type MonedaSalario = "VES" | "USD";

export function enMoneda(valor: number, moneda: MonedaSalario): { bs: number | null; usd: number | null } {
  return moneda === "VES" ? { bs: valor, usd: null } : { bs: null, usd: valor };
}

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

export function mesesCompletos(desde: FechaISO, hasta: FechaISO): number {
  const t = tiempoTrabajado(desde, hasta);
  return t.anios * 12 + t.meses;
}

export function validarFechas(ingreso: FechaISO, salida: FechaISO) {
  if (salida < ingreso) throw new ErrorEntrada("La fecha de salida tiene que ser igual o posterior a la de ingreso.", "fechaSalida");
}

export function textoTiempo(t: Tiempo): string {
  const partes: string[] = [];
  if (t.anios) partes.push(`${t.anios} ${t.anios === 1 ? "año" : "años"}`);
  if (t.meses) partes.push(`${t.meses} ${t.meses === 1 ? "mes" : "meses"}`);
  if (t.dias || partes.length === 0) partes.push(`${t.dias} ${t.dias === 1 ? "día" : "días"}`);
  return partes.join(", ");
}

export interface DiasVacaciones {
  base: number;
  topeAdicionales: number;
  bonoBase: number;
  bonoTope: number;
}

// Art. 190: 15 días hábiles al cumplir el primer año y uno más por cada año siguiente, hasta 15
// adicionales. Art. 192: el bono se lee igual (15 el primer año, uno más por año, hasta 30). La
// redacción del 192 es ambigua y hay quien suma el día desde el primer año: va como aviso de cautela.
export function diasDeVacaciones(anioDeServicio: number, v: DiasVacaciones): { vacaciones: number; bono: number } {
  const extra = Math.max(0, anioDeServicio - 1);
  return {
    vacaciones: v.base + Math.min(extra, v.topeAdicionales),
    bono: Math.min(v.bonoBase + extra, v.bonoTope),
  };
}

// Art. 122: el salario de prestaciones integra la alícuota de utilidades y de bono vacacional. La
// alícuota es la parte diaria de un pago anual: días del beneficio por salario diario, entre 360.
export function salarioIntegralDiario(diario: number, diasUtilidades: number, diasBono: number, diasMes: number): number {
  const diasAnio = diasMes * 12;
  return diario + (diario * diasUtilidades) / diasAnio + (diario * diasBono) / diasAnio;
}

export interface ReglasPrestaciones {
  garantiaDias: number;
  adicionalesDias: number;
  adicionalesTope: number;
  retroactivoDias: number;
  diasPorMesCorto: number;
}

export interface Prestaciones {
  diasGarantia: number;
  diasRetroactivo: number;
  corta: boolean;
}

// Art. 142. a) 15 días por trimestre, ganados al empezar cada trimestre. b) desde el segundo año, 2
// días por año acumulativos (2, 4, 6...) hasta 30 por año. c) 30 días por año o fracción de más de
// seis meses. e) si dura menos de tres meses, 5 días por mes o fracción y nada más.
export function diasDePrestaciones(t: Tiempo, r: ReglasPrestaciones): Prestaciones {
  const totalMeses = t.anios * 12 + t.meses;
  if (totalMeses < 3) {
    const meses = t.meses + (t.dias > 0 ? 1 : 0);
    return { diasGarantia: 0, diasRetroactivo: Math.max(1, meses) * r.diasPorMesCorto, corta: true };
  }
  const trimestres = Math.floor(totalMeses / 3) + (totalMeses % 3 > 0 || t.dias > 0 ? 1 : 0);
  let adicionales = 0;
  for (let anio = 2; anio <= t.anios; anio++) adicionales += Math.min(r.adicionalesDias * (anio - 1), r.adicionalesTope);
  const masDeSeisMeses = t.meses > 6 || (t.meses === 6 && t.dias > 0);
  const anios = t.anios + (masDeSeisMeses ? 1 : 0);
  return { diasGarantia: trimestres * r.garantiaDias + adicionales, diasRetroactivo: anios * r.retroactivoDias, corta: false };
}
