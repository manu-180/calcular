import { diasEntre } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

function partes(f: FechaISO): [number, number, number] {
  return [Number(f.slice(0, 4)), Number(f.slice(5, 7)), Number(f.slice(8, 10))];
}

function diasDelMes(anio: number, mes: number): number {
  return [31, (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
}

// Meses entre dos fechas contando como completo el mes empezado. Es el criterio que aplican los
// tribunales al «prorrateo por meses» de la indemnización por despido (ET 53 y 56).
export function mesesProrrateados(desde: FechaISO, hasta: FechaISO): number {
  if (hasta <= desde) return 0;
  const [a1, m1, d1] = partes(desde);
  const [a2, m2, d2] = partes(hasta);
  let meses = (a2 - a1) * 12 + (m2 - m1);
  if (d2 < d1) meses -= 1;
  const anioTope = a1 + Math.floor((m1 - 1 + meses) / 12);
  const mesTope = ((m1 - 1 + meses) % 12) + 1;
  const diaTope = Math.min(d1, diasDelMes(anioTope, mesTope));
  const tope = `${anioTope}-${String(mesTope).padStart(2, "0")}-${String(diaTope).padStart(2, "0")}` as FechaISO;
  return tope < hasta ? meses + 1 : meses;
}

export function diasDelAnio(anio: number): number {
  return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0 ? 366 : 365;
}

export function diasInclusivos(desde: FechaISO, hasta: FechaISO): number {
  return hasta < desde ? 0 : diasEntre(desde, hasta) + 1;
}

export function primeroDeEnero(f: FechaISO): FechaISO {
  return `${f.slice(0, 4)}-01-01` as FechaISO;
}
