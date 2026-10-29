function partes(fecha: string): { a: number; m: number; d: number } {
  return { a: Number(fecha.slice(0, 4)), m: Number(fecha.slice(5, 7)), d: Number(fecha.slice(8, 10)) };
}

export function somarDias(fecha: string, dias: number): string {
  const { a, m, d } = partes(fecha);
  return new Date(Date.UTC(a, m - 1, d + dias)).toISOString().slice(0, 10);
}

export function diasEntre(inicio: string, fim: string): number {
  const a = partes(inicio);
  const b = partes(fim);
  return Math.round((Date.UTC(b.a, b.m - 1, b.d) - Date.UTC(a.a, a.m - 1, a.d)) / 86400000);
}

// Soma meses de calendário; se o dia não existir no mês de chegada, fica no último dia desse mês.
export function somarMeses(fecha: string, meses: number): string {
  const { a, m, d } = partes(fecha);
  const alvo = new Date(Date.UTC(a, m - 1 + meses, 1));
  const ultimo = new Date(Date.UTC(alvo.getUTCFullYear(), alvo.getUTCMonth() + 1, 0)).getUTCDate();
  alvo.setUTCDate(Math.min(d, ultimo));
  return alvo.toISOString().slice(0, 10);
}
