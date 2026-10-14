import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.recibo-verde",
  h1: "Simulador de recibo verde",
  title: "Recibo verde 2026: IVA, retenção na fonte e valor a receber",
  description: "Calcule um recibo verde: IVA, retenção na fonte de IRS de {{pt.recibo-verde-retencao[artigo-151]}} ou {{pt.recibo-verde-retencao[outros]}} e o valor que recebe do cliente.",
  intro: [
    "No recibo verde soma-se o IVA ao valor do serviço e, quando o cliente é uma empresa, desconta-se a retenção na fonte de IRS.",
    "Indique o valor do serviço, a atividade e a sua situação de IVA para ver o total do recibo e o valor que efetivamente recebe.",
  ],
  comoSeCalcula: [
    "IVA: valor do serviço × taxa normal da região, salvo se estiver isento pelo artigo 53.º do Código do IVA.",
    "Retenção na fonte: {{pt.recibo-verde-retencao[artigo-151]}} nas profissões da tabela do artigo 151.º do Código do IRS e {{pt.recibo-verde-retencao[outros]}} nas outras prestações de serviços. Só retém o cliente com contabilidade organizada.",
    "Valor a receber = serviço + IVA − retenção.",
  ],
  ejemplo: ["Um serviço de 1 000 euros de uma profissão do artigo 151.º, no continente, leva 230 euros de IVA e 230 euros de retenção: o recibo é de 1 230 euros e recebe 1 000 euros."],
  faq: [
    {
      pregunta: "Quando estou isento de IVA?",
      respuesta: "Entre outras condições, quando não ultrapassou {{pt.iva-limite-isencao}} de volume de negócios em território nacional no ano civil anterior e não faz exportações (artigo 53.º do Código do IVA).",
    },
    {
      pregunta: "Posso pedir para não me fazerem retenção?",
      respuesta: "Sim, se prevê faturar no ano menos do que o limite do artigo 53.º do Código do IVA. A dispensa é facultativa. Também não há retenção quando o valor a reter é inferior a 25 euros.",
    },
    {
      pregunta: "A retenção é o IRS final?",
      respuesta: "Não. É um adiantamento que se acerta na declaração anual de IRS.",
    },
  ],
  glosario: [
    { termino: "Recibo verde", definicion: "Fatura-recibo emitida no Portal das Finanças por um trabalhador independente." },
    { termino: "Contabilidade organizada", definicion: "O regime de contabilidade das entidades que, pelo artigo 101.º do Código do IRS, têm de fazer retenção na fonte." },
  ],
});
