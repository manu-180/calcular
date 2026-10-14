import type { FilaEscala } from "@/motor/tipos";

type Redondear = (n: number) => number;

// Somas e subtrações em ponto flutuante deixam resíduos como 2166.6549999999997 onde a conta
// decimal dá 2166.655, e o arredondamento cai para o lado errado. Cortar em 8 casas antes de
// arredondar devolve o valor decimal exato das contas da folha, que nunca passam de 6 casas.
export function limpo(n: number): number {
  return Math.round(n * 1e8) / 1e8;
}

// A tabela do INSS do empregado é progressiva por faixas: cada faixa paga a sua alíquota só sobre
// a parte do salário que cai nela, e nada acima do teto (Portaria Interministerial MPS/MF nº 13/2026).
// Por isso as faixas em datos.json começam exatamente onde termina a anterior.
export function inssEmpregado(salario: number, tabela: readonly FilaEscala[], teto: number, redondear: Redondear): number {
  const base = Math.min(Math.max(salario, 0), teto);
  let total = 0;
  for (const f of tabela) {
    if (base <= f.desde) break;
    const topo = f.hasta === null ? base : Math.min(base, f.hasta);
    total += ((topo - f.desde) * f.tasa) / 100;
  }
  return redondear(limpo(total));
}

export function aliquotaEfetiva(valor: number, base: number): number {
  return base > 0 ? (valor / base) * 100 : 0;
}

function faixa(tabela: readonly FilaEscala[], base: number): FilaEscala {
  let escolhida = tabela[0];
  for (const f of tabela) if (base >= f.desde) escolhida = f;
  return escolhida;
}

// Tabela da Receita: imposto = base × alíquota menos a parcela a deduzir (guardada em cuotaFija).
export function impostoTabela(tabela: readonly FilaEscala[], base: number, redondear: Redondear): number {
  if (base <= 0) return 0;
  const f = faixa(tabela, base);
  return redondear(limpo(Math.max(0, (base * f.tasa) / 100 - (f.cuotaFija ?? 0))));
}

export interface RegraReducao {
  isencao: number;
  limite: number;
  constante: number;
  fator: number;
}

// Lei nº 15.270/2025: a redução usa o rendimento tributável bruto (não a base de cálculo) e nunca
// passa do imposto da tabela. Até a isenção, zera o imposto; entre a isenção e o limite, cai em linha.
export function reducao(rendimento: number, imposto: number, regra: RegraReducao, redondear: Redondear): number {
  if (imposto <= 0 || rendimento > regra.limite) return 0;
  if (rendimento <= regra.isencao) return imposto;
  return Math.min(imposto, Math.max(0, redondear(limpo(regra.constante - regra.fator * rendimento))));
}

export interface EntradaIrrf {
  rendimento: number;
  inss: number;
  dependentes: number;
  pensao: number;
  outrasDeducoes: number;
}

export interface ValoresIrrf {
  tabela: readonly FilaEscala[];
  dependente: number;
  simplificado: number;
  regra: RegraReducao;
}

export interface ResultadoIrrf {
  deducoesLegais: number;
  deducao: number;
  simplificado: boolean;
  base: number;
  impostoTabela: number;
  reducao: number;
  irrf: number;
}

// A fonte pagadora compara as deduções legais com o desconto simplificado e usa o que for maior,
// separadamente no salário, nas férias e no 13º (orientação do eSocial e exemplos da Receita de 2026).
export function irrf(e: EntradaIrrf, v: ValoresIrrf, redondear: Redondear): ResultadoIrrf {
  const deducoesLegais = redondear(e.inss + e.dependentes * v.dependente + e.pensao + e.outrasDeducoes);
  const simplificado = v.simplificado > deducoesLegais;
  const deducao = simplificado ? v.simplificado : deducoesLegais;
  const base = redondear(Math.max(0, e.rendimento - deducao));
  const imposto = impostoTabela(v.tabela, base, redondear);
  const r = reducao(e.rendimento, imposto, v.regra, redondear);
  return { deducoesLegais, deducao, simplificado, base, impostoTabela: imposto, reducao: r, irrf: redondear(imposto - r) };
}

export const REQUISITOS_IRRF = {
  "br.irrf-mensal": "escala",
  "br.irrf-dependente": "numero",
  "br.irrf-desconto-simplificado": "numero",
  "br.reducao-mensal-isencao": "numero",
  "br.reducao-mensal-limite": "numero",
  "br.reducao-mensal-constante": "numero",
  "br.reducao-mensal-fator": "numero",
} as const;

export const REQUISITOS_INSS = {
  "br.inss-empregado": "escala",
  "br.teto-inss": "numero",
} as const;

export function valoresIrrf(v: {
  readonly "br.irrf-mensal": readonly FilaEscala[];
  readonly "br.irrf-dependente": number;
  readonly "br.irrf-desconto-simplificado": number;
  readonly "br.reducao-mensal-isencao": number;
  readonly "br.reducao-mensal-limite": number;
  readonly "br.reducao-mensal-constante": number;
  readonly "br.reducao-mensal-fator": number;
}): ValoresIrrf {
  return {
    tabela: v["br.irrf-mensal"],
    dependente: v["br.irrf-dependente"],
    simplificado: v["br.irrf-desconto-simplificado"],
    regra: {
      isencao: v["br.reducao-mensal-isencao"],
      limite: v["br.reducao-mensal-limite"],
      constante: v["br.reducao-mensal-constante"],
      fator: v["br.reducao-mensal-fator"],
    },
  };
}
