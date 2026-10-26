import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ao.subsidio-de-natal",
  h1: "Calcular o subsídio de Natal",
  title: "Subsídio de Natal em Angola 2026: calcule o valor",
  description: "O subsídio de Natal é de pelo menos {{ao.subsidio-natal}} do salário base. Calcule o valor proporcional aos meses trabalhados e o desconto do INSS.",
  intro: [
    "Todos os trabalhadores têm direito a um subsídio de Natal de pelo menos {{ao.subsidio-natal}} do salário base por ano de efectivo serviço.",
    "Indique o salário base e os meses completos de serviço no ano. A calculadora mostra o valor bruto e o desconto do INSS.",
  ],
  comoSeCalcula: [
    "Ano completo: salário base × {{ao.subsidio-natal}}, ou a percentagem maior do contrato ou da convenção.",
    "Menos de um ano de serviço: o mesmo valor × meses completos / 12.",
    "O subsídio de Natal entra na base do INSS: o trabalhador desconta {{ao.inss-trabalhador}}.",
  ],
  ejemplo: ["Com 350 000 Kz de salário base e o ano inteiro, o subsídio de Natal mínimo é 175 000 Kz. O INSS leva 5 250 Kz."],
  faq: [
    {
      pregunta: "Quem entrou a meio do ano recebe subsídio de Natal?",
      respuesta: "Sim. Recebe em proporção aos meses completos trabalhados. Quem entrou em março e chega a dezembro com 9 meses recebe 9/12 do valor anual.",
    },
    {
      pregunta: "E se o contrato terminar antes do Natal?",
      respuesta: "O trabalhador recebe a parte proporcional aos meses completos do ano, junto com as outras contas finais.",
    },
    {
      pregunta: "O subsídio de Natal desconta INSS?",
      respuesta: "Sim. Ao contrário do subsídio de férias, faz parte da base de incidência das contribuições.",
    },
  ],
  glosario: [
    { termino: "Complementos remuneratórios anuais", definicion: "O nome que a Lei Geral do Trabalho dá aos subsídios de férias e de Natal." },
    { termino: "Meses completos", definicion: "Meses inteiros de serviço; uma fracção de mês não conta." },
  ],
});
