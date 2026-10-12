import type { FechaISO } from "@/motor/tipos";

// Aritmética de calendario sin Date: calcular() tiene que ser pura y no depender de la zona horaria
// del proceso. Días civiles con el algoritmo de Howard Hinnant (days_from_civil).
export function diaCivil(fecha: FechaISO): number {
  const [a0, m, d] = fecha.split("-").map(Number);
  const a = m <= 2 ? a0 - 1 : a0;
  const era = Math.floor(a / 400);
  const ae = a - era * 400;
  const dda = Math.floor((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const ddE = ae * 365 + Math.floor(ae / 4) - Math.floor(ae / 100) + dda;
  return era * 146097 + ddE - 719468;
}

export function partes(fecha: FechaISO): { anio: number; mes: number; dia: number } {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  return { anio, mes, dia };
}

export function aFecha(anio: number, mes: number, dia: number): FechaISO {
  return `${String(anio).padStart(4, "0")}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

export function diasDelMes(anio: number, mes: number): number {
  if (mes === 2) return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0 ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

export function mayor(a: FechaISO, b: FechaISO): FechaISO {
  return a > b ? a : b;
}

// Meses calendario completos y días sueltos entre dos fechas, ambas inclusive. Un mes cuenta solo si
// se trabajó del primero al último día; los días del mes inicial y final incompletos se suman como
// treintavos (así lo piden la CTS y la gratificación trunca, que van por mes calendario).
export function mesesCalendarioYDias(desde: FechaISO, hasta: FechaISO): { meses: number; dias: number } {
  if (hasta < desde) return { meses: 0, dias: 0 };
  const i = partes(desde);
  const f = partes(hasta);
  if (i.anio === f.anio && i.mes === f.mes) {
    const completo = i.dia === 1 && f.dia === diasDelMes(f.anio, f.mes);
    return completo ? { meses: 1, dias: 0 } : { meses: 0, dias: f.dia - i.dia + 1 };
  }
  let dias = 0;
  let meses = 0;
  if (i.dia === 1) meses++;
  else dias += diasDelMes(i.anio, i.mes) - i.dia + 1;
  if (f.dia === diasDelMes(f.anio, f.mes)) meses++;
  else dias += f.dia;
  const intermedios = (f.anio - i.anio) * 12 + (f.mes - i.mes) - 1;
  meses += Math.max(0, intermedios);
  meses += Math.floor(dias / 30);
  return { meses, dias: dias % 30 };
}

// Solo meses calendario completos (gratificación trunca: los días sueltos no cuentan).
export function mesesCalendarioCompletos(desde: FechaISO, hasta: FechaISO): number {
  if (hasta < desde) return 0;
  const i = partes(desde);
  const f = partes(hasta);
  const primero = i.dia === 1 ? i.anio * 12 + i.mes : i.anio * 12 + i.mes + 1;
  const ultimo = f.dia === diasDelMes(f.anio, f.mes) ? f.anio * 12 + f.mes : f.anio * 12 + f.mes - 1;
  return Math.max(0, ultimo - primero + 1);
}

// Años, meses y días desde una fecha de inicio contando por aniversario (récord vacacional,
// tiempo de servicios para la indemnización). "hasta" es el último día trabajado.
export function aniosMesesDias(desde: FechaISO, hasta: FechaISO): { anios: number; meses: number; dias: number } {
  if (hasta < desde) return { anios: 0, meses: 0, dias: 0 };
  const fin = partes(hasta);
  const finExcl = fin.dia === diasDelMes(fin.anio, fin.mes)
    ? (fin.mes === 12 ? aFecha(fin.anio + 1, 1, 1) : aFecha(fin.anio, fin.mes + 1, 1))
    : aFecha(fin.anio, fin.mes, fin.dia + 1);
  const i = partes(desde);
  const f = partes(finExcl);
  let total = (f.anio - i.anio) * 12 + (f.mes - i.mes);
  if (f.dia < i.dia) total--;
  const base = sumarMeses(desde, total);
  const dias = diaCivil(finExcl) - diaCivil(base);
  return { anios: Math.floor(total / 12), meses: total % 12, dias: Math.min(dias, 29) };
}

export function sumarMeses(fecha: FechaISO, n: number): FechaISO {
  const p = partes(fecha);
  const total = p.anio * 12 + (p.mes - 1) + n;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return aFecha(anio, mes, Math.min(p.dia, diasDelMes(anio, mes)));
}

// Inversa de diaCivil (civil_from_days de Hinnant): para sumar días sin Date.
export function fechaDesdeDia(dias: number): FechaISO {
  const z = dias + 719468;
  const era = Math.floor(z / 146097);
  const doe = z - era * 146097;
  const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
  const mp = Math.floor((5 * doy + 2) / 153);
  const dia = doy - Math.floor((153 * mp + 2) / 5) + 1;
  const mes = mp < 10 ? mp + 3 : mp - 9;
  return aFecha(yoe + era * 400 + (mes <= 2 ? 1 : 0), mes, dia);
}

export function sumarDias(fecha: FechaISO, n: number): FechaISO {
  return fechaDesdeDia(diaCivil(fecha) + n);
}

export function diasEntre(desde: FechaISO, hasta: FechaISO): number {
  return diaCivil(hasta) - diaCivil(desde);
}
