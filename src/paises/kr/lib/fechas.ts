// Aritmética de fechas ISO sin Date de la zona local: los días se cuentan en UTC para que el
// resultado no dependa del huso del servidor.
const partes = (f: string): [number, number, number] => [Number(f.slice(0, 4)), Number(f.slice(5, 7)), Number(f.slice(8, 10))];

export function diaJuliano(f: string): number {
  const [a, m, d] = partes(f);
  return Math.floor(Date.UTC(a, m - 1, d) / 86400000);
}

// Días entre dos fechas contando las dos puntas (del 1 al 31 de enero son 31 días).
export function diasInclusive(desde: string, hasta: string): number {
  return diaJuliano(hasta) - diaJuliano(desde) + 1;
}

export function sumarDias(f: string, dias: number): string {
  return new Date((diaJuliano(f) + dias) * 86400000).toISOString().slice(0, 10);
}

// El mismo día n meses antes o después; si ese mes no tiene el día, el último del mes.
export function sumarMeses(f: string, meses: number): string {
  const [a, m, d] = partes(f);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  const ultimo = new Date(Date.UTC(anio, mes, 0)).getUTCDate();
  return `${anio}-${String(mes).padStart(2, "0")}-${String(Math.min(d, ultimo)).padStart(2, "0")}`;
}

// Meses completos de servicio desde el ingreso hasta la fecha de referencia (el aniversario mensual
// tiene que haber llegado).
export function mesesCompletos(ingreso: string, fecha: string): number {
  const [a1, m1] = partes(ingreso);
  const [a2, m2] = partes(fecha);
  let meses = (a2 - a1) * 12 + (m2 - m1);
  if (sumarMeses(ingreso, meses) > fecha) meses -= 1;
  return Math.max(0, meses);
}
