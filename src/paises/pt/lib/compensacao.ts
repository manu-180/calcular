import { antiguidade } from "./datas";

export type Motivo = "despedimento" | "termo";

export const REQUISITOS_COMPENSACAO = {
  "pt.ct-compensacao": "mapa",
  "pt.ct-compensacao-limites": "mapa",
  "pt.rmmg": "numero",
} as const;

export interface ValoresCompensacao {
  readonly "pt.ct-compensacao": Readonly<Record<string, number>>;
  readonly "pt.ct-compensacao-limites": Readonly<Record<string, number>>;
  readonly "pt.rmmg": number;
}

export interface Compensacao {
  anos: number;
  dias: number;
  fracao: number;
  diasPorAno: number;
  retribuicaoConsiderada: number;
  valorDiario: number;
  semLimite: number;
  limite: number;
  compensacao: number;
  limitada: boolean;
}

// Artigo 366.º, n.º 2: retribuição considerada até 20 RMMG, valor diário = retribuição / 30, fração
// de ano proporcional, e teto de 12 retribuições ou de 240 RMMG quando a retribuição foi limitada.
export function compensacao(motivo: Motivo, retribuicao: number, inicio: string, fim: string, v: ValoresCompensacao, redondear: (n: number) => number): Compensacao {
  const lim = v["pt.ct-compensacao-limites"];
  const rmmg = v["pt.rmmg"];
  const ant = antiguidade(inicio, fim);
  const diasPorAno = v["pt.ct-compensacao"][motivo];
  const tetoRetribuicao = lim["retribuicao-rmmg"] * rmmg;
  const limitadaRetribuicao = retribuicao > tetoRetribuicao;
  const considerada = Math.min(retribuicao, tetoRetribuicao);
  const valorDiario = considerada / 30;
  const semLimite = valorDiario * diasPorAno * ant.fracao;
  const limite = limitadaRetribuicao ? lim["total-rmmg"] * rmmg : lim["total-meses"] * retribuicao;
  return {
    anos: ant.anos,
    dias: ant.diasRestantes,
    fracao: ant.fracao,
    diasPorAno,
    retribuicaoConsiderada: redondear(considerada),
    valorDiario: redondear(valorDiario),
    semLimite: redondear(semLimite),
    limite: redondear(limite),
    compensacao: redondear(Math.min(semLimite, limite)),
    limitada: semLimite > limite,
  };
}
