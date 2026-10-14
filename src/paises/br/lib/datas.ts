import { diasEntre, sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

function partes(f: FechaISO): [number, number, number] {
  const [a, m, d] = f.split("-").map(Number);
  return [a, m, d];
}

export function data(ano: number, mes: number, dia: number): FechaISO {
  return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

export function diasNoMes(ano: number, mes: number): number {
  if (mes === 2) return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0 ? 29 : 28;
  return [4, 6, 9, 11].includes(mes) ? 30 : 31;
}

// O dia se ajusta ao último do mês (31/1 + 1 mês = 28 ou 29/2).
export function somarMeses(f: FechaISO, meses: number): FechaISO {
  const [a, m, d] = partes(f);
  const total = a * 12 + (m - 1) + meses;
  const ano = Math.floor(total / 12);
  const mes = (total % 12) + 1;
  return data(ano, mes, Math.min(d, diasNoMes(ano, mes)));
}

export function anosCompletos(inicio: FechaISO, fim: FechaISO): number {
  let anos = 0;
  while (somarMeses(inicio, (anos + 1) * 12) <= fim) anos++;
  return anos;
}

// 13º: conta cada mês do ano civil em que a pessoa trabalhou 15 dias ou mais (Lei nº 4.090/1962,
// art. 1º, § 2º). Inicio e fim entram no período (o dia da saída é dia trabalhado).
export function avosDoAno(admissao: FechaISO, saida: FechaISO, ano: number, fracao: number): number {
  let avos = 0;
  for (let mes = 1; mes <= 12; mes++) {
    const primeiro = data(ano, mes, 1);
    const ultimo = data(ano, mes, diasNoMes(ano, mes));
    const de = admissao > primeiro ? admissao : primeiro;
    const ate = saida < ultimo ? saida : ultimo;
    if (ate < de) continue;
    if (diasEntre(de, ate) + 1 >= fracao) avos++;
  }
  return avos;
}

// Férias proporcionais: meses do período aquisitivo em curso (contado do aniversário da admissão),
// com a fração de mais de 14 dias valendo um mês (CLT, art. 146, parágrafo único).
export function avosDoPeriodoAquisitivo(admissao: FechaISO, saida: FechaISO, fracao: number): { avos: number; inicioPeriodo: FechaISO; periodosCompletos: number } {
  const periodosCompletos = anosCompletos(admissao, sumarDias(saida, 1));
  const inicioPeriodo = somarMeses(admissao, periodosCompletos * 12);
  const fimMais1 = sumarDias(saida, 1);
  let meses = 0;
  while (somarMeses(inicioPeriodo, meses + 1) <= fimMais1) meses++;
  const resto = diasEntre(somarMeses(inicioPeriodo, meses), fimMais1);
  return { avos: Math.min(12, meses + (resto >= fracao ? 1 : 0)), inicioPeriodo, periodosCompletos };
}

export function anoDe(f: FechaISO): number {
  return partes(f)[0];
}

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function nomeMes(f: string): string {
  return `${MESES[Number(f.slice(5, 7)) - 1]} de ${f.slice(0, 4)}`;
}
