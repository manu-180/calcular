import type { FechaISO } from "@/motor/tipos";

function partes(f: string): [number, number, number] {
  return [Number(f.slice(0, 4)), Number(f.slice(5, 7)), Number(f.slice(8, 10))];
}

function iso(a: number, m: number, d: number): FechaISO {
  return `${a}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` as FechaISO;
}

function diasNoMes(a: number, m: number): number {
  return new Date(Date.UTC(a, m, 0)).getUTCDate();
}

// Somar meses de calendário: 31 de janeiro + 1 mês dá o último dia de fevereiro.
export function somarMeses(f: string, meses: number): FechaISO {
  const [a, m, d] = partes(f);
  const total = a * 12 + (m - 1) + meses;
  const na = Math.floor(total / 12);
  const nm = (total % 12) + 1;
  return iso(na, nm, Math.min(d, diasNoMes(na, nm)));
}

export function somarDias(f: string, dias: number): FechaISO {
  const [a, m, d] = partes(f);
  const t = new Date(Date.UTC(a, m - 1, d + dias));
  return iso(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
}

export function diasEntre(inicio: string, fim: string): number {
  const [a1, m1, d1] = partes(inicio);
  const [a2, m2, d2] = partes(fim);
  return Math.round((Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86400000);
}

// Meses completos entre duas datas, contando o dia final como trabalhado (de 1 de março a 31 de
// dezembro são 10 meses).
export function mesesCompletos(inicio: string, fim: string): number {
  const depois = somarDias(fim, 1);
  let meses = 0;
  while (somarMeses(inicio, meses + 1) <= depois) meses++;
  return meses;
}

export interface Antiguidade {
  anos: number;
  diasRestantes: number;
  fracao: number;
}

// Anos completos e a fração do ano incompleto (dias a dividir pelos dias desse ano de contrato).
export function antiguidade(inicio: string, fim: string): Antiguidade {
  const depois = somarDias(fim, 1);
  let anos = 0;
  while (somarMeses(inicio, (anos + 1) * 12) <= depois) anos++;
  const inicioAno = somarMeses(inicio, anos * 12);
  const fimAno = somarMeses(inicio, (anos + 1) * 12);
  const diasRestantes = diasEntre(inicioAno, depois);
  return { anos, diasRestantes, fracao: anos + diasRestantes / diasEntre(inicioAno, fimAno) };
}

export function ano(f: string): number {
  return Number(f.slice(0, 4));
}

export function formatarData(f: string): string {
  return `${f.slice(8, 10)}/${f.slice(5, 7)}/${f.slice(0, 4)}`;
}
