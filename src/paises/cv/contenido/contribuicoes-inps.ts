import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.contribuicoes-inps",
  h1: "Contribuições para o INPS {{anio}}: trabalhador e empresa",
  title: "Contribuições INPS {{anio}}: {{cv.inps-trabalhador}} e {{cv.inps-empregador}}",
  description: "Calcule o que o trabalhador ({{cv.inps-trabalhador}}) e a entidade empregadora ({{cv.inps-empregador}}) pagam ao INPS por mês.",
  intro: [
    "Sobre uma remuneração de 100 000$00, o INPS recebe 24 500$00 por mês: 8 500$00 descontados ao trabalhador e 16 000$00 a cargo da entidade empregadora. A taxa global é de 24,5 %.",
    "Indique a remuneração ilíquida do mês. A calculadora separa a quotização do trabalhador, de {{cv.inps-trabalhador}}, da contribuição da entidade empregadora, de {{cv.inps-empregador}}.",
  ],
  comoSeCalcula: [
    "A Portaria Conjunta n.º 28/2024 fixa a taxa global em 24,5 % das remunerações devidas, de acordo com a base de incidência contributiva.",
    "O trabalhador paga {{cv.inps-trabalhador}} da sua remuneração ilíquida. A entidade empregadora paga {{cv.inps-empregador}} da remuneração ilíquida paga aos trabalhadores a seu cargo, sem a descontar a ninguém.",
    "Somam-se as duas parcelas para obter o que a empresa entrega ao INPS. O prazo de pagamento é o dia 15 do mês seguinte àquele a que respeitam as remunerações.",
  ],
  ejemplo: [
    "Uma empresa paga 45 250$00 a um empregado. Descontando {{cv.inps-trabalhador}}, o trabalhador entrega 3 846,25$00. A empresa soma {{cv.inps-empregador}}, ou 7 240$00. No total seguem 11 086,25$00 para o INPS.",
  ],
  faq: [
    {
      pregunta: "Quanto paga o trabalhador ao INPS?",
      respuesta: "Paga {{cv.inps-trabalhador}} da remuneração ilíquida, descontados pela entidade empregadora no recibo. É o que determina o artigo 2.º, n.º 1, alínea a), da Portaria Conjunta n.º 28/2024.",
    },
    {
      pregunta: "Quanto paga a entidade empregadora?",
      respuesta: "Paga {{cv.inps-empregador}} da remuneração ilíquida paga aos trabalhadores a seu cargo, segundo a alínea b) do mesmo número. Este valor não sai do salário do trabalhador.",
    },
    {
      pregunta: "Os trabalhadores por conta própria pagam o mesmo?",
      respuesta: "Não. O n.º 2 do artigo 2.º da portaria exclui o regime dos trabalhadores por conta própria e outros regimes especiais, que têm taxas próprias fixadas pelo INPS.",
    },
    {
      pregunta: "Até quando se paga?",
      respuesta: "Até ao dia 15 do mês seguinte. Se o dia 15 for sábado, domingo ou feriado, o pagamento passa para o primeiro dia útil, segundo a página de pagamento do INPS.",
    },
  ],
  glosario: [
    { termino: "Quotização", definicion: "A parte da contribuição que o trabalhador paga, descontada no recibo de vencimento." },
    { termino: "Taxa global", definicion: "A soma da parte do trabalhador com a da entidade empregadora." },
    { termino: "FOS", definicion: "Folha de Ordenados e Salários, a declaração mensal que as empresas entregam ao INPS." },
    { termino: "Remuneração ilíquida", definicion: "O salário antes de descontos, sobre o qual se aplicam as taxas." },
  ],
});
