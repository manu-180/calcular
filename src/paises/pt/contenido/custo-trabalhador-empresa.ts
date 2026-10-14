import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.custo-trabalhador-empresa",
  h1: "Quanto custa um trabalhador à empresa",
  title: "Custo de um trabalhador para a empresa em 2026",
  description: "Calcule o custo anual e mensal de um trabalhador: 14 salários, a TSU de {{pt.ss-empregador}} paga pela empresa e outros custos fixos.",
  intro: [
    "O custo de um trabalhador vai além do salário bruto. A empresa paga a sua parte da Taxa Social Única e paga 14 salários por ano.",
    "Indique o salário bruto e os outros custos mensais para ver o custo anual e a média por mês.",
  ],
  comoSeCalcula: [
    "A entidade empregadora desconta {{pt.ss-empregador}} sobre cada salário para a Segurança Social.",
    "No ano há 14 salários: 12 meses, subsídio de férias e subsídio de Natal.",
    "Custo anual = (salário + TSU) × 14 + outros custos × 12.",
  ],
  ejemplo: ["Um salário de 1 500 euros custa à empresa 1 856,25 euros por mês com a TSU e 25 987,50 euros por ano: em média, 2 165,63 euros por mês."],
  faq: [
    {
      pregunta: "Quanto é a TSU da empresa?",
      respuesta: "{{pt.ss-empregador}} da remuneração no regime geral. O trabalhador desconta à parte mais {{pt.ss-trabalhador}} do salário.",
    },
    {
      pregunta: "O subsídio de refeição conta para a TSU?",
      respuesta: "Este simulador não aplica TSU aos outros custos. As regras sobre o que entra na base de incidência estão no Código dos Regimes Contributivos.",
    },
    {
      pregunta: "Que custos ficam de fora?",
      respuesta: "O seguro de acidentes de trabalho, que depende da apólice, e as taxas contributivas especiais de alguns setores e contratos.",
    },
  ],
  glosario: [
    { termino: "TSU", definicion: "Taxa Social Única, a taxa contributiva para a Segurança Social, repartida entre empresa e trabalhador." },
    { termino: "Custo médio mensal", definicion: "O custo anual dividido por 12 meses." },
  ],
});
