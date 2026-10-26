// Fechas ISO sin la zona del servidor: todo se cuenta en UTC.
const partes = (f: string): [number, number, number] => [Number(f.slice(0, 4)), Number(f.slice(5, 7)), Number(f.slice(8, 10))];

export function diaJuliano(f: string): number {
  const [a, m, d] = partes(f);
  return Math.floor(Date.UTC(a, m - 1, d) / 86400000);
}

// Días trabajados contando el primero y el último.
export function diasTrabajados(inicio: string, fin: string): number {
  return diaJuliano(fin) - diaJuliano(inicio) + 1;
}

// Años completos: el aniversario tiene que caer a más tardar el día siguiente al último día trabajado.
export function aniosCompletos(inicio: string, fin: string): number {
  const [a1, m1, d1] = partes(inicio);
  const finMasUno = diaJuliano(fin) + 1;
  let anios = partes(fin)[0] - a1 + 1;
  while (anios > 0 && Math.floor(Date.UTC(a1 + anios, m1 - 1, d1) / 86400000) > finMasUno) anios -= 1;
  return Math.max(0, anios);
}

export function desdeJuliano(n: number): string {
  return new Date(n * 86400000).toISOString().slice(0, 10);
}

// Próximo día de pago en o después de la fecha: fin de mes, o también el 15 si se paga dos veces por mes.
export function proximoPago(f: string, quincenal: boolean): string {
  const [a, m, d] = partes(f);
  const fin = new Date(Date.UTC(a, m, 0)).getUTCDate();
  if (quincenal && d <= 15) return f.slice(0, 8) + "15";
  if (d <= fin) return f.slice(0, 8) + String(fin).padStart(2, "0");
  return f;
}
