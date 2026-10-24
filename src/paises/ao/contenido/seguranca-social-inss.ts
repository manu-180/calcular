import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.seguranca-social-inss",
  h1: "Calcular a segurança social (INSS)",
  title: "INSS em Angola: calcular os {{ao.inss-trabalhador}} e os {{ao.inss-empregador}}",
  description: "Calcule o desconto do trabalhador ({{ao.inss-trabalhador}}) e a contribuição da entidade empregadora ({{ao.inss-empregador}}) para o INSS sobre a remuneração do mês.",
  intro: [
    "Todos os meses a entidade empregadora desconta a parte do trabalhador para o INSS e junta a sua própria contribuição.",
    "Indique a remuneração ilíquida do mês. A calculadora mostra o desconto no salário, a parte da empresa e o total a entregar.",
  ],
  comoSeCalcula: [
    "Base: a remuneração ilíquida, ou seja todas as prestações em dinheiro devidas pela relação de trabalho. O subsídio de férias fica de fora.",
    "Trabalhador: {{ao.inss-trabalhador}} da base. Se já estiver reformado e continuar a trabalhar, a taxa passa a {{ao.inss-reformado}}.",
    "Entidade empregadora: {{ao.inss-empregador}} da base, pagos por cima do salário.",
  ],
  ejemplo: ["Sobre 350 000 Kz, o trabalhador desconta 10 500 Kz e a empresa paga 28 000 Kz. Ao INSS chegam 38 500 Kz."],
  faq: [
    {
      pregunta: "Até quando se pagam as contribuições?",
      respuesta: "Até ao dia 10 do mês seguinte àquele a que dizem respeito. Quem paga é a entidade empregadora, que desconta a parte do trabalhador no salário.",
    },
    {
      pregunta: "O subsídio de alimentação desconta para o INSS?",
      respuesta: "Sim. A base de incidência inclui todas as prestações em dinheiro devidas ao trabalhador. Só ficam de fora o subsídio de férias, as prestações sociais pagas pela empresa e as contribuições para regimes complementares.",
    },
    {
      pregunta: "Quanto desconta um reformado que continua a trabalhar?",
      respuesta: "{{ao.inss-reformado}} da remuneração, em vez dos {{ao.inss-trabalhador}}. A entidade empregadora continua a pagar {{ao.inss-empregador}}.",
    },
    {
      pregunta: "O que acontece se a empresa pagar com atraso?",
      respuesta: "Paga juros de mora de 1 % ao mês sobre o valor em dívida, contados a partir do dia seguinte ao fim do prazo.",
    },
  ],
  glosario: [
    { termino: "Base de incidência", definicion: "O valor da remuneração sobre o qual se aplicam as taxas do INSS." },
    { termino: "Remuneração ilíquida", definicion: "A remuneração antes de qualquer desconto." },
  ],
});
