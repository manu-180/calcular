import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export type Situacao = "nao-casado" | "casado-dois" | "casado-unico";
export type Tabela = "i" | "ii" | "iii";

export const OPCOES_SITUACAO = [
  { valor: "nao-casado", etiqueta: "Não casado" },
  { valor: "casado-dois", etiqueta: "Casado ou unido de facto, dois titulares" },
  { valor: "casado-unico", etiqueta: "Casado ou unido de facto, único titular" },
] as const;

export const REQUISITOS_RETENCAO = {
  "pt.retencao-tabela-i": "escala",
  "pt.retencao-tabela-ii": "escala",
  "pt.retencao-tabela-iii": "escala",
  "pt.retencao-formulas": "mapa",
  "pt.retencao-parcela-dependente": "mapa",
  "pt.retencao-reducao-3-dependentes": "numero",
  "pt.retencao-percentagem": "numero",
} as const;

export interface ValoresRetencao {
  readonly "pt.retencao-tabela-i": readonly FilaEscala[];
  readonly "pt.retencao-tabela-ii": readonly FilaEscala[];
  readonly "pt.retencao-tabela-iii": readonly FilaEscala[];
  readonly "pt.retencao-formulas": Readonly<Record<string, number>>;
  readonly "pt.retencao-parcela-dependente": Readonly<Record<string, number>>;
  readonly "pt.retencao-reducao-3-dependentes": number;
  readonly "pt.retencao-percentagem": number;
}

export function tabelaDe(situacao: Situacao, dependentes: number): Tabela {
  if (situacao === "casado-unico") return "iii";
  if (situacao === "nao-casado" && dependentes > 0) return "ii";
  return "i";
}

export const NOME_TABELA: Record<Tabela, string> = {
  i: "Tabela I (não casado sem dependentes ou casado dois titulares)",
  ii: "Tabela II (não casado com dependentes)",
  iii: "Tabela III (casado, único titular)",
};

export interface Retencao {
  tabela: Tabela;
  linha: number;
  taxa: number;
  parcela: number;
  parcelaDependentes: number;
  retencao: number;
  tabelaSemAjuste: number;
  ajustada: boolean;
}

// O despacho de 2026 define a parcela a abater da 2.ª e da 3.ª linha como taxa × fator × (limite − R),
// com a taxa da própria linha. Com três ou mais dependentes baixa um ponto só a taxa marginal (n.º 5,
// alínea h): a parcela dessas linhas continua a usar a taxa original.
// O ajuste de um mês (pt.retencao-percentagem, em novembro de 2026 metade da tabela) não vale para
// quem ganha acima do limite do penúltimo escalão (Despacho n.º 12523-A/2026, n.º 3). O subsídio de
// desemprego pede a taxa da tabela sem ajuste, por isso pode desligá-lo.
export function retencaoMensal(
  remuneracao: number,
  situacao: Situacao,
  dependentes: number,
  v: ValoresRetencao,
  redondear: (n: number) => number,
  comAjuste = true,
): Retencao {
  const tabela = tabelaDe(situacao, dependentes);
  const escala = v[`pt.retencao-tabela-${tabela}`];
  let indice = escala.findIndex((f) => f.hasta === null || remuneracao <= f.hasta);
  if (indice < 0) indice = escala.length - 1;
  const fila = escala[indice];
  const linha = indice + 1;
  const prefixo = tabela === "iii" ? "iii" : "i";
  const fator = v["pt.retencao-formulas"][`${prefixo}-fator-${linha}`];
  const limite = v["pt.retencao-formulas"][`${prefixo}-limite-${linha}`];
  const parcela = fator !== undefined && limite !== undefined ? (fila.tasa / 100) * fator * (limite - remuneracao) : (fila.cuotaFija ?? 0);
  const reducao = dependentes >= 3 && fila.tasa > 0 ? v["pt.retencao-reducao-3-dependentes"] : 0;
  const taxa = Math.max(0, fila.tasa - reducao);
  const parcelaDependentes = fila.tasa > 0 ? v["pt.retencao-parcela-dependente"][tabela] * dependentes : 0;
  const tabelaSemAjuste = redondear(Math.max(0, (remuneracao * taxa) / 100 - parcela - parcelaDependentes));
  const limitePenultimo = escala[escala.length - 2].hasta ?? Infinity;
  const ajustada = comAjuste && v["pt.retencao-percentagem"] !== 100 && remuneracao <= limitePenultimo;
  const retencao = ajustada ? redondear((tabelaSemAjuste * v["pt.retencao-percentagem"]) / 100) : tabelaSemAjuste;
  return { tabela, linha, taxa, parcela: redondear(parcela), parcelaDependentes: redondear(parcelaDependentes), retencao, tabelaSemAjuste, ajustada };
}

export const REQUISITOS_IRS = {
  "pt.irs-escaloes": "escala",
  "pt.ias": "numero",
  "pt.ss-trabalhador": "numero",
  "pt.irs-deducao-especifica-ias": "numero",
  "pt.irs-minimo-existencia": "numero",
  "pt.irs-minimo-existencia-fatores": "mapa",
  "pt.irs-despesas-gerais-limite": "numero",
  "pt.irs-despesas-gerais-percentagem": "numero",
  "pt.irs-deducao-dependentes": "mapa",
} as const;

export interface ValoresIrs {
  readonly "pt.irs-escaloes": readonly FilaEscala[];
  readonly "pt.ias": number;
  readonly "pt.ss-trabalhador": number;
  readonly "pt.irs-deducao-especifica-ias": number;
  readonly "pt.irs-minimo-existencia": number;
  readonly "pt.irs-minimo-existencia-fatores": Readonly<Record<string, number>>;
  readonly "pt.irs-despesas-gerais-limite": number;
  readonly "pt.irs-despesas-gerais-percentagem": number;
  readonly "pt.irs-deducao-dependentes": Readonly<Record<string, number>>;
}

export function deducaoEspecifica(bruto: number, v: ValoresIrs): number {
  const contribuicoes = (bruto * v["pt.ss-trabalhador"]) / 100;
  return Math.min(bruto, Math.max(v["pt.irs-deducao-especifica-ias"] * v["pt.ias"], contribuicoes));
}

// Artigo 70.º, n.os 2 e 3. L é o rendimento bruto a partir do qual o rendimento coletável já chega ao
// fim do 1.º escalão; as três fórmulas encaixam umas nas outras em VR e em L.
export function abatimentoMinimoExistencia(bruto: number, deducao: number, v: ValoresIrs): number {
  const vr = v["pt.irs-minimo-existencia"];
  const fat = v["pt.irs-minimo-existencia-fatores"];
  const escala = v["pt.irs-escaloes"];
  const taxa1 = escala[0].tasa / 100;
  const limite1 = escala[0].hasta ?? 0;
  const ldg = v["pt.irs-despesas-gerais-limite"];
  const l = vr - ldg / (taxa1 * fat.divisor) + limite1 / fat.divisor;
  let abatimento: number;
  if (bruto <= vr) abatimento = vr - (deducao + ldg / taxa1);
  else if (bruto <= l) abatimento = vr - fat.reducao * (bruto - vr) - (deducao + ldg / taxa1);
  else abatimento = l - limite1 - fat["reducao-final"] * (bruto - l) - deducao;
  return Math.max(0, Math.min(abatimento, bruto - deducao));
}

export interface Dependentes {
  total: number;
  ate3: number;
  de4a6: number;
}

// Artigo 78.º-A: 600 € por dependente; o 2.º e seguintes até 6 anos somam 300 €, e quem não tem
// esse acréscimo soma 126 € se tiver até 3 anos (n.º 4: os dois não se acumulam). O primeiro
// dependente é o mais velho, por isso só um dependente pequeno fica sem os 300 € quando todos são pequenos.
export function deducaoDependentes(d: Dependentes, v: ValoresIrs): number {
  const m = v["pt.irs-deducao-dependentes"];
  const pequenos = d.ate3 + d.de4a6;
  let total = d.total * m.dependente;
  if (pequenos === 0) return total;
  if (d.total > pequenos) return total + pequenos * m["segundo-ate-6-anos"];
  total += (pequenos - 1) * m["segundo-ate-6-anos"];
  if (d.de4a6 === 0) total += m["ate-3-anos"];
  return total;
}

export interface Titular {
  bruto: number;
}

export interface ResultadoIrs {
  deducaoEspecifica: number;
  abatimento: number;
  coletavel: number;
  coleta: number;
  deducoes: number;
  imposto: number;
  taxaEfetiva: number;
}

export function irsAnual(
  titulares: readonly Titular[],
  conjunta: boolean,
  dependentes: Dependentes,
  despesasGerais: number,
  outrasDeducoes: number,
  v: ValoresIrs,
  redondear: (n: number) => number,
): ResultadoIrs {
  const ias = v["pt.ias"];
  const totalBruto = titulares.reduce((s, t) => s + t.bruto, 0);
  const excluido = totalBruto > v["pt.irs-minimo-existencia-fatores"]["exclusao-ias"] * 14 * ias * titulares.length;
  let deducao = 0;
  let abatimento = 0;
  for (const t of titulares) {
    const de = deducaoEspecifica(t.bruto, v);
    deducao += de;
    if (!excluido) abatimento += abatimentoMinimoExistencia(t.bruto, de, v);
  }
  const coletavel = redondear(Math.max(0, totalBruto - deducao - abatimento));
  const quociente = conjunta && titulares.length === 2 ? 2 : 1;
  const coleta = redondear(aplicarEscalaMarginal(v["pt.irs-escaloes"], coletavel / quociente) * quociente);
  const despesas = Math.min((despesasGerais * v["pt.irs-despesas-gerais-percentagem"]) / 100, v["pt.irs-despesas-gerais-limite"] * titulares.length);
  const deducoes = redondear(deducaoDependentes(dependentes, v) + despesas + outrasDeducoes);
  const imposto = redondear(Math.max(0, coleta - deducoes));
  return {
    deducaoEspecifica: redondear(deducao),
    abatimento: redondear(abatimento),
    coletavel,
    coleta,
    deducoes,
    imposto,
    taxaEfetiva: totalBruto > 0 ? (imposto / totalBruto) * 100 : 0,
  };
}
