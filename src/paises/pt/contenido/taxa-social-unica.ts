import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.taxa-social-unica",
  h1: "Taxa Social Única (TSU)",
  title: "TSU {{anio}}: descontos para a Segurança Social",
  description: "Calcule os descontos para a Segurança Social sobre um salário: {{pt.ss-trabalhador}} do trabalhador e {{pt.ss-empregador}} da entidade empregadora.",
  intro: [
    "A Taxa Social Única é a contribuição para a Segurança Social sobre os salários. Uma parte é descontada ao trabalhador e outra é paga pela empresa.",
    "Indique a remuneração bruta para ver as duas partes e o total entregue à Segurança Social.",
  ],
  comoSeCalcula: [
    "No regime geral dos trabalhadores por conta de outrem, o trabalhador desconta {{pt.ss-trabalhador}} da remuneração.",
    "A entidade empregadora paga {{pt.ss-empregador}} sobre a mesma remuneração.",
    "As duas parcelas somadas formam a taxa contributiva global do artigo 53.º do Código dos Regimes Contributivos.",
  ],
  ejemplo: ["Sobre 1 500 euros, o trabalhador desconta 165 euros e a empresa paga 356,25 euros: 521,25 euros no total."],
  faq: [
    {
      pregunta: "Quanto desconta o trabalhador para a Segurança Social?",
      respuesta: "{{pt.ss-trabalhador}} da remuneração bruta, no regime geral.",
    },
    {
      pregunta: "A TSU é igual para todos?",
      respuesta: "Não. A lei prevê taxas próprias para algumas categorias de trabalhadores e situações específicas. Os trabalhadores independentes têm um regime diferente.",
    },
    {
      pregunta: "Os descontos para a Segurança Social contam no IRS?",
      respuesta: "Sim. As contribuições do trabalhador contam para a dedução específica do IRS quando são maiores do que o valor mínimo dessa dedução.",
    },
  ],
  glosario: [
    { termino: "Regime geral", definicion: "O regime de Segurança Social dos trabalhadores por conta de outrem." },
    { termino: "Taxa contributiva global", definicion: "A soma da parte do trabalhador com a parte da entidade empregadora." },
  ],
});
