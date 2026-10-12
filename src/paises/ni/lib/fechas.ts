import type { FechaISO, FilaEscala } from "@/motor/tipos";

function armar(anio: number, mes: number, dia: number): FechaISO {
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) return anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

// Un plazo en meses vence el mismo día del mes de destino; si ese mes es más corto (31 de enero más
// un mes), vence el último día del mes.
export function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = fecha.split("-").map(Number);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return armar(anio, mes, Math.min(d, diasDelMes(anio, mes)));
}

export function fechaDe(anio: number, mes: number, dia: number): FechaISO {
  return armar(anio, mes, dia);
}

// Domingo de Pascua del calendario gregoriano (algoritmo anónimo de Meeus/Jones/Butcher).
export function domingoDePascua(anio: number): FechaISO {
  const a = anio % 19;
  const b = Math.floor(anio / 100);
  const c = anio % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return armar(anio, mes, dia);
}

// Tablas de la Ley de Concertación Tributaria donde el porcentaje del estrato se aplica sobre toda la
// base (artículos 52 y 87), no por tramos como la tarifa de rentas del trabajo.
export function filaDe(escala: readonly FilaEscala[], base: number): { fila: FilaEscala; numero: number } {
  let numero = 0;
  for (let i = 0; i < escala.length; i++) if (base >= escala[i].desde) numero = i;
  return { fila: escala[numero], numero: numero + 1 };
}
