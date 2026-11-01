import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.custo-do-trabalhador",
  h1: "Custo de um trabalhador para a empresa em {{anio}}",
  title: "Custo de um trabalhador {{anio}}: salário mais {{cv.inps-empregador}}",
  description: "Veja quanto custa um trabalhador à empresa: o salário bruto mais os {{cv.inps-empregador}} de INPS a cargo da entidade empregadora.",
  intro: [
    "Um trabalhador com 100 000$00 de salário bruto custa 116 000$00 por mês à empresa, porque a entidade empregadora paga mais {{cv.inps-empregador}} de INPS por cima do salário.",
    "Indique o salário bruto e o número de pagamentos por ano. A calculadora soma a contribuição patronal e mostra o custo mensal e o anual.",
  ],
  comoSeCalcula: [
    "A contribuição patronal é {{cv.inps-empregador}} da remuneração ilíquida paga ao trabalhador. Não é descontada ao trabalhador: sai do orçamento da empresa.",
    "O custo do mês é o salário bruto mais essa contribuição. O custo anual multiplica o salário pelo número de pagamentos e soma a contribuição sobre esse total.",
    "A quotização de {{cv.inps-trabalhador}} do trabalhador não aumenta o custo da empresa, porque já está dentro do salário bruto. O IRPS também não, pois é retido ao trabalhador.",
  ],
  ejemplo: [
    "Com 60 000$00 de salário e 14 pagamentos por ano, o total pago em salários é 840 000$00. A contribuição patronal sobre esse valor é 134 400$00. O custo anual fica em 974 400$00, e cada mês de salário normal custa 69 600$00.",
  ],
  faq: [
    {
      pregunta: "Quanto paga a empresa ao INPS por cada trabalhador?",
      respuesta: "Paga {{cv.inps-empregador}} da remuneração ilíquida, nos termos do artigo 2.º, n.º 1, alínea b), da Portaria Conjunta n.º 28/2024.",
    },
    {
      pregunta: "A empresa também paga a parte do trabalhador?",
      respuesta: "Entrega-a ao INPS, mas desconta-a ao trabalhador. A quotização de {{cv.inps-trabalhador}} está dentro do salário bruto e não acresce ao custo.",
    },
    {
      pregunta: "O salário mínimo muda o custo?",
      respuesta: "O custo mínimo de um trabalhador a tempo inteiro parte de {{cv.salario-minimo}} mais a contribuição patronal, segundo o valor da retribuição mínima mensal garantida em vigor.",
    },
  ],
  glosario: [
    { termino: "Entidade empregadora", definicion: "A empresa ou pessoa que paga o salário e entrega as contribuições ao INPS." },
    { termino: "Contribuição patronal", definicion: "A parte do INPS paga pela empresa, calculada sobre a remuneração ilíquida." },
    { termino: "Custo anual", definicion: "O total de salários e contribuição patronal em doze meses ou nos pagamentos do ano." },
  ],
});
