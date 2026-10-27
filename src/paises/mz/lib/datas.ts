import { ErrorEntrada } from "@/motor/calculo";

function partes(fecha: string): { a: number; m: number; d: number } {
  return { a: Number(fecha.slice(0, 4)), m: Number(fecha.slice(5, 7)), d: Number(fecha.slice(8, 10)) };
}

export function somarDias(fecha: string, dias: number): string {
  const { a, m, d } = partes(fecha);
  return new Date(Date.UTC(a, m - 1, d + dias)).toISOString().slice(0, 10);
}

// Mesmo dia do mês seguinte; se esse dia não existir (31 de Abril), o último dia do mês.
export function somarMeses(fecha: string, meses: number): string {
  const { a, m, d } = partes(fecha);
  const ultimo = new Date(Date.UTC(a, m - 1 + meses + 1, 0)).getUTCDate();
  return new Date(Date.UTC(a, m - 1 + meses, Math.min(d, ultimo))).toISOString().slice(0, 10);
}

export function diasEntre(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);
}

// Anos, meses e dias completos entre duas datas, de aniversário a aniversário.
export function tempoDeServico(admissao: string, cessacao: string, campo: string): { anos: number; meses: number; dias: number } {
  if (cessacao < admissao) throw new ErrorEntrada("A data de cessação tem de ser posterior à data de admissão.", campo);
  const i = partes(admissao);
  const f = partes(cessacao);
  let meses = (f.a - i.a) * 12 + (f.m - i.m);
  if (f.d < i.d) meses -= 1;
  meses = Math.max(0, meses);
  const dias = diasEntre(somarMeses(admissao, meses), cessacao);
  return { anos: Math.floor(meses / 12), meses: meses % 12, dias };
}
