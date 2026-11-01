import { ErrorEntrada } from "@/motor/calculo";

// Lei Geral do Trabalho, artigo 237.º, n.º 7: S/H = (Sm × 12) / (52 × Hs).
export function salarioHora(salarioMensal: number, horasSemanais: number, semanasAno: number): number {
  if (horasSemanais <= 0) throw new ErrorEntrada("Indique as horas do período normal de trabalho semanal.", "horasSemanais");
  return (salarioMensal * 12) / (semanasAno * horasSemanais);
}

function partes(fecha: string): { a: number; m: number; d: number } {
  return { a: Number(fecha.slice(0, 4)), m: Number(fecha.slice(5, 7)), d: Number(fecha.slice(8, 10)) };
}

// Anos e meses completos entre duas datas, contados de aniversário a aniversário.
export function tempoDeServico(admissao: string, cessacao: string): { anos: number; meses: number } {
  if (cessacao < admissao) throw new ErrorEntrada("A data de cessação tem de ser posterior à data de admissão.", "cessacao");
  const i = partes(admissao);
  const f = partes(cessacao);
  let meses = (f.a - i.a) * 12 + (f.m - i.m);
  if (f.d < i.d) meses -= 1;
  meses = Math.max(0, meses);
  return { anos: Math.floor(meses / 12), meses: meses % 12 };
}

// Artigo 311.º: a fracção de ano igual ou superior a três meses conta como um ano inteiro.
export function anosDeAntiguidade(admissao: string, cessacao: string, fraccaoMeses: number): number {
  const t = tempoDeServico(admissao, cessacao);
  return t.anos + (t.meses >= fraccaoMeses ? 1 : 0);
}

export function somarDias(fecha: string, dias: number): string {
  const { a, m, d } = partes(fecha);
  return new Date(Date.UTC(a, m - 1, d + dias)).toISOString().slice(0, 10);
}
