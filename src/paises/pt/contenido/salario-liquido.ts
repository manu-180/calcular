import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.salario-liquido",
  h1: "Simulador de salário líquido",
  title: "Salário líquido 2026: do bruto ao líquido com IRS e SS",
  description:
    "Calcule o salário líquido a partir do bruto com as tabelas de retenção na fonte de 2026 e os {{pt.ss-trabalhador}} de Segurança Social.",
  intro: [
    "O salário líquido é o que chega à conta depois de descontar a Segurança Social e a retenção na fonte de IRS.",
    "Indique o salário bruto, a situação familiar e o número de dependentes. O cálculo usa as tabelas de retenção de 2026 do continente.",
  ],
  comoSeCalcula: [
    "A Segurança Social do trabalhador é {{pt.ss-trabalhador}} do salário bruto.",
    "A retenção de IRS sai da tabela que corresponde à situação familiar: salário × taxa marginal, menos a parcela a abater e menos a parcela por cada dependente.",
    "Nos salários mais baixos a parcela a abater é uma fórmula que depende do próprio salário, para que a retenção suba aos poucos.",
    "Com três ou mais dependentes retira-se {{pt.retencao-reducao-3-dependentes}} à taxa marginal: uma taxa de 31,10 % passa a 30,10 %.",
  ],
  ejemplo: [
    "Um salário bruto de 1 500 euros, sem dependentes, desconta 165 euros para a Segurança Social e 168,17 euros de IRS. Fica um líquido de 1 166,83 euros por mês.",
  ],
  faq: [
    {
      pregunta: "Que tabela de retenção se aplica?",
      respuesta: "A tabela I serve para não casados sem dependentes e para casados com dois titulares de rendimentos. A tabela II é para não casados com dependentes e a tabela III para casados com um único titular.",
    },
    {
      pregunta: "A partir de que salário há retenção de IRS?",
      respuesta: "Em 2026, nas tabelas I e II, os salários até 920 euros não têm retenção. Na tabela III o limite é 991 euros.",
    },
    {
      pregunta: "A retenção na fonte é o IRS final?",
      respuesta: "Não. É um adiantamento. O imposto final apura-se na declaração anual, que pode dar reembolso ou valor a pagar.",
    },
    {
      pregunta: "Este cálculo serve para os Açores e a Madeira?",
      respuesta: "Não. As tabelas usadas são as do continente. As Regiões Autónomas têm tabelas de retenção próprias.",
    },
  ],
  glosario: [
    { termino: "Taxa marginal máxima", definicion: "A taxa da linha da tabela em que cai o salário." },
    { termino: "Parcela a abater", definicion: "Valor que se subtrai ao salário multiplicado pela taxa para chegar à retenção." },
    { termino: "Dependente", definicion: "Filho ou outra pessoa a cargo que entra no agregado familiar para efeitos de IRS." },
  ],
});
