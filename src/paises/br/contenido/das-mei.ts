import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "br.das-mei",
  h1: "Valor do DAS MEI 2026",
  title: "DAS MEI 2026: valor da guia mensal",
  description: "Calcule o DAS do MEI em 2026: INSS de {{br.inss-mei}} do salário mínimo mais {{br.mei-icms}} de ICMS e {{br.mei-iss}} de ISS, conforme a atividade.",
  intro: [
    "O microempreendedor individual paga todos os impostos numa guia mensal fixa, o DAS. O valor muda quando muda o salário mínimo.",
    "Escolha a atividade e veja quanto é a guia por mês e no ano.",
  ],
  comoSeCalcula: [
    "A contribuição ao INSS é {{br.inss-mei}} do salário mínimo de {{br.salario-minimo}}.",
    "Quem vende mercadorias ou fabrica paga mais {{br.mei-icms}} de ICMS.",
    "Quem presta serviços paga mais {{br.mei-iss}} de ISS. Quem faz as duas coisas paga os dois.",
  ],
  ejemplo: ["Um MEI de serviços paga R$ 81,05 de INSS e R$ 5 de ISS: R$ 86,05 por mês e R$ 1.032,60 no ano."],
  faq: [
    {
      pregunta: "Qual é o limite de faturamento do MEI?",
      respuesta: "{{br.mei-limite}} por ano. Quem abre o MEI no meio do ano tem um limite proporcional aos meses.",
    },
    {
      pregunta: "Preciso pagar o DAS se não faturei nada?",
      respuesta: "Sim. A guia é fixa e vence todo dia 20, com ou sem faturamento. Atrasar gera multa e juros.",
    },
    {
      pregunta: "O DAS do MEI dá direito a aposentadoria?",
      respuesta: "Dá direito à aposentadoria por idade de um salário mínimo, auxílio por incapacidade e salário-maternidade, cumpridas as carências. Não conta para a aposentadoria por tempo de contribuição.",
    },
  ],
  glosario: [
    { termino: "MEI", definicion: "Microempreendedor individual, a forma mais simples de ter CNPJ no Brasil." },
    { termino: "DAS", definicion: "Documento de Arrecadação do Simples Nacional, a guia mensal do MEI." },
  ],
});
