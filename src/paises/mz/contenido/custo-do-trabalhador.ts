import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.custo-do-trabalhador",
  h1: "Quanto custa um trabalhador à empresa",
  title: "Custo de um trabalhador em Moçambique com o INSS",
  description: "Some ao salário bruto os {{mz.inss-empregador}} de contribuição da empresa para o INSS e veja o custo mensal e anual de um trabalhador.",
  intro: [
    "Além do salário, a empresa paga ao INSS uma contribuição própria de {{mz.inss-empregador}} sobre a remuneração do trabalhador.",
    "Indique o salário bruto e os subsídios do mês para ver o custo total.",
  ],
  comoSeCalcula: [
    "Remuneração = salário bruto + subsídios e prémios.",
    "Contribuição da empresa = remuneração × {{mz.inss-empregador}}.",
    "Custo mensal = remuneração + contribuição. O custo em 12 meses multiplica esse valor por 12.",
  ],
  ejemplo: ["Um trabalhador com 30 000 MT de salário e 2 000 MT de subsídios custa 33 280 MT por mês, ou 399 360 MT em 12 meses."],
  faq: [
    {
      pregunta: "O IRPS entra no custo da empresa?",
      respuesta: "Não. O IRPS sai do salário do trabalhador; a empresa só o retém e entrega ao Estado. O mesmo vale para os {{mz.inss-trabalhador}} do INSS do trabalhador.",
    },
    {
      pregunta: "As férias aumentam o custo?",
      respuesta: "As férias são pagas como meses normais de salário, por isso já estão dentro dos 12 meses do cálculo.",
    },
    {
      pregunta: "Há décimo terceiro salário?",
      respuesta: "A Lei do Trabalho não o torna obrigatório. Se a empresa o pagar por contrato ou instrumento colectivo, some-o à parte.",
    },
  ],
  glosario: [
    { termino: "Entidade empregadora", definicion: "A pessoa ou empresa que contrata e paga o trabalhador." },
    { termino: "Remuneração", definicion: "Salário base mais as prestações adicionais pagas no mês." },
  ],
});
