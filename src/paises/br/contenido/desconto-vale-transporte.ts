import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.vale-transporte",
  h1: "Cálculo do desconto do vale-transporte",
  title: "Desconto do vale-transporte: até {{br.vale-transporte-desconto}} do salário",
  description: "Calcule quanto do vale-transporte sai do seu salário (até {{br.vale-transporte-desconto}} do salário básico) e quanto a empresa paga.",
  intro: [
    "O vale-transporte cobre o deslocamento entre casa e trabalho. A empresa pode descontar do salário até {{br.vale-transporte-desconto}} do salário básico e paga o resto.",
    "Informe o salário, o gasto diário com transporte e os dias de trabalho no mês.",
  ],
  comoSeCalcula: [
    "O custo do mês é o gasto diário de ida e volta vezes os dias de trabalho.",
    "O limite de desconto é {{br.vale-transporte-desconto}} do salário básico, sem adicionais.",
    "Você paga o menor valor entre o custo e o limite. A empresa paga o que sobrar.",
  ],
  ejemplo: ["Com salário de R$ 2.000 e R$ 10 por dia em 22 dias, o transporte custa R$ 220. O desconto máximo é R$ 120 e a empresa paga R$ 100."],
  faq: [
    {
      pregunta: "Sou obrigado a aceitar o vale-transporte?",
      respuesta: "Não. Se o desconto for maior que o seu gasto real, você pode recusar o benefício por escrito.",
    },
    {
      pregunta: "O desconto é sobre o salário com horas extras?",
      respuesta: "Não. Vale só o salário básico, sem adicionais e horas extras.",
    },
    {
      pregunta: "A empresa pode pagar o vale em dinheiro?",
      respuesta: "A regra geral é fornecer o vale ou cartão de transporte. Pagamento em dinheiro só em situações previstas em norma ou acordo coletivo.",
    },
  ],
  glosario: [{ termino: "Salário básico", definicion: "O salário do contrato, sem horas extras, adicionais e gratificações." }],
});
