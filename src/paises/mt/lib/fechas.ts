import type { FechaISO } from "@/motor/tipos";

function partes(fecha: FechaISO): [number, number, number] {
  const [a, m, d] = fecha.split("-").map(Number);
  return [a, m, d];
}

function dosCifras(n: number): string {
  return String(n).padStart(2, "0");
}

export function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) return anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

// Días desde el 1/1/1970 sin usar Date: el cálculo tiene que ser puro.
export function numeroDeDia(fecha: FechaISO): number {
  let [a, m, d] = partes(fecha);
  if (m <= 2) {
    a -= 1;
    m += 12;
  }
  const era = Math.floor(a / 400);
  const ano = a - era * 400;
  const dia = Math.floor((153 * (m - 3) + 2) / 5) + d - 1;
  const deEra = ano * 365 + Math.floor(ano / 4) - Math.floor(ano / 100) + dia;
  return era * 146097 + deEra - 719468;
}

export function desdeNumero(n: number): FechaISO {
  const z = n + 719468;
  const era = Math.floor(z / 146097);
  const deEra = z - era * 146097;
  const ano = Math.floor((deEra - Math.floor(deEra / 1460) + Math.floor(deEra / 36524) - Math.floor(deEra / 146096)) / 365);
  const dia = deEra - (365 * ano + Math.floor(ano / 4) - Math.floor(ano / 100));
  const mp = Math.floor((5 * dia + 2) / 153);
  const d = dia - Math.floor((153 * mp + 2) / 5) + 1;
  const m = mp < 10 ? mp + 3 : mp - 9;
  const a = ano + era * 400 + (m <= 2 ? 1 : 0);
  return `${a}-${dosCifras(m)}-${dosCifras(d)}` as FechaISO;
}

export function sumarDias(fecha: FechaISO, dias: number): FechaISO {
  return desdeNumero(numeroDeDia(fecha) + dias);
}

export function diasEntre(desde: FechaISO, hasta: FechaISO): number {
  return numeroDeDia(hasta) - numeroDeDia(desde);
}

// Mismo día del mes N meses después; si ese mes es más corto, el último día.
export function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const [a, m, d] = partes(fecha);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return `${anio}-${dosCifras(mes)}-${dosCifras(Math.min(d, diasDelMes(anio, mes)))}` as FechaISO;
}

// 0 = domingo ... 6 = sábado.
export function diaDeSemana(fecha: FechaISO): number {
  return (((numeroDeDia(fecha) + 4) % 7) + 7) % 7;
}

// Domingo de Pascua (algoritmo anónimo gregoriano).
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
  return `${anio}-${dosCifras(mes)}-${dosCifras(dia)}` as FechaISO;
}

export function anioDe(fecha: FechaISO): number {
  return Number(fecha.slice(0, 4));
}
