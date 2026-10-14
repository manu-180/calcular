import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pt.subsidio-de-natal",
  h1: "Calcular o subsídio de Natal",
  title: "Subsídio de Natal 2026: valor por inteiro e proporcional",
  description: "Calcule o subsídio de Natal: um mês de retribuição, ou a parte proporcional no ano de entrada, de saída ou com o contrato suspenso.",
  intro: [
    "O subsídio de Natal é um salário a mais por ano, pago até 15 de dezembro. Quem trabalhou o ano inteiro recebe um mês de retribuição.",
    "Indique a retribuição mensal e os meses de serviço no ano para ver o valor bruto.",
  ],
  comoSeCalcula: [
    "Com o ano completo, o subsídio é igual a um mês de retribuição.",
    "No ano de admissão, no ano em que o contrato termina e quando o contrato está suspenso por facto do trabalhador, o subsídio é proporcional ao tempo de serviço: retribuição × meses / 12.",
  ],
  ejemplo: ["Quem entrou em abril, com 1 500 euros por mês, tem 9 meses de serviço no ano: recebe 1 125 euros de subsídio de Natal."],
  faq: [
    {
      pregunta: "Até quando tem de ser pago o subsídio de Natal?",
      respuesta: "Até 15 de dezembro de cada ano, segundo o artigo 263.º do Código do Trabalho.",
    },
    {
      pregunta: "O subsídio de Natal tem retenção de IRS?",
      respuesta: "Sim. O despacho das tabelas de retenção de 2026 manda apresentar a retenção de cada subsídio em separado da do salário do mês.",
    },
    {
      pregunta: "Quem sai da empresa recebe o subsídio de Natal?",
      respuesta: "Recebe a parte proporcional ao tempo de serviço no ano da cessação do contrato.",
    },
  ],
  glosario: [
    { termino: "Retribuição", definicion: "O que o trabalhador recebe de forma regular como contrapartida do trabalho." },
    { termino: "Proporcional", definicion: "A parte do subsídio que corresponde aos meses de serviço no ano." },
  ],
});
