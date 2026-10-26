// Sumas de fechas sin Date, para que calcular() siga siendo pura.

function diasDelMes(anio: number, mes: number): number {
  return [31, anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
}

function partes(fecha: string): [number, number, number] {
  const [a, m, d] = fecha.split("-").map(Number);
  return [a, m, d];
}

function aTexto(a: number, m: number, d: number): string {
  return `${a}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

// Mismo día n meses después; si ese mes es más corto, el último día del mes.
export function sumarMeses(fecha: string, meses: number): string {
  const [a, m, d] = partes(fecha);
  const total = a * 12 + (m - 1) + meses;
  const anio = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return aTexto(anio, mes, Math.min(d, diasDelMes(anio, mes)));
}

function numeroDeDia(fecha: string): number {
  const [a, m, d] = partes(fecha);
  let n = d;
  for (let mes = 1; mes < m; mes++) n += diasDelMes(a, mes);
  const y = a - 1;
  return n + y * 365 + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
}

export function diasEntre(desde: string, hasta: string): number {
  return numeroDeDia(hasta) - numeroDeDia(desde);
}

export function sumarDias(fecha: string, dias: number): string {
  let [a, m, d] = partes(fecha);
  d += dias;
  while (d > diasDelMes(a, m)) {
    d -= diasDelMes(a, m);
    m += 1;
    if (m > 12) {
      m = 1;
      a += 1;
    }
  }
  while (d < 1) {
    m -= 1;
    if (m < 1) {
      m = 12;
      a -= 1;
    }
    d += diasDelMes(a, m);
  }
  return aTexto(a, m, d);
}
