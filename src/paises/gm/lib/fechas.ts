// Aritmética de fechas AAAA-MM-DD en UTC, sin depender de la zona del servidor.
function partes(fecha: string): [number, number, number] {
  const [a, m, d] = fecha.split("-").map(Number);
  return [a, m, d];
}

function aISO(t: number): string {
  return new Date(t).toISOString().slice(0, 10);
}

export function sumarDias(fecha: string, dias: number): string {
  const [a, m, d] = partes(fecha);
  return aISO(Date.UTC(a, m - 1, d + dias));
}

// Suma meses de calendario; si el día no existe en el mes de llegada, queda en el último día del mes.
export function sumarMeses(fecha: string, meses: number): string {
  const [a, m, d] = partes(fecha);
  const ultimo = new Date(Date.UTC(a, m - 1 + meses + 1, 0)).getUTCDate();
  return aISO(Date.UTC(a, m - 1 + meses, Math.min(d, ultimo)));
}

export function diasEntre(desde: string, hasta: string): number {
  const [a1, m1, d1] = partes(desde);
  const [a2, m2, d2] = partes(hasta);
  return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86400000);
}

// Suma días hábiles de lunes a viernes, sin contar el día de partida.
export function sumarDiasHabiles(fecha: string, dias: number): string {
  let actual = fecha;
  let cuenta = 0;
  while (cuenta < dias) {
    actual = sumarDias(actual, 1);
    const [a, m, d] = partes(actual);
    const dia = new Date(Date.UTC(a, m - 1, d)).getUTCDay();
    if (dia !== 0 && dia !== 6) cuenta++;
  }
  return actual;
}
